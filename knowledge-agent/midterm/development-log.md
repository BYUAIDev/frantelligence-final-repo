# Development Log — Knowledge Builder Agent

Chronological record of work completed, following the
PRD → Plan → Roadmap → Implement → Verify → Test → Log → Commit pipeline.
Derived from the historical root changelog; **IS 590r submission** uses [`ai/changelog.md`](../../ai/changelog.md) and [`ai/changelogs/`](../../ai/changelogs/).

---

## Phase 0 — Documentation & Planning
**2026-02-17**

### `docs: initialise project documentation suite`
- Created `aidocs/prd.md` (stub) / `aidocs/frantelligence-prd.md` — product requirements
- Created `docs/mvp.md` — MVP definition, tier structure, exit criteria, demo script (canonical in submission layout)
- Created `aidocs/architecture.md` — technical architecture: stack, data model, pipelines, infra
- Created `ai/context.md` — AI bookshelf / hub (submission layout); `aidocs/context.md` also exists for grader parity
- Created `cursor.md` — agent guidelines for Cursor AI sessions

### `plan: add roadmaps for high-level plan and Knowledge Builder feature`
- Created `ai/roadmaps/2026-02-17-high-level-plan.md` — Phases 0–4 high-level plan
- Created `ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md`
- Created `ai/roadmaps/2026-02-17-gap-auto-doc-01-gap-detection.md`
- Created `ai/roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md`
- Created `ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md`

### `docs: alignment pass — fix scope and roadmap inconsistencies`
- Fixed `.cursor/rules/frantelligence-context.mdc` — roles/visibility now match PRD definitions
- Updated `docs/mvp.md` — Knowledge Gaps Dashboard phasing corrected (Phase 1 detection / Phase 2 full agent)
- Updated high-level plan — added onboarding-to-training pipeline and enhanced FranMetrics to Phase 2
- Added target range discrepancy note to market research guide

### `docs: architecture audit — expand component tree and edge functions`
- Expanded `aidocs/architecture.md` with full component tree (auth, billing, invite, market-insights)
- Documented all ~100 edge functions across 15 categories
- Added feature flags section (4 flags: franmetrics, documentEditor, sourceChunkPreview, training)

### `feat: register VITE_FEATURE_TRAINING in environment config`
- Registered `VITE_FEATURE_TRAINING` in `src/config/environment.ts` as `config.features.training`
- Migrated all inline `import.meta.env` checks in `App.tsx`, `FranchiseeOps.tsx`, `operationsConfig.tsx`

---

## Phase 0 — PRD Alignment
**2026-02-17**

### `docs: rename Gap Auto-Doc → Knowledge Builder Agent across all docs`
- Updated title and feature flag references in all 4 roadmap files
- Reconciled draft table name: `gap_draft_documents` → `knowledge_builder_suggestions`
- Updated all API paths to `/api/v1/knowledge-builder/` prefix

### `fix(prd): correct LLM references, RLS policies, and appendix links`
- Replaced GPT-4 Turbo → Claude Sonnet 4.5 via OpenRouter; GPT-3.5 Turbo → Claude Haiku
- Fixed RLS policy pattern to use `EXISTS (SELECT 1 FROM profiles p ...)` scoping
- Replaced dangerous token-based RLS policy with service_role note
- Fixed appendix cross-references (`context.md`, `orchestrator.py`, `process-documents`)
- Added TR-9 feature flag section for `VITE_FEATURE_KNOWLEDGE_BUILDER`

### `feat: register VITE_FEATURE_KNOWLEDGE_BUILDER in environment config`
- Added `config.features.knowledgeBuilder` to `src/config/environment.ts`

### `fix(prd): cleanup pass 2 — TOC, pricing refs, RLS SELECT policies`
- Added missing sections to Table of Contents
- Removed 3 remaining pricing tier references
- Added complete SELECT RLS policies for all 4 KB tables
- All INSERTs confirmed to use service_role

### `fix(prd): major MVP scope rewrite — on-demand trigger model`
- Changed trigger model: global "run" button → per-gap `Create Document` / `Update Document`
- Added path decision logic (FR-3.0): semantic similarity ≥ 0.80 → Create vs Update
- Added on-demand generation flow (FR-3.6): loading state per gap, result opens modal
- Rewrote FR-5 email: rich per-gap HTML → simple digest with single "Review in App" CTA
- Added FR-5.4 email frequency: event-driven, hard 7-day cooldown per company
- Rewrote FR-6: in-app modal as primary review experience; tabbed layout with diff view
- Schema: added `suggestion_type`, `target_document_id`, `target_document_patch`

---

## Phase 0 — Infrastructure & Casey Compliance
**2026-02-24**

### `chore: add .cursorrules and .cursorrules.example`
- Created `.cursorrules` at repo root — Cursor reads on every prompt
- Points to `ai/context.md` / `aidocs/context.md` and `knowledge-agent/aiDocs/context.md`
- Enforces JARVIS pipeline rules and KB Agent work conventions
- `.cursorrules` added to `.gitignore`; `.cursorrules.example` committed as template

### `docs: add knowledge-agent/aiDocs/coding-style.md`
- KB-specific coding standards: service class pattern, structured logging, test class structure
- Pydantic model conventions, feature flag enforcement
- References root `aidocs/coding-style.md` for base conventions

### `feat(scripts): add CLI build, test, and run scripts`
- Created `knowledge-agent/scripts/build.js` — environment verifier; checks Python, pip packages, ruff, key docs; JSON output; non-zero exit on failure
- Created `knowledge-agent/scripts/test.js` — runs pytest on KB test directory and ruff linter; JSON output; exit code 0 = pass
- Created `knowledge-agent/scripts/run.sh` — starts FastAPI backend with KB feature flag; supports `--reload`, `--port`; auto-sources `.testEnvVars`

### `chore: add .testEnvVars.example`
- Template for test credentials: Supabase, OpenRouter, LangFuse, Resend, KB fixture IDs, feature flags
- Actual `.testEnvVars` added to `.gitignore`

### `feat(logging): add kb_logging.py structured logging module`
- Created `ai-backend/app/kb_logging.py` using `structlog`
- Exposes `get_logger()`, `log_entry()`, `log_exit()`, `log_error()`
- All KB Agent services use this instead of `print()` or standard `logging`
- Added `structlog>=24.1.0` to `ai-backend/requirements.txt`

### `chore: update .gitignore for KB Agent paths`
- Added `.cursorrules`, `knowledge-agent/.testEnvVars`, `knowledge-agent/logs/`, `knowledge-agent/ai/guides/`

---

## Midterm Artifacts
**2026-02-24**

### `docs(midterm): add founding hypothesis, customer analysis, and conversations`
- `midterm/founding-hypothesis.md`
- `midterm/deep_customer_analysis.md`
- `midterm/customer-conversations.md` (Rachel Bridges — Planet Fitness; Jeff Piejack — Ultimate Ninjas)
- `midterm/systems_design_architecture.md`

### `docs(midterm): add differentiation and falsification artifacts`
- `midterm/DifferentiationChart.png` — 2×2: Simple/Complicated × Siloed/Integrated
- `midterm/FalsificationGrid.png` — four-lens hypothesis pressure test
- `midterm/ArchitectureDiagram.png` — full tech stack diagram

### `docs(midterm): add product brief from team`
- `midterm/product-brief.md` — problem statement, alternative problems, falsifiability, target customer, differentiation, success criteria, failure indicators, pivot plan, customer research

### `feat(midterm): build Reveal.js slide deck`
- Created `midterm/slidedeck/index.html` — 16-slide Reveal.js presentation
- Created `midterm/slidedeck/slides.md` — plain-text content reference
- Created `midterm/slidedeck/README.md` — usage instructions and slide map
- Covers all Jason rubric areas and Casey technical process areas
