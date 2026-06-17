import express from "express";
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Fallback / Initial Database Values from src/data
import { 
  INITIAL_PROJECTS, 
  INITIAL_SKILLS, 
  INITIAL_EXPERIENCES, 
  INITIAL_MESSAGES, 
  INITIAL_SETTINGS,
  INITIAL_EDUCATIONS,
  INITIAL_CERTIFICATES 
} from "./src/data";

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "portfolio_db.json");

// Detect if running on Vercel (ephemeral file system — never write local files)
const IS_VERCEL = !!(process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL);

// Helper for atomic file writes to prevent race conditions during hot-reloads.
// Only used in local development — Vercel has a read-only/ephemeral file system.
async function atomicWriteFile(filePath: string, data: string): Promise<void> {
  if (IS_VERCEL) return; // Skip all file writes on Vercel
  try {
    const tmpDir = path.join(process.cwd(), "tmp_json");
    await fs.mkdir(tmpDir, { recursive: true }).catch(() => {});
    const tmpPath = path.join(tmpDir, path.basename(filePath) + ".tmp." + Date.now());
    await fs.writeFile(tmpPath, data, "utf-8");
    await fs.rename(tmpPath, filePath);
  } catch (e) {
    console.warn("atomicWriteFile skipped (non-critical in production):", e);
  }
}

// Structure of our database
interface PortfolioDB {
  projects: any[];
  skills: any[];
  experiences: any[];
  educations: any[];
  messages: any[];
  settings: any;
  certificates: any[];
}

// Initialize Firebase DB connection lazily to handle missing config safely
let dbInstance: any = null;

async function getFirebaseDB() {
  if (dbInstance) return dbInstance;
  try {
    let firebaseConfig;
    try {
      // Direct require allows esbuild to bundle the JSON, making it available on Vercel
      firebaseConfig = require("./firebase-applet-config.json");
    } catch (e) {
      // Fallback if not found
      const CONFIG_FILE = path.join(process.cwd(), "firebase-applet-config.json");
      const exists = await fs.access(CONFIG_FILE).then(() => true).catch(() => false);
      if (!exists) {
        console.warn("firebase-applet-config.json not found! Falling back to local state.");
        return null;
      }
      const configContent = await fs.readFile(CONFIG_FILE, "utf-8");
      firebaseConfig = JSON.parse(configContent);
    }
    
    const app = initializeApp(firebaseConfig);
    const dbId = firebaseConfig.firestoreDatabaseId;
    dbInstance = dbId ? getFirestore(app, dbId) : getFirestore(app);
    return dbInstance;
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
}

// Default fallback values if Firestore is completely unavailable
function getDefaultFallback(key: string): any {
  switch (key) {
    case "projects": return INITIAL_PROJECTS;
    case "skills": return INITIAL_SKILLS;
    case "experiences": return INITIAL_EXPERIENCES;
    case "educations": return INITIAL_EDUCATIONS;
    case "messages": return INITIAL_MESSAGES;
    case "settings": return INITIAL_SETTINGS;
    case "certificates": return INITIAL_CERTIFICATES;
    default: return null;
  }
}

// In local dev only: also try reading from portfolio_db.json as an additional local fallback
async function getDevLocalFallback(key: string): Promise<any> {
  if (IS_VERCEL) return getDefaultFallback(key);
  try {
    const fileExists = await fs.access(DB_FILE).then(() => true).catch(() => false);
    if (fileExists) {
      const content = await fs.readFile(DB_FILE, "utf-8");
      const localDB = JSON.parse(content);
      if (localDB && localDB[key] !== undefined) {
        return localDB[key];
      }
    }
  } catch (e) {
    console.error(`Failed to read local dev fallback for [${key}]:`, e);
  }
  return getDefaultFallback(key);
}

// Load full portfolio from Firestore — Firestore is the SINGLE SOURCE OF TRUTH.
// No local timestamp comparison: whatever is in Firestore is always authoritative.
async function loadPortfolioFromFirestore(): Promise<{ portfolio: PortfolioDB | null; hasErrors: boolean }> {
  const db = await getFirebaseDB();
  if (!db) return { portfolio: null, hasErrors: true };
  
  const keys = ["projects", "skills", "experiences", "educations", "messages", "settings", "certificates"];
  const portfolio: Partial<PortfolioDB> = {};
  let anyLoaded = false;
  let hasErrors = false;
  
  const results = await Promise.all(
    keys.map(async (key) => {
      try {
        const docRef = doc(db, "portfolio_data", key);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          anyLoaded = true;
          const cloudDoc = docSnap.data();
          // Always use Firestore data — no local timestamp comparison!
          return { key, data: cloudDoc.data, ok: true };
        }
        
        // Document doesn't exist yet in Firestore → use defaults
        return { key, data: null, ok: true };
      } catch (err) {
        console.error(`Error loading segment [${key}] from Firestore:`, err);
        hasErrors = true;
        return { key, data: null, ok: false };
      }
    })
  );
  
  if (hasErrors) {
    return { portfolio: null, hasErrors: true };
  }
  
  if (!anyLoaded) {
    return { portfolio: null, hasErrors: false }; // Genuinely blank cloud database — will be seeded
  }
  
  for (const res of results) {
    portfolio[res.key as keyof PortfolioDB] = res.data !== null ? res.data : getDefaultFallback(res.key);
  }
  
  return { portfolio: portfolio as PortfolioDB, hasErrors: false };
}

// Load portfolio from Firestore (single source of truth) or fall back to defaults.
// On Vercel: never reads/writes local files (ephemeral disk).
// In local dev: also writes to portfolio_db.json for optional offline caching.
async function initDB(): Promise<PortfolioDB> {
  try {
    // 1. Try loading from persistent Firestore (ALWAYS preferred)
    const { portfolio: cloudDB, hasErrors } = await loadPortfolioFromFirestore();
    
    if (hasErrors) {
      // Firestore is unreachable — use safe defaults
      // On Vercel: use INITIAL_* constants directly (no local file)
      // In local dev: also try portfolio_db.json for richer fallback
      console.warn("Firestore unreachable. Using safe fallback data (NO writes to protect Firestore).");
      return {
        projects: await getDevLocalFallback("projects"),
        skills: await getDevLocalFallback("skills"),
        experiences: await getDevLocalFallback("experiences"),
        educations: await getDevLocalFallback("educations"),
        messages: await getDevLocalFallback("messages"),
        settings: await getDevLocalFallback("settings"),
        certificates: await getDevLocalFallback("certificates")
      };
    }

    if (cloudDB) {
      // Optionally cache to local file in dev mode only (never on Vercel)
      await atomicWriteFile(DB_FILE, JSON.stringify(cloudDB, null, 2));
      return cloudDB;
    }
    
    // 2. Firestore is blank — seed it with defaults then return
    console.log("Firestore is empty. Seeding with default portfolio data...");
    const defaultDB: PortfolioDB = {
      projects: INITIAL_PROJECTS,
      skills: INITIAL_SKILLS,
      experiences: INITIAL_EXPERIENCES,
      educations: INITIAL_EDUCATIONS,
      messages: INITIAL_MESSAGES,
      settings: INITIAL_SETTINGS,
      certificates: INITIAL_CERTIFICATES
    };
    
    // Persist seed data to Firestore so future requests have data
    const firestoreDB = await getFirebaseDB();
    if (firestoreDB) {
      await Promise.all(
        Object.entries(defaultDB).map(async ([key, val]) => {
          try {
            await setDoc(doc(firestoreDB, "portfolio_data", key), {
              data: val,
              updatedAt: new Date().toISOString()
            });
            console.log(`Seeded [${key}] into Firestore.`);
          } catch (err) {
            console.error(`Failed to seed [${key}] to Firestore:`, err);
          }
        })
      );
    }
    
    await atomicWriteFile(DB_FILE, JSON.stringify(defaultDB, null, 2));
    return defaultDB;
  } catch (error) {
    console.error("initDB fatal error, using hardcoded defaults:", error);
    return {
      projects: INITIAL_PROJECTS,
      skills: INITIAL_SKILLS,
      experiences: INITIAL_EXPERIENCES,
      educations: INITIAL_EDUCATIONS,
      messages: INITIAL_MESSAGES,
      settings: INITIAL_SETTINGS,
      certificates: INITIAL_CERTIFICATES
    };
  }
}

// ============================================================
// Express App — module-level setup for Vercel serverless support
// ============================================================
const app = express();

// Support large Base64 images uploaded via Admin Interface
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));

// Helper to dynamically serve index.html with injected DB data
const serveHTMLWithInjectedDB = async (req: express.Request, res: express.Response, viteInstance?: any) => {
  try {
    const db = await initDB();
    const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(db).replace(/</g, '\\u003c')};</script>`;
    let html = "";
    if (viteInstance) {
      const templatePath = path.join(process.cwd(), "index.html");
      let rawHtml = await fs.readFile(templatePath, "utf-8");
      rawHtml = await viteInstance.transformIndexHtml(req.originalUrl, rawHtml);
      html = rawHtml.replace("</head>", `${dataScript}</head>`);
    } else {
      const templatePath = path.join(process.cwd(), "dist", "index.html");
      const rawHtml = await fs.readFile(templatePath, "utf-8");
      html = rawHtml.replace("</head>", `${dataScript}</head>`);
    }
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (err) {
    console.error("HTML Injection failed:", err);
    if (viteInstance) {
      res.status(500).send("Server Error");
    } else {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    }
  }
};

// 1. GET entire portfolio state
app.get("/api/portfolio", async (req: express.Request, res: express.Response) => {
  try {
    const db = await initDB();
    res.json(db);
  } catch (error) {
    console.error("Failed to read portfolio data:", error);
    res.status(500).json({ error: "Failed to read portfolio data" });
  }
});

// 2. Update a specific section of the database
app.post("/api/portfolio/update", async (req: express.Request, res: express.Response) => {
  try {
    const { key, data } = req.body;
    const validKeys = ["projects", "skills", "experiences", "educations", "messages", "settings", "certificates"];
    if (!key || !validKeys.includes(key)) {
      return res.status(400).json({ error: "Invalid collection key" });
    }

    const timestamp = new Date().toISOString();
    const firestoreDB = await getFirebaseDB();
    let firebaseSynced = false;

    if (firestoreDB) {
      try {
        await setDoc(doc(firestoreDB, "portfolio_data", key), { data, updatedAt: timestamp });
        firebaseSynced = true;
        console.log(`[${key}] persisted to Firestore at ${timestamp}`);
      } catch (err) {
        console.error(`Failed to write [${key}] to Firestore:`, err);
        return res.status(500).json({ error: `Failed to save [${key}] to database` });
      }
    } else {
      console.warn("Firestore unavailable — data will NOT be persisted permanently!");
    }

    if (!IS_VERCEL) {
      try {
        let cached: PortfolioDB;
        try {
          const fileExists = await fs.access(DB_FILE).then(() => true).catch(() => false);
          cached = fileExists ? JSON.parse(await fs.readFile(DB_FILE, "utf-8")) : await initDB();
        } catch { cached = await initDB(); }

        if (key === "messages") {
          const newMessages = data || [];
          const oldMessages = cached.messages || [];
          if (newMessages.length > oldMessages.length && newMessages.length > 0) {
            const settings = cached.settings || {};
            if (settings.enableEmailNotify) {
              sendEmailNotification(newMessages[0], settings).catch(console.error);
            }
          }
        }
        cached[key as keyof PortfolioDB] = data;
        await atomicWriteFile(DB_FILE, JSON.stringify(cached, null, 2));
      } catch (cacheErr) {
        console.warn("Local cache update failed (non-critical):", cacheErr);
      }
    }

    res.json({ success: true, firebaseSynced });
  } catch (error) {
    console.error("Failed to update portfolio data:", error);
    res.status(500).json({ error: "Failed to update portfolio data" });
  }
});

// 3. Reset entire database to defaults
app.post("/api/portfolio/reset", async (req: express.Request, res: express.Response) => {
  try {
    const defaultDB: PortfolioDB = {
      projects: INITIAL_PROJECTS, skills: INITIAL_SKILLS, experiences: INITIAL_EXPERIENCES,
      educations: INITIAL_EDUCATIONS, messages: INITIAL_MESSAGES, settings: INITIAL_SETTINGS,
      certificates: INITIAL_CERTIFICATES
    };
    const db = await getFirebaseDB();
    if (db) {
      await Promise.all(
        Object.entries(defaultDB).map(([key, val]) =>
          setDoc(doc(db, "portfolio_data", key), { data: val, updatedAt: new Date().toISOString() }).catch(err =>
            console.error(`Failed to reset [${key}] in Firestore:`, err)
          )
        )
      );
    }
    await atomicWriteFile(DB_FILE, JSON.stringify(defaultDB, null, 2));
    res.json({ success: true, db: defaultDB });
  } catch (error) {
    console.error("Failed to reset portfolio database:", error);
    res.status(500).json({ error: "Failed to reset portfolio database" });
  }
});

// Production / Vercel: serve built static assets + SPA fallback
if (IS_VERCEL || process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath, { index: false }));
  app.get("*", async (req: express.Request, res: express.Response) => {
    await serveHTMLWithInjectedDB(req, res);
  });
}

// ============================================================
// Export app as default — required for Vercel serverless handler
// ============================================================
export default app;

// ============================================================
// Local Dev Only — start Vite dev server + Express listener
// ============================================================
if (!IS_VERCEL) {
  (async function startDevServer() {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.get("/", async (req: express.Request, res: express.Response) => {
        await serveHTMLWithInjectedDB(req, res, vite);
      });
      app.get("/index.html", async (req: express.Request, res: express.Response) => {
        await serveHTMLWithInjectedDB(req, res, vite);
      });
      app.use(vite.middlewares);
    }
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })();
}



async function sendEmailNotification(message: any, settings: any) {
  const smtpHost = settings.smtpHost;
  const smtpPort = parseInt(settings.smtpPort || "465", 10);
  const smtpUser = settings.smtpUser;
  const smtpPass = settings.smtpPass;
  const recipient = settings.contactEmail || "fikrryandi@gmail.com";
  const senderName = settings.senderName || "Fikri Portfolio Form";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[SMTP Warn] SMTP settings are incomplete. Skipping email generation.");
    return;
  }

  const secure = smtpPort === 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const subject = `[Notification] Baru! Pesan masuk dari ${message.sender}`;
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
      <h2 style="color: #6d28d9; margin-top: 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
        ✉️ Ada Pesan Baru di Portofolio Anda!
      </h2>
      <p style="font-size: 14px; color: #334155;">Seseorang baru saja mengirimkan pesan melalui formulir kontak Anda di website Portofolio.</p>
      
      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 15px; margin-bottom: 15px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 120px;">Nama Pengirim:</td>
            <td style="padding: 6px 0; color: #0f172a;">${message.sender}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email Pengirim:</td>
            <td style="padding: 6px 0; color: #6d28d9; font-weight: 500;">
              <a href="mailto:${message.email}" style="color: #6d28d9; text-decoration: none;">${message.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Subjek:</td>
            <td style="padding: 6px 0; color: #0f172a;">${message.subject || 'Kontak Portofolio'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; vertical-align: top;">Pesan:</td>
            <td style="padding: 10px; color: #1e293b; background-color: #f1f5f9; border-radius: 6px; font-family: monospace; white-space: pre-wrap; line-height: 1.5; margin-top: 5px; display: block;">${message.message}</td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 11px; color: #64748b; text-align: center; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 15px; line-height: 1.4;">
        Sistem Notifikasi Portofolio Otomatis &bull; Dikirim menggunakan SMTP yang dikonfigurasi melalui modul Admin Settings Anda.
      </p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"${senderName}" <${smtpUser}>`,
    to: recipient,
    subject: subject,
    html: htmlContent,
  });

  console.log("Email notification dispatched successfully, messageId:", info.messageId);
}
