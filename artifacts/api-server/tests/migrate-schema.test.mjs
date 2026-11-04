import assert from "node:assert/strict";
import { test } from "node:test";

import {
  REQUIRED_SCHEMA_TABLES,
  verifySchema,
} from "../.test-dist/src/lib/migrate.js";

test("accepts composite primary keys returned with repeated joined columns", async () => {
  const primaryKeyColumns = ["algorithm_version", "plant_id", "resonates"];
  const constraintRows = primaryKeyColumns.flatMap((localColumn) =>
    primaryKeyColumns.map((foreignColumn) => ({
      table_name: "quiz_plant_feedback",
      constraint_name: "quiz_plant_feedback_pkey",
      constraint_type: "PRIMARY KEY",
      column_name: localColumn,
      ordinal_position:
        primaryKeyColumns.indexOf(localColumn) + 1,
      foreign_table_name: "quiz_plant_feedback",
      foreign_column_name: foreignColumn,
      delete_rule: null,
    })),
  );

  const schemaPool = {
    async query(sql) {
      if (sql.includes("to_regclass")) {
        return { rows: [{ exists: true }] };
      }
      if (sql.includes("FROM schema_migrations")) {
        return { rows: [1, 2, 3, 4, 5, 6].map((version) => ({ version })) };
      }
      if (sql.includes("information_schema.tables")) {
        return {
          rows: REQUIRED_SCHEMA_TABLES.map((table_name) => ({ table_name })),
        };
      }
      if (sql.includes("information_schema.columns")) {
        return { rows: [] };
      }
      if (sql.includes("information_schema.table_constraints")) {
        return { rows: constraintRows };
      }
      if (sql.includes("pg_catalog.pg_index")) {
        return { rows: [] };
      }
      throw new Error(`Unexpected schema query: ${sql}`);
    },
  };

  await assert.rejects(
    verifySchema(schemaPool, "postgresql://test.invalid/app"),
    (error) => {
      assert.match(error.message, /missing required constraint\(s\)/);
      assert.doesNotMatch(
        error.message,
        /quiz_plant_feedback PRIMARY KEY \(algorithm_version, plant_id, resonates\)/,
      );
      return true;
    },
  );
});
