---
name: React Native Web image sizing
description: Local Image layers in React Native Web may keep asset dimensions unless their bounds are explicit.
---

On React Native Web, do not rely on `aspectRatio` alone to size a local `Image`: set explicit width and height, including for logos whose height is derived from the source ratio. For images layered inside a fixed-size card, absolute positioning alone may not constrain the rendered image; set explicit `width: '100%'` and `height: '100%'` too.

**Why:** A generated browser DOM showed a layered image retaining its PNG's intrinsic dimensions, so the card clipped to its top-left portion and the blurred layer dominated. Separately, a web preview gave a logo an unexpectedly tall box until both width and ratio-derived height were explicit.

**How to apply:** When an image is incorrectly cropped, oversized, or its overlapping layer is invisible on web, inspect rendered dimensions before changing z-index or opacity. Explicitly constrain both dimensions and verify a mobile-size screenshot.