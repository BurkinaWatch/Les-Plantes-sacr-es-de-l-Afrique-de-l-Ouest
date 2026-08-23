/**
 * Shared rate-limit utilities for AI routes.
 *
 * Key design decisions:
 * - Rate-limit keys are based on `x-user-id` when present (per-user), falling back to IP.
 * - All limits are configurable via environment variables so they can be tuned without code changes.
 * - Monthly quotas are tracked in-memory (resets on server restart). In a production deployment
 *   with multiple replicas or strict durability requirements, replace `monthlyUsage` with a
 *   persistent store (e.g. Redis or a DB table).
 */

import { Request, Response, NextFunction } from "express";
import rateLimit, { Options, ipKeyGenerator } from "express-rate-limit";

// ── Configurable limits ───────────────────────────────────────────────────────

/** Sliding-window size (ms) for the per-minute rate limits. Default: 1 minute. */
export const RATE_LIMIT_WINDOW_MS =
  parseInt(process.env["RATE_LIMIT_WINDOW_MS"] ?? "60000", 10);

/** Per-user request cap for the plant-recognition endpoint per window. Default: 10. */
export const RECOGNITION_RATE_LIMIT_MAX =
  parseInt(process.env["RECOGNITION_RATE_LIMIT_MAX"] ?? "10", 10);

/** Per-user request cap for the chat/totem endpoint per window. Default: 20. */
export const CHAT_RATE_LIMIT_MAX =
  parseInt(process.env["CHAT_RATE_LIMIT_MAX"] ?? "20", 10);

/**
 * Soft monthly AI request quota per user across **all** AI endpoints.
 * 0 (default) = disabled.
 */
export const MONTHLY_AI_QUOTA =
  parseInt(process.env["MONTHLY_AI_QUOTA"] ?? "0", 10);

// ── Key generator ─────────────────────────────────────────────────────────────

/**
 * Returns a rate-limit key for the given request.
 *
 * Uses the server-verified user ID from `req.user` (set by `optionalJwt` middleware)
 * when the caller presented a valid JWT. This guarantees the key is tied to a
 * server-issued identity that cannot be spoofed by the client.
 *
 * Falls back to the client IP (IPv6-safe) for unauthenticated requests.
 */
export function userKeyGenerator(req: Request): string {
  // req.user is set by optionalJwt only after server-side JWT verification
  const userId = req.user?.id;
  if (userId != null) {
    return `user:${userId}`;
  }
  // Fallback: use the library's IPv6-safe IP key generator
  return ipKeyGenerator(req.ip ?? "unknown");
}

// ── Monthly quota middleware ───────────────────────────────────────────────────

/** In-memory store: "userId:YYYY-MM" → request count. */
const monthlyUsage = new Map<string, number>();

/**
 * Returns the current month key, e.g. "2026-07".
 */
function currentMonthKey(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * Express middleware that enforces a soft monthly quota per user (across all AI routes).
 * When `MONTHLY_AI_QUOTA` is 0 the middleware is a no-op.
 *
 * When the quota is exceeded, responds with 429 and a clear error.
 * Otherwise increments the counter and calls `next()`.
 *
 * NOTE: Because the counter lives in process memory it resets on server restart and
 * is not shared across multiple server instances.  For production multi-instance
 * deployments, back this with Redis or a DB.
 */
export function monthlyQuotaMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (MONTHLY_AI_QUOTA <= 0) {
    return next();
  }

  const key = `${userKeyGenerator(req)}:${currentMonthKey()}`;
  const current = monthlyUsage.get(key) ?? 0;

  if (current >= MONTHLY_AI_QUOTA) {
    res.status(429).json({
      error: "Quota mensuel atteint. Réessaye le mois prochain.",
      quota: MONTHLY_AI_QUOTA,
      used: current,
    });
    return;
  }

  monthlyUsage.set(key, current + 1);
  next();
}

// ── Factory helpers ───────────────────────────────────────────────────────────

/**
 * Creates a per-user rate limiter with the given options.
 * The `keyGenerator` is always set to `userKeyGenerator`.
 */
export function createUserRateLimiter(options: Partial<Options>) {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: userKeyGenerator,
    ...options,
  });
}
