---
name: PostgreSQL schema smoke metadata
description: PostgreSQL catalog array results used by the Node driver in schema checks
---

When a schema smoke query aggregates PostgreSQL catalog identifiers into an array, cast the aggregate to `text[]` before reading it through the Node PostgreSQL driver.

**Why:** Aggregating the `name` type can arrive as a PostgreSQL array literal string instead of a JavaScript array, causing a valid index or constraint signature to be reported as missing.

**How to apply:** Use `ARRAY_AGG(identifier::text ORDER BY ...)::text[]` for metadata arrays and verify the result with the same driver used by the application.