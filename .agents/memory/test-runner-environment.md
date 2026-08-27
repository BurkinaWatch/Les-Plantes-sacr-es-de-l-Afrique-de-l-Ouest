---
name: Test runner environment
description: Workspace test tooling constraints and the dependency-free approach used for TypeScript tests
---

The workspace package installer cannot add a dependency directly to an individual package when invoked from this monorepo. For focused tests, use Node's built-in test runner and compile only the needed TypeScript with the existing `tsc`; this keeps test execution isolated and avoids adding test dependencies.

**Why:** Attempting to install a test runner through the package-management helper targeted the workspace root and failed its root-dependency guard.

**How to apply:** Prefer package-local test scripts that emit disposable `.test-dist` output, then run `node --test` against mocked boundaries. Keep `.test-dist` ignored.