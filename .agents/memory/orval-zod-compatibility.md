---
name: Orval Zod compatibility
description: Generated API validation schemas may use Zod 4 top-level helpers.
---

Keep the workspace Zod version compatible with the Orval Zod client output. Newer Orval output can emit top-level helpers such as `zod.email()` and `zod.int()`, which do not typecheck against Zod 3.

**Why:** Code generation can succeed while the workspace library typecheck fails if the generator and runtime validator are on different major versions.

**How to apply:** When upgrading or regenerating API clients, check the generated validator syntax and the workspace catalog together before debugging route code.