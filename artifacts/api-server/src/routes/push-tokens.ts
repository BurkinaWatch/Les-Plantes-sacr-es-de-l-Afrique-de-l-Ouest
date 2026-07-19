/**
 * POST /api/push-tokens — register an Expo push token for the authenticated user.
 *
 * The token is stored and associated with the user so the server can send push
 * notifications (e.g. via Expo Push API) when long-running tasks complete.
 */
import { Router } from "express";
import { z } from "zod";
import { pool } from "@workspace/db";
import { requireApiKey, optionalJwt } from "../lib/auth-middleware.js";
import { logger } from "../lib/logger.js";

const router = Router();

const tokenSchema = z.object({
  token: z.string().min(1).max(500),
  platform: z.enum(["ios", "android", "web"]).optional(),
});

/**
 * Send a push notification to one or more Expo push tokens via the Expo Push API.
 * Safe to call with an empty token list (no-op).
 */
export async function sendExpoPushNotification(
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, unknown>
): Promise<void> {
  if (tokens.length === 0) return;
  const messages = tokens.map((to) => ({ to, title, body, data: data ?? {} }));
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify(messages),
    });
  } catch (err) {
    logger.warn({ err }, "[push] Failed to deliver Expo push notification");
  }
}

router.post("/", requireApiKey, optionalJwt, async (req, res) => {
  const parsed = tokenSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Token invalide", details: parsed.error.issues });
  }

  const { token, platform } = parsed.data;
  const userId = req.user?.id ?? null;

  try {
    await pool.query(
      `INSERT INTO push_tokens (user_id, token, platform, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (token) DO UPDATE SET user_id = $1, platform = $3, updated_at = NOW()`,
      [userId, token, platform ?? null]
    );
    logger.info({ userId, platform }, "[push] Push token registered");
    return res.status(201).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "[push] Failed to store push token");
    // Non-critical — token registration failure should not break the app flow.
    return res.status(200).json({ ok: false, error: "Could not persist token" });
  }
});

export default router;
