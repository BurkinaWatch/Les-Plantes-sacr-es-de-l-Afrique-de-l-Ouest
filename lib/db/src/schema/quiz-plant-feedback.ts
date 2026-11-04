import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

/**
 * Privacy-preserving quiz feedback. This stores aggregate counters only:
 * no event rows, answers, account identifiers, timestamps, or free text.
 */
export const quizPlantFeedbackTable = pgTable(
  "quiz_plant_feedback",
  {
    algorithmVersion: integer("algorithm_version").notNull(),
    plantId: text("plant_id").notNull(),
    resonates: boolean("resonates").notNull(),
    voteCount: integer("vote_count").notNull().default(0),
  },
  (table) => ({
    primaryKey: primaryKey({
      columns: [table.algorithmVersion, table.plantId, table.resonates],
      name: "quiz_plant_feedback_pkey",
    }),
    versionPositive: check(
      "quiz_plant_feedback_version_positive",
      sql`${table.algorithmVersion} > 0`,
    ),
    plantIdFormat: check(
      "quiz_plant_feedback_plant_id_format",
      sql`${table.plantId} ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND char_length(${table.plantId}) <= 80`,
    ),
    voteCountNonnegative: check(
      "quiz_plant_feedback_vote_count_nonnegative",
      sql`${table.voteCount} >= 0`,
    ),
  }),
);

export type QuizPlantFeedback = typeof quizPlantFeedbackTable.$inferSelect;
