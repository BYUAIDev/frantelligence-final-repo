# Final Presentation Potential Script

Use this as a speaking draft for a 20-minute presentation. Adapt names and timing to your team.

---

## Slide 1 - Title / Framing (0:00-1:00)

"Today is the continuation from midterm, not a repeat. Midterm was our concept checkpoint. Final is process, execution, and evidence of learning."

---

## Slide 2 - Explicit Midterm -> Final Changes (1:00-3:30)

"Here are the concrete changes since midterm:

From concept to working closed loop: we moved from a gap-detection idea to a demoable workflow:
What Users Are Asking -> Generate Doc -> KB editor review -> Save & Re-index.

Primary UX shifted from email-first to in-app action:
falsification plus interviews pushed us away from weekly email as the main driver.
Now generation is button-driven in product, and email is secondary.

Per-gap generation was added, not just bulk:
we evolved from batch assumptions to per-card Generate Doc plus optional bulk for intentional batches.

System understanding matured:
midterm emphasized RAG answer flow; final adds an explicit feedback flywheel where usage signals improve KB quality.

Hypotheses moved from designed tests to executed falsification with product consequences."

Transition:
"Now we will show this system evolution visually."

---

## Slide 3 - Old System Diagram (3:30-4:30)

"Old system: unanswered questions were compiled by the system, then a person manually answered them all. That made knowledge improvement slow and bottlenecked."

---

## Slide 4 - New System Diagram (4:30-5:30)

"New system: AI compiles and drafts answers automatically, then humans review and publish. This compresses time from signal to reusable knowledge."

---

## Slide 5 - Falsification Stages (5:30-7:00)

"We ran falsification in stages, not as a one-time checkbox.

Pre - Pitched the idea to clients - Done.
During - Does it work with the current system and avoid breakage - Done.
Post - Now that it works, next gate is real client usage. This is where proof is in the pudding.
Future - Do clients actually use docs created by the agent - this takes time and longitudinal tracking.

So we claim pre and during validation now, with post and future as active gates."

---

## Slide 6 - Client Voice / Customer Interaction (7:00-8:30)

"One ops conversation from a fitness franchise made this clear: the pain was around creating trainings, controlling access, and circulating docs consistently across locations.

That insight reinforced our move toward in-app action and guided our workflow design."

Transition:
"Now we’ll show what changed in the product because of feedback."

---

## Slide 7 - Customer Loop -> Product Changes (8:30-10:00)

"Problem statement is now operationalized:
not just support burden exists, but detect answer gaps and reduce time from signal to publishable documentation.

Our customer loop became concrete:
engage -> learn -> change is visible in specific UX changes:
per-gap action and in-app review path.

Competitive framing evolved too:
we moved from static market view to build-informed positioning, distinguishing generic gap-auto-doc patterns from franchise-specific differentiation."

---

## Slide 8 - Live Demo (10:00-13:00)

"Live demo. We’ll step through:
What Users Are Asking -> Generate Doc -> KB Editor Review -> Save & Re-index."

---

## Slide 9 - How the Agent Uses RAG (13:00-14:30)

"This diagram shows the RAG path and the feedback loop.
RAG gives grounded responses now, and the builder loop improves future responses over time."

---

## Slide 10 - PRD/MVP/Roadmap Proof Slide (14:30-15:30)

"Quick process proof:
PRD -> MVP -> Plan -> Roadmap -> Code.

We used documents as living build artifacts and updated them as product reality changed."

---

## Slide 11 - Technical Process + Logging (15:30-17:00)

"On engineering process, we followed iterative plan/implement/review loops.
Structured logging is integrated in real app flow, and we used test-log-fix cycles for debugging."

---

## Slide 12 - Success/Failure + Honest Limits (17:00-18:30)

"What is validated:
working closed-loop flow and executed early-stage falsification.

What remains:
post/future falsification gates depend on sustained client adoption and actual use of generated docs over time."

---

## Slide 13 - Close (18:30-20:00)

"Biggest learning: process quality drives product quality.
The shift from midterm to final was from idea confidence to evidence discipline.
That is our journey and our current state. We’re ready for questions."

---

## Q&A Fast Answers (Prep)

1) **What changed most since midterm?**  
"We operationalized the workflow from signal to published knowledge and made customer-driven UX shifts that are now demoable."

2) **How did customer feedback concretely change the build?**  
"Per-gap generation and in-app review replaced bulk-only and email-first assumptions."

3) **What is still unproven?**  
"Long-term adoption and usage of generated docs by real clients."

4) **What is your strongest technical-process evidence?**  
"Living docs pipeline, roadmap progression, and structured logging with test-log-fix iteration."

5) **What would you do next?**  
"Run post/future falsification gates with active clients and deepen instrumentation around doc adoption and support impact."
