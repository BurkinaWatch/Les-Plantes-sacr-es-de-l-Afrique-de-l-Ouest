import assert from "node:assert/strict";
import test from "node:test";

import { CATEGORY_LABEL_KEYS, getCategoryLabels } from "../.test-dist/lib/category-labels.js";
import { dyo } from "../.test-dist/i18n/dyo.js";
import { en } from "../.test-dist/i18n/en.js";
import { fr } from "../.test-dist/i18n/fr.js";
import { ful } from "../.test-dist/i18n/ful.js";
import { mos } from "../.test-dist/i18n/mos.js";

const categories = Object.keys(CATEGORY_LABEL_KEYS);
const legacyKeys = [
  "cat_mammals",
  "cat_birds",
  "cat_reptiles",
  "cat_amphibians",
  "cat_aquatic",
  "cat_invertebrates",
];

test("category labels use plant-specific translation keys", () => {
  assert.deepEqual(Object.values(CATEGORY_LABEL_KEYS), [
    "cat_sacred_trees",
    "cat_medicinal_plants",
    "cat_food_plants",
    "cat_ritual_plants",
    "cat_herbs_grasses",
    "cat_palms",
  ]);
  assert.equal(
    Object.values(CATEGORY_LABEL_KEYS).some((key) => legacyKeys.includes(key)),
    false,
  );
  assert.equal(categories.length, 6);
});

test("every supported language provides all category labels", () => {
  const locales = { fr, en, mos, dyo, ful };

  for (const [language, translations] of Object.entries(locales)) {
    assert.equal(typeof translations.cat_all, "string", `${language} all label`);
    assert.ok(translations.cat_all.trim(), `${language} all label is not empty`);

    const labels = getCategoryLabels(translations);
    assert.deepEqual(Object.keys(labels), categories, `${language} category order`);

    for (const category of categories) {
      const label = labels[category];
      assert.equal(typeof label, "string", `${language} ${category} type`);
      assert.ok(label.trim(), `${language} ${category} is not empty`);
    }
  }
});

test("legacy animal category keys are absent from every language", () => {
  const locales = { fr, en, mos, dyo, ful };

  for (const [language, translations] of Object.entries(locales)) {
    for (const key of legacyKeys) {
      assert.equal(
        key in translations,
        false,
        `${language} still exposes legacy key ${key}`,
      );
    }
  }
});