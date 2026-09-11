# Railway API deployment

The API service must have these runtime variables before Railway can mark the
deployment healthy:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. Railway's `RAILWAY_DATABASE_URL` is accepted as a fallback. |
| `JWT_SECRET` | Yes | Private secret used to sign and verify mobile login tokens. |
| `PORT` | Railway-provided | Port that the API listens on. |
| `GROQ_API_KEY` | Optional | Enables plant recognition and Totem AI routes. Without it, those features stay unavailable. |

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

The command runs the same schema initialization used at API startup, then
queries PostgreSQL's information schema to verify that both `users` and
`push_tokens` exist. It exits successfully only after the connection, table
creation, and table verification succeed. Connection failures are reported as
not-ready without printing the connection string or password.

For automated pre-release coverage, run the isolated PostgreSQL smoke check:

```sh
READINESS_DATABASE_URL="$READINESS_DATABASE_URL" \
  pnpm --filter @workspace/api-server run check:postgres-schema-smoke
```

The smoke check creates the required schema, removes `push_tokens` in the
temporary test database, confirms that read-only verification detects the
drift, and restores the schema before exiting. The repository's GitHub Actions
workflow runs this against a disposable PostgreSQL service; it never uses a
production database.

If the Railway service exposes the connection as `DATABASE_URL` instead, pass
that value explicitly in the same in-network shell:

```sh
READINESS_DATABASE_URL="$DATABASE_URL" \
  pnpm --filter @workspace/api-server run check:postgres-readiness
```

On a successful in-network run, the release verification result is:

```text
PostgreSQL readiness check passed: users and push_tokens tables are ready.
```

Run this check in Railway's service shell before publication; a local Replit
shell is not sufficient when the configured host is `*.railway.internal`.
Do not paste a connection string into logs or commit it to the repository.
