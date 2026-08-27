---
name: Package firewall compatibility
description: Replit package firewall behavior encountered during workspace dependency installation
---

When the Replit package firewall rejects an older transitive package archive with HTTP 403, prefer the latest compatible release through the package manager rather than bypassing the firewall.

**Why:** The workspace install can fail before any service starts even when the lockfile is otherwise valid; the firewall may allow the current release while blocking the older transitive archive.

**How to apply:** Identify the parent dependency, check whether its latest compatible version still requests the blocked release, and use a narrow pnpm override only when updating the parent would cross the app's compatibility boundary.