# IS 590r — Submission cover sheet (grader quick start)

Use this page **first** so document-driven evidence and the demo path are obvious. All paths are relative to this **submission repository root** (the `frantelligence-final-project-artifacts/` folder unless your instructor mounts it differently).

## Canonical documents

| What | Path |
|------|------|
| **Product Requirements (full PRD, v1.1 + Since midterm)** | [`frantelligence-prd.md`](./frantelligence-prd.md) |
| **Stub / link hub** (resolves `./prd.md` from MVP & architecture) | [`prd.md`](./prd.md) |
| **MVP & course vs commercial scope** (v1.2 — Document roles + Knowledge Builder pipeline table) | [`docs/mvp.md`](../docs/mvp.md) |
| **Project hub / bookshelf** | [`ai/context.md`](../ai/context.md) |
| **Rubric narrative (PRD traceability, AI iteration, Casey/Jason, logging, demo)** | [`is590r-rubric-evidence.md`](./is590r-rubric-evidence.md) |
| **Living change log (plan ↔ code)** | [`../ai/changelog.md`](../ai/changelog.md) |
| **Knowledge Builder feature plan + sub-plans** | [`../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md`](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md) |

## One demo script (course anchor)

**Knowledge Builder closed loop** (franchisor admin, feature flag on):

1. **What Users Are Asking** — `/knowledge-gaps` (`KnowledgeGapsDashboard.tsx`): gap questions visible; use **Generate Doc** on **one** card or **bulk** for the filtered set.  
2. **Draft** — lands in **AI Generated**; toast **Review in Editor →**.  
3. **KB editor** — `KBEditorPage`: **Source Questions** banner for KB-generated drafts; edit if needed.  
4. **Publish** — **Save & Re-index** so RAG picks up the document.

Supporting API: `POST /api/v1/kb/generate-from-gaps` (`generate_document_from_gaps`) — excerpt in [**important-backend-file-evidence/app/routers/kb.py**](../important-backend-file-evidence/app/routers/kb.py); full router in proprietary `ai-backend/`.

## CLI — structured logging & tests

From repo root:

```bash
node knowledge-agent/scripts/test.js
```

Runs `pytest tests/knowledge_builder/` and **ruff** on `app/routers/kb.py`, `app/kb_logging.py`, and legacy KB paths if present. Exit codes: **0** pass, **1** failure, **2** bad args, **127** Python missing (see script header).

## Agent / IDE guidance (not `.cursorrules`)

- [`.claude/CLAUDE.md`](../.claude/CLAUDE.md) — stack and domain behavior.  
- **Cursor rules** — In the full proprietary repo, rules live under `.cursor/rules/`. This artifact pack may omit that folder; see `SPECIAL-CASES.md` and root `CLAUDE.md`.
