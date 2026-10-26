---
name: Expo/API routing
description: Keep native and Expo Go bundles pointed at the API service rather than the mobile host
---

The API base URL embedded in the mobile release configuration must take priority over a generic Expo domain fallback. The Expo Go/mobile host can serve the bundle while `/api` on that host is routed elsewhere or unavailable.

**Why:** A production bundle built with the mobile host as `EXPO_PUBLIC_DOMAIN` reached the mobile service, which returned `502` for `/api/healthz`, while the explicitly configured API domain was ready.

**How to apply:** For native bundles, keep `EXPO_PUBLIC_API_BASE_URL` as the highest-priority override, then use the release `extra.apiBaseUrl`. Do not route native requests through the Expo bundle host.

For production API calls, Expo Go's native networking is not subject to browser CORS. Replit's browser-based Expo preview is, so it may be blocked when the Railway API allowlist excludes the preview origin.

**Why:** The production API correctly rejected a browser request from the temporary Replit preview origin even though the same API host was reachable; adding broad CORS access would unnecessarily expose the production API to other websites.

**How to apply:** In a Replit web development preview, prefer its development domain over the release API URL so the request goes through the local API proxy; keep this override limited to web + development builds. Native Expo Go continues using its explicit production API URL. Prefer Expo Go for production tests; only allowlist the exact preview origin when production API browser testing is specifically required.

API clients must preserve the `/api/` route prefix even when the configured API base URL is normalized to the host root. A missing prefix on the Expo web preview can reach the app fallback and return `200` with HTML, which the client may misreport as an unavailable API after JSON parsing fails.

**Why:** The development proxy sends `/api/*` to the API artifact, while an unprefixed route can be handled by the mobile app instead of the API.

**How to apply:** Build API endpoint URLs with exactly one `/api/` prefix, and test both a host-only base URL and a base URL already ending in `/api`.

The shared Expo development command must not globally default `EXPO_PUBLIC_API_BASE_URL` to the Replit app host. An explicit URL outranks the release API URL even on native platforms, so that default can silently route Expo Go or native bundles away from the API.

**Why:** The mobile preview returned a network error because its dev command supplied the Replit development host as an explicit API URL. The API itself was healthy, and the platform-aware resolver already correctly selected the local proxy for web and the configured API for native.

**How to apply:** Leave `EXPO_PUBLIC_API_BASE_URL` unset by default in shared dev commands. Keep `EXPO_PUBLIC_DOMAIN` available and let the resolver select the local proxy only for web development; use an explicit API override only when a developer intentionally supplies one.