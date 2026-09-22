import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import { usersTable } from "./users";

export const subscriptionPlansTable = pgTable(
  "subscription_plans",
  {
    id: serial("id").primaryKey(),
    code: text("code").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    amount: numeric("amount", { precision: 18, scale: 2 }),
    currency: text("currency"),
    period: text("period").notNull(),
    active: boolean("active").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    codeUnique: uniqueIndex("subscription_plans_code_unique").on(table.code),
  }),
);

export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  planId: integer("plan_id")
    .notNull()
    .references(() => subscriptionPlansTable.id),
  provider: text("provider").notNull(),
  period: text("period").notNull(),
  status: text("status").notNull(),
  startsAt: timestamp("starts_at"),
  expiresAt: timestamp("expires_at"),
  providerCheckoutId: text("provider_checkout_id"),
  providerTransactionId: text("provider_transaction_id"),
  providerReference: text("provider_reference"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const paymentAttemptsTable = pgTable("payment_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  subscriptionId: integer("subscription_id")
    .notNull()
    .references(() => subscriptionsTable.id),
  provider: text("provider").notNull(),
  providerCheckoutId: text("provider_checkout_id"),
  providerTransactionId: text("provider_transaction_id"),
  providerReference: text("provider_reference"),
  status: text("status").notNull(),
  idempotencyKey: text("idempotency_key"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const paymentEventsTable = pgTable(
  "payment_events",
  {
    id: serial("id").primaryKey(),
    provider: text("provider").notNull(),
    eventType: text("event_type").notNull(),
    providerTransactionId: text("provider_transaction_id").notNull(),
    providerReference: text("provider_reference"),
    payloadHash: text("payload_hash").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
    processingStatus: text("processing_status").notNull(),
    processingError: text("processing_error"),
    receivedAt: timestamp("received_at").defaultNow().notNull(),
    processedAt: timestamp("processed_at"),
  },
  (table) => ({
    eventUnique: uniqueIndex("payment_events_provider_event_transaction_unique").on(
      table.provider,
      table.eventType,
      table.providerTransactionId,
    ),
  }),
);

export const insertSubscriptionPlanSchema = createInsertSchema(
  subscriptionPlansTable,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SubscriptionPlan = typeof subscriptionPlansTable.$inferSelect;
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type Subscription = typeof subscriptionsTable.$inferSelect;
export type PaymentAttempt = typeof paymentAttemptsTable.$inferSelect;
export type PaymentEvent = typeof paymentEventsTable.$inferSelect;