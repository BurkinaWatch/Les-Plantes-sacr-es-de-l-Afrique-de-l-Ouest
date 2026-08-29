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

async function waitForPublicReadiness({
  env = process.env,
  requestImpl = requestPublicPath,
  sleep = wait,
  now = Date.now,
  timeoutMs = Number(env.PUBLIC_DEPLOYMENT_READINESS_TIMEOUT_MS || 300_000),
  intervalMs = Number(env.PUBLIC_DEPLOYMENT_READINESS_INTERVAL_MS || 5_000),
} = {}) {
  const domain = getDeploymentDomain(env);
  const basePath = normalizeBasePath(env.BASE_PATH);
  const timeout = getPositiveNumber(timeoutMs, 300_000);
  const interval = getPositiveNumber(intervalMs, 5_000);
  const deadline = now() + timeout;
  let lastFailure = "no response";

  while (now() < deadline) {
    try {
      const response = await requestImpl(
        `https://${domain}`,
        joinPublicPath(basePath, "/"),
        { timeoutMs: Math.min(interval, 10_000), readBody: false },
      );
      if (response.status === 200) return { domain, basePath };
      lastFailure = `HTTP ${response.status}`;
    } catch (error) {
      lastFailure = error.message;
    }
    await sleep(interval);
  }

  throw new Error(
    `public deployment did not become reachable within ${Math.round(timeout / 1000)}s (${lastFailure})`,
  );
}

function runPublicCheck({
  spawnProcess = spawn,
  env = process.env,
  verifyScriptPath = verifyScript,
} = {}) {
  return new Promise((resolve) => {
    const verifier = spawnProcess(process.execPath, [verifyScriptPath], {
      cwd: projectRoot,
      env,
      stdio: "inherit",
    });
    verifier.once("error", (error) => resolve({ code: 1, error }));
    verifier.once("exit", (code, signal) =>
      resolve({ code: code ?? 1, signal }),
    );
  });
}

async function run({
  env = process.env,
  spawnProcess = spawn,
  processLike = process,
  logger = console,
  serverScriptPath = serverScript,
  verifyScriptPath = verifyScript,
  waitForPublicReadinessImpl = () => waitForPublicReadiness({ env }),
  runPublicCheckImpl = () =>
    runPublicCheck({ spawnProcess, env, verifyScriptPath }),
} = {}) {
  const server = spawnProcess(process.execPath, [serverScriptPath], {
    cwd: projectRoot,
    env,
    stdio: "inherit",
  });
  const serverExit = waitForProcess(server);
  let stopSignal = null;

  const stopServer = (signal) => {
    if (stopSignal) return;
    stopSignal = signal;
    if (!server.killed) server.kill(signal);
  };
  const onSigterm = () => stopServer("SIGTERM");
  const onSigint = () => stopServer("SIGINT");
  processLike.once("SIGTERM", onSigterm);
  processLike.once("SIGINT", onSigint);

  try {
    await Promise.race([
      waitForPublicReadinessImpl(),
      serverExit.then((result) => {
        throw new Error(
          result.error
            ? `mobile server failed to start: ${result.error.message}`
            : `mobile server exited before public validation (code=${result.code ?? "unknown"}, signal=${result.signal || "none"})`,
        );
      }),
    ]);

    logger.log(
      "Railway healthcheck is reachable; starting public deployment smoke test.",
    );
    const result = await runPublicCheckImpl();
    if (result.code === 0) {
      logger.log("PUBLIC DEPLOYMENT VALIDATION PASSED");
    } else {
      logger.error(
        [
          "PUBLIC DEPLOYMENT VALIDATION FAILED",
          "The mobile server will remain running, but this publication must not be treated as validated.",
          "Review the report above before sharing the QR code.",
        ].join("\n"),
      );
    }
  } catch (error) {
    if (!stopSignal) {
      logger.error(
        [
          "PUBLIC DEPLOYMENT VALIDATION COULD NOT COMPLETE",
          `- ${error.message}`,
          "The mobile server will remain running, but this publication must not be treated as validated.",
        ].join("\n"),
      );
    }
  }

  const result = await serverExit;
  processLike.removeListener("SIGTERM", onSigterm);
  processLike.removeListener("SIGINT", onSigint);
  if (!stopSignal) processLike.exitCode = 1;
  return result;
}

if (require.main === module) {
  run().catch((error) => {
    console.error(`PUBLIC DEPLOYMENT LAUNCHER FAILED\n- ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  getPositiveNumber,
  run,
  waitForPublicReadiness,
};
