# Knowledge Builder Agent - Product Requirements Document

**Feature Name:** Knowledge Builder Agent  
**Category:** Agentic AI, Knowledge Management  
**Priority:** P0 (Strategic Differentiator)  
**Status:** Planning  
**Owner:** Product & Engineering  
**Last Updated:** February 2026

---

## Table of Contents
- [Executive Summary](#executive-summary)
- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Business Case](#business-case)
- [User Stories](#user-stories)
- [Functional Requirements](#functional-requirements)
- [Technical Requirements](#technical-requirements)
- [Architecture Design](#architecture-design)
- [MVP Scope](#mvp-scope)
- [Success Metrics](#success-metrics)
- [Timeline & Milestones](#timeline--milestones)
- [Risks & Mitigations](#risks--mitigations)
- [Future Enhancements](#future-enhancements)
- [Acceptance Criteria](#acceptance-criteria)
- [Technical Specifications](#technical-specifications)
- [Implementation Checklist](#implementation-checklist)
- [Launch Plan](#launch-plan)
- [Competitive Analysis](#competitive-analysis)
- [Go-to-Market Strategy](#go-to-market-strategy)
- [Appendix](#appendix)

---

## Executive Summary

### The Opportunity

**The Pitch:**
> "Other platforms show you what questions your franchisees are asking. Frantelligence writes the answers for you."

The Knowledge Builder Agent is an autonomous AI system that:
1. **Monitors** all chat conversations to detect knowledge gaps
2. **Analyzes** your existing documentation style and voice
3. **Generates** professional documentation to fill the gaps
4. **Delivers** draft content for one-click approval and publishing

This transforms Frantelligence from a reactive chat tool into a proactive knowledge management system that continuously improves itself.

### Strategic Importance

**Why This is Category-Defining:**

1. **Agentic Differentiation:** Moves beyond chatbots into autonomous value creation
2. **Network Effects:** The more the system is used, the better the documentation becomes
3. **Measurable ROI:** Directly quantifiable time savings (est. 12 hours/month per customer)
4. **Competitive Moat:** Requires sophisticated AI infrastructure that takes years to build
5. **Pricing Power:** Justifies premium tier pricing

### What Makes This Possible Now

**80% of Infrastructure Already Built:**

| Capability | Status | Location |
|-----------|--------|----------|
| Gap Detection | ✅ Built | `knowledge_gaps` table, `knowledge_gap_analysis` view |
| Gap Categorization | ✅ Built | `analyze-knowledge-gaps` edge function with weighted scoring |
| Refusal Detection | ✅ Built | `ai-backend/app/services/orchestrator.py` - detects "can't answer" patterns |
| Document Style Analysis | 🟡 Partial | `ai-backend/app/worker.py` has basic structure detection during ingestion |
| RAG Pipeline | ✅ Built | Full retrieval with Cohere reranking |
| Expert Mode Search | ✅ Built | `expert_documents` + internet knowledge |
| Email System | ✅ Built | Resend integration, multiple templates |
| Document Upload | ✅ Built | Full KB ingestion with visibility scopes |

**We're not building from scratch—we're connecting existing capabilities into an autonomous workflow.**

---

## Problem Statement

### Customer Pain Points

**For Franchisors:**

1. **Documentation is Tedious & Time-Consuming**
   - Writing comprehensive documentation takes hours
   - Keeping documentation up-to-date is an ongoing burden
   - Hard to identify what documentation is actually needed

2. **Reactive Instead of Proactive**
   - Only learn about gaps when franchisees complain
   - Same questions asked repeatedly before action is taken
   - Support team overwhelmed with answerable questions

3. **Inconsistent Documentation Quality**
   - Different people write in different styles
   - Some topics get detailed docs, others are neglected
   - Hard to maintain brand voice across all content

**For Franchisees:**

1. **Can't Find Answers When Needed**
   - Information exists but is hard to locate
   - Documentation is outdated or incomplete
   - Forced to contact support for simple questions

2. **Delays in Getting Responses**
   - Support tickets take days to resolve
   - Corporate staff overwhelmed with repetitive questions
   - Information bottlenecks slow down operations

### Market Gap

**What Competitors Offer:**
- FranConnect: Static document repository, no AI analysis
- Naranga: Basic chat features, no autonomous documentation
- Franchise Performance Group: Manual consulting, no automation

**What We'll Offer:**
- Autonomous gap detection
- AI-generated documentation in brand voice
- One-click approval workflow
- Continuous improvement loop

---

## Solution Overview

### Product Vision

**The Knowledge Builder Agent** is an autonomous AI system that acts as a "documentation assistant" for franchisors, continuously monitoring conversations, identifying gaps, and proactively generating high-quality documentation to fill those gaps.

### Core Concept

```
Franchisees Ask Questions → Agent Detects Patterns → Generates Documentation → 
Franchisor Approves → Knowledge Base Improves → Fewer Questions Asked → 
Better Franchisee Experience
```

### Key Features

1. **Autonomous Gap Detection**
   - Analyzes all chat conversations
   - Identifies patterns in unanswered or poorly-answered questions
   - Clusters questions by topic/category
   - Scores gaps by severity (frequency × user diversity × trend)

2. **Intelligent Style Learning**
   - Analyzes company's top-performing documents
   - Extracts tone, structure, and formatting patterns
   - Learns company-specific terminology
   - Maintains consistent brand voice

3. **High-Quality Document Generation**
   - Generates professional, comprehensive documentation
   - Incorporates relevant context from existing KB
   - Includes industry best practices via expert search
   - Provides proper citations and sources

4. **Streamlined Approval Workflow**
   - Email digest with evidence package
   - One-click approve → auto-publish to KB
   - Edit option → open in KB editor with pre-filled content
   - Dismiss option → mark gap as addressed externally
   - Track outcomes for continuous learning

5. **Impact Tracking**
   - Measure reduction in repeat questions
   - Track time saved on support
   - Monitor documentation usage
   - Calculate ROI per generated document

### User Experience

**For Franchisor Admins:**

1. **Weekly Email Digest:**
   ```
   📧 Knowledge Builder Report - Week of Feb 3
   
   Your Knowledge Builder Agent identified 3 high-priority gaps
   this week. Review and approve suggested documentation below.
   
   [HIGH PRIORITY] Equipment Maintenance Procedures
   → 12 questions, 8 unique users, trending ↗
   [REVIEW DRAFT] [DISMISS]
   
   [MEDIUM PRIORITY] Employee Scheduling Best Practices  
   → 6 questions, 4 unique users
   [REVIEW DRAFT] [DISMISS]
   
   [LOW PRIORITY] POS System Troubleshooting
   → 3 questions, 2 unique users
   [REVIEW DRAFT] [DISMISS]
   ```

2. **In-App Review Dashboard:**
   - Visual gap analysis
   - Side-by-side comparison (questions vs. generated doc)
   - Inline editing capability
   - Bulk approve/dismiss

**For Franchisees:**
- No direct interaction
- Transparent improvement in answer quality
- Fewer "I don't have that information" responses
- More comprehensive documentation over time

---

## Business Case

### Value Proposition

**Quantifiable Benefits:**

1. **Time Savings:**
   - Average: 12 hours/month per franchisor in documentation work
   - Value: ~$600/month at $50/hr labor rate
   - Annual value per customer: $7,200

2. **Support Cost Reduction:**
   - Estimated 20-30% reduction in support tickets
   - Fewer escalations to subject matter experts
   - Faster resolution times

3. **Franchisee Satisfaction:**
   - Improved NPS due to better self-service
   - Reduced onboarding friction
   - Better operational consistency

**Strategic Value:**

- **Competitive Differentiation:** First-to-market with autonomous documentation
- **Pricing Power:** Justifies 20-30% premium over competitors
- **Customer Retention:** Increased switching costs (better KB over time)
- **Viral Marketing:** "Our AI writes documentation for us" is shareable
- **Data Moat:** Style learning creates personalized value that can't be replicated

---

## User Stories

### US-1: Franchisor Discovers Gap (Automated)

**As a** franchisor admin  
**I want** the system to automatically identify gaps in my knowledge base  
**So that** I don't have to manually monitor every conversation

**Acceptance Criteria:**
- System runs analysis daily/weekly (configurable)
- Gaps are scored by severity
- Only high-severity gaps trigger notifications
- Gaps are categorized by topic area

---

### US-2: Franchisor Reviews Generated Documentation

**As a** franchisor admin  
**I want** to review AI-generated documentation before it's published  
**So that** I can ensure quality and accuracy

**Acceptance Criteria:**
- Email includes full document preview
- Shows evidence (questions, users, frequency)
- Provides approve/edit/dismiss options
- Each action is a single click
- Edit opens KB editor with pre-filled content

---

### US-3: Franchisor Approves with One Click

**As a** franchisor admin  
**I want** to approve good documentation with one click  
**So that** I can quickly improve my knowledge base without manual work

**Acceptance Criteria:**
- Approve button in email works reliably
- Document is uploaded to KB immediately
- Correct visibility scope is applied
- Confirmation email/notification sent
- Document appears in KB search within 1 minute

---

### US-4: Agent Learns from Edits

**As a** franchisor admin  
**I want** the system to learn from my edits  
**So that** future generated documents match my preferences better

**Acceptance Criteria:**
- System tracks which documents were approved as-is
- System tracks which documents were edited before approval
- System analyzes edit patterns
- Future generations incorporate learned preferences

---

### US-5: Gap is Resolved and Tracked

**As a** franchisor admin  
**I want** to see the impact of generated documentation  
**So that** I can measure ROI of this feature

**Acceptance Criteria:**
- System tracks question frequency before/after doc upload
- Dashboard shows reduction in gap-related questions
- Reports estimate time saved on support
- Can export ROI reports for stakeholders

---

## Functional Requirements

### FR-1: Knowledge Gap Detection

**Description:** Automated system to identify documentation gaps from chat history.

**Requirements:**

1.1. **Data Collection**
- Query `knowledge_gap_analysis` view for all gaps
- Include date range filter (configurable: 7, 14, 30, 90 days)
- Filter by minimum question count (default: 3)
- Exclude gaps with existing documentation (based on keywords)

1.2. **Gap Categorization**
- Use existing `analyze-knowledge-gaps` edge function
- Cluster similar questions into gap categories
- Assign category labels (Equipment, Procedures, Policies, etc.)
- Support custom categories per company

1.3. **Severity Scoring**
- **Formula:** `severity = (question_count × 2) + (unique_users × 3) + (trend_multiplier × 5)`
- **Trend Multiplier:**
  - Increasing: 2.0
  - Stable: 1.0
  - Decreasing: 0.5
- **Severity Levels:**
  - Critical: ≥50 points
  - High: 30-49 points
  - Medium: 15-29 points
  - Low: <15 points

1.4. **Gap Deduplication**
- Don't re-suggest documentation for same gap
- Track gap_id → generated_doc_id mapping
- Mark gaps as "addressed" when doc is approved
- Allow manual dismissal of gaps

---

### FR-2: Document Style Extraction

**Description:** Learn company's documentation style from existing knowledge base.

**Requirements:**

2.1. **Sample Selection**
- Fetch top 5 most-viewed documents from company KB
- Prefer documents uploaded by franchisor (not franchisee)
- Minimum word count: 200 words
- Exclude outdated documents (>2 years old)

2.2. **Style Analysis**
- **Tone Analysis:**
  - Formal vs. casual
  - Technical vs. accessible
  - Instructional vs. informational
- **Structure Patterns:**
  - Heading hierarchy (H1, H2, H3)
  - Use of bullets vs. numbered lists
  - Presence of tables, images, diagrams
- **Terminology:**
  - Company-specific jargon
  - Product/service names
  - Acronym usage
- **Length Preferences:**
  - Average document length
  - Section depth
  - Concise vs. detailed

2.3. **Style Profile Output**
```typescript
interface StyleProfile {
  company_id: string;
  tone: {
    formality: 'formal' | 'casual' | 'balanced';
    technicality: 'technical' | 'accessible' | 'mixed';
    voice: 'instructional' | 'conversational' | 'authoritative';
  };
  structure: {
    prefers_bullets: boolean;
    prefers_numbered_lists: boolean;
    uses_tables: boolean;
    heading_depth: number; // Max heading level used
  };
  terminology: Record<string, string>; // Preferred terms
  length: {
    avg_word_count: number;
    prefers_concise: boolean; // vs. comprehensive
  };
  formatting: {
    uses_bold_for_emphasis: boolean;
    uses_italics_for_terms: boolean;
    uses_blockquotes: boolean;
  };
  examples: string[]; // Sample sentences showcasing style
  last_updated: string;
}
```

2.4. **Caching**
- Cache style profile per company
- Refresh weekly or when significant KB changes detected
- Allow manual refresh via settings

---

### FR-3: Document Generation

**Description:** Generate high-quality documentation matching company style. Two paths are supported: creating a new document or updating an existing one.

**Requirements:**

3.0. **Path Decision (runs before generation)**
- Embed the gap's question cluster and run semantic search against the company's KB.
- If a related document is found with similarity score ≥ 0.80, the path is **Update** — `target_document_id` is set to that document.
- If no related document meets the threshold, the path is **Create** — a brand new document is generated.
- The UI button on each gap row reflects the determined path: "Update Document" or "Create Document."
- The path can be overridden by the user before confirming generation.

3.1. **Context Gathering (Create path)**
- **Sample Questions:** Include 5-10 representative questions from gap
- **Related Documents:** Retrieve top 3 most relevant existing docs via RAG (for context/cross-referencing)
- **Expert Knowledge:** Search expert_documents and internet sources
- **Company Info:** Include company name, industry, specific terminology

3.1b. **Context Gathering (Update path)**
- Fetch full content of `target_document_id`
- Identify which section(s) of that document are most relevant to the gap questions
- Gather the same question samples and expert knowledge as the Create path
- Goal: generate a targeted patch (new section, expanded section, or corrected content) rather than a full rewrite

3.2. **Generation Prompt Engineering (Create path)**
```
System: You are a professional documentation writer for [Company Name], 
a [industry] franchise organization.

Context:
- Style Guide: [Extracted style profile]
- Related Documentation: [Existing doc snippets]
- Questions Being Asked: [Sample questions]
- Expert Sources: [Industry best practices]

Task: Generate a comprehensive document that:
1. Answers all the sample questions thoroughly
2. Matches the style, tone, and formatting of existing documentation
3. Uses company-specific terminology
4. Includes proper sections with headings
5. Cites sources where appropriate
6. Is approximately [target_word_count] words

Output Format: Markdown
```

3.3. **Quality Checks**
- Minimum word count: 200 words
- Maximum word count: 2000 words (configurable)
- Must include at least 2 heading levels
- Must include at least 1 citation/source
- Content uniqueness check (not plagiarizing existing docs)
- Readability score (Flesch-Kincaid Grade Level ≤12)

3.4. **Metadata Generation**
- Suggested title (extracted from content)
- Suggested tags/categories
- Recommended visibility scope (company vs. franchisee vs. global)
- Target audience (roles that need this info)

3.5. **Generation Prompt Engineering (Update path)**
- System prompt specifies the agent is editing an existing document, not writing from scratch
- Input includes: full target document content, gap questions, expert sources
- Output: the full updated document (not just the patch) — this is what gets stored in `generated_content`
- The diff/patch (changed sections only) is stored separately in `target_document_patch` for the modal preview
- If approved, the existing document is replaced with `generated_content` (creating a new document version via `document_versions`)

3.6. **On-Demand Generation**
- Generation is triggered per-gap when the user clicks the button on the dashboard — not as a batch job
- A loading state is shown while generation runs (estimated 10–30 seconds)
- If generation fails, the error is shown inline and the user can retry
- Once generated, the result is stored in `knowledge_builder_suggestions` and the modal opens automatically

---

### FR-4: Evidence Package Creation

**Description:** Compile compelling evidence to show why documentation is needed.

**Requirements:**

4.1. **Gap Summary**
- Category/topic name
- Severity level with visual indicator
- Date range of analysis
- Total question count
- Trend indicator (↗ increasing, → stable, ↘ decreasing)

4.2. **Question Samples**
- List 5-10 representative questions (verbatim)
- Show timestamps
- Show who asked (role + anonymized name or count)
- Highlight key phrases/terms

4.3. **User Demographics**
- Breakdown by role (franchisor, franchisee owner, employee)
- Number of unique users affected
- Geographic distribution (if relevant)
- Franchise location count affected

4.4. **Impact Estimation**
- Estimated support hours spent on this gap
- Projected time savings after doc is published
- Estimated cost savings (hours × avg hourly rate)
- Franchisee satisfaction impact (qualitative)

4.5. **Related Documentation**
- List existing related documents
- Explain how new doc complements existing content
- Highlight gaps in current documentation

---

### FR-5: Delivery & Notification

**Description:** Send generated documentation to franchisor admins for review.

**Requirements:**

5.1. **Email Format**
- Subject: "Knowledge Builder: [X] gaps need documentation — review now"
- Professional HTML template
- Mobile-responsive design
- Single primary CTA button

5.2. **Email Content Structure**
```
Header:
- Frantelligence logo
- "Knowledge Builder Agent" branding

Summary:
- "We noticed [X] topics your franchisees are asking about that 
   aren't covered in your knowledge base."
- Brief list: gap category + question count per gap
  e.g. • Equipment Maintenance — asked 12 times
       • Employee Scheduling — asked 6 times
       • POS Troubleshooting — asked 3 times

Primary CTA:
[ Review Suggestions in App → ]  (links to app.frantelligence.ai/knowledge-gaps)

Footer:
- Settings link (notification frequency, severity threshold)
- Unsubscribe option (required by law)
```

**Why a single CTA:** All review actions (approve, edit, dismiss) happen in the app via the per-gap modal. The email's only job is to bring the admin back to the dashboard.

5.3. **In-App Notification**
- Badge count on KB navigation item showing pending suggestions
- Toast notification when a new suggestion is ready

5.4. **Delivery Rules**
- Email is event-driven: it fires as soon as a gap crosses the minimum threshold (default: 3+ questions, High+ severity)
- Hard cooldown: if an email was sent to this company within the last 7 days, do not send another one — queue any new qualifying gaps instead
- When the 7-day cooldown expires, if there are queued gaps, send one batched email covering all of them
- Result: at most 1 email per company per week, but it always fires promptly on the first qualifying event within that window

**Implementation note:** Requires `last_kb_notification_sent_at TIMESTAMPTZ` stored per company (add to `knowledge_builder_style_profiles` or a dedicated settings record). Before sending, check `now() - last_kb_notification_sent_at > interval '7 days'`. After sending, update that timestamp.

---

### FR-6: Approval Workflow

**Description:** The primary review experience is in-app via a modal on the Knowledge Gaps Dashboard. Email drives the admin back to the app; all actions happen there.

**Requirements:**

6.0. **Per-Gap Trigger Button (Dashboard)**
- Each gap row in the dashboard displays a button whose label is determined by the path decision (FR-3.0):
  - `Create Document` — no related document found above threshold
  - `Update Document` — related document found; shows which document will be updated
- Clicking the button triggers on-demand generation with a loading spinner
- Once generation completes, the review modal opens automatically
- If a suggestion already exists for this gap (was generated before), the button label becomes `Review Suggestion` and opens the modal immediately without re-generating

6.1. **Review Modal**
- Opens on the same page (no navigation away from the dashboard)
- **Create path modal layout:**
  - Tab 1: Generated document preview (rendered markdown)
  - Tab 2: Evidence — sample questions, who asked, frequency, trend
  - Action bar: `Approve & Publish` / `Edit in KB` / `Dismiss`
- **Update path modal layout:**
  - Tab 1: Diff view — existing document with additions/changes highlighted
  - Tab 2: Full updated document preview
  - Tab 3: Evidence — same as above
  - Shows which document is being updated (document name, link)
  - Action bar: `Approve Update` / `Edit in KB` / `Dismiss`

6.2. **Approve Action**
- Single click from modal → document published to KB
- Create path: new document created with suggested visibility
- Update path: existing document content replaced; new version created in `document_versions`
- Document enters processing pipeline (chunking → embedding → RAG-ready)
- Gap marked as "resolved"
- Modal closes, gap row updates to show "Resolved" status

6.3. **Edit Action**
- Opens KB document editor in a new tab
- Create path: editor pre-filled with generated document content and metadata
- Update path: editor pre-filled with the full updated document (`generated_content`)
- On publish from editor: gap marked as "resolved"; system tracks what changed vs. generated draft

6.4. **Dismiss Action**
- Quick reason picker: "Already documented elsewhere" / "Not applicable" / "Other"
- Gap marked as "dismissed"
- Won't trigger a new suggestion for the same question cluster
- Can be undone from the gap row (status shown as "Dismissed" with undo option)

6.5. **Tracking & Learning**
- Log all actions (approve, edit, dismiss) with timestamp and user
- Track whether documents were approved as-is or edited
- Store diffs when edits occur (future: use to improve style extraction)
- Display approval rate and suggestion count in the dashboard metrics section

---

### FR-7: Dashboard & Analytics

**Description:** Admin interface for managing Knowledge Builder Agent.

**Requirements:**

7.1. **Dashboard Components**
- **Gap table** — list of detected gaps sorted by severity. Each row shows:
  - Gap category/topic
  - Question count and unique user count
  - Severity level (Critical / High / Medium / Low)
  - Trend indicator (↗ ↔ ↘)
  - Status (Open / Suggestion Ready / Resolved / Dismissed)
  - Action button: `Create Document` / `Update Document` / `Review Suggestion` (per FR-6.0)
- **Approved documents list** — recently approved suggestions with links to the published docs
- **Dismissed gaps list** — dismissed gaps with reasons and undo option
- **Summary metrics** — total suggestions generated, approval rate, docs published this month

7.2. **Configuration Settings**
- Enable/disable Knowledge Builder
- Set notification frequency
- Set severity threshold
- Configure categories to monitor
- Exclude specific topics from generation
- Set style refresh schedule

7.3. **History View**
- All generated documents (approved, edited, dismissed)
- Timestamps and actors
- Before/after comparison for edited docs
- Gap resolution timeline

7.4. **Metrics & Reporting**
- Total documents generated
- Approval rate
- Edit rate
- Average time to approve
- Question reduction per document
- Estimated ROI

---

## Technical Requirements

### TR-1: Backend Components

**New Services Required:**

1. **`GapDetectionService`** (`ai-backend/app/services/gap_detection.py`)
   ```python
   class GapDetectionService:
       async def detect_gaps(
           self, 
           company_id: str, 
           days: int = 30
       ) -> List[KnowledgeGap]:
           """Query knowledge_gap_analysis and score gaps."""
   
       async def cluster_questions(
           self, 
           questions: List[str]
       ) -> Dict[str, List[str]]:
           """Group similar questions using embeddings."""
   
       async def calculate_severity(
           self, 
           gap: GapData
       ) -> int:
           """Score gap based on frequency, users, trend."""
   ```

2. **`StyleExtractionService`** (`ai-backend/app/services/style_extraction.py`)
   ```python
   class StyleExtractionService:
       async def extract_style_profile(
           self, 
           company_id: str
       ) -> StyleProfile:
           """Analyze company documents and extract style."""
   
       async def get_sample_documents(
           self, 
           company_id: str, 
           count: int = 5
       ) -> List[Document]:
           """Fetch top documents for analysis."""
   
       async def cache_style_profile(
           self, 
           company_id: str, 
           profile: StyleProfile
       ):
           """Store style profile for reuse."""
   ```

3. **`DocumentGenerationService`** (`ai-backend/app/services/document_generation.py`)
   ```python
   class DocumentGenerationService:
       async def generate_document(
           self, 
           gap: KnowledgeGap,
           style_profile: StyleProfile,
           context: GenerationContext
       ) -> GeneratedDocument:
           """Generate documentation for a gap."""
   
       async def gather_context(
           self, 
           gap: KnowledgeGap
       ) -> GenerationContext:
           """Fetch relevant docs and expert sources."""
   
       async def validate_quality(
           self, 
           document: str
       ) -> QualityScore:
           """Check document meets quality standards."""
   ```

4. **`KnowledgeBuilderOrchestrator`** (`ai-backend/app/services/kb_orchestrator.py`)
   ```python
   class KnowledgeBuilderOrchestrator:
       """Coordinates the full Knowledge Builder workflow."""
   
       async def run_full_cycle(self, company_id: str):
           """Execute complete gap detection → generation → delivery."""
   
       async def process_approval(self, approval_token: str):
           """Handle one-click approve from email."""
   
       async def process_edit(self, edit_token: str):
           """Prepare document for editing."""
   
       async def process_dismissal(
           self, 
           dismissal_token: str, 
           reason: str
       ):
           """Mark gap as dismissed."""
   ```

**New API Endpoints:**

```python
# ai-backend/app/routers/knowledge_builder.py

@router.post("/api/v1/knowledge-builder/run")
async def trigger_knowledge_builder(
    company_id: str,
    current_user: User = Depends(require_franchisor_admin)
):
    """Manually trigger Knowledge Builder for a company."""

@router.get("/api/v1/knowledge-builder/gaps")
async def list_gaps(
    company_id: str,
    status: str = "pending",
    current_user: User = Depends(get_current_user)
):
    """List all detected gaps for review."""

@router.post("/api/v1/knowledge-builder/approve/{token}")
async def approve_document(token: str):
    """One-click approve from email link."""

@router.post("/api/v1/knowledge-builder/dismiss/{token}")
async def dismiss_gap(token: str, reason: str):
    """Dismiss a gap."""

@router.get("/api/v1/knowledge-builder/preview/{token}")
async def preview_document(token: str):
    """Preview generated document."""
```

---

### TR-2: Database Schema

**New Tables:**

```sql
-- Style profiles per company (also stores notification state)
CREATE TABLE knowledge_builder_style_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  
  -- Style data (JSONB for flexibility)
  style_data JSONB NOT NULL,
  
  -- Analysis metadata
  based_on_documents UUID[] NOT NULL, -- Document IDs analyzed
  analyzed_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Notification cooldown (enforce max 1 email per 7 days)
  last_kb_notification_sent_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(company_id)
);

-- Generated documentation pending approval
CREATE TABLE knowledge_builder_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  
  -- Gap information
  gap_id UUID NOT NULL, -- Links to knowledge_gaps table
  gap_category TEXT NOT NULL,
  severity_score INTEGER NOT NULL,

  -- Suggestion type (determined before generation via semantic search)
  suggestion_type TEXT NOT NULL DEFAULT 'create', -- 'create' | 'update'
  target_document_id UUID REFERENCES documents(id), -- populated when suggestion_type = 'update'
  target_document_patch TEXT, -- markdown section(s) to add/modify; populated when suggestion_type = 'update'

  -- Generated content
  generated_title TEXT NOT NULL,
  generated_content TEXT NOT NULL, -- Markdown (full doc for 'create'; updated full doc for 'update')
  suggested_tags TEXT[],
  suggested_visibility TEXT[] DEFAULT ARRAY['company'],
  
  -- Evidence
  triggering_questions JSONB NOT NULL, -- Array of question objects
  user_demographics JSONB NOT NULL, -- Role breakdown
  impact_estimate JSONB NOT NULL, -- Hours saved, etc.
  
  -- Workflow state
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, edited, dismissed
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  dismissal_reason TEXT,
  
  -- Published document (if approved)
  published_document_id UUID REFERENCES documents(id),
  
  -- Tokens for email actions
  approval_token TEXT UNIQUE NOT NULL,
  edit_token TEXT UNIQUE NOT NULL,
  dismiss_token TEXT UNIQUE NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Track Knowledge Builder runs
CREATE TABLE knowledge_builder_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  
  -- Run metadata
  triggered_by TEXT NOT NULL, -- 'scheduled' | 'manual' | 'webhook'
  triggered_by_user_id UUID REFERENCES profiles(id),
  
  -- Results
  gaps_detected INTEGER NOT NULL,
  documents_generated INTEGER NOT NULL,
  notifications_sent INTEGER NOT NULL,
  
  -- Performance
  duration_ms INTEGER NOT NULL,
  tokens_used INTEGER NOT NULL,
  cost_usd DECIMAL(10, 4) NOT NULL,
  
  -- Status
  status TEXT NOT NULL, -- 'running', 'completed', 'failed'
  error_message TEXT,
  
  -- Timestamps
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Track outcomes for learning
CREATE TABLE knowledge_builder_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suggestion_id UUID NOT NULL REFERENCES knowledge_builder_suggestions(id),
  
  -- Before/after metrics
  questions_before INTEGER NOT NULL, -- Questions in 30 days before
  questions_after INTEGER NOT NULL, -- Questions in 30 days after
  reduction_percent DECIMAL(5, 2),
  
  -- Engagement metrics
  document_views INTEGER DEFAULT 0,
  document_unique_viewers INTEGER DEFAULT 0,
  
  -- Edit analysis (if document was edited before approval)
  was_edited BOOLEAN NOT NULL DEFAULT false,
  edit_summary TEXT, -- Brief description of changes
  
  -- Timestamps
  measured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_kb_suggestions_company ON knowledge_builder_suggestions(company_id);
CREATE INDEX idx_kb_suggestions_status ON knowledge_builder_suggestions(status);
CREATE INDEX idx_kb_suggestions_created ON knowledge_builder_suggestions(created_at DESC);
CREATE INDEX idx_kb_runs_company ON knowledge_builder_runs(company_id);
CREATE INDEX idx_kb_runs_created ON knowledge_builder_runs(started_at DESC);

-- RLS Policies
ALTER TABLE knowledge_builder_style_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_builder_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_builder_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_builder_outcomes ENABLE ROW LEVEL SECURITY;

-- Franchisor admins can view their company's data
CREATE POLICY "kb_profiles_company_read" ON knowledge_builder_style_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.company_id = knowledge_builder_style_profiles.company_id
      AND p.user_type IN ('franchisor_admin', 'franchisor_employee')
    )
  );

CREATE POLICY "kb_suggestions_company_read" ON knowledge_builder_suggestions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.company_id = knowledge_builder_suggestions.company_id
      AND p.user_type IN ('franchisor_admin', 'franchisor_employee')
    )
  );

CREATE POLICY "kb_runs_company_read" ON knowledge_builder_runs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.company_id = knowledge_builder_runs.company_id
      AND p.user_type IN ('franchisor_admin', 'franchisor_employee')
    )
  );

-- Outcomes are readable by anyone who can read the parent suggestion
CREATE POLICY "kb_outcomes_company_read" ON knowledge_builder_outcomes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM knowledge_builder_suggestions s
      JOIN profiles p ON p.company_id = s.company_id
      WHERE s.id = knowledge_builder_outcomes.suggestion_id
      AND p.id = auth.uid()
      AND p.user_type IN ('franchisor_admin', 'franchisor_employee')
    )
  );

-- All writes (INSERT/UPDATE) to these tables use service_role from backend services.
-- No authenticated INSERT policies needed.
```

---

### TR-3: Edge Functions

**New Functions:**

1. **`knowledge-builder-scheduler`** (`supabase/functions/knowledge-builder-scheduler/index.ts`)
   ```typescript
   // Triggered by pg_cron daily/weekly
   serve(async (req: Request) => {
     // Get all companies with Knowledge Builder enabled
     const companies = await getActiveCompanies();
     
     for (const company of companies) {
       // Trigger backend orchestrator
       await fetch(`${AI_BACKEND_URL}/api/v1/knowledge-builder/run`, {
         method: 'POST',
         body: JSON.stringify({ company_id: company.id }),
       });
     }
     
     return new Response('OK');
   });
   ```

2. **`knowledge-builder-webhook`** (`supabase/functions/knowledge-builder-webhook/index.ts`)
   ```typescript
   // Handle approval/edit/dismiss actions from email
   serve(async (req: Request) => {
     const { action, token } = await req.json();
     
     switch (action) {
       case 'approve':
         await handleApproval(token);
         break;
       case 'edit':
         await handleEdit(token);
         break;
       case 'dismiss':
         await handleDismissal(token);
         break;
     }
     
     return new Response(JSON.stringify({ success: true }));
   });
   ```

---

### TR-4: Frontend Components

**New Components:**

1. **`KnowledgeBuilderDashboard.tsx`**
   - Main dashboard view
   - List of pending suggestions
   - Metrics cards (approval rate, docs generated, impact)
   - Settings panel

2. **`KnowledgeBuilderSuggestionCard.tsx`**
   - Display single suggestion with evidence
   - Preview modal
   - Approve/edit/dismiss buttons
   - Status badges

3. **`KnowledgeBuilderSettings.tsx`**
   - Toggle enable/disable
   - Configure notification frequency
   - Set severity threshold
   - Manage excluded categories

4. **`KnowledgeBuilderMetrics.tsx`**
   - Charts showing impact over time
   - ROI calculator
   - Question reduction trends

**Integration Points:**

- Add KB navigation item (visible to franchisor admins only)
- Badge count for pending reviews
- Link from Knowledge Gaps Dashboard → KB Agent Dashboard
- Link from generated document → originating gap analysis

---

### TR-5: Email Templates

**New Resend Templates:**

1. **`knowledge-builder-digest.html`**
   - Weekly digest format
   - Responsive design
   - Action buttons with tracking

2. **`knowledge-builder-approval-confirmation.html`**
   - Sent after document is approved
   - Shows published document link
   - Encourages sharing with team

3. **`knowledge-builder-impact-report.html`**
   - Monthly summary of impact
   - Metrics and charts
   - ROI calculation

---

### TR-6: Cron Jobs

**Scheduled Tasks:**

```sql
-- Daily gap detection (runs at 2 AM UTC)
SELECT cron.schedule(
  'knowledge-builder-daily-scan',
  '0 2 * * *',
  $$
  SELECT net.http_post(
    url := 'https://[project-id].supabase.co/functions/v1/knowledge-builder-scheduler',
    headers := '{"Authorization": "Bearer [anon-key]"}'::jsonb
  );
  $$
);

-- Weekly style refresh (runs Sunday 1 AM UTC)
SELECT cron.schedule(
  'knowledge-builder-style-refresh',
  '0 1 * * 0',
  $$
  SELECT net.http_post(
    url := 'https://[project-id].supabase.co/functions/v1/knowledge-builder-style-refresh',
    headers := '{"Authorization": "Bearer [anon-key]"}'::jsonb
  );
  $$
);
```

---

### TR-7: LLM Configuration

**Models to Use (all via OpenRouter):**

- **Style Extraction:** Claude Sonnet 4.5 (high quality analysis)
- **Document Generation:** Claude Sonnet 4.5 (long-form content)
- **Quality Validation:** Claude Haiku (cost-effective for checks)

**Prompts to Develop:**

1. `prompts/style_extraction.txt`
2. `prompts/document_generation.txt`
3. `prompts/quality_validation.txt`

**Token Budget:**

- Style extraction: ~8K tokens per company per week
- Document generation: ~4K tokens per document
- Quality validation: ~2K tokens per document
- Estimated monthly cost: $5-15 per company (depending on gap frequency)

---

### TR-8: Performance Requirements

**Response Times:**
- Email action (approve/dismiss): <2 seconds
- Preview load: <1 second
- Dashboard load: <2 seconds
- Full generation cycle: <5 minutes per company

**Scalability:**
- Support 1,000+ companies
- Handle 100+ concurrent generations
- Process 10,000+ questions per analysis run

**Reliability:**
- 99.9% uptime for approval endpoints
- Retry logic for email delivery
- Graceful degradation if LLM API is down

---

### TR-9: Feature Flag

**Flag:** `VITE_FEATURE_KNOWLEDGE_BUILDER`

This feature is gated behind a Vercel environment variable so it can be enabled per-environment without a code deploy.

**What it gates:**
- The "Generate Document" trigger button on the Knowledge Gaps Dashboard
- The draft review inbox/page (pending drafts, approve/edit/reject UI)
- The Knowledge Builder metrics section in the operations dashboard
- The backend `/api/v1/knowledge-builder/` router (returns 404 if flag is off)

**Vercel setup:**

| Environment | Value | Intent |
|---|---|---|
| Preview | `true` | Always testable on dev preview URLs |
| Production | unset (defaults to `false`) | Off until launch-ready |
| Production (launch) | `true` | Set when feature ships to customers |

**To enable locally:** Add `VITE_FEATURE_KNOWLEDGE_BUILDER=true` to your `.env.local`.

**Registration:** The flag is registered in `src/config/environment.ts` as `config.features.knowledgeBuilder`. All UI entry points should read from `config.features.knowledgeBuilder` — not directly from `import.meta.env`.

**Kill switch:** Remove the env var from Vercel Production and redeploy. The feature disappears instantly without any code change.

---

## Architecture Design

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE BUILDER AGENT                       │
└─────────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
┌───────────────────┐                  ┌─────────────────────┐
│  Scheduled Job    │                  │   Manual Trigger    │
│  (pg_cron daily)  │                  │   (Admin Dashboard) │
└─────────┬─────────┘                  └──────────┬──────────┘
          │                                       │
          └───────────────┬───────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────┐
        │  Edge Function: knowledge-builder-scheduler  │
        │  • Fetch companies with KB enabled       │
        │  • Trigger backend orchestrator          │
        └─────────────────┬─────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────┐
        │  Backend: KnowledgeBuilderOrchestrator  │
        └─────────────────┬─────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌─────────────────┐              ┌──────────────────┐
│ 1. GAP DETECTION│              │ 2. STYLE         │
│                 │              │    EXTRACTION    │
│ • Query DB      │              │                  │
│ • Score gaps    │              │ • Get samples    │
│ • Cluster Qs    │              │ • Analyze style  │
│ • Filter by     │              │ • Cache profile  │
│   severity      │              │                  │
└────────┬────────┘              └─────────┬────────┘
         │                                 │
         └────────────┬────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────────┐
        │ 3. DOCUMENT GENERATION          │
        │                                 │
        │ For each high-severity gap:     │
        │ • Gather context (RAG + expert) │
        │ • Generate document (LLM)       │
        │ • Validate quality              │
        │ • Create evidence package       │
        │ • Generate action tokens        │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │ 4. STORE & NOTIFY               │
        │                                 │
        │ • Save to kb_suggestions table  │
        │ • Send email via Resend         │
        │ • Create in-app notification    │
        └─────────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │ 5. WAIT FOR USER ACTION         │
        │                                 │
        │ [Approve] → Auto-publish to KB  │
        │ [Edit] → Open KB editor         │
        │ [Dismiss] → Mark gap resolved   │
        └─────────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │ 6. TRACK OUTCOME                │
        │                                 │
        │ • Monitor question reduction    │
        │ • Track document engagement     │
        │ • Calculate ROI                 │
        │ • Learn from edits              │
        └─────────────────────────────────┘
```

### Data Flow

**Phase 1: Detection & Analysis**
```
PostgreSQL (knowledge_gap_analysis view)
  → GapDetectionService.detect_gaps()
  → Cluster similar questions via embeddings
  → Calculate severity scores
  → Return List[KnowledgeGap]
```

**Phase 2: Style Learning**
```
PostgreSQL (documents table)
  → StyleExtractionService.get_sample_documents()
  → Send samples to GPT-4
  → Parse style profile JSON response
  → Cache in knowledge_builder_style_profiles table
```

**Phase 3: Content Generation**
```
KnowledgeGap + StyleProfile
  → DocumentGenerationService.gather_context()
     ├─ RAG search (existing docs)
     ├─ Expert search (industry sources)
     └─ Question clustering (what to answer)
  → Build generation prompt
  → Call GPT-4 with full context
  → Validate output quality
  → Return GeneratedDocument
```

**Phase 4: Delivery**
```
GeneratedDocument
  → Create approval/edit/dismiss tokens (JWT with 30-day expiry)
  → Build evidence package
  → Store in knowledge_builder_suggestions table
  → Format email HTML
  → Send via Resend
  → Create in-app notification
```

**Phase 5: User Action**
```
User Clicks Button in Email
  → Edge function: knowledge-builder-webhook
  → Verify token validity
  → Route to backend orchestrator
  
  IF approve:
    → Upload document to KB (with proper visibility)
    → Mark suggestion as "approved"
    → Send confirmation email
    → Log to knowledge_builder_outcomes
  
  IF edit:
    → Generate KB editor URL with pre-filled content
    → Redirect user
    → Mark suggestion as "edited"
    → Track diff when saved
  
  IF dismiss:
    → Mark suggestion as "dismissed"
    → Store reason
    → Mark gap as "resolved"
```

**Phase 6: Impact Tracking**
```
Daily job:
  → For each approved document (>7 days old):
     ├─ Query questions matching original gap
     ├─ Compare frequency before vs. after
     ├─ Calculate reduction percentage
     ├─ Track document views
     └─ Update knowledge_builder_outcomes table
```

---

## MVP Scope

### What's Included in MVP

**Core Workflow (Per-Gap On-Demand):**
- ✅ Gap detection and severity scoring on existing Knowledge Gaps Dashboard
- ✅ Per-gap action button: `Create Document` or `Update Document` (path determined by semantic search)
- ✅ On-demand generation triggered per gap (loading state while AI runs)
- ✅ Basic style extraction (analyze 3 sample docs for voice/tone)
- ✅ Create path: brand new document generated in company style
- ✅ Update path: existing document updated; diff shown in modal
- ✅ In-app review modal: document preview + evidence package + approve/edit/dismiss
- ✅ Approve → auto-publish to KB (new doc or updated doc version)
- ✅ Edit → opens KB editor pre-filled with generated content
- ✅ Dismiss → gap marked resolved with reason
- ✅ Email notification: HTML email with summary of pending gaps + single CTA link to app dashboard
- ✅ Basic metrics: suggestions generated, approval rate, docs published

**Simplified Approach for MVP:**
- Single gap generation at a time (no batch; user triggers per gap)
- Style extraction runs fresh per generation (no caching in MVP)
- Email is a simple notification digest, not a per-action workflow (all actions in app)
- No automated scheduling — admin triggers generation manually from dashboard

### What's Deferred Post-MVP

**Month 2:**
- ❌ Automated scheduling (daily/weekly runs without manual trigger)
- ❌ Style profile caching (refresh weekly, not per generation)
- ❌ Advanced metrics and ROI reports

**Month 3+:**
- ❌ Advanced style learning from edit patterns (feedback loop)
- ❌ Automated gap clustering (currently per-gap, not clustered batches)
- ❌ Multi-language support
- ❌ Collaborative review (multiple approvers)
- ❌ Bulk approve/dismiss from dashboard

### MVP Development Phases

**Phase 1: Backend Foundation (Week 1)**
- [ ] Create database schema (4 new tables)
- [ ] Build GapDetectionService
- [ ] Build StyleExtractionService (basic version)
- [ ] Build DocumentGenerationService
- [ ] Build KnowledgeBuilderOrchestrator
- [ ] Create API endpoints
- [ ] Write tests

**Phase 2: Email & Workflow (Week 2)**
- [ ] Design email template
- [ ] Build evidence package formatter
- [ ] Implement token-based actions
- [ ] Create webhook handler
- [ ] Test end-to-end approval flow
- [ ] Test edit flow
- [ ] Test dismiss flow

**Phase 3: Frontend Integration (Week 3)**
- [ ] Add trigger button to Knowledge Gaps Dashboard
- [ ] Create preview modal
- [ ] Add success/error notifications
- [ ] Build simple metrics display
- [ ] Test full user journey
- [ ] Polish UI/UX

**Phase 4: Testing & Launch (Week 4)**
- [ ] Internal dogfooding (use on Frantelligence's own KB)
- [ ] Beta test with 2-3 friendly customers
- [ ] Gather feedback and iterate
- [ ] Performance optimization
- [ ] Documentation and training materials
- [ ] Launch to all eligible customers (feature flag enabled in Vercel Production)

---

## Success Metrics

### Primary Metrics (Lagging)

1. **Adoption Rate**
   - **Target:** 60% of franchisor admins use the feature monthly
   - **Measure:** `unique_users / total_eligible_users`

2. **Approval Rate**
   - **Target:** 50% of generated documents approved
   - **Measure:** `approved_docs / total_generated_docs`

3. **Question Reduction**
   - **Target:** 25% reduction in repeat questions after doc is published
   - **Measure:** `(questions_before - questions_after) / questions_before`

4. **Time Savings**
   - **Target:** 12 hours/month saved per customer
   - **Measure:** User survey + proxy metrics (docs approved × avg writing time)

### Secondary Metrics (Leading)

1. **Gap Detection Accuracy**
   - **Target:** 80% of detected gaps are real (not noise)
   - **Measure:** `approved_docs + dismissed_with_reason / total_suggestions`

2. **Document Quality**
   - **Target:** 80% of documents require no edits
   - **Measure:** `approved_as_is / (approved_as_is + edited_before_approval)`

3. **Email Engagement**
   - **Target:** 40% email open rate, 15% click-through rate
   - **Measure:** Resend analytics

4. **Feature Retention**
   - **Target:** 80% of users who approve 1 doc approve 3+ docs within 90 days
   - **Measure:** Cohort analysis

### Business Impact Metrics

1. **Upsell Contribution**
   - % of new tier upgrades attributed to Knowledge Builder

2. **Churn Reduction**
   - % decrease in churn among customers using Knowledge Builder

3. **Customer Satisfaction**
   - NPS score improvement
   - Support ticket sentiment analysis

---

## Timeline & Milestones

### MVP Timeline (4 Weeks)

**Week 1: Backend Foundation**
- Day 1-2: Database schema + migrations
- Day 3-5: Core services (gap detection, style extraction)
- Day 5-7: Document generation pipeline

**Week 2: Email & Workflow**
- Day 8-10: Email template design + implementation
- Day 11-12: Token-based action handlers
- Day 13-14: End-to-end testing

**Week 3: Frontend Integration**
- Day 15-16: Dashboard components
- Day 17-18: Integration with Knowledge Gaps page
- Day 19-21: UI polish + edge case handling

**Week 4: Testing & Launch**
- Day 22-23: Internal dogfooding
- Day 24-25: Beta testing with customers
- Day 26-27: Bug fixes and optimizations
- Day 28: Soft launch (enable feature flag in Vercel Production)

### Post-MVP Roadmap

**Month 2: Automation & Polish**
- Automated scheduling (no manual trigger)
- In-app review dashboard
- Advanced metrics and reporting
- Performance optimization

**Month 3: Intelligence & Learning**
- Style learning from edits
- Improved gap clustering
- Personalized generation per company
- A/B testing different prompt strategies

**Month 4: Scale & Enterprise**
- Multi-language support
- Collaborative review workflows
- API access for enterprises
- White-label capabilities

---

## Risks & Mitigations

### Risk 1: Generated Content Quality

**Risk:** AI-generated docs may be inaccurate or low-quality, damaging trust.

**Likelihood:** Medium  
**Impact:** High

**Mitigation:**
- Human-in-the-loop approval (never auto-publish)
- Quality validation checks before sending
- Clear "AI-generated" labeling
- Easy dismiss option
- Start with low-risk categories (FAQs, basic procedures)
- Extensive testing before launch

---

### Risk 2: Email Fatigue

**Risk:** Users ignore/unsubscribe from weekly emails.

**Likelihood:** Medium  
**Impact:** Medium

**Mitigation:**
- Configurable frequency (daily to monthly)
- Digest format (batch multiple gaps)
- Severity threshold (only notify High+ by default)
- In-app alternative (dashboard view)
- Clear unsubscribe option
- Monitor engagement metrics closely

---

### Risk 3: Style Extraction Inaccuracy

**Risk:** Generated docs don't match company voice, requiring extensive edits.

**Likelihood:** Medium  
**Impact:** Medium

**Mitigation:**
- Start conservative (formal, professional tone)
- Learn from edit patterns over time
- Allow manual style guide upload
- Show confidence score with each generation
- A/B test different extraction approaches

---

### Risk 4: Legal/Compliance Issues

**Risk:** Generated docs for sensitive topics (legal, safety) could create liability.

**Likelihood:** Low  
**Impact:** High

**Mitigation:**
- Flag sensitive categories (Legal, Safety, HR, Compliance)
- Require extra review step for flagged categories
- Include disclaimer: "Review with legal counsel before publishing"
- Allow admins to exclude categories from agent
- Maintain audit trail of all generated content

---

### Risk 5: Integration Complexity

**Risk:** Connecting all pieces takes longer than estimated.

**Likelihood:** Medium  
**Impact:** Medium

**Mitigation:**
- Leverage existing infrastructure (80% already built)
- Start with simple MVP (no advanced features)
- Incremental development with weekly demos
- Clear technical specs upfront
- Buffer in timeline (4 weeks instead of 2)

---

### Risk 6: LLM API Costs

**Risk:** Generation costs exceed budget or pricing assumptions.

**Likelihood:** Low  
**Impact:** Medium

**Mitigation:**
- Monitor token usage in LangFuse
- Set per-company generation limits
- Use cost-effective models for validation
- Cache style profiles (analyze once, use many times)
- Per-company generation limits configurable by admin

---

## Future Enhancements

### Phase 2: Advanced Features

**Multi-Modal Documentation:**
- Generate video scripts from gaps
- Create visual diagrams and flowcharts
- Record audio summaries
- Generate interactive quizzes

**Collaborative Review:**
- Multi-step approval workflow
- Comments and suggestions on drafts
- Version comparison
- Track reviewer feedback

**Smart Recommendations:**
- Suggest updates to existing docs (not just new ones)
- Identify outdated documentation
- Recommend document merging/splitting
- Auto-tag documents with topics

### Phase 3: Intelligence & Personalization

**Advanced Style Learning:**
- Fine-tune small language model on company docs
- Learn from approved/edited documents
- Adapt tone per document category
- A/B test generation strategies

**Predictive Gap Detection:**
- Predict gaps before questions are asked
- Seasonal gap detection (e.g., holiday procedures)
- Industry trend monitoring
- Competitor intelligence

**Auto-Generated Content Types:**
- FAQ sections
- Troubleshooting guides
- Best practice documents
- Case studies from franchisee success stories

### Phase 4: Platform Integration

**API for Developers:**
- Webhook for gap detection events
- API to trigger generation programmatically
- Custom prompt templates
- White-label embedding

**Integration Marketplace:**
- Export to Notion, Confluence, SharePoint
- Sync with LMS platforms
- Integration with CMS systems
- PDF generation with branded templates

**Analytics & Reporting:**
- Executive dashboards
- ROI calculator
- Impact reports for stakeholders
- Competitive benchmarking

---

## Acceptance Criteria

### Definition of Done (MVP)

**Must Have:**
- [ ] Manual trigger button in Knowledge Gaps Dashboard works
- [ ] System detects gaps from last 30 days of chat history
- [ ] Gaps are scored and sorted by severity
- [ ] Top 3 gaps are selected for generation
- [ ] Style profile is extracted from 3 sample documents
- [ ] Document is generated with proper formatting (markdown)
- [ ] Email is sent with evidence package
- [ ] Email includes working Approve/Edit/Dismiss buttons
- [ ] Approve button publishes document to KB
- [ ] Edit button opens KB editor with pre-filled content
- [ ] Dismiss button marks gap as resolved
- [ ] All actions send confirmation
- [ ] Dashboard shows generated document count
- [ ] No security vulnerabilities in token handling
- [ ] Tests cover critical paths (80%+ coverage)
- [ ] Documentation for admins on how to use feature

**Should Have:**
- [ ] Generated documents match company style >70% of the time
- [ ] Email template is mobile-responsive
- [ ] In-app notification when email is sent
- [ ] Basic metrics (approval rate, docs generated)
- [ ] Error handling and retry logic

**Nice to Have:**
- [ ] Preview modal in dashboard
- [ ] Batch dismiss multiple gaps
- [ ] Export gap analysis to CSV
- [ ] Slack notification option (in addition to email)

---

## Technical Specifications

### API Contracts

**Trigger Knowledge Builder:**
```typescript
POST /api/v1/knowledge-builder/run
Authorization: Bearer <jwt>

Request:
{
  "company_id": "uuid",
  "options": {
    "days": 30,              // Analyze last N days
    "severity_threshold": 30, // Minimum severity score
    "max_gaps": 3,           // Max suggestions to generate
    "categories": ["all"]    // Or specific categories
  }
}

Response:
{
  "run_id": "uuid",
  "status": "running",
  "estimated_completion_seconds": 300,
  "gaps_detected": 5,
  "documents_generating": 3
}
```

**List Suggestions:**
```typescript
GET /api/v1/knowledge-builder/suggestions?company_id=<uuid>&status=pending
Authorization: Bearer <jwt>

Response:
{
  "suggestions": [
    {
      "id": "uuid",
      "gap_category": "Equipment Maintenance",
      "severity_score": 45,
      "question_count": 12,
      "unique_users": 8,
      "generated_title": "Equipment Maintenance Guide",
      "preview_url": "https://...",
      "status": "pending",
      "created_at": "2026-02-06T10:00:00Z"
    }
  ],
  "total": 1
}
```

**Approve Document:**
```typescript
POST /api/v1/knowledge-builder/approve/<token>

Response:
{
  "success": true,
  "document_id": "uuid",
  "document_url": "https://app.frantelligence.ai/kb/docs/uuid"
}
```

### Database Schema (Expanded)

**Additional Indexes:**
```sql
-- Fast lookup by token
CREATE INDEX idx_kb_suggestions_approval_token 
ON knowledge_builder_suggestions(approval_token);

CREATE INDEX idx_kb_suggestions_edit_token 
ON knowledge_builder_suggestions(edit_token);

CREATE INDEX idx_kb_suggestions_dismiss_token 
ON knowledge_builder_suggestions(dismiss_token);

-- Fast filtering by status and severity
CREATE INDEX idx_kb_suggestions_status_severity 
ON knowledge_builder_suggestions(status, severity_score DESC);

-- Find gaps needing outcome tracking
CREATE INDEX idx_kb_suggestions_approved_date 
ON knowledge_builder_suggestions(reviewed_at) 
WHERE status = 'approved';
```

**Additional RLS Policies:**
```sql
-- Franchisor admins can update their suggestions
CREATE POLICY "kb_suggestions_admin_update" ON knowledge_builder_suggestions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.company_id = knowledge_builder_suggestions.company_id
      AND p.user_type IN ('franchisor_admin', 'franchisor_employee')
    )
  );

-- Note: token-based email webhook updates (approve/edit/dismiss from email links)
-- use the service_role key in the edge function, bypassing RLS entirely.
-- Token validation (expiry, usage) is enforced in the edge function before any DB write.
```

---

## Implementation Checklist

### Backend Tasks

- [ ] **Database:**
  - [ ] Create migration file
  - [ ] Add 4 new tables
  - [ ] Create indexes
  - [ ] Add RLS policies
  - [ ] Create helper functions

- [ ] **Services:**
  - [ ] `GapDetectionService` class
  - [ ] `StyleExtractionService` class
  - [ ] `DocumentGenerationService` class
  - [ ] `KnowledgeBuilderOrchestrator` class
  - [ ] Unit tests for each service

- [ ] **API:**
  - [ ] Create `routers/knowledge_builder.py`
  - [ ] Add 5 endpoints
  - [ ] Add authentication middleware
  - [ ] Add rate limiting
  - [ ] API documentation (Swagger)

- [ ] **Prompts:**
  - [ ] Style extraction prompt
  - [ ] Document generation prompt
  - [ ] Quality validation prompt
  - [ ] Store in `utils/prompts.py`

### Edge Functions Tasks

- [ ] **Scheduler Function:**
  - [ ] Create `knowledge-builder-scheduler/index.ts`
  - [ ] Add cron job configuration
  - [ ] Error handling and logging

- [ ] **Webhook Function:**
  - [ ] Create `knowledge-builder-webhook/index.ts`
  - [ ] Token validation
  - [ ] Action routing
  - [ ] Response handling

### Frontend Tasks

- [ ] **Components:**
  - [ ] Trigger button in Knowledge Gaps Dashboard
  - [ ] Loading state while generating
  - [ ] Success/error notifications
  - [ ] Simple metrics display

- [ ] **Integration:**
  - [ ] Add API calls to backend
  - [ ] Error handling
  - [ ] Loading states

### Email Tasks

- [ ] **Templates:**
  - [ ] Design email layout (Figma)
  - [ ] Implement HTML template
  - [ ] Test rendering in major email clients
  - [ ] Add tracking pixels (optional)

- [ ] **Content:**
  - [ ] Write copy for different severity levels
  - [ ] Create evidence package formatter
  - [ ] Design action buttons
  - [ ] Add footer with settings link

### Testing Tasks

- [ ] **Unit Tests:**
  - [ ] Gap detection logic
  - [ ] Style extraction logic
  - [ ] Document generation logic
  - [ ] Token generation and validation

- [ ] **Integration Tests:**
  - [ ] End-to-end approval flow
  - [ ] End-to-end edit flow
  - [ ] End-to-end dismiss flow
  - [ ] Email delivery

- [ ] **User Acceptance Testing:**
  - [ ] Internal dogfooding
  - [ ] Beta customer testing
  - [ ] Edge case scenarios

### Documentation Tasks

- [ ] **Technical Docs:**
  - [ ] Architecture diagram
  - [ ] API documentation
  - [ ] Database schema diagram
  - [ ] Deployment guide

- [ ] **User Docs:**
  - [ ] Feature overview for customers
  - [ ] How-to guide (with screenshots)
  - [ ] FAQ for common questions
  - [ ] Video walkthrough

---

## Launch Plan

### Pre-Launch (Week 4)

**Internal Dogfooding:**
- Use Knowledge Builder on Frantelligence's own knowledge base
- Test with real gaps from customer conversations
- Identify bugs and UX issues
- Gather team feedback

**Beta Program:**
- Select 2-3 friendly customers
- Provide early access
- Schedule weekly check-ins
- Collect detailed feedback
- Iterate based on learnings

**Marketing Prep:**
- Blog post: "Introducing Knowledge Builder Agent"
- Demo video (2-3 minutes)
- Case study from beta customer
- Prepare email announcement to customers

### Launch (End of Week 4)

**Soft Launch:**
- Enable via `VITE_FEATURE_KNOWLEDGE_BUILDER=true` in Vercel Production
- Send announcement email to eligible customers
- Monitor error rates closely
- On-call engineering support

**Support Prep:**
- Train support team on feature
- Create internal FAQ
- Set up monitoring dashboard
- Prepare escalation process

### Post-Launch (Weeks 5-8)

**Week 5-6: Monitor & Optimize**
- Daily metric reviews
- Fix critical bugs immediately
- Optimize prompts based on approval rates
- Adjust email frequency based on engagement

**Week 7-8: Gather Feedback**
- User surveys
- In-app feedback widget
- Support ticket analysis
- Feature usage analytics

---


## Competitive Analysis

### FranConnect
- **Strength:** Market leader, established brand
- **Weakness:** No AI, static document management
- **Our Advantage:** Autonomous documentation generation

### Naranga
- **Strength:** Modern UI, good collaboration features
- **Weakness:** Basic AI chat, no gap detection
- **Our Advantage:** Proactive gap detection and resolution

### Franchise Performance Group
- **Strength:** Deep franchise expertise
- **Weakness:** Manual consulting, not software
- **Our Advantage:** Automated, scalable, 24/7

### Generic Knowledge Base Tools (Notion, Confluence)
- **Strength:** Powerful editors, integrations
- **Weakness:** No franchise-specific features, no AI agents
- **Our Advantage:** Purpose-built for franchises, autonomous

---

## Go-to-Market Strategy

### Positioning

**Tagline:** "The AI That Writes Your Documentation"

**Key Messages:**
1. "Stop spending hours writing documentation. Let AI do it for you."
2. "Turn every question into an opportunity to improve your knowledge base."
3. "Your documentation gets better every week, automatically."

### Target Segments

**Primary:**
- Franchisors with 20-100 locations (sweet spot)
- High support ticket volume
- Active AI chat usage (data for gap detection)

**Secondary:**
- Franchisors with 100+ locations (enterprise)
- Franchisors launching new locations (onboarding docs needed)

### Launch Channels

1. **Email Campaign:**
   - Announcement email to all customers
   - Educational series (how it works, best practices)
   - Case studies and testimonials

2. **In-App:**
   - Feature highlight banner
   - Onboarding tour for Knowledge Gaps Dashboard
   - Success stories in notification center

3. **Content Marketing:**
   - Blog post: "How AI is Transforming Franchise Documentation"
   - Webinar: "Demo: Knowledge Builder Agent"
   - LinkedIn/Twitter posts with demo video

4. **Sales Enablement:**
   - Demo script for sales team
   - ROI calculator for prospects
   - Competitive battle cards
   - Customer testimonials

---

## Appendix

### Glossary

- **Knowledge Gap:** Topic area where users ask questions but documentation is insufficient
- **Style Profile:** Extracted characteristics of company's documentation voice
- **Evidence Package:** Collection of data supporting need for new documentation
- **Severity Score:** Numerical ranking of gap urgency
- **Approval Token:** Time-limited JWT for one-click email actions

### Related Documentation

- Architecture: `aidocs/architecture.md`
- Code Style: `aidocs/coding-style.md`
- Project Context: `aidocs/context.md`

### References

- Existing knowledge gaps implementation: `supabase/functions/analyze-knowledge-gaps/`
- Refusal detection: `ai-backend/app/services/orchestrator.py`
- Document processing: `supabase/functions/process-documents/`
- Email system: Resend integration in edge functions

---

## Approval & Sign-Off

### Stakeholders

- [ ] **Product Manager:** Strategic alignment confirmed
- [ ] **Engineering Lead:** Technical feasibility confirmed
- [ ] **Design Lead:** UX/UI approach approved
- [ ] **CEO/Founder:** Business case approved
- [ ] **Customer Success:** Launch plan approved

### Next Steps

1. **Kickoff Meeting:** Schedule with engineering team
2. **Design Review:** Finalize email template and dashboard mockups
3. **Sprint Planning:** Break down into 2-week sprints
4. **Development Start:** Week 1 tasks begin

---

**Document Version:** 1.0 (Draft)  
**Status:** Ready for Review  
**Next Review Date:** [To be scheduled]  
**Contact:** Product Team
