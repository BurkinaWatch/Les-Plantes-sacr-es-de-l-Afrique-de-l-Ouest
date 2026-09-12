import assert from "node:assert/strict";
import test from "node:test";

import { assertAndroidApiConfiguration } from "../scripts/validate-api-bundle.js";

function createManifest(apiBaseUrl) {
  return {
    extra: {
      expoClient: {
        extra: { apiBaseUrl },
      },
    },
  };
}

test("accepts an Android bundle targeting the separate API host", () => {
  const apiBaseUrl = "https://api.example.com/api";
  const result = assertAndroidApiConfiguration({
    bundle: `fetch("${apiBaseUrl}/healthz")`,
    manifest: createManifest(apiBaseUrl),
    mobileBaseUrl: "https://mobile.example.com",
    apiBaseUrl,
  });

  assert.deepEqual(result, {
    apiHost: "api.example.com",
    manifestApiHost: "api.example.com",
    mobileHost: "mobile.example.com",
    bundleApiUrls: ["https://api.example.com/api/healthz"],
  });
});

test("rejects an Android bundle that sends API calls to the mobile host", () => {
  assert.throws(
    () =>
      assertAndroidApiConfiguration({
        bundle: 'fetch("https://mobile.example.com/api/healthz")',
        manifest: createManifest("https://api.example.com/api"),
        mobileBaseUrl: "https://mobile.example.com",
        apiBaseUrl: "https://api.example.com/api",
      }),
    /targets the mobile host for API calls/,
  );
});

test("rejects a manifest configured with the mobile host for API calls", () => {
  assert.throws(
    () =>
      assertAndroidApiConfiguration({
        bundle: 'fetch("https://api.example.com/api/healthz")',
        manifest: createManifest("https://mobile.example.com/api"),
        apiBaseUrl: "https://mobile.example.com/api",
        mobileBaseUrl: "https://mobile.example.com",
      }),
    /manifest API base URL points to the mobile host/,
  );
});

test("allows an explicit API override to differ from the release fallback", () => {
  const result = assertAndroidApiConfiguration({
    bundle: 'fetch("https://explicit-api.example.com/api/healthz")',
    manifest: createManifest("https://release-api.example.com/api"),
    mobileBaseUrl: "https://mobile.example.com",
    apiBaseUrl: "https://explicit-api.example.com/api",
  });

  assert.equal(result.apiHost, "explicit-api.example.com");
  assert.equal(result.manifestApiHost, "release-api.example.com");
});