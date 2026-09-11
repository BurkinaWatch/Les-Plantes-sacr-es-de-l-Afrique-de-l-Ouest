# Railway API deployment

The API service must have these runtime variables before Railway can mark the
deployment healthy:

| Variable       | Required         | Purpose                                                                                     |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| `DATABASE_URL` | Yes              | PostgreSQL connection string. Railway's `RAILWAY_DATABASE_URL` is accepted as a fallback.   |
| `JWT_SECRET`   | Yes              | Private secret used to sign and verify mobile login tokens.                                 |
| `PORT`         | Railway-provided | Port that the API listens on.                                                               |
| `GROQ_API_KEY` | Optional         | Enables plant recognition and Totem AI routes. Without it, those features stay unavailable. |

The public APK API base must point to the API service with the `/api` suffix,
for example `https://api.example.com/api`. The same service exposes
`GET /api/healthz`, which is the URL configured as Railway's healthcheck in
`railway.json`.

For the live deployment smoke check, set `API_BASE_URL` to the same API base
URL that is embedded in the APK (including `/api`). The check accepts either
that form or the service origin and normalizes the health and authenticated
route requests consistently.

The release diagnostics print the response from `GET /api/healthz` without
printing any secret or connection-string values. The report includes:

- the readiness `status` and HTTP status;
- each named readiness check, such as `database` and `jwt`;
- `missing configuration` when a required setting is absent; and
- `database unavailable` when PostgreSQL or schema verification has failed.

`pnpm --filter @workspace/mobile run verify:public-deployment` uses
`EXPO_PUBLIC_API_BASE_URL` when supplied, otherwise the API base in
`expo.extra.apiBaseUrl` from `app.json`. This keeps the diagnostic pointed at
the same API base that the mobile release uses.

## Readiness behavior

The API starts its HTTP listener before checking the database so a bad
deployment can report its cause instead of failing during module loading.

- `200` with `"status": "ready"` means `DATABASE_URL`/`RAILWAY_DATABASE_URL`
  is configured, the schema check passed, and `JWT_SECRET` is present.
- `503` with `"status": "not_ready"` identifies the missing or failed check in
  the `checks` object and includes an actionable `message`.
- Startup logs repeat the missing variable names and the exact configuration
  action without printing any secret values.

Railway will keep the deployment out of service while `/api/healthz` returns
`503`. Configure the variables above and redeploy; do not use a public route
response as evidence that the API is ready.

## PostgreSQL release check

Run the dedicated check from a shell attached to the Railway API service. The
shell must pass the connection string explicitly through `READINESS_DATABASE_URL`;
the check does not fall back to `DATABASE_URL` or `RAILWAY_DATABASE_URL`:

```sh
READINESS_DATABASE_URL="$RAILWAY_DATABASE_URL" \
  pnpm --filter @workspace/api-server run check:postgres-readiness
```

The command runs the same versioned schema migrations used at API startup, then
queries PostgreSQL's information schema to verify that both `users` and
`push_tokens` exist. It exits successfully only after the connection, migration,
schema-version, table creation, and table verification checks succeed.
Connection failures are reported as not-ready without printing the connection
string or password.

For automated pre-release coverage, run the isolated PostgreSQL smoke check:

```sh
READINESS_DATABASE_URL="$READINESS_DATABASE_URL" \
  pnpm --filter @workspace/api-server run check:postgres-schema-smoke
```

The smoke check creates the required schema, runs the reviewed reverse
migration back to version `0`, confirms that the current API rejects the
rolled-back schema, applies the migration again, and then checks field/index
drift. The repository's GitHub Actions workflow runs this against a disposable
PostgreSQL service; it never uses a production database.

The same workflow also proves that a real PostgreSQL backup can recover
representative data and the versioned schema. For every supported PostgreSQL
major version it:

1. Inserts a disposable user and push-token relationship into the migrated
   source database.
2. Creates a custom-format archive with `pg_dump`.
3. Restores that archive into a separate disposable database with
   `pg_restore`, using a login role that is explicitly
   `NOSUPERUSER`, `NOCREATEDB`, `NOCREATEROLE`, and `NOBYPASSRLS`.
4. Confirms that the `schema_migrations` version, user data, token data, and
   foreign-key relationship are present after restoration.
5. Runs the API readiness check against the restored database with that same
   non-privileged role.

The archive is created and consumed only inside the isolated GitHub Actions
job. It must never be pointed at a production database or uploaded as a CI
artifact. A successful run reports the archive size and checksum in the job
log, followed by `Backup restore verification passed`. The disposable
database itself is still created by the PostgreSQL image's administrative
role; the API role is never granted database creation or deletion privileges.
It receives only the schema and object access needed to restore the archive and
run the check. The readiness output includes `database_user`, which proves
which PostgreSQL role was active for that connection.

This is a privilege simulation, not proof about the role configured in a live
Railway project. It does not reproduce Railway's role memberships, default
privileges, extensions, network policy, or production TLS certificate chain.
Before a destructive production migration, retain the equivalent evidence from
the actual Railway database:

- the backup timestamp, source, archive format, and checksum;
- a successful restore into a separate disposable database;
- matching representative row and relationship checks;
- the effective `current_user` and `session_user`;
- the role attributes showing that the API role does not have superuser,
  database-creation, or role-creation privileges;
- `has_database_privilege`, `has_schema_privilege`, and
  `has_table_privilege` results for the operations the API performs; and
- a passing readiness check against the restored database using the same
  connection role as the service.

## Schema versions and rollback

The API records every applied migration in the PostgreSQL
`schema_migrations` table. The current API expects schema version `1`. Startup
and both PostgreSQL checks reject a database that contains a future or unknown
version, or that has not recorded the current version; the health endpoint
remains `503` until the mismatch is resolved.

Every migration definition must include a reviewed rollback strategy. A
`reverse-migration` must contain the inverse operation and describe its data
impact. A change that cannot be safely inverted must use the
`restore-backup` strategy instead; it must not pretend that deleting its
version record is a rollback. The schema smoke check exercises reverse
migrations on a disposable database, but it cannot validate restoring a
production backup.

To upgrade a database, deploy the API version that contains the next migration,
then run the readiness check from the Railway API service shell:

```sh
READINESS_DATABASE_URL="$RAILWAY_DATABASE_URL" \
  pnpm --filter @workspace/api-server run check:postgres-readiness
```

The migration is applied in a transaction and its version is recorded only
after the migration succeeds. If the command fails, inspect the reported
migration error, correct the database issue, and run it again before
publishing traffic.

There is no automatic destructive rollback. To roll back an application
release, first use a compatible API version; do not delete rows from
`schema_migrations` or manually lower its version. Before any destructive
schema change reaches production:

1. Take a database backup and confirm that it can be restored in a separate
   disposable database.
2. Review the migration's declared reverse strategy, including dropped data,
   transformed values, indexes, constraints, and compatibility with the older
   API.
3. Run the upgrade-then-rollback smoke check against a disposable database. A
   passing check proves the tested inverse restores the declared schema shape;
   it does not prove that production data can be recovered after a destructive
   operation.
4. Only then deploy the matching API version or perform the reviewed reverse
   migration. If the change is not losslessly reversible, restore the verified
   backup instead.

The current version's reverse migration drops the initial application tables.
It exists to exercise this lifecycle in the disposable smoke check and must not
be run against a live database without the separately verified backup and
rollback review described above.

If the Railway service exposes the connection as `DATABASE_URL` instead, pass
that value explicitly in the same in-network shell:

```sh
READINESS_DATABASE_URL="$DATABASE_URL" \
  pnpm --filter @workspace/api-server run check:postgres-readiness
```

On a successful in-network run, the release verification result is:

```text
PostgreSQL 16.x default (sslmode=default, database_user=<railway-role>): schema readiness passed; users and push_tokens tables are ready.
```

Run this check in Railway's service shell before publication; a local Replit
shell is not sufficient when the configured host is `*.railway.internal`.
Do not paste a connection string into logs or commit it to the repository.
