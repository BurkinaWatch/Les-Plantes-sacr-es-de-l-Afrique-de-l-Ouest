# Les Plantes Sacrées d'Afrique de l'Ouest

Application mobile Expo/React Native consacrée aux plantes et aux animaux sacrés d'Afrique de l'Ouest, avec contenus culturels, progression spirituelle, authentification et fonctionnalités IA.

## Run & Operate

- `pnpm install` — install all workspace dependencies
- `pnpm --filter @workspace/mobile run dev` — run the Expo app in the Replit preview
- `pnpm --filter @workspace/api-server run dev` — run the API server on port 8080
- `pnpm --filter @workspace/mockup-sandbox run dev` — run the component preview server on port 8081
- `pnpm run typecheck` — run the workspace TypeScript checks
- `pnpm run build` — typecheck and build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (development only)

The Replit-managed workflows are:

- `artifacts/mobile: expo` — Expo preview at `/`
- `artifacts/api-server: API Server` — API routed under `/api`
- `artifacts/mockup-sandbox: Component Preview Server` — component preview at `/__mockup`

Required runtime configuration:

- `DATABASE_URL` — provided by the Replit-managed PostgreSQL database
- `GROQ_API_KEY` — required by plant recognition and Totem chat
- `JWT_SECRET` — used to sign authentication tokens
- `JWT_SECRET` — required server secret for signing and verifying authenticated API sessions; never expose it to the mobile bundle

For the mobile preview, the dev script supplies the Replit Expo proxy and public domain variables automatically.

## Stack

- pnpm workspaces, Node.js 24, Expo SDK 54, TypeScript 5.9
- Mobile: React Native, Expo Router, React Query, AsyncStorage
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mobile` — Expo Router application and mobile data/content
- `artifacts/api-server` — Express API, authentication, AI routes and migrations
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/api-client-react` and `lib/api-zod` — generated/shared API clients and schemas
- `lib/db/src/schema` — database schema
- `artifacts/mobile/constants/colors.ts` and `artifacts/mobile/hooks/useColors.ts` — mobile theme

## Architecture decisions

- The project remains a pnpm monorepo with separate mobile, API and shared-library packages.
- The Expo app uses AsyncStorage for local session persistence and calls the Express API for server-backed features.
- Authentication uses username/password with server-issued JWTs.
- Totem chat and plant recognition use Groq; AI endpoints are protected by a shared API key.
- Replit's managed PostgreSQL connection is consumed through `DATABASE_URL`.

## Product

- Explore sacred West African plants and animals
- Read cultural knowledge, stories, recipes, quotes and articles
- Track spiritual progression and complete quizzes
- Authenticate with a username and password
- Chat with the Totem and identify plants from photos

## User preferences

No project-specific preferences recorded.

## Gotchas

- Use `pnpm`, not npm or yarn; the root preinstall script rejects other package managers.
- Keep Expo SDK-compatible package versions, especially native modules.
- The mobile workflow must use the Replit Expo domain variables supplied by its existing dev script.
- Set both AI client/server API key secrets before testing chat or plant recognition.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
