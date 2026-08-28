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

const JWT_SECRET = process.env["JWT_SECRET"] ?? "";
if (!JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is not set.");
}

export const JWT_ISSUER = process.env["JWT_ISSUER"] ?? "plantes-sacrees-api";
export const JWT_AUDIENCE = process.env["JWT_AUDIENCE"] ?? "plantes-sacrees-mobile";

function attachVerifiedUser(req: Request, token: string): boolean {
  try {
    const payload: unknown = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    const claims = typeof payload === "object" && payload !== null
      ? payload as Record<string, unknown>
      : null;
    if (
      claims !== null &&
      typeof claims.id === "number" &&
      Number.isInteger(claims.id) &&
      claims.id > 0 &&
      typeof claims.username === "string" &&
      claims.username.length > 0 &&
      claims.username.length <= 30
    ) {
      req.user = { id: claims.id, username: claims.username };
      return true;
    }
  } catch {
    // Invalid, expired, or incorrectly scoped tokens are never accepted.
  }
  return false;
}

/**
 * Requires a server-issued JWT and attaches only its verified identity.
 * AI and push-token routes must not be callable with a public client key.
 */
export function requireJwt(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers["authorization"];
  if (typeof auth !== "string" || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentification requise" });
    return;
  }

  if (!attachVerifiedUser(req, auth.slice(7).trim())) {
    res.status(401).json({ error: "Session invalide ou expirée" });
    return;
  }

  next();
}

export function signUserToken(user: { id: number; username: string }): string {
  const expiresIn = (process.env["JWT_EXPIRES_IN"] ?? "7d") as jwt.SignOptions["expiresIn"];
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    {
      algorithm: "HS256",
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER,
      expiresIn,
    },
  );
}
