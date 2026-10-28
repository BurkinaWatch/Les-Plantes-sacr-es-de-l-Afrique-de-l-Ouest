import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("custom entry captures fatal errors before evaluating Expo Router", () => {
  const source = readFileSync(path.join(projectRoot, "index.js"), "utf8");
  const packageJson = JSON.parse(
    readFileSync(path.join(projectRoot, "package.json"), "utf8"),
  );
  const calls = [];

  assert.equal(packageJson.main, "index.js");

  runInNewContext(source, {
    require(moduleName) {
      calls.push(`require:${moduleName}`);
      if (moduleName === "./lib/startup-runtime") {
        return {
          setStartupStage(stage) {
            calls.push(`stage:${stage}`);
          },
          installStartupFatalCapture() {
            calls.push("capture-installed");
          },
        };
      }
      if (moduleName === "expo-router/entry") {
        calls.push("router-evaluated");
        return {};
      }
      throw new Error(`Unexpected entry dependency: ${moduleName}`);
    },
  });

  assert.deepEqual(calls, [
    "require:./lib/startup-runtime",
    "stage:javascript-entry",
    "capture-installed",
    "require:expo-router/entry",
    "router-evaluated",
  ]);
});

test("synchronous Expo Router startup errors are recorded then rethrown", () => {
  const source = readFileSync(path.join(projectRoot, "index.js"), "utf8");
  const calls = [];
  const startupError = new TypeError("private user data must not be shared");

  assert.throws(
    () =>
      runInNewContext(source, {
        require(moduleName) {
          calls.push(`require:${moduleName}`);
          if (moduleName === "./lib/startup-runtime") {
            return {
              setStartupStage(stage) {
                calls.push(`stage:${stage}`);
              },
              installStartupFatalCapture() {
                calls.push("capture-installed");
              },
              recordStartupFatalError(error) {
                calls.push(`recorded:${error === startupError}`);
              },
            };
          }
          if (moduleName === "expo-router/entry") throw startupError;
          throw new Error(`Unexpected entry dependency: ${moduleName}`);
        },
      }),
    (error) => error === startupError,
  );

  assert.deepEqual(calls, [
    "require:./lib/startup-runtime",
    "stage:javascript-entry",
    "capture-installed",
    "require:expo-router/entry",
    "recorded:true",
  ]);
});
