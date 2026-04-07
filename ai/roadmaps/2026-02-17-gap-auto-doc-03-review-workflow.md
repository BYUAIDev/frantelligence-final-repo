# Knowledge Builder Agent — Sub-Plan 3: Editor Integration & Publishing

> **Created**: February 17, 2026
> **Revised**: April 6, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Depends on**: [Sub-Plan 2: Doc Generation](./2026-02-17-gap-auto-doc-02-doc-generation.md)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER`

---

> **Engineering philosophy**: The review interface is the existing KB editor. No new review inbox, no approval state machine, no emails. The admin edits the draft like any other document and clicks "Save & Re-index" to publish it. This sub-plan adds only the source context banner that gives the admin visibility into what generated the draft.

---

## Goal

When an admin opens a knowledge-builder draft in the KB editor, they should see which gap questions generated it — so they have context while editing. After editing, they publish it the same way they publish any KB document: "Save & Re-index".

## How it works

```
Admin clicks "Review in Editor →" from the generation toast
    │
    ▼
/settings/kb/edit/{document_id}  (KBEditorPage, existing)
    │
    ├── Editor loads document as normal (draft status, rich_content pre-filled)
    │
    ├── If provider_metadata.origin === "knowledge-builder":
    │     Show collapsible "Source Questions" banner below the title
    │     Fetches source questions from knowledge_gap_analysis view
    │     by provider_metadata.source_question_ids
    │     Displays each question + who asked it + when
    │
    └── Admin edits, then clicks "Save & Re-index"
          │
          upload_status → 'ready'
          Document enters chunking → embedding → RAG pipeline
          (standard flow — no special knowledge-builder handling)
```

## Tasks

### Frontend — Source questions banner in `KBEditorPage`

- [x] **Detect knowledge-builder draft** — after `docMeta` loads, check `docMeta.provider_metadata?.origin === 'knowledge-builder'` and `docMeta.provider_metadata?.source_question_ids?.length > 0`
- [x] **Fetch source questions** — query `knowledge_gap_analysis` view filtering by `question_id IN (source_question_ids)`. Select: `question_id`, `question`, `user_email`, `asked_at`, `user_type`.
- [x] **Banner placement** — render below the document title input, above the editor content area. Collapsible (collapsed by default on mobile, expanded by default on desktop).
- [x] **Banner content** — header: "Generated from [N] gap question[s]". For each question: the question text, who asked it (`emailToName` lookup or email), and when. Style to match the existing editor info panels (subdued, non-distracting).
- [x] **No banner if not knowledge-builder** — banner is hidden for all non-knowledge-builder documents. No change to normal editor behavior.
- [x] **data-testid** — `kb-source-questions-banner`, `kb-source-question-item`

### Publishing (no changes needed)

The existing "Save & Re-index" button in `KBEditorPage` already:

1. Saves the current content (`content` + `rich_content`) to the `documents` table
2. Sets `upload_status` to `'ready'` (or re-queues for processing)
3. Triggers chunking → embedding → makes the document available for RAG

No changes are needed to this flow for knowledge-builder documents. The draft publishes exactly like any other document.

### The `AI Generated` folder in the KB view

The `AI Generated` folder is upserted by the generation endpoint (sub-plan 2). Once the first document is generated, the folder appears in the KB file tree automatically via the existing `get_folder_tree` function. No changes needed to the KB file browser.

The admin can move the document to a different folder from the editor's folder selector after reviewing, just like any other document.

## What we're NOT building

- A separate review inbox or approval queue
- Approve / reject buttons — "Save & Re-index" is approve, delete is reject
- Email notifications — generation toast with "Review in Editor →" link is sufficient
- Multi-stage review or manager approval
- Auto-publishing without admin action — always requires human "Save & Re-index"
- Gap auto-resolution on publish — not tracking gap status per-question at this time (the view reflects the historical chat data; the signal improves naturally as the KB grows)

## Dependencies

| What | Where | Status |
|---|---|---|
| `KBEditorPage` | `src/pages/KBEditorPage.tsx` | ✅ Exists — add banner only |
| `documents.provider_metadata` | Supabase | ✅ Exists — read `origin` and `source_question_ids` |
| `knowledge_gap_analysis` view | Supabase | ✅ Exists — queried by `question_id` for banner |
| "Save & Re-index" publish flow | `KBEditorPage` | ✅ Exists — no changes |
| `AI Generated` folder | `folders` table | Created by sub-plan 2 generation endpoint |

## Exit criteria

Verified in repo April 6, 2026 (`src/pages/KBEditorPage.tsx`).

- [x] Source questions banner appears in the editor when `provider_metadata.origin === 'knowledge-builder'`
- [x] Banner shows the question text, asker, and date for each source question
- [x] Banner is collapsible and does not interfere with editing
- [x] Banner does not appear on non-knowledge-builder documents
- [x] Admin can publish the draft with "Save & Re-index" and it enters the RAG pipeline
- [x] `AI Generated` folder is visible in the KB file tree after first generation
