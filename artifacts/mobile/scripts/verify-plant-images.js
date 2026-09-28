const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const plantImagesPath = path.join(root, "constants", "plantImages.ts");
const plantImagesDirectory = path.join(root, "assets", "images", "plants");

// True botanical synonyms can reuse the same illustration.
const registryFileAliases = new Map([
  ["butyrospermum-parkii", "karite"],
  ["gymnanthemum-amygdalinum", "vernonia"],
]);

// Keep legacy scientific-name keys valid when the displayed catalog uses a
// common-name ID for the same species.
const supersededRegistryIdAliases = new Map([
  ["acajou", "caïlcédrat"],
  ["detarium-senegalense", "ditakh"],
  ["mangifera-indica", "manguier"],
]);

function normalizeAssetId(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function registryEntries(source) {
  const entries = new Map();
  const entryPattern =
    /^\s*(?:(['"])(.*?)\1|([A-Za-z_$][\w$]*))\s*:\s*require\(\s*['"][^'"\n]*\/([^/'"\n]+)\.(png|jpe?g)['"]\s*\)\s*,?/gim;

  for (const match of source.matchAll(entryPattern)) {
    const key = match[2] ?? match[3];
    entries.set(key, { file: match[4], extension: match[5].toLowerCase() });
  }

  return entries;
}

function imageFiles() {
  return fs
    .readdirSync(plantImagesDirectory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() && /\.(png|jpe?g)$/i.test(path.extname(entry.name)),
    )
    .map((entry) => path.basename(entry.name, path.extname(entry.name)));
}

function catalogPlantIds() {
  const buildScript = path.join(root, "scripts", "build-data-tests.js");
  const build = spawnSync(process.execPath, [buildScript], {
    cwd: root,
    encoding: "utf8",
  });

  if (build.error || build.status !== 0) {
    throw new Error(
      `Could not load the effective plant catalog.\n${build.stderr || build.error || ""}`,
    );
  }

  const { PLANTS } = require(path.join(
    root,
    ".data-test-dist",
    "data",
    "animals.js",
  ));
  if (!Array.isArray(PLANTS) || PLANTS.length === 0) {
    throw new Error("The effective plant catalog is empty or unavailable.");
  }

  return [...new Set(PLANTS.map((plant) => plant.id))];
}

const ids = catalogPlantIds();
const normalizedCatalogIds = new Set(ids.map(normalizeAssetId));
const registrySource = read(plantImagesPath);
const registry = registryEntries(registrySource);
const files = imageFiles();
const registeredImageIds = new Set(
  [...registry.values()].map(({ file }) => normalizeAssetId(file)),
);
const missing = [];

if (ids.length === 0) {
  missing.push(
    "aucun identifiant trouvé dans les sources du catalogue principal",
  );
}

for (const id of ids) {
  const registryEntry = registry.get(id);

  if (!registryEntry) {
    missing.push(
      `${id}: entrée manquante dans constants/plantImages.ts`,
    );
    continue;
  }

  const { file, extension } = registryEntry;
  const registryImagePath = path.join(
    plantImagesDirectory,
    `${file}.${extension}`,
  );
  const normalizedId = normalizeAssetId(id);
  const normalizedRegistryFile = normalizeAssetId(file);
  const hasExpectedName =
    normalizedRegistryFile === normalizedId ||
    normalizedRegistryFile === `${normalizedId}-full-plant` ||
    normalizedRegistryFile ===
      normalizeAssetId(registryFileAliases.get(id) ?? "");

  if (!hasExpectedName || !fs.existsSync(registryImagePath)) {
    missing.push(
      `${id}: entrée incorrecte ou fichier image référencé manquant (${file}.${extension})`,
    );
  }
}

for (const [id] of registry) {
  const normalizedId = normalizeAssetId(id);
  const replacementId = supersededRegistryIdAliases.get(id);
  const hasCatalogReplacement =
    replacementId &&
    ids.includes(replacementId) &&
    registry.has(replacementId);
  if (!normalizedCatalogIds.has(normalizedId) && !hasCatalogReplacement) {
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
      `${imageFile}: illustration orpheline dans assets/images/plants (aucune fiche du catalogue)`,
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
    `Plant image verification passed: ${ids.length} catalog plant IDs have an image file and a registry entry.`,
  );
}