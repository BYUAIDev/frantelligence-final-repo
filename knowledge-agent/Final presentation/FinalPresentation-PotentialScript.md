# Final Presentation Script (aligned to `index.html` slides)

Use this as a speaking draft for a **20-minute** presentation. Slide numbers match **`knowledge-agent/Final presentation/index.html`** (12 slides). Adapt names, timing, and evidence pointers to your team.

**Narrative spine (what good slideshows do):** one clear arc—*where we were → what reality taught us → what we built → how we build → where we honestly stand*—with each slide advancing that story. Slides stay sparse; you carry detail. Transitions name what is on screen so the audience never wonders why a visual appeared.

---

## Slide 1 — Title / Framing (~0:00–1:00)

**On screen:** Title, course, “Knowledge Builder Agent,” logo.

"This is the **continuation from midterm**, not a repeat. Midterm was our concept checkpoint. The final is **process, execution, and evidence**: what changed when diagrams met code, and when code met real conversations.

Over the next twenty minutes we will walk **system evolution**, **falsification**, **customer voice**, a **live demo**, and the **technical process** behind it—then we will close with an honest read on success, limits, and what is next."

*Optional if time:* quick roadmap of sections (15 seconds).

---

## Slide 2 — What Changed Since Midterm (~1:00–3:30)

**On screen:** Four evolution boxes—closed loop, email vs in-app, bulk vs per-gap, system model / flywheel.

"Here is the **concrete delta** since midterm—this slide is our table of contents for the product story.

**First:** we moved from concept to a **working closed loop**: *What Users Are Asking* → **Generate Doc** → **KB editor review** → **Save and re-index**. That is the spine of the demo later.

**Second:** UX shifted from **email-first** to **in-app action**. Interviews and falsification pushed us—generation is **button-driven** in the product now; email is secondary.

**Third:** we backed off a **bulk-only** assumption. We ship **per-gap Generate Doc** plus **optional bulk** when a batch is intentional.

**Fourth:** our **system model matured**. Midterm emphasized a RAG answer path; final adds an explicit **usage-signal flywheel**—signals that can improve KB quality over time.

**Problem statement sharpened in plain terms:** not only ‘support is heavy,’ but **detect answer gaps** and **compress time from signal to publishable documentation**.

**Positioning:** we moved from a static competitive sketch to **build-informed differentiation**—generic ‘auto-doc from gaps’ versus what we learned matters in **franchise-style operations** (training sprawl, access control, consistent rollouts). We will anchor that when we show **client voice** in a few minutes."

**Transition:** "Visually, here is how our **system picture** changed—old model, then new."

---

## Slide 3 — Old System Diagram (~3:30–4:15)

**On screen:** Old diagram; caption about manual answers.

"**What we under-specified at midterm** was how **slow the human bottleneck** really is. The old picture: the system compiles **unanswered questions**, then a **person manually answers all of them**. Knowledge improvement stays **backlogged** and **inconsistent**."

---

## Slide 4 — New System Diagram (~4:15–5:00)

**On screen:** New diagram; AI drafts, human review.

"The new picture: **AI compiles and drafts** grounded answers; **humans review and publish**. The leverage point we pulled is **drafting and structuring**—not removing humans from **quality and policy**. That **compresses time** from **signal** to **reusable knowledge** while keeping a **review gate**."

**Transition:** "That architecture shift is one kind of test. We also ran **staged falsification**—here is how we talk about it without overstating what is proven."

---

## Slide 5 — Falsification Stages (~5:00–6:30)

**On screen:** `falsification-stages.svg` (no deck title—**say the title aloud**).

"**Falsification stages: what we tested and learned.** We did not treat this as a one-time checkbox.

**Pre:** we **pitched the idea to clients**—**done**.

**During:** **does it work with the current system** and **avoid breakage**—we treat this as **validated for what we can show today**.

**Post:** now that it is **built and working**, the next gate is **real clients using it in the wild**. This is where **proof is in the pudding**—we frame this as an **active gate**, not a trophy.

**Future:** **do clients actually use documents the agent created**—that needs **longitudinal** behavior, not a single demo.

So we claim **pre** and **during** for now; **post** and **future** are **honest next falsification**, backed by **usage evidence** over time."

**Transition:** "Customer conversations are what made several of those **during** decisions concrete—not abstract priorities."

---

## Slide 6 — Client Voice / Customer Interaction (~6:30–8:00)

**On screen:** Planet Fitness quote, chips (beyond friends/family, engage→learn→change, product decisions traced).

"**Beyond friends and family:** one **operations training** conversation at **Planet Fitness** surfaced pain around **creating trainings**, **tracking access**, and **circulating documents** across the brand. That made **gap detection plus auto-draft** immediately credible.

**Engage → learn → change:** that feedback **reinforced in-app generation** and a **review path** instead of **email-as-primary**.

**Concrete product mapping:** **per-gap action**, **in-app review**, and **publish/re-index** are the features you can tie back to that loop.

**Follow-up:** [Fill in one sentence—e.g., second touchpoint, async validation, or ‘we are scheduling X’—so graders hear **re-engage** explicitly.]

**Transition:** "You have heard the story; next you will **see the loop** in the product."

---

## Slide 7 — Live Demo (~8:00–12:00)

**On screen:** "Live Demo" — subtitle says you will leave slides and return.

"**Live demo**—we will step out of the deck briefly and come back.

We will show: **gap context** (*What Users Are Asking*) → **Generate Doc** (ideally **single-gap**) → **draft in the editor / review** → **save, publish, re-index**—and we will **name which customer insight** each step reflects.

If anything fails, we have a **backup recording**—same path, same narrative."

*After demo, back on slides:* "That loop is what the next technical slides **implement** under the hood."

---

## Slide 8 — How the AI Agent Uses RAG (~12:00–13:15)

**On screen:** `rag-agent-flow.svg`.

"This diagram is the **technical counterpart** to the product loop: **RAG** for **grounded** responses now, plus the **builder loop** that improves **what the KB contains** over time. The demo you saw is this picture **in motion**."

---

## Slide 9 — PRD → MVP → Plan → Roadmap → Code (~13:15–14:15)

**On screen:** Chips + panel about document-driven development.

"**Quick process proof**—we are not lingering here, but graders should hear the pipeline: **PRD** as the product anchor, **`mvp.md`** as the **scope-constrained** deliverable, then **plan**, **roadmap**, **code**.

Documents are **living artifacts**: **dated roadmaps**, **changelogs**, **revisions** as reality changed—not one-shot AI dumps.

**AI-assisted iteration:** [One sentence—e.g., planning passes in Cursor/Claude with review—your truth.]

**Evidence path:** if asked, we point to **`aidocs/`**, **`ai/roadmaps/`**, **`ai/changelog.md`**, and **`ai/context.md`**—the **bookshelf** pattern so a new session orients fast."

---

## Slide 10 — Structured Logging + Test–Log–Fix (~14:15–15:45)

**On screen:** Four bullets on logging, CLI scripts, loop, evidence.

"On **engineering discipline**: **structured logging** is on **real application paths**, not a stray file.

We use **CLI test scripts** for **fast verification** and **clear exit behavior**.

Our loop is **run tests → inspect logs → fix → re-run**—**[name one concrete example: symptom, log field, fix]**—and that shows up in **history and docs**, not only in slides."

---

## Slide 11 — Where We Stand Right Now (~15:45–17:30)

**On screen:** Working flow, falsification stages, post/future gates, next measurement.

"**Success and failure—midterm criteria, today’s reality:**

**What we said success looked like** [one short restatement—e.g., closed loop demoable, customer-informed UX, falsification executed].

**Where we are:** **working generated-doc flow** is **implemented and demoable**; **pre** and **during** falsification stages are **validated to the level we can show**; **post** and **future** depend on **sustained client adoption** and **whether generated docs get used**.

**If a metric is incomplete:** [One honest line—e.g., we learned X is harder to instrument than expected, so we are using Y proxy next.]

**Next gate:** **measure real usage** of generated docs and tie that back to **support outcomes** or **operational adoption**—whatever you committed in planning."

---

## Slide 12 — Close (~17:30–20:00)

**On screen:** "Process Quality Drives Product Quality," Questions, logo.

"**Biggest learning:** **process quality drives product quality**. The shift from midterm to final was from **idea confidence** to **evidence discipline**.

**What surprised us / what we would redo:** [Two short, specific beats—e.g., underestimated X; would validate Y earlier—**guest grader rubric** looks for this explicitly.]

**Impact in one sentence:** [Who benefits and how—trainers, ops, franchise consistency—your words.]

**Next falsification:** **post** and **future** gates—**usage**, not just **shipping**.

**Questions?**"

---

## Q&A Fast Answers (Prep)

1) **What changed most since midterm?**  
"We operationalized **signal → published knowledge**, moved to **in-app generation with review**, and matured the **system model** with an explicit **feedback flywheel**—all **evidence-backed**."

2) **What did you get wrong or miss at midterm?**  
"We under-weighted the **human bottleneck** and **email-as-primary** risk; falsification and customers pushed us to **in-app, per-gap** flow and a clearer **review gate**."

3) **How did customer feedback change the build?**  
"**Per-gap generation**, **in-app review**, and **publish/re-index**—driven by **operations** pain around **training and document circulation** [plus your follow-up detail]."

4) **What is still unproven?**  
"**Longitudinal adoption**: **post** and **future** falsification—**do real clients keep using** agent-created docs."

5) **Strongest technical-process evidence?**  
"**PRD → mvp.md → roadmap → code**, **living `ai/` artifacts and `context.md`**, **`CLAUDE.md` / behavioral guidance**, **structured logging on real paths**, and **test–log–fix** in **git/docs**."

6) **What would you do next?**  
"Run **post/future** gates with **instrumentation** on **doc adoption**; deepen **re-engage** with customers on **what actually landed**."

---

## Deck–rubric alignment notes (for rehearsal)

| Need (from rubric / NecessaryElements) | Where it lands |
|----------------------------------------|----------------|
| Continuation, not midterm repeat | Slides 1–2 |
| System diagram evolution + what was wrong | Slides 3–4 |
| Falsification executed + staged narrative | Slide 5 |
| Customer beyond F&F + loop + features | Slide 6 |
| Demo integrated | Slide 7 live; **consider** 10–20s product mention on Slides 3–4 or 8 if graders want “throughout” |
| PRD, mvp.md, living docs, AI iteration | Slide 9 |
| context.md, CLAUDE.md, ai/ committed | Slide 9 spoken |
| Logging + test–log–fix + one example | Slide 10 |
| Success/failure vs midterm + honest limits | Slide 11 |
| Surprises / do differently + impact + next gate | Slide 12 |

**Slide 5 reminder:** The HTML slide is **image-only**—open with the **spoken title** *Falsification Stages: What We Tested and Learned* so the room and the recording match the rubric language.
