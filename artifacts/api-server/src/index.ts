import app from "./app";
import { logger } from "./lib/logger";
import { ensureSchema } from "./lib/migrate";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Validate required secrets at startup so misconfiguration surfaces immediately
// in logs rather than only when the first AI request arrives.
//
// CHAT_API_KEY gates all AI routes (plant-recognition, chat/totem).
// In production the auth middleware throws if it is unset; here we log the
// state clearly so operators can confirm protection is active on startup.
const REQUIRED_AI_KEYS: Array<{ key: string; feature: string }> = [
  { key: "GROQ_API_KEY", feature: "plant recognition & totem chat" },
  { key: "CHAT_API_KEY", feature: "AI route authentication (plant-recognition & chat/totem)" },
];
for (const { key, feature } of REQUIRED_AI_KEYS) {
  if (!process.env[key]) {
    if (process.env["NODE_ENV"] === "production") {
      // auth-middleware.ts also throws for CHAT_API_KEY; this gives a second,
      // earlier signal that a required secret is absent before any request hits.
      logger.error(`[startup] FATAL: ${key} is not set in production — ${feature} will be inaccessible. Set the secret and redeploy.`);
    } else {
      logger.warn(`[startup] ${key} is not set — ${feature} unprotected in dev. Set the secret before deploying.`);
    }
  } else {
    logger.info(`[startup] ${key} is configured — ${feature} available.`);
  }
}

ensureSchema().then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}).catch((err) => {
  logger.error({ err }, "Startup failed: could not ensure database schema");
  process.exit(1);
});
