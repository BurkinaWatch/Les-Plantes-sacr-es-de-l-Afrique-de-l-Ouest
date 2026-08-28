# Native SVG visual verification

This directory contains the platform-specific golden captures for
`react-native-svg`. The runner opens the same deterministic deep-link journey
on a booted iOS simulator and/or connected Android device. Each platform's
reference set is indexed by `reference/manifest.json`, which records the
source commit and the six required journeys:

- accueil
- scanner
- scanner avec le fallback d’erreur
- dialogue sacré avec suggestions et archive
- fallback global d’erreur
- détails du fallback global

## Create or review references

The runner needs a native target; the Replit web preview is intentionally not
used because it does not exercise the native SVG view. A missing native target
is a validation failure, not a reason to create a placeholder image. The runner
prints the unavailable platform and its reason, then exits before writing any
capture.

```sh
cd artifacts/mobile
pnpm capture:native -- --platform ios --update
pnpm capture:native -- --platform android --update
```

Review all six generated files for each platform under
`screenshots/native-svg/reference/` on the actual simulator/device, then
change `reviewStatus` in `reference/manifest.json` from
`requires-human-review` to `approved` and commit the PNGs and manifest. The
manifest cannot be used by verification until that visual review is complete.
Once references exist, verification is strict:

```sh
cd artifacts/mobile
pnpm verify:native-svg -- --platform both
```

Verification fails when a capture is missing, a required SVG accessibility
marker is absent on Android, ImageMagick detects a visual mismatch above the
2% RMSE threshold, the versioned reference manifest is incomplete, or native
logs contain an SVG/icon/viewBox rendering warning. The current captures are
disposable and are written under `screenshots/native-svg/current/`.

## Automated native job

`.github/workflows/native-svg.yml` provisions a macOS runner with an iOS
simulator and an Android emulator. It runs the exact command below on every
push and pull request, and uploads the current report even when verification
fails:

```sh
pnpm verify:native-svg -- --platform both
```

Run the workflow manually with `update_references=true` to produce a new,
commit-specific reference candidate. The workflow publishes it as an artifact
named with the commit SHA; download and visually review it before committing
the PNGs and manifest. If the hosted runner cannot provide either native
target, the capture command fails with an explicit availability report rather
than silently passing or generating false references.
