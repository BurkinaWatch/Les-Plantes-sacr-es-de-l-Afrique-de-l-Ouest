---
name: GitHub connector sync limits
description: Constraints encountered when synchronizing a local Git branch through the managed GitHub connection
---

The managed GitHub connection is suitable for reading repository refs and trees and for writing ordinary repository files, but workflow paths under `.github` may be blocked by the proxy's Cloudflare layer. The GraphQL `CreateCommitOnBranch` mutation and Git Database tree creation may also be unavailable even when ordinary file writes work.

**Why:** A non-forced synchronization can therefore complete most of a branch while leaving GitHub Actions workflows behind, and automated workspace reconciliation may temporarily start a conflicting rebase.

**How to apply:** Before attempting a large sync, verify write access for the exact path class needed, keep the local branch clean, avoid force pushes, and verify workflow paths separately after normal files are synchronized.