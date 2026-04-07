This is meant to be a CONCISE list of changes to track as we develop this project. When adding to this file, keep comments short and summarized. Always add references back to the source plan docs for each set of changes.

## 2026-02-24 (Casey compliance pass — infrastructure scaffolding)

- Created `.cursorrules` and `.cursorrules.example` at repo root — Cursor auto-reads on every prompt; points to `ai/context.md` / `aidocs/context.md` and `knowledge-agent/aiDocs/context.md`; enforces JARVIS pipeline rules and KB Agent work conventions
- Created `knowledge-agent/aiDocs/coding-style.md` — KB-specific coding standards: service class pattern, required structured logging usage, test class structure, Pydantic model conventions, feature flag enforcement; references root `aidocs/coding-style.md` for base conventions
- Created `knowledge-agent/scripts/test.js` — Node.js test runner (cross-platform); runs pytest on `ai-backend/tests/knowledge_builder/` and ruff linter; outputs JSON to stdout; exit code 0 = pass
- Created `knowledge-agent/scripts/build.js` — environment verifier; checks Python version, core pip packages, ruff, `.testEnvVars.example`, key `aidocs/` / `ai/` files; JSON output
- Created `knowledge-agent/scripts/run.sh` — shell script to start FastAPI backend with KB Agent feature enabled; supports `--reload`, `--port`; auto-sources `.testEnvVars`
- Created `knowledge-agent/.testEnvVars.example` — template for test credentials (Supabase, OpenRouter, LangFuse, Resend, KB fixture IDs); actual `.testEnvVars` is gitignored
- Created `ai-backend/app/kb_logging.py` — structured JSON logging module using structlog; exposes `get_logger()`, `log_entry()`, `log_exit()`, `log_error()`; all KB Agent services must use this instead of print/standard logging
- Added `structlog>=24.1.0` to `ai-backend/requirements.txt`
- Updated root `.gitignore` — added `.cursorrules`, `knowledge-agent/.testEnvVars`, `knowledge-agent/logs/`, `knowledge-agent/ai/guides/`
- See: `knowledge-agent/aiDocs/JARVIS-ACCOUNTABILITY.md` Parts A, C, D for the conventions these files implement

## 2026-02-17

- Created foundational project documentation suite:
  - `aidocs/frantelligence-prd.md` / `aidocs/prd.md` (stub) — product requirements
  - `docs/mvp.md` — MVP definition with tier structure, exit criteria, polish checklist, demo script
  - `aidocs/architecture.md` — technical architecture (stack, data model, pipelines, infra)
  - `ai/context.md` — AI bookshelf / hub (`aidocs/context.md` for grader parity in submission pack)
- Created high-level project plan: `ai/roadmaps/2026-02-17-high-level-plan.md` (Phases 0–4)
- Created Gap Auto-Doc feature plan + 3 sub-plans: `ai/roadmaps/2026-02-17-gap-auto-doc-*.md`
- Created market research guide: `ai/guides/frantelligence-market-research.md` (from Perplexity deep research)
- Created Gap Auto-Doc viability analysis: `ai/guides/external/gapAutoDoc_perplexity.md`
- Stored raw market research: `ai/guides/external/marketResearch_perplexity.md`
- Created `cursor.md` agent guidelines

## 2026-02-17 (alignment pass)

- Fixed `.cursor/rules/frantelligence-context.mdc` — roles and visibility scopes now match PRD/architecture canonical definitions
- Updated `docs/mvp.md` — Knowledge Gaps Dashboard phasing corrected from Phase 2 to Phase 1 (detection) / Phase 2 (full agent), aligned with high-level plan and feature plan
- Updated `ai/roadmaps/2026-02-17-high-level-plan.md` — added onboarding-to-training pipeline and enhanced FranMetrics dashboards to Phase 2 (were in PRD roadmap but missing from high-level plan)
- Added target range discrepancy note to `ai/guides/frantelligence-market-research.md`

## 2026-02-17 (architecture audit)

- Updated `aidocs/architecture.md`:
  - Expanded component tree — added `auth/`, `avatar-data/`, `billing/`, `invite/`, `market-insights/` directories and `settings/` + `operations/` subdirectories
  - Expanded edge functions from ~25 to all ~100 functions across 15 categories (billing, onboarding, avatars, QuickBooks, cloud imports, etc.)
  - Documented all 11 shared edge utilities (`_shared/`)
  - Added feature flags section to frontend architecture (4 flags: franmetrics, documentEditor, sourceChunkPreview, training)
- Registered `VITE_FEATURE_TRAINING` in `src/config/environment.ts` as `config.features.training`
- Migrated all inline `import.meta.env.VITE_FEATURE_TRAINING` checks to use `config.features.training`:
  - `src/App.tsx` (2 route gates)
  - `src/pages/FranchiseeOps.tsx` (nav items)
  - `src/components/operations/operationsConfig.tsx` (2 nav configs)

## 2026-02-17 (Knowledge Builder PRD alignment pass)

- Renamed "Gap Auto-Doc" → "Knowledge Builder Agent" across all docs and feature flags:
  - `ai/context.md` — updated link label
  - `ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md` — updated title and feature flag reference
  - `ai/roadmaps/2026-02-17-gap-auto-doc-01-gap-detection.md` — updated title and flag
  - `ai/roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md` — updated title, flag, table names, and API paths
  - `ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md` — updated title, flag, table names, and API paths
- Reconciled draft document table name: `gap_draft_documents` → `knowledge_builder_suggestions` in all sub-plans (aligns with PRD schema)
- Updated API paths in sub-plans to use `/api/v1/knowledge-builder/` prefix
- `aidocs/frantelligence-prd.md` / `aidocs/prd.md` (stub) — multiple fixes:
  - Removed "Revenue Impact" and entire "Pricing & Packaging" sections (pricing handled at platform level)
  - Fixed LLM model references: GPT-4 Turbo → Claude Sonnet 4.5 via OpenRouter; GPT-3.5 Turbo → Claude Haiku
  - Fixed RLS policies: `company_id IN (...)` → `EXISTS (SELECT 1 FROM profiles p ...)` pattern with correct `company_id` scoping (matches actual migration patterns)
  - Replaced dangerous token-based RLS policy with a note that webhook updates use `service_role` key
  - Fixed appendix references: `project-overview.md` → `context.md`; `citations.py` → `orchestrator.py`; fixed `process-documents` path
  - Added TR-9 feature flag section documenting `VITE_FEATURE_KNOWLEDGE_BUILDER` and Vercel setup
- Registered `VITE_FEATURE_KNOWLEDGE_BUILDER` in `src/config/environment.ts` as `config.features.knowledgeBuilder`
- Also registered `VITE_FEATURE_TRAINING` (was missing from `environment.ts`)

## 2026-02-17 (Knowledge Builder PRD cleanup pass 2)

- `aidocs/frantelligence-prd.md` / `aidocs/prd.md` (stub) additional fixes:
  - Fixed "What Makes This Possible Now" table: Refusal Detection → `orchestrator.py`; Document Style Analysis → `worker.py`
  - Added missing sections to Table of Contents (`Acceptance Criteria`, `Technical Specifications`, `Implementation Checklist`, `Launch Plan`, `Competitive Analysis`, `Go-to-Market Strategy`, `Appendix`)
  - Removed 3 remaining pricing tier references (Business Impact Metrics, Risk 6 mitigation, Launch Plan)
  - Replaced "Enable for all Professional tier customers" with explicit feature flag instruction
  - Added complete SELECT RLS policies for all 4 tables (`knowledge_builder_suggestions`, `knowledge_builder_runs`, `knowledge_builder_outcomes`); noted all INSERTs use service_role

## 2026-02-17 (Knowledge Builder MVP scope clarification)

- `aidocs/frantelligence-prd.md` / `aidocs/prd.md` (stub) — major MVP scope rewrite based on product decisions:
  - Trigger model: global "run" button → per-gap on-demand button (`Create Document` / `Update Document`)
  - Added "Update existing document" path alongside "Create new document" path throughout FR-3, FR-6, FR-7, MVP Scope
  - Added path decision logic (FR-3.0): semantic similarity ≥ 0.80 against existing KB determines Create vs Update
  - Added on-demand generation flow (FR-3.6): loading state per gap, result opens modal automatically
  - Rewrote FR-5 email: rich per-gap HTML → simple HTML digest with single "Review in App" CTA linking to dashboard
  - Added FR-5.4 email frequency: at most one email per week (TBD on exact mechanism), MVP default weekly
  - Rewrote FR-6: in-app modal is now the primary review experience; tabbed layout with diff view for Update path
  - Updated FR-7 gap table to include per-gap action button and status column
  - Removed "email-only for MVP" from deferred list; in-app modal is in scope
  - Schema: added `suggestion_type`, `target_document_id`, `target_document_patch` to `knowledge_builder_suggestions`
  - Email frequency finalized (FR-5.4): event-driven on threshold crossing, hard 7-day cooldown per company; queued gaps batch into next send when cooldown expires
  - Schema: added `last_kb_notification_sent_at` to `knowledge_builder_style_profiles` to enforce cooldown
