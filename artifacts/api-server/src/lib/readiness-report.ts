function redactDatabaseUrl(message: string): string {
  return message.replace(
    /(?:postgres(?:ql)?):\/\/[^\s"'`]+/gi,
    "postgresql://[redacted]",
  );
}

export function getReadinessDatabaseUrl(
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  return env.READINESS_DATABASE_URL?.trim() || undefined;
}

export function formatReadinessFailure(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : undefined;

  if (code) {
    return `database operation failed (${code})`;
  }

  return redactDatabaseUrl(message);
}