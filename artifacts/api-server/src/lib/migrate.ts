import { pool } from "@workspace/db";
import { logger } from "./logger";

export const REQUIRED_SCHEMA_TABLES = ["users", "push_tokens"] as const;
export const CURRENT_SCHEMA_VERSION = 1;

type RequiredSchemaColumn = {
  tableName: string;
  columnName: string;
  isNullable: "YES" | "NO";
  dataType: string;
  udtName: string;
  defaultRequirement?: "sequence" | "now";
};

const REQUIRED_SCHEMA_COLUMNS: readonly RequiredSchemaColumn[] = [
  {
    tableName: "users",
    columnName: "id",
    isNullable: "NO",
    dataType: "integer",
    udtName: "int4",
    defaultRequirement: "sequence",
  },
  {
    tableName: "users",
    columnName: "username",
    isNullable: "NO",
    dataType: "text",
    udtName: "text",
  },
  {
    tableName: "users",
    columnName: "password_hash",
    isNullable: "NO",
    dataType: "text",
    udtName: "text",
  },
  {
    tableName: "users",
    columnName: "created_at",
    isNullable: "NO",
    dataType: "timestamp without time zone",
    udtName: "timestamp",
    defaultRequirement: "now",
  },
  {
    tableName: "push_tokens",
    columnName: "id",
    isNullable: "NO",
    dataType: "integer",
    udtName: "int4",
    defaultRequirement: "sequence",
  },
  {
    tableName: "push_tokens",
    columnName: "user_id",
    isNullable: "YES",
    dataType: "integer",
    udtName: "int4",
  },
  {
    tableName: "push_tokens",
    columnName: "token",
    isNullable: "NO",
    dataType: "text",
    udtName: "text",
  },
  {
    tableName: "push_tokens",
    columnName: "platform",
    isNullable: "YES",
    dataType: "text",
    udtName: "text",
  },
  {
    tableName: "push_tokens",
    columnName: "created_at",
    isNullable: "NO",
    dataType: "timestamp without time zone",
    udtName: "timestamp",
    defaultRequirement: "now",
  },
  {
    tableName: "push_tokens",
    columnName: "updated_at",
    isNullable: "NO",
    dataType: "timestamp without time zone",
    udtName: "timestamp",
    defaultRequirement: "now",
  },
];

const REQUIRED_SCHEMA_CONSTRAINTS = [
  {
    tableName: "users",
    constraintType: "PRIMARY KEY",
    columns: ["id"],
  },
  {
    tableName: "users",
    constraintType: "UNIQUE",
    columns: ["username"],
  },
  {
    tableName: "push_tokens",
    constraintType: "PRIMARY KEY",
    columns: ["id"],
  },
  {
    tableName: "push_tokens",
    constraintType: "UNIQUE",
    columns: ["token"],
  },
  {
    tableName: "push_tokens",
    constraintType: "FOREIGN KEY",
    columns: ["user_id"],
    referencedTableName: "users",
    referencedColumns: ["id"],
    deleteRule: "SET NULL",
  },
] as const;

const REQUIRED_SCHEMA_INDEXES = [
  {
    indexName: "push_tokens_user_id_idx",
    tableName: "push_tokens",
    columns: ["user_id"],
  },
] as const;

type SchemaClient = {
  query<T extends Record<string, unknown>>(
    text: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }>;
  release(): void;
};

export type SchemaPool = {
  connect(): Promise<SchemaClient>;
  query<T extends Record<string, unknown>>(
    text: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }>;
};

function assertDatabaseConfigured(configuredDatabaseUrl: string | undefined) {
  if (!configuredDatabaseUrl) {
    throw new Error(
      "Database configuration is missing: set DATABASE_URL or RAILWAY_DATABASE_URL to a provisioned PostgreSQL database.",
    );
  }
}

export class IncompatibleSchemaVersionError extends Error {
  readonly appliedVersions: number[];
  readonly expectedVersion: number;

  constructor(appliedVersions: number[], expectedVersion = CURRENT_SCHEMA_VERSION) {
    super(
      `PostgreSQL schema version is incompatible: found version(s) ${appliedVersions.join(
        ", ",
      )}; expected ${expectedVersion}.`,
    );
    this.name = "IncompatibleSchemaVersionError";
    this.appliedVersions = appliedVersions;
    this.expectedVersion = expectedVersion;
  }
}

type SchemaMigration = {
  version: number;
  up: (client: SchemaClient) => Promise<void>;
};

type SchemaVersionRow = {
  version: number;
};

async function ensureSchemaObjects(client: SchemaClient): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS push_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      token TEXT NOT NULL UNIQUE,
      platform TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);

  await client.query(`
    CREATE INDEX IF NOT EXISTS push_tokens_user_id_idx ON push_tokens(user_id)
  `);
}

const SCHEMA_MIGRATIONS: readonly SchemaMigration[] = [
  {
    version: 1,
    up: ensureSchemaObjects,
  },
];

function getMigration(version: number): SchemaMigration | undefined {
  return SCHEMA_MIGRATIONS.find((migration) => migration.version === version);
}

async function readAppliedSchemaVersions(
  schemaPool: Pick<SchemaPool, "query">,
): Promise<number[]> {
  const metadataTableResult = await schemaPool.query<{
    exists: boolean;
  }>(`
    SELECT to_regclass(current_schema() || '.schema_migrations') IS NOT NULL AS exists
  `);

  if (!metadataTableResult.rows[0]?.exists) {
    throw new IncompatibleSchemaVersionError([], CURRENT_SCHEMA_VERSION);
  }

  const result = await schemaPool.query<SchemaVersionRow>(`
    SELECT version
    FROM schema_migrations
    ORDER BY version
  `);
  return result.rows.map((row) => row.version);
}

function assertCompatibleSchemaVersions(appliedVersions: number[]): void {
  const hasUnknownVersion = appliedVersions.some(
    (version) => getMigration(version) === undefined,
  );
  const hasFutureVersion = appliedVersions.some(
    (version) => version > CURRENT_SCHEMA_VERSION,
  );

  if (
    hasUnknownVersion ||
    hasFutureVersion ||
    !appliedVersions.includes(CURRENT_SCHEMA_VERSION)
  ) {
    throw new IncompatibleSchemaVersionError(appliedVersions);
  }
}

export async function ensureSchema(
  schemaPool: Pick<SchemaPool, "connect"> = pool,
  configuredDatabaseUrl: string | undefined =
    process.env.DATABASE_URL ?? process.env.RAILWAY_DATABASE_URL,
) {
  assertDatabaseConfigured(configuredDatabaseUrl);

  const client = await schemaPool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version INTEGER PRIMARY KEY,
        applied_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    await client.query("LOCK TABLE schema_migrations IN EXCLUSIVE MODE");
    const appliedVersions = await readAppliedSchemaVersions(client);
    if (appliedVersions.some((version) => version > CURRENT_SCHEMA_VERSION)) {
      throw new IncompatibleSchemaVersionError(appliedVersions);
    }

    for (const migration of SCHEMA_MIGRATIONS) {
      if (appliedVersions.includes(migration.version)) {
        continue;
      }

      await migration.up(client);
      await client.query(
        `
          INSERT INTO schema_migrations (version)
          VALUES ($1)
        `,
        [migration.version],
      );
    }

    await ensureSchemaObjects(client);
    await verifySchema(client, configuredDatabaseUrl);
    await client.query("COMMIT");
    logger.info(
      { schemaVersion: CURRENT_SCHEMA_VERSION },
      "Database schema is ready",
    );
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      logger.error({ err: rollbackError }, "Failed to roll back schema migration");
    }
    logger.error({ err }, "Failed to ensure database schema");
    throw err;
  } finally {
    client.release();
  }
}

type ColumnRow = {
  table_name: string;
  column_name: string;
  is_nullable: string;
  data_type: string;
  udt_name: string;
  column_default: string | null;
};

type ConstraintRow = {
  table_name: string;
  constraint_name: string;
  constraint_type: string;
  column_name: string | null;
  ordinal_position: number | null;
  foreign_table_name: string | null;
  foreign_column_name: string | null;
  delete_rule: string | null;
};

type IndexRow = {
  index_name: string;
  table_name: string;
  column_names: string[];
};

function sameColumns(actual: string[], expected: readonly string[]) {
  return (
    actual.length === expected.length &&
    actual.every((columnName, index) => columnName === expected[index])
  );
}

function normalizeDefaultExpression(expression: string | null): string | null {
  return expression?.replace(/\s+/g, " ").trim().toLowerCase() ?? null;
}

function hasRequiredDefault(
  column: RequiredSchemaColumn,
  actualDefault: string | null,
): boolean {
  const normalizedDefault = normalizeDefaultExpression(actualDefault);

  if (!column.defaultRequirement) {
    return true;
  }

  if (column.defaultRequirement === "sequence") {
    return normalizedDefault !== null && /^nextval\(.+::regclass\)$/.test(normalizedDefault);
  }

  return normalizedDefault === "now()";
}

function describeExpectedDefault(
  requirement: RequiredSchemaColumn["defaultRequirement"],
): string | undefined {
  if (requirement === "sequence") {
    return "sequence-generated";
  }
  if (requirement === "now") {
    return "now()";
  }
  return undefined;
}

export async function verifySchema(
  schemaPool: Pick<SchemaPool, "query"> = pool,
  configuredDatabaseUrl: string | undefined =
    process.env.DATABASE_URL ?? process.env.RAILWAY_DATABASE_URL,
) {
  assertDatabaseConfigured(configuredDatabaseUrl);

  const appliedVersions = await readAppliedSchemaVersions(schemaPool);
  assertCompatibleSchemaVersions(appliedVersions);

  const result = await schemaPool.query<{ table_name: string }>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = current_schema()
        AND table_type = 'BASE TABLE'
        AND table_name = ANY($1::text[])
    `,
    [REQUIRED_SCHEMA_TABLES],
  );

  const existingTables = new Set(result.rows.map((row) => row.table_name));
  const missingTables = REQUIRED_SCHEMA_TABLES.filter(
    (tableName) => !existingTables.has(tableName),
  );

  if (missingTables.length > 0) {
    throw new Error(
      `PostgreSQL schema verification failed: missing required table(s): ${missingTables.join(", ")}`,
    );
  }

  const columnsResult = await schemaPool.query<ColumnRow>(
    `
      SELECT table_name, column_name, is_nullable, data_type, udt_name, column_default
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = ANY($1::text[])
    `,
    [REQUIRED_SCHEMA_TABLES],
  );
  const existingColumns = new Map(
    columnsResult.rows.map((row) => [
      `${row.table_name}.${row.column_name}`,
      row,
    ]),
  );
  const missingColumns = REQUIRED_SCHEMA_COLUMNS.filter(
    (column) => !existingColumns.has(`${column.tableName}.${column.columnName}`),
  ).map(
    (column) =>
      `${column.tableName}.${column.columnName}${
        column.isNullable === "NO" ? " (NOT NULL)" : ""
      }`,
  );
  const incompatibleColumns = REQUIRED_SCHEMA_COLUMNS.flatMap((column) => {
    const actual = existingColumns.get(`${column.tableName}.${column.columnName}`);
    if (!actual) {
      return [];
    }

    const differences: string[] = [];
    if (actual.is_nullable !== column.isNullable) {
      differences.push(
        `expected ${column.isNullable === "NO" ? "NOT NULL" : "NULLABLE"}, found ${
          actual.is_nullable === "NO" ? "NOT NULL" : "NULLABLE"
        }`,
      );
    }
    if (
      actual.data_type !== column.dataType ||
      actual.udt_name !== column.udtName
    ) {
      differences.push(
        `expected type ${column.dataType} (${column.udtName}), found ${actual.data_type} (${actual.udt_name})`,
      );
    }
    if (!hasRequiredDefault(column, actual.column_default)) {
      differences.push(
        `expected default ${describeExpectedDefault(column.defaultRequirement)}, found ${
          normalizeDefaultExpression(actual.column_default) ?? "none"
        }`,
      );
    }

    return differences.length > 0
      ? [`${column.tableName}.${column.columnName} (${differences.join("; ")})`]
      : [];
  });

  const constraintsResult = await schemaPool.query<ConstraintRow>(
    `
      SELECT
        tc.table_name,
        tc.constraint_name,
        tc.constraint_type,
        kcu.column_name,
        kcu.ordinal_position,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name,
        rc.delete_rule
      FROM information_schema.table_constraints AS tc
      LEFT JOIN information_schema.key_column_usage AS kcu
        ON kcu.constraint_schema = tc.constraint_schema
        AND kcu.constraint_name = tc.constraint_name
        AND kcu.table_name = tc.table_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_schema = tc.constraint_schema
        AND ccu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.referential_constraints AS rc
        ON rc.constraint_schema = tc.constraint_schema
        AND rc.constraint_name = tc.constraint_name
      WHERE tc.constraint_schema = current_schema()
        AND tc.table_name = ANY($1::text[])
        AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE', 'FOREIGN KEY')
      ORDER BY tc.table_name, tc.constraint_name, kcu.ordinal_position
    `,
    [REQUIRED_SCHEMA_TABLES],
  );
  const existingConstraints = new Map<
    string,
    {
      columns: string[];
      foreignTableName: string | null;
      foreignColumns: string[];
      deleteRule: string | null;
    }
  >();

  for (const row of constraintsResult.rows) {
    const key = `${row.table_name}.${row.constraint_name}`;
    const existing = existingConstraints.get(key) ?? {
      columns: [],
      foreignTableName: null,
      foreignColumns: [],
      deleteRule: null,
    };
    if (row.column_name) {
      existing.columns.push(row.column_name);
    }
    if (row.foreign_table_name) {
      existing.foreignTableName = row.foreign_table_name;
    }
    if (row.foreign_column_name) {
      existing.foreignColumns.push(row.foreign_column_name);
    }
    if (row.delete_rule) {
      existing.deleteRule = row.delete_rule;
    }
    existingConstraints.set(key, existing);
  }

  const missingConstraints = REQUIRED_SCHEMA_CONSTRAINTS.filter(
    (requiredConstraint) =>
      !Array.from(existingConstraints.entries()).some(
        ([constraintKey, actualConstraint]) => {
          const [tableName] = constraintKey.split(".");
          if (
            tableName !== requiredConstraint.tableName ||
            !sameColumns(actualConstraint.columns, requiredConstraint.columns)
          ) {
            return false;
          }

          const constraintName = constraintKey.slice(tableName.length + 1);
          const matchingType = constraintsResult.rows.find(
            (row) =>
              row.constraint_name === constraintName &&
              row.table_name === tableName,
          )?.constraint_type;
          if (matchingType !== requiredConstraint.constraintType) {
            return false;
          }

          if (requiredConstraint.constraintType !== "FOREIGN KEY") {
            return true;
          }

          return (
            actualConstraint.foreignTableName ===
              requiredConstraint.referencedTableName &&
            sameColumns(
              actualConstraint.foreignColumns,
              requiredConstraint.referencedColumns,
            ) &&
            actualConstraint.deleteRule === requiredConstraint.deleteRule
          );
        },
      ),
  ).map(
    (constraint) =>
      `${constraint.tableName} ${constraint.constraintType} (${constraint.columns.join(", ")})`,
  );

  const indexesResult = await schemaPool.query<IndexRow>(
    `
      SELECT
        index_class.relname AS index_name,
        table_class.relname AS table_name,
        ARRAY_AGG(attribute.attname::text ORDER BY index_column.ordinality)::text[] AS column_names
      FROM pg_catalog.pg_index AS index_definition
      JOIN pg_catalog.pg_class AS index_class
        ON index_class.oid = index_definition.indexrelid
      JOIN pg_catalog.pg_class AS table_class
        ON table_class.oid = index_definition.indrelid
      JOIN pg_catalog.pg_namespace AS schema_namespace
        ON schema_namespace.oid = table_class.relnamespace
      CROSS JOIN LATERAL unnest(index_definition.indkey) WITH ORDINALITY
        AS index_column(attnum, ordinality)
      JOIN pg_catalog.pg_attribute AS attribute
        ON attribute.attrelid = table_class.oid
        AND attribute.attnum = index_column.attnum
      WHERE schema_namespace.nspname = current_schema()
        AND index_class.relname = ANY($1::text[])
      GROUP BY index_class.relname, table_class.relname
    `,
    [REQUIRED_SCHEMA_INDEXES.map((index) => index.indexName)],
  );
  const missingIndexes = REQUIRED_SCHEMA_INDEXES.filter(
    (requiredIndex) =>
      !indexesResult.rows.some(
        (actualIndex) =>
          actualIndex.index_name === requiredIndex.indexName &&
          actualIndex.table_name === requiredIndex.tableName &&
          sameColumns(actualIndex.column_names, requiredIndex.columns),
      ),
  ).map(
    (index) =>
      `${index.indexName} on ${index.tableName}(${index.columns.join(", ")})`,
  );

  const schemaProblems = [
    missingColumns.length > 0
      ? `missing required column(s): ${missingColumns.join(", ")}`
      : undefined,
    incompatibleColumns.length > 0
      ? `incompatible required column(s): ${incompatibleColumns.join(", ")}`
      : undefined,
    missingConstraints.length > 0
      ? `missing required constraint(s): ${missingConstraints.join(", ")}`
      : undefined,
    missingIndexes.length > 0
      ? `missing required index(es): ${missingIndexes.join(", ")}`
      : undefined,
  ].filter((problem): problem is string => Boolean(problem));

  if (schemaProblems.length > 0) {
    throw new Error(
      `PostgreSQL schema verification failed: ${schemaProblems.join("; ")}`,
    );
  }
}
