# Frantelligence — MVP Definition

> **Version**: 1.2
> **Last Updated**: April 6, 2026
> **Companion to**: [Product Requirements Document](./prd.md)
> **Change log (recent):** v1.1 — IS 590r course anchor vs commercial MVP; §4 “What’s Out” clarified. v1.2 — Knowledge Builder **pipeline table** (gap → generate → review → publish demoable; sub-plan 4 = expansion); roadmap checklists verified against repo.

---

## Document roles — commercial MVP vs IS 590r course deliverable

This file serves **two audiences**; both are accurate:

1. **Commercial product MVP (Frantelligence)** — Most of this document describes what we **sell and demo** to franchisors: KI Chat, Knowledge Base, Slack/Teams/SMS, QuickBooks Financial Health, Support Tickets, and core platform glue (§3, Summary). That is the **business** MVP and revenue story.

2. **IS 590r final project (academic anchor)** — The **graded course deliverable** is **not** “ship the entire platform.” It is the **Knowledge Builder Agent** workstream: knowledge gap detection, franchisor-facing visibility into gaps, and the phased path to AI-assisted documentation and review — as defined in the [Knowledge Builder / Gap Auto-Doc feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md), sub-plans under `ai/roadmaps/`, and implementation notes under `aidocs/` and early checkpoint notes under `knowledge-agent/aiDocs/`. Course milestones, demo script, and process narrative should be traced to **that** slice. The rest of the platform provides **context** (auth, KB, chat) but is not the object of the course grade.

**Takeaway:** Platform tables in §3 describe what the product company prioritizes for pilots; **Knowledge Gaps / Builder** is the **named course project** even when it is **out of the initial sales pitch** (§4).

### Knowledge Builder — end-to-end pipeline (demo vs expansion)

The **core loop** for the course project is implemented and demoable: **detect gaps → generate draft → review in KB editor → publish via Save & Re-index** (RAG picks up published docs). Roadmaps: [feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md), sub-plans [1](../ai/roadmaps/2026-02-17-gap-auto-doc-01-gap-detection.md)–[3](../ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md).

| Stage | What it is | Course / demo status |
|-------|------------|-------------------------|
| **Gap signal** | Questions where KI could not answer well; surfaced in **What Users Are Asking** (`KnowledgeGapsDashboard`) | **Demoable** — filters, gap vs answered, KPIs |
| **Generate** | `POST /api/v1/kb/generate-from-gaps` creates a **draft** in **AI Generated** with `provider_metadata` linking source question IDs | **Demoable** — per-card and bulk **Generate Doc** (feature flag + franchisor admin) |
| **Review** | Existing **KB editor** with **Source Questions** banner for knowledge-builder drafts | **Demoable** |
| **Publish** | **Save & Re-index** → standard chunking/embedding; document serves RAG | **Demoable** |

**Primary interaction (aligned with roadmaps):** admins trigger generation with **in-app buttons** on the gaps dashboard (single gap or bulk). **Draft review** happens in the **KB editor**; there is **no** required email round-trip for this loop.

**Post-MVP / not required for the core story:** [Sub-plan 4: Rich context pipeline](../ai/roadmaps/2026-04-01-gap-auto-doc-04-context-pipeline.md) (KB + tickets + team chat + expert retrieval + contradiction check) is **planned** — it **deepens draft quality** but does not block claiming the **gap → generate → review → publish** loop. That is the intentional split: **commercial “Phase 1/2” in §14** refers to revenue rollout timing; **the academic deliverable** is the closed loop above plus process evidence, not sub-plan 4.

---

## Table of Contents

0. [Document roles — commercial MVP vs IS 590r course deliverable](#document-roles--commercial-mvp-vs-is-590r-course-deliverable)
1. [MVP Philosophy](#1-mvp-philosophy)
2. [What the MVP Must Prove](#2-what-the-mvp-must-prove)
3. [MVP Scope — What's In](#3-mvp-scope--whats-in)
4. [MVP Scope — What's Out](#4-mvp-scope--whats-out)
5. [MVP User Journey](#5-mvp-user-journey)
6. [Module Detail: Tier 1 (Core)](#6-module-detail-tier-1-core)
7. [Module Detail: Tier 2 (Differentiator)](#7-module-detail-tier-2-differentiator)
8. [Module Detail: Tier 3 (Platform Glue)](#8-module-detail-tier-3-platform-glue)
9. [MVP Exit Criteria](#9-mvp-exit-criteria)
10. [Polish & Hardening Checklist](#10-polish--hardening-checklist)
11. [What to Demo](#11-what-to-demo)
12. [What to Measure](#12-what-to-measure)
13. [First Customer Profile](#13-first-customer-profile)
14. [Post-MVP Expansion Path](#14-post-mvp-expansion-path)

---

## 1. MVP Philosophy

Frantelligence has already built a broad platform. The MVP is not about building more — it's about **focusing** on the tightest possible product experience that:

1. Proves the core value proposition with real customers
2. Generates revenue
3. Produces measurable ROI that fuels case studies and expansion

**The MVP is not the smallest thing we can ship. It's the smallest thing that makes a franchisor say "I can't go back to how we did this before."**

The market research is clear: the wedge is **AI support deflection** — an AI assistant trained on brand documents that absorbs 40–70% of franchisee questions. Everything else is expansion.

### Three-tier MVP structure

| Tier | Purpose | Modules |
|---|---|---|
| **Tier 1 — Core** | The wedge. This is what we sell. | KI Chat + Knowledge Base + Slack/Teams/SMS delivery |
| **Tier 2 — Differentiator** | What makes us sticky and hard to replace. | Financial Health Center (QuickBooks) + Support Tickets |
| **Tier 3 — Platform Glue** | The minimum infrastructure for a functional product. | Auth, billing, settings, user management, role-based access |

---

## 2. What the MVP Must Prove

| Hypothesis | How We Prove It | Target |
|---|---|---|
| **AI can absorb a significant % of franchisee support questions** | Measure KI Chat questions answered vs. tickets filed over 30-day pilot | 40%+ deflection rate |
| **Franchisors will pay for this** | Close 3–5 paying pilot customers at standard pricing | $50+/location/month |
| **Franchisees actually use it** | Track weekly active users and questions per location | 60%+ WAU among invited franchisees |
| **The Slack/Teams/SMS delivery model is a real advantage** | Compare engagement: web-only users vs. multi-channel users | Multi-channel users ask 2x+ more questions |
| **Financial insights create retention** | Measure churn risk: customers with QB connected vs. without | QB-connected customers retain at higher rate |

---

## 3. MVP Scope — What's In

### Tier 1: Core (Must be excellent)

| Module | MVP Scope | Status |
|---|---|---|
| **KI Chat Assistant** | Full RAG pipeline. Organizational + Expert modes. Streaming responses. Citation system. Chat history and session management. Custom system instructions per company. | Built — needs polish pass |
| **Knowledge Base** | Document upload (PDF, DOCX, TXT, MD, CSV, XLSX). Async processing pipeline. Folder organization. Visibility scopes. Version history. | Built — needs polish pass |
| **Slack Integration** | Bot responds in channels and DMs. App home. Member joined notifications. | Built — needs QA pass |
| **Teams Integration** | Bot responds in conversations. OAuth callback flow. | Built — needs QA pass |
| **SMS Integration** | Text-based Q&A with thread tracking. | Built — needs QA pass |

### Tier 2: Differentiator (Must work reliably)

| Module | MVP Scope | Status |
|---|---|---|
| **Financial Health Center** | QuickBooks OAuth connection. Financial data sync. AI-generated monthly reports. Location mapping. Analysis thresholds. | Built — needs polish pass |
| **Support Tickets** | Ticket creation, categories, comments, attachments, status management, email notifications. Ticket analytics for franchisor view. | Built — needs polish pass |

### Tier 3: Platform Glue (Must be solid)

| Module | MVP Scope | Status |
|---|---|---|
| **Auth & Onboarding** | Sign up, sign in, password reset, invite acceptance flow. | Built |
| **User Management** | Invite users by role. Role-based access control. Deactivate/reactivate users. | Built |
| **Billing** | Stripe checkout, subscription management, payment method management, invoicing. Usage gating. Tier upgrades. | Built |
| **Settings** | Company settings, departments, notifications, integration connections (Slack, Teams, QB). AI knowledge base management. | Built |
| **Mobile Responsiveness** | Web app must be usable on mobile (bottom nav, responsive layouts). PWA install prompt. | Built — needs QA pass |

---

## 4. MVP Scope — What's Out

These modules are built but **excluded from the initial commercial MVP pitch, demo, and sales motion** (we lead with KI Chat + KB + channels). They remain accessible in the product behind feature flags or natural navigation. **“Out” here means out of the first sales story — not necessarily unbuilt or out of scope for internal roadmaps or for academic course work** (see [Document roles](#document-roles--commercial-mvp-vs-is-590r-course-deliverable)).

| Module | Why it's out of the *initial pitch* | When it enters the product/revenue roadmap |
|---|---|---|
| **Team Chat** | Not the wedge. Brands already have Slack/Teams. Adding another chat tool dilutes the "meet them where they are" message. | Post-MVP Phase 2 — for brands that don't have Slack/Teams |
| **Onboarding Automation** | Valuable but not the initial sale. Onboarding is a periodic event, not daily usage. Doesn't drive the habit loop. | Post-MVP Phase 2 — natural upsell after KI Chat proves value |
| **Training System** | Already behind feature flag. Requires significant content creation from the franchisor before it's useful. High effort-to-value for initial pilot. | Post-MVP Phase 3 — upsell for brands with employee training needs |
| **Customer Insights / Avatars** | Market research / avatar generation is a different buyer persona (marketing) than our target buyer (operations). Distracts from the core story. | Post-MVP Phase 3 — potential separate product wedge |
| **FranMetrics Integration** | Already behind feature flag. Requires the franchisor to already use FranMetrics. Narrows the addressable market for MVP. | Post-MVP Phase 2 — for brands that use FranMetrics |
| **Document Editor** | Already behind feature flag. Nice-to-have for KB management but not essential for the pilot experience. | Post-MVP Phase 2 — QoL improvement |
| **Source Chunk Preview** | Already behind feature flag. Enhancement to chat experience but not necessary for MVP. | Post-MVP Phase 1 — quick win after launch |
| **Engagement Analytics** | Internal platform admin tool. Useful for us, not for customers. | Build as needed for internal monitoring |
| **Knowledge Gaps Dashboard + Knowledge Builder Agent** | **Sales motion:** Not what we lead with in the first pilot pitch (core wedge is KI Chat + KB). **Roadmap:** Gap detection → dashboard → auto-doc agent in phases ([Gap Auto-Doc / Knowledge Builder feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md)). **IS 590r:** This workstream *is* the defined **course final deliverable** — scoped in that feature plan and `aidocs/` / `knowledge-agent/aiDocs/`, not “ship every module in §3.” | Post-MVP Phase 1 (detection) / Phase 2 (full agent) on the **commercial** timeline; **course work** tracks the same feature area on the academic schedule. |

> **Grader note:** For IS 590r, **`mvp.md` anchors the Knowledge Builder / Knowledge Gaps slice** as the project (see top of this doc). The platform-wide tables in §3 describe Frantelligence’s business MVP, not the course grade boundary.

---

## 5. MVP User Journey

### Journey 1: Franchisor Admin (Buyer)

```
Sign Up (free)
    │
    ▼
Upload 10–20 key documents (SOPs, manuals, FAQ docs)
    │  ← This is the "aha moment" — should take < 30 minutes
    ▼
Test KI Chat with real questions
    │  ← AI answers with citations to their own docs
    ▼
Connect Slack or Teams
    │  ← KI Chat now available where franchisees already work
    ▼
Invite 1 corporate team member ($25/month)
    │  ← Billing starts
    ▼
Invite 3–5 franchisees ($50/location/month)
    │  ← Revenue scales
    ▼
Monitor: Questions answered, tickets filed, deflection rate
    │
    ▼
Connect QuickBooks (Phase 2 expansion)
    │  ← Financial reports start generating. Stickiness increases.
    ▼
Expand: Invite remaining franchisees
```

### Journey 2: Franchisee Owner (End User)

```
Receive invite email
    │
    ▼
Accept invite, set password
    │
    ▼
See KI Chat on home screen
    │  ← First question answered in < 30 seconds
    ▼
Get Slack/Teams notification that KI is available
    │  ← Can now ask questions without leaving Slack/Teams
    ▼
Ask operational questions throughout the week
    │  "What's our food cost target?"
    │  "How do I submit a marketing request?"
    │  "What's the vendor contact for equipment repairs?"
    ▼
File a support ticket when AI can't answer
    │  ← Creates a measurable "deflection miss" data point
    ▼
View financial report (if QuickBooks connected)
    │  ← Monthly AI-generated report with recommendations
```

### Journey 3: Franchisee Employee

```
Receive invite from franchise owner (or access via shared device)
    │
    ▼
Ask KI Chat operational questions
    │  "How do I close out the register?"
    │  "What's the dress code policy?"
    │  "How do I handle a customer complaint?"
    ▼
File support ticket if needed
```

---

## 6. Module Detail: Tier 1 (Core)

### KI Chat Assistant — MVP Requirements

This is the product. Everything else supports it.

**Must-haves for MVP:**

| Requirement | Description | Status |
|---|---|---|
| Natural language Q&A | User asks a question, AI responds conversationally | Done |
| Citations | Every response includes references to source documents | Done |
| Streaming | Responses stream in real-time (SSE) | Done |
| Organizational mode | Answers from the brand's uploaded documents | Done |
| Expert mode | Answers from industry best practices library | Done |
| Deep research | Extended retrieval for complex questions | Done |
| Vision | Attach images for AI analysis | Done |
| Session management | Create, rename, delete, share chat sessions | Done |
| Custom system instructions | Franchisor can tune AI personality and focus areas | Done |
| Refusal detection | AI identifies when it can't confidently answer | Done |
| Usage tracking | Token count + cost logged per interaction | Done |
| Usage gating | Check cost pool before AI operation; prompt upgrade if exceeded | Done |

**MVP polish priorities:**

| Area | What Needs Work |
|---|---|
| First-run experience | Empty state when no documents uploaded — guide user to upload docs |
| Response quality | Audit top 50 common franchise questions against 3–5 test brand KBs. Tune system prompts for accuracy. |
| Citation UX | Ensure citations are clickable and document names are human-readable (not UUIDs) |
| Error states | Handle: no documents uploaded, retrieval returns nothing, AI refuses to answer. Each needs a clear, helpful message. |
| Performance | Chat response should begin streaming within 2 seconds. Full response under 10 seconds for simple questions. |

### Knowledge Base — MVP Requirements

**Must-haves for MVP:**

| Requirement | Description | Status |
|---|---|---|
| Multi-format upload | PDF, DOCX, TXT, MD, CSV, XLSX | Done |
| Async processing | Upload → extract → chunk → embed pipeline via SQS | Done |
| Processing status | User can see when documents are processing vs. ready | Done |
| Folder organization | Create folders, move documents between folders | Done |
| Visibility scopes | Company, corporate, franchisee, owner | Done |
| Version history | View and restore previous versions | Done |
| Delete documents | Remove documents and their chunks | Done |

**MVP polish priorities:**

| Area | What Needs Work |
|---|---|
| Upload UX | Drag-and-drop should feel smooth. Progress indicators during processing. Clear success/failure states. |
| Processing time | Set expectations — "Your document will be ready for KI Chat in 2–5 minutes" |
| Bulk upload | Support uploading 10+ documents at once (initial KB setup) |
| Document preview | User should be able to view uploaded documents in-app |

### Slack / Teams / SMS — MVP Requirements

**Must-haves for MVP:**

| Requirement | Description | Status |
|---|---|---|
| Slack: DM and channel responses | KI responds when mentioned or DM'd | Done |
| Slack: Install flow | One-click install from settings | Done |
| Teams: Conversation responses | KI responds in Teams conversations | Done |
| Teams: Install flow | OAuth callback and manual install guide | Done |
| SMS: Text-based Q&A | Send a text, get an AI answer | Done |
| SMS: Thread tracking | Maintain conversation context | Done |
| Output formatting | Responses formatted appropriately per channel (markdown for Slack, plain for SMS) | Done |

**MVP polish priorities:**

| Area | What Needs Work |
|---|---|
| Slack install reliability | Test end-to-end on a fresh Slack workspace. Ensure permissions and scopes are correct. |
| Teams install reliability | Teams OAuth flow is notoriously fragile. Test with multiple Azure AD tenants. |
| Response latency | Target: first response within 3 seconds for Slack/Teams. SMS can tolerate 5 seconds. |
| Error handling | If AI fails, send a graceful fallback message (not silence). |

---

## 7. Module Detail: Tier 2 (Differentiator)

### Financial Health Center — MVP Requirements

This is the upsell and retention engine.

**Must-haves for MVP:**

| Requirement | Description | Status |
|---|---|---|
| QuickBooks OAuth connection | Connect QB from settings page | Done |
| Financial data sync | Automatic pull of P&L, balance sheet, cash flow | Done |
| Location mapping | Map QB entities to franchisee locations | Done |
| AI-generated monthly reports | Narrative + recommendations per location | Done |
| Analysis thresholds | Franchisor sets alert thresholds (e.g., food cost > 32%) | Done |
| Location-level detail | Drill down to individual location financial report | Done |

**MVP polish priorities:**

| Area | What Needs Work |
|---|---|
| Connection reliability | QB OAuth tokens expire. Ensure refresh flow works silently. Handle expired connections gracefully. |
| Report quality | Audit AI-generated reports for 3–5 test datasets. Ensure recommendations are actionable, not generic. |
| Data freshness | Display when data was last synced. Prompt re-sync if stale. |
| Empty states | Handle: no QB connected, QB connected but no data yet, only 1 month of data (not enough for trends). |

### Support Tickets — MVP Requirements

Tickets serve double duty: (1) actual support workflow and (2) measuring what the AI couldn't answer.

**Must-haves for MVP:**

| Requirement | Description | Status |
|---|---|---|
| Create ticket | With category, priority, description | Done |
| Comment thread | Back-and-forth between franchisee and corporate | Done |
| File attachments | Upload files to tickets | Done |
| Status management | Open → In Progress → Resolved → Closed | Done |
| Email notifications | Notify on new ticket, new comment, status change | Done |
| Department routing | Route tickets to appropriate corporate department | Done |
| Ticket categories | Configurable per company | Done |
| Ticket analytics (franchisor) | Volume by category, resolution time, satisfaction | Done |

**MVP polish priorities:**

| Area | What Needs Work |
|---|---|
| Ticket-to-chat correlation | Can we identify tickets that were filed because the AI couldn't answer? This is the deflection measurement. |
| Notification reliability | Ensure email notifications actually deliver (check spam, formatting, deliverability). |
| Category setup | Provide smart defaults when a company first sets up (e.g., "Operations", "Marketing", "Compliance", "IT/Tech", "Other"). |

---

## 8. Module Detail: Tier 3 (Platform Glue)

### Auth & User Management

| Requirement | Status | Polish Needed |
|---|---|---|
| Sign up / sign in | Done | Ensure error messages are clear (wrong password, account not found, etc.) |
| Password reset | Done | Test full flow including email delivery |
| Invite flow | Done | Test: admin invites → email received → user clicks → account created → correct role assigned |
| Role-based access | Done | Verify all role gates work (franchisor vs. franchisee vs. employee views) |
| Deactivate/reactivate | Done | Verify deactivated users can't log in; reactivated users retain their data |

### Billing

| Requirement | Status | Polish Needed |
|---|---|---|
| Stripe checkout | Done | Test full flow: select plan → Stripe checkout → subscription active |
| Usage gating | Done | Test: hit usage limit → prompt appears → upgrade flow works |
| Tier upgrades | Done | Verify tier upgrade reflects immediately in usage limits |
| Payment method management | Done | Test: add card, update card, remove card |
| Invoice history | Done | Verify invoices are accessible and accurate |
| Free-until-first-invite | Done | Verify admin can explore the full product before inviting anyone |

### Settings

| Requirement | Status | Polish Needed |
|---|---|---|
| Integration connections | Done | Slack, Teams, QuickBooks connection/disconnection flows |
| AI knowledge base management | Done | Document list, upload, delete, visibility management |
| Company settings (departments) | Done | Department CRUD for ticket routing |
| Notification preferences | Done | Verify preferences actually affect notification delivery |
| Custom AI system instructions | Done | Clear UX for franchisor to write instructions. Show preview of how it affects responses. |

---

## 9. MVP Exit Criteria

The MVP is "done" when we can confidently hand the product to a paying customer and they can self-serve through the core journey. Specifically:

### Must-pass gates

| # | Gate | How to Verify |
|---|---|---|
| 1 | **A franchisor can sign up, upload docs, and get accurate AI answers in < 1 hour** | Run this flow with 3 different people who haven't seen the product before. All 3 succeed. |
| 2 | **Slack/Teams integration works end-to-end on fresh workspaces** | Install Slack app on a new workspace. Ask a question in a channel. Get a correct, cited answer. Repeat for Teams. |
| 3 | **A franchisee can accept an invite, ask a question, and file a ticket** | Send an invite to a test email. Accept it. Ask KI a question. File a ticket. Verify the franchisor sees the ticket. |
| 4 | **Billing works: checkout → subscription → usage gating → upgrade** | Full billing lifecycle test with Stripe test mode. |
| 5 | **QuickBooks connects and generates a report** | Connect a QB sandbox account. Sync data. Verify a monthly report generates with actionable content. |
| 6 | **No critical bugs in the core flow** | 48 hours of internal dog-fooding with zero P0/P1 bugs in Tier 1 modules. |
| 7 | **Performance targets met** | Chat response streams within 2 seconds. Page loads under 3 seconds. Document processing completes within 5 minutes. |

---

## 10. Polish & Hardening Checklist

Prioritized list of work to get from "built" to "MVP-ready."

### P0 — Must fix before any customer pilot

- [ ] **First-run experience**: When a franchisor signs up with zero documents, the home screen should guide them to upload docs — not show an empty chat.
- [ ] **Document upload reliability**: Test upload of 20 documents in sequence. Ensure all process successfully. Handle failures gracefully.
- [ ] **Slack install flow**: End-to-end test on fresh workspace. Fix any OAuth scope or permission issues.
- [ ] **Teams install flow**: End-to-end test with fresh Azure AD tenant. Document the manual install path clearly.
- [ ] **Billing flow**: Full Stripe checkout → subscription → usage gating → upgrade test in production-like environment.
- [ ] **Mobile responsiveness**: Core flows (chat, tickets) must work on iPhone and Android mobile browsers.
- [ ] **Error handling audit**: Identify and fix silent failures in chat, document processing, and integrations. Every error should produce a user-visible message.

### P1 — Should fix before expanding beyond first 3 pilots

- [ ] **AI response quality audit**: Run the top 50 common franchise questions against 3 test KBs. Measure accuracy. Tune system prompts.
- [ ] **Citation UX**: Ensure document names are human-readable. Citations should be clickable and open the source.
- [ ] **QuickBooks token refresh**: Verify silent token refresh works. Handle expired connections with a clear re-connect prompt.
- [ ] **Financial report quality**: Audit AI-generated reports against real QB data. Ensure recommendations are specific, not boilerplate.
- [ ] **Email notification deliverability**: Send test notifications from production. Check deliverability across Gmail, Outlook, Yahoo.
- [ ] **Settings page UX**: Ensure integration connection statuses are clear (connected/disconnected/error).

### P2 — Nice to have for MVP

- [ ] **Deflection measurement**: Build a simple metric: (KI Chat questions answered) / (KI Chat questions + tickets filed) = deflection rate. Display in franchisor dashboard.
- [ ] **Onboarding wizard**: Guided setup flow: "Step 1: Upload documents → Step 2: Test KI Chat → Step 3: Connect Slack → Step 4: Invite your first franchisee."
- [ ] **Demo mode / sample data**: Pre-loaded sample documents so prospects can see how KI Chat works before uploading their own.
- [ ] **Branded email templates**: Invitation and notification emails should look professional and branded, not default Supabase.

---

## 11. What to Demo

The demo is the sales tool. It should be tight, focused, and compelling. 10 minutes max.

### Demo Script (10 minutes)

**Minute 0–1: The Problem**
> "How many hours per week does your team spend answering the same franchisee questions? What if 60% of those were answered instantly, correctly, by an AI that actually knows your brand?"

**Minute 1–3: Upload & Chat**
- Show uploading 3–5 documents (SOP, FAQ, compliance guide)
- Wait for processing (or use pre-loaded demo)
- Ask KI Chat a real question from those documents
- Show the answer with citations back to the source document

**Minute 3–5: Slack/Teams Delivery**
- Switch to Slack
- Ask KI a question in a channel
- Show the answer appears right where franchisees already work
- "No new portal. No new login. Just answers."

**Minute 5–7: Support Tickets**
- Ask KI a question it can't answer
- Show filing a ticket directly from the app
- Show the franchisor view: ticket appears with category and priority
- "Now you know exactly what your AI doesn't cover yet."

**Minute 7–9: Financial Health (if buyer shows interest)**
- Show QuickBooks connection
- Show an AI-generated monthly financial report
- Show location comparison / health scores
- "You see which locations need attention before they miss a payment."

**Minute 9–10: Pricing & Next Steps**
- Show pricing: $25/seat corporate, $50/location franchisee, employees free
- "Upload your docs this afternoon. Connect Slack. Your franchisees are getting answers by tomorrow."

---

## 12. What to Measure

### Pilot success metrics (30-day evaluation)

| Metric | Definition | Success Threshold |
|---|---|---|
| **Deflection rate** | KI questions / (KI questions + tickets) | >40% |
| **Weekly active users** | Unique users who interact with the product per week | >60% of invited users |
| **Questions per location/week** | Average KI Chat questions per franchisee location | >5 |
| **Time to first question** | Time from invite acceptance to first KI Chat question | <24 hours |
| **Multi-channel adoption** | % of users who ask questions via Slack/Teams/SMS (not just web) | >30% |
| **Franchisor NPS** | Net Promoter Score from franchisor admin | >40 |
| **Franchisee NPS** | Net Promoter Score from franchisee users | >30 |

### Internal health metrics

| Metric | Target |
|---|---|
| AI response latency (time to first token) | <2 seconds |
| AI response accuracy (manual audit) | >85% correct on audited sample |
| Document processing success rate | >98% |
| Slack/Teams message delivery rate | >99% |
| Uptime | >99.5% |

---

## 13. First Customer Profile

### Ideal first 3–5 pilots

| Attribute | Target |
|---|---|
| **Brand size** | 20–100 locations (big enough to feel pain, small enough to move fast) |
| **Vertical** | Food & beverage or personal services (high franchisee question volume) |
| **Current tools** | Google Drive + email + Slack. No FranConnect or enterprise platform. |
| **Champion** | VP of Operations or Director of Franchise Support — someone who personally feels the support burden |
| **Urgency** | Recently hired support staff OR recently lost franchisee satisfaction scores |
| **Tech comfort** | Comfortable with SaaS tools. Uses Slack or Teams daily. |

### Disqualifying attributes

| Attribute | Why |
|---|---|
| Already on FranConnect | Rip-and-replace is too hard for MVP. Target greenfield. |
| <10 locations | Not enough scale to feel the pain. ROI story doesn't land. |
| >500 locations | Enterprise sales cycle too long for MVP. Need faster feedback loops. |
| No existing documentation | KI Chat needs documents to be useful. If they have zero SOPs, the AI has nothing to learn from. |
| Buyer is marketing, not operations | Our MVP is operations-focused. Marketing buyer wants different things. |

---

## 14. Post-MVP Expansion Path

Once MVP is proven with 3–5 paying pilots and we have deflection rate data + NPS scores:

### Phase 1: Deepen the Wedge (Month 1–3 post-launch)

| Initiative | Purpose |
|---|---|
| Support deflection dashboard | Show franchisors their ROI in real numbers |
| Knowledge gap detection & dashboard | AI flags what the KB is missing — franchisor sees gaps ranked by frequency |
| Source chunk preview (feature flag flip) | Better citation UX in chat responses |
| Proactive AI digest | Weekly email/Slack summary: "Here's what your franchisees asked this week" |

### Phase 2: Expand the Platform (Month 3–6 post-launch)

| Initiative | Purpose |
|---|---|
| Onboarding automation | Natural upsell for brands opening new locations |
| FranMetrics integration (feature flag flip) | Deeper financial analytics for brands that use FranMetrics |
| Document editor (feature flag flip) | Better KB management without leaving the platform |
| Gap Auto-Doc agent + admin review | AI drafts KB documents from gap clusters, admins approve/reject/publish |
| Team Chat positioning | Offer to brands that don't have Slack/Teams as their built-in alternative |

### Phase 3: Full Platform (Month 6–12 post-launch)

| Initiative | Purpose |
|---|---|
| Training system (feature flag flip) | Employee training for brands with high turnover |
| AI-powered ticket routing | Automatic categorization and assignment |
| Proactive financial alerts | Push notifications when metrics cross thresholds |
| Multi-brand support | Franchise groups managing multiple brands |
| Customer insights / avatars | Separate value prop for marketing-minded buyers |

---

## Summary

**Commercial MVP:** The product MVP is **KI Chat + Knowledge Base + Slack/Teams/SMS + QuickBooks Financial Health + Support Tickets**, backed by solid auth, billing, and settings infrastructure.

Everything else is built and waiting behind feature flags or phased rollout. The discipline is in **not selling everything at once** — leading with the sharpest wedge (AI support deflection), proving ROI in 30-day pilots, and expanding from a position of demonstrated value.

**IS 590r:** The **Knowledge Builder Agent** (knowledge gaps visibility + phased documentation workflow per the feature plan) is the **course-project anchor**; see [Document roles](#document-roles--commercial-mvp-vs-is-590r-course-deliverable) at the top of this document.

**One sentence MVP pitch (commercial):**
> Upload your brand documents. Connect Slack. Your franchisees get instant, accurate AI answers — and you see exactly what they're asking and what the AI can't yet handle.
