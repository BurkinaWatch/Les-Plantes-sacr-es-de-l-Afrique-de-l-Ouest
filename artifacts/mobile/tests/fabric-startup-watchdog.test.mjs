import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(testDirectory, "..");
const sourceTemplate = await readFile(
  resolve(projectRoot, "plugins/android/StartupWatchdog.kt"),
  "utf8",
);
const generatedSource = await readFile(
  resolve(
    projectRoot,
    "android/app/src/main/java/com/sotyssi/plantessacrees/StartupWatchdog.kt",
  ),
  "utf8",
);

test("generated Android watchdog matches its Expo plugin template", () => {
  assert.equal(
    generatedSource,
    sourceTemplate.replace("__PACKAGE_NAME__", "com.sotyssi.plantessacrees"),
  );
});

test("Fabric listener records only Fabric-specific events with their event timestamp", () => {
  assert.match(sourceTemplate, /if \(name in fabricOnlyMarkers\) \{\s*recordMarker\(name\.name, timestamp\)/);
  assert.match(sourceTemplate, /ReactMarkerConstants\.FABRIC_COMMIT_START/);
  assert.match(sourceTemplate, /ReactMarkerConstants\.FABRIC_UPDATE_UI_MAIN_THREAD_END/);
  assert.match(sourceTemplate, /ReactMarkerConstants\.FABRIC_LAYOUT_AFFECTED_NODES/);
});

test("generic marker listener skips Fabric-only names to avoid duplicate records", () => {
  assert.match(sourceTemplate, /if \(marker !in fabricOnlyMarkers\) \{\s*recordMarker\(marker\.name, SystemClock\.uptimeMillis\(\)\)/);
});

test("startup marker report uses a shared uptime clock and chronological order", () => {
  assert.match(sourceTemplate, /startedAtUptimeMs = SystemClock\.uptimeMillis\(\)/);
  assert.match(sourceTemplate, /val elapsedTenths = \(timestampUptimeMs - startUptimeMs\) \/ 100L/);
  assert.match(
    sourceTemplate,
    /markers\.sortWith\(\s*compareBy<StartupMarker> \{ it\.timestampUptimeMs \}\.thenBy \{ it\.sequence \}/,
  );
});
