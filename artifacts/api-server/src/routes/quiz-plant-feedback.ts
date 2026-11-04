import { Router, type RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";

export const QUIZ_FEEDBACK_ALGORITHM_VERSION = 3;

const feedbackInputSchema = z.object({
  algorithmVersion: z.literal(QUIZ_FEEDBACK_ALGORITHM_VERSION),
  plantId: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  resonates: z.boolean(),
}).strict();

type Query = (
  text: string,
  values: unknown[],
) => Promise<unknown>;

type RouterOptions = {
  query?: Query;
  submitLimiter?: RequestHandler;
};

const defaultQuery: Query = async (text, values) => {
  const { pool } = await import("@workspace/db");
  await pool.query(text, values);
};

// A shared in-memory limit avoids collecting or retaining client IP addresses.
// The device also prevents repeat submissions locally after a successful vote.
const submitLimiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  keyGenerator: () => "anonymous-quiz-plant-feedback",
  validate: { ip: false },
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop d’avis reçus. Réessayez dans une minute." },
});

export function createQuizPlantFeedbackRouter(
  options: RouterOptions = {},
): Router {
  const router = Router();
  const query = options.query ?? defaultQuery;
  const limit = options.submitLimiter ?? submitLimiter;

  router.post("/", limit, async (req, res) => {
    const parsed = feedbackInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Avis invalide. Actualisez l’application puis réessayez.",
      });
    }

    const { algorithmVersion, plantId, resonates } = parsed.data;
    await query(
      `INSERT INTO quiz_plant_feedback
         (algorithm_version, plant_id, resonates, vote_count)
       VALUES ($1, $2, $3, 1)
       ON CONFLICT (algorithm_version, plant_id, resonates)
       DO UPDATE SET vote_count = quiz_plant_feedback.vote_count + 1`,
      [algorithmVersion, plantId, resonates],
    );

    return res.status(204).end();
  });

  return router;
}

export default createQuizPlantFeedbackRouter();
