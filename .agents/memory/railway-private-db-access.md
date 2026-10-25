---
name: Railway private database access
description: Replit workspace access limits for a Railway PostgreSQL URL that uses an internal Railway hostname
---

The configured Railway database URL may resolve only inside Railway's private network and return `ENOTFOUND` from the Replit workspace. Never print or persist the URL itself.

**Why:** A direct read-only production schema query from the workspace could not resolve the Railway-internal database host, while the public API remained available.

**How to apply:** For this project, use the public API readiness endpoint as the safe signal that the API completed its startup schema check. If deeper production SQL inspection is required, run it from an authorized environment inside Railway; do not substitute the Replit-managed production database.
