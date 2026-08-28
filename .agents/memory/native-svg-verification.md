---
name: Native SVG verification
description: Limits and reliable checks for validating react-native-svg in this Expo project.
---

Native visual confirmation requires an attached Expo Go device or emulator; the Replit preview renders Expo Web and may capture the animated splash before routes become visible.

**Why:** The preview screenshot runner creates a fresh browser session and does not reliably wait through the custom splash animation, while native Hermes exports still compile and bundle the SVG implementation.

**How to apply:** Use the Expo Go QR link or a connected simulator for final visual alignment. In CI-like checks, generate both iOS and Android Hermes bundles, scan Metro logs for SVG warnings, and render the affected screens with the actual SacredIcon implementation.

Expo Web must not receive `accessible={true}` on the SVG host element; React Native Web forwards it to the DOM as a non-boolean attribute and emits a browser warning. Gate native accessibility props by platform while keeping stable native test IDs.

**Why:** The visual verification treats rendering warnings as failures, and the web preview exposed this warning even though the native accessibility marker was valid.

**How to apply:** Keep `testID` and `accessibilityLabel` stable for native runners, but pass `accessible` only on iOS/Android.