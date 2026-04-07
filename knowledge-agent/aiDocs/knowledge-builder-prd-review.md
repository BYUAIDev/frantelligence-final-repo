# Knowledge Builder Agent — PRD Review

**Purpose:** This document explains what a PRD review is, then provides a structured review of the [Knowledge Builder Agent PRD](./prd.md). It is intended to clarify strengths, gaps, and alignment with other planning artifacts so the PRD can be used confidently for execution or stakeholder sign-off.

**Related:** [Knowledge Builder PRD](./prd.md) · [Feature Plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md) · [Customer Analysis](./knowledge-builder-customer-analysis.md) · [Systems Architecture](./knowledge-builder-systems-architecture.md) · [Founding Hypothesis](./founding-hypothesis.md)

---

## What is a PRD review?

A **PRD review** is a critical evaluation of a Product Requirements Document. It answers:

- **Is the PRD complete?** Are problem, solution, scope, requirements, success criteria, and risks clearly defined?
- **Is it consistent?** Do the sections align with each other and with related docs (feature plans, architecture, customer analysis)?
- **Is it actionable?** Can engineering and product use it to build and ship without constant clarification?
- **Where are the gaps?** What’s missing, ambiguous, or out of date?

The output is a **review document** (this file): a concise assessment with strengths, gaps or inconsistencies, and recommendations. It is not a rewrite of the PRD; it is a lens through which to improve or validate it.

---

## Scope of this review

This review covers the Knowledge Builder Agent PRD (`aidocs/prd.md` at repo root; canonical product detail in `aidocs/frantelligence-prd.md`), which describes an autonomous AI system that detects knowledge gaps from chat, generates draft documentation, and delivers it for human review and publishing. The review cross-references the feature plan (gap detection → doc generation → review workflow), the systems architecture, the customer analysis, and the founding hypothesis.

---

## 1. Strengths

| Area | Assessment |
|------|------------|
| **Executive summary** | Clear pitch (“Frantelligence writes the answers for you”), four-step value chain (monitor → analyze → generate → deliver), and a concrete “80% already built” table that sets realistic expectations. |
| **Problem statement** | Franchisor and franchisee pain points are well separated; reactive vs. proactive and “inconsistent quality” map directly to what the agent solves. Market gap vs. competitors is stated. |
| **Solution overview** | Product vision, core concept (flywheel diagram), and key features are described at a level that stakeholders can grasp. User experience (email, in-app, one-click) is specified. |
| **Business case** | Value proposition, ROI (12 hours/month, $7,200/year), and strategic value (differentiation, pricing, retention) are articulated. Useful for go-to-market and internal alignment. |
| **User stories** | Five stories (US-1 through US-5) cover discover, review, approve, learn from edits, and track impact. Acceptance criteria are present and testable. |
| **Functional requirements** | FR-1 through FR-7 break down gap detection, style extraction, generation, evidence package, delivery, approval workflow, and dashboard. Detail is sufficient for design and implementation. |
| **Risks and mitigations** | Six risks (quality, email fatigue, style inaccuracy, legal/compliance, integration, LLM cost) each have likelihood, impact, and mitigations. Human-in-the-loop is explicitly called out. |
| **Success metrics** | Primary (adoption, approval rate, question reduction, time savings), secondary (leading), and business impact metrics are defined with targets. |
| **Technical specifications** | API contracts, database schema references, and implementation checklists give engineering a clear target. |
| **Alignment with founding hypothesis** | Human approval (no auto-publish), usage-feeds-content flywheel, and “direction” (drafts to review) align with the founding hypothesis and H7/H8. |

Overall, the PRD is **comprehensive and usable**. A team can build from it; stakeholders can sign off on scope and success criteria.

---

## 2. Gaps and inconsistencies

### 2.1 Phasing vs. feature plan

- **PRD MVP:** Describes a single 4-week MVP with “per-gap on-demand” generation: backend foundation (Week 1), email & workflow (Week 2), frontend (Week 3), launch (Week 4). Acceptance criteria include “Top 3 gaps are selected for generation,” email with Approve/Edit/Dismiss, and full publish flow.
- **Feature plan:** Describes a **phased** approach: **Step 1** = ship gap detection and dashboard only (value alone); **Step 2** = add doc generation + admin review together. Sub-plan 1 (gap detection) has its own exit criteria and does not include generation or email actions.

**Gap:** The PRD does not describe “Phase 1: gap detection only” as a shippable milestone. It jumps to the full workflow. If the team follows the feature plan (ship detection first, validate, then add generation), the PRD’s MVP scope and 4-week timeline no longer match.

**Recommendation:** Either (a) update the PRD to define **MVP Phase 1** (gap detection + dashboard, no generation) and **MVP Phase 2** (generation + review + email), with separate exit criteria and timelines, or (b) update the feature plan to match a single 4-week “full MVP” and accept that gap detection is not shipped alone. Align the two documents explicitly.

### 2.2 Gap detection data model and source

- **PRD:** References “existing `knowledge_gaps` table, `knowledge_gap_analysis` view” and “analyze-knowledge-gaps edge function.” FR-1 and TR-2 describe gap detection and schema at a high level.
- **Feature plan / sub-plan 1:** Specifies gap record fields (`company_id`, `question_text`, `gap_type`, `confidence_score`, `occurrence_count`, etc.), deduplication (embedding similarity 0.85), ticket-to-gap correlation (30 min window), and that capture happens in **ChatOrchestrator** as a side effect after each completion.

**Gap:** The PRD does not clearly state that **every** refusal or low-confidence answer writes a gap record (or updates via deduplication), nor does it define the exact gap schema and where capture happens (orchestrator vs. batch job). Sub-plan 1 is the source of truth for “what we’re detecting” and “where we capture”; the PRD could reference it and summarize, or the PRD could own the schema and the sub-plan reference the PRD.

**Recommendation:** In the PRD, add a short subsection under FR-1 or TR-2 that: (1) states that gap capture is triggered per chat completion (and at ticket creation), (2) points to the gap record schema (or to sub-plan 1), and (3) calls out deduplication and ticket correlation. That keeps the PRD and the implementation plan consistent.

### 2.3 Clustering and “per-gap” vs. “per-cluster”

- **PRD MVP:** “Per-gap on-demand generation”; “Single gap generation at a time”; acceptance criteria “Top 3 gaps are selected for generation.”
- **Feature plan / sub-plan 2:** Doc generation consumes **clustered** gaps (same topic, 3+ occurrences); draft is generated **per cluster**, not per single gap. Team chat context is gathered per cluster.

**Gap:** The PRD’s “per-gap” wording and “Top 3 gaps” can be read as “three individual gap rows.” The feature plan intends “clusters of related gaps” and one draft per cluster. If MVP ships with true per-gap generation (one draft per gap row), that’s a simpler product but different from the sub-plan 2 design.

**Recommendation:** Clarify in the PRD whether MVP is (a) one draft per gap row (“per-gap”) or (b) one draft per cluster of similar gaps (“per-cluster”). If (b), update PRD wording to “cluster” and “top 3 clusters” and reference sub-plan 2 for clustering logic. If (a), update the feature plan to allow a simpler MVP without clustering first.

### 2.4 Team chat context

- **PRD:** Mentions “team chat signals” and context for generation in high-level descriptions; FR-3 (Document Generation) may reference context assembly.
- **Feature plan / sub-plan 2:** Explicitly describes gathering `channel_messages` by keyword/similarity for each cluster and including snippets in the context window.

**Gap:** The PRD does not clearly state that team chat is an **input** to the document generation agent or how it’s used. A reader could assume generation is gap-only.

**Recommendation:** In FR-3 (or Solution Overview), add one or two sentences: “Generation may use relevant team chat messages (same company, keyword or similarity match to gap topic) as additional context. See [sub-plan 2] for context assembly.” Defer full detail to the sub-plan.

### 2.5 Customer and systems alignment

- **Customer analysis:** Primary customer is the knowledge-and-support owner (VP Ops / Director Franchise Support); they want control, no flood of drafts, and evidence (who asked, how often).
- **Systems architecture:** Solution targets three insertion points (gap capture, draft generation, review → publish); leverage points L1–L5 are named.
- **PRD:** User stories and FRs are consistent with “franchisor admin” as the actor and human-in-the-loop. The PRD does not explicitly cite the customer analysis or the systems architecture.

**Gap:** No major inconsistency; the PRD is aligned with who the customer is and where the solution plugs in. The only gap is **traceability**: the PRD could reference the customer analysis and systems architecture so that future readers see the chain (customer → problem → system design → PRD).

**Recommendation:** In the PRD’s Problem Statement or Executive Summary, add one line: “For a detailed customer analysis and systems architecture, see [Customer Analysis](./knowledge-builder-customer-analysis.md) and [Systems Architecture](./knowledge-builder-systems-architecture.md).”

---

## 3. Recommendations summary

| # | Recommendation | Priority |
|---|----------------|----------|
| 1 | Reconcile **phasing**: Define in the PRD either “Phase 1 = gap detection only, Phase 2 = generation + review” (matching the feature plan) or a single 4-week full MVP and update the feature plan accordingly. | High |
| 2 | Clarify **gap capture**: In FR-1/TR-2, state that capture is per chat completion (and at ticket creation), with schema/deduplication summary or pointer to sub-plan 1. | High |
| 3 | Clarify **per-gap vs. per-cluster**: In the PRD, state whether MVP generates one draft per gap row or per cluster; align wording (“top 3 gaps” vs. “top 3 clusters”) and reference sub-plan 2 if per-cluster. | High |
| 4 | Mention **team chat** as an input to document generation in FR-3 or Solution Overview, with pointer to sub-plan 2. | Medium |
| 5 | Add **cross-references** from the PRD to the customer analysis and systems architecture docs. | Low |

---

## 4. Conclusion

The Knowledge Builder Agent PRD is **strong and usable**: problem, solution, requirements, metrics, and risks are well covered. The main improvements are **alignment with the phased feature plan** (gap detection first vs. full MVP in one go), **precision on gap capture and schema**, and **clarity on per-gap vs. per-cluster generation**. Addressing the high-priority recommendations above will make the PRD and the implementation plans a single coherent source of truth for building and shipping the feature.
