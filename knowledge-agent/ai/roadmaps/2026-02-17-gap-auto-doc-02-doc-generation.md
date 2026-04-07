# Knowledge Builder Agent — Sub-Plan 2: AI Document Generation

> **Created**: February 17, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Depends on**: [Sub-Plan 1: Gap Detection](./2026-02-17-gap-auto-doc-01-gap-detection.md)
> **Architecture ref**: [Document Processing Pipeline](../../aidocs/architecture.md#8-document-processing-pipeline)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER` (defined in [parent plan](./2026-02-17-gap-auto-doc-feature-plan.md))

---

> **Engineering philosophy**: This is a clean codebase. No over-engineering, no cruft, no legacy-compatibility shims. The agent should be a focused service with a clear input (clustered gaps) and output (draft document). Don't build a general-purpose document generation framework.

---

## Goal

Build an AI agent that takes a cluster of related knowledge gaps + relevant team chat context and produces a draft KB document that a franchisor admin can review, edit, and approve.

## How it works

```
Clustered gaps (3+ occurrences, same topic)
    │
    ├── Gather: original questions, AI responses, ticket content (if linked)
    ├── Gather: relevant team chat messages (keyword match on gap topic)
    │
    ▼
AI Agent (LLM call)
    │ System prompt: "You are writing a franchise operations document..."
    │ Input: gap questions + context + existing KB excerpts + team chat snippets
    │ Output: structured document (title, body, suggested visibility scope)
    │
    ▼
Draft stored in `knowledge_builder_suggestions` table
    │ Status: pending_review
    │
    ▼
Admin notified (sub-plan 3)
```

## Tasks

### Gap Clustering

- [ ] **Topic clustering** — group open gaps by semantic similarity. Embed each gap's question text, cluster using a simple threshold (e.g., cosine similarity > 0.80 = same cluster). No need for fancy clustering algorithms — start with pairwise similarity and a greedy merge.
- [ ] **Cluster prioritization** — rank clusters by: total occurrence count across gaps, number of unique users who hit the gap, recency of last occurrence. Only trigger doc generation for clusters with 3+ total occurrences (configurable threshold).
- [ ] **Add `topic_cluster` field** — update gap records with their cluster ID after clustering runs.

### Team Chat Context Gathering

- [ ] **Chat signal extraction** — for each gap cluster, search `channel_messages` for messages containing keywords from the gap questions. Limit to the same `company_id`. Pull the top 5–10 most relevant messages (by keyword overlap or embedding similarity).
- [ ] **Context window assembly** — combine: gap questions, AI responses that failed, linked ticket content, team chat snippets. Stay within a reasonable token budget (4,000–6,000 tokens of context).

### Document Generation Agent

- [ ] **Agent service** — new service in the backend: `GapDocAgentService`. Single method: `generate_draft(cluster_id) → DraftDocument`.
- [ ] **System prompt** — craft a prompt that produces franchise-appropriate documents: clear, actionable, formatted with headers and bullet points, written in the brand's voice (pull from company's custom AI instructions if set).
- [ ] **Draft schema** — each draft includes: `title`, `body` (markdown), `suggested_visibility` (default: company-wide), `source_gap_ids` (which gaps this addresses), `source_chat_message_ids` (which team chat messages informed it), `confidence_note` (agent's note on what it's less sure about).
- [ ] **Draft storage** — use the `knowledge_builder_suggestions` table (already defined in the PRD schema). Key fields: `id`, `company_id`, `cluster_id`, `title`, `body`, `suggested_visibility`, `source_gap_ids`, `status` (pending_review / approved / rejected / published), `generated_at`, `reviewed_by`, `reviewed_at`, `reviewer_notes`.

### Trigger Logic

- [ ] **Scheduled or on-demand** — start with on-demand: a button on the gap dashboard that says "Generate document for this cluster." Later consider a scheduled job that runs clustering weekly and auto-generates drafts for new high-priority clusters.
- [ ] **Idempotency** — don't regenerate a draft for a cluster that already has a pending or approved draft. Allow regeneration only if the previous draft was rejected.

### API

- [ ] **`POST /api/v1/knowledge-builder/clusters/{cluster_id}/generate`** — triggers doc generation for a specific gap cluster. Returns the suggestion ID. Franchisor-only access.
- [ ] **`GET /api/v1/knowledge-builder/clusters`** — returns clustered gaps with occurrence counts and suggestion status. Franchisor-only access.
- [ ] **`GET /api/v1/knowledge-builder/suggestions`** — returns all suggestions for a company. Filterable by status.
- [ ] **`GET /api/v1/knowledge-builder/suggestions/{suggestion_id}`** — returns a specific suggestion with full content and source references.

### Migration

- [ ] **Create `knowledge_builder_suggestions` table** — use `npx supabase migration new create_knowledge_builder_suggestions`. Schema is defined in the PRD (TR-2).
- [ ] **RLS policies** — suggestions scoped to `company_id` using EXISTS pattern. Only `franchisor_admin` and `franchisor_employee` can read/write.

## What we're NOT building yet

- Auto-triggered generation (start with manual trigger from dashboard)
- Scheduled clustering cron job (start with on-demand)
- Multi-document generation from a single cluster
- Draft editing within this service (that's the review workflow in sub-plan 3)

## Dependencies

| What | Where | Status |
|---|---|---|
| Gap records with occurrence data | `knowledge_gaps` table | Built in sub-plan 1 |
| Team chat messages | `channel_messages` table | Exists |
| Company AI instructions | `company_ai_settings` table | Exists |
| Embeddings service | `ai-backend/app/services/embeddings.py` | Exists |
| Document processing pipeline | `ai-backend/app/worker.py` | Exists (used after approval in sub-plan 3) |

## Exit criteria

- [ ] Gap clusters are computed from open gaps with semantic similarity
- [ ] Admin can trigger "Generate document" for a cluster from the dashboard
- [ ] AI produces a well-structured markdown draft document
- [ ] Draft includes references to source gaps and team chat snippets
- [ ] Draft is stored with `pending_review` status
- [ ] Duplicate generation is prevented for clusters with existing pending drafts
