# Knowledge Builder Agent — Sub-Plan 2: AI Document Generation

> **Created**: February 17, 2026
> **Revised**: April 6, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Depends on**: [Sub-Plan 1: Gap Detection](./2026-02-17-gap-auto-doc-01-gap-detection.md)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER`

---

> **Engineering philosophy**: No clustering engine, no suggestions table, no separate approval state machine. Admin selects gaps on screen, AI generates one document, draft opens in the existing KB editor. That's the whole flow.

---

## Goal

Add a "Generate Doc" button to each gap question card in the "What Users Are Asking" feed, and a bulk "Generate Doc" action for the currently filtered set. Both call a new backend endpoint that generates a draft KB document from the selected questions' context and drops it into the KB editor ready for admin review.

## How it works

```
Admin clicks "Generate Doc" on one gap card
  OR
Admin applies filters → clicks "Generate Doc for N gaps"
    │
    ▼
POST /api/v1/kb/generate-from-gaps
  { question_ids: ["...", "..."] }
    │
    ├── Query knowledge_gap_analysis view for those question IDs
    │   (gather: question text, AI response, conversation title, user type)
    │
    ├── Upsert "AI Generated" folder for company (idempotent)
    │
    ├── Call ChatCompletionService.create_completion()
    │   Model: company's default_chat_model
    │   Output: HTML document (title + body)
    │
    ├── Create document in documents table
    │   upload_status = 'draft'
    │   folder_path = 'AI Generated'
    │   provider_metadata = {
    │     "origin": "knowledge-builder",
    │     "source_question_ids": ["...", "..."]
    │   }
    │
    └── Return { document_id, title }
         │
         ▼
Frontend: toast "Draft created" + "Review in Editor →" link
  navigates to /settings/kb/edit/{document_id}
```

## Tasks

### Backend — `POST /api/v1/kb/generate-from-gaps` in `kb.py`

- [x] **Request model** — `GenerateFromGapsRequest`: `question_ids: list[str]` (1–N IDs from `knowledge_gap_analysis`)
- [x] **Auth check** — `franchisor_admin` only. Reject with 403 if `user.is_franchisor_admin` is false.
- [x] **Company scope check** — verify all provided `question_ids` belong to `user.company_id` by querying `knowledge_gap_analysis` with `.eq('company_id', user.company_id).in_('question_id', question_ids)`. Reject mismatches silently (filter them out).
- [x] **Context assembly** — for each verified question, collect: question text, AI response text, conversation title. Assemble into a structured prompt context. Keep within ~6,000 token budget; truncate AI responses before truncating questions.
- [x] **Folder upsert** — upsert `{ company_id, folder_path: 'AI Generated' }` into `folders` table using the unique constraint (`ON CONFLICT DO NOTHING`).
- [x] **LLM call** — call `ChatCompletionService.create_completion()` with:
  - Model: `settings.default_chat_model`
  - System prompt: franchise operations document writer (see prompt section below)
  - Temperature: `0.4`
  - Max tokens: `4096`
  - Output: HTML (`rich_content` format compatible with TipTap)
- [x] **HTML cleanup** — strip markdown code fences, leading preamble text before first `<` tag, and empty `<p></p>` blocks (follow the existing pattern in the AI format toolbar endpoint)
- [x] **Document creation** — insert into `documents`:
  - `filename`: AI-generated title (extracted from `<h1>` or first heading in the HTML, fallback: "AI Generated Document")
  - `content`: plain-text strip of the HTML
  - `rich_content`: the cleaned HTML
  - `upload_status`: `'draft'`
  - `folder_path`: `'AI Generated'`
  - `company_id`: `user.company_id`
  - `user_id`: `user.user_id`
  - `visibility_scopes`: `['company']`
  - `provider_metadata`: `{ "origin": "knowledge-builder", "source_question_ids": [...] }`
  - `edited_at`: now
  - `edited_by_user_id`: `user.user_id`
- [x] **Response model** — `GenerateFromGapsResponse`: `{ document_id: str, title: str }`
- [x] **Register** — no change to `main.py` needed; endpoint lives in `kb.py` which is already registered

### Generation system prompt

```
You are an expert franchise operations writer. Your job is to write a clear, practical internal knowledge base document based on questions that franchisees could not get answers to.

You will receive a set of unanswered questions and any partial AI responses that were given. Your goal is to write a document that directly and completely answers these questions.

Requirements:
- Write in a professional but approachable tone appropriate for franchise operators
- Structure the document with a clear title (H1), logical sections (H2/H3), and bullet points where helpful
- Be specific and actionable — franchisees should be able to act on what they read
- If a question spans multiple sub-topics, create a section for each
- Do not include placeholder text like "[insert details here]" — write the best document you can from the context provided, noting where the franchisor should add specific details
- Output valid HTML only. Do not wrap in markdown code fences. Do not include preamble text before the first HTML tag.
```

### Frontend — "Generate Doc" button on each gap card (`KnowledgeGapsDashboard.tsx`)

- [x] **Role check** — call `useUserRole()` at the top of the component and derive `const isAdmin = canonicalRole === 'franchisor_admin'`. `useAuth()` does not expose role — profile data is fetched separately via `useUserRole()`.
- [x] **Visibility** — only render when `config.features.knowledgeBuilder && isAdmin`
- [x] **Placement** — small button on each question card where `response_quality === 'gap'`, next to the "Gap" badge in the top-right of the card. Use `Wand2` icon from lucide-react. Label: "Generate Doc"
- [x] **Loading state** — spinner replaces the icon while generating. Button disabled during generation.
- [x] **Call** — `POST /api/v1/kb/generate-from-gaps` with `{ question_ids: [q.question_id] }`
- [x] **Success** — toast: "Draft created" with an action button "Review in Editor →" that navigates to `/settings/kb/edit/{document_id}`
- [x] **Error** — toast with error message, button re-enabled
- [x] **data-testid** — `generate-doc-btn-{question_id}`

### Frontend — Bulk generation bar in the feed header (`KnowledgeGapsDashboard.tsx`)

- [x] **Visibility** — only render when `config.features.knowledgeBuilder && isAdmin` AND the current `feedQuestions` array contains at least one gap question (`response_quality === 'gap'`)
- [x] **Placement** — inside the Questions card header, to the left of the existing sort button. Shows: "N gaps in view" with a "Generate Doc" button.
- [x] **Gap count** — derived from `feedQuestions.filter(q => q.response_quality === 'gap').length`
- [x] **Confirmation dialog** — always shown before firing. "Generate 1 document from N gap questions? The AI will synthesize all selected gaps into a single draft document." [Generate] [Cancel]
- [x] **Call** — `POST /api/v1/kb/generate-from-gaps` with `{ question_ids: gapIds }` where `gapIds` is the `question_id` of every gap in `feedQuestions`
- [x] **Loading state** — "Generating…" text in the bar, button disabled
- [x] **Success/error** — same toast pattern as the single-gap button
- [x] **data-testid** — `bulk-generate-doc-btn`, `bulk-generate-confirm-dialog`

## What we're NOT building

- Automatic or scheduled generation — always on-demand
- One document per gap question — always one synthesized document per trigger
- Cluster pre-computation — admin's filter selection defines what gets grouped
- A separate `knowledge_builder_suggestions` table — drafts are documents in `draft` status
- Emails or push notifications
- Generation for franchisor employees — admin only

## Dependencies

| What | Where | Status |
|---|---|---|
| `knowledge_gap_analysis` view | Supabase | ✅ Exists |
| `/kb/documents/create` logic pattern | `ai-backend/app/routers/kb.py` | ✅ Exists — new endpoint follows same pattern |
| `ChatCompletionService.create_completion()` | `ai-backend/app/services/chat_completion.py` | ✅ Exists |
| `CompanyAISettings` model | `ai-backend/app/models/retrieval.py` | ✅ Exists |
| `documents.provider_metadata` JSONB | Supabase | ✅ Exists — no migration needed |
| `folders` table with unique constraint | Supabase | ✅ Exists — upsert is safe |
| `VITE_FEATURE_KNOWLEDGE_BUILDER` | `src/config/environment.ts` | ✅ Registered |
| `config.features.knowledgeBuilder` | `src/config/environment.ts` | ✅ Registered |

## Exit criteria

Tasks above verified in repo April 6, 2026 (`ai-backend/app/routers/kb.py`, `src/pages/KnowledgeGapsDashboard.tsx`).

- [x] `POST /api/v1/kb/generate-from-gaps` creates a draft document with correct metadata
- [x] Only `franchisor_admin` can call the endpoint (403 otherwise)
- [x] Question IDs are scoped to the user's company (no cross-tenant data)
- [x] "Generate Doc" button appears on each gap card (behind feature flag + admin check)
- [x] Bulk generation bar appears in the feed header when gaps are present
- [x] Confirmation dialog always shown for bulk generation
- [x] No confirmation for single-gap generation
- [x] On success, toast links directly to `/settings/kb/edit/{document_id}`
- [x] Draft document lands in the `AI Generated` folder in the KB
- [x] `provider_metadata` contains `origin: "knowledge-builder"` and `source_question_ids`
