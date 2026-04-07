# Knowledge Builder Agent — Sub-Plan 3: Admin Review Workflow & KB Publishing

> **Created**: February 17, 2026
> **Parent**: [Knowledge Builder Agent Feature Plan](./2026-02-17-gap-auto-doc-feature-plan.md)
> **Depends on**: [Sub-Plan 2: Doc Generation](./2026-02-17-gap-auto-doc-02-doc-generation.md)
> **Architecture ref**: [Document Processing Pipeline](../../aidocs/architecture.md#8-document-processing-pipeline)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER` (defined in [parent plan](./2026-02-17-gap-auto-doc-feature-plan.md))

---

> **Engineering philosophy**: This is a clean codebase. No over-engineering, no cruft, no legacy-compatibility shims. The review workflow should be simple: see draft, edit if needed, approve or reject. Don't build a multi-stage approval pipeline unless someone asks for one.

---

## Goal

Give franchisor admins a clean way to review AI-generated draft documents, edit them if needed, then publish approved drafts directly into the knowledge base — or reject them.

## How it works

```
Draft generated (sub-plan 2)
    │
    ├── Notification: email + in-app badge
    │
    ▼
Admin opens review UI
    │ Sees: title, full body, source gaps, team chat context, suggested visibility
    │
    ├── APPROVE → doc created in KB → enters processing pipeline → available for RAG
    ├── EDIT + APPROVE → admin modifies content → same publish flow
    └── REJECT → draft marked rejected → source gaps remain open
    │
    ▼
Source gaps updated
    │ Approved: gaps marked "resolved"
    │ Rejected: gaps remain "open" (can trigger new draft later)
```

## Tasks

### Review UI (Frontend)

- [ ] **Draft inbox** — new section in the operations dashboard (or settings > KB). Shows pending drafts as cards: title, when generated, how many gaps it addresses, a preview snippet. Badge count on nav item for pending drafts.
- [ ] **Draft review page** — full-page view of a draft. Sections:
  - Document preview (rendered markdown)
  - Source gaps panel (which questions triggered this, how many times asked)
  - Team chat context panel (snippets that informed the draft)
  - Visibility scope selector (default: company-wide, admin can change)
  - Folder selector (which KB folder to publish into)
  - Action buttons: Approve, Edit & Approve, Reject
- [ ] **Edit mode** — inline markdown editor for the draft body. Use the existing TipTap editor component if the document editor feature flag is on, otherwise a simple textarea with markdown preview.
- [ ] **Reject with reason** — optional text field for why the draft was rejected. Stored in `reviewer_notes` on `knowledge_builder_suggestions`.

### Notification (Email + In-App)

- [ ] **Email notification** — when a draft is generated, email franchisor admins: "Frantelligence generated a new document draft based on questions your franchisees are asking. Review it here: [link]." Use existing Resend email infrastructure.
- [ ] **In-app notification** — badge on the nav item / notification bell showing count of pending drafts.
- [ ] **Don't spam** — batch notifications. If 3 drafts are generated in the same run, send one email with all 3, not 3 separate emails.

### Approve → Publish Flow (Backend)

- [ ] **`POST /api/v1/knowledge-builder/suggestions/{suggestion_id}/approve`** — accepts optional body edits and visibility scope. Creates a new `documents` record from the suggestion content. Triggers the existing document processing pipeline (chunking → embedding → available for RAG). Updates suggestion status to `published`. Updates source gaps to `resolved`.
- [ ] **`POST /api/v1/knowledge-builder/suggestions/{suggestion_id}/reject`** — accepts optional reviewer notes. Updates suggestion status to `rejected`. Source gaps remain open.
- [ ] **Document creation** — the approved suggestion becomes a real document in the `documents` table with: `source_type: 'knowledge_builder'`, visibility from admin selection, folder from admin selection. It goes through the standard processing pipeline — no special handling needed.

### Gap Resolution

- [ ] **Auto-resolve gaps on publish** — when a draft is approved, all `source_gap_ids` linked to that draft get their status set to `resolved` with a reference to the published document ID.
- [ ] **Reopening** — if the same gap recurs after resolution (same question flagged again), create a new gap record rather than reopening the old one. This lets us track whether the published doc actually solved the problem.

### Migration

- [ ] **Extend `knowledge_builder_suggestions`** — add `published_document_id` (FK to `documents`), `folder_id`, `visibility_scope` if not already present from the base schema. Use `npx supabase migration new extend_knowledge_builder_suggestions_for_publishing`.
- [ ] **RLS policies** — approve/reject actions restricted to `franchisor_admin` and `franchisor_employee` roles using EXISTS pattern.

### Edge Function (Notification)

- [ ] **`send-knowledge-builder-notification`** — sends email via Resend when new suggestions are generated. Batches multiple suggestions into a single email. Includes direct links to the review UI.

## What we're NOT building

- Multi-stage approval (no "submit for review" → "manager approves" → "director approves")
- Automatic publishing without human review (AI drafts, humans approve — always)
- Draft versioning (if an admin wants to regenerate, they reject and trigger a new generation)
- Scheduled review reminders (consider later if drafts sit unreviewed for too long)

## Dependencies

| What | Where | Status |
|---|---|---|
| Draft suggestions | `knowledge_builder_suggestions` table | Built in sub-plan 2 |
| Document processing pipeline | `ai-backend/app/worker.py` + SQS | Exists |
| `documents` table | Supabase | Exists |
| TipTap editor | `src/components/kb/` | Exists (behind feature flag) |
| Resend email | Edge function infrastructure | Exists |
| Notification bell | `src/components/NotificationBell.tsx` | Exists |

## Exit criteria

- [ ] Admin receives email notification when new drafts are generated
- [ ] Admin can view pending drafts in a dedicated inbox
- [ ] Admin can preview the full draft with source gaps and chat context
- [ ] Admin can approve a draft as-is → doc enters KB and is available for RAG
- [ ] Admin can edit a draft then approve → edited content enters KB
- [ ] Admin can reject a draft with an optional reason
- [ ] Approved drafts automatically resolve their source gaps
- [ ] Rejected drafts leave source gaps open for future generation
