import assert from "node:assert/strict";
import test from "node:test";

import { resolveApiBaseUrl } from "../.test-dist/api-config-core.js";

test("prefers an explicit API URL over release and development hosts", () => {
  assert.equal(
    resolveApiBaseUrl({
      explicitApiBaseUrl: "https://explicit-api.example.com/api/",
      releaseApiBaseUrl: "https://release-api.example.com/api",
      developmentDomain: "mobile.example.com",
    }),
    "https://explicit-api.example.com",
  );
});

test("uses the release API URL when no explicit URL is provided", () => {
  assert.equal(
    resolveApiBaseUrl({
      releaseApiBaseUrl: " https://release-api.example.com/api/// ",
      developmentDomain: "mobile.example.com",
    }),
    "https://release-api.example.com",
  );
});

test("falls back to the development domain only when API URLs are absent", () => {
  assert.equal(
    resolveApiBaseUrl({ developmentDomain: "mobile.example.com" }),
    "https://mobile.example.com",
  );
});

test("keeps the web host fallback below all configured API URLs", () => {
  assert.equal(
    resolveApiBaseUrl({
      platform: "web",
      webHostname: "preview.replit.dev",
      releaseApiBaseUrl: "https://release-api.example.com/api",
    }),
    "https://release-api.example.com",
  );
  assert.equal(
    resolveApiBaseUrl({ platform: "web", webHostname: "preview.replit.dev" }),
    "https://preview.replit.dev:8080",
  );
});

test("normalizes API path prefixes so generated /api routes are not duplicated", () => {
  const baseUrl = resolveApiBaseUrl({
    releaseApiBaseUrl: "https://api.example.com/api/",
  });

  assert.equal(`${baseUrl}/api/subscriptions/plans`, "https://api.example.com/api/subscriptions/plans");
});