---
name: React Native Web image sizing
description: Local Image layers in React Native Web may keep asset dimensions unless their bounds are explicit.
---

For images layered inside a fixed-size card, absolute positioning alone may not constrain the rendered image to the card on React Native Web. Set explicit `width: '100%'` and `height: '100%'` along with absolute positioning; then `resizeMode="contain"` and `"cover"` behave as intended.

**Why:** A generated browser DOM showed the image wrapper retaining the PNG's intrinsic pixel dimensions, so the card clipped to the image's top-left portion and the blurred layer dominated the visible result.

**How to apply:** When a local image is incorrectly cropped or its overlapping layer is invisible on web, inspect the rendered element dimensions before changing z-index or opacity. Constrain both image layers to their container and verify a mobile-size screenshot.