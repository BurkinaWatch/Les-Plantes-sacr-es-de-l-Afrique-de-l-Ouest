import assert from "node:assert/strict";
import test from "node:test";

import { PLANTS } from "../.data-test-dist/data/animals.js";
import { PLANTES_MEDICINALES } from "../.data-test-dist/data/plantes-medicinales.js";
import { ARTICLES } from "../.data-test-dist/data/articles.js";

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function duplicateEntries(entries, field) {
  const grouped = new Map();

  for (const entry of entries) {
    const key = normalize(entry[field]);
    const ids = grouped.get(key) ?? [];
    ids.push(entry.id);
    grouped.set(key, ids);
  }

  return [...grouped.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([value, ids]) => `${value} (${ids.join(", ")})`);
}

function catalogDuplicateReport(entries) {
  return {
    ids: duplicateEntries(entries, "id"),
    scientificNames: duplicateEntries(entries, "nomScientifique"),
  };
}

function formatDuplicateReport(catalogName, report) {
  const failures = [];
  if (report.ids.length > 0) {
    failures.push(`${catalogName} — identifiants: ${report.ids.join("; ")}`);
  }
  if (report.scientificNames.length > 0) {
    failures.push(
      `${catalogName} — noms scientifiques: ${report.scientificNames.join("; ")}`,
    );
  }
  return failures;
}

test("catalogues keep identifiers and normalized scientific names unique", () => {
  const failures = [
    ...formatDuplicateReport("PLANTS", catalogDuplicateReport(PLANTS)),
    ...formatDuplicateReport(
      "PLANTES_MEDICINALES",
      catalogDuplicateReport(PLANTES_MEDICINALES),
    ),
  ];

  assert.deepEqual(
    failures,
    [],
    `Doublons détectés dans les catalogues:\n${failures.join("\n")}`,
  );
});

const cautiousFormulation = new RegExp(
  [
    "usage(?:s)?\\s+traditionnel(?:le|les|s)?",
    "emploi(?:s)?\\s+traditionnel(?:le|les|s)?",
    "(?:médecine|pharmacopée)\\s+traditionnel(?:le|les|s)?",
    "(?:étude|études|expérimentation|essai|essais)",
    "(?:a|ont)\\s+(?:été\\s+)?(?:montré(?:e|es)?|vérifié(?:e|es)?|démontré(?:e|es)?)",
    "(?:cependant|toutefois|par contre)",
    "(?:surveiller|distinguer|usage externe|avis médical|avis professionnel)",
    "ne\\s+[^.?!]{1,100}\\s+pas",
  ].join("|"),
  "i",
);

function monographHasSafetyContext(monograph) {
  if (monograph.precautions?.trim()) return true;

  const text = [
    monograph.historique,
    monograph.descriptionPlante,
    monograph.actionCurative,
    ...monograph.emplois.flatMap((emploi) => [
      emploi.indication,
      emploi.preparation,
    ]),
  ].join(" ");

  return cautiousFormulation.test(text);
}

test("each plant monograph has source, safety context, and an employment", () => {
  const incomplete = PLANTES_MEDICINALES.filter(
    (monograph) =>
      !monograph.source?.trim() ||
      !monographHasSafetyContext(monograph) ||
      !monograph.emplois?.some(
        (emploi) =>
          emploi.indication?.trim() && emploi.preparation?.trim(),
      ),
  ).map((monograph) => {
    const missing = [];
    if (!monograph.source?.trim()) missing.push("source");
    if (!monographHasSafetyContext(monograph)) {
      missing.push("précautions ou formulation prudente");
    }
    if (
      !monograph.emplois?.some(
        (emploi) =>
          emploi.indication?.trim() && emploi.preparation?.trim(),
      )
    ) {
      missing.push("emploi");
    }
    return `${monograph.id}: ${missing.join(", ")}`;
  });

  assert.deepEqual(
    incomplete,
    [],
    `Fiches incomplètes:\n${incomplete.join("\n")}`,
  );
});

test("food and agroecology profiles link both taxonomy and supporting research", () => {
  const nonMedicinal = PLANTES_MEDICINALES.filter(
    (plant) =>
      plant.typeSavoir === "alimentaire" ||
      plant.typeSavoir === "agroecologique",
  );

  assert.ok(nonMedicinal.length >= 8, "La bibliothèque doit proposer plusieurs fiches non médicinales.");
  const incomplete = nonMedicinal
    .filter(
      (plant) =>
        !plant.sourceLinks?.some((source) => source.kind === "taxonomie") ||
        !plant.sourceLinks?.some((source) => source.kind === "scientifique"),
    )
    .map((plant) => plant.id);

  assert.deepEqual(
    incomplete,
    [],
    `Chaque fiche non médicinale doit lier sa taxonomie et sa source scientifique: ${incomplete.join(", ")}`,
  );
});

test("social-media references are labeled as testimony, not medical evidence", () => {
  const article = ARTICLES.find(
    (entry) => entry.id === "plantes-reseaux-sociaux-temoignages",
  );

  assert.ok(article, "L’article de contextualisation des réseaux sociaux doit exister.");
  const socialSources = article.sourceLinks?.filter(
    (source) => source.kind === "publication sociale",
  ) ?? [];

  assert.equal(socialSources.length, 3, "L’article doit citer les trois publications publiques repérées.");
  assert.ok(
    socialSources.every(
      (source) =>
        source.url.startsWith("https://") &&
        /témoignage|piste/i.test(source.note ?? "") &&
        /pas (?:une )?preuve médicale/i.test(source.note ?? ""),
    ),
    "Chaque publication sociale doit avoir un lien et une mise en garde explicite.",
  );

  const content = article.contenu.map((section) => section.content).join(" ");
  assert.match(content, /espèce botanique/);
  assert.match(content, /ne justifie aucun dosage/);
});