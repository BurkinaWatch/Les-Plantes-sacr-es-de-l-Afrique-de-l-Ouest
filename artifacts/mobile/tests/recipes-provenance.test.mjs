import assert from "node:assert/strict";
import test from "node:test";

import { ARTICLES } from "../.data-test-dist/data/articles.js";
import { RECIPES } from "../.data-test-dist/data/recipes.js";

const NEW_RECIPE_IDS = [
  "miyan-kuka-baobab",
  "kontomire-stew-ghana",
  "ofe-onugbu-bitterleaf",
  "dawadawa-jollof-rice",
  "fonio-sauce-legumes",
  "abenkwan-palmnut-soup",
  "egusi-soup-nigeria",
  "soupe-feuilles-manioc-liberia",
  "miyan-taushe-courge",
];

test("new food recipes link directly to verified culinary sources and include precautions", () => {
  const recipes = NEW_RECIPE_IDS.map((id) => RECIPES.find((recipe) => recipe.id === id));
  assert.ok(recipes.every(Boolean), "Toutes les recettes ajoutées doivent exister.");

  for (const recipe of recipes) {
    assert.equal(recipe.categorie, "alimentation", `${recipe.id} doit rester classée comme aliment.`);
    assert.ok(recipe.sourceLinks?.some((source) => source.kind === "source culinaire"), `${recipe.id} doit avoir une source de recette.`);
    assert.ok(recipe.sourceLinks.every((source) => source.url.startsWith("https://") && source.title.trim() && source.note.trim()), `${recipe.id} doit avoir des liens HTTPS décrits.`);
    assert.ok(recipe.precautions?.trim(), `${recipe.id} doit préciser les précautions alimentaires.`);
    assert.ok(recipe.ingredients.length >= 4 && recipe.etapes.length >= 4, `${recipe.id} doit être suffisamment exploitable.`);
  }
});

test("new research articles cite the exact open-access sources they summarize", () => {
  const expected = [
    ["dawadawa-ingredient-etude", "Microbial Diversity, Nutritional Composition, and Health Implications of Fermented Locust Bean Seed (Dawadawa) From Ghana."],
    ["zamne-evaluation-sensorielle", "Sensory properties of fermented Zamné (Senegalia macrostachya seeds) and their influence on the broth quality and sensory profile."],
    ["feuille-amere-transformation", "Processing, Bioaccessibility, Predicted Bioavailability, Gut Microbiome Interactions and Potential Food Applications of Vernonia amygdalina (Bitter Leaf): Bridging the Evidence-to-Practice Gap."],
    ["moringa-essais-humains", "The Effect of Moringa oleifera on Body Weight and Blood Pressure: A Systematic Review and Meta-Analysis of Randomized Controlled Trials."],
    ["basilic-africain-cuisine", "Ocimum gratissimum: Chemical Composition, Phytochemical Properties, Antioxidants, and Pharmacological Activities: A Review."],
  ];

  for (const [id, exactTitle] of expected) {
    const article = ARTICLES.find((entry) => entry.id === id);
    assert.ok(article, `Article manquant : ${id}`);
    assert.ok(
      article.sourceLinks?.some((source) => source.title === exactTitle && source.url.startsWith("https://")),
      `${id} doit citer le titre bibliographique exact.`,
    );
  }
});
