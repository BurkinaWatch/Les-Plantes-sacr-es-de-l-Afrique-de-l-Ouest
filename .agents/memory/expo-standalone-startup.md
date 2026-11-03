---
name: Expo standalone startup
description: Runtime startup constraints for Android APKs that are not visible in Expo Go or a successful EAS compile
---

Expo standalone startup must be validated separately from bundling: run Expo Doctor and resolve every native peer-dependency warning, and mount the first navigation tree without waiting on decorative splash animation, AsyncStorage, fonts, notifications, or authentication hydration. Startup readiness must use a committed initial route-screen signal as a fallback to native `onLayout`; do not require an exact router-key match that can race initial navigation.

**Why:** EAS can compile an APK and Expo Go can run JavaScript while a missing native peer dependency or an unbounded pre-navigation gate still leaves a standalone app on its native splash. On Android 9, diagnostics for v1.0.19 recorded JS runtime completion but never recorded first-screen readiness, consistent with a missing layout callback or route-key race rather than a bundling failure.

**How to apply:** Before each Android release, run `expo install --check`, Expo Doctor, and an Android export; treat any missing peer dependency as a release blocker and keep optional services behind the first render. Expose the stage and whether the first route committed in the startup diagnostic.

For production OTA delivery, use `checkAutomatically: "ON_LOAD"` with `fallbackToCacheTimeout: 0`. This starts the app immediately from its embedded or cached bundle while checking for an update in the background; a downloaded update is applied on a subsequent launch. These settings are native build-time configuration, so changing them requires a new APK and cannot be delivered to an already-installed binary by OTA.

**Why:** Checking only on error recovery leaves normal launches unable to receive routine fixes, while waiting on a network check can worsen the app's known startup reliability issue.

**How to apply:** Keep the production channel and runtime version aligned between the APK and published updates; distribute a new APK whenever the update-check policy changes.