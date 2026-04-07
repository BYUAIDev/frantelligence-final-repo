# Frantelligence Knowledge Builder — Final submission artifact pack

**Frantelligence** is an AI-first franchise operations platform. The **IS 590r capstone anchor** is the **Knowledge Builder Agent**: surface knowledge gaps from real questions → **Generate Doc** → review in the KB editor → **Save & Re-index** so RAG improves.

**Proprietary constraint:** The production monorepo (`src/`, full `ai-backend/`, `supabase/`, and so on) **cannot** be included. This pack contains **documentation, roadmaps, changelogs, a strict AI bookshelf, midterm/customer artifacts, and a small backend evidence export** so graders can still trace **process** and **proof**. Read **[SPECIAL-CASES.md](./SPECIAL-CASES.md)** first for a rubric-by-rubric mapping of what is and is not here.

---

## Navigating for graders

| Start here | Why |
|------------|-----|
| [**SPECIAL-CASES.md**](./SPECIAL-CASES.md) | How each rubric row is satisfied **without** the full codebase |
| [**aidocs/IS590R-submission-readme.md**](./aidocs/IS590R-submission-readme.md) | One-page: canonical doc paths + demo script |
| [**aidocs/is590r-rubric-evidence.md**](./aidocs/is590r-rubric-evidence.md) | Full Casey + Jason narrative and file crosswalk |
| [**ai/context.md**](./ai/context.md) | **Bookshelf** for cold-start orientation |

---

## Directory layout (this repo)

| Path | Contents |
|------|----------|
| [**docs/**](./docs/) | `prd.md` stub, **`mvp.md`**, problem statement, customer research, system diagram narrative, success/failure criteria, competitive analysis |
| [**aidocs/**](./aidocs/) | Full **PRD**, **architecture**, **coding-style**, rubric evidence, submission cover sheet |
| [**ai/**](./ai/) | **`context.md`** (bookshelf), **`changelog.md`** + **`changelogs/`**, **`roadmaps/`**, **`guides/`** |
| [**important-backend-file-evidence/**](./important-backend-file-evidence/) | Extracted `kb.py` + KB tests + **README** (logging story) |
| [**knowledge-agent/**](./knowledge-agent/) | Checkpoint scripts, midterm notes, customer conversations, development log |
| [**.claude/**](./.claude/) | Stack/domain `CLAUDE.md` + optional review skills |
| [**CLAUDE.md**](./CLAUDE.md) | Root behavioral guidance (docs, commits, proprietary constraint) |

The repo root uses lowercase **`aidocs/`** (portable on case-sensitive filesystems). Historical **checkpoint** docs may still refer to `knowledge-agent/aiDocs/` — that is a **separate** folder under `knowledge-agent/`, not the root technical-doc tree.

---

## Quick evidence checklist (maps to course rubric)

### Casey — Technical process

- [x] **PRD & document-driven development** — [`aidocs/frantelligence-prd.md`](./aidocs/frantelligence-prd.md) (**Since midterm**); pipeline PRD → [**docs/mvp.md**](./docs/mvp.md) → plans → [**ai/roadmaps/**](./ai/roadmaps/) → implementation narrative in [**aidocs/is590r-rubric-evidence.md**](./aidocs/is590r-rubric-evidence.md)
- [x] **mvp.md scope** — [**docs/mvp.md**](./docs/mvp.md) opens with course vs commercial split + pipeline table
- [x] **AI iteration (not one-shot)** — Same rubric doc + [**ai/changelogs/**](./ai/changelogs/)
- [x] **AI infrastructure** — [**ai/context.md**](./ai/context.md) bookshelf; [**aidocs/architecture.md**](./aidocs/architecture.md); [**aidocs/coding-style.md**](./aidocs/coding-style.md); [**CLAUDE.md**](./CLAUDE.md) + [**.claude/CLAUDE.md**](./.claude/CLAUDE.md); [**ai/**](./ai/) committed (verify **not** gitignored)
- [~] **Git workflow (branching, PRs, history)** — **Described** with sample SHAs in rubric doc; **full** history not in this pack → [**SPECIAL-CASES.md**](./SPECIAL-CASES.md)
- [x] **.gitignore / secrets** — [**.gitignore**](./.gitignore) includes `.env`, `.testEnvVars`, `venv/`, `node_modules`, MCP local configs; **spot-check** before committing API keys
- [x] **Phased implementation** — Roadmaps with **[x]**; changelogs; [**docs/system-diagram.md**](./docs/system-diagram.md)
- [~] **Working demo** — **In presentation** per course ops; script in [**aidocs/IS590R-submission-readme.md**](./aidocs/IS590R-submission-readme.md)
- [x] **Structured logging & debugging** — [**important-backend-file-evidence/**](./important-backend-file-evidence/); test–log–fix story in rubric doc
- [~] **Tests run from this zip alone** — `kb_logging.py` **is** in **`important-backend-file-evidence/`**; **`knowledge-agent/scripts/test.js`** still targets **`ai-backend/`** in the monorepo → see evidence **README** for minimal pytest from this folder

### Jason — Product & system design

- [x] **System understanding / evolution** — [**docs/system-diagram.md**](./docs/system-diagram.md); [**knowledge-agent/midterm/systems_design_architecture.md**](./knowledge-agent/midterm/systems_design_architecture.md); architecture doc
- [x] **Problem & falsification** — [**docs/problem-statement.md**](./docs/problem-statement.md)
- [x] **Customer focus** — [**docs/customer-research.md**](./docs/customer-research.md); midterm conversation log
- [x] **Success / failure vs reality** — [**docs/success-failure-criteria.md**](./docs/success-failure-criteria.md)
- [x] **Competitive analysis** — [**docs/competitive-analysis.md**](./docs/competitive-analysis.md); PRD §4
- [~] **Quantitative pilot exports** — **Not all** attached; narrative only unless team adds by deadline

### Guest grader

- [~] **Storytelling & visuals** — Bring **slides / recording** to class; optional to add `presentation/` here

Legend: **[x]** addressed in-repo; **[~]** partial or depends on live demo / external artifacts / honest gap called out in **SPECIAL-CASES**.

---

## Gaps the team should close before April 7, 2026

1. **Optional:** One-page **metrics snapshot** (deflection ranges, draft publish rates) if numbers can be shared.
2. **Optional:** **Backup screen recording** of the demo path referenced in the rubric doc.
3. **Verify** no secrets: run `git grep -i "sk-"` / `git grep "SUPABASE_SERVICE"` before submit.

---

## CLI (full monorepo only)

From the **complete** Frantelligence repo (not this artifact alone):

```bash
node knowledge-agent/scripts/test.js
```

See [**important-backend-file-evidence/README.md**](./important-backend-file-evidence/README.md).
