---
name: Development schema push
description: Safe handling of interactive Drizzle schema-push conflicts on the managed development database.
---

**Rule:** If `drizzle-kit push` stops at a non-interactive named-schema/table prompt, do not rerun with `--force` blindly. Inspect the development schema first; use a reviewed additive DDL change only when the target object is confirmed absent. Production schema changes still go through Publish.

**Why:** A failed push can indicate ambiguous existing tables across schemas, and an unreviewed force operation may apply unrelated renames or destructive changes.

**How to apply:** Use `executeSql` in the development environment for metadata inspection, verify the exact new table/columns/constraints, and never use this workaround against production.
