# German Student Portfolio

Private B2B portfolio and track-record workspace for a German language institute to share verified student readiness with placement partners.

## Run & Operate

- `pnpm install` — install all workspace dependencies
- `pnpm --filter @workspace/german-student-portfolio run dev` — run the web preview (workflow port 20533)
- `pnpm --filter @workspace/api-server run dev` — run the API server (workflow port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/german-student-portfolio run build` — build the web artifact
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `DATABASE_URL` — Postgres connection string for the database-backed run; the app can fall back to its in-memory demo store when it is absent

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/german-student-portfolio/src/` — React pages, shared shell, forms, and theme.
- `artifacts/api-server/src/routes/` — Express auth, student CRUD, dashboard summary, and editable landing content routes.
- `lib/api-spec/openapi.yaml` — source of truth for generated API client and validation schemas.
- `lib/db/src/schema/portfolio.ts` — PostgreSQL/Drizzle tables for admins, sessions, and students.

## Architecture decisions

- Admin access uses email/password with server-side scrypt password hashes and database-backed, httpOnly sessions.
- Student evidence stores profile/media/certificate references as URLs so large media files do not enter PostgreSQL.
- Student level progress is retained as a JSON history and automatically appends a milestone when the level changes.
- Dashboard metrics are calculated from the same student records used by the catalog to keep the overview consistent.

## Product

- Private admin login for the course team.
- Internal landing page with database-backed copy and calls to action managed by admins.
- Overview of total learners, German level composition, placement readiness, and cohort success.
- Searchable student catalog with level/status/cohort filters.
- Detailed student evidence pages for speaking video, certificates, level history, and placement details.
- Admin create/edit/delete workflows for student records.
- Admin content editor for the internal landing page.

## User preferences

- The user requested ReactJS + ExpressJS + PostgreSQL, with admin email/password login only and no Clerk or Google login.
- The visual direction is clean, modern, elegant, and centered on white and blue.

## Gotchas

- The demo admin is `admin@sprachraum.de` with password `Demo1234!`; replace it before production use.
- The web artifact and API server are separate managed workflows and both must be running for the preview to load dynamic content.
- The web workflow proxies `/api` requests to the API workflow on port 8080 during development.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
