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