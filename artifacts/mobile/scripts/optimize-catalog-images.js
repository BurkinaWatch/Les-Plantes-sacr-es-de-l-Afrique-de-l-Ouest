// One-time, reproducible conversion. Original PNGs can be supplied from a
// previous checkout; source files are never deleted or edited by this script.
// Usage: node scripts/optimize-catalog-images.js [source-directory]
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const destination = path.join(root, "assets/images/plants");
const source = path.resolve(process.argv[2] || destination);
const reportDirectory = path.resolve(root, "../../generated-artifacts/android-size");

async function main() {
  const registry = fs.readFileSync(path.join(root, "constants/plantImages.ts"), "utf8");
  const names = [...new Set(
    [...registry.matchAll(/plants\/([^/'"]+)\.webp/g)].map((match) => match[1]),
  )];
  assert(names.length > 0, "No WebP catalog images found in registry");
  const report = [];
  for (const name of names) {
    const original = path.join(source, `${name}.png`);
    const output = path.join(destination, `${name}.webp`);
    const png = await sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const webp = await sharp(original).webp({ lossless: true, effort: 6 }).toBuffer();
    const decoded = await sharp(webp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(decoded.info.width, png.info.width, `${name}: width changed`);
    assert.equal(decoded.info.height, png.info.height, `${name}: height changed`);
    assert(png.data.equals(decoded.data), `${name}: decoded RGBA pixels changed`);
    assert(webp.length < fs.statSync(original).size, `${name}: no size saving`);
    fs.writeFileSync(output, webp);
    report.push({
      name, before: fs.statSync(original).size, after: webp.length,
      width: png.info.width, height: png.info.height, identicalRGBA: true,
    });
  }
  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.writeFileSync(path.join(reportDirectory, "lossless-conversion.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    images: report.length,
    before: report.reduce((sum, row) => sum + row.before, 0),
    after: report.reduce((sum, row) => sum + row.after, 0),
    identicalRGBA: true,
  }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
