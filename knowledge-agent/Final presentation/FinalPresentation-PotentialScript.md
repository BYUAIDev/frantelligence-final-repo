# Final Presentation Potential Script

Use this as a speaking draft for a 20-minute presentation. Adapt names and timing to your team.

---

## Slide 1 - Title / What Changed Since Midterm (0:00-1:30)

"Today we are not re-presenting midterm. We are showing what changed after building, testing, and learning in production-like conditions.

Our project is Frantelligence's Knowledge Builder Agent. The midterm was about the concept. The final is about process, proof, and what we learned once the concept hit reality."

Transition:
"We will walk through system evolution, falsification, customer-driven changes, technical process, and a live demo threaded throughout."

---

## Slide 2 - System Understanding Evolved (1:30-3:30)

"At midterm, our system model focused mostly on chat and retrieval. What we missed was the full feedback loop.

Now the system includes a closed loop:
user questions -> gap detection -> generate doc -> editor review -> save and re-index -> improved retrieval -> fewer repeated gaps.

The key system learning is that this is not only an answer engine. It is a knowledge improvement engine."

Transition:
"That system learning changed how we framed the problem and how we falsified our assumptions."

---

## Slide 3 - Problem Refinement + Falsification Stages (3:30-6:30)

"Our refined problem statement is:
franchisors repeatedly answer the same operational questions because institutional knowledge is not captured and deployed fast enough in the workflow.

We ran falsification as stages, not as one event."

**Use this exact structure:**

"Pre - Pitched the idea to clients - Done.

During - Does it work well with the current system, does it break anything - It works, so done.

Post - Now that we have it built and working, the next falsification gate is to get real clients using it. This is where the proof is really in the pudding.

Future - Do clients use the documents created by this agent - Double proven, and this will take time for this to happen."

"So today we can claim the pre and during gates are validated, and the post/future gates are active measurement gates we are tracking."

Transition:
"Next, here is how customer feedback changed what we actually built."

---

## Slide 4 - Customer Focus and Interaction Loop (6:30-9:00)

"We engaged target users beyond friends and family and got two high-impact signals:

First, they wanted to generate from one specific gap, not always in bulk.
Second, they preferred in-app action over email-heavy prompts.

So we changed the product:
per-gap generation plus optional bulk generation, and editor-first in-app review.

This is our feedback loop:
engage -> learn -> change -> re-engage.
That loop directly shaped feature decisions, not just messaging."

Transition:
"Now we will show the product flow in the context of that loop."

---

## Slide 5 - Live Demo Thread Part 1: Gap to Draft (9:00-11:30)

"In this demo step, we start where users feel pain: unresolved repeated questions.

We identify a gap, trigger generation, and produce a draft document.

What to notice:
the action is immediate, contextual, and connected to the exact observed gap.
This reduces the friction between discovering a knowledge hole and drafting a fix."

Transition:
"Now we show review and publish, because generation alone is not enough."

---

## Slide 6 - Live Demo Thread Part 2: Review to Publish (11:30-13:30)

"Here we move into editor review, then save and re-index.

This is critical: value is only realized when generated knowledge becomes searchable and reusable in the system.

This closes the loop and creates measurable improvement over time."

Transition:
"Next is the technical process that made this build reliable and gradable."

---

## Slide 7 - PRD to MVP to Roadmap to Code (13:30-15:30)

"Our build process followed document-driven development:
PRD -> MVP scope -> roadmap phases -> implementation.

We treated docs as living artifacts, not one-time submissions. As insights changed, docs changed.

We also used AI in an iterative workflow, not one-shot prompting:
plan, implement, verify, revise."

Transition:
"Then we supported this with AI infrastructure and debugging discipline."

---

## Slide 8 - AI Infrastructure + Logging/Debugging (15:30-17:00)

"We maintained AI workflow infrastructure:
context bookshelf, behavior guidance files, roadmaps, changelogs, and clean secret handling.

For engineering quality, we integrated structured logging in the real application path and used test-log-fix loops.

This gave us better diagnostics and faster iteration than ad-hoc debugging."

Transition:
"Finally, we measure where we stand now and what is still unproven."

---

## Slide 9 - Success/Failure Status + Honest Gaps (17:00-18:30)

"Our success criteria included reduced repeat support load, better knowledge capture, and faster answer readiness.

Where we are strong:
we have working flow, clear customer-informed feature changes, and executed falsification stages through build.

What remains:
post and future falsification gates depend on sustained real client usage over time.
We are explicit about that and treating it as the next validation milestone."

Transition:
"We will close with what we learned and what we would do differently."

---

## Slide 10 - Reflection + Close (18:30-20:00)

"Our biggest learning is that process quality drives product quality.

The most important shift from midterm to final was moving from idea confidence to evidence discipline:
system updates, customer loops, falsification gates, and implementation rigor.

If we had another cycle, we would deepen post-launch instrumentation even earlier to accelerate post and future falsification."

Close:
"That is our final journey from hypothesis to working system with measured learning. We are ready for questions."

---

## Q&A Fast Answers (Prep)

1) **What changed most since midterm?**
"We discovered and implemented the closed feedback loop from user questions to improved knowledge assets, and that changed both our system design and UI workflow."

2) **How do you know customer input actually changed the product?**
"Per-gap generation and in-app editor-first flow came directly from customer friction with bulk-only and email-heavy approaches."

3) **What is still unproven?**
"Longitudinal adoption and usage impact of generated documents across real client operations."

4) **Where is your strongest technical-process evidence?**
"Document pipeline, roadmap progression, and structured logging plus test-log-fix artifacts."

5) **What would you do next?**
"Run the post/future falsification gates with active clients and tighten instrumentation around document adoption and downstream support impact."
