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
- PNG files live in `artifacts/mobile/assets/images/plants/<id>.png`.
- Generate with `generateImage`/`generateImageAsync` (outputPath must end `.png`),
  saving directly into that folder. Consistent style: naturalistic botanical
  illustration, warm West African savanna palette.

**Why:** A missing image registration or an id/key mismatch silently breaks the
card image with no TS error. The misspelled field name is the most common TS-error
trap when authoring entries.

## "Some plants show no image" after adding entries
Newly added static `require()` entries in `plantImages.ts` are NOT picked up by a
running Metro bundler — they appear as missing images even though the key/file are
correct. Restart the `artifacts/mobile: expo` workflow (it runs with `--clear`) to
rebuild the asset map. Before assuming a real bug, verify ids↔keys↔files all match
(they did: 77/77) — if they do, it is a cache/build staleness issue, not code.

## Plant image framing
Home featured cards use full-bleed imagery with the name and description overlaid
directly on the picture; keep the caption transparent and use only a subtle lower
gradient and text shadow for contrast. For detail heroes, use `contain` when the
goal is to show the full source illustration.

**Why:** The owner explicitly chose the reference style: images fill each card and
text sits on top without a solid caption band.

**How to apply:** Use `cover` on the home card background and keep its text overlay
transparent; reserve `contain` for views whose purpose is to show the whole image.

## Note on type-checking
`npx tsc --noEmit` in artifacts/mobile reports PRE-EXISTING errors unrelated to data
(`_layout.tsx`, `progression-spirituelle.tsx`, `CategoryFilter.tsx`). Expo bundles
via Babel, so these don't block the app. Don't chase them when only editing data.
