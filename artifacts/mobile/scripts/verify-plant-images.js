const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const complementaryPlantsPath = path.join(
  root,
  "data",
  "plantes-medicinales-complementaires.ts",
);
const plantImagesPath = path.join(root, "constants", "plantImages.ts");
const plantImagesDirectory = path.join(root, "assets", "images", "plants");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function complementaryPlantIds(source) {
  return [...source.matchAll(/^\s*id:\s*["']([^"']+)["']\s*,?\s*$/gm)].map(
    ([, id]) => id,
  );
}

function hasRegistryEntry(source, id) {
  const escapedId = escapeRegExp(id);
  const entryPattern = new RegExp(
    String.raw`^\s*(?:'${escapedId}'|"${escapedId}"|${escapedId})\s*:\s*require\([^)\n]*\/${escapedId}\.png["']?\s*\)`,
    "m",
  );
  return entryPattern.test(source);
}

const ids = complementaryPlantIds(read(complementaryPlantsPath));
const registrySource = read(plantImagesPath);
const missing = [];

if (ids.length === 0) {
  missing.push(
    "aucun identifiant trouvé dans data/plantes-medicinales-complementaires.ts",
  );
}

for (const id of ids) {
  const imagePath = path.join(plantImagesDirectory, `${id}.png`);

  if (!fs.existsSync(imagePath)) {
    missing.push(`${id}: fichier PNG manquant (${path.relative(root, imagePath)})`);
  }

  if (!hasRegistryEntry(registrySource, id)) {
    missing.push(`${id}: entrée manquante ou incorrecte dans constants/plantImages.ts`);
  }
}

if (missing.length > 0) {
  console.error("Plant image verification failed:");
  for (const problem of missing) {
    console.error(`- ${problem}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Plant image verification passed: ${ids.length} complementary plant IDs have a PNG file and a registry entry.`,
  );
}