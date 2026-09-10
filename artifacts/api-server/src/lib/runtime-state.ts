import {
  getRuntimeConfiguration,
  type RuntimeConfiguration,
} from "./runtime-config.js";

export type DatabaseReadiness = "not_started" | "checking" | "ready" | "failed";

let databaseReadiness: DatabaseReadiness = "not_started";
let databaseFailureMessage: string | undefined;

export function setDatabaseReadiness(
  readiness: DatabaseReadiness,
  failureMessage?: string,
): void {
  databaseReadiness = readiness;
  databaseFailureMessage = failureMessage;
}

export type ReadinessReport = {
  status: "ready" | "not_ready";
  ready: boolean;
  checks: {
    database: "missing" | "checking" | "ready" | "unavailable";
    jwt: "missing" | "configured";
  };
  message: string;
};

export function getReadinessReport(
  configuration: RuntimeConfiguration = getRuntimeConfiguration(),
): ReadinessReport {
  const database = !configuration.databaseConfigured
    ? "missing"
    : databaseReadiness === "ready"
      ? "ready"
      : databaseReadiness === "failed"
        ? "unavailable"
        : "checking";
  const jwt = configuration.jwtConfigured ? "configured" : "missing";
  const messages = configuration.issues.map((issue) => issue.message);

  if (configuration.databaseConfigured && databaseReadiness === "not_started") {
    messages.push("Database schema verification has not started yet.");
  } else if (configuration.databaseConfigured && databaseReadiness === "checking") {
    messages.push("Database schema verification is still in progress.");
  } else if (configuration.databaseConfigured && databaseReadiness === "failed") {
    messages.push(
      databaseFailureMessage ??
        "Database schema verification failed. Check the PostgreSQL connection and server logs.",
    );
  }

  const ready =
    configuration.issues.length === 0 && databaseReadiness === "ready";

  return {
    status: ready ? "ready" : "not_ready",
    ready,
    checks: { database, jwt },
    message: ready
      ? "API is ready to accept traffic."
      : messages.join(" "),
  };
}