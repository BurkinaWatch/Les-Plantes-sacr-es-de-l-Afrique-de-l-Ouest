import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), "mobile-static-server-"));
await mkdir(path.join(fixtureRoot, "ios"), { recursive: true });
await mkdir(path.join(fixtureRoot, "android"), { recursive: true });
await writeFile(
  path.join(fixtureRoot, "ios", "manifest.json"),
  JSON.stringify({
    platform: "ios",
    marker: "ios-manifest",
    launchAsset: { url: "https://mobile.example.com/build/ios/bundle.js" },
    assets: [{ hash: "ios-asset", url: "https://mobile.example.com/build/ios/icon.png" }],
  }),
);
await writeFile(
  path.join(fixtureRoot, "android", "manifest.json"),
  JSON.stringify({
    platform: "android",
    marker: "android-manifest",
    launchAsset: { url: "https://mobile.example.com/build/android/bundle.js" },
    assets: [{ hash: "android-asset", url: "https://mobile.example.com/build/android/icon.png" }],
  }),
);
await writeFile(path.join(fixtureRoot, "ios", "bundle.js"), "ios-bundle");
await writeFile(path.join(fixtureRoot, "ios", "icon.png"), "ios-asset");
await writeFile(path.join(fixtureRoot, "android", "icon.png"), "android-asset");

function getFreePort() {
  return new Promise((resolve, reject) => {
    const probe = http.createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      probe.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(address.port);
        }
      });
    });
  });
}

function request(port, requestPath, headers = {}) {
  return new Promise((resolve, reject) => {
    const request = http.get(
      { hostname: "127.0.0.1", port, path: requestPath, headers },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          resolve({
            status: response.statusCode,
            headers: response.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    request.once("error", reject);
  });
}

const port = await getFreePort();
const serverProcess = spawn(process.execPath, ["server/serve.js"], {
  cwd: path.resolve(import.meta.dirname, ".."),
  env: {
    ...process.env,
    PORT: String(port),
    STATIC_ROOT: fixtureRoot,
    RAILWAY_PUBLIC_DOMAIN: "https://mobile.example.com/",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
serverProcess.stdout.setEncoding("utf8");
serverProcess.stderr.setEncoding("utf8");

const startupOutput = new Promise((resolve, reject) => {
  let output = "";
  const timeout = setTimeout(() => {
    reject(new Error(`Static server did not start. Output: ${output}`));
  }, 5_000);

  serverProcess.stdout.on("data", (chunk) => {
    output += chunk;
    if (output.includes("Serving static Expo build")) {
      clearTimeout(timeout);
      resolve();
    }
  });
  serverProcess.once("error", (error) => {
    clearTimeout(timeout);
    reject(error);
  });
  serverProcess.once("exit", (code, signal) => {
    if (code !== null || signal !== null) {
      clearTimeout(timeout);
      reject(new Error(`Static server exited before starting (${code ?? signal})`));
    }
  });
});

await startupOutput;

test.after(async () => {
  serverProcess.kill();
  await once(serverProcess, "exit").catch(() => {});
  await rm(fixtureRoot, { recursive: true, force: true });
});

test("serves indexed files and both platform manifests", async () => {
  const iosBundle = await request(port, "/ios/bundle.js");
  assert.equal(iosBundle.status, 200);
  assert.equal(iosBundle.body, "ios-bundle");
  assert.match(iosBundle.headers["content-type"], /^application\/javascript/);

  for (const platform of ["ios", "android"]) {
    const directManifest = await request(port, `/${platform}/manifest.json`);
    assert.equal(directManifest.status, 200);
    assert.deepEqual(JSON.parse(directManifest.body), {
      platform,
      marker: `${platform}-manifest`,
      launchAsset: { url: `https://mobile.example.com/build/${platform}/bundle.js` },
      assets: [{ hash: `${platform}-asset`, url: `https://mobile.example.com/build/${platform}/icon.png` }],
    });
    assert.equal((await request(port, `/${platform}/icon.png`)).body, `${platform}-asset`);

    const expoManifest = await request(port, "/manifest", {
      "expo-platform": platform,
    });
    assert.equal(expoManifest.status, 200);
    assert.match(
      expoManifest.headers["content-type"],
      /^multipart\/mixed; boundary=expo-manifest-boundary$/,
    );
    assert.equal(expoManifest.headers["expo-protocol-version"], "0");
    assert.equal(expoManifest.headers["expo-sfv-version"], "0");
    assert.equal(expoManifest.headers["cache-control"], "private, max-age=0");
    assert.match(
      expoManifest.body,
      /Content-Disposition: form-data; name="manifest"/,
    );
    assert.match(expoManifest.body, new RegExp(`"${platform}-manifest"`));
    assert.match(expoManifest.body, new RegExp(`https://mobile\\.example\\.com/build/${platform}/bundle\\.js`));
    assert.match(expoManifest.body, /https:\/\/mobile\.example\.com\/build\/(?:ios|android)\/icon\.png/);

    const platformRouteManifest = await request(port, `/${platform}/manifest`);
    assert.equal(platformRouteManifest.status, 200);
    assert.match(platformRouteManifest.headers["content-type"], /^multipart\/mixed/);
  }
});

test("renders a public landing page with a pinned QR deep link", async () => {
  const landing = await request(port, "/", {
    host: "internal.invalid",
    "x-forwarded-host": "mobile.example.com, attacker.example.net",
    "x-forwarded-proto": "http, https",
  });

  assert.equal(landing.status, 200);
  assert.match(landing.headers["content-type"], /^text\/html/);
  assert.match(landing.body, /Les Plantes Sacrées d’Afrique de l’Ouest/);
  assert.match(landing.body, /exps:\/\/mobile\.example\.com/);
  assert.match(landing.body, /https:\/\/unpkg\.com\/qr-code-styling@1\.8\.4/);
  assert.match(landing.body, /integrity="sha384-[^"]+"/);
  assert.match(landing.headers["content-security-policy"], /script-src 'self' https:\/\/unpkg\.com 'nonce-[^']+'/);
  assert.equal(landing.headers["cache-control"], "no-store");
});

test("rejects a mismatched platform route", async () => {
  const response = await request(port, "/ios/manifest", { "expo-platform": "android" });
  assert.equal(response.status, 400);
});

test("rejects encoded parent-directory traversal", async () => {
  const traversalPaths = [
    "/%2e%2e/ios/manifest.json",
    "/%2E%2E%2Fios%2Fmanifest.json",
    "/%2e%2e%5cios%5cmanifest.json",
  ];

  for (const traversalPath of traversalPaths) {
    const response = await request(port, traversalPath);
    assert.equal(response.status, 403, traversalPath);
  }
});

test("rejects backslashes and paths outside the static index", async () => {
  for (const requestPath of [
    "/ios%5cbundle.js",
    "/ios\\bundle.js",
  ]) {
    const response = await request(port, requestPath);
    assert.equal(response.status, 403, requestPath);
  }

  const missing = await request(port, "/not-in-index.js");
  assert.equal(missing.status, 404);
});