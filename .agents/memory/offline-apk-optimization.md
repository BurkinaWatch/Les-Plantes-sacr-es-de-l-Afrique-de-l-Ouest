---
name: Offline APK optimization
description: Preserve offline images, pixel fidelity, device compatibility and startup when reducing Android downloads.
---

Keep catalogue illustrations embedded in the app rather than replacing them with remote URLs. Prefer lossless media conversion with decoded RGBA equality checks. Keep the original PNG masters available for repeatable conversion; Metro only packages referenced assets.

**Why:** The catalogue is explicitly required to work offline. Removing architectures would reduce compatibility, while lossy conversion or remote images would trade away content quality or offline access.

**How to apply:** Prefer a universal APK with compressed native libraries when sharing a single download. Compression reduces the download but Android must extract native libraries at installation, so it does not offer the same installed-size saving. Treat architecture-specific APKs and R8 shrinking as separate compatibility decisions. Verify every registered local image by content hash inside the final APK, preserve the registered signer, and increment Android's version code for updates. Do not change startup readiness gates as part of size work.
