# Slide Content Reference

Plain-text outline of every slide. Edit here, then copy changes into `index.html`.
Each slide maps to a `<section>` block in the HTML, identified by the comment above it.

---

## 1 · Title
**Knowledge Builder Agent**
Frantelligence · Midterm Presentation · Feb 2026
*Image: CutesyPicture.png*

---

## 2 · What is Frantelligence?
- AI-first franchise operations platform
- Built for mid-market franchisors — 10 to 500 locations
- Replaces scattered docs, slow support, and tribal knowledge
- Modules: Knowledge Assistant · Financial Insights · Ticketing · LMS
*Image: EgyptianFranchise.png*

---

## 3 · Knowledge Builder Agent
- **Detects** knowledge gaps from franchise activity
- **Drafts** SOPs, FAQs, and guides automatically
- **Delivers** updates via Slack, Teams, or SMS
- Closes the loop between franchisor expertise and franchisee execution
*Image: MedievalFranchise.png*

---

## 4 · The Problem
- **Pain:** Franchisors answer the same questions repeatedly across every location
- **Root cause:** Institutional knowledge lives in people's heads — not in the system
- **Cost:** Hours lost per week. Inconsistent execution. Slower onboarding.

---

## 5 · Who We're Building For
- The Franchisor Operations Team
- Manages 10–500 locations across markets
- Owns SOPs, training materials, and institutional knowledge
- Spends 30–50% of support time answering repeat questions
- Needs leverage — not more headcount
*Image: CutesyPicture.png*

---

## 6 · Customer Conversations
> "We answer the same questions over and over. There has to be a better way."
> — Rachel Bridges, VP Operations, Planet Fitness franchise group

> "Our knowledge is locked in my head. When I'm not available, things fall apart."
> — Jeff Piejack, Owner, Ultimate Ninjas franchise

---

## 7 · Founding Hypothesis
**Franchise operators will pay for a tool that turns institutional knowledge into a self-updating, always-available answer system.**

- **Core assumption:** The bottleneck is knowledge capture, not creation
- **Signal:** Repeated questions = uncodified SOPs
- **Bet:** Automate the detect → draft → deliver loop

---

## 8 · Falsification Test
*Image: FalsificationGrid.png (full width)*
Four lenses used to pressure-test the hypothesis

---

## 9 · Differentiation
*Image: DifferentiationChart.png (full width)*
Simple + Integrated — the white space no competitor occupies

---

## 10 · System Architecture
*Image: ArchitectureDiagram.png (full width)*
React → FastAPI → OpenRouter LLM + Supabase · Slack / Teams / SMS delivery

---

## 11 · Section Divider
**Technical Process — How We Build**

---

## 12 · Development Pipeline
PRD → Plan → Roadmap → Implement → Verify → Test → Log → Commit

- `prd.md` defines scope before a line of code is written
- `changelog.md` records every decision and its rationale
- `coding-style.md` keeps AI output consistent across sessions

---

## 13 · Infrastructure
- **Two-folder pattern (submission):** `aidocs/` (PRD, architecture, rubric evidence) + `ai/` (bookshelf, roadmaps, changelogs)
- **CLI scripts:** JSON output, non-zero exit on failure
- **Secrets:** `.testEnvVars` gitignored, example committed
- **Logging:** `kb_logging.py` via `structlog`

```python
log_entry(log, "ingest_doc", doc_id=doc_id)
log_exit(log,  "ingest_doc", chunks=len(chunks))
log_error(log, "ingest_doc", error=e)
```

---

## 14 · MVP Roadmap
1. **Foundation** — FastAPI scaffolding, Supabase schema, auth
2. **Core RAG** — Document ingestion, embeddings, query endpoint
3. **Builder Agent** — Gap detection, SOP drafting, delivery hooks
4. **Production** — Feature flags, observability, beta launch

---

## 15 · Success & Failure
**We succeed if:**
- Support tickets drop 30%
- Knowledge base grows without manual effort
- Time-to-answer falls below 30 seconds

**We pivot if:**
- Operators won't upload source documents
- AI drafts require heavy manual correction
- No willingness to pay at target price point

---

## 16 · Closing
**Knowledge Builder Agent — Questions?**
*Images: EgyptianFranchise.png + MedievalFranchise.png*
