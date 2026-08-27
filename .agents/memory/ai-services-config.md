---
name: AI services config (chat + plant recognition)
description: How the totem chat and plant recognition AI features are wired in the mobile app + api-server
---

# AI services: totem chat & plant recognition

Both AI features live in `artifacts/api-server/src/routes/` (`chat.ts` → POST `/api/chat/totem`, `plant-recognition.ts` → POST `/api/plant-recognition`) and use the Groq SDK (`groq-sdk`).

- **Provider:** Groq, keyed by the `GROQ_API_KEY` secret. The Replit-managed AI integrations (OpenAI/Gemini/etc.) were NOT usable here because the integration onboarding requires phone verification, which failed for this user — fell back to a user-provided Groq key.
- **Lazy client init is required.** Instantiate the Groq client inside a `getGroq()` helper (throws `GROQ_API_KEY_MISSING` when the key is absent), NOT at module top level. Module-top instantiation crashes the whole api-server at startup if the key is missing (Groq SDK throws on construction). Handlers map that error to HTTP 503.
- **Both routes are auth-protected** with `requireApiKey` middleware (checks `x-api-key` header against the `CHAT_API_KEY` env var). The mobile client sends `EXPO_PUBLIC_CHAT_API_KEY` (must equal server `CHAT_API_KEY`). In dev, if `CHAT_API_KEY` is unset the middleware bypasses auth.
  - **Why:** these endpoints call a paid AI backend; leaving recognition unauthenticated exposed it to cost-amplification abuse (rate-limit-by-IP alone is weak behind shared NATs).
- **Models:** use an active model from the provider's live model list; the previously configured Llama chat and vision IDs were retired. The current shared model is `qwen/qwen3.8-27b`, which supports both text and base64 image input.
  - **Why:** provider model availability can change independently of the app, causing both user-facing AI flows to return 500 while auth still passes.
  - **How to apply:** when AI requests start returning provider `model_not_found`, query the provider's current model list before changing client auth or request schemas.
- API routes are mounted under `/api` (see `app.ts`), so the full path is `/api/chat/totem`, not `/chat/totem`.
