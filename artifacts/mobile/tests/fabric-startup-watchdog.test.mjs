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
const diagnosticModuleTemplate = await readFile(
  resolve(projectRoot, "plugins/android/StartupDiagnosticModule.kt"),
  "utf8",
);
const generatedDiagnosticModule = await readFile(
  resolve(
    projectRoot,
    "android/app/src/main/java/com/sotyssi/plantessacrees/StartupDiagnosticModule.kt",
  ),
  "utf8",
);
const generatedApplication = await readFile(
  resolve(
    projectRoot,
    "android/app/src/main/java/com/sotyssi/plantessacrees/MainApplication.kt",
  ),
  "utf8",
);

test("generated Android watchdog matches its Expo plugin template", () => {
  assert.equal(
    generatedSource,
    sourceTemplate.replace("__PACKAGE_NAME__", "com.sotyssi.plantessacrees"),
  );
});

test("generated startup diagnostic module matches its Expo plugin template", () => {
  assert.equal(
    generatedDiagnosticModule,
    diagnosticModuleTemplate.replace(
      "__PACKAGE_NAME__",
      "com.sotyssi.plantessacrees",
    ),
  );
  assert.match(generatedApplication, /add\(StartupDiagnosticPackage\(\)\)/);
});

test("native startup diagnostic module persists a sanitized JavaScript error synchronously", () => {
  assert.match(
    diagnosticModuleTemplate,
    /@ReactMethod\(isBlockingSynchronousMethod = true\)\s+fun recordStartupError/,
  );
  assert.match(
    diagnosticModuleTemplate,
    /StartupWatchdog\.recordJavaScriptError/,
  );
  assert.match(sourceTemplate, /private fun sanitizeErrorMessage/);
  assert.match(sourceTemplate, /\.commit\(\)/);
});

test("Android startup report includes the captured JavaScript error", () => {
  assert.match(sourceTemplate, /Erreur JavaScript/);
  assert.match(sourceTemplate, /error\.message/);
  assert.match(sourceTemplate, /Début de pile/);
  assert.match(sourceTemplate, /error\.stack/);
  assert.match(sourceTemplate, /applicationContext\?\.let\(::clearJavaScriptError\)/);
  assert.match(sourceTemplate, /applicationContext = activity\.applicationContext/);
});

test("native startup report includes numbered milestones and build/runtime configuration", () => {
  for (const label of [
    "01 index.js chargé",
    "02 _layout monté",
    "03 providers montés",
    "04 Stack monté",
    "05 premier onLayout reçu",
    "06 hideAsync appelé",
    "07 CONTENT_APPEARED reçu côté natif",
  ]) {
    assert.ok(sourceTemplate.includes(label), `missing startup marker ${label}`);
  }
  assert.match(sourceTemplate, /BuildConfig\.IS_NEW_ARCHITECTURE_ENABLED/);
  assert.match(sourceTemplate, /BuildConfig\.IS_HERMES_ENABLED/);
  assert.match(sourceTemplate, /Build\.SUPPORTED_ABIS/);
  assert.match(sourceTemplate, /Runtime version/);
  assert.match(sourceTemplate, /Canal EAS Update/);
  assert.match(sourceTemplate, /Mise à jour chargée/);
});

test("native startup diagnostic bridge exposes markers and update/runtime metadata", () => {
  assert.match(
    diagnosticModuleTemplate,
    /fun recordStartupMarker\(marker: String\)/,
  );
  assert.match(
    diagnosticModuleTemplate,
    /fun recordStartupMetadata\(/,
  );
  assert.match(diagnosticModuleTemplate, /fun getRuntimeInfo\(\): WritableMap/);
  assert.match(diagnosticModuleTemplate, /stack: String/);
  assert.match(diagnosticModuleTemplate, /kind: String/);
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

test("React context markers provide timestamps from the shared uptime clock", () => {
  assert.match(
    sourceTemplate,
    /recordMarker\("REACT_CONTEXT_INITIALIZED", SystemClock\.uptimeMillis\(\)\)/,
  );
  assert.match(
    sourceTemplate,
    /recordMarker\("REACT_CONTEXT_ALREADY_INITIALIZED", SystemClock\.uptimeMillis\(\)\)/,
  );
});

test("startup marker report uses a shared uptime clock and chronological order", () => {
  assert.match(sourceTemplate, /startedAtUptimeMs = SystemClock\.uptimeMillis\(\)/);
  assert.match(sourceTemplate, /val elapsedTenths = \(timestampUptimeMs - startUptimeMs\) \/ 100L/);
  assert.match(
    sourceTemplate,
    /markers\.sortWith\(\s*compareBy<StartupMarker> \{ it\.timestampUptimeMs \}\.thenBy \{ it\.sequence \}/,
  );
});
