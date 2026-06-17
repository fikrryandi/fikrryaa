/**
 * Vercel Serverless Function Entry Point
 * 
 * Vercel requires functions to be inside the /api directory.
 * This file simply re-exports the Express app from server.ts
 * so Vercel can use it as a serverless handler.
 * 
 * IS_VERCEL will be true here, so server.ts will:
 *  - NOT start Vite dev server
 *  - NOT call app.listen()
 *  - ONLY serve static dist/ files and API routes via Firestore
 */
export { default } from '../server';
