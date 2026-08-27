---
name: Test runner environment
description: Workspace test tooling constraints and the dependency-free approach used for TypeScript tests
---

The workspace package installer cannot add a dependency directly to an individual package when invoked from this monorepo. For focused tests, use Node's built-in test runner and compile only the needed TypeScript with the existing `tsc`; this keeps test execution isolated and avoids adding test dependencies.

**Why:** Attempting to install a test runner through the package-management helper targeted the workspace root and failed its root-dependency guard.

**How to apply:** Prefer package-local test scripts that emit disposable `.test-dist` output, then run `node --test` against mocked boundaries. Keep `.test-dist` ignored.

For screen rendering, `react-test-renderer` can be used without Jest, but its development build must be selected before importing React or the renderer; the production build omits `act` and root inspection.

**Why:** The workspace commonly exposes `NODE_ENV=production`, which otherwise makes screen tests fail before rendering.

**How to apply:** Set `NODE_ENV` to `test` at the top of the screen test, mock native modules through Node's loader, and install renderer dependencies with a package-scoped pnpm command when the helper's root guard rejects them.