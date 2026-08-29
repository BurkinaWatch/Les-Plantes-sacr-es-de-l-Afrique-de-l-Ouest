import assert from "node:assert/strict";
import { once } from "node:events";
import { createRequire } from "node:module";
import path from "node:path";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";
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
const {
  run: runPublicDeploymentServer,
  waitForPublicReadiness,
} = require("../scripts/serve-with-public-check.js");

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

test("times out public readiness using the configured interval and reports the last failure", async () => {
  let now = 0;
  let attempts = 0;
  const requestTimeouts = [];

  await assert.rejects(
    waitForPublicReadiness({
      env: { RAILWAY_PUBLIC_DOMAIN: "unreachable.example.com" },
      timeoutMs: 3_000,
      intervalMs: 1_000,
      now: () => now,
      sleep: async (duration) => {
        now += duration;
      },
      requestImpl: async (_baseUrl, _requestPath, options) => {
        attempts += 1;
        requestTimeouts.push(options.timeoutMs);
        throw new Error("DNS lookup failed");
      },
    }),
    /did not become reachable within 3s \(DNS lookup failed\)/,
  );

  assert.equal(attempts, 3);
  assert.deepEqual(requestTimeouts, [1_000, 1_000, 1_000]);
});

function createFakeChild() {
  const child = new EventEmitter();
  child.killed = false;
  child.killSignal = null;
  child.kill = (signal) => {
    child.killed = true;
    child.killSignal = signal;
    queueMicrotask(() => child.emit("exit", null, signal));
    return true;
  };
  return child;
}

function createTestLogger() {
  return {
    messages: [],
    log(message) {
      this.messages.push({ level: "log", message });
    },
    error(message) {
      this.messages.push({ level: "error", message });
    },
  };
}

async function stopLauncherAfterValidation(runPromise, signalSource, server) {
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(server.killed, false);
  signalSource.emit("SIGTERM");
  await runPromise;
  assert.equal(server.killSignal, "SIGTERM");
  assert.equal(signalSource.exitCode, undefined);
}

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

async function waitForLocalServer(port, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  let lastFailure = "no response";

  while (Date.now() < deadline) {
    try {
      const response = await requestPublicPath(`http://127.0.0.1:${port}`, "/", {
        timeoutMs: 250,
        readBody: false,
      });
      if (response.status === 200) return response;
      lastFailure = `HTTP ${response.status}`;
    } catch (error) {
      lastFailure = error.message;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  throw new Error(`local child server did not respond (${lastFailure})`);
}

test("keeps the server running when the public domain never becomes reachable", async () => {
  const server = createFakeChild();
  const signalSource = new EventEmitter();
  const logger = createTestLogger();
  const runPromise = runPublicDeploymentServer({
    env: {},
    processLike: signalSource,
    logger,
    spawnProcess: () => server,
    waitForPublicReadinessImpl: async () => {
      throw new Error(
        "public deployment did not become reachable within 3s (DNS lookup failed)",
      );
    },
  });

  await stopLauncherAfterValidation(runPromise, signalSource, server);

  assert.match(
    logger.messages.find(({ level }) => level === "error")?.message || "",
    /PUBLIC DEPLOYMENT VALIDATION COULD NOT COMPLETE[\s\S]*DNS lookup failed[\s\S]*remain running/,
  );
});

test("reports a failed smoke test while keeping the server running", async () => {
  const server = createFakeChild();
  const signalSource = new EventEmitter();
  const logger = createTestLogger();
  const runPromise = runPublicDeploymentServer({
    env: {},
    processLike: signalSource,
    logger,
    spawnProcess: () => server,
    waitForPublicReadinessImpl: async () => ({
      domain: "mobile.example.com",
      basePath: "",
    }),
    runPublicCheckImpl: async () => ({ code: 1 }),
  });

  await stopLauncherAfterValidation(runPromise, signalSource, server);

  assert.match(
    logger.messages.find(({ level }) => level === "error")?.message || "",
    /PUBLIC DEPLOYMENT VALIDATION FAILED[\s\S]*remain running[\s\S]*must not be treated as validated/,
  );
});

test("keeps a real server child available after a controlled validation failure", async (t) => {
  const port = await getFreePort();
  const testDomain = "railway-integration.example.com";
  const signalSource = new EventEmitter();
  const logger = createTestLogger();
  let validationFailureReported;
  const validationFailure = new Promise((resolve) => {
    validationFailureReported = resolve;
  });
  const serverRoot = path.resolve(import.meta.dirname, "..");
  let server;

  logger.error = (message) => {
    logger.messages.push({ level: "error", message });
    if (message.startsWith("PUBLIC DEPLOYMENT VALIDATION FAILED")) {
      validationFailureReported();
    }
  };

  const runPromise = runPublicDeploymentServer({
    env: {
      ...process.env,
      PORT: String(port),
      STATIC_ROOT: path.join(serverRoot, "static-build"),
      RAILWAY_PUBLIC_DOMAIN: testDomain,
    },
    processLike: signalSource,
    logger,
    spawnProcess: (command, args, options) => {
      server = spawn(command, args, { ...options, stdio: "ignore" });
      return server;
    },
    waitForPublicReadinessImpl: async () => {
      await waitForLocalServer(port);
      return { domain: testDomain, basePath: "" };
    },
    runPublicCheckImpl: async () => {
      const response = await waitForLocalServer(port);
      assert.equal(response.status, 200);
      return { code: 1, signal: null };
    },
  });

  t.after(async () => {
    if (server && server.exitCode === null && server.signalCode === null) {
      server.kill("SIGKILL");
      await once(server, "exit").catch(() => {});
    }
  });

  await validationFailure;
  assert.equal(server.exitCode, null);
  const responseDuringFailure = await waitForLocalServer(port);
  assert.equal(responseDuringFailure.status, 200);

  signalSource.emit("SIGTERM");
  const result = await runPromise;

  assert.equal(result.code, null);
  assert.equal(result.signal, "SIGTERM");
  assert.equal(signalSource.exitCode, undefined);
  assert.match(
    logger.messages.find(({ level }) => level === "error")?.message || "",
    /remain running[\s\S]*must not be treated as validated/,
  );
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
        '<html><h1>App Landing Page</h1><a href="exps://old.example.com">Open</a></html>',
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
    response.writeHead(request.url === expectedPath ? 403 : 500, {
      "content-type": "text/plain",
    });
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
