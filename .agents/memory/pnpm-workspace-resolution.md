---
name: pnpm workspace resolution
description: Replit's pnpm setup needs explicit workspace metadata and protocol ranges for local packages.
---

Replit's pnpm 10 environment does not reliably resolve local `@workspace/*` packages from only the root `workspaces` field. Keep a `pnpm-workspace.yaml` aligned with the repository's package globs and use `workspace:*` for internal package dependencies.

**Why:** Without both pieces, pnpm can try to fetch private local packages from the package registry during a fresh import.

**How to apply:** When bootstrapping a pnpm monorepo imported into Replit, check for the workspace manifest and explicit internal dependency ranges before diagnosing package installation failures.