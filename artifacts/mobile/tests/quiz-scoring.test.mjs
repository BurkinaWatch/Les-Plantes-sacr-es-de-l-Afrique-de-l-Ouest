import assert from "node:assert/strict";
import test from "node:test";

import {
  QUIZ_ALGORITHM_VERSION,
  QUIZ_QUESTIONS,
  PLANTS,
  QUESTION_VALUE_SIGNALS,
  TOTEM_RESULTS,
  calculateTotem,
  derivePlantProfile,
} from "../.data-test-dist/data/quiz.js";

const DIMENSIONS = new Set(["E", "O", "C", "A", "S"]);
const REFLECTION_FIELDS = [
  "symboliqueAfricaine",
  "symboliqueSpirirtuelle",
  "symbolique",
  "qualites",
  "defauts",
  "pouvoirs",
  "enseignements",
  "citation",
  "proverbes",
  "legendes",
  "conseilsDeVie",
  "enseignementDuJour",
];

function normalizedWords(plant) {
  const text = REFLECTION_FIELDS.flatMap((field) => {
    const value = plant[field];
    return Array.isArray(value) ? value : [value ?? ""];
  })
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");
  return new Set(text.match(/[a-z0-9]+/g) ?? []);
}

function containsSignal(words, term) {
  return words.has(term) || words.has(`${term}s`) || words.has(`${term}x`);
}

function answersWith(value) {
  return Object.fromEntries(QUIZ_QUESTIONS.map((question) => [question.id, value]));
}

test("the quiz keeps its 20 statements on the five scoring dimensions", () => {
  assert.equal(QUIZ_QUESTIONS.length, 20);
  assert.ok(
    QUIZ_QUESTIONS.every(
      (question) =>
        typeof question.id === "number" && DIMENSIONS.has(question.dimension),
    ),
  );
  assert.equal(new Set(QUIZ_QUESTIONS.map((question) => question.id)).size, 20);
});

test("the current quiz balances one reverse-coded statement on each reflection axis", () => {
  assert.equal(QUIZ_ALGORITHM_VERSION, 3);
  const reversed = QUIZ_QUESTIONS.filter((question) => question.reversed);
  assert.equal(reversed.length, 5);

  for (const dimension of DIMENSIONS) {
    assert.equal(
      reversed.filter((question) => question.dimension === dimension).length,
      1,
      `Dimension ${dimension} needs one reverse-coded statement`,
    );
  }
});

test("reverse-coded answers contribute in the intended direction", () => {
  const neutralAnswers = answersWith(3);

  for (const question of QUIZ_QUESTIONS.filter((item) => item.reversed)) {
    const agreesWithAxis = calculateTotem({
      ...neutralAnswers,
      [question.id]: 1,
    });
    const disagreesWithAxis = calculateTotem({
      ...neutralAnswers,
      [question.id]: 5,
    });

    assert.ok(
      agreesWithAxis.dimensionScores[question.dimension] >
        disagreesWithAxis.dimensionScores[question.dimension],
      `Question ${question.id} must reverse its scale`,
    );
  }
});

test("question signals occur in selective reflection text, not only in generic or medicinal fields", () => {
  const questionIds = QUIZ_QUESTIONS.map((question) => String(question.id)).sort();
  assert.deepEqual(Object.keys(QUESTION_VALUE_SIGNALS).sort(), questionIds);

  for (const question of QUIZ_QUESTIONS) {
    const terms = QUESTION_VALUE_SIGNALS[question.id];
    assert.ok(terms.length >= 4, `Question ${question.id} needs several editorial signals`);
    assert.equal(new Set(terms).size, terms.length, `Question ${question.id} repeats a signal`);

    for (const term of terms) {
      const matchingPlants = PLANTS.filter((plant) =>
        containsSignal(normalizedWords(plant), term),
      ).length;
      assert.ok(
        matchingPlants > 0,
        `Question ${question.id} signal "${term}" does not occur in reflection text`,
      );
      assert.ok(
        matchingPlants < PLANTS.length * 0.7,
        `Question ${question.id} signal "${term}" is too broad (${matchingPlants}/${PLANTS.length})`,
      );
    }
  }
});

test("medical notes alone do not alter a plant's reflection match", () => {
  const base = {
    ...PLANTS[0],
    id: "quiz-medical-text-base",
    symboliqueAfricaine: "",
    symboliqueSpirirtuelle: "",
    symbolique: "",
    qualites: [],
    defauts: [],
    pouvoirs: [],
    enseignements: [],
    citation: "",
    proverbes: [],
    legendes: [],
    conseilsDeVie: [],
    enseignementDuJour: "",
  };
  const medicalVariant = {
    ...base,
    id: "quiz-medical-text-variant",
    vertus: Object.values(QUESTION_VALUE_SIGNALS).flat(),
    usagesTraditionnels: Object.values(QUESTION_VALUE_SIGNALS).flat(),
  };
  const answers = answersWith(3);
  const result = calculateTotem(answers, [base, medicalVariant]);

  assert.equal(
    result.scores[base.id],
    result.scores[medicalVariant.id],
    "Medical or traditional-use notes must not act as personality signals",
  );
  assert.deepEqual(
    derivePlantProfile(base),
    derivePlantProfile(medicalVariant),
    "Medical or traditional-use notes must not alter the editorial plant profile",
  );
});

test("a signal cannot match as a substring inside an unrelated word", () => {
  const noSignal = {
    ...PLANTS[0],
    id: "quiz-word-boundary-base",
    symboliqueAfricaine: "",
    symboliqueSpirirtuelle: "",
    symbolique: "repere",
    qualites: [],
    defauts: [],
    pouvoirs: [],
    enseignements: [],
    citation: "",
    proverbes: [],
    legendes: [],
    conseilsDeVie: [],
    enseignementDuJour: "",
  };
  const substringOnly = {
    ...noSignal,
    id: "quiz-word-boundary-substring",
    symbolique: "repere savoirfaire",
  };
  const result = calculateTotem(answersWith(3), [noSignal, substringOnly]);

  assert.equal(
    result.scores[noSignal.id],
    result.scores[substringOnly.id],
    '"savoir" must not match inside the unrelated token "savoirfaire"',
  );
});

test("scores include every current plant and resolve to renderable totems", () => {
  const result = calculateTotem(answersWith(3));
  const plantIds = PLANTS.map((plant) => plant.id);

  assert.ok(plantIds.every((id) => typeof id === "string"));
  assert.ok(Object.keys(result.scores).every((id) => typeof id === "string"));
  assert.deepEqual(Object.keys(result.scores).sort(), [...plantIds].sort());
  for (const id of plantIds) {
    const totem = TOTEM_RESULTS[id];
    assert.ok(totem, `Missing TOTEM_RESULTS entry for ${id}`);
    assert.equal(typeof totem.nom, "string");
    assert.ok(totem.nom.trim().length > 0);
    assert.equal(typeof totem.description, "string");
    assert.ok(totem.description.trim().length > 0);
  }
});

test("candidate scoring is dynamic and accepts a valid plant with a new string ID", () => {
  const basePlant = PLANTS[0];
  const syntheticPlant = {
    ...basePlant,
    id: "quiz-scoring-synthetic-plant",
  };
  const candidates = [...PLANTS, syntheticPlant];
  const result = calculateTotem(answersWith(4), candidates);

  assert.equal(typeof syntheticPlant.id, "string");
  assert.deepEqual(
    Object.keys(result.scores).sort(),
    candidates.map((plant) => plant.id).sort(),
  );
  const syntheticProfile = derivePlantProfile(syntheticPlant);
  for (const dimension of DIMENSIONS) {
    assert.ok(
      Number.isFinite(syntheticProfile[dimension]),
      `Synthetic profile is missing ${dimension}`,
    );
  }
});

test("a candidate reusing a catalog ID uses its own reflection profile", () => {
  const original = PLANTS[0];
  const customCandidate = {
    ...original,
    symboliqueAfricaine: "Mémoire ancêtre racine transmission communauté partage transformation cycle protection soutien",
    symboliqueSpirirtuelle: "",
    symbolique: "",
    qualites: [],
    defauts: [],
    pouvoirs: [],
    enseignements: [],
    citation: "",
    proverbes: [],
    legendes: [],
    conseilsDeVie: [],
    enseignementDuJour: "",
  };
  const answers = Object.fromEntries(
    QUIZ_QUESTIONS.map((question, index) => [question.id, (index % 5) + 1]),
  );

  assert.notEqual(
    calculateTotem(answers, [original]).scores[original.id],
    calculateTotem(answers, [customCandidate]).scores[customCandidate.id],
  );
});

test("identical answers produce a deterministic complete result", () => {
  const answers = Object.fromEntries(
    QUIZ_QUESTIONS.map((question, index) => [question.id, (index % 5) + 1]),
  );
  assert.deepEqual(calculateTotem(answers), calculateTotem({ ...answers }));
});

test("strongly contrasting response patterns can select different primaries", () => {
  const ascending = Object.fromEntries(
    QUIZ_QUESTIONS.map((question, index) => [question.id, (index % 5) + 1]),
  );
  const descending = Object.fromEntries(
    QUIZ_QUESTIONS.map((question, index) => [question.id, 5 - (index % 5)]),
  );
  const low = calculateTotem(ascending);
  const high = calculateTotem(descending);

  assert.notEqual(low.primary, high.primary);
});

test("individual answers matter even when five dimension averages are identical", () => {
  const flatAnswers = answersWith(3);
  const semanticValues = [1, 2, 4, 5];
  const reversedIds = new Set(
    QUIZ_QUESTIONS.filter((question) => question.reversed).map((question) => question.id),
  );
  const dimensionCounts = { E: 0, O: 0, C: 0, A: 0, S: 0 };
  const variedAnswers = Object.fromEntries(
    QUIZ_QUESTIONS.map((question) => {
      const semanticValue = semanticValues[dimensionCounts[question.dimension]++];
      return [
        question.id,
        reversedIds.has(question.id) ? 6 - semanticValue : semanticValue,
      ];
    }),
  );
  const flat = calculateTotem(flatAnswers);
  const varied = calculateTotem(variedAnswers);

  assert.deepEqual(varied.dimensionScores, flat.dimensionScores);
  assert.notEqual(varied.primary, flat.primary);
});

function countPrimaryPlants(makeAnswers, sampleCount = 512) {
  let state = 0x12345678;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
  const primaryCounts = new Map();

  for (let sample = 0; sample < sampleCount; sample += 1) {
    const answers = makeAnswers(random);
    const primary = calculateTotem(answers).primary;
    primaryCounts.set(primary, (primaryCounts.get(primary) ?? 0) + 1);
  }

  return primaryCounts;
}

test("common centered and agreement-heavy answers do not collapse to a few plants", () => {
  const answerStyles = [
    ["mostly 3–4", (random) => Object.fromEntries(QUIZ_QUESTIONS.map((question) => {
      const value = random() % 100;
      return [question.id, value < 50 ? 3 : value < 85 ? 4 : value < 95 ? 2 : 5];
    }))],
    ["mostly 4–5", (random) => Object.fromEntries(QUIZ_QUESTIONS.map((question) => {
      const value = random() % 100;
      return [question.id, value < 55 ? 4 : value < 80 ? 5 : value < 95 ? 3 : 2];
    }))],
  ];

  for (const [style, makeAnswers] of answerStyles) {
    const primaryCounts = countPrimaryPlants(makeAnswers);
    assert.ok(
      primaryCounts.size >= 45,
      `${style}: expected at least 45 distinct plants; found ${primaryCounts.size}`,
    );
    assert.ok(
      Math.max(...primaryCounts.values()) <= 80,
      `${style}: one plant dominates more than 16% of the sample`,
    );
  }
});

test("correlated answers across the five axes still use the full response pattern", () => {
  const primaryCounts = countPrimaryPlants((random) => {
    const dimensionLevels = Object.fromEntries(
      ["E", "O", "C", "A", "S"].map((dimension) => [dimension, 2 + (random() % 4)]),
    );
    return Object.fromEntries(QUIZ_QUESTIONS.map((question) => [
      question.id,
      Math.max(1, Math.min(5, dimensionLevels[question.dimension] + (random() % 3) - 1)),
    ]));
  });

  assert.ok(
    primaryCounts.size >= 35,
    `Expected at least 35 distinct primary plants; found ${primaryCounts.size}`,
  );
  assert.ok(
    Math.max(...primaryCounts.values()) <= 110,
    "No single plant should dominate more than about one fifth of the axis-correlated sample",
  );
});

test("uniform midpoint answers get a neutral score and are marked as weakly differentiated", () => {
  const result = calculateTotem(answersWith(3));

  assert.equal(result.lowDifferentiation, true);
  assert.ok(Object.values(result.scores).every((score) => score === 50));
  assert.deepEqual(result, calculateTotem(answersWith(3)));
});

test("uniform agreement is not mistaken for a neutral response style", () => {
  const result = calculateTotem(answersWith(4));

  assert.equal(result.lowDifferentiation, false);
  assert.ok(Object.values(result.scores).some((score) => score !== 50));
});

test("dimension scores and candidate indices are finite", () => {
  const result = calculateTotem(answersWith(3));
  for (const score of Object.values(result.scores)) {
    assert.equal(typeof score, "number");
    assert.ok(Number.isFinite(score));
    assert.ok(score >= 0 && score <= 100);
  }
  for (const score of Object.values(result.dimensionScores)) {
    assert.equal(typeof score, "number");
    assert.ok(Number.isFinite(score));
    assert.ok(score >= 0 && score <= 100);
  }
});

test("incomplete and invalid answer sets are rejected", () => {
  const complete = answersWith(3);
  const incomplete = { ...complete };
  delete incomplete[QUIZ_QUESTIONS[0].id];

  assert.throws(() => calculateTotem({}));
  assert.throws(() => calculateTotem(incomplete));

  for (const invalid of [0, 6, Number.NaN, "3", null]) {
    const answers = { ...complete, [QUIZ_QUESTIONS[0].id]: invalid };
    assert.throws(() => calculateTotem(answers));
  }
});