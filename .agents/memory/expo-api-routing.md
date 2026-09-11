---
name: Expo/API routing
description: Keep native and Expo Go bundles pointed at the API service rather than the mobile host
---

The API base URL embedded in the mobile release configuration must take priority over a generic Expo domain fallback. The Expo Go/mobile host can serve the bundle while `/api` on that host is routed elsewhere or unavailable.

**Why:** A production bundle built with the mobile host as `EXPO_PUBLIC_DOMAIN` reached the mobile service, which returned `502` for `/api/healthz`, while the explicitly configured API domain was ready.

**How to apply:** Keep `EXPO_PUBLIC_API_BASE_URL` as the highest-priority override, then use the release `extra.apiBaseUrl`; only derive `/api` from the Expo domain for development when no API release URL is available.