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