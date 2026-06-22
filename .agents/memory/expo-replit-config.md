---
name: Expo Replit configuration
description: Critical env var and Metro config settings for Expo web to work in Replit's proxied environment.
---

## WebSocket / HMR timeout fix

`REACT_NATIVE_PACKAGER_HOSTNAME` must be set to `$REPLIT_EXPO_DEV_DOMAIN` (not `$REPLIT_DEV_DOMAIN`).

The Expo web app runs on `*.expo.riker.replit.dev`. If the hostname is set to the plain Replit dev domain, the browser's WebSocket connection to Metro fails with "6000ms timeout exceeded".

**Correct dev script:**
```
EXPO_PACKAGER_PROXY_URL=https://$REPLIT_EXPO_DEV_DOMAIN \
EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN \
EXPO_PUBLIC_REPL_ID=$REPL_ID \
REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_EXPO_DEV_DOMAIN \
pnpm exec expo start --localhost --port $PORT
```

**Why:** `EXPO_PACKAGER_PROXY_URL` tells Expo where the packager proxy is. `REACT_NATIVE_PACKAGER_HOSTNAME` tells Metro which hostname to advertise for WebSocket connections. These must both point to the Expo dev domain, not the plain Replit dev domain.

## metro.config.js for Replit

Set `server.allowedHosts: "all"` and CORS headers via `enhanceMiddleware` to allow the proxied browser to connect:

```js
config.server = {
  ...config.server,
  allowedHosts: "all",
  enhanceMiddleware: (middleware) => (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return middleware(req, res, next);
  },
};
```

## Google Fonts / fontfaceobserver timeout

`@expo-google-fonts/*` packages fetch fonts from Google CDN at runtime. In Replit's proxied environment, this times out (fontfaceobserver shows "Xms timeout exceeded" in the error debugger). Fix: preload icon fonts (Feather, MaterialCommunityIcons) in `_layout.tsx` using `Font.loadAsync` with a `Promise.race` timeout of 3000ms and a try/catch — render the app even if fonts fail.

## expo-image-picker version compatibility

For **Expo SDK 54** (`expo@~54.0.27`), the correct version is `expo-image-picker@~17.0.11`.
- `~16.x` → SDK 53
- `~17.x` → SDK 54 ✓
- `~56.x` or later → too new, crashes with `createPermissionHook is not a function`

**Why:** Expo uses `createPermissionHook` from the `expo` package internally. Mismatched versions cause a runtime crash at module load time before any screen renders.
