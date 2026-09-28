---
name: plant-dataset
description: Conventions for adding plants to the West African plants mobile app dataset
---

# Plant dataset (artifacts/mobile)

The app's data lives in `artifacts/mobile/data/animals.ts` as `PLANTS: Plante[]`
(the "animal" naming is legacy — the product is about plants).

## Rules when adding a plant
- Append new entries BEFORE the closing `];` of the `PLANTS` array.
- Every entry must satisfy the `Plante` interface — all required fields present.
  **The spiritual-symbolism field is misspelled `symboliqueSpirirtuelle`** (note the
  extra "ir"). Match it exactly or TS fails.
- `categorie` ∈ Arbres Sacrés | Plantes Médicinales | Plantes Alimentaires |
  Plantes Rituelles | Herbes & Graminées | Palmiers. `element` ∈ Feu|Eau|Terre|Air.
- IDs must be unique across the whole array.

## Image registration
- Images are registered in `artifacts/mobile/constants/plantImages.ts`.
  **The map key MUST equal the plant `id`** (not a separate slug). Lookup is by id.
- PNG and JPEG files live in `artifacts/mobile/assets/images/plants/`.
- Use JPEG for opaque photographic assets to keep the mobile bundle smaller; keep
  PNG for transparency or artwork that needs lossless edges. The verifier accepts
  both formats and checks the effective `PLANTS` catalog, not just source arrays.
- Stage generated files under `attached_assets/generated_images/`, then copy them
  into the mobile asset folder and register a static `require()`. Prefer species-
  specific naturalistic imagery and the plant's actual habitat, including for
  non-West-African species in the reference catalog.

**Why:** A missing image registration or an id/key mismatch silently breaks the
card image with no TS error. The misspelled field name is the most common TS-error
trap when authoring entries. JPEG avoids adding large lossless photo assets to an
already image-heavy mobile bundle.

## "Some plants show no image" after adding entries
Newly added static `require()` entries in `plantImages.ts` are NOT picked up by a
running Metro bundler — they appear as missing images even though the key/file are
correct. Restart the `artifacts/mobile: expo` workflow (it runs with `--clear`) to
rebuild the asset map. Before assuming a real bug, verify ids↔keys↔files all match
(they did: 77/77) — if they do, it is a cache/build staleness issue, not code.

## Plant image framing
Home featured cards must show the whole source image as the sharp focal layer while
still filling the card with a blurred, low-opacity `cover` layer behind it. Keep the
name and description directly over the photo with a subtle lower gradient and text
shadow, not an opaque caption band.

**Why:** The owner wants every plant visible without leaving empty card margins, and
explicitly chose full-bleed cards with overlaid text.

**How to apply:** Layer a `contain` image above a blurred `cover` of the same source
on home cards; use a transparent caption and retain the lower gradient.

## Note on type-checking
`npx tsc --noEmit` in artifacts/mobile reports PRE-EXISTING errors unrelated to data
(`_layout.tsx`, `progression-spirituelle.tsx`, `CategoryFilter.tsx`). Expo bundles
via Babel, so these don't block the app. Don't chase them when only editing data.
