---
name: Android release ABIs
description: Preserve the Android architectures needed by the app's reported devices
---

Keep all configured release ABIs, including `armeabi-v7a`, unless real-device validation and an explicit product decision justify removing them.

**Why:** Startup diagnostics supplied for this app reported Android 9 (API 28) and `armeabi-v7a`; narrowing to arm64-only could exclude the device being investigated.

**How to apply:** Before changing ABI filters for release size, verify the target device's supported ABI and test the resulting APK on it. Keep arm64 and emulator ABIs unless the user approves a narrower distribution target.
