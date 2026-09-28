const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const catalogPlantsPath = path.join(root, "data", "animals.ts");
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

function plantIds(source) {
  return [...source.matchAll(/^\s*id:\s*["']([^"']+)["']\s*,?\s*$/gm)].map(
    ([, id]) => id,
  );
}

function normalizeAssetId(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function registryEntries(source) {
  const entries = new Map();
  const entryPattern =
    /^\s*(?:(['"])(.*?)\1|([A-Za-z_$][\w$]*))\s*:\s*require\(\s*['"][^'"\n]*\/([^/'"\n]+)\.png['"]\s*\)\s*,?/gm;

  for (const match of source.matchAll(entryPattern)) {
    const key = match[2] ?? match[3];
    entries.set(key, match[4]);
  }

  return entries;
}

function imageFiles() {
  return fs
    .readdirSync(plantImagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".png")
    .map((entry) => path.basename(entry.name, ".png"));
}

const corePlantIds = plantIds(read(catalogPlantsPath));
const complementaryPlantIds = plantIds(read(complementaryPlantsPath));
const ids = [...new Set([...corePlantIds, ...complementaryPlantIds])];
const normalizedCatalogIds = new Set(ids.map(normalizeAssetId));
const registrySource = read(plantImagesPath);
const registry = registryEntries(registrySource);
const files = imageFiles();
const registeredImageIds = new Set(
  [...registry.values()].map(normalizeAssetId),
);
const missing = [];

if (ids.length === 0) {
  missing.push(
    "aucun identifiant trouvé dans les sources du catalogue principal",
  );
}

for (const id of ids) {
  const registryFile = registry.get(id);

  if (!registryFile) {
    missing.push(
      `${id}: entrée manquante dans constants/plantImages.ts`,
    );
    continue;
  }

  const registryImagePath = path.join(plantImagesDirectory, `${registryFile}.png`);
  const normalizedId = normalizeAssetId(id);
  const normalizedRegistryFile = normalizeAssetId(registryFile);
  const hasExpectedName =
    normalizedRegistryFile === normalizedId ||
    normalizedRegistryFile === `${normalizedId}-full-plant`;

  if (!hasExpectedName || !fs.existsSync(registryImagePath)) {
    missing.push(
      `${id}: entrée incorrecte ou fichier PNG référencé manquant (${registryFile}.png)`,
    );
  }
}

for (const [id] of registry) {
  const normalizedId = normalizeAssetId(id);
  if (!normalizedCatalogIds.has(normalizedId)) {
    missing.push(
      `${id}: entrée orpheline dans constants/plantImages.ts (aucune fiche du catalogue)`,
    );
  }
}

for (const imageFile of files) {
  const normalizedId = normalizeAssetId(imageFile);
  if (
    !normalizedCatalogIds.has(normalizedId) &&
    !registeredImageIds.has(normalizedId)
  ) {
    missing.push(
      `${imageFile}: illustration PNG orpheline dans assets/images/plants (aucune fiche du catalogue)`,
    );
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
    `Plant image verification passed: ${ids.length} catalog plant IDs have a PNG file and a registry entry.`,
  );
}