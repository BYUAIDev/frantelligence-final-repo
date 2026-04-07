# CLAUDE.md — Behavioral guidance (submission repository)

Use this file with [`.claude/CLAUDE.md`](.claude/CLAUDE.md) (stack/domain patterns). This root document adds **submission-repo** and **proprietary-code** rules.

---

## Proprietary codebase constraint

- **Do not assume** `src/`, `ai-backend/`, or `supabase/` exist in this artifact pack unless explicitly listed in [`README.md`](README.md).
- When answering questions about **implementation**, point to **roadmaps**, **aidocs**, **`important-backend-file-evidence/`**, and **SPECIAL-CASES** language rather than inventing file paths.
- If asked to “open `KnowledgeGapsDashboard.tsx`,” note it lives in the **full** repo only; cite roadmap and rubric evidence for behavior.

---

## Documentation updates

- **PRD changes** go to [`aidocs/frantelligence-prd.md`](aidocs/frantelligence-prd.md) (preserve **Since midterm** style for grader-visible evolution).
- **MVP / course scope** goes to [`docs/mvp.md`](docs/mvp.md).
- **New planning** → dated files under [`ai/roadmaps/`](ai/roadmaps/) + entry in [`ai/changelog.md`](ai/changelog.md) + dated slice in [`ai/changelogs/`](ai/changelogs/).
- **Bookshelf** entries → update [`ai/context.md`](ai/context.md) using the established format: `**[path]** — one to two sentences`.

---

## Preferred patterns (when editing excerpted Python/TS)

- **Multi-tenant:** Every data path scoped by `company_id`; RLS patterns per [`aidocs/architecture.md`](aidocs/architecture.md).
- **Feature flags:** New user-facing UI gated at **routes/nav** via `VITE_FEATURE_*` (see `.claude/CLAUDE.md`).
- **Logging:** Structured JSON (structlog) on sensitive paths; no bare `print()` in backend code you add to evidence files.

---

## Commit conventions

Follow [`aidocs/coding-style.md`](aidocs/coding-style.md) git section:

```
type(scope): concise summary

Optional body. Wrap at ~72 chars.
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

---

## Secrets

- Never commit `.env`, `.testEnvVars`, API keys, or MCP configs with credentials.
- Use `knowledge-agent/.testEnvVars.example` as a template only.

---

## Conflict with “full repo” Cursor rules

Project-wide rules under `.cursor/rules/` may apply in the **monorepo** but **not** all files exist here. Prefer **`SPECIAL-CASES.md`** and this `CLAUDE.md` when they conflict with rules that assume the full tree.
