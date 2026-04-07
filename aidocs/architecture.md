# Frantelligence — Architecture

> **Last Updated**: February 17, 2026
> **Companion to**: [PRD](./prd.md) · [MVP](../docs/mvp.md) · [Context](../ai/context.md)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack](#2-tech-stack)
3. [Multi-Tenant Data Model](#3-multi-tenant-data-model)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture (FastAPI)](#5-backend-architecture-fastapi)
6. [Edge Functions Layer](#6-edge-functions-layer)
7. [AI / RAG Pipeline](#7-ai--rag-pipeline)
8. [Document Processing Pipeline](#8-document-processing-pipeline)
9. [Real-Time & Streaming](#9-real-time--streaming)
10. [Database & Storage](#10-database--storage)
11. [Auth & Security](#11-auth--security)
12. [Billing Infrastructure](#12-billing-infrastructure)
13. [Integrations Architecture](#13-integrations-architecture)
14. [Infrastructure & Deployment](#14-infrastructure--deployment)
15. [Observability](#15-observability)
16. [Key File Paths](#16-key-file-paths)

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                     │
│  Web App (React/Vite)  ·  Slack Bot  ·  Teams Bot  ·  SMS          │
└──────────┬──────────────────┬──────────────────┬────────────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌──────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
│  Vercel (CDN)    │  │  Supabase Edge  │  │  FastAPI Backend    │
│  Static frontend │  │  Functions      │  │  (AWS ECS)          │
│                  │  │  (Deno)         │  │                     │
│  - React SPA     │  │  - Webhooks     │  │  - Chat / RAG       │
│  - Tailwind/     │  │  - Billing      │  │  - File upload       │
│    shadcn        │  │  - OAuth        │  │  - KB management     │
│  - PWA           │  │  - Data sync    │  │  - FranMetrics       │
└────────┬─────────┘  │  - Notifications│  │  - Embeddings        │
         │            └────────┬────────┘  └──────────┬──────────┘
         │                     │                      │
         └──────────┬──────────┴──────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  Supabase Cloud     │
         │  ─────────────────  │
         │  PostgreSQL + RLS   │
         │  pgvector           │
         │  Realtime           │
         │  Auth (JWT)         │
         │  Storage            │
         └──────────┬──────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
    ┌────▼─────┐        ┌─────▼──────┐
    │  AWS S3  │        │  AWS SQS   │
    │  Files   │        │  Doc queue │
    └──────────┘        └────────────┘
```

**Three compute layers**, each with a distinct role:

| Layer | Runtime | Responsibility |
|---|---|---|
| **Frontend** | React 18 on Vercel | UI, client-side routing, Supabase direct queries, SSE consumption |
| **Edge Functions** | Deno on Supabase | Webhooks, billing, OAuth flows, data sync, notifications, CRUD helpers |
| **Backend API** | Python FastAPI on AWS | AI chat, RAG retrieval, file processing, embeddings, FranMetrics analytics |

The frontend talks to **both** Supabase (direct DB reads, auth, realtime) **and** the FastAPI backend (AI operations). Edge functions handle event-driven work (webhooks, billing, scheduled jobs) and serve as middleware between external services and the database.

---

## 2. Tech Stack

### Frontend

| Concern | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix primitives) |
| State | TanStack React Query + React Context |
| Routing | React Router DOM 6 |
| Rich text | TipTap |
| Payments UI | Stripe React |
| Doc processing (client) | PDF.js, Mammoth (DOCX), Tesseract.js (OCR) |
| Realtime | Supabase Realtime subscriptions |
| PWA | Service worker + install prompt |

### Backend

| Concern | Technology |
|---|---|
| Framework | FastAPI (Python 3.11+, fully async) |
| LLM | OpenRouter API (Claude Sonnet 4.5 default) |
| Embeddings | OpenAI text-embedding-3-small via OpenRouter |
| Reranking | Cohere rerank-english-v3.0 (optional) |
| Observability | LangFuse v3 |
| File storage | AWS S3 |
| Async queue | AWS SQS |
| Config | Pydantic Settings + `.env` |

### Database & Infrastructure

| Concern | Technology |
|---|---|
| Database | Supabase Cloud (PostgreSQL 15 + pgvector + RLS) |
| Auth | Supabase Auth (JWT, 3600s expiry, refresh rotation) |
| Edge functions | Supabase Functions (Deno Deploy) |
| Frontend hosting | Vercel |
| Backend hosting | AWS ECS (Docker) |
| Payments | Stripe |
| Email | Resend |

---

## 3. Multi-Tenant Data Model

### Three-level hierarchy

```
Company (franchisor brand)              ← company_id
├── Franchisee A (location)             ← franchisee_id
│   ├── Owner (franchisee role)         ← user_id
│   └── Employee (franchisee_employee)  ← user_id
├── Franchisee B (location)
│   └── Owner
└── Corporate Team
    ├── Admin (franchisor_admin)
    └── Employee (franchisor_employee)
```

### Tenant isolation

- **`company_id`** is the top-level partition key on every tenant-scoped table
- **`franchisee_id`** subdivides within a company for location-level data
- **Row-Level Security (RLS)** enforced at the PostgreSQL level — not application code
- Every RLS policy references `auth.uid()` and joins to `profiles` to resolve `company_id` and role

### Roles

| Role | Key | Scope |
|---|---|---|
| Franchisor Admin | `franchisor_admin` | Full company access |
| Corporate Employee | `franchisor_employee` | Company-wide read |
| Multi-Unit Franchisee | `multi_unit_franchisee` | Multiple owned locations |
| Franchisee Owner | `franchisee` | Single owned location |
| Franchisee Employee | `franchisee_employee` | Basic location access |

### Document visibility scopes

| Scope | Key | Access Rule |
|---|---|---|
| Organization | `company` | Everyone in the same company |
| Corporate | `corporate` | Franchisor roles only |
| Location | `franchisee` | Specific franchisee(s) |
| Owner | `owners` | Specific user(s) |

Visibility is stored as an array on each document and enforced in both RLS policies and the RAG retrieval layer.

---

## 4. Frontend Architecture

### Provider hierarchy

```
QueryClientProvider          ← React Query (staleTime: 5min, retry: 3)
  └── ThemeProvider
      └── AuthProvider       ← Supabase Auth state
          └── UserProfileProvider
              └── SupabaseHealthProvider
                  └── EngagementProvider
                      └── ProfileDialogProvider
                          └── <RouterProvider>
```

### Routing

- **React Router v6** with `BrowserRouter`
- **Protected routes** wrapped in `<ProtectedRoute>` → checks auth state + optional role gates (`requiresFranchisor`)
- **Layout**: `<AppLayout>` provides sidebar, header, help widget
- **Lazy loading**: Heavy components (TipTap editor) use `React.lazy()` + `Suspense`
- **Feature flags**: Routes conditionally rendered via `config.features.*`

### Feature flags

All feature flags are registered in `src/config/environment.ts` under `config.features` and controlled via Vercel environment variables:

| Flag | Env Var | Controls |
|---|---|---|
| `config.features.franmetrics` | `VITE_FEATURE_FRANMETRICS` | FranMetrics integration (settings, data source detection) |
| `config.features.documentEditor` | `VITE_FEATURE_DOCUMENT_EDITOR` | In-app document content editor for KB (TipTap) |
| `config.features.sourceChunkPreview` | `VITE_FEATURE_SOURCE_CHUNK_PREVIEW` | Inline source chunk preview in AI chat responses |
| `config.features.training` | `VITE_FEATURE_TRAINING` | Training portal, team training dashboard, public training routes |

Gate at entry points (routes, nav items, operations config), not deep in the component tree. Default: `false` in production until enabled.

### State management

| What | How |
|---|---|
| Server state | TanStack React Query with query key invalidation |
| Auth state | `AuthContext` — session from localStorage hydration, `onAuthStateChange` listener |
| User profile | `UserProfileProvider` — shared profile cache across components |
| Theme | `ThemeProvider` |
| Engagement | `EngagementProvider` — tracks user activity |

### Supabase client

**File**: `src/integrations/supabase/client.ts`

- Custom `resilientFetch` wrapper intercepts all Supabase REST calls
- **GET requests** to `/rest/v1/` are cached in IndexedDB — served from cache on network failure
- **Mutations** (POST/PATCH/DELETE) pass through uncached
- **Auth resilience**: `getAuthUser()` falls back from `getUser()` (network) → `getSession()` (local JWT) to prevent false logouts during outages
- On sign-out: IndexedDB cache cleared to prevent data leakage

### Data flow patterns

**Reads**: React Query hook → Supabase client → (IndexedDB cache fallback) → component state

**Writes**: Direct Supabase mutation → `queryClient.invalidateQueries()` → refetch

**Realtime**: Supabase Realtime channel → `postgres_changes` event → update local state / invalidate query

### Component organization

```
src/components/
├── ui/                     # shadcn/ui base components (Radix primitives)
├── chat/                   # Chat interface (ChatContainer, ChatMessages, AIMessage)
├── settings/               # Settings tabs and submodules
│   ├── billing/            #   Subscription and payment UI
│   ├── data-integrations/  #   KB document management, uploads, folders
│   ├── help-tutorials/     #   Help content and training progress dashboards
│   ├── profile/            #   User profile, password, company logo
│   └── user-management/    #   Team members, invitations, role management
├── operations/             # Franchisor ops dashboard
│   ├── engagement/         #   Engagement analytics (internal / Frantelligence admin)
│   ├── task-accountability/#   Task cards, assignments, evidence uploads
│   └── team-training/      #   Training library, team dashboard, task editor
├── onboarding-automation/  # Onboarding checklists, phases, AI analysis
├── financial-insights/     # QuickBooks reports, FranMetrics dashboards, location detail
├── customer-insights/      # Avatar generation, market analysis, data gaps chat
├── kb/                     # Knowledge base document editor (TipTap)
├── auth/                   # Authentication-related components
├── avatar-data/            # Avatar data management views
├── billing/                # Billing-specific components (checkout, plan selection)
├── invite/                 # Invitation acceptance flow
├── market-insights/        # Market insights and analysis views
├── providers/              # Context providers (UserProfileProvider)
└── [root]                  # AppLayout, AppSidebar, Header, ProtectedRoute, NotificationBell, ErrorBoundary
```

Pattern: **feature-based grouping** — each product module has its own directory under `components/`.

### API communication

The frontend talks to three backends:

| Target | Method | Used For |
|---|---|---|
| **Supabase** (direct) | `supabase.from().select()` | CRUD reads/writes, auth, realtime subscriptions |
| **FastAPI backend** (via fetch) | `fetch()` with Bearer token | AI chat (SSE), file uploads, KB management, FranMetrics analytics |
| **Edge functions** | `supabase.functions.invoke()` | Billing, OAuth, invitations, scheduled jobs |

Backend selection is configured via `VITE_AI_BACKEND_ENABLED` and `VITE_AI_BACKEND_URL`. If the FastAPI backend is disabled, AI chat falls back to an edge function (`ki-chat`).

---

## 5. Backend Architecture (FastAPI)

### App structure

**Entry**: `ai-backend/app/main.py`

```
ai-backend/
├── app/
│   ├── main.py              # FastAPI app, CORS, lifespan, router mounting
│   ├── config.py            # Pydantic Settings (env vars, model defaults, retrieval params)
│   ├── dependencies.py      # DI: auth, Supabase client, service role verification
│   ├── routers/
│   │   ├── chat.py          # /api/v1/chat — main chat + internal chat
│   │   ├── files.py         # /api/v1/files — upload, delete, refresh
│   │   ├── kb.py            # /api/v1/kb — document CRUD, versions, publish
│   │   └── franmetrics.py   # /api/v1/franmetrics — KPI classification, benchmarks
│   ├── services/
│   │   ├── orchestrator.py        # ChatOrchestrator: retrieval → LLM → response
│   │   ├── retrieval.py           # RetrievalService: vector + keyword search, reranking
│   │   ├── chat_completion.py     # ChatCompletionService: OpenRouter streaming
│   │   ├── embeddings.py          # EmbeddingsService: batch embedding generation
│   │   ├── reranker.py            # RerankerService: Cohere reranking
│   │   ├── supabase_client.py     # SupabaseClient: DB queries, RPC, caching
│   │   ├── auth.py                # AuthService: JWT decode, role resolution
│   │   ├── usage_gate.py          # UsageGateService: tier checking, cost pools
│   │   ├── file_upload.py         # FileUploadService: S3, text extraction
│   │   ├── background_completion.py  # Safety net for dropped SSE connections
│   │   └── franmetrics_*.py       # FranMetrics classification + benchmarking
│   ├── models/
│   │   ├── chat.py           # ChatRequest, ChatResponse, ChatMessage, etc.
│   │   ├── retrieval.py      # ChunkContext, RetrievalPayload, etc.
│   │   ├── files.py          # AttachedFile, FileUploadResponse
│   │   └── franmetrics.py    # KPI classification + weight models
│   └── worker.py             # SQS document processing worker
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

### Dependency injection

**File**: `ai-backend/app/dependencies.py`

- `@lru_cache` singleton services: `get_supabase_client()`, `get_auth_service()`
- `get_current_user()`: Extracts JWT → validates → fetches profile → builds `UserContext` (company_id, franchisee_id, role, visibility scopes)
- `verify_service_role()`: Service-to-service auth for internal endpoints (edge functions → backend)
- Type aliases: `SettingsDep`, `SupabaseDep`, `CurrentUserDep`, `ServiceRoleDep`

### Service layer pattern

Services are classes with async methods, instantiated with their dependencies. Key pattern: **services never access the database directly** — they go through `SupabaseClient`, which wraps all DB operations with caching and error handling.

### Configuration

**File**: `ai-backend/app/config.py`

Pydantic `BaseSettings` with categories:

| Category | Key Settings |
|---|---|
| Models | `default_chat_model` (Claude Sonnet 4.5), `default_embedding_model` (text-embedding-3-small) |
| Retrieval | vector threshold (0.15), vector count (25), keyword count (12), token budget (7,000) |
| Deep research | vector count (35), keyword count (16), token budget (9,000) |
| AWS | S3 bucket, SQS queue URL, region |
| Worker | poll interval (1s), visibility timeout (600s), concurrency (2) |
| Limits | max file size (100MB), max files per upload (5) |

### Error handling

- HTTP exceptions re-raised as-is; all other exceptions logged with context and wrapped in `HTTPException(500)`
- Usage gate errors return structured JSON with upgrade info, not raw 4xx responses

---

## 6. Edge Functions Layer

**Runtime**: Deno (TypeScript) on Supabase Functions
**Count**: ~100 edge functions + shared utilities

### Role

Edge functions handle event-driven and auxiliary workloads that don't belong in the frontend or the FastAPI backend:

| Category | Functions | Pattern |
|---|---|---|
| **Webhooks** | `slack-webhook`, `teams-webhook`, `sms-webhook`, `stripe-webhook` | Signature verification, event dispatch, AI backend calls |
| **Billing & Payments** | `create-checkout`, `check-subscription`, `check-usage-gate`, `execute-tier-upgrade`, `get-prices`, `get-promo-details`, `get-subscription-details`, `get-payment-method`, `get-payment-history`, `cancel-subscription`, `reactivate-subscription`, `create-setup-intent`, `customer-portal`, `audit-subscription`, `generate-billing-report`, `sync-subscription-quantities`, `update-role-billing` | Stripe SDK, subscription lifecycle, payment management |
| **OAuth & Integrations** | `oauth-connect`, `oauth-callback`, `slack-install`, `slack-disconnect`, `teams-install` | Token exchange, connection storage, disconnect cleanup |
| **Data sync** | `sync-franmetrics-data`, `fetch-quickbooks-financial-data`, `financial-sync-dispatcher`, `scheduled-data-refresh`, `sync-langfuse-usage` | External API → Supabase, scheduled |
| **QuickBooks** | `qbo-detect-setup`, `qbo-save-mappings`, `quickbooks-proxy`, `generate-monthly-financial-reports` | QB entity detection, location mapping, AI report generation |
| **Doc processing & KB** | `document-worker`, `process-documents`, `document-delete`, `document-ingestion`, `document-ingestion-queue`, `extract-document-text`, `simple-document-processor`, `manage-expert-documents`, `view-document`, `prepare-office-viewer`, `migrate-embeddings` | S3 + embedding pipeline, text extraction, expert library |
| **Cloud imports** | `google-drive-files`, `webhook-google`, `webhook-microsoft` | Google Drive / OneDrive file import for KB |
| **AI Chat** | `ki-chat` | Edge function fallback when FastAPI backend is disabled |
| **Knowledge Gaps** | `analyze-knowledge-gaps` | Gap analysis from chat interactions |
| **Onboarding** | `parse-checklist`, `upload-checklist`, `finalize-checklist`, `checklist-conversation`, `add-manual-group`, `add-manual-item`, `create-or-update-group`, `delete-group`, `delete-manual-item`, `update-manual-item`, `bucket-group-crud`, `bucket-task-crud`, `update-bucket-status`, `update-item-status`, `update-target-open-date`, `calendar-sync` | Checklist CRUD, AI-assisted parsing, calendar sync |
| **Customer Insights & Avatars** | `comprehensive-avatar-generator`, `deep-research-avatars`, `document-avatar-generator`, `generate-avatar-image`, `generate-persona`, `refresh-avatar-data`, `avatar-gaps`, `avatars-summary`, `generate-review-insights` | AI avatar generation, review sentiment analysis |
| **User management** | `accept-invite`, `send-franchise-invitation`, `delete-user`, `reactivate-user`, `check-user-status`, `send-password-reset` | Auth admin operations |
| **Notifications** | `send-ticket-notification-email`, `send-invoice-email` | Resend email API |
| **Engagement & Scheduled** | `track-engagement`, `aggregate-engagement`, `cleanup-engagement-events` | Event logging, cron-triggered aggregation |
| **Infrastructure** | `health-check`, `csp-violation-report`, `serve-index`, `setup-database` | Health monitoring, security reporting, setup |

### Shared utilities (`_shared/`)

| File | Purpose |
|---|---|
| `ai-backend-client.ts` | HTTP client for calling FastAPI internal endpoints with service role auth |
| `cors.ts` | Shared CORS header handling for edge function responses |
| `cost-pool-resolver.ts` | Resolves the correct cost pool for a user/franchisee for billing checks |
| `margin-breach-handler.ts` | Handles tier margin breach detection and upgrade prompts |
| `pricing-tiers.ts` | Pricing tier definitions and threshold calculations |
| `security-middleware.ts` | Common security checks (auth, rate limiting) |
| `retry-fetch.ts` | Fetch wrapper with exponential backoff retry logic |
| `timeout-wrapper.ts` | Wraps async operations with configurable timeouts |
| `document-url-utils.ts` | Signed URL generation and document path utilities |
| `path-sanitization.ts` | File path sanitization for S3 keys |
| `provider-registry.ts` | Registry for external integration providers |

### Common patterns

- **Auth**: JWT from `Authorization` header validated via `supabase.auth.getUser(token)`. Webhook functions set `verify_jwt = false` in config and verify signatures instead.
- **Supabase client**: Service role client (`SUPABASE_SERVICE_ROLE_KEY`) for admin operations, no session persistence.
- **Backend communication**: `_shared/ai-backend-client.ts` calls FastAPI internal endpoints with service role auth.

---

## 7. AI / RAG Pipeline

### Overview

```
User Query
    │
    ├── [1] Embed query ──────────────────────────┐
    │   (text-embedding-3-small via OpenRouter)    │
    │                                              │
    ├── [2a] Vector search (pgvector) ◄────────────┘
    │   match_company_document_chunks_v5()
    │   threshold: 0.15, top 25 (35 deep research)
    │
    ├── [2b] Keyword search (PostgreSQL FTS)
    │   keyword_search_document_chunks_v5()
    │   top 12 (16 deep research)
    │
    │   ↓ Both searches run in parallel (asyncio.gather)
    │
    ├── [3] Merge + deduplicate
    │   Combined scoring: 70% vector + 30% keyword
    │
    ├── [4] Rerank (optional)
    │   Cohere rerank-english-v3.0 — top 30 candidates
    │   Fallback: similarity-based sorting if Cohere unavailable
    │
    ├── [5] Context assembly
    │   Token budget: 7,000 (standard) / 9,000 (deep research)
    │   Max items: 12 (standard) / 15 (deep research)
    │   Multi-tenant visibility filtering applied
    │
    ├── [6] LLM completion
    │   Claude Sonnet 4.5 via OpenRouter
    │   Per-company custom system instructions injected
    │   Streaming via SSE or single response
    │
    ├── [7] Post-processing
    │   Citation generation — references to source documents
    │   Refusal detection — identifies low-confidence answers
    │
    └── [8] Usage tracking
        Token count + cost → cost pool → billing tier check
```

### Multi-tenant retrieval

Both vector and keyword search RPC functions accept:
- `company_id` — partition filter
- `user_id` — for owner-scoped docs
- `franchisee_ids` — array of accessible franchisee scopes
- `visibility_scopes` — array of allowed scopes (company, corporate, franchisee, owners)

This ensures a franchisee employee never retrieves documents they shouldn't see, even at the retrieval layer.

### Modes

| Mode | Behavior |
|---|---|
| **Organizational** | Retrieves from the brand's uploaded documents only |
| **Expert** | Retrieves from a curated industry best practices library |
| **Deep Research** | Extended retrieval limits (more chunks, higher token budget) |
| **Vision** | Processes attached images via Gemini 2.5 Flash for OCR/analysis |

---

## 8. Document Processing Pipeline

```
Upload (frontend or API)
    │
    ▼
┌─────────────────────┐
│ Validate & Store     │  File validation (type, size)
│ ai-backend/kb.py     │  Upload to S3 (permanent)
│                      │  Create `documents` record (status: PROCESSING)
│                      │  Queue SQS message
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ SQS Worker           │  ai-backend/worker.py
│ (long-poll loop)     │  Download from S3
│                      │  Text extraction (per format):
│                      │    PDF → pdfplumber / vision OCR
│                      │    DOCX → python-docx
│                      │    XLSX → openpyxl
│                      │    Images → Gemini vision
│                      │  Semantic chunking
│                      │  Batch embedding (size 32)
│                      │    text-embedding-3-small
│                      │  Store chunks in `document_chunks`
│                      │  Update document status → READY
└──────────┬──────────┘
           │
           ▼
     Available for RAG
```

### Worker details

- **Polling**: Long-poll SQS (20s wait), configurable interval (1s)
- **Concurrency**: `asyncio.Semaphore` — 2 concurrent tasks per worker
- **Retry**: Failed messages return to SQS via visibility timeout (600s), dead-letter queue after max retries
- **Reindex**: Edited documents send `action: "reindex"` — worker reads content from DB, deletes old chunks, creates new embeddings

### Storage split

| Content | Storage | TTL |
|---|---|---|
| KB documents (permanent) | S3 `kb-files/{company_id}/...` | None |
| Chat file attachments | S3 `chat-files/{user_id}/...` | 24 hours |
| Embeddings + chunks | `document_chunks` table (pgvector) | Permanent (deleted with document) |

---

## 9. Real-Time & Streaming

### SSE (AI Chat)

**Frontend** (`src/hooks/useKiChat.ts`):
1. `fetch()` with `Accept: text/event-stream`
2. `ReadableStream` reader + `TextDecoder`
3. Manual SSE parsing: split on `\n\n`, extract `event:` and `data:` lines
4. `AbortController` for cancellation

**Backend** (`ai-backend/app/routers/chat.py`):
1. FastAPI `StreamingResponse` with `text/event-stream` media type
2. Async generator yields formatted SSE events
3. `ChatCompletionService` streams tokens from OpenRouter via `httpx.AsyncClient.stream()`
4. Read timeout: 300s for long responses

**Event types**:

| Event | Payload | When |
|---|---|---|
| `init` | Sources, debug info | Start of response |
| `token` | Content delta | Each LLM token |
| `done` | Full content, sources, usage | Response complete |
| `error` | Error message | On failure |

**Safety net**: `BackgroundCompletionService` spawns as a FastAPI background task. If the SSE stream disconnects, it polls the DB every 5s. If the message is still pending after 60s, it runs the full completion and saves to the database.

### Supabase Realtime

Used for live updates outside of AI chat via `postgres_changes` subscriptions:

- Chat message updates (status changes during streaming)
- New support tickets (franchisor dashboard)
- Ticket notifications (notification bell)
- Channel messages (team chat)
- Mention notifications (team chat)

Cleanup: `supabase.removeChannel(channel)` in `useEffect` cleanup.

---

## 10. Database & Storage

### PostgreSQL (Supabase)

- **Version**: PostgreSQL 15
- **Extensions**: pgvector (vector similarity search), pg_trgm (trigram matching)
- **Tables**: 100+ (see generated types at `src/integrations/supabase/types.ts`)
- **Migrations**: 277 files in `supabase/migrations/`
- **API row limit**: 1,000 rows per request

### Key table groups

| Group | Tables | Purpose |
|---|---|---|
| Tenancy | `companies`, `franchisees`, `profiles` | Multi-tenant hierarchy |
| Knowledge | `documents`, `document_chunks`, `document_versions`, `document_assets`, `folders` | RAG knowledge base |
| Chat | `chat_sessions`, `chat_messages`, `chat_interactions` | AI chat history + analytics |
| Team Chat | `channels`, `channel_members`, `channel_messages`, `message_reactions` | Internal messaging |
| Financial | `financial_snapshots`, `monthly_financial_reports`, `financial_sync_jobs`, `oauth_connections` | QuickBooks data |
| FranMetrics | `fm_kpi_definitions`, `fm_kpi_snapshots`, `fm_peer_benchmarks`, `fm_location_diagnostics`, `fm_location_scores` | KPI analytics |
| Tickets | `support_tickets`, `support_ticket_comments`, `support_ticket_attachments`, `ticket_categories` | Support workflow |
| Training | `trainings`, `training_videos`, `training_tasks`, `training_video_progress`, `training_task_completions` | Employee training |
| Onboarding | `onboarding_roles`, `onboarding_groups`, `onboarding_items`, `franchisee_onboarding_items` | New franchisee onboarding |
| Billing | `pricing_tiers`, `cost_pools`, `usage_aggregates`, `subscribers`, `payments_history` | Subscription + usage |
| Engagement | `engagement_events`, `engagement_daily`, `engagement_summary` | Platform analytics |

### RLS policy pattern

All policies join to `profiles` via `auth.uid()` to resolve the user's `company_id` and role. SELECT policies check `company_id` match; write policies additionally check role-based permissions.

### Index strategies

- **Composite**: `(company_id, created_at DESC)` for tenant-scoped time-ordered queries
- **Partial**: `WHERE is_active = true` for filtered scans
- **FK indexes**: All foreign key columns indexed for join performance
- **Vector**: pgvector indexes on `document_chunks.embedding` for similarity search

### Server-side functions (RPC)

Performance-critical operations use `SECURITY DEFINER` PostgreSQL functions:

| Function | Purpose |
|---|---|
| `match_company_document_chunks_v5()` | Vector similarity search with tenant filtering |
| `keyword_search_document_chunks_v5()` | Full-text keyword search with tenant filtering |
| `get_user_cost_pool()` | Cost pool resolution for billing |
| `record_usage()` | Usage tracking per interaction |
| `get_team_progress_summary()` | Training progress aggregation |
| `verify_manager_pin()` | Server-side PIN verification |

### Caching layers

| Layer | What | TTL |
|---|---|---|
| IndexedDB (frontend) | Supabase GET responses | Until sign-out |
| React Query (frontend) | Query results | 5 minutes (staleTime) |
| In-memory (backend) | User profiles | 5 minutes |
| In-memory (backend) | Company AI settings | 10 minutes |
| In-memory (backend) | Usage gate results | 5 minutes |

---

## 11. Auth & Security

### Authentication flow

1. **Sign up / sign in** via Supabase Auth (email + password)
2. **JWT issued** with 3600s expiry, automatic refresh rotation
3. **Frontend hydration**: `getSession()` from localStorage on load (no network)
4. **Token refresh**: `onAuthStateChange` handles `TOKEN_REFRESHED` events
5. **Offline resilience**: If network fails, existing valid JWT is preserved (no false logouts)

### Authorization

| Layer | Mechanism |
|---|---|
| Database | RLS policies on every table — `auth.uid()` → `profiles` → `company_id` + role |
| Backend API | `get_current_user()` dependency — validates JWT, builds `UserContext` |
| Edge functions | `supabase.auth.getUser(token)` or service role for admin operations |
| Frontend | `<ProtectedRoute>` checks auth state + role; `useUserRole()` for conditional rendering |

### Service-to-service auth

- Edge functions → FastAPI backend: Service role key in `Authorization` header, verified by `verify_service_role()`
- Webhooks (Slack, Teams, Stripe, SMS): Signature verification instead of JWT (`verify_jwt = false` in config)

### Data protection

- **Signed URLs**: Time-limited S3 presigned URLs for document access
- **Cache clearing**: IndexedDB cleared on sign-out
- **CORS**: Explicit origin allowlist
- **Input validation**: Pydantic models on all FastAPI endpoints
- **File limits**: 100MB max per file, 5 files max per upload
- **Audit trail**: `audit_logs` table + `chat_interactions` for compliance

---

## 12. Billing Infrastructure

### Flow

```
Franchisor signs up (free)
    │
    ▼
Invites first user ──→ Stripe Checkout ──→ Subscription created
    │                                            │
    ▼                                            ▼
User asks KI Chat ──→ Usage gate check    Stripe webhook ──→ stripe-webhook edge fn
    │                      │                     │
    │                      ▼                     ▼
    │              Cost pool lookup        Update `subscribers` table
    │              Tier threshold check
    │                      │
    │               ┌──────┴──────┐
    │               │ Under limit │──→ Allow operation
    │               │ Over limit  │──→ Prompt upgrade
    │               └─────────────┘
    │
    ▼
Usage recorded ──→ `usage_aggregates` ──→ Tier auto-upgrade if sustained
```

### Key components

| Component | Where | What It Does |
|---|---|---|
| `create-checkout` | Edge function | Creates Stripe checkout session with tier-based line items |
| `stripe-webhook` | Edge function | Processes Stripe events (checkout, invoice, subscription changes) |
| `check-usage-gate` | Edge function | Pre-operation cost pool check |
| `UsageGateService` | Backend service | Backend-side usage gate with in-memory caching (5 min TTL) |
| `pricing_tiers` | DB table | Tier definitions with prices and margins |
| `cost_pools` | DB table | Per-franchisee/franchisor billing groups |
| `usage_aggregates` | DB table | Period-level usage tracking |

---

## 13. Integrations Architecture

### Slack

```
Slack event (mention, DM, etc.)
    │
    ▼
slack-webhook edge function
    │ Verify Slack signing secret
    │ Parse event type
    │
    ├── app_mention / message → callAIBackend() → /api/v1/chat/internal
    │                                                    │
    │                                              AI response
    │                                                    │
    │                                              Slack Web API → post message
    │
    ├── app_home_opened → render app home tab
    └── app_uninstalled → cleanup
```

### Teams

Same pattern as Slack but with Microsoft Bot Framework protocol and Azure AD OAuth.

### SMS

Same pattern via `sms-webhook` edge function. Maintains thread context via `sms_threads` table.

### QuickBooks

```
oauth-connect edge function → QuickBooks OAuth → store tokens in oauth_connections
    │
    ▼
fetch-quickbooks-financial-data edge function (scheduled / on-demand)
    │ Use stored OAuth tokens
    │ Fetch P&L, balance sheet, cash flow
    │ Store in financial_snapshots
    │
    ▼
generate-monthly-financial-reports edge function
    │ Read financial_snapshots
    │ Generate AI narrative + recommendations
    │ Store in monthly_financial_reports
```

### FranMetrics

```
sync-franmetrics-data edge function (scheduled)
    │ Fetch KPI data from FranMetrics API
    │ Store in fm_kpi_snapshots
    │ Trigger AI classification → /api/v1/franmetrics/classify-kpis
    │
    ▼
FranMetrics benchmarking engine (backend)
    │ Compute peer benchmarks → fm_peer_benchmarks
    │ Generate diagnostics → fm_location_diagnostics
    │ Calculate health scores → fm_location_scores
```

---

## 14. Infrastructure & Deployment

### Frontend (Vercel)

- **Build**: `vite build`
- **Rewrites**: `vercel.json` — SPA fallback (`/* → /index.html`), API proxy
- **Environment**: Feature flags and config via Vercel env vars
- **Preview deployments**: Auto-deploy on PR branches

### Backend (AWS)

- **Container**: Python 3.11-slim Docker image
- **Runtime**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- **User**: Non-root `appuser` (UID 10001)
- **Health check**: HTTP on `/health` (30s interval, 10s timeout)
- **Resources**: 2 CPUs, 4GB memory limit

### Edge Functions (Supabase)

- **Runtime**: Deno Deploy
- **Config**: `supabase/config.toml` — per-function JWT verification settings
- **Secrets**: Managed via Supabase Dashboard
- **Deployment**: `npx supabase functions deploy <function_name>`

### Database (Supabase Cloud)

- **Migrations**: `supabase/migrations/` — 277 files, applied via `npx supabase db push`
- **Types**: Generated via `npx supabase gen types typescript` → `src/integrations/supabase/types.ts`
- **Local dev**: Ports 54321 (API), 54322 (DB), 54320 (shadow)

---

## 15. Observability

### LangFuse (AI monitoring)

- **SDK**: LangFuse v3 Python SDK
- **Integration**: `@observe` decorators on service methods
- **Tracking**: Traces, generations, token usage, cost per interaction
- **Conditional**: Gracefully disabled if env vars not set

### Logging

- **Backend**: Python `logging` module, configurable level via `LOG_LEVEL`
- **Edge functions**: Deno `console.log` → Supabase function logs
- **Frontend**: Console-based logging (errors surfaced as toasts)

### Engagement tracking

- `engagement_events` — raw event log (user actions)
- `engagement_daily` — daily aggregates per company
- `engagement_summary` — lifetime totals
- Aggregation: `aggregate-engagement` edge function (scheduled)
- Cleanup: `cleanup-engagement-events` removes old raw events

---

## 16. Key File Paths

| What | Where |
|---|---|
| Frontend entry | `src/App.tsx` |
| Supabase client | `src/integrations/supabase/client.ts` |
| Generated DB types | `src/integrations/supabase/types.ts` |
| Environment config | `src/config/environment.ts` |
| React components | `src/components/` |
| React hooks | `src/hooks/` |
| Pages | `src/pages/` |
| Frontend types | `src/types/` |
| Backend entry | `ai-backend/app/main.py` |
| Backend config | `ai-backend/app/config.py` |
| Backend DI | `ai-backend/app/dependencies.py` |
| API routers | `ai-backend/app/routers/` |
| Backend services | `ai-backend/app/services/` |
| Pydantic models | `ai-backend/app/models/` |
| Document worker | `ai-backend/app/worker.py` |
| Backend Dockerfile | `ai-backend/Dockerfile` |
| Edge functions | `supabase/functions/` |
| Shared edge utils | `supabase/functions/_shared/` |
| DB migrations | `supabase/migrations/` |
| Supabase config | `supabase/config.toml` |
| Cursor rules | `.cursor/rules/` |
| Vercel config | `vercel.json` |
