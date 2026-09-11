---
name: Railway public domains
description: How to handle Railway service domains when deploying a client-facing API
---

Railway assigns public domains at the service/project level, and a domain belonging to another service cannot be repurposed by guessing a naming pattern.

**Why:** The only discoverable project domain may serve a different service, while plausible API subdomains can all resolve to Railway's generic 404. Embedding one without checking the API route would ship a broken client.

**How to apply:** Use authenticated Railway project access to list the API service's domain and deployment status. If that access is unavailable, keep the existing client URL unchanged and report publication as blocked instead of fabricating a domain.

An explicit Railway PostgreSQL URL can use an internal `*.railway.internal` host
that is not resolvable from the Replit shell. A failed local DNS check is not
proof that the deployed API cannot reach its database; run the readiness check
with the same reachable URL and network context as the API service.

**Why:** The workspace may have both a reachable `DATABASE_URL` and a
Railway-scoped `RAILWAY_DATABASE_URL`; testing the latter from outside Railway
can produce `ENOTFOUND` even when API startup reports a ready schema.

**How to apply:** Keep the URL explicit and never print it. Treat the API's
`/api/healthz` readiness result and the in-network check as the deployment
evidence; keep a local DNS failure as an environment limitation.