---
name: Expo Go static manifest protocol
description: Compatibility details for serving a self-hosted production manifest to Expo Go.
---

Expo Go's SDK 54 manifest client expects the Expo Updates multipart response with `expo-protocol-version: 0` and a manifest part declared as `Content-Disposition: form-data; name="manifest"`. A response that uses protocol version 1 or `inline` can be opened from the QR code but fail during remote update download.

**Why:** Expo Go reports this failure generically as “Failed to download remote update”, which makes the QR/deep-link layer look broken even when the URL was read correctly.

**How to apply:** Keep the `/manifest` response aligned with the current Expo CLI middleware format, and test the protocol headers and multipart disposition rather than only checking HTTP 200.