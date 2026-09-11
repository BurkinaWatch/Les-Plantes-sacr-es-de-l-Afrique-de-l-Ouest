import app from "./app";
import { logger } from "./lib/logger";
import {
  ensureSchema,
  IncompatibleSchemaVersionError,
} from "./lib/migrate";
import { getRuntimeConfiguration } from "./lib/runtime-config";
import { setDatabaseReadiness } from "./lib/runtime-state";

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

const runtimeConfiguration = getRuntimeConfiguration();

if (runtimeConfiguration.issues.length > 0) {
  logger.error(
    { missingVariables: runtimeConfiguration.issues.map((issue) => issue.variable) },
    [
      "[startup] Runtime configuration is incomplete.",
      ...runtimeConfiguration.issues.map((issue) => `[startup] ${issue.message}`),
      "[startup] Railway will keep this deployment unready until these variables are configured.",
    ].join("\n"),
  );
}

if (!process.env["GROQ_API_KEY"]) {
  logger.warn("[startup] GROQ_API_KEY is not set — AI features will be unavailable.");
}

if (!runtimeConfiguration.databaseConfigured) {
  setDatabaseReadiness("failed", runtimeConfiguration.issues.find(
    (issue) => issue.variable === "DATABASE_URL",
  )?.message);
} else {
  setDatabaseReadiness("checking");
}

const server = app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info(
    { port, healthcheckPath: "/api/healthz" },
    "Server listening; waiting for readiness checks",
  );
});

if (runtimeConfiguration.databaseConfigured) {
  ensureSchema()
    .then(() => {
      setDatabaseReadiness("ready");
      logger.info("Startup readiness check passed");
    })
    .catch((err) => {
      setDatabaseReadiness(
        err instanceof IncompatibleSchemaVersionError
          ? "incompatible"
          : "failed",
        err instanceof IncompatibleSchemaVersionError
          ? err.message
          : "Database schema verification failed. Check DATABASE_URL and the PostgreSQL service logs.",
      );
      logger.error(
        { err },
        "Startup readiness check failed: could not ensure database schema",
      );
    });
}

server.on("error", (err) => {
  logger.error({ err }, "Server error");
  process.exit(1);
});
