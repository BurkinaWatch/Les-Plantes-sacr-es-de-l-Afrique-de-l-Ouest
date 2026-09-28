---
name: Expo preview warm-up
description: A blank Expo web preview immediately after a workflow restart can be a capture-timing issue while Metro rebuilds.
---

After restarting an Expo workflow, wait for Metro's `Web Bundled` message before diagnosing a blank preview screenshot.

**Why:** Replit can make the preview reachable while Metro is still rebuilding its web bundle. Capturing during that interval can show a blank or white screen even though the app starts successfully; a later capture after bundling completes can render normally.

**How to apply:** When a screenshot immediately after restart is blank, check the Expo workflow logs for bundle completion and capture again before changing app or asset code.