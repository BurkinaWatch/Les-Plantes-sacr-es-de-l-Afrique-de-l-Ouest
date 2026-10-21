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
Mobile apps suit stateless JWT — no server-side session store needed.

**bcrypt build approval**: Must be in `onlyBuiltDependencies` in `pnpm-workspace.yaml` or installs silently skip native build and fail at runtime.

**zod must be an explicit dep of api-server**: It's in the catalog but not auto-available — must add `zod` to `dependencies` in `artifacts/api-server/package.json`.

Do not introduce a development fallback signing secret or weaken validation for
older locally saved sessions; recover rejected sessions through sign-in.

**How to apply:**
- Any new protected API route should verify the JWT via middleware reading `Authorization: Bearer <token>`
- Check the current bearer-token wiring before changing authentication; the earlier placeholder-only description was stale.
