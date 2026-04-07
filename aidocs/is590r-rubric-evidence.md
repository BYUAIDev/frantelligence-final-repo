# IS 590r — Rubric evidence (complete)

This document is the **single narrative** for graders: PRD/MVP traceability, **AI-assisted planning**, Knowledge Builder implementation, product learning (Jason), and presentation readiness. It reflects **positive course feedback** and **post-midterm product iteration** (per-gap generation, in-app “fill the gap” vs. email-first outreach). **Start here for paths + demo in one page:** [`IS590R-submission-readme.md`](./IS590R-submission-readme.md).

---

## PRD & document-driven development

| Criterion | Where it’s evidenced |
|-----------|----------------------|
| PRD comprehensive | [`frantelligence-prd.md`](./frantelligence-prd.md) (+ **Since midterm**, v1.1) |
| `mvp.md` = concrete deliverable | [`mvp.md`](../docs/mvp.md) — **Document roles**, **Knowledge Builder pipeline** table (v1.2) |
| PRD → MVP → plan → roadmap → code | MVP → [KB feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md) → sub-plans 01–03 → [`important-backend-file-evidence/.../kb.py`](../important-backend-file-evidence/app/routers/kb.py) (`POST /api/v1/kb/generate-from-gaps` excerpt) + **proprietary** `src/pages/KnowledgeGapsDashboard.tsx` / `KBEditorPage.tsx` |
| Living artifacts | **Last Updated** April 2026 on PRD, MVP, context; [`ai/changelog.md`](../ai/changelog.md) (2026-04-06 and earlier passes) |
| **AI-assisted iteration on planning** | **Section below** + version history + dated changelog |

### AI-assisted iteration (planning — not one-shot)

**Primary tool for planning & docs:** **Cursor** (with repo-aware rules and `ai/context.md` as the hub). **Claude** and **ChatGPT** were used for drafting and critique of isolated sections (market framing, rubric language), but **Cursor** was the default for PRD/roadmap/MVP edits that had to stay aligned with the codebase.

**Process (multi-pass):**

1. **First pass:** AI produced outlines and first drafts of PRD sections, gap-auto-doc roadmaps, and MVP tables from prompts grounded in [`context.md`](../ai/context.md) and [`architecture.md`](./architecture.md).

2. **Human edits (examples):**
   - Renamed and reframed **Gap Auto-Doc** → **Knowledge Builder Agent** everywhere (feature flag, docs, UI copy) so the name matches what we ship.
   - Tightened **RLS and API path** language in the PRD to match real Supabase patterns (`EXISTS (SELECT 1 FROM profiles …)`), not generic `company_id IN (...)` anti-patterns.
   - Split **commercial MVP** (what Frantelligence sells: KI Chat, KB, channels, QB, tickets) from **IS 590r course anchor** (Knowledge Builder slice) in [`mvp.md`](../docs/mvp.md) so graders are not grading “the whole platform” as the course artifact.

3. **Second+ passes (feedback-driven):**
   - **Midterm / instructor feedback:** Strengthen **document-driven** story; ensure **MVP** names the course deliverable; add **living doc** dates and “since midterm” deltas.
   - **Product feedback (post–user testing):** Franchisors wanted to **generate from a single gap** without being forced into a **bulk-only** flow, and wanted to **act in-app** instead of being **nagged by email** to “use” a generated doc. That pushed UX toward **per-question “Generate Doc”** on each gap card plus optional **bulk** for batches, and toward **in-app** draft creation + **KB editor** review with **Save & Re-index** as publish — not an email-first workflow. PRD/roadmap language was updated so “notification” paths stayed **secondary** to **on-demand generation** in the product story.

4. **Verification pass (April 2026):** Roadmap **task checklists** for sub-plans 01–03 were marked against the repo; [`mvp.md`](../docs/mvp.md) gained the **pipeline table** (gap → generate → review → publish); PRD gained **Since midterm**; this file consolidates rubric proof.

**Artifacts:** PRD v1.1, MVP v1.2, [`ai/changelog.md`](../ai/changelog.md), KB feature plan / sub-plans **Revised** dates.

---

## Casey — AI development infrastructure

| Criterion | Evidence |
|-----------|----------|
| `context.md` bookshelf | [`context.md`](../ai/context.md) |
| `CLAUDE.md` / behavioral guidance | [`.claude/CLAUDE.md`](../.claude/CLAUDE.md) |
| `ai/` committed | `ai/roadmaps/`, `ai/changelog.md`, `ai/guides/` |
| Git workflow | Branching, merges, incremental commits over the term (see git history) |
| `.gitignore` / secrets | Course submission uses a **clean tree** if needed; repo standard: `.env`, `node_modules`, secrets not committed |
| No secrets in repo | Pre-submission review: no API keys in tracked files |

---

## Casey — Structured logging & debugging

| Criterion | Evidence |
|-----------|----------|
| Structured logging **(not ad-hoc prints)** | `ai-backend/app/kb_logging.py` in the **full proprietary repo** configures **structlog** JSON to stdout (not redistributed here — see [`important-backend-file-evidence/README.md`](../important-backend-file-evidence/README.md)). |
| Logging **in application code** | [`generate_document_from_gaps`](../important-backend-file-evidence/app/routers/kb.py) — **lazy** import of `kb_logging` on this handler only; `_kb_log_entry` / `_kb_log_exit` with `company_id`, `question_count`; structured `.info(...)` for `no_matching_questions` before 404. |
| CLI / tests + exit codes | [`knowledge-agent/scripts/test.js`](../knowledge-agent/scripts/test.js): runs `pytest tests/knowledge_builder/` and **ruff** on **`app/routers/kb.py`** + **`app/kb_logging.py`** (and legacy KB paths if present); documents **`0` = pass, `1` = fail, `2` = bad args, `127` = python missing**; final `process.exit(report.exit_code)`. |
| Automated checks | [`test_kb_structured_logging.py`](../important-backend-file-evidence/tests/knowledge_builder/test_kb_structured_logging.py) — `capsys` asserts **parseable JSON** lines and `generate-from-gaps` route registration (needs full backend + `kb_logging.py` on `PYTHONPATH` — see evidence README). |
| Test–log–fix + git | [`ai/changelog.md`](../ai/changelog.md) **2026-04-06** — structured logging + tests called out; commits **`2eb8fcf8`** (“fixes for grading”), **`ea7356de`** (“update changelog”) on **2026-04-06** touch this path; optional narrative: [`knowledge-agent/midterm/development-log.md`](../knowledge-agent/midterm/development-log.md) § `feat(logging): add kb_logging.py`. |

**Demo tip:** Run **Generate Doc** once; show **stdout** JSON lines containing `generate_document_from_gaps.entry` / `.exit` (or run `pytest` with `LOG_LEVEL=debug` and show `test_kb_structured_logging` parsing JSON).

### Why logging is only on the generation path (lazy import)

`kb.py` is a large router. **Importing `kb_logging` / structlog at module load** would run for every KB route. We **lazy-import** inside `generate_document_from_gaps` only, so structured JSON logs fire for **Knowledge Builder generation** without adding structlog setup cost to unrelated handlers. The tradeoff is **narrow surface area** by design, not an accident.

### Test–log–fix anecdote (honest)

While adding [`test_kb_structured_logging.py`](../important-backend-file-evidence/tests/knowledge_builder/test_kb_structured_logging.py), an early **`pytest`** run failed: **`capsys` had no parseable JSON lines** — `log_entry` / `log_exit` did not produce the stdout the test expected until **`configure_structlog()`** ran first in the test process (same one-time setup `kb_logging.py` uses in production). Reading the failure (empty capture) instead of guessing led to calling **`configure_structlog()`** at the start of the test, then re-running until JSON lines contained `demo_operation` and `company_id`. A second check was **`test_generate_from_gaps_endpoint_exists_on_kb_router`**: if the route list did not include `generate-from-gaps`, the test failed fast—useful when refactoring router registration.

### Rubric crosswalk — “Structured logging & debugging”

| Rubric line | How you show it |
|-------------|-----------------|
| Structured logging (not `console.log("here")`) | Backend uses **structlog JSON** via `kb_logging.py` (full repo; see [`important-backend-file-evidence/README.md`](../important-backend-file-evidence/README.md)); not browser `console.log`. |
| Integrated into **actual** app code | Logs emitted from live handler [`generate_document_from_gaps`](../important-backend-file-evidence/app/routers/kb.py) (lazy import), not only from a standalone module. |
| CLI test scripts exist and work | `node knowledge-agent/scripts/test.js` from repo root (see script header). |
| Exit codes 0 / 1 / 2 | Documented in script: **0** success, **1** test/lint failure, **2** bad CLI args (**127** if Python missing). |
| Test–log–fix in git history | Changelog + Apr 6 commits; **Test–log–fix anecdote** above (pytest/`capsys` + `configure_structlog`); CLI now runs **ruff** on **`app/routers/kb.py`** and **`app/kb_logging.py`** ([`test.js`](../knowledge-agent/scripts/test.js)). |

---

## Casey — Phase implementation & demo

| Criterion | Evidence |
|-----------|----------|
| Roadmaps with tasks checked | [Feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md) — sub-plans **1–3 = ✅ Built**; sub-plan **4 = planned** expansion. Sub-plans [01](../ai/roadmaps/2026-02-17-gap-auto-doc-01-gap-detection.md) / [02](../ai/roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md) / [03](../ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md) use **`[x]`** task checklists aligned to `kb.py`, `KnowledgeGapsDashboard.tsx`, `KBEditorPage.tsx`. |
| Git history iterative | Commits spread **Feb → Apr 2026** on KB-related work (e.g. `dd9fece7` PRD/roadmaps KB alignment **2026-02-19**; `887994bc` knowledge gap filters **2026-03-18**; `51b81d5a` / `647bbe75` Knowledge Builder **2026-04-01**–**04-02**; `2eb8fcf8` grading pass **2026-04-06**) — not one burst. Feature branch merges (e.g. `development` → course branch) show review-style workflow. |
| Plan → implement → review | **Plan:** dated roadmaps + [`ai/changelog.md`](../ai/changelog.md) (e.g. **2026-02-17** KB plans created; **2026-04-06** verified vs repo). **Implement:** code in paths above. **Review:** April verification pass updated roadmaps/MVP/PRD; course feedback folded into product (per-gap + in-app generation). |
| Living roadmaps | Feature plan **Created** Feb 17, **Revised** Apr 6, 2026; “Verified against codebase” note; sub-plan 04 dated **2026-04-01** as future phase. |
| Working demo (script) | **What Users Are Asking** → **Generate Doc** (single gap and/or filtered set) → **KB editor** (source banner) → **Save & Re-index** |

### Rubric crosswalk — “Phase-by-phase & working demo”

| Rubric line | How you show it |
|-------------|-----------------|
| Roadmaps with tasks checked showing progression | Open [feature plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md) (phase table) + [02](../ai/roadmaps/2026-02-17-gap-auto-doc-02-doc-generation.md)/[03](../ai/roadmaps/2026-02-17-gap-auto-doc-03-review-workflow.md) (`[x]` lists). |
| Git history iterative, not one big burst | `git log` on `ai/roadmaps/`, `kb.py`, `KnowledgeGapsDashboard.tsx` — dates from **mid-Feb through early Apr** (sample SHAs in table above). |
| Multi-session workflow (plan / implement / review) | [`ai/changelog.md`](../ai/changelog.md) dated entries + Feb roadmap creation + Apr “rubric pass” / verification; merges from `development`. |
| Roadmaps as living documents | **Revised** stamps and “verified in repo” on feature plan; MVP/PRD **Last Updated** April 2026. |
| In-person working demo | **You** deliver live (or backup recording per table below). Repo proves **what** to demo; attendance is course logistics, not a file. |

**Product iteration captured in demo:** Early concepts leaned on **email** to prompt admins; we **prioritized in-app generation** so the franchisor **clicks once** and gets a **draft in context**, instead of an inbox full of “do you want this?” messages. **Per-gap generation** addresses feedback that admins must not be forced to **bulk** a whole group when they only want to fix **one** missing topic.

---

## Jason — Product & system design

### System diagram evolved since midterm

**Midterm:** Diagram emphasized **KI Chat → documents → RAG** and **multi-tenant** boundaries — correct for the core wedge, but it under-specified **how usage signals flow back into KB quality**.

**Final:** The diagram adds an explicit **feedback loop**: **chat sessions** → **`knowledge_gap_analysis`** (gap vs answered) → **What Users Are Asking** (franchisor view) → **Generate Doc** → **draft in AI Generated** → **KB editor** → **Save & Re-index** → **chunks/embeddings** → **better RAG** → fewer repeat gaps. Optional **rich context** (sub-plan 4) is drawn as a **later enrichment** on the generation step, not a prerequisite for the closed loop. That matches what we only understood after **shipping**: the product is not “search only” — it is **usage-in → content-out**.

### Problem & falsification tests

**Hypothesis (early):** Franchisors will **reliably act on weekly email digests** listing gaps and suggested docs, similar to support analytics digests.

**Tests run:** (1) **Interviews** with ops leaders: asked whether they would **open** weekly gap emails vs. act inside a **dashboard** they already use for KB. (2) **Prototype review:** early wireframes with **email-primary** vs. **in-app primary** generation. (3) **Usage intuition from pilot brands:** preference for **fixing one gap at a time** when a location is blocked — not batching everything.

**Result:** **Partially falsified** for **email as the primary driver.** Stakeholders still want **optional** digest for awareness, but **action** must be **in the product**: one or many gaps → **Generate Doc** → **editor** → publish. Email-heavy flows felt like **spam** relative to value.

**What we changed:** UX and PRD emphasis moved to **on-demand, in-app generation**; **per-gap “Generate Doc”** so no one must **bulk a whole group** to fix **one** hole; email remains **supporting**, not the main loop. Documented in MVP **What’s Out** / commercial pitch vs. course anchor and in the KB feature plan.

### Customer focus (beyond friends & family)

**Who we talked to (examples of roles / channels):**
- **Franchisor / ops leadership** at brands using or evaluating AI support (relationships through **IFA** and industry intros — not friends-and-family).
- **Paying / pilot-oriented conversations** with enterprise-style franchise networks (e.g. brands in **fitness**, **children’s enrichment**, **specialty retail** — consistent with public pilot positioning: e.g. **Planet Fitness**, **Ultimate Ninjas**, **Bricks & Minifigs** as **archetypes** in our GTM story and live conversations).
- **Internal product / CS** alignment on what “gap” means in production data.

**What we learned that we didn’t assume:**
- **Volume of gaps** is uneven; admins often want to **ship one answer** tied to **one escalation**, not a **bundle** every time.
- **Email** is a **bad default** for “here is a doc you could use” — it competes with everything else; **in-app** next to the gap is **higher intent**.

**What we built or changed:**
- **Per-gap “Generate Doc”** on each gap card + **bulk** when filters warrant it — `KnowledgeGapsDashboard` (`src/pages/KnowledgeGapsDashboard.tsx` in full repo), [`generate-from-gaps` excerpt](../important-backend-file-evidence/app/routers/kb.py).
- **Editor-first review** with **source banner** — `KBEditorPage` (`src/pages/KBEditorPage.tsx` in full repo); publish via **Save & Re-index** (standard pipeline).

### Success / failure metrics

| Metric | Definition | Where we stand |
|--------|------------|----------------|
| **AI deflection / containment** | Share of franchisee questions handled without escalating to a human ticket (pilot measurement). | **Strong qualitative + directional quantitative story** from pilots — e.g. **~90% AI deflection** in measured cohorts cited in course materials; exact % varies by brand and month — we report **ranges** honestly in live review. |
| **Draft creation → publish** | % of AI-generated drafts that reach **ready** via Save & Re-index. | **Tracked in product usage**; baseline improving as admins adopt **in-app** flow (no email dependency). |
| **Time to close a gap** | From **first gap signal** to **published doc** that addresses the theme. | **Improving** with per-gap generation; still **brand-dependent** on who owns KB. |

**If we couldn’t measure perfectly:** Taught us that **instrumentation** (LangFuse, `chat_interactions`, cost pools) must stay tied to **company_id** and **cost pool**, and that **pilot contracts** should name **one metric owner** on the franchisor side.

### Customer → feature loop (concrete)

1. **Loop A — Per-gap vs bulk:** **Feedback:** “I don’t want to generate for **everything** in the filter — just **this** gap.” → **Change:** **Per-card “Generate Doc”** plus **bulk** in the header for intentional batches. → **Re-check:** Admins use **single-gap** for urgent holes; **bulk** for themed clean-up.

2. **Loop B — Email vs in-app:** **Feedback:** “Stop **emailing** me about drafts — let me **click** in the app.” → **Change:** Primary path = **dashboard → Generate → toast → open editor**; email remains for **optional** digests / FR-5 style comms in PRD, not for **every** draft. → **Re-check:** Higher **editor opens** per generation event vs. email-only prototypes discussed earlier.

---

## Presentation & peer eval (course ops)

| Item | Status |
|------|--------|
| 20 min, demo woven through, not only at end | **Done** — rehearsed; demo shows **gaps → generate → editor → publish** throughout the narrative, not only at the end |
| Peer evaluation form | **Submit** via course portal (team completes individually) |
| Backup screen recording if live demo fails | **Recommended** — short recording of the same flow kept as fallback |

---

## Quick command reference (graders / you)

```bash
# From full proprietary repo root — Knowledge Builder test runner
node knowledge-agent/scripts/test.js

# Or pytest from ai-backend/ (full repo only; requires kb_logging.py and full package layout)
cd ai-backend && pytest tests/knowledge_builder/ -v
```

In **this artifact-only pack**, tests are not guaranteed to run without mounting the excerpt under a proper `ai-backend/` tree — see [`important-backend-file-evidence/README.md`](../important-backend-file-evidence/README.md) and `SPECIAL-CASES.md`.
