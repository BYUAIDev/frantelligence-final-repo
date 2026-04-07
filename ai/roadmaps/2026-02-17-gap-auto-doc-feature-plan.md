# Knowledge Builder Agent — Feature Plan

> **Created**: February 17, 2026
> **Revised**: April 6, 2026
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER`
> **Research**: [Perplexity viability analysis](../guides/external/gapAutoDoc_perplexity.md)

---

> **Engineering philosophy**: This is a clean codebase. No over-engineering, no cruft, no legacy-compatibility shims. Build the simplest thing that works at each step. If a table or endpoint isn't needed yet, don't create it.

---

## Overview

When franchisees ask KI Chat questions that the AI can't answer well, that's a signal — the knowledge base has a gap. This feature makes those gaps visible and actionable: an admin can select one or more gap questions and have the AI generate a draft KB document from them, which they then review and publish in the existing KB editor.

**The loop**: Admin sees gap questions in "What Users Are Asking" → selects one or a filtered set → AI generates a draft document → draft opens in the KB editor (`AI Generated` folder, `draft` status) → admin edits → "Save & Re-index" publishes it → AI gets smarter → fewer gaps.

**Current state (revised April 2026):** Generation and review are **in-app** (per-gap and bulk **Generate Doc**, editor + banner, **Save & Re-index**). Sub-plan 03 explicitly **does not** add email-based review for drafts — toast + editor link is the product path.

This is the data flywheel: usage feeds content, content improves answers, better answers drive more usage.

## Why this matters

- Every gap-driven doc directly reduces future support load
- Admins don't have to start from a blank page — AI does the first draft
- The system learns from what franchisees actually struggle with
- Competitors (Zendesk, Glean) are shipping versions of this — it's becoming table stakes

## Sub-Plans

| # | Sub-Plan | What It Covers | Status | Depends On |
|---|---|---|---|---|
| 1 | [Gap Detection & Tracking](./2026-02-17-gap-auto-doc-01-gap-detection.md) | How gap questions are detected and surfaced in the "What Users Are Asking" dashboard | ✅ Built | Existing KI Chat + `knowledge_gap_analysis` view |
| 2 | [AI Document Generation](./2026-02-17-gap-auto-doc-02-doc-generation.md) | Backend endpoint that takes selected question IDs, generates a draft document, and lands it in the KB editor | ✅ Built | Sub-plan 1 |
| 3 | [Editor Integration](./2026-02-17-gap-auto-doc-03-review-workflow.md) | Source questions banner in the KB editor, `AI Generated` folder, and the publish-as-approve flow | ✅ Built | Sub-plan 2 |
| 4 | [Rich Context Pipeline](./2026-04-01-gap-auto-doc-04-context-pipeline.md) | Enriches generation with KB retrieval, resolved tickets, team chat, expert content, and a post-generation contradiction check | 🔲 Planned (quality expansion — **not** required for gap→generate→review→publish) | Sub-plans 1–3 deployed |

## Implementation order

Sub-plan 1 (gap detection) is largely built. Sub-plans 2–3 (generation endpoint, dashboard buttons, editor banner, publish path) are **implemented in repo** (`kb.py` `POST /api/v1/kb/generate-from-gaps`, `KnowledgeGapsDashboard.tsx`, `KBEditorPage.tsx` source-questions banner). Sub-plan 4 is the **next** increment: richer context for drafts, not a prerequisite to demo the closed loop.

**Verified against codebase:** April 6, 2026.

## What exists today

| Component | Current State | How We Use It |
|---|---|---|
| `knowledge_gap_analysis` view | Exists — detects gaps via keyword matching in AI responses | Queried by question ID to gather context for generation |
| `knowledge_gaps` table | Exists | Aggregated gap categories — not used in the generation flow |
| `KnowledgeGapsDashboard.tsx` at `/knowledge-gaps` | Exists — "What Users Are Asking" page + **Generate Doc** (per gap + bulk) behind feature flag | Entry point for generation |
| `KBEditorPage` at `/settings/kb/edit/:documentId` | Exists — full TipTap editor with autosave, version history, publish | The review interface — no new review UI needed |
| `/kb/documents/create` endpoint | Exists in `kb.py` — creates `draft` document, returns `document_id` | Generation endpoint calls the same creation logic |
| `documents.provider_metadata` JSONB | Exists on the `documents` table | Stores `{ "origin": "knowledge-builder", "source_question_ids": [...] }` — no new table needed |
| `folders` table | Exists — `folder_path` string, unique per company | Used to upsert the `AI Generated` folder on first generation |
| `ChatCompletionService` | Exists in `ai-backend/app/services/chat_completion.py` | Powers the generation LLM call |
| `VITE_FEATURE_KNOWLEDGE_BUILDER` flag | Registered in `src/config/environment.ts` | Gates all generation UI — not yet set in Vercel |

## Key design decisions (locked)

| Decision | Chosen |
|---|---|
| Who can trigger generation | Franchisor admin only |
| Model for generation | Company's `default_chat_model` (same as KI Chat) |
| How generation is triggered | Per-gap button on individual gap card, OR bulk button for all gaps in the current filtered set |
| Single-gap confirmation | None — fires immediately |
| Bulk confirmation | Always shown — "Generate 1 document from N gap questions?" |
| Output per trigger | Always one document synthesizing all selected gap questions |
| Review interface | Existing `KBEditorPage` — no new review inbox |
| Approve mechanism | Standard "Save & Re-index" button in the KB editor |
| Draft folder | Auto-created `AI Generated` folder per company on first use |
| Emails | None |
| Separate suggestions table | None — draft is created directly in `documents` with `upload_status = 'draft'` |

## Metrics

| Metric | Definition | Target |
|---|---|---|
| Draft creation rate | % of gap questions that admins generate a doc for within 7 days | Baseline TBD |
| Draft publish rate | % of AI-generated drafts that get published via "Save & Re-index" | >50% |
| Gap closure signal | After publishing, does the same question appear less frequently as a gap? | Measurable decline |
| Time to publish | Avg time from draft creation to "Save & Re-index" | <48 hours |

## Risks

| Risk | Mitigation |
|---|---|
| AI drafts that are wrong or off-brand | Admin must publish manually — no auto-publish ever |
| Admin generates but never publishes | Drafts are visible in KB file tree with `draft` badge — natural reminder |
| Generation times out on large gap sets | Cap bulk generation at a reasonable context size; surface an error toast if the LLM call fails |
| Scope creep | The editor integration is intentionally minimal — source banner only, no new approval state machine |
