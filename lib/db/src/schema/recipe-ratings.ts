import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import { usersTable } from "./users";

export const recipeRatingsTable = pgTable(
  "recipe_ratings",
  {
    recipeId: text("recipe_id").notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    tasteScore: smallint("taste_score").notNull(),
    preparationEaseScore: smallint("preparation_ease_score").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    recipeUserUnique: uniqueIndex("recipe_ratings_recipe_user_unique").on(
      table.recipeId,
      table.userId,
    ),
    userIdIndex: index("recipe_ratings_user_id_idx").on(table.userId),
    recipeIdFormat: check(
      "recipe_ratings_recipe_id_format",
      sql`${table.recipeId} ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND char_length(${table.recipeId}) <= 80`,
    ),
    tasteScoreRange: check(
      "recipe_ratings_taste_score_range",
      sql`${table.tasteScore} BETWEEN 1 AND 5`,
    ),
    preparationEaseScoreRange: check(
      "recipe_ratings_preparation_ease_score_range",
      sql`${table.preparationEaseScore} BETWEEN 1 AND 5`,
    ),
  }),
);

export const insertRecipeRatingSchema = createInsertSchema(
  recipeRatingsTable,
).omit({
  createdAt: true,
  updatedAt: true,
});

export type RecipeRating = typeof recipeRatingsTable.$inferSelect;
export type InsertRecipeRating = z.infer<typeof insertRecipeRatingSchema>;
