import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { compactProperties } = require("../plugins/withCompactAndroidPackaging.js");

test("compressed native packaging survives prebuild without changing other properties", () => {
  const original = [
    { type: "comment", value: "Keep all architectures" },
    { type: "property", key: "reactNativeArchitectures", value: "armeabi-v7a,arm64-v8a,x86,x86_64" },
    { type: "property", key: "expo.useLegacyPackaging", value: "false" },
  ];
  const updated = compactProperties(original);
  assert.deepEqual(updated.slice(0, 2), original.slice(0, 2));
  assert.deepEqual(updated[2], { type: "property", key: "expo.useLegacyPackaging", value: "true" });
  assert.deepEqual(compactProperties(updated), updated);
  assert.equal(original[2].value, "false");
});

test("catalog media remain static local assets, never network URLs", () => {
  const source = fs.readFileSync(new URL("../constants/plantImages.ts", import.meta.url), "utf8");
  const entries = [...source.matchAll(/require\(['"]@\/(assets\/images\/plants\/[^'"]+)['"]\)/g)];
  assert(entries.length > 100);
  assert(!source.includes("https://"));
  for (const [, file] of entries) {
    assert(fs.existsSync(new URL(`../${file}`, import.meta.url)), file);
  }
  assert(entries.some(([, file]) => file.endsWith(".webp")));
  assert(entries.some(([, file]) => file.endsWith(".jpg")));
});
