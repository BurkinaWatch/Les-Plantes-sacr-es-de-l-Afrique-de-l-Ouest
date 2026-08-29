---
name: Expo asset paths
description: Security boundary for static Expo asset collection
---

Metro can emit asset metadata with relative source paths that contain parent-directory segments when an asset lives in a workspace dependency. Those source paths are acceptable only after resolving them and confirming they remain inside the trusted workspace; the raw path must never become a public output path.

**Why:** Rejecting every parent-directory segment breaks legitimate Expo and React Navigation assets, while copying the raw path can escape the static output directory.

**How to apply:** Keep source resolution and public URL mapping separate. Derive the public directory from a stable digest or another safe identifier, and rewrite both bundles and manifests to that sanitized location.