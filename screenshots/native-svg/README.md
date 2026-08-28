# Native SVG visual verification

This directory contains the platform-specific golden captures for
`react-native-svg`. The runner opens the same deterministic deep-link journey
on a booted iOS simulator and/or connected Android device:

- accueil
- scanner
- scanner avec le fallback d’erreur
- dialogue sacré avec suggestions et archive
- fallback global d’erreur
- détails du fallback global

## Create or review references

The runner needs a native target; the Replit web preview is intentionally not
used because it does not exercise the native SVG view.

```sh
cd artifacts/mobile
pnpm capture:native -- --platform ios --update
pnpm capture:native -- --platform android --update
```

Review the generated files under `screenshots/native-svg/reference/` before
committing them. Once references exist, verification is strict:

```sh
cd artifacts/mobile
pnpm verify:native-svg -- --platform both
```

Verification fails when a capture is missing, a required SVG accessibility
marker is absent on Android, ImageMagick detects a visual mismatch above the
2% RMSE threshold, or native logs contain an SVG/icon/viewBox rendering
warning. The current captures are disposable and are written under
`screenshots/native-svg/current/`.