const fs = require('fs');
const file = 'src/components/AdminExperiences.tsx';
let content = fs.readFileSync(file, 'utf8');

// Chunk 1
content = content.replace(
  "  Edit3 \n} from 'lucide-react';",
  "  Edit3,\n  Upload,\n  Activity\n} from 'lucide-react';"
);

const compressCode = `
const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
      if (height > maxHeight) { width = Math.round((width * maxHeight) / height); height = maxHeight; }
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', 0.9));
      } else { resolve(base64Str); }
    };
    img.onerror = () => resolve(base64Str);
  });
};

`;

content = content.replace(
  "interface AdminExperiencesProps {",
  compressCode + "interface AdminExperiencesProps {"
);

// Chunk 2
content = content.replace(
  "const [tagsInput, setTagsInput] = useState('');",
  "const [tagsInput, setTagsInput] = useState('');\n  const [companyLogo, setCompanyLogo] = useState('');\n  const [isUploading, setIsUploading] = useState(false);"
);

content = content.replace(
  "const [editTagsInput, setEditTagsInput] = useState('');",
  "const [editTagsInput, setEditTagsInput] = useState('');\n  const [editCompanyLogo, setEditCompanyLogo] = useState('');\n  const [isEditUploading, setIsEditUploading] = useState(false);\n\n  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {\n    const file = e.target.files?.[0];\n    if (!file) return;\n    if (isEditMode) setIsEditUploading(true);\n    else setIsUploading(true);\n    const reader = new FileReader();\n    reader.onloadend = async () => {\n      const base64String = reader.result as string;\n      const compressed = await compressImage(base64String);\n      if (isEditMode) {\n        setEditCompanyLogo(compressed);\n        setIsEditUploading(false);\n      } else {\n        setCompanyLogo(compressed);\n        setIsUploading(false);\n      }\n    };\n    reader.onerror = () => {\n      if (isEditMode) setIsEditUploading(false);\n      else setIsUploading(false);\n    };\n    reader.readAsDataURL(file);\n  };"
);

// Chunk 3
content = content.replace(
  "      tags\n    });\n\n    setTitle('');",
  "      tags,\n      companyLogo\n    });\n\n    setTitle('');"
);
content = content.replace(
  "    setTagsInput('');\n    setShowAddForm(false);",
  "    setTagsInput('');\n    setCompanyLogo('');\n    setShowAddForm(false);"
);

// Chunk 4
content = content.replace(
  "    setEditTagsInput(exp.tags.join(', '));",
  "    setEditTagsInput(exp.tags.join(', '));\n    setEditCompanyLogo(exp.companyLogo || '');"
);

// Chunk 5
content = content.replace(
  "      description: editDescription,\n      tags\n    });",
  "      description: editDescription,\n      tags,\n      companyLogo: editCompanyLogo\n    });"
);

// Form Fields UI - split the content by the common Key Contributions label
const parts = content.split("Key Contributions & Description</label>");
if (parts.length === 3) {
  // parts[0] + ADD FORM + parts[1] + EDIT FORM + parts[2]
  
  const logoInputAdd = `Logo Perusahaan (Opsional)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                  <div className={\`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 w-full sm:w-1/2 transition-colors \${
                    isDarkMode ? 'border-[#2e353f] hover:bg-[#181f2a]' : 'border-slate-200 hover:bg-slate-50'
                  }\`}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, false)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2"><Activity className="w-5 h-5 text-blue-500 animate-spin" /><span className="text-[10px] font-bold text-slate-400">MEMPROSES...</span></div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center"><Upload className="w-6 h-6 text-blue-500" /><span className="text-[11px] font-bold text-slate-500">Pilih / Seret Logo Perusahaan</span></div>
                    )}
                  </div>
                  {companyLogo && <div className="w-full sm:w-1/2 flex justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><img src={companyLogo} alt="Logo" className="max-h-16 object-contain rounded-lg" /></div>}
                </div>
              </div>

              <div>
                <label className={\`block text-[10px] font-bold uppercase tracking-wider mb-1 \${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }\`}>Key Contributions & Description</label>`;
                
  const logoInputEdit = `Logo Perusahaan (Opsional)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                  <div className={\`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 w-full sm:w-1/2 transition-colors \${
                    isDarkMode ? 'border-[#2e353f] hover:bg-[#181f2a]' : 'border-slate-200 hover:bg-slate-50'
                  }\`}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {isEditUploading ? (
                      <div className="flex flex-col items-center gap-2"><Activity className="w-5 h-5 text-blue-500 animate-spin" /><span className="text-[10px] font-bold text-slate-400">MEMPROSES...</span></div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center"><Upload className="w-6 h-6 text-blue-500" /><span className="text-[11px] font-bold text-slate-500">Pilih / Seret Logo Perusahaan</span></div>
                    )}
                  </div>
                  {editCompanyLogo && <div className="w-full sm:w-1/2 flex justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><img src={editCompanyLogo} alt="Logo" className="max-h-16 object-contain rounded-lg" /></div>}
                </div>
              </div>

              <div>
                <label className={\`block text-[10px] font-bold uppercase tracking-wider mb-1 \${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }\`}>Key Contributions & Description</label>`;

  content = parts[0] + logoInputAdd + parts[1] + logoInputEdit + parts[2];
} else {
  console.log("Error: Expected 2 occurrences of 'Key Contributions & Description</label>'");
  process.exit(1);
}

fs.writeFileSync(file, content);
console.log("AdminExperiences updated successfully.");
