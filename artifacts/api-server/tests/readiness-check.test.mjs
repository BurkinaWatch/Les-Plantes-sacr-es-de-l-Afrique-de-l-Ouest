import assert from "node:assert/strict";
import test from "node:test";

import {
  formatReadinessFailure,
  getReadinessDatabaseUrl,
} from "../.test-dist/src/scripts/check-postgres-readiness.js";

test("readiness check accepts only the explicitly supplied database URL", () => {
  assert.equal(
    getReadinessDatabaseUrl({
      DATABASE_URL: "postgresql://runtime.example/app",
      READINESS_DATABASE_URL: "  postgresql://check.example/app  ",
    }),
    "postgresql://check.example/app",
  );
  assert.equal(
    getReadinessDatabaseUrl({
      DATABASE_URL: "postgresql://runtime.example/app",
    }),
    undefined,
  );
});

test("readiness failures never expose a database URL or password", () => {
  assert.equal(
    formatReadinessFailure(
      new Error(
        "connection failed for postgresql://user:password@db.example/app",
      ),
    ),
    "connection failed for postgresql://[redacted]",
  );
});

test("readiness failures with network codes omit the host", () => {
  const error = Object.assign(
    new Error("getaddrinfo ENOTFOUND postgres.internal"),
    { code: "ENOTFOUND" },
  );

  assert.equal(
    formatReadinessFailure(error),
    "database operation failed (ENOTFOUND)",
  );
});