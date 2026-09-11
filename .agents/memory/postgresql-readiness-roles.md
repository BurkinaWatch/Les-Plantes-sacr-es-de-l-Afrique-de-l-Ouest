---
name: PostgreSQL readiness roles
description: Privilege behavior of readiness schema inspection for non-owner PostgreSQL roles
---

When readiness inspects `information_schema` constraints and indexes, a role with
table `SELECT` grants may still see incomplete metadata if another role owns the
tables. For a disposable restore-permission check, restore the archive as the
same non-privileged service role that runs readiness so it owns the restored
objects, while keeping database creation and deletion with a separate
administrator.

**Why:** A grant-only source-database check produced missing-constraint failures
even though the role could read the tables. The service-owned restore passed the
same readiness check and better models the migration owner used by the service.

**How to apply:** Keep the production-style TLS/readiness check separate from
the privilege simulation; create the disposable target with an administrator,
grant the service role `CONNECT` plus schema `USAGE, CREATE`, restore with that
role, and assert its role flags before running full readiness.