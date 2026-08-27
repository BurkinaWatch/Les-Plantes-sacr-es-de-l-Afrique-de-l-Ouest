---
name: EAS build constraints
description: Expo OTA and Android build prerequisites specific to this workspace
---

The imported EAS project identifier may belong to a different Expo account; the authenticated workspace account needs its own linked EAS project and remote Android keystore before building.

**Why:** EAS rejects unauthorized project metadata before a build can start, and non-interactive builds cannot generate a missing keystore. Android build quota can also stop a fully uploaded build before compilation.

**How to apply:** Verify the linked project with the active Expo account, create or link credentials through a pseudo-terminal when required, and check the account build quota before retrying a remote APK build.