---
name: Expo standalone startup
description: Runtime startup constraints for Android APKs that are not visible in Expo Go or a successful EAS compile
---

Expo standalone startup must be validated separately from bundling: run Expo Doctor and resolve every native peer-dependency warning, and mount the first navigation tree without waiting on decorative splash animation, AsyncStorage, fonts, notifications, or authentication hydration.

**Why:** EAS can compile an APK and Expo Go can run JavaScript while a missing native peer dependency or an unbounded pre-navigation gate still leaves a standalone app on its native splash.

**How to apply:** Before each Android release, run `expo install --check`, Expo Doctor, and an Android export; treat any missing peer dependency as a release blocker and keep optional services behind the first render.