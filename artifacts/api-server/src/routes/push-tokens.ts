/**
 * POST /api/push-tokens — register an Expo push token for the authenticated user.
 *
 * The token is stored and associated with the user so the server can send push
 * notifications (e.g. via Expo Push API) when long-running tasks complete.
 */
import { Router } from "express";
import { z } from "zod";
import { pool } from "@workspace/db";
import { requireJwt } from "../lib/auth-middleware.js";
import { logger } from "../lib/logger.js";

const router = Router();

const tokenSchema = z.object({
  token: z.string().trim().min(1).max(500).regex(/^ExponentPushToken\[[A-Za-z0-9_-]+\]$/, "Token Expo invalide"),
  platform: z.enum(["ios", "android", "web"]).optional(),
}).strict();

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

router.post("/", requireJwt, async (req, res) => {
  const parsed = tokenSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Token invalide" });
  }

  const { token, platform } = parsed.data;
  const userId = req.user!.id;

  try {
    const result = await pool.query(
      `INSERT INTO push_tokens (user_id, token, platform, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (token) DO UPDATE SET platform = $3, updated_at = NOW()
       WHERE push_tokens.user_id = $1
       RETURNING id`,
      [userId, token, platform ?? null]
    );
    if (result.rowCount === 0) {
      return res.status(409).json({ error: "Ce token est déjà associé à un autre compte" });
    }
    logger.info({ userId, platform }, "[push] Push token registered");
    return res.status(201).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "[push] Failed to store push token");
    return res.status(500).json({ error: "Impossible d'enregistrer le token" });
  }
});

export default router;
