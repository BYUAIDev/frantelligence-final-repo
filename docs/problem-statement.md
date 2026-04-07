# Problem statement and falsification tests

> **Sources:** [aidocs/frantelligence-prd.md §2](../aidocs/frantelligence-prd.md#2-problem-statement), [knowledge-agent/midterm/founding-hypothesis.md](../knowledge-agent/midterm/founding-hypothesis.md), [aidocs/is590r-rubric-evidence.md § Problem & falsification](../aidocs/is590r-rubric-evidence.md) (April 2026 narrative).

---

## Problem (product)

Franchise networks run a **knowledge–answer loop**: franchisees ask operational questions; franchisors answer through documentation and support. When the knowledge base is incomplete or hard to use, the same questions repeat, support load grows, and operators lack visibility into **what** is missing until pain shows up in tickets or complaints.

**Knowledge Builder** targets that gap: make **usage signals** (questions the AI answers poorly) visible to franchisor admins and shorten the path from **signal → draft doc → human review → published KB**.

---

## Hypotheses (Knowledge Builder)

From **founding hypothesis / H1–H6** (see midterm doc):

- **H2 / H3:** Invisible gaps and blank-page burden block a complete KB; usage signals help prioritize what to document next.
- **H5:** Human-in-the-loop publish is required for trust (no auto-publish).
- **H6:** Actionable output (gaps + drafts) matters more than analytics-only views.

---

## Falsification tests (executed)

The rubric asks for tests **run** with **documented results**, not only designed tests. Below is what existing materials record.

### Test 1 — Email digests as the primary driver

- **Hypothesis (early design strain):** Franchisors would reliably **act** on **weekly email digests** listing gaps and suggested docs (support-analytics style).
- **Tests run (documented in [is590r-rubric-evidence](../aidocs/is590r-rubric-evidence.md)):**  
  - Interviews with ops leaders on **opening weekly gap emails** vs acting in a **dashboard** already used for KB work.  
  - Prototype / wireframe review: **email-primary** vs **in-app primary** generation.  
  - Pilot intuition: preference to **fix one urgent gap** rather than always batching.
- **Result:** **Partially falsified for email as primary driver.** Stakeholders still want optional digest for awareness; **primary action** must be **in-product** (dashboard → **Generate Doc** → editor → publish). Email-heavy flows felt low-value vs noise.
- **Product change:** UX and docs emphasize **on-demand, in-app generation**; per-gap **Generate Doc** plus optional bulk; email positioned as **supporting**, not the core loop.

### Test 2 — Gap list usefulness (directional, not fully quantified in artifact)

- **Hypothesis:** Gap list correlates with repeat questions / tickets **(H3)**.
- **Evidence in repo:** Qualitative pilot narrative and gap dashboard design in roadmaps; **exact cohort stats** are not committed in this artifact (see **Gaps** in root `README.md`).
- **Structured appendix:** See [Appendix — Test 2 method & evidence register](#appendix--falsification-test-2-method--evidence-register) below for dates, population, measures, and what is **in-repo** vs **proprietary analytics only**.

### Test 3 — Draft quality / acceptance **(H4, H5)**

- **Hypothesis:** Drafts are good enough to accept or lightly edit; humans stay in the loop.
- **Evidence:** Product architecture **mandates** `Save & Re-index` publish; feature plan targets **draft publish rate** >50% as a metric (baseline TBD in materials).

---

## Inferences (clearly labeled)

- **Quantitative falsification** (e.g. A/B email vs in-app with measured conversion) is **described qualitatively** in the rubric evidence doc, not as a formal experiment write-up with n and p-values in this repository.
- **If** the course requires a stricter “experiment” format, the team should add a short appendix with **dates, participants count, and metric definitions** from the proprietary analytics tools.

---

## Appendix — Falsification Test 2 (method & evidence register)

This appendix answers the rubric’s “executed with documented results” expectation for **H3-style** gap usefulness: what we **ran**, **when**, **with whom**, **what we measured or inspected**, and **where the proof lives**.

### A. Research question (precise)

Does the **“What Users Are Asking” / gap feed** surface questions that franchisor operators **recognize as real missing knowledge**, and does it **cluster** in ways that match how they already triage support (tickets, training hot topics)?

### B. Population & sessions (documented n)

| When | Channel | Who | n | Artifact |
|------|---------|-----|---|----------|
| Jan 15, 2026 | Interview / demo | Jeff Piejack, CEO, Ultimate Ninjas | 1 | [customer-conversations.md](../knowledge-agent/midterm/customer-conversations.md), [customer-research.md](./customer-research.md) |
| Feb 23, 2026 | Interview | Rachel Bridges, ops training lead, Planet Fitness | 1 | Same |
| Feb–Apr 2026 | Internal / pilot walkthroughs | Franchisor-admin roles on **staging or pilot tenants** | *small set; not enumerated in this pack* | Roadmaps + [`aidocs/is590r-rubric-evidence.md`](../aidocs/is590r-rubric-evidence.md) qualitative narrative |
| — | Archetypes (IFA / intros) | Additional franchisor ops leaders | *described, not a full transcript set* | PRD / rubric narrative |

**Friends-and-family** is **not** the sole source: the logged table above is **target users / executives**.

### C. What we executed (not just “designed”)

1. **Live dashboard review** — Walkthrough of **gap vs answered** classification, filters (date, user, location, role), and **“Needs Docs”** framing; operators asked whether rows **felt like** their real support load.
2. **Contrast with email-primary story** — Same stakeholder conversations that **falsified email-as-primary** (Test 1) reinforced that an **in-app list** must be **actionable**, not a weekly digest only.
3. **Ticket language check (qualitative)** — Where available, compare *themes* in gap questions to *themes* in open support tickets (manual, not a published cohort table in this artifact).

### D. Measures & definitions (what “correlation” meant here)

| Construct | Definition (operational) | Where quantitative lives |
|-----------|-------------------------|---------------------------|
| **Gap signal** | Row in `knowledge_gap_analysis` with `response_quality === 'gap'` | App DB / BI (proprietary) |
| **Repeat pain** | Same or paraphrased question topic appearing in multiple sessions or tickets | Qualitative + optional SQL in full repo |
| **Usefulness judgment** | Stakeholder confirms “would pursue documentation for this cluster” | Interview notes in **customer-conversations** |

**We did not** ship a public A/B or p-value table for H3 in this repository; we **did** run the **interview + dashboard + pilot** loop above and recorded **directional** confirmation and UX consequences (per-gap generation, in-app primary).

### E. Result (honest)

- **Partially validated / directional:** Operators treat the feed as **credible** and **prioritizable** for doc work; **full numeric correlation** (gap volume vs ticket rate over time) remains **internal**.
- **Product implication either way:** Even without a published coefficient, the team **shipped** the loop that assumes gaps are worth acting on (Generate Doc → editor → publish), because **pilot behavior** (clicks, drafts) was the practical test.

### F. What would tighten this further

A one-page export: **gap count** and **ticket count** per pilot brand for **one 30-day window** (de-identified), stored as PDF/CSV **April 7** if instructors allow proprietary extracts.
