import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { buildStartupDiagnostic } from "../.test-dist/lib/startup-diagnostics.js";

process.env.NODE_ENV = "test";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const require = createRequire(import.meta.url);
const React = require("react");
const Renderer = require("react-test-renderer");
const { act } = Renderer;
const Module = require("node:module");

test("startup report contains useful runtime context without account or error details", () => {
  const report = buildStartupDiagnostic({
    reason: "route-timeout",
    route: "(auth)/login?email=private@example.com",
    platform: "android",
    osVersion: 35,
    appVersion: "1.0.5",
    buildNumber: 14,
    occurredAt: new Date("2026-10-22T10:00:00.000Z"),
  });

  assert.match(report, /Plateforme : android/);
  assert.match(report, /Version du système : 35/);
  assert.match(report, /Version de l’application : 1\.0\.5/);
  assert.match(report, /Numéro de build : 14/);
  assert.match(report, /Étape : l’écran initial/);
  assert.match(report, /Écran concerné : authentification/);
  assert.match(report, /2026-10-22T10:00:00\.000Z/);
  assert.doesNotMatch(report, /private@example\.com|route-timeout/);
});

test("startup report rejects injected metadata and classifies unknown routes", () => {
  const report = buildStartupDiagnostic({
    reason: "react-render-error",
    route: "private-user-id?token=secret",
    platform: "android\nCompte: client@example.com",
    osVersion: "35\nAuthorization: Bearer secret",
    appVersion: "1.0.5\nsecret",
    buildNumber: "14\nsecret",
    occurredAt: new Date("invalid"),
  });

  assert.match(report, /Plateforme : autre/);
  assert.match(report, /Version du système : inconnue/);
  assert.match(report, /Version de l’application : inconnue/);
  assert.match(report, /Numéro de build : inconnu/);
  assert.match(report, /Écran concerné : autre/);
  assert.match(report, /Date UTC : inconnu/);
  assert.doesNotMatch(report, /client@example\.com|secret|private-user-id/);
});

test("diagnostic is only shared after the user presses the recovery button", async () => {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const shareCalls = [];
  const native = {
    Alert: { alert() {} },
    Platform: { OS: "android", Version: 35 },
    Pressable: "Pressable",
    Share: { share: async payload => { shareCalls.push(payload); } },
    Text: "Text",
  };
  const originalLoad = Module._load;
  Module._load = function (id, ...args) {
    if (id === "expo-constants") {
      return { expoConfig: { version: "1.0.5", android: { versionCode: 14 } } };
    }
    if (id === "react-native") return native;
    if (id === "@/lib/startup-diagnostics") {
      return require(path.join(projectRoot, ".test-dist/lib/startup-diagnostics.js"));
    }
    return originalLoad.call(this, id, ...args);
  };

  let renderer;
  try {
    const file = path.join(projectRoot, ".screen-test-dist/components/StartupDiagnosticButton.js");
    const { StartupDiagnosticButton } = require(file);
    await act(async () => {
      renderer = Renderer.create(React.createElement(StartupDiagnosticButton, {
        reason: "route-timeout",
        route: "(auth)/login?email=private@example.com",
      }));
    });
    assert.equal(shareCalls.length, 0, "mounting must not send or share anything");

    await act(async () => {
      await renderer.root.findByProps({ testID: "share-startup-diagnostic" }).props.onPress();
    });

    assert.equal(shareCalls.length, 1);
    assert.match(shareCalls[0].message, /Version du système : 35/);
    assert.match(shareCalls[0].message, /Numéro de build : 14/);
    assert.doesNotMatch(shareCalls[0].message, /private@example\.com/);
  } finally {
    if (renderer) await act(async () => renderer.unmount());
    Module._load = originalLoad;
  }
});
