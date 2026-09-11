---
name: Railway PostgreSQL TLS checks
description: PostgreSQL SSL URL behavior in the Node pg driver used by Railway readiness checks
---

The Node `pg` driver currently treats `sslmode=require` as verified TLS unless the connection URL supplies a trusted CA (or explicitly opts into libpq-compatible semantics). Disposable Railway-style checks should generate an ephemeral CA and pass it through `sslrootcert` rather than disabling certificate verification.

**Why:** A readiness check that only appends `sslmode=require` can fail against a self-signed disposable PostgreSQL server or silently test a different connection mode than Railway.

**How to apply:** Configure TLS on the disposable server, include `sslmode=require`, `sslrootcert`, and a safe `application_name` in the test URL, and verify the active session through `pg_stat_ssl` without logging the URL.