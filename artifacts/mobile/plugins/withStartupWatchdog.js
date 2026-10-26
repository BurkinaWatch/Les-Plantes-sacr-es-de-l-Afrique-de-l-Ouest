const fs = require("node:fs/promises");
const path = require("node:path");
const { withDangerousMod, withMainActivity } = require("expo/config-plugins");

const WATCHDOG_SOURCE = "plugins/android/StartupWatchdog.kt";
const ACTIVITY_CLASS = "class MainActivity : ReactActivity() {";
const SUPER_ON_CREATE = "    super.onCreate(null)";
const BACK_PRESSED_OVERRIDE = "  override fun invokeDefaultOnBackPressed() {";

function withStartupWatchdog(config) {
  config = withDangerousMod(config, [
    "android",
    async (modConfig) => {
      const projectRoot = modConfig.modRequest.projectRoot;
      const packageName = modConfig.android?.package;
      if (!projectRoot || !packageName) {
        throw new Error("Startup watchdog requires an Android package name.");
      }

      const sourcePath = path.join(projectRoot, WATCHDOG_SOURCE);
      const targetPath = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main",
        "java",
        ...packageName.split("."),
        "StartupWatchdog.kt",
      );
      const source = (await fs.readFile(sourcePath, "utf8")).replace(
        "__PACKAGE_NAME__",
        packageName,
      );

      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, source);
      return modConfig;
    },
  ]);

  return withMainActivity(config, (modConfig) => {
    let source = modConfig.modResults.contents;
    if (source.includes("StartupWatchdog.attach(this)")) {
      return modConfig;
    }
    if (
      !source.includes(ACTIVITY_CLASS) ||
      !source.includes(SUPER_ON_CREATE) ||
      !source.includes(BACK_PRESSED_OVERRIDE)
    ) {
      throw new Error(
        "Startup watchdog could not safely patch the generated MainActivity.",
      );
    }

    source = source.replace(
      SUPER_ON_CREATE,
      `    StartupWatchdog.attach(this)\n${SUPER_ON_CREATE}`,
    );
    source = source.replace(
      BACK_PRESSED_OVERRIDE,
      `  override fun onDestroy() {\n    StartupWatchdog.detach(this)\n    super.onDestroy()\n  }\n\n${BACK_PRESSED_OVERRIDE}`,
    );
    modConfig.modResults.contents = source;
    return modConfig;
  });
}

module.exports = withStartupWatchdog;
