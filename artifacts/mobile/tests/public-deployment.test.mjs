import assert from "node:assert/strict";
import { createRequire } from "node:module";
import http from "node:http";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  getDeploymentDomain,
  normalizeBasePath,
  normalizePublicDomain,
  checkPublicDeployment,
  formatPublicDeploymentReport,
  requestPublicPath,
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

function createResponse(status, body, contentType = "application/json") {
  return {
    status,
    body,
    headers: { "content-type": contentType },
  };
}

function createManifest(platform, domain = "mobile.example.com") {
  return {
    platform,
    launchAsset: {
      url: `https://${domain}/build/${platform}/bundle.js`,
    },
    assets: [
      {
        hash: `${platform}-asset`,
        url: `https://${domain}/build/${platform}/icon.png`,
      },
    ],
    extra: {
      expoClient: { hostUri: domain },
      expoGo: {
        debuggerHost: domain,
        packagerOpts: { dev: false },
      },
    },
  };
}

test("verifies the public landing, Expo manifests, assets, and raw traversal paths", async () => {
  const requestedPaths = [];
  const requestImpl = async (_baseUrl, requestPath, options = {}) => {
    requestedPaths.push(requestPath);
    if (requestPath === "/") {
      return createResponse(
        200,
        '<html><h1>Les Plantes Sacrées d’Afrique de l’Ouest</h1><a href="exps://mobile.example.com">Open</a></html>',
        "text/html; charset=utf-8",
      );
    }

    if (requestPath === "/manifest") {
      const platform = options.headers?.["expo-platform"];
      const manifest = createManifest(platform);
      return createResponse(
        200,
        `--expo-manifest-boundary\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(manifest)}\r\n--expo-manifest-boundary--`,
        "multipart/mixed; boundary=expo-manifest-boundary",
      );
    }

    if (requestPath.startsWith("/build/")) {
      return createResponse(200, "", "application/octet-stream");
    }

    return createResponse(403, "", "text/plain");
  };

  const report = await checkPublicDeployment({
    domain: "https://mobile.example.com/",
    expectedAppName: "Les Plantes Sacrées d’Afrique de l’Ouest",
    requestImpl,
  });

  assert.equal(report.ok, true);
  assert.ok(requestedPaths.includes("/%2e%2e/ios/manifest.json"));
  assert.ok(requestedPaths.includes("/ios\\bundle.js"));
});

test("reports an obsolete Railway publication with an actionable redeploy message", async () => {
  const requestImpl = async (_baseUrl, requestPath) => {
    if (requestPath === "/") {
      return createResponse(
        200,
        "<html><h1>App Landing Page</h1><a href=\"exps://old.example.com\">Open</a></html>",
        "text/html",
      );
    }
    if (requestPath === "/manifest") {
      const staleManifest = createManifest("ios", "old.example.com");
      return createResponse(
        200,
        `--expo-manifest-boundary\r\n\r\n${JSON.stringify(staleManifest)}\r\n--expo-manifest-boundary--`,
        "multipart/mixed; boundary=expo-manifest-boundary",
      );
    }
    return createResponse(403, "");
  };

  const report = await checkPublicDeployment({
    domain: "mobile.example.com",
    expectedAppName: "Les Plantes Sacrées d’Afrique de l’Ouest",
    requestImpl,
  });
  const message = formatPublicDeploymentReport(report);

  assert.equal(report.ok, false);
  assert.match(message, /older deployment|previous deployment/i);
  assert.match(message, /Redeploy/i);
  assert.match(message, /application name/);
  assert.match(message, /domain: https:\/\/mobile\.example\.com\//);
  assert.match(message, /routes controlled/);
  assert.match(message, /\/manifest \[expo-platform=ios\]/);
});

test("sends traversal probes as raw request targets", async (t) => {
  const server = http.createServer((request, response) => {
    const expectedPath = "/%2e%2e/ios/manifest.json";
    response.writeHead(
      request.url === expectedPath ? 403 : 500,
      { "content-type": "text/plain" },
    );
    response.end();
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  t.after(() => server.close());

  const address = server.address();
  const response = await requestPublicPath(
    `http://127.0.0.1:${address.port}`,
    "/%2e%2e/ios/manifest.json",
    { readBody: false },
  );
  assert.equal(response.status, 403);
});