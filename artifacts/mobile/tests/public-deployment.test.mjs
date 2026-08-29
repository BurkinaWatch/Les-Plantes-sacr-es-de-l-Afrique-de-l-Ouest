import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  getDeploymentDomain,
  normalizeBasePath,
  normalizePublicDomain,
} = require("../lib/public-deployment.js");

test("prefers Railway's public domain and removes its protocol", () => {
  assert.equal(
    getDeploymentDomain({
      RAILWAY_PUBLIC_DOMAIN: "https://mobile.example.com/",
      EXPO_PUBLIC_DOMAIN: "fallback.example.com",
    }),
    "mobile.example.com",
  );
});

test("uses Expo's public domain only as a fallback", () => {
  assert.equal(
    getDeploymentDomain({ EXPO_PUBLIC_DOMAIN: "https://fallback.example.com" }),
    "fallback.example.com",
  );
});

test("rejects non-public or URL-injected deployment values", () => {
  for (const value of [
    "http://localhost:3000",
    "https://mobile.example.com/path",
    "https://user:pass@mobile.example.com",
    "https://mobile.example.com?redirect=attacker.example",
    "127.0.0.1",
  ]) {
    assert.throws(() => normalizePublicDomain(value), /public|hostname|HTTP/);
  }
});

test("accepts a safe base path and rejects traversal", () => {
  assert.equal(normalizeBasePath("/preview/"), "/preview");
  assert.equal(normalizeBasePath("preview"), "/preview");
  assert.throws(() => normalizeBasePath("/preview/../private"), /BASE_PATH/);
  assert.throws(() => normalizeBasePath("/preview\\private"), /BASE_PATH/);
});