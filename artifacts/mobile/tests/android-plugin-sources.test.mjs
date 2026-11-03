import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { REQUIRED_ANDROID_PLUGIN_SOURCES, verifyAndroidPluginSources } = require(
  "../scripts/verify-android-plugin-sources.js",
);
const mobileRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("required Android plugin source files exist and are tracked", () => {
  const result = verifyAndroidPluginSources(mobileRoot);
  assert.equal(result.gitTracked, true);
  assert.deepEqual(result.files, REQUIRED_ANDROID_PLUGIN_SOURCES);
});

test("missing Android plugin source fails the build preflight", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "android-plugin-preflight-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  fs.mkdirSync(path.join(root, "plugins/android"), { recursive: true });
  fs.writeFileSync(path.join(root, REQUIRED_ANDROID_PLUGIN_SOURCES[0]), "fixture");

  assert.throws(
    () => verifyAndroidPluginSources(root),
    /StartupDiagnosticModule\.kt/,
  );
});

test("untracked Android plugin sources fail before archive creation", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "android-plugin-git-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  fs.mkdirSync(path.join(root, "plugins/android"), { recursive: true });
  for (const source of REQUIRED_ANDROID_PLUGIN_SOURCES) {
    fs.writeFileSync(path.join(root, source), "fixture");
  }
  execFileSync("git", ["init", "--quiet", root]);

  assert.throws(
    () => verifyAndroidPluginSources(root),
    /not tracked by Git/,
  );
});
