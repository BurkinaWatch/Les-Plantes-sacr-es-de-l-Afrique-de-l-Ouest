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

export const JWT_ISSUER = process.env["JWT_ISSUER"] ?? "plantes-sacrees-api";
export const JWT_AUDIENCE = process.env["JWT_AUDIENCE"] ?? "plantes-sacrees-mobile";

function attachVerifiedUser(req: Request, token: string): boolean {
  const jwtSecret = process.env["JWT_SECRET"];
  if (!jwtSecret) return false;

  try {
    const payload: unknown = jwt.verify(token, jwtSecret, {
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
  const jwtSecret = process.env["JWT_SECRET"];
  if (!jwtSecret) {
    throw new Error(
      "JWT configuration is missing: set JWT_SECRET before using authenticated routes.",
    );
  }

  const expiresIn = (process.env["JWT_EXPIRES_IN"] ?? "7d") as jwt.SignOptions["expiresIn"];
  return jwt.sign(
    { id: user.id, username: user.username },
    jwtSecret,
    {
      algorithm: "HS256",
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER,
      expiresIn,
    },
  );
}
