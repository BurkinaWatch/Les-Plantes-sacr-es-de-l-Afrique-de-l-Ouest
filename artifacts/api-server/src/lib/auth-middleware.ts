import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to carry a server-verified user identity
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };
    }
  }
}

const API_KEY = process.env["CHAT_API_KEY"];
const JWT_SECRET = process.env["JWT_SECRET"] ?? "animaux-sacres-secret-change-in-prod";

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

/**
 * Optional JWT middleware. When a valid `Authorization: Bearer <token>` header is
 * present, verifies the token and attaches `req.user = { id, username }`.
 * Never blocks the request — missing or invalid tokens are silently ignored and
 * the rate limiter falls back to IP-based limits instead.
 */
export function optionalJwt(req: Request, _res: Response, next: NextFunction): void {
  const auth = req.headers["authorization"];
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
      if (typeof payload.id === "number" && typeof payload.username === "string") {
        req.user = { id: payload.id, username: payload.username };
      }
    } catch {
      // Invalid/expired token — treat as unauthenticated, continue without blocking
    }
  }
  next();
}
