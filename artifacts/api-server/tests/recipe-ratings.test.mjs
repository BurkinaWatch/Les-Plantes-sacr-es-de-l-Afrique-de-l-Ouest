import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import express from "express";
import { test } from "node:test";

import {
  createRecipeRatingsRouter,
  RECIPE_RATING_IDS,
} from "../.test-dist/src/routes/recipe-ratings.js";

function createRatingsDatabase() {
  const ratings = new Map();
  const query = async (sql, values = []) => {
    if (sql.includes("INSERT INTO recipe_ratings")) {
      const [recipeId, userId, taste, preparationEase] = values;
      ratings.set(`${recipeId}:${userId}`, {
        recipe_id: recipeId,
        user_id: userId,
        taste_score: taste,
        preparation_ease_score: preparationEase,
      });
      return { rows: [] };
    }

    if (sql.includes("FROM recipe_ratings")) {
      const [userId, recipeId] = values;
      const recipeRatings = [...ratings.values()].filter(
        (rating) => rating.recipe_id === recipeId,
      );
      const average = (key) => recipeRatings.length
        ? Math.round(
          recipeRatings.reduce((total, rating) => total + rating[key], 0) /
            recipeRatings.length * 10,
        ) / 10
        : null;
      const ownRating = ratings.get(`${recipeId}:${userId}`);
      return {
        rows: [{
          rating_count: recipeRatings.length,
          taste_average: average("taste_score"),
          preparation_ease_average: average("preparation_ease_score"),
          my_taste: ownRating?.taste_score ?? null,
          my_preparation_ease: ownRating?.preparation_ease_score ?? null,
        }],
      };
    }

    throw new Error("Unexpected recipe-rating database query.");
  };

  return { ratings, query };
}

function createAuthMiddleware() {
  return (req, res, next) => {
    const userId = Number(req.get("x-test-user-id"));
    if (!Number.isSafeInteger(userId) || userId < 1) {
      return res.status(401).json({ error: "Authentification requise" });
    }
    req.user = { id: userId, username: `test-${userId}` };
    return next();
  };
}

async function withRatingsApp(database, callback) {
  const app = express();
  app.use(express.json());
  app.use(
    "/api/recipes",
    createRecipeRatingsRouter({
      query: database.query,
      authenticate: createAuthMiddleware(),
      readLimiter: (_req, _res, next) => next(),
      writeLimiter: (_req, _res, next) => next(),
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

const headersFor = (userId) => ({
  "content-type": "application/json",
  "x-test-user-id": String(userId),
});

test("the OpenAPI enum, API allowlist, and mobile recipe catalogue stay aligned", () => {
  const spec = readFileSync(
    new URL("../../../lib/api-spec/openapi.yaml", import.meta.url),
    "utf8",
  );
  const recipeData = readFileSync(
    new URL("../../mobile/data/recipes.ts", import.meta.url),
    "utf8",
  );
  const recipeIdBlock = spec.match(
    /^\s{4}RecipeId:\s*\n([\s\S]*?)(?=^\s{4}RecipeRatingValues:)/m,
  )?.[1];

  assert.ok(recipeIdBlock, "RecipeId must remain an explicit OpenAPI allowlist");
  const openApiIds = [...recipeIdBlock.matchAll(/^\s+- ([a-z0-9-]+)\s*$/gm)]
    .map((match) => match[1]);
  const mobileIds = [...recipeData.matchAll(/^\s*id:\s*'([^']+)'/gm)]
    .map((match) => match[1]);

  assert.deepEqual([...RECIPE_RATING_IDS].sort(), [...openApiIds].sort());
  assert.deepEqual([...RECIPE_RATING_IDS].sort(), [...mobileIds].sort());
});

test("rating endpoints require an authenticated account", async () => {
  const database = createRatingsDatabase();
  await withRatingsApp(database, async (baseUrl) => {
    const response = await fetch(
      `${baseUrl}/api/recipes/tisane-kinkeliba/ratings`,
    );
    assert.equal(response.status, 401);
    assert.equal(database.ratings.size, 0);
  });
});

test("ratings accept only culinary scores from 1 to 5 and reject free text", async () => {
  const database = createRatingsDatabase();
  await withRatingsApp(database, async (baseUrl) => {
    for (const body of [
      { taste: 0, preparationEase: 4 },
      { taste: 6, preparationEase: 4 },
      { taste: 4, preparationEase: 3, healthClaim: "soigne tout" },
      { taste: "5", preparationEase: 4 },
    ]) {
      const response = await fetch(
        `${baseUrl}/api/recipes/tisane-kinkeliba/ratings`,
        { method: "PUT", headers: headersFor(1), body: JSON.stringify(body) },
      );
      assert.equal(response.status, 400);
    }

    assert.equal(database.ratings.size, 0);
  });
});

test("each account can update its own rating and aggregates contain no identities", async () => {
  const database = createRatingsDatabase();
  await withRatingsApp(database, async (baseUrl) => {
    const save = async (userId, taste, preparationEase) => {
      const response = await fetch(
        `${baseUrl}/api/recipes/tisane-kinkeliba/ratings`,
        {
          method: "PUT",
          headers: headersFor(userId),
          body: JSON.stringify({ taste, preparationEase }),
        },
      );
      assert.equal(response.status, 200);
      assert.match(response.headers.get("cache-control") ?? "", /private/);
      return response.json();
    };

    const first = await save(1, 5, 4);
    assert.deepEqual(first, {
      tasteAverage: 5,
      preparationEaseAverage: 4,
      ratingCount: 1,
      myRating: { taste: 5, preparationEase: 4 },
    });

    const updated = await save(1, 3, 2);
    assert.equal(updated.ratingCount, 1);
    assert.deepEqual(updated.myRating, { taste: 3, preparationEase: 2 });
    assert.equal(database.ratings.size, 1);

    const fromSecondAccount = await save(2, 5, 4);
    assert.equal(fromSecondAccount.ratingCount, 2);
    assert.equal(fromSecondAccount.tasteAverage, 4);
    assert.equal(fromSecondAccount.preparationEaseAverage, 3);
    assert.deepEqual(fromSecondAccount.myRating, { taste: 5, preparationEase: 4 });
    assert.equal("userId" in fromSecondAccount, false);

    const readByFirstAccount = await fetch(
      `${baseUrl}/api/recipes/tisane-kinkeliba/ratings`,
      { headers: headersFor(1) },
    );
    assert.equal(readByFirstAccount.status, 200);
    assert.deepEqual(await readByFirstAccount.json(), {
      tasteAverage: 4,
      preparationEaseAverage: 3,
      ratingCount: 2,
      myRating: { taste: 3, preparationEase: 2 },
    });
  });
});

test("unknown recipes are rejected without creating rating rows", async () => {
  const database = createRatingsDatabase();
  await withRatingsApp(database, async (baseUrl) => {
    const response = await fetch(
      `${baseUrl}/api/recipes/unknown-recipe/ratings`,
      {
        method: "PUT",
        headers: headersFor(1),
        body: JSON.stringify({ taste: 5, preparationEase: 5 }),
      },
    );
    assert.equal(response.status, 400);
    assert.equal(database.ratings.size, 0);
  });
});
