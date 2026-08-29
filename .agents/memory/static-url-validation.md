---
name: Static URL validation
description: Security constraint for Node static-file servers that use WHATWG URL parsing
---

Validate the raw request target before passing it through WHATWG `URL` parsing when protecting static-file routes.

**Why:** WHATWG URL parsing normalizes encoded parent-directory segments and backslashes, so checking only the parsed pathname can turn an attempted traversal into a valid-looking index key.

**How to apply:** Decode the raw pathname once, reject null bytes, backslashes, and `..` path segments before URL normalization, then keep the index lookup as the only filesystem-serving operation.