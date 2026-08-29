---
name: Image parser security
description: Security status and replacement strategy for Metro's image dimension parser
---

As of August 29, 2026, the public advisories for image-size's ICNS and JXL/HEIF infinite-loop vulnerabilities marked every published version through 2.0.2 as vulnerable and listed no first patched version. A version-only override is therefore not a remediation.

**Why:** Metro uses image-size synchronously for local asset dimensions, so a replacement must keep that synchronous CommonJS API while validating bounds and offsets before advancing through untrusted image bytes.

**How to apply:** Recheck the advisories and upstream release status before future dependency changes. If no fixed release exists, keep Metro pointed at a bounded compatible replacement; do not suppress the audit with a semver-only override.