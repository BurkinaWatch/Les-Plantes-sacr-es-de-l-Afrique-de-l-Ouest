---
name: GitHub connector sync limits
description: Managed GitHub write constraints and the distinction between API OAuth and local Git push authentication
---

The managed GitHub connection is suitable for reading repository refs and trees and for writing ordinary repository files, but workflow paths under `.github` may be blocked by the proxy's Cloudflare layer. The GraphQL `CreateCommitOnBranch` mutation and Git Database tree creation may also be unavailable even when ordinary file writes work.

**Why:** A non-forced synchronization can therefore complete most of a branch while leaving GitHub Actions workflows behind, and automated workspace reconciliation may temporarily start a conflicting rebase.

**How to apply:** Before attempting a large sync, verify write access for the exact path class needed, keep the local branch clean, avoid force pushes, and verify workflow paths separately after normal files are synchronized.

The GitHub connector's OAuth identity and Replit's Git Providers credential for local Git transport are separate. Connector API permissions, even admin/push access, do not prove that `git push` is authenticated. A public repository can fetch anonymously while pushes still fail with an invalid-token error.

**Why:** Reconnecting Git Providers and refreshing the workspace may still leave the shell Git credential rejected, even when the separate GitHub connector can read the repository and reports write permission.

**How to apply:** On a push authentication failure, preserve the local commits, reconnect GitHub under Account Settings → Git Providers, refresh the workspace, and retry once. If it still fails, treat it as a Replit Git-provider authentication issue; do not rewrite history or ask the user to paste a token.