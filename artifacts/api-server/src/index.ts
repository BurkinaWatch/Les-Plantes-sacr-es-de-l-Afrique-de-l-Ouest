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

// Warn at startup if AI features will be unavailable due to missing secrets.
// This surfaces the problem immediately in logs rather than only on first request.
const REQUIRED_AI_KEYS: Array<{ key: string; feature: string }> = [
  { key: "GROQ_API_KEY", feature: "plant recognition & totem chat" },
];
for (const { key, feature } of REQUIRED_AI_KEYS) {
  if (!process.env[key]) {
    logger.warn(`[startup] ${key} is not set — ${feature} will return 503. Set the secret and restart the server.`);
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
