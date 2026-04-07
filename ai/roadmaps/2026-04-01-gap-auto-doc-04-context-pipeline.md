# Knowledge Builder Agent — Sub-Plan 4: Rich Context Pipeline

> **Created**: April 1, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Depends on**: [Sub-Plan 2: AI Document Generation](./2026-02-17-gap-auto-doc-02-doc-generation.md) (must be deployed first)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER` (same flag — no new flag needed)
> **Status**: Planned — not yet built

---

> **Engineering philosophy**: The MVP generates docs from question text alone — the AI writes from general knowledge. This sub-plan upgrades the context pipeline so the AI writes from *your actual data*. Every retrieval step runs in parallel. All sources are clearly labeled for the LLM. Nothing is blocked waiting for another source.

---

## Problem

The current generation endpoint sends the LLM two things per gap question: the question text, and the first 500 characters of Ki's failed response. The LLM has no access to:

- Your existing KB (the authoritative source for how your brand operates)
- Resolved tickets (where staff already answered this question in practice)
- Team chat (where operators discussed it informally)
- Expert content (indexed franchise industry knowledge)

Result: the AI generates plausible-sounding generic franchise content that needs heavy rewriting before it's publishable. The goal of this sub-plan is to fix that.

---

## What changes

The `generate_document_from_gaps` endpoint in `kb.py` gets a new context assembly step that runs **before** the LLM call. Four retrieval operations fire in parallel, their results are combined into labeled context sections, and the enriched prompt is sent to the LLM. A fifth step — the contradiction check — fires **after** generation.

```
[Gap question IDs]
        │
        ▼
Context assembly (all parallel via asyncio.gather)
  ├── 1. KB retrieval         → top 5 relevant doc chunks (authoritative)
  ├── 2. Ticket search        → top 3 resolved tickets + admin responses
  ├── 3. Team chat search     → top 10 relevant messages from public channels
  └── 4. Expert retrieval     → top 3 expert knowledge chunks
        │
        ▼
LLM generates draft document
(receives all context with source labels and authority hints)
        │
        ▼
5. Contradiction check (second LLM call)
   → reads draft + KB docs
   → returns list of flagged conflicts
   → conflicts stored in provider_metadata
        │
        ▼
Draft lands in KB editor with:
  - Source questions banner (existing)
  - Contradiction warnings banner (new)
```

---

## Source 1 — KB Retrieval (authoritative)

**What it provides**: The most relevant chunks from the company's existing published KB documents. This is the most important context source — it gives the AI your actual brand policies, procedures, and tone.

**How**: Reuse the existing `RetrievalService` from `ai-backend/app/services/retrieval.py`. It already does hybrid vector + keyword search against the company's document embeddings. Call `retrieve_contexts()` with the concatenated gap question text as the query.

**Token budget**: Top 5 chunks, capped at 2,000 tokens total.

**Label for LLM**:
```
<kb_context authority="high">
  This is your company's existing knowledge base. Treat it as authoritative.
  Match the tone, format, and style of these documents. Do not contradict them.
  [chunks here]
</kb_context>
```

**What it enables**:
- AI matches your brand's actual writing style and structure
- AI uses your real numbers (fees, procedures, timelines) not generic ones
- Contradiction check becomes possible (compare draft against this)

---

## Source 2 — Resolved Tickets (high-quality answers)

**What it provides**: Tickets where staff already resolved a similar question. The admin's comment on a resolved ticket is a verified, human-written answer — the most reliable signal that the question has a known correct answer.

**How**: Query `support_tickets` joined with `support_ticket_comments` using the service role key (bypasses RLS so the backend can read all company tickets).

```python
# Pseudocode
tickets = supabase.client.table("support_tickets")
    .select("subject, description, support_ticket_comments(message, is_admin, created_at)")
    .eq("company_id", user.company_id)
    .in_("status", ["resolved", "closed"])
    .ilike("subject", f"%{keyword}%")   # keyword extracted from question text
    .order("updated_at", desc=True)
    .limit(3)
    .execute()
```

Filter to only include comments where `is_admin = true` — these are the verified answers, not the original complaint.

**Token budget**: Top 3 tickets, subject + admin resolution comment only, capped at 800 tokens total.

**Label for LLM**:
```
<resolved_tickets authority="medium">
  These support tickets were submitted by franchisees with similar questions
  and were resolved by your support team. The resolution comments represent
  verified answers but may be informal — use them for content, not phrasing.
  [tickets here]
</resolved_tickets>
```

**What it enables**: If a question has already been answered in a ticket, the AI writes the actual answer instead of a placeholder. "Please contact your area representative" in a ticket comment becomes a real procedure in the KB doc.

---

## Source 3 — Team Chat (supplementary)

**What it provides**: Relevant messages from public team chat channels where staff may have discussed or answered the question informally.

**How**: Query `channel_messages` joined to `channels` using the service role key. Only search public channels (`type = 'public'`) — never direct messages or private channels.

```python
# Pseudocode
messages = supabase.client.table("channel_messages")
    .select("content, created_at, channels!inner(company_id, name, type)")
    .eq("channels.company_id", user.company_id)
    .eq("channels.type", "public")
    .is_("deleted_at", None)
    .ilike("content", f"%{keyword}%")
    .order("created_at", desc=True)
    .limit(10)
    .execute()
```

**Token budget**: Top 10 messages, content only (no user attribution), capped at 600 tokens total.

**Label for LLM**:
```
<team_chat authority="low">
  These are informal messages from your team's internal chat. They may contain
  useful context, partial answers, or relevant discussion. Treat as supplementary
  only — do not use informal phrasing or treat these as policy. Never attribute
  statements to individuals.
  [messages here]
</team_chat>
```

**Important caveats**:
- Team chat is informal — the LLM is explicitly told not to treat it as authoritative
- User names/emails are stripped before sending to LLM
- Only public channels — DMs never enter the prompt

---

## Source 4 — Expert Content (franchise industry knowledge)

**What it provides**: Chunks from the indexed expert knowledge base (franchise industry standards, best practices). Already in the retrieval service as `_retrieve_expert_vectors` + `_retrieve_expert_keywords`.

**How**: Call `_retrieve_expert_vectors()` and `_retrieve_expert_keywords()` from `RetrievalService` with the question text. These methods already exist.

**Token budget**: Top 3 chunks, capped at 600 tokens total.

**Label for LLM**:
```
<expert_context authority="low">
  These are general franchise industry best practices. Use only when
  company-specific context above does not cover a topic. Do not present
  general industry practices as your company's specific policies.
</expert_context>
```

---

## Source 5 — Contradiction Check (post-generation)

**What it provides**: After the draft is generated, a second LLM call reads the draft alongside the KB context and flags any specific contradictions between the draft and existing published documents.

**Why a separate call**: The generation call is already at 4,096 tokens output. Adding contradiction checking to the same call degrades output quality. A dedicated focused call is more reliable.

**Input**: Draft HTML (plain text stripped) + KB chunks from Source 1.

**Output** (structured JSON):
```json
{
  "has_contradictions": true,
  "contradictions": [
    {
      "draft_excerpt": "...",
      "conflicts_with": "Operations Manual p.3",
      "description": "Draft says royalty is 5%, existing KB says 6%"
    }
  ]
}
```

**Where stored**: In `provider_metadata` alongside `source_question_ids`:
```json
{
  "origin": "knowledge-builder",
  "source_question_ids": ["..."],
  "contradictions": [...],
  "context_sources_used": ["kb", "tickets", "team_chat", "expert"]
}
```

**Frontend**: A new banner in the KB editor appears when `provider_metadata.contradictions.length > 0`. Each contradiction is shown as a warning card with the draft excerpt and what it conflicts with. The admin resolves them before publishing.

---

## Token budget summary

| Source | Max chunks | Max tokens |
|---|---|---|
| Gap questions (existing) | 20 questions | ~800 |
| KB context | 5 chunks | 2,000 |
| Resolved tickets | 3 tickets | 800 |
| Team chat | 10 messages | 600 |
| Expert content | 3 chunks | 600 |
| System prompt | — | ~300 |
| **Total input** | | **~5,100** |
| Generation output | — | 4,096 |

Total stays within standard 8k-16k context windows. For larger models (32k+) the caps can be loosened.

---

## Keyword extraction

Sources 2 and 3 use keyword search rather than vector search (no embeddings on tickets/chat). Keywords are extracted from the gap question text using a simple helper:

```python
def extract_keywords(questions: list[str]) -> list[str]:
    # Combine all question text, lowercase, remove stop words,
    # return top 5-10 meaningful terms
    # e.g. ["how do I make a cornhole board"] -> ["cornhole", "board", "make"]
```

This is intentionally simple — PostgreSQL ILIKE with a few keywords is fast, cheap, and sufficient for finding topically related content.

---

## Backend implementation tasks

### In `kb.py` — `generate_document_from_gaps`

- [ ] **Parallel context retrieval** — wrap all four retrieval calls in `asyncio.gather()` so they run simultaneously. Total retrieval latency = slowest single source, not sum of all.
- [ ] **KB retrieval** — instantiate `RetrievalService`, call `retrieve_contexts()` with question text concatenated. Extract top 5 chunks.
- [ ] **Ticket search** — query `support_tickets` + `support_ticket_comments` using service role. ILIKE on subject, filter `status IN ('resolved', 'closed')`, `is_admin = true` for comments. Top 3.
- [ ] **Team chat search** — query `channel_messages` joined to `channels`. ILIKE on content, `type = 'public'`, `deleted_at IS NULL`. Strip user attribution. Top 10 messages.
- [ ] **Expert retrieval** — call `_retrieve_expert_vectors()` + `_retrieve_expert_keywords()` from `RetrievalService`. Top 3 chunks.
- [ ] **Context assembly** — build labeled XML sections for each source. Only include sections that returned results (skip empty sources gracefully).
- [ ] **Update LLM prompt** — append context sections to the user message after the gap questions.
- [ ] **Contradiction check** — after generation, if KB chunks were retrieved, make a second `create_completion` call (model: `default_chat_model`, max_tokens: 1024, temperature: 0) with contradiction check system prompt. Parse JSON response.
- [ ] **Store contradictions** — add `contradictions` and `context_sources_used` to `provider_metadata` in the document insert.
- [ ] **Graceful degradation** — if any retrieval step fails, log and continue. The endpoint should never fail because team chat search timed out.

### In `KBEditorPage.tsx`

- [ ] **Contradiction banner** — new banner below the source questions banner. Only shown when `provider_metadata.contradictions?.length > 0`. Lists each contradiction as a warning card with the draft excerpt and the conflicting KB reference. Starts expanded.
- [ ] **`provider_metadata` type update** — add `contradictions?: Array<{ draft_excerpt: string; conflicts_with: string; description: string }>` to the interface.
- [ ] **data-testid** — `kb-contradictions-banner`, `kb-contradiction-item`

---

## Updated system prompt (generation)

Add a new section to `KNOWLEDGE_BUILDER_SYSTEM_PROMPT` explaining how to use the context sources:

```
Context sources are provided below, labeled by authority level:
- <kb_context authority="high"> — your company's existing KB. Match its tone and style. Use its specific facts (numbers, procedures, timelines). Do not contradict it.
- <resolved_tickets authority="medium"> — verified staff answers to similar questions. Use the content, not the phrasing.
- <team_chat authority="low"> — informal team discussion. Use for additional context only. Never quote or attribute.
- <expert_context authority="low"> — general franchise industry knowledge. Use only when company-specific context is absent.

When brand-specific information exists in high-authority sources, always prefer it over general knowledge.
When a topic has no information in any source, write a placeholder section noting "Franchisor to add: [topic]" so the admin knows to fill it in.
```

---

## Contradiction check system prompt

```
You are a knowledge base consistency checker. You will receive:
1. A newly generated draft document
2. Existing KB document chunks from the same company

Your job is to identify any factual contradictions between the draft and the existing KB.

Output ONLY valid JSON in this exact format:
{
  "has_contradictions": boolean,
  "contradictions": [
    {
      "draft_excerpt": "exact quote from the draft",
      "conflicts_with": "document name or section from existing KB",
      "description": "one sentence explaining the conflict"
    }
  ]
}

Only flag clear factual contradictions (numbers, policy statements, procedures).
Do not flag differences in tone, formatting, or level of detail.
If there are no contradictions, return has_contradictions: false and an empty array.
```

---

## Dependencies

| What | Where | Status |
|---|---|---|
| `RetrievalService.retrieve_contexts()` | `ai-backend/app/services/retrieval.py` | ✅ Exists |
| `RetrievalService._retrieve_expert_vectors/keywords()` | `ai-backend/app/services/retrieval.py` | ✅ Exists |
| `support_tickets` + `support_ticket_comments` tables | Supabase | ✅ Exists |
| `channels` + `channel_messages` tables | Supabase | ✅ Exists |
| `documents.provider_metadata` JSONB | Supabase | ✅ Exists — just add new fields |
| `KBEditorPage.tsx` provider_metadata rendering | `src/pages/KBEditorPage.tsx` | ✅ Exists — add contradiction banner |
| Service role key for cross-user queries | `ai-backend` Supabase client | ✅ Available |

**No new tables. No new migrations. No new feature flags.**

---

## What we're NOT building (in this sub-plan)

- Embedding pipeline for team chat or tickets — keyword search is sufficient for V1
- Automatic contradiction resolution — admin decides what to keep
- Searching private/DM channels — public channels only
- Web search — LLM's general training knowledge plus expert content is sufficient
- Per-source toggle UI — all sources always used; admin sees what was found via `context_sources_used` in provider_metadata

---

## Expected quality improvement

| Scenario | MVP output | With context pipeline |
|---|---|---|
| "What are our royalty fees?" | Generic article about franchise royalties | Uses KB doc with actual % rate |
| "How do I handle a staff complaint?" | Generic HR advice | Uses your actual HR procedure doc + any resolved ticket on same topic |
| "What's the process for a grand opening?" | Generic franchise launch checklist | Uses your onboarding KB + any team chat discussions about grand openings |
| Question with no company data at all | Generic article | Same as MVP, but with explicit "Franchisor to add:" placeholders |

---

## Exit criteria

- [ ] All four retrieval sources run in parallel, total added latency < 2s
- [ ] LLM receives labeled context sections with authority hints
- [ ] If KB context is empty, generation still works (graceful degradation)
- [ ] If tickets/team chat return no results, generation still works
- [ ] Contradiction check fires only when KB chunks were retrieved
- [ ] `provider_metadata.contradictions` is populated (may be empty array)
- [ ] Contradiction banner appears in KB editor when contradictions exist
- [ ] Contradiction banner does not appear on non-KB-builder documents
- [ ] Private/DM channels are never queried
- [ ] User attribution is stripped from team chat before sending to LLM
