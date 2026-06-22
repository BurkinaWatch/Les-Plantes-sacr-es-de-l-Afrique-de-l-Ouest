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

`@expo-google-fonts/*` packages fetch fonts from Google CDN at runtime. In Replit's proxied environment, this times out (fontfaceobserver shows "Xms timeout exceeded" in the error debugger). Remove the import and use system fonts instead — remove `useFonts` from `_layout.tsx`.
