# Knowledge Builder Agent — Sub-Plan 1: Gap Detection & Tracking

> **Created**: February 17, 2026
> **Revised**: April 6, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER`

---

> **Engineering philosophy**: The gap detection layer is largely already built. The `knowledge_gap_analysis` view detects gaps via keyword matching in AI responses. The `KnowledgeGapsDashboard.tsx` surfaces them as the "What Users Are Asking" feed. This sub-plan documents what exists and what the Generation sub-plan depends on.

---

## Goal

Surface gap questions to franchisor admins in the "What Users Are Asking" dashboard so they can see exactly where the KB is missing content and act on it.

## How gaps are detected today

The `knowledge_gap_analysis` view (defined in `supabase/migrations/20251119000000_create_knowledge_gaps_infrastructure.sql`, extended in subsequent migrations) joins `chat_messages` → `profiles` → `auth.users` → `chat_sessions` and classifies each AI response as `'gap'` or `'answered'` based on keyword matching (e.g., "I don't have information about", "couldn't find", "not in the documentation", etc.).

Every row in this view represents one user question with its AI response, the detected quality, and metadata about who asked it and when.

## Fields available from the view (used by generation)

| Field | Description |
|---|---|
| `question_id` | UUID — the `chat_messages.id` of the user's question |
| `question` | The user's message text |
| `ai_response` | The AI's response text |
| `asked_at` | Timestamp |
| `user_email` | Who asked |
| `user_type` | Their role |
| `conversation_title` | The session title |
| `chat_mode` | `organizational` or `expert` |
| `response_quality` | `'gap'` or `'answered'` |
| `company_id` | Used to scope all queries |

## What the dashboard does today

`KnowledgeGapsDashboard.tsx` at `/knowledge-gaps`:

- Queries `knowledge_gap_analysis` with date range, user, location, role, category, and chat mode filters
- Shows a questions feed where each item displays the question, response, quality badge (Gap / Answered), and metadata
- "Needs Docs" KPI card filters to `response_quality === 'gap'`
- Already has `requiresFranchisor={true}` on the route — only franchisor roles can access it

## What still needs building in this layer

The gap detection itself is complete. The only additions needed here are in the UI, and they come in sub-plan 2:

- A "Generate Doc" button on each gap card (`response_quality === 'gap'`)
- A bulk generation bar above the feed when the filtered set contains gaps

These are documented in [Sub-Plan 2](./2026-02-17-gap-auto-doc-02-doc-generation.md).

## What we're NOT building

- A separate `knowledge_gaps` table-based detection pipeline — the view-based approach is sufficient
- Embedding-based deduplication — the view already deduplicates naturally (each question is one row)
- Ticket-to-gap correlation — the view gives us enough signal without it
- Team chat signal ingestion — not needed for the generation prompt

## Dependencies

| What | Where | Status |
|---|---|---|
| `knowledge_gap_analysis` view | Supabase | ✅ Exists |
| `KnowledgeGapsDashboard.tsx` | `src/pages/KnowledgeGapsDashboard.tsx` | ✅ Exists |
| Franchisor-only route guard | `src/App.tsx` | ✅ `requiresFranchisor={true}` |
| `VITE_FEATURE_KNOWLEDGE_BUILDER` flag | `src/config/environment.ts` | ✅ Registered |

## Exit criteria

- [x] Gap questions are visible in the "What Users Are Asking" feed
- [x] Questions are correctly classified as `gap` or `answered`
- [x] Feed supports filtering by date, user, location, role, category, chat mode
- [x] Route is franchisor-only
- [x] "Generate Doc" button appears on each gap card (sub-plan 2) — see `KnowledgeGapsDashboard.tsx`
- [x] Bulk generation bar appears in the feed header (sub-plan 2)
