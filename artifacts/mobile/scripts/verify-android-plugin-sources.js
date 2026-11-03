const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const REQUIRED_ANDROID_PLUGIN_SOURCES = [
  "plugins/android/StartupWatchdog.kt",
  "plugins/android/StartupDiagnosticModule.kt",
];

function findGitRoot(projectRoot) {
  try {
    return execFileSync("git", ["-C", projectRoot, "rev-parse", "--show-toplevel"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (
      error.code === "ENOENT" ||
      String(error.stderr).includes("not a git repository")
    ) {
      return null;
    }
    throw new Error(`Could not verify Git tracking for Android plugin sources: ${error.message}`);
  }
}

function verifyAndroidPluginSources(projectRoot = path.resolve(__dirname, "..")) {
  const missing = REQUIRED_ANDROID_PLUGIN_SOURCES.filter(
    (source) => !fs.existsSync(path.join(projectRoot, source)),
  );
  if (missing.length > 0) {
    throw new Error(
      `Required Android config-plugin source file(s) are missing: ${missing.join(", ")}`,
    );
  }

  const gitRoot = findGitRoot(projectRoot);
  if (!gitRoot) {
    return { files: REQUIRED_ANDROID_PLUGIN_SOURCES, gitTracked: null };
  }

  const untracked = REQUIRED_ANDROID_PLUGIN_SOURCES.filter((source) => {
    const fullPath = path.resolve(projectRoot, source);
    const gitPath = path.relative(gitRoot, fullPath).split(path.sep).join("/");
    try {
      execFileSync("git", ["-C", gitRoot, "ls-files", "--error-unmatch", "--", gitPath], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      return false;
    } catch {
      return true;
    }
  });

  if (untracked.length > 0) {
    throw new Error(
      `Android config-plugin source file(s) are not tracked by Git and may be omitted from the build archive: ${untracked.join(", ")}`,
    );
  }

  return { files: REQUIRED_ANDROID_PLUGIN_SOURCES, gitTracked: true };
}

if (require.main === module) {
  try {
    const result = verifyAndroidPluginSources();
    const sourceList = result.files.join(", ");
    console.log(`Android plugin source preflight passed: ${sourceList}`);
  } catch (error) {
    console.error(`Android plugin source preflight failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { REQUIRED_ANDROID_PLUGIN_SOURCES, verifyAndroidPluginSources };
