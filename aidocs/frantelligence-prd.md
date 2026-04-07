# Frantelligence — Product Requirements Document

> **Version**: 1.1
> **Last Updated**: April 6, 2026
> **Status**: Living document
> **Recent change:** v1.1 — No rewrite of the full PRD; added **Since midterm** summary below so graders see doc evolution (aligns with IS 590r “living artifacts” expectation). Canonical product detail unchanged; see also [MVP](../docs/mvp.md) v1.2 for course vs commercial scope.

---

## Since midterm (Feb 2026 baseline → April 2026)

*Midterm* here means the documentation snapshot represented by the original Feb 17, 2026 **Version 1.0** PRD/MVP suite and course submission. **What deepened after that:**

- **Knowledge Builder Agent** — Feature plan + sub-plans treated as **verified against the repo** (gap detection UI, `POST /api/v1/kb/generate-from-gaps`, KB editor source banner, publish path). Rich “context pipeline” ([sub-plan 4](../ai/roadmaps/2026-04-01-gap-auto-doc-04-context-pipeline.md)) remains **planned** quality work, not a prerequisite for the closed loop.
- **Knowledge Builder — current UX (April 2026)** — The **shipped** loop is **in-app, button-driven**: franchisor admin opens **What Users Are Asking** → **Generate Doc** on **one** gap card or **bulk** for the filtered set → draft in **AI Generated** → **KB editor** (source banner) → **Save & Re-index**. **Outbound email is not** the primary or required path to create or review drafts for this feature; [sub-plan 03](../ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md) explicitly scopes **toast + editor** as sufficient. (Other product emails — invites, tickets — remain unrelated.)
- **Course vs product scope** — [MVP](../docs/mvp.md) now opens with **Document roles**: commercial MVP (what we sell) vs **IS 590r anchor** (Knowledge Builder slice). **Not** a PRD pivot; a **grading-boundary clarification** so the course deliverable is unambiguous.
- **Process artifacts** — `ai/changelog.md` (2026-04-06) and [Knowledge Builder feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md) updated with dates and checklist state so planning docs match implementation.
- **AI-assisted iteration (rubric)** — Full narrative: [IS 590r rubric evidence](./is590r-rubric-evidence.md) (planning tools, iteration, Jason sections, demo).

**This PRD body** below remains the long-form product definition; incremental KB/API details continue to live in architecture, roadmaps, and MVP.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Market Opportunity](#3-market-opportunity)
4. [Competitive Landscape](#4-competitive-landscape)
5. [Target Customer](#5-target-customer)
6. [Product Vision & Positioning](#6-product-vision--positioning)
7. [User Roles & Personas](#7-user-roles--personas)
8. [Multi-Tenant Architecture](#8-multi-tenant-architecture)
9. [Core Product Modules](#9-core-product-modules)
10. [Integrations](#10-integrations)
11. [AI Architecture](#11-ai-architecture)
12. [Billing & Monetization](#12-billing--monetization)
13. [Technology Stack](#13-technology-stack)
14. [Security & Data Isolation](#14-security--data-isolation)
15. [Feature Flags & Rollout Strategy](#15-feature-flags--rollout-strategy)
16. [Success Metrics](#16-success-metrics)
17. [Risks & Mitigations](#17-risks--mitigations)
18. [Go-to-Market Strategy](#18-go-to-market-strategy)
19. [Roadmap](#19-roadmap)

---

## 1. Executive Summary

**Frantelligence** is an AI-first franchise operations platform that serves as a 24/7 field coach for franchise networks. It combines a RAG-powered AI assistant, financial health analytics, team communication, support ticketing, onboarding automation, and employee training into a single multi-tenant SaaS platform purpose-built for the franchisor-franchisee relationship.

The product targets small-to-mid-market (SMID) franchise brands with 10–500 locations that currently operate on fragmented tools — spreadsheets, email, Slack, basic LMS — and need an intelligent, unified platform without the cost or complexity of enterprise solutions like FranConnect.

**Core thesis**: Franchise networks don't need more dashboards. They need direction. Frantelligence delivers prescriptive, AI-driven guidance embedded in the tools franchisees already use (Slack, Teams, SMS) and backed by the brand's own documents and financial data.

---

## 2. Problem Statement

### The franchise operations gap

Franchise networks face a structural communication and operations challenge: a central brand (franchisor) must maintain consistency, compliance, and performance across dozens to hundreds of independently operated locations (franchisees), each with their own staff, finances, and local conditions.

### Pain points by stakeholder

**Franchisors (Corporate)**
- **Repetitive support burden**: Corporate teams answer the same 50–100 questions from franchisees week after week — about brand standards, SOPs, marketing rules, compliance, vendor contacts. This is expensive, slow, and doesn't scale.
- **Blind spots on financial health**: Franchisors often lack real-time visibility into franchisee financial performance until a location is already in trouble. Data lives in disconnected QuickBooks instances and spreadsheets.
- **Inconsistent onboarding**: Opening a new franchise location involves hundreds of tasks across months. Without a structured system, steps get missed, timelines slip, and the franchisee experience varies wildly.
- **Training at scale is broken**: In-person training doesn't scale. PDF manuals don't get read. There's no way to verify employees actually completed training or understood the material.
- **Fragmented tools**: Most mid-market franchisors cobble together Google Drive + email + Slack + a basic LMS + spreadsheets. Nothing talks to anything else. Data is siloed.

**Franchisees (Location Owners & Employees)**
- **Can't find answers fast**: The operations manual is a 200-page PDF buried in Google Drive. Calling corporate means waiting on hold or sending an email that takes days to get answered.
- **No financial guidance**: Franchisees know their revenue and costs but don't know how they compare to peers, what's trending the wrong direction, or what to do about it.
- **Onboarding feels chaotic**: New franchisees get a checklist in a spreadsheet and a lot of phone calls. There's no single place to see "what do I need to do next?"
- **Employee turnover amplifies everything**: High turnover in franchise locations means constant retraining, repeated questions, and inconsistent customer experiences.

### The cost of the status quo

- A franchisor with 100 locations and a 4-person support team answering franchisee questions spends ~$300K–$500K/year on reactive support alone.
- A single failed franchise location can cost a brand $50K–$200K+ in lost franchise fees, legal costs, and reputational damage — often preventable with earlier intervention.
- Franchisee satisfaction surveys consistently cite "lack of support from corporate" as a top concern, directly impacting renewal rates and franchise sales.

---

## 3. Market Opportunity

*Source: [Frantelligence Market Research](../ai/guides/frantelligence-market-research.md) — compiled from Perplexity deep research, February 2026.*

### Industry size

| Metric | Value | Source |
|---|---|---|
| U.S. franchise economic output (2025) | ~$936 billion | IFA |
| U.S. franchise establishments | ~851,000 | IFA |
| U.S. franchise jobs | 9+ million | IFA |
| Franchise contribution to U.S. GDP | ~3% | IFA |
| Annual franchise unit growth rate | 2–2.5% (~20,000 new locations/year) | Multiple |
| Global franchise brands | 3,000+ | Franzy |

### Software market

| Metric | Value |
|---|---|
| Franchise management software market (2034 projected) | ~$4.5 billion |
| Software market CAGR | ~10.2% |
| Franchisor AI adoption intent (within 3 years) | 60% (Deloitte 2024 survey) |

### Serviceable addressable market

Frantelligence targets brands with 10–500 locations. Conservatively, approximately one-third of the 851,000 U.S. franchise units fall within brands in this range, implying a serviceable market of ~200,000+ locations in the U.S. alone.

At an average revenue per location of $50–$100/month (franchisee tier pricing), the U.S. SAM for the franchisee-side alone is $120M–$240M ARR, before counting franchisor-side revenue or international expansion.

### Tailwinds

- **Franchise sector growing faster than GDP** (4.4–5% vs. ~2%)
- **AI demand is explicit, not hypothetical** — 60% of franchisors planning adoption within 3 years
- **Cloud adoption accelerating** — mid-market brands moving off legacy on-premise tools
- **Pain points validated by incumbents** — FranConnect, Franchise Systems AI, and industry analysts all emphasize the same problems Frantelligence solves

---

## 4. Competitive Landscape

### Direct competitors

| Player | Primary Angle | Strengths | Gaps vs. Frantelligence |
|---|---|---|---|
| **FranConnect + Frannie AI** | Enterprise suite + embedded AI agents | Largest installed base (1,500+ brands, ~1M locations), deep data model, breadth of modules | Heavy and expensive; enterprise-grade sales cycle; AI is portal-only (not embedded in Slack/Teams/SMS); slower for mid-market brands |
| **Franchise Systems AI** | AI-powered "franchise OS" for marketing, sales, ops | Full lifecycle focus from applicant funnel through operations; strong marketing automation | Portal-centric UX; less "field coach" framing; unclear RAG depth on brand-specific documents |
| **Harmonyize** | AI-driven franchise operating system (launched Aug 2024) | Early mover on AI-first franchise ops; automation + compliance focus | Newer entrant; unclear market traction; limited public feature detail |

### Adjacent competitors

| Player | Type | Relevance |
|---|---|---|
| **Trainual / PlayerlynX** | Franchise training platforms | Point solutions for training only; no AI chat, no financial analytics, no unified ops |
| **Guru / Glean / Notion AI** | Horizontal AI knowledge tools | Powerful but not franchise-specific; no multi-tenant franchisor/franchisee model; no financial integrations |
| **Byte by Yum** | Custom enterprise AI (Yum! Brands) | Shows top-end brands will build in-house; validates the category but reduces TAM at the very top |
| **AWS / custom ML stacks** | Build-your-own AI ops | Flexible but requires heavy IT/consulting; not franchise-specific UX |

### Frantelligence differentiation

1. **AI meets franchisees where they are**: KI Chat is accessible via Slack, Teams, SMS, and the web app. Competitors force users into a separate portal.
2. **RAG on actual brand documents**: Not a generic chatbot — the AI is trained on each brand's uploaded SOPs, manuals, and compliance docs, with citations back to sources.
3. **Financial coaching from real data**: Direct QuickBooks and FranMetrics integration with AI-generated reports, peer benchmarking, and location health scores. No competitor in the mid-market combines AI chat + financial analytics.
4. **Built for the mid-market**: Self-serve onboarding, per-location pricing, no consultants or 6-month implementations. A brand can be live in days.
5. **All-in-one platform reduces tool sprawl**: Chat + financials + team messaging + tickets + training + onboarding in one system with a single data model.

---

## 5. Target Customer

### Primary: SMID Franchisors (10–500 locations)

**Profile:**
- VP of Operations, Director of Franchise Support, or Founder/CEO at a growing franchise brand
- Currently using fragmented tools (Google Drive, email, Slack, basic LMS, spreadsheets)
- Does not have FranConnect or similar enterprise platform in place
- Feeling the pain of scaling support as location count grows
- Interested in AI but doesn't have in-house engineering to build custom solutions

**Verticals with highest fit:**
- Food & beverage (QSR, fast casual, coffee)
- Personal services (fitness, salons, cleaning, home services)
- Health & wellness (clinics, physical therapy, dental)
- Retail services (auto repair, pet care, tutoring)

**Buying triggers:**
- "We hired two more people just to answer franchisee questions and we still can't keep up"
- "We have no idea which locations are struggling financially until they miss a royalty payment"
- "Our onboarding process is a mess — every new franchisee has a different experience"
- "Our franchisees keep asking us the same questions over and over"

### Secondary: Individual Franchisees

- Location owners who want better tools even if corporate hasn't adopted yet
- Especially multi-unit franchisees managing 2–10+ locations who need operational leverage
- Entry point for bottom-up adoption that can lead to system-wide franchisor deals

---

## 6. Product Vision & Positioning

### Vision

Every franchise network has an AI-powered field coach that knows their brand inside and out — one that's available 24/7, speaks the franchisee's language, and turns data into direction.

### Positioning Statement

For mid-market franchise brands (10–500 locations) that struggle with fragmented tools and scaling support, Frantelligence is the AI-first operations platform that combines a brand-trained AI assistant, financial health coaching, team communication, and operations automation into a single system — delivering direction, not dashboards.

### Key messaging pillars

1. **"Your brand's AI, trained on your documents"** — KI Chat absorbs your SOPs, manuals, and playbooks, then answers franchisee questions instantly with citations.
2. **"Direction, not dashboards"** — AI-driven financial coaching tells you what to do, not just what happened.
3. **"Meet franchisees where they are"** — Available in Slack, Teams, SMS, and the web app. No new portal to learn.
4. **"One platform, one data model"** — Replace 5–7 fragmented tools with one system that actually connects the dots.

---

## 7. User Roles & Personas

### Role hierarchy

| Role | Canonical Key | Access Level | Billing |
|---|---|---|---|
| **Franchisor Admin** | `franchisor_admin` | Full company access. Manage all settings, users, documents, operations. | $25/month per seat |
| **Corporate Employee** | `franchisor_employee` | Company-wide read access. Same functional permissions as admin. | $25/month per seat |
| **Multi-Unit Franchisee** | `multi_unit_franchisee` | Full access to multiple owned locations. 10% multi-location discount. | $50/month base per location |
| **Franchisee Owner** | `franchisee` | Full access to own location. Manage own staff, view own financials. | $50/month base per location |
| **Franchisee Employee** | `franchisee_employee` | Basic location access. Can use AI chat, view assigned training, submit tickets. | Free (included in location cost pool) |

### Permissions

| Permission | franchisor_admin | franchisor_employee | multi_unit_franchisee | franchisee | franchisee_employee |
|---|---|---|---|---|---|
| View brand-wide data | Yes | Yes | No | No | No |
| Manage brand settings | Yes | Yes | No | No | No |
| Manage users (brand-wide) | Yes | Yes | No | No | No |
| View own location(s) data | Yes | Yes | Yes | Yes | Yes |
| Manage own location | N/A | N/A | Yes | Yes | No |
| Manage location users | N/A | N/A | Yes | Yes | No |
| Use AI assistant | Yes | Yes | Yes | Yes | Yes |
| View financial insights | Yes | Yes | Yes | Yes | No |
| Access operations dashboard | Yes | Yes | No | No | No |
| Access franchisee ops | No | No | Yes | Yes | Yes |

---

## 8. Multi-Tenant Architecture

### Three-level hierarchy

```
Company (franchisor brand)
├── Franchisee A (location)
│   ├── Owner
│   ├── Employee 1
│   └── Employee 2
├── Franchisee B (location)
│   ├── Owner
│   └── Employee 1
└── Corporate Team
    ├── Admin 1
    └── Employee 1
```

### Data isolation

- **`company_id`**: Top-level tenant key. All data is scoped to a company. No cross-company data access.
- **`franchisee_id`**: Location-level scope. Franchisees see only their own data.
- **`user_id`**: Individual user scope for personal content.
- **Row-Level Security (RLS)**: Enforced at the database level on all tables via Supabase PostgreSQL policies.

### Document visibility scopes

| Scope | Key | Who Can See | Use Case |
|---|---|---|---|
| Organization | `company` | Everyone in the company | Brand-wide SOPs, general policies |
| Corporate | `corporate` | Franchisor admins and employees only | Internal corporate docs, strategy |
| Location | `franchisee` | Specific franchisee(s) only | Location-specific procedures, local compliance |
| Owner | `owners` | Specific user(s) only | Private drafts, sensitive documents |

---

## 9. Core Product Modules

### 9.1 KI Chat Assistant

The central product experience. A RAG-powered AI assistant trained on each brand's uploaded knowledge base.

**Capabilities:**
- Natural language Q&A with citations back to source documents
- Two modes: **Organizational** (brand-specific knowledge) and **Expert** (industry best practices)
- **Deep research mode** for complex questions requiring extended retrieval
- **Vision support** — attach images (photos of equipment, signage, etc.) for AI analysis
- **Streaming responses** via Server-Sent Events for real-time feel
- **Shareable chat sessions** via public links
- **Custom system instructions** per company — each brand can tune the AI's personality and focus
- **Chat history** with session management (create, rename, delete, share)

**Multi-channel delivery:**
- Web app (primary)
- Slack integration (bot responds in channels and DMs)
- Microsoft Teams integration (bot responds in conversations)
- SMS integration (text-based Q&A)

**Knowledge base:**
- Multi-format document upload: PDF, DOCX, TXT, MD, CSV, JSON, XLSX
- Automatic processing pipeline: text extraction → semantic chunking → vector embeddings
- Folder organization for document management
- Version history with restore capability
- In-app document editor (feature flag: `documentEditor`)
- Visibility-scoped documents (company, corporate, franchisee, owner)
- Expert mode library — curated industry best practices content

**AI pipeline:**
1. User sends question
2. Hybrid retrieval: vector similarity search (pgvector) + keyword search (PostgreSQL full-text)
3. Cohere reranking of retrieved chunks
4. Context assembly within token budget (7,000 tokens standard, 9,000 deep research)
5. LLM completion via OpenRouter (Claude Sonnet 4.5)
6. Citation processing — AI responses include references to source documents
7. Usage tracking logged to cost pool for billing

### 9.2 Financial Health Center

AI-powered financial analytics that turns QuickBooks and KPI data into actionable guidance.

**QuickBooks Integration:**
- OAuth-based connection to QuickBooks Online
- Automatic sync of financial data (P&L, balance sheet, cash flow)
- Location-to-QuickBooks mapping for multi-location brands
- Configurable analysis thresholds (e.g., "alert me if food cost exceeds 32%")
- AI-generated monthly financial reports per location

**FranMetrics Integration (feature flag: `franmetrics`):**
- API connection to FranMetrics platform
- KPI data import per location per month
- AI-powered KPI classification and weighting
- Peer benchmarking engine — compares each location against its peers
- Location diagnostics — identifies issues and opportunities
- Health scores and rankings — ranks locations by overall financial health
- Drill-down to location-level detail with KPI breakdowns

**Reports & Insights:**
- Monthly financial reports with AI narrative and recommendations
- Location comparison dashboards
- Trend analysis and anomaly detection
- "What to do this week" actionable recommendations

### 9.3 Team Chat

Built-in Slack-style messaging for franchise network communication.

**Features:**
- Public and private channels with member management
- Direct messages (1:1 and group)
- Threaded conversations with reply tracking
- Emoji reactions
- Channel bookmarks and starring
- @mention notifications
- Real-time updates via Supabase realtime subscriptions
- File sharing within conversations

**Why built-in (not just Slack)?**
- Multi-tenant data isolation — messages stay within the company
- Role-based visibility — some channels can be corporate-only or location-specific
- Integrated with the rest of the platform — no context switching
- Franchisees who don't use Slack/Teams still get a team communication tool

### 9.4 Support Ticketing

Structured support workflow between franchisees and corporate.

**Features:**
- Ticket creation with categories and priority
- Comment threads with @mentions
- File attachments on tickets
- Department-based routing (corporate can organize teams into departments)
- Status management (open, in progress, resolved, closed)
- Satisfaction ratings after resolution
- Email notifications on ticket updates
- SLA tracking

**Analytics (franchisor view):**
- Ticket volume by category, location, and time period
- Resolution time analytics
- Satisfaction score trends
- Top question categories — identifies patterns for knowledge base improvement

### 9.5 Onboarding Automation

Structured new-franchisee onboarding with checklist-based workflows.

**Franchisor (master checklist):**
- Define onboarding phases (e.g., Pre-Opening, Training, Soft Launch, Grand Opening)
- Create tasks within phases with descriptions, due dates, and dependencies
- Group tasks by functional area (operations, marketing, build-out, etc.)
- Assign onboarding templates to new franchisees

**Franchisee (personal checklist):**
- View assigned onboarding checklist with progress tracking
- Mark tasks complete with evidence/notes
- Calendar view of upcoming milestones
- Target open date tracking

**Franchisor (tracker):**
- Dashboard showing all franchisees' onboarding progress
- Filter by phase, status, target date
- Identify bottlenecks and at-risk locations

### 9.6 Training System (feature flag: `training`)

Video-based employee training with verification and progress tracking.

**Franchisor (content creation):**
- Create training programs with videos and tasks
- Organize into categories
- Assign trainings to specific roles (e.g., "Front of House", "Kitchen", "Manager")
- Set required vs. optional trainings

**Franchisee (management):**
- Assign trainings to employees
- Track watch progress per employee per video
- Task completion verification with manager PIN
- Team training dashboard showing completion rates

**Public Training Portal:**
- Accessible via access codes (no login required)
- Branded training experience
- Progress tracking even for unauthenticated users
- Useful for pre-hire or pre-opening training

### 9.7 Customer Insights & Market Analysis

AI-driven customer intelligence from review data and market analysis.

**Features:**
- Google My Business integration for review data
- AI sentiment analysis on customer reviews
- Customer avatar generation (demographics, psychographics, behaviors, goals)
- Brand-level avatar aggregation
- Knowledge gap analysis — identifies what the AI doesn't know yet
- Research session tracking for iterative analysis

### 9.8 Engagement Analytics (Platform Admin)

Internal analytics for Frantelligence's own team to monitor platform health.

**Features:**
- Usage tracking across all companies
- Sales ammunition — data points for prospect conversations
- Platform quality metrics
- At-risk company identification
- Daily/weekly/monthly aggregate reporting

---

## 10. Integrations

| Integration | Type | Purpose | Status |
|---|---|---|---|
| **Slack** | Bi-directional | KI Chat in Slack channels/DMs; webhook events for mentions and messages | Shipped |
| **Microsoft Teams** | Bi-directional | KI Chat in Teams conversations; bot event handling | Shipped |
| **SMS** | Bi-directional | KI Chat via text messages; thread-based conversations | Shipped |
| **QuickBooks Online** | OAuth + Data Sync | Financial data import, AI-generated reports, location mapping | Shipped |
| **FranMetrics** | API + Data Sync | KPI import, peer benchmarking, health scores, location diagnostics | Shipped (feature flag) |
| **Google Drive** | OAuth + Import | Document import for knowledge base | Shipped |
| **OneDrive** | OAuth + Import | Document import for knowledge base | Shipped |
| **Google My Business** | API | Review data import for customer insights | Shipped |
| **Stripe** | Payments | Subscription billing, checkout, invoices, customer portal | Shipped |
| **LangFuse** | Observability | AI trace tracking, usage/cost monitoring, quality metrics | Shipped |
| **Cohere** | AI | Reranking of retrieved document chunks | Shipped (optional) |
| **OpenRouter** | AI | LLM chat completions, embeddings | Shipped |
| **AWS S3** | Storage | Document storage, chat file attachments (24h TTL) | Shipped |
| **AWS SQS** | Queue | Async document processing pipeline | Shipped |

---

## 11. AI Architecture

### Models

| Function | Model | Provider |
|---|---|---|
| Chat completion (default) | Claude Sonnet 4.5 | OpenRouter (Anthropic) |
| Text formatting | Claude Sonnet 4.5 | OpenRouter (Anthropic) |
| Embeddings | text-embedding-3-small | OpenRouter (OpenAI) |
| Vision / OCR | Gemini 2.5 Flash | OpenRouter (Google) |
| Reranking | rerank-english-v3.0 | Cohere |

### RAG Pipeline

```
User Query
    │
    ▼
┌─────────────────────────┐
│  Hybrid Retrieval       │
│  ├── Vector search      │  pgvector similarity (threshold: 0.15, top 25)
│  └── Keyword search     │  PostgreSQL full-text search (top 12)
└─────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  Reranking              │  Cohere rerank-english-v3.0 (optional)
│  └── Fallback:          │  Similarity-based sorting
└─────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  Context Assembly       │  Token budget: 7,000 (standard) / 9,000 (deep research)
│  └── Max items: 12/15   │  Multi-tenant visibility filtering applied
└─────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  LLM Completion         │  Claude Sonnet 4.5 via OpenRouter
│  ├── Custom system      │  Per-company AI instructions
│  ├── Citation gen       │  References to source documents
│  └── Refusal detection  │  Identifies when AI can't answer
└─────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  Response Delivery      │  SSE streaming (web) / formatted text (Slack/Teams/SMS)
│  └── Usage tracking     │  Token count + cost → cost pool → billing
└─────────────────────────┘
```

### Document Processing Pipeline

```
Upload (PDF, DOCX, TXT, etc.)
    │
    ▼
Text Extraction (per format)
    │
    ▼
Semantic Chunking
    │
    ▼
Embedding Generation (text-embedding-3-small)
    │
    ▼
Store in document_chunks (pgvector)
    │
    ▼
Available for RAG retrieval
```

Processing is async via AWS SQS with a dedicated document worker service.

### Resilience

- **Background completion safety net**: If SSE connection drops mid-response, a background service polls and completes the generation
- **Embedding fallback**: OpenAI direct API if OpenRouter fails
- **Retry logic**: Exponential backoff on all external API calls
- **Graceful degradation**: LangFuse observability is optional; platform works without it
- **In-memory caching**: User profiles (5 min TTL), company AI settings (10 min TTL), usage gates (5 min TTL)

---

## 12. Billing & Monetization

### Pricing model

**Per-user, margin-based tier pricing with automatic upgrades.**

| User Type | Base Price | Billing Trigger |
|---|---|---|
| Franchisor Admin | $25/month | First invite (free until then) |
| Corporate Employee | $25/month per seat | On invite |
| Franchisee Owner | $50/month per location | On invite |
| Multi-Unit Franchisee | $50/month per location (10% discount for 2+ locations) | On invite |
| Franchisee Employee | Free | Included in location cost pool |

### Tier system

Each user/location has a **cost pool** that tracks AI usage. When usage exceeds the margin threshold for the current tier, the system prompts an upgrade.

**Franchisor Tiers:**

| Tier | Price | Margin | AI Budget Implication |
|---|---|---|---|
| Starter | $25/month | 80% | ~$5 AI cost allowed |
| Growth | $40/month | 75% | ~$10 AI cost allowed |
| Pro | $60/month | 70% | ~$18 AI cost allowed |

**Franchisee Tiers:**

| Tier | Price | Margin | AI Budget Implication |
|---|---|---|---|
| Starter | $50/month | 80% | ~$10 AI cost allowed |
| Growth | $65/month | 75% | ~$16.25 AI cost allowed |
| Pro | $80/month | 70% | ~$24 AI cost allowed |
| Enterprise | $100/month | 65% | ~$35 AI cost allowed |

### Billing mechanics

- **Stripe** powers all checkout, subscriptions, invoicing, and payment management
- **Usage gating**: Before every AI operation, the system checks the user's cost pool against their tier threshold. If exceeded, the user is prompted to upgrade.
- **Cost tracking**: Every AI interaction logs token count and estimated cost to the user's cost pool
- **Franchise-friendly**: Franchisee employees are free — the location owner's subscription covers all employee usage

### Revenue model

- **Land**: Franchisor admin signs up (free until first invite). Invites corporate team ($25/seat) and franchisees ($50/location).
- **Expand**: As AI usage grows, tiers auto-upgrade. More locations onboarded = more per-location revenue.
- **Retain**: Financial insights, knowledge base depth, and team chat history create switching costs.

---

## 13. Technology Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Component library | shadcn/ui (Radix UI primitives) |
| State management | TanStack React Query + React Context |
| Routing | React Router DOM 6 |
| Rich text editor | TipTap |
| Payments UI | Stripe React |
| Document processing (client) | PDF.js, Mammoth (DOCX), Tesseract.js (OCR) |
| Real-time | Supabase Realtime subscriptions |
| PWA | Service worker with install prompt |

### Backend

| Layer | Technology |
|---|---|
| API framework | FastAPI (Python 3.11+, fully async) |
| Database | Supabase (PostgreSQL + pgvector) |
| Auth | Supabase Auth (JWT) |
| Edge functions | Deno + TypeScript (Supabase Functions) |
| AI / LLM | OpenRouter API (Claude, GPT, Gemini) |
| Embeddings | OpenAI text-embedding-3-small |
| Reranking | Cohere rerank-english-v3.0 |
| Observability | LangFuse v3 |
| File storage | AWS S3 |
| Async processing | AWS SQS |
| Payments | Stripe |

### Infrastructure

| Layer | Technology |
|---|---|
| Frontend hosting | Vercel |
| Backend hosting | AWS (ECS or similar) |
| Database | Supabase Cloud (PostgreSQL) |
| Edge functions | Supabase Edge Functions (Deno Deploy) |
| DNS / CDN | Vercel Edge Network |

---

## 14. Security & Data Isolation

### Multi-tenant security

- **Row-Level Security (RLS)** on all database tables — enforced at the PostgreSQL level, not just application code
- **company_id filtering** on every query — no cross-company data access possible
- **JWT-based authentication** via Supabase Auth with role claims
- **Service role separation** — internal API calls between edge functions and the backend use a separate service role key, never the user's token

### Document security

- **Visibility scopes** enforce who can see which documents at the database level
- **Signed URLs** for document access (time-limited, per-user)
- **S3 storage** with 24-hour TTL for chat attachments

### API security

- **CORS** configured for specific allowed origins
- **Rate limiting** via usage gating (cost pool checks)
- **Input validation** via Pydantic models on all API endpoints
- **File upload limits**: 100MB max per file, 5 files max per upload

### Audit trail

- `audit_logs` table tracks sensitive operations
- `engagement_events` tracks user activity for platform health monitoring
- `chat_interactions` logs all AI interactions for quality and compliance review

---

## 15. Feature Flags & Rollout Strategy

All new features are gated behind environment-variable-based feature flags, controllable via Vercel without code changes.

### Current flags

| Flag | Controls | Status |
|---|---|---|
| `VITE_FEATURE_FRANMETRICS` | FranMetrics integration (settings, data source detection) | Active |
| `VITE_FEATURE_DOCUMENT_EDITOR` | In-app document content editor for knowledge base | Active |
| `VITE_FEATURE_SOURCE_CHUNK_PREVIEW` | Inline source chunk preview in AI chat responses | Active |
| `VITE_FEATURE_TRAINING` | Training portal, team training dashboard, public training routes | Active |

### Rollout process

1. Feature developed behind flag (default: off in production)
2. Enabled in preview/staging environments for testing
3. Gradual rollout via Vercel environment variables (enable per-deployment)
4. Full launch: enable in production
5. Cleanup: remove flag checks once feature is stable and permanent

---

## 16. Success Metrics

### North star metrics

| Metric | Definition | Target |
|---|---|---|
| **Support deflection rate** | % of franchisee questions answered by KI Chat vs. tickets filed | 40–70% |
| **Monthly active companies** | Companies with 5+ users active in the last 30 days | Growth MoM |
| **Net revenue retention** | Revenue from existing customers this period / last period | >110% |

### Product metrics by module

| Module | Key Metric | Why It Matters |
|---|---|---|
| **KI Chat** | Questions answered per company per month | Measures core value delivery |
| **KI Chat** | Citation accuracy rate (via LangFuse) | Measures AI quality |
| **Financial Health** | Locations with active QuickBooks connection | Measures integration adoption |
| **Financial Health** | Monthly reports generated | Measures ongoing engagement |
| **Team Chat** | Messages per company per week | Measures communication adoption |
| **Support Tickets** | Average resolution time | Measures ops efficiency |
| **Onboarding** | % of checklist items completed on time | Measures onboarding quality |
| **Training** | Training completion rate per employee | Measures training effectiveness |

### Business metrics

| Metric | Target |
|---|---|
| Monthly recurring revenue (MRR) | Track and grow |
| Customer acquisition cost (CAC) | Measure payback period |
| Logo churn rate | <5% monthly |
| Average revenue per company | Track and grow |
| Time to first value (first AI question answered) | <24 hours from signup |

---

## 17. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| **Incumbent lock-in** — Large brands on FranConnect see Frannie AI as "good enough" | High | Don't compete for enterprise brands. Win greenfield mid-market brands that have no platform today. |
| **"All-in-one OS" narrative is crowded** — Franchise Systems AI and others use similar language | Medium | Differentiate on the "field coach" positioning, Slack/Teams/SMS delivery, and financial coaching. Don't just say "AI OS." |
| **Module depth perception** — Risk that any one module feels shallow vs. focused competitors | Medium | Lead with the strongest wedges (AI chat + financial coaching). Don't try to sell all modules at once. Land and expand. |
| **Build-vs-buy at top end** — Very large franchisors (1000+ locations) may build custom AI | Low | These are not target customers. Focus on 10–500 unit brands that will never build custom. |
| **AI quality / hallucination risk** — Bad AI answers could damage brand trust | High | Citation system provides source transparency. Refusal detection identifies low-confidence answers. LangFuse monitoring enables quality auditing. Custom system instructions let brands tune behavior. |
| **Execution complexity** — Building 8+ product modules is resource-intensive | Medium | Feature flags allow phased rollout. Prioritize the highest-impact modules (chat, financials) and iterate on the rest. |
| **Data privacy / multi-tenant leakage** — A security breach across tenants would be catastrophic | High | RLS at the database level, not just application code. Visibility scopes enforced on every query. Regular security audits. |

---

## 18. Go-to-Market Strategy

### GTM motion: Land with AI chat, expand with everything else

**Phase 1 — Wedge: AI Support Deflection**
- Lead with the sharpest value prop: "How much does your team spend answering the same franchisee questions every week?"
- Demo the Slack/Teams/SMS integration — show the AI answering questions where franchisees already live
- Offer a pilot: upload 10–20 key documents, connect Slack, measure deflection over 30 days
- Target: VP of Operations or Director of Franchise Support

**Phase 2 — Expand: Financial Coaching**
- Once the brand is live on AI chat, introduce QuickBooks/FranMetrics integration
- "You're already using Frantelligence for support. Now see which locations need financial attention before it's too late."
- Upsell to higher tiers as AI usage grows and financial features become sticky

**Phase 3 — Platform: Full Operations**
- Onboarding automation, training, team chat, and ticketing become natural additions
- "You're already running support and financials on Frantelligence. Why pay for a separate LMS, a separate team chat, and a separate ticket system?"
- Per-location pricing means revenue scales linearly with adoption

### Channels

| Channel | Approach |
|---|---|
| **Direct outreach** | Target franchise development directors and operations VPs at 10–500 unit brands |
| **Franchise trade shows** | IFA Annual Convention, Franchise Expo events, Multi-Unit Franchising Conference |
| **Content marketing** | "State of franchise AI" reports, ROI calculators, case studies |
| **Franchise consultants / brokers** | Partner with franchise consultants who advise emerging brands |
| **Bottom-up from franchisees** | Individual franchisees adopt → corporate sees value → system-wide rollout |

---

## 19. Roadmap

### Current State (Shipped)

- [x] KI Chat Assistant with RAG (web, Slack, Teams, SMS)
- [x] Knowledge base with multi-format upload, chunking, embeddings
- [x] Financial Health Center (QuickBooks + FranMetrics)
- [x] Peer benchmarking and location health scores
- [x] Team Chat with channels, DMs, threads, reactions
- [x] Support Ticketing with categories, routing, analytics
- [x] Onboarding Automation with master checklists and tracking
- [x] Training System with video, tasks, and verification
- [x] Customer Insights with avatar generation
- [x] Multi-tenant architecture with RLS
- [x] Stripe billing with margin-based tiers
- [x] Feature flag system for rollout control
- [x] LangFuse observability for AI quality monitoring

### Near-Term (Next Quarter)

- [ ] Support deflection metrics dashboard — measure and display how many questions AI absorbed vs. tickets filed
- [ ] "What should I do this week?" proactive AI digest — scheduled AI summaries pushed to franchisees via Slack/Teams/SMS
- [ ] Onboarding-to-training pipeline — auto-assign training programs when a franchisee reaches specific onboarding phases
- [ ] Knowledge gap → document suggestion loop — **future** enhancement beyond the **shipped** in-app path (What Users Are Asking → **Generate Doc** → KB editor). Example: proactively suggest **uploads** of missing SOPs or attachments; not a duplicate of current generation-from-gaps.
- [ ] Enhanced FranMetrics KPI dashboards with drill-down and trend visualization

### Medium-Term (Next 2 Quarters)

- [ ] AI-powered ticket routing — automatically categorize and route tickets to the right department
- [ ] Proactive financial alerts — push notifications when a location's metrics cross thresholds
- [ ] Multi-brand support — allow franchise groups that own multiple brands to manage them from a single account
- [ ] Mobile app (React Native or PWA enhancement) — optimized mobile experience for field operations
- [ ] Compliance monitoring — AI scans uploaded documents for compliance gaps and alerts franchisors

### Long-Term (6–12 Months)

- [ ] Expert mode network effect — anonymized, aggregated best practices across all brands (opt-in)
- [ ] Marketplace for franchise playbooks — brands can publish and sell operational templates
- [ ] Predictive analytics — "this location is likely to underperform next quarter based on these leading indicators"
- [ ] International expansion — multi-language support, starting with English-speaking markets (Canada, UK, Australia)
- [ ] API platform — allow third-party integrations to build on top of the Frantelligence data model

---

*This is a living document. As the product evolves and market conditions change, this PRD should be updated to reflect current state and strategy.*
