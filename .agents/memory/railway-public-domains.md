---
name: Railway public domains
description: How to handle Railway service domains when deploying a client-facing API
---

Railway assigns public domains at the service/project level, and a domain belonging to another service cannot be repurposed by guessing a naming pattern.

**Why:** The only discoverable project domain may serve a different service, while plausible API subdomains can all resolve to Railway's generic 404. Embedding one without checking the API route would ship a broken client.

**How to apply:** Use authenticated Railway project access to list the API service's domain and deployment status. If that access is unavailable, keep the existing client URL unchanged and report publication as blocked instead of fabricating a domain.