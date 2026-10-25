---
name: Offline APK optimization
description: Preserve offline images, pixel fidelity, device compatibility and startup when reducing Android downloads.
---

Keep catalogue illustrations embedded in the app rather than replacing them with remote URLs. Prefer lossless media conversion. If explicit download-size work warrants lossy WebP, keep original PNG masters available and require unchanged dimensions and alpha plus a measured per-image visual-quality floor. Metro only packages referenced assets.

**Why:** The catalogue is explicitly required to work offline. Removing architectures would reduce compatibility, and unmeasured lossy conversion could degrade illustrations. A size-reduction request can justify high-quality lossy WebP when the catalogue and visual-quality checks remain intact.

**How to apply:** Keep all registered local images and supported ABIs in a universal APK. For lossy conversions, encode from retained masters and audit dimensions, alpha, and a measured quality floor before replacing assets. Verify every registered image by content hash inside the final APK, preserve the registered signer, and increment Android's version code for updates. Compression reduces the download but Android must extract native libraries at installation, so it does not offer the same installed-size saving. Treat architecture-specific APKs and R8 shrinking as separate compatibility decisions. Do not change startup readiness gates as part of size work.

Budget decisions must distinguish deliberate catalogue expansion from growth of code or native libraries. Do not freeze the number of catalogue records, require another percentage reduction on every release, or automatically rebaseline a rejected APK.

**Why:** The initial percentage saving was a one-time optimization, not a recurring target. The offline catalogue may legitimately evolve; a fixed file count would prevent new content, while unlimited automatic allowances could hide regressions.

**How to apply:** Allow bounded, measured catalogue-size changes relative to an approved reference, keep a separate allowance for the rest of the APK, and require an explained human approval when changing that reference.

For a cold, universal Android release build, pause nonessential preview workflows if the workspace is under memory pressure; restart the same workflows after packaging and audit.

**Why:** A four-ABI Gradle/Metro release build reported no host-available memory and caused a very slow local API preview request. The Android bundle completed after the preview workflows were paused, with no recorded OOM kill.

**How to apply:** Check build-process activity and memory before treating a slow Metro bundle as hung. If resource pressure is severe, temporarily stop preview services, let the release build and audit finish, then restart and verify those services before delivery.
