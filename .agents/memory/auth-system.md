---
name: Auth system
description: Email/password product requirement, preservation of existing accounts, and authentication constraints
---

## Architecture

- **Backend**: `artifacts/api-server/src/routes/auth.ts` — `POST /api/auth/register` and `POST /api/auth/login`
- **DB**: `lib/db/src/schema/users.ts` — `usersTable` with `id`, `username` (unique), `password_hash`, `created_at`
- **Mobile context**: `artifacts/mobile/context/AuthContext.tsx` — `AuthProvider` + `useAuth()` hook
- **Screens**: `artifacts/mobile/app/(auth)/login.tsx` and `register.tsx` with `(auth)/_layout.tsx`

## Key decisions

**Why bcrypt + JWT (not a session)?**
Mobile apps suit stateless JWT — no server-side session store needed.

**zod must be an explicit dep of api-server**: It's in the catalog but not auto-available — must add `zod` to `dependencies` in `artifacts/api-server/package.json`.

Do not introduce a development fallback signing secret or weaken validation for
older locally saved sessions; recover rejected sessions through sign-in.

**How to apply:**
- Any new protected API route should verify the JWT via middleware reading `Authorization: Bearer <token>`
- Check the current bearer-token wiring before changing authentication; the earlier placeholder-only description was stale.

Pour les corrections de comptes : « garde tout ce qui fonctionne déjà sans les
changer ». Préserver les comptes, mots de passe et parcours existants ; éviter
les changements de modèle d’authentification sans demande explicite.

**Why:** The user explicitly asked for account fixes without breaking working
features after repeated confusion about sign-in.

**How to apply:** Keep fixes targeted and verify email login plus subscription
reconnection. Never infer an email-to-username link from an email's local part:
without an explicit association, it can identify the wrong account.

## Connexion attendue

« L’utilisateur se connecte avec son adresse mail et le mot de passe », pas avec
un identifiant.

**Why:** The user explicitly corrected the previous username-only fix. A
technical field named username must not dictate the product's sign-in experience.

**How to apply:** Use email/password on login and registration. Keep legacy client
compatibility without forcing new users to choose a username. For accounts that
never stored an email, require the old account's credentials for a one-time
association; preserve the account ID, password and subscriptions rather than
creating a replacement account or guessing an email mapping.
