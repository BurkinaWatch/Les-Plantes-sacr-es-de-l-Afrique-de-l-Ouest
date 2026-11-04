import { Router, type RequestHandler } from "express";
import { z } from "zod";

import { requireActiveUserJwt } from "../lib/auth-middleware.js";
import { createUserRateLimiter } from "../lib/rate-limit.js";

export const RECIPE_RATING_IDS = [
  "tisane-kinkeliba",
  "jus-bissap",
  "eau-moringa",
  "decoction-neem",
  "beurre-karite",
  "tisane-citronnelle",
  "preparation-tamarin",
  "sauce-lalo",
  "infusion-ecorce-baobab",
  "poudre-soumbala",
  "bain-feuilles-eucalyptus",
  "boisson-pulpe-ditakh",
  "legume-luffa-jeune",
  "boisson-fruit-marula",
  "graines-courge-grillees",
  "miyan-kuka-baobab",
  "kontomire-stew-ghana",
  "ofe-onugbu-bitterleaf",
  "dawadawa-jollof-rice",
  "fonio-sauce-legumes",
  "abenkwan-palmnut-soup",
  "egusi-soup-nigeria",
  "soupe-feuilles-manioc-liberia",
  "miyan-taushe-courge",
] as const;

const recipeIdSchema = z.enum(RECIPE_RATING_IDS);
const ratingInputSchema = z.object({
  taste: z.number().int().min(1).max(5),
  preparationEase: z.number().int().min(1).max(5),
}).strict();

type RatingSummaryRow = Record<string, unknown> & {
  rating_count: number | string;
  taste_average: number | string | null;
  preparation_ease_average: number | string | null;
  my_taste: number | string | null;
  my_preparation_ease: number | string | null;
};

type Query = (
  text: string,
  values: unknown[],
) => Promise<{ rows: Record<string, unknown>[] }>;

type RouterOptions = {
  query?: Query;
  authenticate?: RequestHandler;
  readLimiter?: RequestHandler;
  writeLimiter?: RequestHandler;
};

const defaultQuery: Query = async (text, values) => {
  const { pool } = await import("@workspace/db");
  const result = await pool.query(text, values);
  return { rows: result.rows };
};

const readLimiter = createUserRateLimiter({
  windowMs: 60_000,
  max: 60,
  message: { error: "Trop de consultations. Réessayez dans une minute." },
});

const writeLimiter = createUserRateLimiter({
  windowMs: 15 * 60_000,
  max: 5,
  message: { error: "Trop de modifications d’avis. Réessayez dans quelques minutes." },
});

function nullableScore(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const score = Number(value);
  if (!Number.isFinite(score) || score < 1 || score > 5) {
    throw new Error("The database returned an invalid recipe rating aggregate.");
  }
  return Math.round(score * 10) / 10;
}

function optionalPersonalScore(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const score = Number(value);
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    throw new Error("The database returned an invalid personal recipe rating.");
  }
  return score;
}

async function loadRatingSummary(
  query: Query,
  userId: number,
  recipeId: string,
) {
  const result = await query(
    `SELECT
       COUNT(*)::integer AS rating_count,
       ROUND(AVG(taste_score)::numeric, 1)::double precision AS taste_average,
       ROUND(AVG(preparation_ease_score)::numeric, 1)::double precision AS preparation_ease_average,
       MAX(taste_score) FILTER (WHERE user_id = $1)::integer AS my_taste,
       MAX(preparation_ease_score) FILTER (WHERE user_id = $1)::integer AS my_preparation_ease
     FROM recipe_ratings
     WHERE recipe_id = $2`,
    [userId, recipeId],
  );
  const row = result.rows[0] as RatingSummaryRow | undefined;
  if (!row) throw new Error("Recipe rating summary query returned no row.");

  const ratingCount = Number(row.rating_count);
  if (!Number.isSafeInteger(ratingCount) || ratingCount < 0) {
    throw new Error("The database returned an invalid recipe rating count.");
  }

  const taste = optionalPersonalScore(row.my_taste);
  const preparationEase = optionalPersonalScore(row.my_preparation_ease);

  return {
    tasteAverage: nullableScore(row.taste_average),
    preparationEaseAverage: nullableScore(row.preparation_ease_average),
    ratingCount,
    myRating: taste === null || preparationEase === null
      ? null
      : { taste, preparationEase },
  };
}

export function createRecipeRatingsRouter(options: RouterOptions = {}): Router {
  const router = Router();
  const query = options.query ?? defaultQuery;
  const authenticate = options.authenticate ?? requireActiveUserJwt;
  const getLimiter = options.readLimiter ?? readLimiter;
  const saveLimiter = options.writeLimiter ?? writeLimiter;

  router.get("/:recipeId/ratings", authenticate, getLimiter, async (req, res) => {
    const parsedRecipeId = recipeIdSchema.safeParse(req.params.recipeId);
    if (!parsedRecipeId.success) {
      return res.status(400).json({ error: "Recette inconnue" });
    }

    res.setHeader("Cache-Control", "private, no-store");
    const summary = await loadRatingSummary(
      query,
      req.user!.id,
      parsedRecipeId.data,
    );
    return res.status(200).json(summary);
  });

  router.put("/:recipeId/ratings", authenticate, saveLimiter, async (req, res) => {
    const parsedRecipeId = recipeIdSchema.safeParse(req.params.recipeId);
    const parsedRating = ratingInputSchema.safeParse(req.body);
    if (!parsedRecipeId.success || !parsedRating.success) {
      return res.status(400).json({
        error: "Choisissez une note de goût et une note de facilité entre 1 et 5.",
      });
    }

    const userId = req.user!.id;
    await query(
      `INSERT INTO recipe_ratings
         (recipe_id, user_id, taste_score, preparation_ease_score)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (recipe_id, user_id)
       DO UPDATE SET
         taste_score = EXCLUDED.taste_score,
         preparation_ease_score = EXCLUDED.preparation_ease_score,
         updated_at = NOW()`,
      [
        parsedRecipeId.data,
        userId,
        parsedRating.data.taste,
        parsedRating.data.preparationEase,
      ],
    );

    res.setHeader("Cache-Control", "private, no-store");
    const summary = await loadRatingSummary(
      query,
      userId,
      parsedRecipeId.data,
    );
    return res.status(200).json(summary);
  });

  return router;
}

export default createRecipeRatingsRouter();
