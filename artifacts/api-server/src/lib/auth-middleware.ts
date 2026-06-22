import { Request, Response, NextFunction } from "express";

const API_KEY = process.env["CHAT_API_KEY"];

if (!API_KEY) {
  if (process.env["NODE_ENV"] === "production") {
    throw new Error("FATAL: CHAT_API_KEY environment variable is not set.");
  } else {
    console.warn("[auth] WARNING: CHAT_API_KEY is not set — chat endpoint is unprotected in dev.");
  }
}

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  if (!API_KEY) {
    // Dev mode without key configured — allow through
    return next();
  }
  const key = req.headers["x-api-key"];
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: "Clé API manquante ou invalide" });
  }
  return next();
}
