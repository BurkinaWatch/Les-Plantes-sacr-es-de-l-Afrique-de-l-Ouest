export type RuntimeIssue = {
  variable: string;
  message: string;
};

export type RuntimeConfiguration = {
  databaseConfigured: boolean;
  jwtConfigured: boolean;
  issues: RuntimeIssue[];
};

function hasValue(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function hasDatabaseConfiguration(env: NodeJS.ProcessEnv): boolean {
  const configuredUrl = env.DATABASE_URL ?? env.RAILWAY_DATABASE_URL;
  return hasValue(configuredUrl);
}

export function getRuntimeConfiguration(
  env: NodeJS.ProcessEnv = process.env,
): RuntimeConfiguration {
  const databaseConfigured = hasDatabaseConfiguration(env);
  const jwtConfigured = hasValue(env.JWT_SECRET);
  const issues: RuntimeIssue[] = [];

  if (!databaseConfigured) {
    issues.push({
      variable: "DATABASE_URL",
      message:
        "Database configuration is missing. Set DATABASE_URL (or Railway's RAILWAY_DATABASE_URL) to a provisioned PostgreSQL database.",
    });
  }

  if (!jwtConfigured) {
    issues.push({
      variable: "JWT_SECRET",
      message:
        "JWT signing configuration is missing. Set JWT_SECRET to a long, private signing secret before deploying.",
    });
  }

  return { databaseConfigured, jwtConfigured, issues };
}