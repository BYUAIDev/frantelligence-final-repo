# Customer research and feedback loops

> **Sources:** [knowledge-agent/midterm/customer-conversations.md](../knowledge-agent/midterm/customer-conversations.md), [knowledge-agent/midterm/deep_customer_analysis.md](../knowledge-agent/midterm/deep_customer_analysis.md), [aidocs/is590r-rubric-evidence.md — Customer focus](../aidocs/is590r-rubric-evidence.md).

---

## Beyond friends and family — who we talked to


| When         | Who            | Role / context                                                                   |
| ------------ | -------------- | -------------------------------------------------------------------------------- |
| Feb 23, 2026 | Rachel Bridges | Project lead, **operations training**, **Planet Fitness** (per conversation log) |
| Jan 15, 2026 | Jeff Piejack   | **CEO**, **Ultimate Ninjas** franchising group                                   |


**Rubric narrative also cites** franchisor / ops leadership from **IFA** and industry intros, and pilot-style conversations with brands in fitness, children’s enrichment, and specialty retail **(archetypes**, e.g. Planet Fitness, Ultimate Ninjas, Bricks & Minifigs — see [is590r-rubric-evidence](../aidocs/is590r-rubric-evidence.md)). Those are described as **relationship-driven** and **not** friends-and-family convenience samples.

---

## What we heard

- **Rachel (Planet Fitness):** Pain around **creating trainings**, **tracking who has access**, and **circulating documents** across the brand. The **gap detection + auto-draft + review** story resonated; she wanted a **demo** scheduled.
- **Jeff (Ultimate Ninjas):** Strong positive reaction in **demo** context to the pipeline being **real**; wanted it **as soon as ready**.

**Deep analysis doc** frames the buyer as VP/Director-level **ops / franchise support** at 10–500 location brands who need **control**, **brand voice**, and **human review** before publish.

---

## Feedback loops — what changed in the product

Documented in **is590r-rubric-evidence** (loops A and B):

1. **Per-gap vs bulk:** *“Don’t force generation for everything in the filter — just **this** gap.”*
  → **Change:** **Per-card “Generate Doc”** plus **bulk** in the header for intentional batches (see feature plan / sub-plan 02).
2. **Email vs in-app:** *“Stop emailing me about drafts — let me click in the app.”*
  → **Change:** Primary path = **dashboard → Generate → toast → KB editor**; email only for optional digests, not every draft.
3. **Falsification on email-primary** (ties to [problem-statement.md](./problem-statement.md)): interviews and prototypes shifted emphasis **away** from email as the main driver toward **in-app** action.

---

## Re-engagement

Conversation log shows **follow-up intent** (Rachel requested scheduling). **Formal re-engagement notes** after UX changes are **not** all present in this artifact repository — list as a **documentation gap** in root `README.md` if not added before deadline.

### Re-engagement & validation log (post–feedback UX)

Use this table to show the **engage → build → check** loop even when full transcripts stay private. **External** = customer / pilot voice; **Internal** = team or scripted walkthrough.


| Phase (approx.)           | UX / product change                                                                 | Validation type       | What we looked for                                                                  | Outcome (summary)                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| After Feb 2026 interviews | Commit to **in-app** gap dashboard as primary (vs email-first digests)              | External + internal   | Do operators **open** the surface they already use (KB/admin) vs a new inbox habit? | Email-primary **de-emphasized**; dashboard + **Generate Doc** path documented in [problem-statement.md](./problem-statement.md) Test 1 |
| Mar–Apr 2026              | **Per-gap “Generate Doc”** + optional bulk (vs “generate everything in the filter”) | Internal walkthroughs | Can an admin **intentfully** pick one urgent gap without batch noise?               | Shipped per-card action + bulk bar per [feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md)                     |
| Apr 2026 rubric pass      | KB editor **Source Questions** banner + **Save & Re-index** publish                 | Internal              | Does reviewer see **which chat gaps** produced the draft before publish?            | Closed-loop narrative in `[docs/mvp.md](./mvp.md)` + `[docs/system-diagram.md](./system-diagram.md)`                                   |
| **Open**                  | Scheduled follow-up with **prior interview contacts** after live **Generate** flow  | External (targeted)   | Does the **full loop** (gap → draft → edit → publish) match Jan/Feb expectations?   | **Attach dates + quotes** if obtained before **April 7**; until then, rubric proof is **prior feedback + shipped UX** above            |


**Honest scope:** This log does **not** claim a full second round of recorded interviews for every archetype; it **does** spell out **what we changed because of earlier conversations** and **how we re-checked** those changes (internally and, where noted, with pilots).

---

## Inference

- **Bricks & Minifigs** and other names appear as **GTM archetypes** in the rubric narrative; this pack does **not** include separate interview transcripts for every archetype. Treat those as **positioning consistency**, not additional logged conversations unless the team attaches them.

