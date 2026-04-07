# Knowledge Builder Agent — Sub-Plan 1: Gap Detection & Tracking

> **Created**: February 17, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Architecture ref**: [AI / RAG Pipeline](../../aidocs/architecture.md#7-ai--rag-pipeline)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER` (defined in [parent plan](./2026-02-17-gap-auto-doc-feature-plan.md))

---

> **Engineering philosophy**: This is a clean codebase. No over-engineering, no cruft, no legacy-compatibility shims. Build the minimum gap detection that produces useful signal. Don't build a clustering engine until we have enough gaps to cluster.

---

## Goal

Capture a structured record every time KI Chat gives a low-confidence answer or can't answer at all. Surface these gaps to franchisor admins so they can see what their KB is missing.

## What we're detecting

| Signal | Source | How We Know |
|---|---|---|
| **Refusal** | ChatOrchestrator refusal detection | AI explicitly says "I don't have information about that" |
| **Low retrieval confidence** | RetrievalService | Few or no chunks retrieved, or all chunks below a similarity threshold |
| **User filed a ticket after chatting** | Ticket creation + recent chat session | User asked KI → didn't get a good answer → filed a ticket within same session window |
| **Negative implicit feedback** | Chat behavior | User rephrases the same question, or abandons the session immediately after the answer |

## Tasks

### Backend

- [ ] **Extend gap capture in ChatOrchestrator** — after each chat completion, evaluate confidence: was this a refusal? Was retrieval sparse? Log a structured gap record if confidence is below threshold.
- [ ] **Define gap record schema** — repurpose/extend the existing `knowledge_gaps` table. Each record needs: `company_id`, `question_text`, `gap_type` (refusal / low_retrieval / ticket_follow_up), `confidence_score`, `topic_cluster` (nullable, for later), `status` (open / resolved / dismissed), `occurrence_count`, `first_seen_at`, `last_seen_at`, `sample_chat_interaction_ids`.
- [ ] **Gap deduplication** — when a similar question is asked again and flagged as a gap, increment `occurrence_count` and update `last_seen_at` rather than creating a new row. Use embedding similarity to detect duplicates (threshold TBD — start with 0.85).
- [ ] **Ticket-to-gap correlation** — when a support ticket is created, check if the user had a KI Chat session in the last 30 minutes. If so, link the ticket to the most recent low-confidence interaction and create/update a gap record.
- [ ] **Gap API endpoint** — `GET /api/v1/gaps` — returns gaps for a company, sorted by occurrence count. Filterable by status, gap_type, date range. Franchisor-only access.

### Frontend

- [ ] **Gap dashboard** — build on the existing `/knowledge-gaps` route. Show a table of open gaps sorted by frequency. Columns: question summary, times asked, gap type, first/last seen, status.
- [ ] **Gap detail view** — click a gap to see: the original question(s), the AI's response(s), sample interactions, and a button to dismiss or mark as resolved.
- [ ] **Resolved state** — when a franchisor uploads a document that covers a gap's topic, allow marking the gap as resolved (manual for now, auto-detection in sub-plan 2).

### Edge Function / Migration

- [ ] **Migration** — extend `knowledge_gaps` table with the fields defined above. Use `npx supabase migration new extend_knowledge_gaps_for_auto_doc`.
- [ ] **RLS policies** — gaps scoped to `company_id`. Only franchisor roles can read.

## What we're NOT building yet

- Automatic topic clustering (comes with sub-plan 2 when we have enough data)
- AI-generated documents (sub-plan 2)
- Admin review workflow (sub-plan 3)
- Email notifications about gaps (sub-plan 3)
- Team chat signal ingestion (sub-plan 2)

## Dependencies

| What | Where | Status |
|---|---|---|
| Refusal detection in ChatOrchestrator | `ai-backend/app/services/orchestrator.py` | Exists |
| `chat_interactions` table | Supabase | Exists |
| `knowledge_gaps` table | Supabase | Exists — needs schema extension |
| `/knowledge-gaps` route | `src/pages/KnowledgeGapsDashboard.tsx` | Exists — needs rebuild for new data model |
| `analyze-knowledge-gaps` edge function | `supabase/functions/` | Exists — evaluate if reusable or replace |

## Exit criteria

- [ ] Every refusal and low-retrieval answer creates a gap record
- [ ] Duplicate questions increment the same gap (not a new row)
- [ ] Franchisor admin can view gaps sorted by frequency on the dashboard
- [ ] Gaps can be manually dismissed or marked resolved
- [ ] Ticket-to-gap correlation works for tickets filed within 30 min of a chat
