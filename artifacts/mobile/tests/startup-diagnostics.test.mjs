import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { buildStartupDiagnostic } from "../.test-dist/lib/startup-diagnostics.js";
import { act, createScreenRenderer } from "./screen-test-renderer.mjs";

const require = createRequire(import.meta.url);
const React = require("react");
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

test("fatal startup report shares only the sanitized error type and startup stage", () => {
  const report = buildStartupDiagnostic({
    reason: "runtime-js-error",
    route: "(tabs)/index?email=private@example.com",
    platform: "android",
    osVersion: 35,
    appVersion: "1.0.8",
    buildNumber: 17,
    stage: "navigation",
    runtimeErrorType: "TypeError\naccount@example.com",
    occurredAt: new Date("2026-10-25T22:00:00.000Z"),
  });

  assert.match(report, /Étape : chargement de l’écran initial/);
  assert.match(report, /Type d’erreur JavaScript : inconnu/);
  assert.doesNotMatch(report, /private@example\.com|account@example\.com|TypeError\\n/);
});

test("startup report includes sanitized error details and exact native runtime metadata", () => {
  const report = buildStartupDiagnostic({
    reason: "promise-rejection",
    route: "(auth)/login",
    platform: "android",
    osVersion: 28,
    appVersion: "1.0.17",
    buildNumber: 26,
    runtimeVersion: "1.0.17",
    easChannel: "preview",
    updateId: "b8a3d042-52bd-4cb5-90d5-801268d3a9ad",
    isEmbeddedLaunch: false,
    abi: "arm64-v8a, armeabi-v7a",
    newArchitecture: true,
    jsEngine: "Hermes",
    runtimeErrorType: "TypeError",
    errorMessage: "token=private-token failed for customer@example.com",
    errorStack: "TypeError: token=private-token\nat RootLayout\nhttps://private.invalid",
    errorKind: "promise-rejection",
  });

  assert.match(report, /Runtime version : 1\.0\.17/);
  assert.match(report, /Canal EAS Update : preview/);
  assert.match(report, /Mise à jour chargée : b8a3d042-52bd-4cb5-90d5-801268d3a9ad/);
  assert.match(report, /ABI : arm64-v8a, armeabi-v7a/);
  assert.match(report, /Nouvelle architecture : oui/);
  assert.match(report, /Moteur JavaScript : Hermes/);
  assert.match(report, /Catégorie : promise-rejection/);
  assert.match(report, /Message court : token=\[masqué\] failed for \[e-mail\]/);
  assert.match(report, /at RootLayout/);
  assert.doesNotMatch(report, /private-token|customer@example\.com|private\.invalid/);
});

test("diagnostic is only shared after the user presses the recovery button", async () => {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const shareCalls = [];
  const native = {
    Alert: { alert() {} },
    NativeModules: {
      StartupDiagnostic: {
        getRuntimeInfo: () => ({
          abi: "arm64-v8a",
          newArchitecture: true,
          jsEngine: "Hermes",
        }),
      },
    },
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
    if (id === "expo-updates") {
      return {
        runtimeVersion: "1.0.5",
        channel: "preview",
        updateId: null,
        isEmbeddedLaunch: true,
      };
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
      renderer = createScreenRenderer(React.createElement(StartupDiagnosticButton, {
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
    assert.match(shareCalls[0].message, /Canal EAS Update : preview/);
    assert.match(shareCalls[0].message, /ABI : arm64-v8a/);
    assert.doesNotMatch(shareCalls[0].message, /private@example\.com/);
  } finally {
    if (renderer) await act(async () => renderer.unmount());
    Module._load = originalLoad;
  }
});
