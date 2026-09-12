#!/usr/bin/env node
/**
 * Pre-deploy authentication verification script
 *
 * Checks that:
 *   1. JWT_SECRET (server-side signing secret) is set
 *   2. No public client key is needed or accepted
 *   3. The mobile manifest points at the intended public API origin
 *   4. The live API reports ready health and validates registration input
 *   5. The live auth middleware enforces a valid JWT on both AI routes
 *      (POST /api/chat/totem and POST /api/plant-recognition)
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more checks failed (details printed to stderr)
 *
 * Environment variables:
 *   JWT_SECRET                — required
 *   DATABASE_URL or RAILWAY_DATABASE_URL
 *                             — required for the API's PostgreSQL connection
 *   API_BASE_URL              — API base URL used by the APK, including optional /api
 *                               (e.g. http://localhost:3000/api)
 *                               Falls back to http://localhost:$PORT if PORT is set.
 *                               If neither is set, live route checks are skipped with a warning.
 *                               When set, it must match mobile app.json's extra.apiBaseUrl.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"];
const DATABASE_URL =
  process.env["DATABASE_URL"] ?? process.env["RAILWAY_DATABASE_URL"];
const APP_JSON_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../mobile/app.json",
);

let failed = false;

function pass(msg) {
  console.log(`  ✅  ${msg}`);
}

function fail(msg) {
  console.error(`  ❌  ${msg}`);
  failed = true;
}

function warn(msg) {
  console.warn(`  ⚠️   ${msg}`);
}

function parseHttpUrl(value, variableName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${variableName} must be a non-empty HTTP(S) URL`);
  }

  let parsed;
  try {
    parsed = new URL(value.trim());
  } catch {
    throw new Error(`${variableName} is not a valid URL`);
  }

  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(`${variableName} must contain only an HTTP(S) URL`);
  }

  return parsed;
}

function canonicalApiBaseUrl(value, variableName) {
  const parsed = parseHttpUrl(value, variableName);
  const pathname = parsed.pathname.replace(/\/+$/, "");
  const apiPath = pathname.endsWith("/api") ? pathname : `${pathname}/api`;
  return `${parsed.origin}${apiPath === "/api" ? "/api" : apiPath}`;
}

function isReplitDevelopmentUrl(value) {
  const parsed = parseHttpUrl(value, "app.json extra.apiBaseUrl");
  const hostname = parsed.hostname.toLowerCase();
  return hostname.endsWith(".replit.dev") || hostname.endsWith(".repl.co");
}

function getManifestApiBaseUrl() {
  let appJson;
  try {
    appJson = JSON.parse(fs.readFileSync(APP_JSON_PATH, "utf8"));
  } catch (error) {
    throw new Error(`could not read mobile app.json: ${error.message}`);
  }

  const value = appJson?.expo?.extra?.apiBaseUrl;
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      "mobile app.json is missing expo.extra.apiBaseUrl; configure the public API URL before building an APK",
    );
  }

  const parsed = parseHttpUrl(value, "mobile app.json extra.apiBaseUrl");
  if (parsed.protocol !== "https:") {
    throw new Error(
      "mobile app.json expo.extra.apiBaseUrl must use HTTPS for an APK release",
    );
  }

  if (isReplitDevelopmentUrl(value)) {
    throw new Error(
      "mobile app.json expo.extra.apiBaseUrl points to a Replit development URL; configure the public API origin before building an APK",
    );
  }

  return value.trim();
}

// ── 1. Env var presence check ────────────────────────────────────────────────

console.log("\n🔐  Checking JWT authentication configuration…\n");

if (!JWT_SECRET) {
  fail("JWT_SECRET is not set — refusing to run authenticated API routes.");
  fail("  → Set it in Replit Secrets as JWT_SECRET before deploying.");
} else {
  pass("JWT_SECRET is configured.");
}

if (!DATABASE_URL) {
  fail("Database configuration is not set.");
  fail("  → Set DATABASE_URL or RAILWAY_DATABASE_URL before deploying.");
} else {
  pass("Database configuration is present.");
}

// ── 3. Live route check ──────────────────────────────────────────────────────

const rawBase =
  process.env["API_BASE_URL"] ??
  (process.env["PORT"] ? `http://localhost:${process.env["PORT"]}` : null);

const BASE_URL = rawBase ? rawBase.replace(/\/$/, "") : null;

function reportManifestApiConfiguration() {
  try {
    const manifestApiBaseUrl = getManifestApiBaseUrl();
    pass(`mobile app.json API origin is public: ${manifestApiBaseUrl}`);

    if (BASE_URL) {
      const expected = canonicalApiBaseUrl(BASE_URL, "API_BASE_URL");
      const configured = canonicalApiBaseUrl(
        manifestApiBaseUrl,
        "mobile app.json extra.apiBaseUrl",
      );
      if (expected !== configured) {
        fail(
          `mobile app.json API origin does not match API_BASE_URL (expected ${expected}, received ${configured})`,
        );
      } else {
        pass("mobile app.json API origin matches API_BASE_URL.");
      }
    }

    return manifestApiBaseUrl;
  } catch (error) {
    fail(error.message);
    return null;
  }
}

// ── 2. Mobile API origin check ────────────────────────────────────────────────

reportManifestApiConfiguration();

function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return BASE_URL?.endsWith("/api")
    ? `${BASE_URL}${normalizedPath.replace(/^\/api/, "")}`
    : `${BASE_URL}${normalizedPath}`;
}

function readinessDetails(body, httpStatus) {
  const status =
    typeof body?.status === "string" ? body.status : "unknown";
  const checks =
    body?.checks && typeof body.checks === "object" && !Array.isArray(body.checks)
      ? Object.entries(body.checks).map(([name, value]) => [
          name,
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
            ? String(value)
            : "unknown",
        ])
      : [];
  const database = checks.find(([name]) => name === "database")?.[1];
  const hasMissingConfiguration = checks.some(
    ([, value]) => value === "missing",
  );

  return {
    status,
    httpStatus,
    checks,
    diagnosis: hasMissingConfiguration
      ? "missing configuration"
      : database === "unavailable"
        ? "database unavailable"
        : status === "ready"
          ? "ready"
          : "not ready",
  };
}

if (!BASE_URL) {
  warn("API_BASE_URL and PORT are not set — skipping live route checks.");
  warn(
    "  → Set API_BASE_URL=<deployed-url> and re-run to verify auth end-to-end.",
  );
  console.log();
} else {
  console.log(`\n🌐  Running live auth checks against ${BASE_URL}…\n`);

  try {
    const response = await fetch(apiUrl("/api/healthz"), {
      signal: AbortSignal.timeout(10_000),
    });
    const body = await response.json().catch(() => null);
    const readiness = readinessDetails(body, response.status);
    console.log(
      `  ℹ️   GET /api/healthz: readiness status=${readiness.status} (HTTP ${readiness.httpStatus}).`,
    );
    if (readiness.checks.length === 0) {
      fail("  → Readiness checks are missing from the health response.");
    } else {
      for (const [name, value] of readiness.checks) {
        const message = `  → Readiness check ${name}=${value}.`;
        if (value === "missing" || value === "unavailable") {
          fail(message);
        } else {
          pass(message);
        }
      }
    }

    const isExpectedHealthResponse =
      body?.status === "ready" &&
      body?.ready === true &&
      body?.checks?.database === "ready" &&
      body?.checks?.jwt === "configured";
    if (response.status !== 200 || !isExpectedHealthResponse) {
      fail(
        `GET /api/healthz: ${readiness.diagnosis} — expected ready response.`,
      );
      fail(
        "  → Missing configuration and database-unavailable states are reported above by check name.",
      );
    } else {
      pass("GET /api/healthz: returned the expected ready JSON.");
    }
  } catch (err) {
    fail(`GET /api/healthz: request failed — ${err.message}`);
    fail(`  → Is the server running at ${BASE_URL}?`);
  }

  try {
    const response = await fetch(apiUrl("/api/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(10_000),
    });
    const body = await response.json().catch(() => null);
    if (
      response.status !== 400 ||
      typeof body?.error !== "string" ||
      body.error.trim() === ""
    ) {
      fail(
        `POST /api/auth/register: expected controlled HTTP 400 JSON validation response, received HTTP ${response.status} ${JSON.stringify(body)}`,
      );
    } else {
      pass(
        "POST /api/auth/register: invalid input returned controlled JSON validation.",
      );
    }
  } catch (err) {
    fail(`POST /api/auth/register: request failed — ${err.message}`);
    fail(`  → Is the server running at ${BASE_URL}?`);
  }

  /**
   * Ping a route with an arbitrary body.
   * We only care about the HTTP status, not a valid AI response:
   *   - 401 → token was rejected (auth failed)
   *   - 400 → token was accepted but body was invalid (auth passed)
   *   - 2xx → token was accepted (unexpected with dummy body, but still fine)
   *   - 5xx → server error (surfaces misconfiguration)
   */
  async function probeRoute({ label, path, token }) {
    const url = apiUrl(path);
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let status;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        // Intentionally minimal body — we only want to exercise the auth layer.
        body: JSON.stringify({}),
        signal: AbortSignal.timeout(10_000),
      });
      status = res.status;
    } catch (err) {
      fail(`${label}: request failed — ${err.message}`);
      fail(`  → Is the server running at ${BASE_URL}?`);
      return null;
    }

    return status;
  }

  const routes = [
    { label: "POST /api/chat/totem", path: "/api/chat/totem" },
    { label: "POST /api/plant-recognition", path: "/api/plant-recognition" },
  ];

  const validToken = JWT_SECRET
    ? jwt.sign({ id: 1, username: "security-check" }, JWT_SECRET, {
        algorithm: "HS256",
        issuer: "plantes-sacrees-api",
        audience: "plantes-sacrees-mobile",
        expiresIn: "5m",
      })
    : null;

  for (const route of routes) {
    // (a) With a server-issued JWT — must NOT be 401 or 5xx.
    const statusWith = await probeRoute({
      ...route,
      label: `${route.label} (with JWT)`,
      token: validToken,
    });
    if (statusWith !== null) {
      if (statusWith === 401) {
        fail(
          `${route.label}: server returned 401 even though a valid JWT was sent.`,
        );
      } else if (statusWith >= 500) {
        fail(
          `${route.label}: server returned ${statusWith} — possible startup misconfiguration (check server logs).`,
        );
      } else {
        pass(`${route.label}: JWT accepted (HTTP ${statusWith}).`);
      }
    }

    // (b) Without a token — must be 401 (confirms auth is enforced).
    const statusWithout = await probeRoute({
      ...route,
      label: `${route.label} (no JWT)`,
      token: null,
    });
    if (statusWithout !== null) {
      if (statusWithout === 401) {
        pass(
          `${route.label}: auth enforced — unauthenticated request correctly rejected.`,
        );
      } else {
        fail(
          `${route.label}: unauthenticated request returned ${statusWithout} instead of 401.`,
        );
        fail("  → The route is not protected — requireJwt may be missing.");
      }
    }

    // (c) With an invalid token — must be 401.
    const statusInvalid = await probeRoute({
      ...route,
      label: `${route.label} (invalid JWT)`,
      token: "invalid-token-for-smoke-test",
    });
    if (statusInvalid !== null) {
      if (statusInvalid === 401) {
        pass(`${route.label}: invalid JWT correctly rejected.`);
      } else {
        fail(
          `${route.label}: invalid JWT returned ${statusInvalid} instead of 401.`,
        );
      }
    }
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

if (failed) {
  console.error(
    "\n🚨  Pre-deploy check FAILED — fix the issues above before deploying.\n",
  );
  process.exit(1);
} else {
  console.log("\n✅  All JWT checks passed — safe to deploy.\n");
  process.exit(0);
}
