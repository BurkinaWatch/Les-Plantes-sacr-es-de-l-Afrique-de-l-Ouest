---
name: Test runner environment
description: Workspace test tooling constraints and the dependency-free approach used for TypeScript tests
---

The workspace package installer cannot add a dependency directly to an individual package when invoked from this monorepo. For focused tests, use Node's built-in test runner and compile only the needed TypeScript with the existing `tsc`; this keeps test execution isolated and avoids adding test dependencies.

**Why:** Attempting to install a test runner through the package-management helper targeted the workspace root and failed its root-dependency guard.

**How to apply:** Prefer package-local test scripts that emit disposable `.test-dist` output, then run `node --test` against mocked boundaries. Keep `.test-dist` ignored.

When compiling several source directories with `tsc --outDir`, emitted modules preserve their source folders; test imports must follow that layout (for example, `.test-dist/lib/...`). Type-only imports from `.tsx` files also require an explicit JSX mode in focused compiler commands.

**Why:** The focused mobile test command compiles source files outside the package tsconfig, so TypeScript infers a shared root and otherwise either rejects the JSX-resolved type source or emits modules at paths the Node test runner cannot resolve.

**How to apply:** Keep focused test imports aligned with the emitted source tree and pass `--jsx react-jsx` when the compile graph resolves a `.tsx` module.

For screen rendering, `react-test-renderer` can be used without Jest, but its development build must be selected before importing React or the renderer; the production build omits `act` and root inspection.

**Why:** The workspace commonly exposes `NODE_ENV=production`, which otherwise makes screen tests fail before rendering.

**How to apply:** Set `NODE_ENV` to `test` at the top of the screen test, mock native modules through Node's loader, and install renderer dependencies with a package-scoped pnpm command when the helper's root guard rejects them.

Static Expo asset registries must be loaded only after the test's Node loader mock handles
their Metro `@/assets/...` imports.

**Why:** Node cannot resolve Metro aliases outside Expo, even when the referenced PNG files
exist on disk.

**How to apply:** Install the loader hook before requiring the compiled registry, then pass
the resulting registry into the screen mock so the test exercises the real static mappings.
