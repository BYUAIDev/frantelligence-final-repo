# Special cases — proprietary codebase constraint

This submission pack documents **process and evidence** for a capstone built on **Frantelligence**, whose **full application source is proprietary** and **cannot** be redistributed. Below, each affected rubric criterion states **what is asked**, **what we cannot ship**, **what we provide instead**, and **why that substitute is sufficient**.

Rubric wording is paraphrased from the course sheet; see your official rubric for exact text.

---

## Casey — Area 3: Phase-by-phase implementation & working demo

**What the rubric asks (paraphrase):** Incremental implementation following roadmap phases; checklists; multi-session plan / implement / review; **git history** showing iterative progress; **in-person working demo** of core functionality.

**What we cannot provide:** The **complete git history** and **all source files** for the proprietary monorepo in this artifact. Branch/PR detail and commits on private infrastructure are **not** fully exportable here.

**What we ARE providing:**

- [`ai/roadmaps/`](./ai/roadmaps/) — Phase-style Knowledge Builder plans with **`[x]`** checklists (sub-plans 01–03 verified in the real codebase as of April 2026).
- [`ai/changelog.md`](./ai/changelog.md) + [`ai/changelogs/`](./ai/changelogs/) — Dated slices showing **plan ↔ doc ↔ verification** evolution (including Apr 6 rubric pass).
- [`aidocs/is590r-rubric-evidence.md`](./aidocs/is590r-rubric-evidence.md) — Narrative tying phases to **what shipped**, with **sample commit SHAs** and dates (graders can correlate if given read access to private history for verification).
- [`knowledge-agent/midterm/development-log.md`](./knowledge-agent/midterm/development-log.md) — Chronological log derived from the same changelogs.

**Why this is sufficient:** The rubric’s **intent** is to show **non–one-shot** work. Roadmaps with completed tasks, dated changelogs, and explicit verification language demonstrate **incremental** delivery even when **every file** cannot be hosted. **Honest gap:** Iteration in **git** itself is evidenced by **references**, not a full clone.

**Working demo:** The **live demo** is delivered **in person** (or backup recording per course policy). The repo documents **exactly** what to demo: [`aidocs/IS590R-submission-readme.md`](./aidocs/IS590R-submission-readme.md) and [`docs/mvp.md`](./docs/mvp.md) pipeline table (`What Users Are Asking` → **Generate Doc** → KB editor → **Save & Re-index**). The demo does **not** live as a video file in this pack unless the team adds one.

---

## Casey — Area 4: Structured logging & debugging

**What the rubric asks (paraphrase):** Structured logging **in** application code; CLI tests; **test–log–fix** loop with evidence; debugging reflected in **git** history.

**What we cannot provide:** Entire `ai-backend/`, `src/`, and runtime environments.

**What we ARE providing:**

- [`important-backend-file-evidence/app/routers/kb.py`](./important-backend-file-evidence/app/routers/kb.py) — Handler with **lazy** `kb_logging` import and structured entry/exit pattern.
- [`important-backend-file-evidence/app/kb_logging.py`](./important-backend-file-evidence/app/kb_logging.py) — Shared structlog helpers (`get_logger`, `configure_structlog`, entry/exit) used by the KB hot path.
- [`important-backend-file-evidence/tests/knowledge_builder/test_kb_structured_logging.py`](./important-backend-file-evidence/tests/knowledge_builder/test_kb_structured_logging.py) — JSON-on-stdout and route-registration tests.
- [`important-backend-file-evidence/README.md`](./important-backend-file-evidence/README.md) — Explains each file and the test–log–fix story.
- [`knowledge-agent/scripts/test.js`](./knowledge-agent/scripts/test.js) — CLI runner (**documented** exit codes) when executed from the **full** repo layout.

**Why this is sufficient:** Graders can **read** integration of logging into the **real** hot path and see **automated** tests that **fail** unless JSON logs behave — a direct match to “not just a standalone logger file.” **Honest gap:** Running `pytest` / `test.js` still assumes a **full monorepo layout** (or the commands in the evidence README: `pip install structlog pytest`, `PYTHONPATH`, working directory). This pack is **not** a drop-in replacement for `ai-backend/`; it is **review + partial local test** evidence.

---

## Casey — Area 2: AI development infrastructure (`ai/` committed, git workflow)

**What the rubric asks (paraphrase):** `ai/` pattern with `context.md`, architecture/style docs; **CLAUDE.md** / rules; **branching, commits, PRs**; `.gitignore` for secrets and heavy dirs; **no** committed secrets; **`ai/` not gitignored**.

**What we cannot provide:** Private **Git hosting** URLs and full **PR** threads in this zip.

**What we ARE providing:**

- [`ai/context.md`](./ai/context.md) — **Bookshelf** pattern (strict TOC for cold-start AI sessions).
- [`ai/roadmaps/`](./ai/roadmaps/), [`ai/guides/`](./ai/guides/), [`ai/changelog.md`](./ai/changelog.md) — Committed planning surface (not ignored).
- [`aidocs/architecture.md`](./aidocs/architecture.md), [`aidocs/coding-style.md`](./aidocs/coding-style.md).
- [Root `CLAUDE.md`](./CLAUDE.md) + [`.claude/CLAUDE.md`](./.claude/CLAUDE.md).
- [`.gitignore`](./.gitignore) — `.env`, `node_modules`, `venv`, test secrets pattern; **`ai/` is not listed as ignored**.

**Why this is sufficient:** Shows the **infrastructure pattern** the rubric names. **Honest gap:** **PR/commit** narrative is partially secondhand (described in rubric evidence + sample SHAs). Teams may attach **screenshots** or export **git log** if instructors allow.

---

## Casey — Area 1: PRD & document-driven development

**What the rubric asks (paraphrase):** PRD as source of truth; **`mvp.md`** with concrete scope; pipeline **PRD → mvp → plan → roadmap → implementation**; living docs **with visible evolution**; **AI-assisted iteration**, not one-shot.

**What we cannot provide:** Nothing critical — docs **are** redistributable.

**What we ARE providing:** [`aidocs/frantelligence-prd.md`](./aidocs/frantelligence-prd.md) (**Since midterm**), [`docs/mvp.md`](./docs/mvp.md), roadmaps, changelogs, and [`aidocs/is590r-rubric-evidence.md`](./aidocs/is590r-rubric-evidence.md) **AI iteration** section.

**Why this is sufficient:** Direct alignment; proprietary constraint does **not** block this area.

---

## Jason — Areas 1–5 (product & system design)

**General constraint:** Customer analytics spreadsheets, internal dashboards, and some **diagram PNGs** may live **only** in the full repo or slide deck.

**What we provide:**

- **System understanding / diagram evolution:** [`docs/system-diagram.md`](./docs/system-diagram.md), [`knowledge-agent/midterm/systems_design_architecture.md`](./knowledge-agent/midterm/systems_design_architecture.md), [`aidocs/architecture.md`](./aidocs/architecture.md).
- **Problem / falsification:** [`docs/problem-statement.md`](./docs/problem-statement.md) + rubric narrative.
- **Customer focus:** [`docs/customer-research.md`](./docs/customer-research.md), [`knowledge-agent/midterm/customer-conversations.md`](./knowledge-agent/midterm/customer-conversations.md).
- **Success / failure:** [`docs/success-failure-criteria.md`](./docs/success-failure-criteria.md).
- **Competitive analysis:** [`docs/competitive-analysis.md`](./docs/competitive-analysis.md) + PRD §4.

**Honest gaps:** Some **quant** pilot metrics are **described** but not attached as datasets. **`docs/customer-research.md`** now includes a **re-engagement & validation log** (internal vs external rows); **second-round transcripts** for every archetype are still optional to attach by **April 7**.

---

## Guest grader (communication, storytelling, demo integration)

**Cannot provide:** A polished **video** or **slide** file is **not** mandated inside this repo.

**Provided:** [`aidocs/IS590R-submission-readme.md`](./aidocs/IS590R-submission-readme.md) demo script, [`docs/mvp.md`](./docs/mvp.md) “What to Demo,” narrative docs under `docs/` and [`aidocs/is590r-rubric-evidence.md`](./aidocs/is590r-rubric-evidence.md).

**Recommendation:** Bring **slides/backup recording** to presentation per instructor policy; optionally add `presentation/` to this pack if allowed.

---

## Summary

The proprietary constraint mainly affects **full code volume**, **full git objects**, and **optional quantitative exports**. The pack includes an excerpt of **`kb_logging.py`** under **`important-backend-file-evidence/`** so structlog integration is reviewable without the whole backend. The pack is structured so **documentation, roadmaps, changelogs, rubric crosswalk, backend excerpts, and midterm/customer artifacts** carry the proof load **transparently**.
