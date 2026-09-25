---
name: Expo SDK 57 setup
description: SDK 57 splash configuration and Replit-managed Expo Go sign-in constraints
---

For SDK 57, native splash-screen settings belong in the `expo-splash-screen` config plugin. The top-level `expo.splash` field is for web/PWA splash behavior and fails the SDK 57 config-schema check when used for native settings.

**Why:** Expo Doctor validates against the SDK 57 schema, even though Expo's public config resolver may still return a legacy `splash` field.

**How to apply:** Move the native image, resize mode, and background color into the splash-screen plugin options; keep their values rather than dropping the visual configuration.

When the workspace provides `REPLIT_EXPO_SESSION_SECRET`, a pre-existing `EXPO_TOKEN` can block Replit's managed `create-launch login`. Hide `EXPO_TOKEN` only from the Expo login/dev-server subprocess; do not delete or repurpose the stored credential, and never pass the Replit session secret as `EXPO_TOKEN`.

**Why:** The conflicting token prevents the managed Expo Go 57 account login, while scoped masking lets `create-launch` use the supplied short-lived session without changing other workspace operations.

**How to apply:** Use `env -u EXPO_TOKEN` for the mobile workflow's login and Expo start commands, then confirm its log says it logged into the project's managed Expo account. Expo CLI 57 ignores the old `--non-interactive` flag; `CI=1` disables reloads, so omit both when live reload is needed.

For local Gradle builds, keep the Android SDK, Android user data, and Gradle caches in ignored project-local directories rather than under `/home/runner`.

**Why:** A workspace restart discarded Android tooling installed outside the mounted project, while ignored files inside the workspace persisted.

**How to apply:** Point `ANDROID_SDK_ROOT`/`ANDROID_HOME`, `ANDROID_USER_HOME`, and `GRADLE_USER_HOME` to ignored directories under the mobile artifact, and keep generated toolchain files out of version control.