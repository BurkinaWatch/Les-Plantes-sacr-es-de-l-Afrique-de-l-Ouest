---
name: Native startup splash
description: Startup safeguards for the Expo Android app
---

The root screen must render immediately; font loading and decorative splash animations are enhancements, not startup gates. Do not treat a splash timer as proof that navigation rendered: dismiss the launch splash only after the initial route reports layout (and the home screen reports layout when it is the initial route). If startup times out, show an explicit retry/recovery screen rather than uncovering a potentially empty navigator. Keep the intro animation itself bounded.

**Why:** On Android, a rejected or never-completing bootstrap promise or animation can leave the native launch logo visible indefinitely; hiding it on a timer alone can instead expose a blank screen without confirming that the route rendered.

**How to apply:** Keep native splash control minimal, load optional fonts in the background, render the provider/navigation tree without waiting for them, signal readiness from the actual route layout, and provide a bounded recovery path when readiness never arrives.

When changing Expo config-plugin settings or native launch images, regenerate the Android project with Expo prebuild before running Gradle; a direct Gradle build can package stale native resources even when `app.json` is current.

**Why:** A release build compiled without prebuild kept the old, undersized Android splash drawable despite the larger configured image.

**How to apply:** Run Android prebuild before each release build affected by native splash configuration, then inspect the generated splash resource before packaging.