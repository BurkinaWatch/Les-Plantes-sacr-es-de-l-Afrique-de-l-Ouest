#!/usr/bin/env node

/**
 * Native SVG visual verification.
 *
 * This runner deliberately uses the platform tools instead of a web preview:
 * react-native-svg is rendered by the native view hierarchy, and a browser
 * screenshot cannot catch platform-specific alignment regressions.
 *
 * First run with --update to create the platform-specific golden images:
 *   pnpm capture:native -- --platform both --update
 *
 * Subsequent runs verify the golden images and native logs:
 *   pnpm verify:native-svg
 */

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync, spawnSync } = require("node:child_process");

const projectRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(projectRoot, "../..");
const screenshotRoot = path.join(workspaceRoot, "screenshots", "native-svg");
const referenceRoot = path.join(screenshotRoot, "reference");
const currentRoot = path.join(screenshotRoot, "current");
const referenceManifestPath = path.join(referenceRoot, "manifest.json");
const appScheme = "plantessacrees";
const defaultWaitMs = 2200;

const cases = [
  {
    id: "home",
    path: "/",
    expectedIcons: ["sparkles", "chevron-right", "camera"],
  },
  {
    id: "scanner",
    path: "/scanner",
    expectedIcons: ["camera", "image"],
  },
  {
    id: "scanner-error",
    path: "/scanner?capture=icons-error",
    expectedIcons: ["camera", "image", "alert", "refresh"],
  },
  {
    id: "dialogue",
    path: "/chat-totem?capture=icons",
    expectedIcons: ["sparkles", "archive", "plus", "send"],
  },
  {
    id: "error-fallback",
    path: "/error-fallback",
    expectedIcons: ["alert"],
  },
  {
    id: "error-details",
    path: "/error-fallback?details=1",
    expectedIcons: ["alert", "close"],
  },
];

function usage() {
  console.log(`Native SVG capture runner

Usage:
  pnpm capture:native -- --platform ios|android|both [options]
  pnpm verify:native-svg -- --platform ios|android|both

Options:
  --platform <name>  Target one platform or both (default: both)
  --device <id>      iOS simulator UDID or Android adb serial
  --update           Replace golden references after capturing
  --keep             Keep existing current captures
  --wait <ms>        Delay after opening each deep link (default: ${defaultWaitMs})
  --help             Show this help

The runner fails when no device is available, a native icon is absent, a
golden capture is missing/different, or a relevant SVG rendering warning is
found in native logs. If a requested native target is unavailable, no capture
is attempted and the reason is printed explicitly.`);
}

function parseArgs(argv) {
  const args = {
    platform: "both",
    update: false,
    keep: false,
    waitMs: defaultWaitMs,
    verify: argv.includes("--verify"),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") continue;
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }
    if (arg === "--update") args.update = true;
    else if (arg === "--keep") args.keep = true;
    else if (arg === "--platform") args.platform = argv[++i];
    else if (arg === "--device") args.device = argv[++i];
    else if (arg === "--wait") args.waitMs = Number(argv[++i]);
    else if (arg === "--verify") args.verify = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
  }

  if (!["ios", "android", "both"].includes(args.platform)) {
    throw new Error("--platform must be ios, android, or both");
  }
  if (!Number.isInteger(args.waitMs) || args.waitMs < 250) {
    throw new Error("--wait must be an integer of at least 250 milliseconds");
  }
  if (args.verify && args.update) {
    throw new Error("--verify and --update cannot be used together");
  }
  return args;
}

function commandExists(command) {
  const result = spawnSync("sh", ["-c", `command -v ${command}`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  return result.status === 0;
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: options.encoding ?? "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
    timeout: options.timeout ?? 15000,
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sourceRevision() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: workspaceRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  return result.status === 0 ? result.stdout.trim() : "local";
}

function printAvailability(availability) {
  console.error("Native SVG target availability:");
  for (const entry of availability) {
    const suffix = entry.available
      ? `ready (${entry.name}, ${entry.id})`
      : `unavailable — ${entry.reason}`;
    console.error(`  ${entry.platform}: ${suffix}`);
  }
}

function selectTargets(args) {
  const targets = [];
  const availability = [];
  if (args.platform === "ios" || args.platform === "both") {
    if (!commandExists("xcrun")) {
      availability.push({
        platform: "ios",
        available: false,
        reason: "Xcode xcrun/simctl is not installed (iOS requires macOS).",
      });
    } else {
      try {
        const devices = run("xcrun", [
          "simctl",
          "list",
          "devices",
          "booted",
          "-j",
        ]);
        const parsed = JSON.parse(devices);
        const booted = Object.values(parsed.devices ?? {})
          .flat()
          .filter((device) => device.state === "Booted");
        const selected = args.device
          ? booted.find((device) => device.udid === args.device)
          : booted[0];
        if (!selected) {
          availability.push({
            platform: "ios",
            available: false,
            reason: args.device
              ? `simulator ${args.device} is not booted or is not available.`
              : "no booted iOS simulator was found; boot one before capturing.",
          });
        } else {
          targets.push({
            platform: "ios",
            id: selected.udid,
            name: selected.name,
          });
          availability.push({
            platform: "ios",
            available: true,
            id: selected.udid,
            name: selected.name,
          });
        }
      } catch (error) {
        availability.push({
          platform: "ios",
          available: false,
          reason: `xcrun/simctl could not inspect booted simulators (${error.message}).`,
        });
      }
    }
  }

  if (args.platform === "android" || args.platform === "both") {
    if (!commandExists("adb")) {
      availability.push({
        platform: "android",
        available: false,
        reason: "Android platform-tools adb is not installed.",
      });
    } else {
      try {
        const output = run(
          "adb",
          args.device ? ["-s", args.device, "devices"] : ["devices"],
        );
        const devices = output
          .split(/\r?\n/)
          .slice(1)
          .map((line) => line.trim().split(/\s+/))
          .filter(([id, state]) => id && state === "device");
        const selected = args.device
          ? devices.find(([id]) => id === args.device)
          : devices[0];
        if (!selected) {
          availability.push({
            platform: "android",
            available: false,
            reason: args.device
              ? `device ${args.device} is not connected or authorized.`
              : "no connected Android device or emulator was found.",
          });
        } else {
          targets.push({
            platform: "android",
            id: selected[0],
            name: selected[0],
          });
          availability.push({
            platform: "android",
            available: true,
            id: selected[0],
            name: selected[0],
          });
        }
      } catch (error) {
        availability.push({
          platform: "android",
          available: false,
          reason: `adb could not inspect connected devices (${error.message}).`,
        });
      }
    }
  }

  if (availability.some((entry) => !entry.available)) {
    printAvailability(availability);
    throw new Error(
      "Requested native target unavailable; no captures were generated. " +
        "Run on a macOS host with a booted iOS simulator and/or a host with " +
        "an authorized Android device, as requested by --platform.",
    );
  }

  return targets;
}

function deepLink(target, route) {
  const url = `${appScheme}://${route}`;
  if (target.platform === "ios") {
    run("xcrun", ["simctl", "openurl", target.id, url]);
  } else {
    run("adb", [
      "-s",
      target.id,
      "shell",
      "am",
      "start",
      "-W",
      "-a",
      "android.intent.action.VIEW",
      "-d",
      url,
    ]);
  }
}

function capture(target, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (target.platform === "ios") {
    run("xcrun", ["simctl", "io", target.id, "screenshot", destination], {
      stdio: ["ignore", "ignore", "pipe"],
    });
  } else {
    const png = run("adb", ["-s", target.id, "exec-out", "screencap", "-p"], {
      encoding: null,
      timeout: 15000,
    });
    fs.writeFileSync(destination, png);
  }
}

function androidAccessibilityDump(target) {
  const remotePath = `/sdcard/native-svg-${process.pid}.xml`;
  try {
    run("adb", ["-s", target.id, "shell", "uiautomator", "dump", remotePath], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    return run("adb", ["-s", target.id, "shell", "cat", remotePath]);
  } finally {
    spawnSync("adb", ["-s", target.id, "shell", "rm", remotePath], {
      stdio: "ignore",
    });
  }
}

function nativeLogs(target) {
  if (target.platform === "android") {
    return run("adb", ["-s", target.id, "logcat", "-d", "-v", "brief"]);
  }
  return run("xcrun", [
    "simctl",
    "spawn",
    target.id,
    "log",
    "show",
    "--last",
    "10s",
    "--style",
    "compact",
  ]);
}

function clearNativeLogs(target) {
  if (target.platform === "android") {
    run("adb", ["-s", target.id, "logcat", "-c"], {
      stdio: ["ignore", "ignore", "pipe"],
    });
  }
}

function assertPng(filePath) {
  const buffer = fs.readFileSync(filePath);
  const isPng =
    buffer.length > 24 &&
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (!isPng) throw new Error(`Capture is not a PNG: ${filePath}`);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width < 100 || height < 100) {
    throw new Error(
      `Capture has an invalid size (${width}x${height}): ${filePath}`,
    );
  }
}

function relevantSvgWarnings(logs) {
  const relevantLine =
    /\b(?:warn(?:ing)?|error|failed|invalid|unable|exception)\b.*(?:svg|rsvg|icon|viewbox|path)|(?:svg|rsvg|viewbox|icon|path).*\b(?:warn(?:ing)?|error|failed|invalid|unable|exception)\b/i;
  return logs
    .split(/\r?\n/)
    .filter((line) => relevantLine.test(line))
    .filter((line, index, lines) => lines.indexOf(line) === index);
}

function compareWithReference(currentPath, referencePath) {
  if (!fs.existsSync(referencePath)) {
    throw new Error(
      `Missing golden capture: ${referencePath}. Run with --update on a reviewed device.`,
    );
  }
  if (!commandExists("magick") && !commandExists("compare")) {
    throw new Error(
      "Golden comparison requires ImageMagick (magick or compare).",
    );
  }

  const command = commandExists("magick") ? "magick" : "compare";
  const commandArgs =
    command === "magick"
      ? ["compare", "-metric", "RMSE", referencePath, currentPath, "null:"]
      : ["-metric", "RMSE", referencePath, currentPath, "null:"];
  const result = spawnSync(command, commandArgs, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const comparisonOutput = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  // ImageMagick's RMSE output is "absolute (normalized)".
  const metric =
    comparisonOutput.match(/\(\s*([0-9.]+)\s*\)/) ??
    comparisonOutput.match(/^\s*([0-9.]+)/m);
  if (!metric)
    throw new Error(
      `Could not read ImageMagick comparison for ${currentPath}.`,
    );
  const rmse = Number(metric[1]);
  // RMSE is reported on a 0..1 scale by ImageMagick for normalized images.
  // A 2% tolerance allows status-bar clock and font rasterization differences
  // while still catching missing or substantially displaced SVGs.
  if (!Number.isFinite(rmse) || rmse > 0.02) {
    throw new Error(
      `Golden mismatch for ${path.basename(currentPath)} (RMSE ${rmse.toFixed(4)} > 0.0200).`,
    );
  }
}

function readReferenceManifest() {
  if (!fs.existsSync(referenceManifestPath)) {
    throw new Error(
      `Missing versioned reference manifest: ${referenceManifestPath}. ` +
        "Capture with --update on a reviewed native target first.",
    );
  }
  try {
    return JSON.parse(fs.readFileSync(referenceManifestPath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid native SVG reference manifest: ${error.message}`);
  }
}

function assertReferenceManifest(targets) {
  const manifest = readReferenceManifest();
  if (
    manifest.schemaVersion !== 1 ||
    !manifest.sourceRevision ||
    manifest.reviewStatus !== "approved"
  ) {
    throw new Error(
      "Native SVG references must have a versioned manifest with reviewStatus " +
        '"approved".',
    );
  }
  for (const target of targets) {
    const platform = manifest.platforms?.[target.platform];
    const capturedCases = new Set(
      (platform?.captures ?? []).map((capture) => capture.case),
    );
    const missingCases = cases
      .map((testCase) => testCase.id)
      .filter((caseId) => !capturedCases.has(caseId));
    const invalidPaths = cases
      .map((testCase) => ({
        caseId: testCase.id,
        expectedPath: path.relative(
          workspaceRoot,
          path.join(referenceRoot, target.platform, `${testCase.id}.png`),
        ),
      }))
      .filter(({ caseId, expectedPath }) => {
        const capture = (platform?.captures ?? []).find(
          (entry) => entry.case === caseId,
        );
        return capture?.path !== expectedPath;
      });
    if (
      !platform?.sourceRevision ||
      missingCases.length ||
      invalidPaths.length
    ) {
      throw new Error(
        `Reference manifest has no complete ${target.platform} set; missing: ` +
          `${missingCases.join(", ") || "none"}${invalidPaths.length ? `; invalid paths: ${invalidPaths.map(({ caseId }) => caseId).join(", ")}` : ""}.`,
      );
    }
  }
}

function assertExpectedIcons(target, accessibilityDump, expectedIcons, caseId) {
  if (target.platform !== "android") return;
  const missing = expectedIcons.filter(
    (name) => !accessibilityDump.includes(`sacred-icon-${name}`),
  );
  if (missing.length) {
    throw new Error(
      `${caseId} is missing native SVG icon(s) on Android: ${missing.join(", ")}`,
    );
  }
}

async function captureCase(target, testCase, args) {
  const destination = path.join(
    currentRoot,
    target.platform,
    `${testCase.id}.png`,
  );
  const reference = path.join(
    referenceRoot,
    target.platform,
    `${testCase.id}.png`,
  );

  clearNativeLogs(target);
  deepLink(target, testCase.path);
  await sleep(args.waitMs);
  capture(target, destination);
  assertPng(destination);

  let accessibilityDump = "";
  if (target.platform === "android") {
    accessibilityDump = androidAccessibilityDump(target);
    assertExpectedIcons(
      target,
      accessibilityDump,
      testCase.expectedIcons,
      testCase.id,
    );
  }

  const warnings = relevantSvgWarnings(nativeLogs(target));
  if (warnings.length) {
    throw new Error(
      `${target.platform} SVG rendering warning after ${testCase.id}:\n${warnings.join("\n")}`,
    );
  }

  if (args.update) {
    fs.mkdirSync(path.dirname(reference), { recursive: true });
    fs.copyFileSync(destination, reference);
  } else {
    compareWithReference(destination, reference);
  }

  return {
    platform: target.platform,
    case: testCase.id,
    destination: path.relative(workspaceRoot, destination),
    reference: path.relative(workspaceRoot, reference),
    icons: testCase.expectedIcons,
    accessibilityChecked: target.platform === "android",
  };
}

function updateReferenceManifest(results, targets) {
  let existing = {};
  if (fs.existsSync(referenceManifestPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(referenceManifestPath, "utf8"));
    } catch {
      existing = {};
    }
  }
  const references = { ...(existing.platforms ?? {}) };
  for (const target of targets) {
    references[target.platform] = {
      target: { id: target.id, name: target.name },
      sourceRevision: sourceRevision(),
      capturedAt: new Date().toISOString(),
      captures: results
        .filter((result) => result.platform === target.platform)
        .map(({ platform, case: caseId, reference, icons }) => ({
          platform,
          case: caseId,
          path: reference,
          icons,
        })),
    };
  }
  fs.mkdirSync(referenceRoot, { recursive: true });
  fs.writeFileSync(
    referenceManifestPath,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        sourceRevision: sourceRevision(),
        generatedAt: new Date().toISOString(),
        reviewStatus: "requires-human-review",
        appScheme,
        cases: cases.map(({ id, path: route, expectedIcons }) => ({
          id,
          route,
          expectedIcons,
        })),
        platforms: references,
      },
      null,
      2,
    )}\n`,
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.keep) fs.rmSync(currentRoot, { recursive: true, force: true });
  const targets = selectTargets(args);
  fs.mkdirSync(currentRoot, { recursive: true });
  if (!args.update) assertReferenceManifest(targets);

  console.log(
    `${args.update ? "Capturing golden" : "Verifying"} native SVG screens on ${targets.map((target) => `${target.platform} (${target.name})`).join(", ")}...`,
  );
  const results = [];
  for (const target of targets) {
    for (const testCase of cases) {
      results.push(await captureCase(target, testCase, args));
      console.log(`  ✓ ${target.platform}/${testCase.id}`);
    }
  }

  if (args.update) updateReferenceManifest(results, targets);

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceRevision: sourceRevision(),
    appScheme,
    cases: cases.map(({ id, path: route, expectedIcons }) => ({
      id,
      route,
      expectedIcons,
    })),
    captures: results,
  };
  fs.writeFileSync(
    path.join(currentRoot, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log(`Native SVG verification passed (${results.length} captures).`);
}

main().catch((error) => {
  console.error(`Native SVG verification failed: ${error.message}`);
  process.exitCode = 1;
});
