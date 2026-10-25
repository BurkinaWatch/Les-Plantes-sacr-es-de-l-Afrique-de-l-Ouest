import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { compareDecodedPixels, QUALITY, MIN_PSNR_DB } = require("../scripts/optimize-catalog-images.js");

function image(data, width = 1, height = 1) {
  return {
    data: Buffer.from(data),
    info: { width, height, channels: 4 },
  };
}

test("catalog WebP policy keeps quality at the documented high setting", () => {
  assert.equal(QUALITY, 95);
  assert.equal(MIN_PSNR_DB, 38.0);
});

test("pixel metric accepts identical RGB while requiring identical alpha", () => {
  const original = image([20, 40, 60, 128]);
  const decoded = image([20, 40, 60, 128]);
  const result = compareDecodedPixels(original, decoded, "fixture");
  assert.equal(result.psnrDb, Infinity);
  assert.equal(result.alphaIdentical, true);
});

test("pixel metric measures lossy RGB quality without changing alpha", () => {
  const original = image([20, 40, 60, 128]);
  const decoded = image([21, 40, 60, 128]);
  const result = compareDecodedPixels(original, decoded, "fixture");
  assert(result.psnrDb > MIN_PSNR_DB);
  assert.equal(result.alphaIdentical, true);
});

test("pixel metric rejects alpha and dimension changes", () => {
  assert.throws(
    () => compareDecodedPixels(image([20, 40, 60, 128]), image([20, 40, 60, 127]), "fixture"),
    /alpha changed/,
  );
  assert.throws(
    () => compareDecodedPixels(image([20, 40, 60, 255]), image([20, 40, 60, 255], 2, 1), "fixture"),
    /width changed/,
  );
});
