---
name: Native startup splash
description: Startup safeguards for the Expo Android app
---

The root screen must render immediately; font loading and decorative splash animations are enhancements, not startup gates. A custom splash animation must also have a bounded fallback.

**Why:** On Android, a rejected or never-completing bootstrap promise or animation can leave the native launch logo visible indefinitely, with no useful in-app error surface.

**How to apply:** Keep native splash control minimal, load optional fonts in the background, render the provider/navigation tree without waiting for them, and use a short fallback before revealing the first route.