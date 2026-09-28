import assert from "node:assert/strict";
import test from "node:test";

import {
  QUIZ_QUESTIONS,
  PLANTS,
  TOTEM_RESULTS,
  calculateTotem,
  derivePlantProfile,
} from "../.data-test-dist/data/quiz.js";

const DIMENSIONS = new Set(["E", "O", "C", "A", "S"]);

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

test("identical answers produce a deterministic complete result", () => {
  const answers = Object.fromEntries(
    QUIZ_QUESTIONS.map((question, index) => [question.id, (index % 5) + 1]),
  );
  assert.deepEqual(calculateTotem(answers), calculateTotem({ ...answers }));
});

test("strongly contrasting response patterns can select different primaries", () => {
  const low = calculateTotem(answersWith(1));
  const high = calculateTotem(answersWith(5));

  assert.notEqual(low.primary, high.primary);
});

test("dimension and candidate scores are finite percentages", () => {
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