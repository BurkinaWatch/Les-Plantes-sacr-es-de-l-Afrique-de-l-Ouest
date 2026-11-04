import assert from "node:assert/strict";
import { createServer } from "node:http";
import express from "express";
import { test } from "node:test";

import { createQuizPlantFeedbackRouter } from "../.test-dist/src/routes/quiz-plant-feedback.js";

function createFeedbackDatabase() {
  const aggregates = new Map();
  const statements = [];
  const query = async (sql, values = []) => {
    statements.push({ sql, values });
    if (!sql.includes("INSERT INTO quiz_plant_feedback")) {
      throw new Error("Unexpected anonymous feedback database query.");
    }

    const [algorithmVersion, plantId, resonates] = values;
    const key = `${algorithmVersion}:${plantId}:${resonates}`;
    const current = aggregates.get(key);
    aggregates.set(key, {
      algorithmVersion,
      plantId,
      resonates,
      voteCount: (current?.voteCount ?? 0) + 1,
    });
  };

  return { aggregates, statements, query };
}

async function withFeedbackApp(database, callback) {
  const app = express();
  app.use(express.json());
  app.use(
    "/api/quiz/plant-feedback",
    createQuizPlantFeedbackRouter({
      query: database.query,
      submitLimiter: (_req, _res, next) => next(),
    }),
  );

  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

test("feedback is optional, needs no account, and increments aggregate counters only", async () => {
  const database = createFeedbackDatabase();
  await withFeedbackApp(database, async (baseUrl) => {
    for (let vote = 0; vote < 2; vote += 1) {
      const response = await fetch(`${baseUrl}/api/quiz/plant-feedback`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          algorithmVersion: 3,
          plantId: "baobab",
          resonates: true,
        }),
      });
      assert.equal(response.status, 204);
      assert.equal(await response.text(), "");
    }

    const response = await fetch(`${baseUrl}/api/quiz/plant-feedback`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        algorithmVersion: 3,
        plantId: "baobab",
        resonates: false,
      }),
    });
    assert.equal(response.status, 204);
  });

  assert.deepEqual(
    [...database.aggregates.values()],
    [
      {
        algorithmVersion: 3,
        plantId: "baobab",
        resonates: true,
        voteCount: 2,
      },
      {
        algorithmVersion: 3,
        plantId: "baobab",
        resonates: false,
        voteCount: 1,
      },
    ],
  );
  assert.ok(database.statements.every(({ values }) => values.length === 3));
  assert.ok(
    database.statements.every(
      ({ sql }) =>
        sql.includes("ON CONFLICT") &&
        sql.includes("vote_count = quiz_plant_feedback.vote_count + 1"),
    ),
  );
});

test("feedback rejects quiz answers, account fields, free text, and unsupported versions", async () => {
  const database = createFeedbackDatabase();
  const invalidBodies = [
    { algorithmVersion: 2, plantId: "baobab", resonates: true },
    { algorithmVersion: 3, plantId: "baobab", resonates: true, answers: { 1: 5 } },
    { algorithmVersion: 3, plantId: "baobab", resonates: true, userId: 42 },
    { algorithmVersion: 3, plantId: "baobab", resonates: true, comment: "great" },
    { algorithmVersion: 3, plantId: "../baobab", resonates: true },
    { algorithmVersion: 3, plantId: "baobab", resonates: "yes" },
  ];

  await withFeedbackApp(database, async (baseUrl) => {
    for (const body of invalidBodies) {
      const response = await fetch(`${baseUrl}/api/quiz/plant-feedback`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      assert.equal(response.status, 400);
    }
  });

  assert.equal(database.statements.length, 0);
  assert.equal(database.aggregates.size, 0);
});
