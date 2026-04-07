# AI session context (bookshelf)

> **Last updated:** April 6, 2026. New session: read this file top to bottom, then open docs tied to your task.

This repository is a **submission artifact pack** for a capstone: the full Frantelligence codebase is proprietary and not included. Use **`SPECIAL-CASES.md`** at the repo root to see how rubric evidence maps without that code.

---

## Product and grading

**[docs/prd.md](../docs/prd.md)** — Stub pointing at the immutable PRD; use for stable `./prd.md` links from MVP.

**[aidocs/frantelligence-prd.md](../aidocs/frantelligence-prd.md)** — Full product requirements (platform + positioning); **Since midterm** section shows document evolution without a full rewrite.

**[docs/mvp.md](../docs/mvp.md)** — Defines commercial MVP vs **IS 590r course anchor** (Knowledge Builder: gap → generate → review → publish); includes demo-oriented pipeline table.

**[aidocs/is590r-rubric-evidence.md](../aidocs/is590r-rubric-evidence.md)** — Single narrative mapping Casey's technical rubric and Jason's product rubric to files, iterations, logging, and demo script.

**[aidocs/IS590R-submission-readme.md](../aidocs/IS590R-submission-readme.md)** — Grader quick start: canonical paths, one demo script, CLI test command.

**[README.md](../README.md)** — Project overview, navigation for graders, rubric quick-evidence checklist, acknowledged gaps.

**[SPECIAL-CASES.md](../SPECIAL-CASES.md)** — How proprietary-code constraints affect each rubric area and what substitute evidence is provided.

---

## Technical reference (aidocs)

**[aidocs/architecture.md](../aidocs/architecture.md)** — Stack, multi-tenant model, frontend/backend/edge layout, RAG and document pipelines; use when reasoning about system design or integration points.

**[aidocs/coding-style.md](../aidocs/coding-style.md)** — TypeScript/React, Python/FastAPI, DB, API, testing, and git conventions; use before editing or reviewing code style.

---

## Plans, change history, research

**[ai/changelog.md](./changelog.md)** — Index into dated changelog slices and short note on how to extend the log.

**[ai/changelogs/](./changelogs/)** — Dated archive entries (e.g. Feb 17 planning burst, Apr 6 rubric pass); use to show non–one-shot evolution.

**[ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md](./roadmaps/2026-02-17-gap-auto-doc-feature-plan.md)** — Knowledge Builder master plan with sub-plan status (1–3 built, 4 planned).

**[ai/roadmaps/2026-02-17-gap-auto-doc-01-gap-detection.md](./roadmaps/2026-02-17-gap-auto-doc-01-gap-detection.md)** — Gap detection and “What Users Are Asking” dashboard; checklist shows what shipped.

**[ai/roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md](./roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md)** — `POST /api/v1/kb/generate-from-gaps` and dashboard actions; checklist aligned to implementation.

**[ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md](./roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md)** — KB editor source banner and publish path; checklist for editor integration.

**[ai/roadmaps/2026-04-01-gap-auto-doc-04-context-pipeline.md](./roadmaps/2026-04-01-gap-auto-doc-04-context-pipeline.md)** — Planned enrichment (KB + tickets + chat + expert + contradiction check); not required for the closed loop demo.

**[ai/guides/frantelligence-market-research.md](./guides/frantelligence-market-research.md)** — Pointer to PRD §3 for TAM and methodology note; use for market context without duplicating tables.

**[ai/guides/external/gapAutoDoc_perplexity.md](./guides/external/gapAutoDoc_perplexity.md)** — Third-party research on gap-to-doc AI patterns; use for viability rationale.

**[ai/guides/external/marketResearch_perplexity.md](./guides/external/marketResearch_perplexity.md)** — Raw Perplexity industry research backing market sizing.

---

## Product design and customer evidence (docs + knowledge-agent)

**[docs/problem-statement.md](../docs/problem-statement.md)** — Problem, hypotheses, and **executed falsification tests** with outcomes (from existing materials).

**[docs/customer-research.md](../docs/customer-research.md)** — Interview notes and how feedback changed the product (per-gap vs bulk, in-app vs email-primary).

**[docs/system-diagram.md](../docs/system-diagram.md)** — Narrative evolution from midterm systems view to final feedback-loop diagram (textual; references checkpoint assets).

**[docs/success-failure-criteria.md](../docs/success-failure-criteria.md)** — Success/failure definitions and status vs reality from MVP and rubric evidence.

**[docs/competitive-analysis.md](../docs/competitive-analysis.md)** — Competitive landscape from PRD plus what building taught the team.

**[knowledge-agent/midterm/systems_design_architecture.md](../knowledge-agent/midterm/systems_design_architecture.md)** — Midterm-era Knowledge Builder systems framing (three insertion points).

**[knowledge-agent/midterm/customer-conversations.md](../knowledge-agent/midterm/customer-conversations.md)** — Dated conversational notes with franchisor stakeholders.

**[knowledge-agent/midterm/founding-hypothesis.md](../knowledge-agent/midterm/founding-hypothesis.md)** — H1–H6 structure and how each is tested.

**[knowledge-agent/midterm/development-log.md](../knowledge-agent/midterm/development-log.md)** — Chronological plan→implement narrative derived from changelogs.

---

## Backend evidence (subset)

**[important-backend-file-evidence/README.md](../important-backend-file-evidence/README.md)** — What each extracted file proves for structured logging and the test–log–fix loop.

**[important-backend-file-evidence/app/routers/kb.py](../important-backend-file-evidence/app/routers/kb.py)** — Redacted/exported KB router including `generate-from-gaps` and lazy Knowledge Builder logging import.

**[important-backend-file-evidence/tests/knowledge_builder/test_kb_structured_logging.py](../important-backend-file-evidence/tests/knowledge_builder/test_kb_structured_logging.py)** — Tests that assert JSON logging shape and route registration.

---

## AI tooling conventions (this repo)

**[CLAUDE.md](../CLAUDE.md)** — Root behavioral guidance for AI sessions and humans (commits, docs, proprietary constraint).

**[.claude/CLAUDE.md](../.claude/CLAUDE.md)** — Stack and domain cheat sheet aligned with the main Frantelligence codebase patterns.

**[.claude/skills/](../.claude/skills/)** — Optional review skills (backend hot path, component review, security audit, etc.) when deep-diving on excerpts.

---

## Behavior (planning hygiene)

- Save new roadmap files under `ai/roadmaps/` with a `YYYY-MM-DD-` prefix; cross-link related plans; avoid over-engineering language in new plans (keep scope minimal).
- After completing a roadmap phase, mark checkboxes, update `ai/changelog.md` and add or extend a dated file under `ai/changelogs/`.
