---
name: Auth system
description: Username/password auth for the mobile app — architecture, key decisions, and environment notes
---

## Architecture

- **Backend**: `artifacts/api-server/src/routes/auth.ts` — `POST /api/auth/register` and `POST /api/auth/login`
- **DB**: `lib/db/src/schema/users.ts` — `usersTable` with `id`, `username` (unique), `password_hash`, `created_at`
- **Mobile context**: `artifacts/mobile/context/AuthContext.tsx` — `AuthProvider` + `useAuth()` hook
- **Screens**: `artifacts/mobile/app/(auth)/login.tsx` and `register.tsx` with `(auth)/_layout.tsx`
- **Guard**: `_layout.tsx` uses `useAuth()` to show `(auth)` group when logged out, `(tabs)` group when logged in

## Key decisions

**Why bcrypt + JWT (not a session)?**
Mobile apps suit stateless JWT — no server-side session store needed. 30-day expiry.

**bcrypt build approval**: Must be in `onlyBuiltDependencies` in `pnpm-workspace.yaml` or installs silently skip native build and fail at runtime.

**zod must be an explicit dep of api-server**: It's in the catalog but not auto-available — must add `zod` to `dependencies` in `artifacts/api-server/package.json`.

**JWT_SECRET**: Defaults to a hardcoded fallback string in dev. For production, set `JWT_SECRET` env var.

**How to apply:**
- Any new protected API route should verify the JWT via middleware reading `Authorization: Bearer <token>`
- The `custom-fetch.ts` in `api-client-react` has a placeholder for injecting the Bearer token — wire it up when API routes need auth
