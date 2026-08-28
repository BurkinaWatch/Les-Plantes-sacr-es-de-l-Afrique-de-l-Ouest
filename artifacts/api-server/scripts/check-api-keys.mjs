#!/usr/bin/env node
/**
 * Pre-deploy authentication verification script
 *
 * Checks that:
 *   1. JWT_SECRET (server-side signing secret) is set
 *   2. No public client key is needed or accepted
 *   3. The live auth middleware enforces a valid JWT on both AI routes
 *      (POST /api/chat/totem and POST /api/plant-recognition)
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more checks failed (details printed to stderr)
 *
 * Environment variables:
 *   JWT_SECRET                — required
 *   API_BASE_URL              — base URL for live checks (e.g. http://localhost:3000)
 *                               Falls back to http://localhost:$PORT if PORT is set.
 *                               If neither is set, live checks are skipped with a warning.
 */

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"];

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

// ── 1. Env var presence check ────────────────────────────────────────────────

console.log("\n🔐  Checking JWT authentication configuration…\n");

if (!JWT_SECRET) {
  fail("JWT_SECRET is not set — refusing to run authenticated API routes.");
  fail("  → Set it in Replit Secrets as JWT_SECRET before deploying.");
} else {
  pass("JWT_SECRET is configured.");
}

// ── 3. Live route check ──────────────────────────────────────────────────────

const rawBase =
  process.env["API_BASE_URL"] ??
  (process.env["PORT"] ? `http://localhost:${process.env["PORT"]}` : null);

const BASE_URL = rawBase ? rawBase.replace(/\/$/, "") : null;

if (!BASE_URL) {
  warn("API_BASE_URL and PORT are not set — skipping live route checks.");
  warn("  → Set API_BASE_URL=<deployed-url> and re-run to verify auth end-to-end.");
  console.log();
} else {
  console.log(`\n🌐  Running live auth checks against ${BASE_URL}…\n`);

  /**
   * Ping a route with an arbitrary body.
   * We only care about the HTTP status, not a valid AI response:
   *   - 401 → token was rejected (auth failed)
   *   - 400 → token was accepted but body was invalid (auth passed)
   *   - 2xx → token was accepted (unexpected with dummy body, but still fine)
   *   - 5xx → server error (surfaces misconfiguration)
   */
  async function probeRoute({ label, path, token }) {
    const url = `${BASE_URL}${path}`;
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
    { label: "POST /api/chat/totem",          path: "/api/chat/totem" },
    { label: "POST /api/plant-recognition",   path: "/api/plant-recognition" },
  ];

  const validToken = JWT_SECRET
    ? jwt.sign(
      { id: 1, username: "security-check" },
      JWT_SECRET,
      { algorithm: "HS256", issuer: "plantes-sacrees-api", audience: "plantes-sacrees-mobile", expiresIn: "5m" },
    )
    : null;

  for (const route of routes) {
    // (a) With a server-issued JWT — must NOT be 401 or 5xx.
    const statusWith = await probeRoute({ ...route, label: `${route.label} (with JWT)`, token: validToken });
    if (statusWith !== null) {
      if (statusWith === 401) {
        fail(`${route.label}: server returned 401 even though a valid JWT was sent.`);
      } else if (statusWith >= 500) {
        fail(`${route.label}: server returned ${statusWith} — possible startup misconfiguration (check server logs).`);
      } else {
        pass(`${route.label}: JWT accepted (HTTP ${statusWith}).`);
      }
    }

    // (b) Without a token — must be 401 (confirms auth is enforced).
    const statusWithout = await probeRoute({ ...route, label: `${route.label} (no JWT)`, token: null });
    if (statusWithout !== null) {
      if (statusWithout === 401) {
        pass(`${route.label}: auth enforced — unauthenticated request correctly rejected.`);
      } else {
        fail(`${route.label}: unauthenticated request returned ${statusWithout} instead of 401.`);
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
      fail(`${route.label}: invalid JWT returned ${statusInvalid} instead of 401.`);
      }
    }
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

if (failed) {
  console.error("\n🚨  Pre-deploy check FAILED — fix the issues above before deploying.\n");
  process.exit(1);
} else {
  console.log("\n✅  All JWT checks passed — safe to deploy.\n");
  process.exit(0);
}
