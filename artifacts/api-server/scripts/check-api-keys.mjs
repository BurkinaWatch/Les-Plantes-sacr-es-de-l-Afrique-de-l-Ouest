#!/usr/bin/env node
/**
 * Pre-deploy API key verification script
 *
 * Checks that:
 *   1. CHAT_API_KEY (server-side auth gate) is set
 *   2. EXPO_PUBLIC_CHAT_API_KEY (mobile client key) is set
 *   3. Both keys match — a mismatch means every mobile AI request will 401
 *   4. The live auth middleware actually enforces the key on both AI routes
 *      (POST /api/chat/totem and POST /api/plant-recognition)
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more checks failed (details printed to stderr)
 *
 * Environment variables:
 *   CHAT_API_KEY              — required
 *   EXPO_PUBLIC_CHAT_API_KEY  — required
 *   API_BASE_URL              — base URL for live checks (e.g. http://localhost:3000)
 *                               Falls back to http://localhost:$PORT if PORT is set.
 *                               If neither is set, live checks are skipped with a warning.
 */

const CHAT_API_KEY = process.env["CHAT_API_KEY"];
const EXPO_PUBLIC_CHAT_API_KEY = process.env["EXPO_PUBLIC_CHAT_API_KEY"];

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

console.log("\n🔑  Checking API key environment variables…\n");

if (!CHAT_API_KEY) {
  fail("CHAT_API_KEY is not set — all AI routes will be unprotected (dev) or crash (production).");
  fail("  → Set it in Replit Secrets as CHAT_API_KEY before deploying.");
} else {
  pass("CHAT_API_KEY is set.");
}

if (!EXPO_PUBLIC_CHAT_API_KEY) {
  fail("EXPO_PUBLIC_CHAT_API_KEY is not set — the mobile app cannot authenticate with the API.");
  fail("  → Set it in Replit Secrets as EXPO_PUBLIC_CHAT_API_KEY (must equal CHAT_API_KEY).");
} else {
  pass("EXPO_PUBLIC_CHAT_API_KEY is set.");
}

// ── 2. Key match check ───────────────────────────────────────────────────────

if (CHAT_API_KEY && EXPO_PUBLIC_CHAT_API_KEY) {
  if (CHAT_API_KEY === EXPO_PUBLIC_CHAT_API_KEY) {
    pass("CHAT_API_KEY and EXPO_PUBLIC_CHAT_API_KEY match — mobile ↔ server auth will succeed.");
  } else {
    fail("CHAT_API_KEY and EXPO_PUBLIC_CHAT_API_KEY do NOT match.");
    fail("  → Every AI request from the mobile app will receive a 401 Unauthorized.");
    fail("  → Fix: make both secrets identical.");
  }
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
   *   - 401 → key was rejected (auth failed)
   *   - 400 → key was accepted but body was invalid (auth passed — expected for probe bodies)
   *   - 2xx → key was accepted (unexpected with dummy body, but still fine)
   *   - 5xx → server error (surfaces misconfiguration)
   */
  async function probeRoute({ label, path, withKey }) {
    const url = `${BASE_URL}${path}`;
    const headers = { "Content-Type": "application/json" };
    if (withKey && CHAT_API_KEY) {
      headers["x-api-key"] = CHAT_API_KEY;
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

  for (const route of routes) {
    // (a) With key — must NOT be 401 or 5xx
    const statusWith = await probeRoute({ ...route, label: `${route.label} (with key)`, withKey: true });
    if (statusWith !== null) {
      if (statusWith === 401) {
        fail(`${route.label}: server returned 401 even though x-api-key was sent.`);
        fail("  → CHAT_API_KEY on the server does not match the key in this environment.");
        fail("  → Redeploy after aligning both secrets.");
      } else if (statusWith >= 500) {
        fail(`${route.label}: server returned ${statusWith} — possible startup misconfiguration (check server logs).`);
      } else {
        // 400 (bad body) or 200 are both fine — auth was accepted
        pass(`${route.label}: key accepted (HTTP ${statusWith}).`);
      }
    }

    // (b) Without key — must be 401 (confirms auth IS enforced)
    const statusWithout = await probeRoute({ ...route, label: `${route.label} (no key)`, withKey: false });
    if (statusWithout !== null) {
      if (statusWithout === 401) {
        pass(`${route.label}: auth enforced — unauthenticated request correctly rejected.`);
      } else {
        fail(`${route.label}: unauthenticated request returned ${statusWithout} instead of 401.`);
        fail("  → The route is not protected — CHAT_API_KEY may not be loaded by the server.");
      }
    }
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

if (failed) {
  console.error("\n🚨  Pre-deploy check FAILED — fix the issues above before deploying.\n");
  process.exit(1);
} else {
  console.log("\n✅  All API key checks passed — safe to deploy.\n");
  process.exit(0);
}
