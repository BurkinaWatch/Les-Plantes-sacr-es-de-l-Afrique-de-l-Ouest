---
name: Expo config-plugin sources
description: A nested Android source folder for Expo config plugins must not be hidden by the generated native-project ignore rule.
---

Anchor the generated native Android directory ignore to the mobile artifact root. An unanchored `android/` pattern can also ignore custom source folders such as `plugins/android`, leaving local builds successful but causing EAS builds from Git to fail when config plugins read those Kotlin files.

**Why:** EAS builds use the connected repository snapshot, not ignored local files; a plugin can therefore fail at prebuild even though its source exists in the workspace.

**How to apply:** When a config plugin reads files from a nested `android` directory, verify those files are tracked with `git ls-files` and check ignore matches with `git check-ignore -v`. Keep the generated native project ignored using a root-anchored `/android/` rule.
