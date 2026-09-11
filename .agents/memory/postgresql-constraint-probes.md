---
name: PostgreSQL constraint probes
description: Keeping disposable PostgreSQL write smoke transactions usable after expected constraint failures
---

Expected uniqueness and foreign-key violations abort the current PostgreSQL transaction until it is rolled back to a savepoint. A write smoke test that intentionally checks constraints must bracket each expected failure with a savepoint, then roll back and release it before continuing with reads, updates, or cleanup.

**Why:** Without a savepoint, PostgreSQL returns `25P02` for every later statement, hiding whether the service role can complete its normal write and delete operations.

**How to apply:** In disposable API-role smoke checks, create a savepoint immediately before each expected constraint violation and restore that savepoint in the success path; keep the outer transaction available for the rest of the CRUD verification.