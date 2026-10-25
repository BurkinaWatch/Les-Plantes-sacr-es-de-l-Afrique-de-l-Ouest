// Reproducible high-quality conversion from retained PNG masters.
// Source PNGs are never deleted or edited by this script.
// Usage: node scripts/optimize-catalog-images.js [source-directory]
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const assert = require("node:assert/strict");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const destination = path.join(root, "assets/images/plants");
const source = path.resolve(process.argv[2] || destination);
const reportDirectory = path.resolve(root, "../../generated-artifacts/android-size");
const QUALITY = 95;
const MIN_PSNR_DB = 38.0;

function compareDecodedPixels(original, decoded, name) {
  assert.equal(decoded.info.width, original.info.width, `${name}: width changed`);
  assert.equal(decoded.info.height, original.info.height, `${name}: height changed`);
  assert.equal(original.info.channels, 4, `${name}: original was not normalized to RGBA`);
  assert.equal(decoded.info.channels, 4, `${name}: output was not normalized to RGBA`);
  assert.equal(decoded.data.length, original.data.length, `${name}: pixel buffer size changed`);

  let squaredError = 0;
  let colorSamples = 0;
  for (let pixel = 0; pixel < original.data.length; pixel += 4) {
    assert.equal(decoded.data[pixel + 3], original.data[pixel + 3], `${name}: alpha changed`);
    for (let channel = 0; channel < 3; channel += 1) {
      const difference = original.data[pixel + channel] - decoded.data[pixel + channel];
      squaredError += difference * difference;
      colorSamples += 1;
    }
  }

  const mse = squaredError / colorSamples;
  const psnrDb = mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse);
  return { psnrDb, squaredError, colorSamples, alphaIdentical: true };
}

async function encodePng(sourcePath, name) {
  const original = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const webp = await sharp(sourcePath)
    .webp({ quality: QUALITY, effort: 6, smartSubsample: true, alphaQuality: 100 })
    .toBuffer();
  const decoded = await sharp(webp)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const quality = compareDecodedPixels(original, decoded, name);
  assert(
    quality.psnrDb >= MIN_PSNR_DB,
    `${name}: PSNR ${quality.psnrDb.toFixed(2)} dB is below ${MIN_PSNR_DB} dB`,
  );
  return { webp, info: original.info, quality };
}

async function main() {
  const registry = fs.readFileSync(path.join(root, "constants/plantImages.ts"), "utf8");
  const names = [...new Set(
    [...registry.matchAll(/plants\/([^/'"]+)\.webp/g)].map((match) => match[1]),
  )];
  assert(names.length > 0, "No WebP catalog images found in registry");
  const report = [];
  const staging = fs.mkdtempSync(path.join(destination, ".catalog-webp-"));
  try {
    for (const name of names) {
      const original = path.join(source, `${name}.png`);
      const output = path.join(destination, `${name}.webp`);
      assert(fs.existsSync(original), `${name}: PNG master is missing`);
      const previousBytes = fs.existsSync(output) ? fs.statSync(output).size : 0;
      const { webp, info, quality } = await encodePng(original, name);
      fs.writeFileSync(path.join(staging, `${name}.webp`), webp);
      report.push({
        name,
        previousBytes,
        sourcePngBytes: fs.statSync(original).size,
        outputBytes: webp.length,
        width: info.width,
        height: info.height,
        quality: QUALITY,
        psnrDb: Number(quality.psnrDb.toFixed(2)),
        alphaIdentical: quality.alphaIdentical,
      });
    }

    // Do not replace any catalog image until every master passed its quality
    // and alpha checks.
    for (const name of names) {
      fs.renameSync(
        path.join(staging, `${name}.webp`),
        path.join(destination, `${name}.webp`),
      );
    }
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }

  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(reportDirectory, "lossy-conversion.json"),
    JSON.stringify(report, null, 2),
  );
  const previous = report.reduce((sum, row) => sum + row.previousBytes, 0);
  const after = report.reduce((sum, row) => sum + row.outputBytes, 0);
  console.log(JSON.stringify({
    images: report.length,
    quality: QUALITY,
    minimumPsnrDb: MIN_PSNR_DB,
    previousBytes: previous,
    outputBytes: after,
    savingPercent: previous ? Number(((1 - after / previous) * 100).toFixed(2)) : null,
    dimensionsPreserved: true,
    alphaIdentical: true,
  }));
}

module.exports = { compareDecodedPixels, encodePng, QUALITY, MIN_PSNR_DB };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
