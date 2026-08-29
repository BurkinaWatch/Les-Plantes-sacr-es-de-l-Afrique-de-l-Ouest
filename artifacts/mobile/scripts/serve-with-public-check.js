const { spawn } = require("child_process");
const path = require("path");
const {
  getDeploymentDomain,
  joinPublicPath,
  normalizeBasePath,
  requestPublicPath,
} = require("../lib/public-deployment");

const projectRoot = path.resolve(__dirname, "..");
const serverScript = path.join(projectRoot, "server", "serve.js");
const verifyScript = path.join(__dirname, "verify-public-deployment.js");
const readinessTimeoutMs = Number(process.env.PUBLIC_DEPLOYMENT_READINESS_TIMEOUT_MS || 300_000);
const readinessIntervalMs = Number(process.env.PUBLIC_DEPLOYMENT_READINESS_INTERVAL_MS || 5_000);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPositiveNumber(value, fallback) {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function waitForProcess(child) {
  return new Promise((resolve) => {
    child.once("exit", (code, signal) => resolve({ code, signal }));
    child.once("error", (error) => resolve({ error }));
  });
}

async function waitForPublicReadiness() {
  const domain = getDeploymentDomain();
  const basePath = normalizeBasePath(process.env.BASE_PATH);
  const deadline = Date.now() + getPositiveNumber(readinessTimeoutMs, 300_000);
  let lastFailure = "no response";

  while (Date.now() < deadline) {
    try {
      const response = await requestPublicPath(
        `https://${domain}`,
        joinPublicPath(basePath, "/"),
        { timeoutMs: Math.min(getPositiveNumber(readinessIntervalMs, 5_000), 10_000), readBody: false },
      );
      if (response.status === 200) return { domain, basePath };
      lastFailure = `HTTP ${response.status}`;
    } catch (error) {
      lastFailure = error.message;
    }
    await wait(getPositiveNumber(readinessIntervalMs, 5_000));
  }

  throw new Error(
    `public deployment did not become reachable within ${Math.round(
      getPositiveNumber(readinessTimeoutMs, 300_000) / 1000,
    )}s (${lastFailure})`,
  );
}

function runPublicCheck() {
  return new Promise((resolve) => {
    const verifier = spawn(process.execPath, [verifyScript], {
      cwd: projectRoot,
      env: process.env,
      stdio: "inherit",
    });
    verifier.once("error", (error) => resolve({ code: 1, error }));
    verifier.once("exit", (code, signal) => resolve({ code: code ?? 1, signal }));
  });
}

async function run() {
  const server = spawn(process.execPath, [serverScript], {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  });
  const serverExit = waitForProcess(server);

  const stopServer = () => {
    if (!server.killed) server.kill("SIGTERM");
  };
  process.once("SIGTERM", stopServer);
  process.once("SIGINT", stopServer);

  try {
    await Promise.race([
      waitForPublicReadiness(),
      serverExit.then((result) => {
        throw new Error(
          result.error
            ? `mobile server failed to start: ${result.error.message}`
            : `mobile server exited before public validation (code=${result.code ?? "unknown"}, signal=${result.signal || "none"})`,
        );
      }),
    ]);

    console.log("Railway healthcheck is reachable; starting public deployment smoke test.");
    const result = await runPublicCheck();
    if (result.code === 0) {
      console.log("PUBLIC DEPLOYMENT VALIDATION PASSED");
    } else {
      console.error(
        [
          "PUBLIC DEPLOYMENT VALIDATION FAILED",
          "The mobile server will remain running, but this publication must not be treated as validated.",
          "Review the report above before sharing the QR code.",
        ].join("\n"),
      );
    }
  } catch (error) {
    console.error(
      [
        "PUBLIC DEPLOYMENT VALIDATION COULD NOT COMPLETE",
        `- ${error.message}`,
        "The mobile server will remain running, but this publication must not be treated as validated.",
      ].join("\n"),
    );
  }

  await serverExit;
  process.exitCode = 1;
}

if (require.main === module) {
  run().catch((error) => {
    console.error(`PUBLIC DEPLOYMENT LAUNCHER FAILED\n- ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  getPositiveNumber,
  waitForPublicReadiness,
};