---
name: Native startup splash
description: Startup safeguards for the Expo Android app
---

The root screen must render immediately; font loading and decorative splash animations are enhancements, not startup gates. Do not treat a splash timer as proof that navigation rendered: dismiss the launch splash only after the initial route reports layout (and the home screen reports layout when it is the initial route). If startup times out, show an explicit retry/recovery screen rather than uncovering a potentially empty navigator. Keep the intro animation itself bounded.

**Why:** On Android, a rejected or never-completing bootstrap promise or animation can leave the native launch logo visible indefinitely; hiding it on a timer alone can instead expose a blank screen without confirming that the route rendered.

**How to apply:** Keep native splash control minimal, load optional fonts in the background, render the provider/navigation tree without waiting for them, signal readiness from the actual route layout, and provide a bounded recovery path when readiness never arrives.

The fatal startup boundary must wrap the provider tree, including `SafeAreaProvider`; its fallback must not depend on contexts or hooks from providers that may have failed.

**Why:** A boundary nested inside the provider tree cannot catch errors thrown by the root layout or an outer provider, which can leave only the native background visible.

**How to apply:** Keep a minimal, context-free fallback at the component root for fatal startup errors, while retaining richer inner boundaries for ordinary screen errors.

When changing Expo config-plugin settings or native launch images, regenerate the Android project with Expo prebuild before running Gradle; a direct Gradle build can package stale native resources even when `app.json` is current.

**Why:** A release build compiled without prebuild kept the old, undersized Android splash drawable despite the larger configured image.

**How to apply:** Run Android prebuild before each release build affected by native splash configuration, then inspect the generated splash resource before packaging.

Treat web preview, Metro export, and APK audit as build checks only—not proof that Android reached its first React Native frame. JavaScript handlers can report fatal errors only after their module is loaded; they cannot explain native crashes or failures that happen before the app root evaluates.

**Why:** A device can install a correctly signed APK and still show only the launch background or terminate before React Native mounts, while all web and static checks pass.

**How to apply:** For a device-only blank launch, capture Android Logcat or add an explicit startup-stage diagnostic build. State clearly which check was performed and do not claim a root cause until runtime evidence identifies it.