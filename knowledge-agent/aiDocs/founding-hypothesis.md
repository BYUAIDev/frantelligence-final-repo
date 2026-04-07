# Founding Hypothesis: Knowledge Builder Agent

**Purpose:** This document states the core hypothesis for the **Knowledge Builder Agent** — what we believe to be true about the customer, the problem, and the solution for *this* agent, and how we are testing it. It is the foundation for Knowledge Builder product strategy, prioritization, and feature design. (Platform-wide hypotheses, e.g. deflection or channels, live in other strategy docs.)

**Related:** [Context](./context.md) · [Knowledge Builder PRD](./prd.md) · [Customer Analysis](./knowledge-builder-customer-analysis.md) · [Systems Architecture](./knowledge-builder-systems-architecture.md)

---

## Primary hypothesis

**If we help** ops/support leaders at mid-market franchisors (VP of Operations, Director of Franchise Support) **solve** not knowing what’s missing in their knowledge base, documenting only reactively after pain, and having to write every new doc from scratch **with** an agent that detects gaps from real questions and AI failures, drafts documentation for those gaps in the brand’s voice, and surfaces drafts for human review before anything is published, **they will choose it over** manual gap-tracking (spreadsheets, ticket review), hiring more writers, or generic doc tools that don’t connect questions to content **because our solution is** proactive visibility into what’s missing plus a first draft so they spend time reviewing and editing instead of staring at a blank page, with mandatory human approval so they stay in control and trust the output.

---

## Supporting hypotheses

The primary hypothesis rests on several beliefs we are explicitly testing for the Knowledge Builder Agent.

### Customer and problem

- **H1 (Buyer):** The person who owns knowledge quality and franchisee support (VP Ops, Director of Franchise Support) is the same person who will turn on the agent, review drafts, and approve content. They are time-poor and care about brand voice and accuracy.  
  *How we test:* Identify who enables and uses the Knowledge Builder in pilots; confirm they are ops/support, not IT or marketing; observe that they review drafts rather than delegating entirely.

- **H2 (Problem):** The bottleneck to a complete, up-to-date KB is **invisible gaps** and **blank-page burden** — they don’t know what to document next, and when they do, they have to write from scratch. Documentation today is reactive (after tickets or complaints).  
  *How we test:* Show that gap detection surfaces topics that correlate with repeat questions/tickets; show that AI drafts reduce time-to-publish (review/edit vs. write from scratch).

### Signal and content loop

- **H3 (Gap signal):** **Usage signals** (what franchisees ask, where the AI fails or is uncertain) are a reliable indicator of what the organization should document. Turning that signal into a prioritized list of gaps is valuable on its own.  
  *How we test:* Gap list correlates with known pain (repeat questions, tickets); closing high-priority gaps improves deflection or reduces repeat asks.

- **H4 (Usage feeds content):** The knowledge base improves when gaps are visible and the system **proposes or drafts** new documentation. First drafts (in the brand’s style) are good enough that reviewers accept or lightly edit rather than reject or rewrite.  
  *How we test:* Knowledge Builder — gap detection → draft generation → human review → publish; measure gap closure rate, draft acceptance rate (>50% target), and deflection/quality change after gap-driven docs are published.

### Trust and control

- **H5 (Human-in-the-loop):** Franchisors will only trust and adopt an AI that drafts content if **humans approve** before anything is published. Mandatory review is non-negotiable; auto-publish would block adoption.  
  *How we test:* No auto-publish in Knowledge Builder; measure that draft acceptance (with or without edits) is high enough to be valuable.

- **H6 (Direction, not dashboards):** For this feature, customers value **“here are the gaps, here’s a draft to fix them”** more than another report or dashboard. The agent should lead with actionable output (prioritized gaps, draft docs), not analytics for its own sake.  
  *How we test:* Position and design Knowledge Builder as gap list + drafts + review workflow; avoid leading with “gap analytics” or dashboards without a clear next action.

---

## How this shapes the Knowledge Builder approach

| Area | Current approach | Rooted in |
|------|------------------|-----------|
| **What we build** | Gap detection (from questions + low-confidence AI answers), prioritized gap list, AI draft generation, human review UI, single path to publish into KB | H3, H4, H5 |
| **Who we target** | Ops/support at mid-market franchisors (e.g. 20–100 locations); same orgs using the platform’s chat/KB | H1 |
| **What we don’t do** | Auto-publish; gap “reports” without drafts or review workflow; leading with dashboards instead of “here’s a draft” | H5, H6 |
| **How we prove it** | Gap closure rate, draft acceptance rate (>50%), deflection or repeat-question change after gap-driven docs are published | H2–H6 |

---

## Summary

The founding hypothesis for the Knowledge Builder Agent is stated in the format: *if we help (customer) solve (problem) with (approach) they will choose it over (competitors) because our solution is (differentiation)*. We validate it through gap detection quality, draft acceptance, gap closure rate, and impact on deflection or repeat questions after new docs are published. The supporting hypotheses (H1–H6) and the table above spell out how we test each part of that claim for the Knowledge Builder Agent specifically.
