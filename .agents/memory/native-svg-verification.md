---
name: Native SVG verification
description: Limits and reliable checks for validating react-native-svg in this Expo project.
---

Native visual confirmation requires an attached Expo Go device or emulator; the Replit preview renders Expo Web and may capture the animated splash before routes become visible.

**Why:** The preview screenshot runner creates a fresh browser session and does not reliably wait through the custom splash animation, while native Hermes exports still compile and bundle the SVG implementation.

**How to apply:** Use the Expo Go QR link or a connected simulator for final visual alignment. In CI-like checks, generate both iOS and Android Hermes bundles, scan Metro logs for SVG warnings, and render the affected screens with the actual SacredIcon implementation.