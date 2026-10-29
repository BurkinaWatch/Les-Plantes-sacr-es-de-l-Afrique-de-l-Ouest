---
name: Android request attribution
description: Attribute backend traffic to the Android device only with evidence tying the request to that device.
---

Do not treat a backend response observed during an investigation as proof that the phone made the request. Workspace `curl` probes can appear in the same service logs and produce plausible errors such as an unauthenticated `401`.

**Why:** A subscription-status `401` was initially mistaken for a phone request, but its `curl` user agent showed it was the investigator's own unauthenticated probe.

**How to apply:** Correlate timestamp and user agent (or another reliable request marker) before claiming a device reached an endpoint. If origin remains ambiguous, use a sanitized diagnostic generated on the device.
