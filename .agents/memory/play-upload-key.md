---
name: Play upload-key handling
description: Safe local Android release signing and preserving the Google Play upload key.
---

Never replace a Google Play upload keystore once it is associated with an app. Keep it paired with its password in Replit Secrets, and do not expose passwords through command arguments or logs. The installed JDK 17 `keytool` help only lists direct password arguments; do not assume it supports environment-backed password flags.

**Why:** Future Play updates must use the registered upload key. Replacing or losing it can block updates, while command arguments and logs can expose the signing password.

**How to apply:** Check for an existing keystore before generating one. Request passwords only through Replit Secrets, use a protected interactive prompt for keytool when needed, build locally with Gradle, and verify the AAB signature before delivery. Tell the owner to keep a secure backup of the keystore and password.