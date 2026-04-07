# Knowledge Builder Agent — Feature Plan

> **Created**: February 17, 2026
> **Phase**: Spans Phase 1 (gap detection) → Phase 2 (full agent)
> **PRD**: [Knowledge Builder Agent PRD](../../aidocs/prd.md)
> **Research**: [Perplexity viability analysis](../guides/external/gapAutoDoc_perplexity.md)
> **Feature flag**: `VITE_FEATURE_KNOWLEDGE_BUILDER`

---

> **Engineering philosophy**: This is a clean codebase. No over-engineering, no cruft, no legacy-compatibility shims. Build the simplest thing that works at each step. If a table or endpoint isn't needed yet, don't create it.

---

## Overview

When franchisees ask KI Chat questions that the AI can't answer well, that's a signal — the knowledge base has a gap. Today those gaps are invisible. This feature makes them visible and actionable.

**The loop**: Detect gaps → cluster by topic → draft a document from gap context + team chat signals → send to admin for review → admin approves/edits/rejects → approved docs enter the KB → AI gets smarter → fewer gaps.

This is the data flywheel described in our [PRD](../../aidocs/prd.md): usage feeds content, content improves answers, better answers drive more usage.

## Why this matters

- Every gap-driven doc directly reduces future support load
- Franchisors don't have to start from a blank page — AI does the first draft
- The system learns from what franchisees actually struggle with
- Competitors (Zendesk, Glean) are shipping versions of this — it's becoming table stakes

## Sub-Plans

This feature is broken into three implementation phases, each with its own plan doc:

| # | Sub-Plan | What It Covers | Depends On |
|---|---|---|---|
| 1 | [Gap Detection & Tracking](./2026-02-17-gap-auto-doc-01-gap-detection.md) | Track which questions fail, score confidence, store gaps, cluster by topic | Existing KI Chat + `chat_interactions` table |
| 2 | [AI Document Generation](./2026-02-17-gap-auto-doc-02-doc-generation.md) | AI agent that drafts KB documents from clustered gaps + team chat context | Sub-plan 1 (gap data) |
| 3 | [Admin Review & KB Publishing](./2026-02-17-gap-auto-doc-03-review-workflow.md) | Review UI, approve/edit/reject flow, email notifications, KB integration | Sub-plan 2 (draft docs) |

## Implementation order

Sub-plan 1 ships first and can deliver value alone (admins see what the AI struggles with). Sub-plans 2 and 3 build on top. Each sub-plan is independently useful — we don't need all three to get value.

### Step 1: Gap Detection (Phase 1 aligned)

Ship gap tracking and a simple dashboard. This is already referenced in the high-level plan as "knowledge gap → document suggestion loop." The franchisor sees what their AI doesn't know and can manually fill the gaps.

### Step 2: Doc Generation + Review (Phase 2 aligned)

Once we have gap data and confidence that the detection is accurate, ship the AI drafting agent and the admin review workflow together. They're tightly coupled — no point generating drafts if admins can't review them.

## What exists today

| Component | Current State | How We Use It |
|---|---|---|
| `chat_interactions` table | Logs every AI interaction | Source of gap signals (low-confidence answers, refusals) |
| `knowledge_gaps` table | Exists in schema | Needs to be repurposed/extended for structured gap tracking |
| `knowledge-gaps` dashboard route | Exists at `/knowledge-gaps` | Starting point for admin-facing gap visibility |
| `analyze-knowledge-gaps` edge function | Exists | Starting point for gap analysis logic |
| KI Chat refusal detection | Built into orchestrator | Already identifies when AI can't answer — we need to capture this signal |
| Document processing pipeline | Full pipeline (upload → chunk → embed) | Approved docs feed directly into this |
| `document_versions` table | Tracks doc versions | AI-generated drafts become version 1 of new documents |
| Team Chat (`channel_messages`) | Full message history | Context source for doc generation |

## Metrics

| Metric | Definition | Target |
|---|---|---|
| Gap detection rate | % of low-confidence answers correctly flagged as gaps | >80% |
| Draft acceptance rate | % of AI-generated drafts approved (with or without edits) | >50% |
| Gap closure rate | % of detected gaps that get resolved by a published doc within 30 days | >40% |
| Deflection improvement | Change in support deflection rate after gap-driven docs are published | Measurable increase |
| Admin time-to-review | Avg time from draft notification to approve/reject | <48 hours |

## Risks

| Risk | Mitigation |
|---|---|
| Flooding admins with low-value drafts | Prioritize by frequency and impact — only surface gaps asked 3+ times |
| AI drafts that are wrong or off-brand | Human review is mandatory. AI drafts, humans approve. No auto-publish. |
| Stale docs over time | Version tracking + scheduled review reminders (future consideration) |
| Scope creep — trying to make the agent too smart | Ship detection first. Ship drafting second. Each step validates before the next. |
