# JARVIS — Source of Direction and Truth for Cursor Desktop

**Authority:** This document is the **single source of direction and truth** for how to work in this repository (and any repository that contains it) when using **Cursor Desktop** and AI agents. Any agent or human working in the repo **must** follow it.

**Use:** Copy this document into any repository. Give it to any agent so they know exactly how to run things: what to read first, how to plan, how to implement, how to verify, how to test, how to debug, and how to stay secure.

**Sources (Agentic Development Course):**
- [Course Index](https://d1dtpagvh0qhqn.cloudfront.net/)
- [Unit 2: Ideation & Planning](https://d1dtpagvh0qhqn.cloudfront.net/agentic2WebSlides/)
- [Unit 3: Development Setup & Tools](https://d1dtpagvh0qhqn.cloudfront.net/agentic3WebSlides/)
- [Unit 3.5: Implementation Lab](https://d1dtpagvh0qhqn.cloudfront.net/agentic35WebSlides/)
- [Unit 3.75: AI-Powered Meeting Capture](https://d1dtpagvh0qhqn.cloudfront.net/agentic375WebSlides/)
- [Unit 4: Building AI-Friendly Code](https://d1dtpagvh0qhqn.cloudfront.net/agentic4WebSlides/)

**See also:** For **project purpose, repo map, and terminology**, use **PROJECT-CONTEXT.md**. **JARVIS = how to run Cursor and the pipeline; PROJECT-CONTEXT = what the project is.**

---

## Part A — Cursor Desktop Setup (Unit 3)

### A.1. Two-Folder Pattern

| Folder       | Tracked in Git? | Purpose                   | Contents |
|--------------|-----------------|---------------------------|----------|
| **aidocs/**  | **Yes**         | Permanent project knowledge | prd.md, architecture.md, coding-style.md, rubric evidence (this pack) |
| **ai/**      | **Yes** (this repo) / **No** (gitignored in vanilla JARVIS) | Bookshelf + working plans | context.md, changelog.md, roadmaps/, guides/ |

**Rule of thumb (generic JARVIS):** Permanent prose specs → **`aidocs/`** (lowercase; portable on case-sensitive systems). Iteration / bookshelf / roadmaps → **`ai/`**.

**Frantelligence IS 590r pack:** Start at **[`ai/context.md`](../../ai/context.md)** (bookshelf). Changelog index: **`ai/changelog.md`**. Do not rely on **`aiDocs/`** casing at repo root — root is **`aidocs/`**.

### A.2. context.md — The Most Important File

- **Location:** **`ai/context.md`** (this repo) or **`aidocs/context.md`** — Cursor/agents read the bookshelf first (via `.cursorrules` when present).
- **Keep it concise:** Bullet points, not essays. Works like a bookshelf — agents scan it and only read what's relevant.
- **Required sections:** Critical files to review (with 1–2 sentence descriptions), tech stack, important notes, **current focus** (update this often).
- **Why it matters:** Prevents "context pollution." Too much unneeded data for any given task slows everything down.

### A.3. .cursorrules

- **Location:** Repo root. **Gitignored** (personal/tool config). Copy from `.cursorrules.example`.
- Cursor **auto-reads** this on every prompt.
- Must point to **`ai/context.md`** (or **`aidocs/`** hub) and include behavioral guidelines (ask before complex work, bias toward truth).
- Gitignored so each person can customize (e.g. MCP tools) without affecting others.

### A.4. Required .gitignore Patterns

```
ai/              # Working space — gitignored
claude.md        # Personal tool config
.cursorrules     # Personal Cursor config
.testEnvVars     # Test secrets — NEVER commit
node_modules/
venv/
.env
.env.local
```

> **Security rule:** Verify `.gitignore` covers secrets **before** your first commit.

### A.5. Concise Changelog

- **Location:** **`ai/changelog.md`** (this repo) — vanilla JARVIS may use `aidocs/changelog.md`; this pack keeps dated slices under **`ai/changelogs/`**.
- **Format:** What changed and why (not how). 1–2 lines per item. Trim AI verbosity.
- **Purpose:** Quick history without parsing `git log`. Agents benefit from it.

### A.6. Canonical Locations

| Artifact         | Location |
|------------------|----------|
| AI context       | `ai/context.md` |
| Changelog        | `ai/changelog.md` (+ `ai/changelogs/`) |
| Coding style     | `aidocs/coding-style.md` |
| PRD / Scope      | `docs/` + `aidocs/frantelligence-prd.md` |
| Research         | `ai/roadmaps/YYYY-MM-DD_topic_research.md` |
| Plan             | `ai/roadmaps/YYYY-MM-DD_feature-name_plan.md` |
| Roadmap          | `ai/roadmaps/YYYY-MM-DD_feature-name_roadmap.md` |
| MVP              | `docs/mvp.md` |
| Architecture     | `aidocs/architecture.md` |
| CLI scripts      | `scripts/` (build.sh, run.sh, test.sh, lint.sh, dev.sh) |
| Structured logs  | `logs/` (gitignored) |
| Test env vars    | `.testEnvVars` (gitignored) |
| MCP research     | `ai/guides/` (gitignored) |

---

## Part B — Full Pipeline Overview

```
PRD / Scope (what & why)
    → Research (what exists now — facts only)
        → Plan (what & how)
            → Roadmap (checklist)
                → Implement (from roadmap)
                    → Verify (against roadmap)
                        → Test (CLI scripts)
                            → Log → Fix Loop (until pass)
                                → Commit
```

### B.1. Document Hierarchy

| Layer               | Purpose                           |
|---------------------|-----------------------------------|
| Project Description | Elevator pitch (1–2 paragraphs)   |
| PRD                 | What & why — immutable            |
| Plan                | What & how — work breakdown       |
| Roadmap             | Checklist — phased tasks          |
| MVP                 | Minimum viable scope              |
| Architecture        | How it's built                    |

**Rule:** PRD is immutable. Changes only via new version or addendum.

---

## Part C — How to Run Things (Step-by-Step)

### C.1. First Time in This Repo

1. Read **this document (JARVIS)** — it is the pipeline and the rules.
2. Read **`ai/context.md`** for project context and critical files.
3. Read **PROJECT-CONTEXT.md** for project purpose and repo map if you need it.
4. Ensure **.cursorrules** exists (copy from `.cursorrules.example`).

### C.2. Starting a New Work Stream

1. **Scope/PRD** — Have or create one (what & why).
2. **Research** (if needed) — `ai/roadmaps/YYYY-MM-DD_topic_research.md`. Facts only, no opinions. Skip for simple/greenfield work.
3. **Plan** — `ai/roadmaps/YYYY-MM-DD_feature-name_plan.md` (work breakdown, approach, dependencies).
4. **Roadmap** — `ai/roadmaps/YYYY-MM-DD_feature-name_roadmap.md` (phased checklist with completion criteria, references the plan).
5. **Git checkpoint** — Commit current state before implementation.

### C.3. Implementation Pattern (Unit 3.5)

**Checkpoint first. Then use this exact prompt:**

```
Review ai/context.md. Implement the roadmap at ai/roadmaps/[your-roadmap].md.
```

Context.md points to architecture, coding style, and everything else. Do not micromanage. Answer clarifying questions. Let AI work.

### C.4. Verify Against Roadmap (Unit 3.5)

After implementation, always verify:

```
Review the roadmap at ai/roadmaps/[your-roadmap].md.
Check off what was completed from the current phase.
Flag anything missed or implemented differently than planned.
Do not make code changes — just report.
```

Then update the roadmap — mark completed items, note deviations. The roadmap is a living document.

### C.5. CLI Scripts (Units 3.5 & 4)

Every repo must have (or you create) CLI scripts in `scripts/`:

| Script       | Purpose |
|--------------|---------|
| `build.sh`   | Compile / build |
| `run.sh`     | Run the app |
| `test.sh`    | Run test suite |
| `lint.sh`    | Linting (optional) |
| `dev.sh`     | Start dev server (optional) |

**Requirements for all scripts:**
- Output **JSON to stdout** (machine-readable results).
- Send errors/diagnostics to **stderr**.
- Use **exit codes**: 0 = success, non-zero = failure (1 = general, 2 = misuse, 126 = permission, 127 = not found).
- Include a `--help` flag for self-documentation.
- Source `.testEnvVars` for test credentials.

**Cross-platform note (Windows/Mac/Linux):** Prefer Node.js scripts (`node scripts/test.js`) when shell portability is an issue.

### C.6. .testEnvVars Pattern (Unit 4)

```bash
# .testEnvVars — Test environment config. GITIGNORED. Shell export format.
export DATABASE_URL="postgresql://localhost:5432/testdb"
export API_KEY="test-api-key-only"
export LOG_LEVEL="debug"
```

Usage: `source .testEnvVars && ./scripts/test.sh`

Never use production credentials. Never commit this file.

### C.7. The Test-Log-Fix Loop (Units 3.5 & 4)

**Initiation prompt (then step back):**

```
Implement [feature] per the plan. After implementation, run ./scripts/test.sh.
Review the logs and fix any issues. Continue until all tests pass.
```

**The autonomous cycle AI runs:**
1. Implement code changes.
2. Run `./scripts/test.sh`.
3. Read stdout/stderr and exit code.
4. If exit code 0 → done.
5. If non-zero → read logs, diagnose, fix, go to step 2.

**When to intervene (human):** Only if:
- AI is clearly confused about the root cause.
- Fixes are making things worse.
- Same error repeats 3+ times.

**Intervention prompt:**

```
Stop. Let's step back.
1. What are we actually trying to accomplish?
2. What have we tried so far?
3. What's the actual root cause?
4. Is there a completely different approach?
```

### C.8. Git Safety Net (Mandatory)

1. **Commit** before every major AI task (treat commits as save points).
2. After AI work: **review** with `git status`, `git diff`, `git diff --stat`.
3. If good → **commit**. If wrong → **revert** (`git checkout -- .` or `git revert`).

```bash
git status          # What files changed?
git diff            # What exactly changed?
git diff --stat     # Summary: files and line counts
git log --oneline   # What has been committed?
```

---

## Part D — Structured Logging (Unit 4)

### D.1. Why Structured Logging

> "Structured logging handles 95% of debugging now." If AI can see what happened, AI can fix it. AI reads logs — not debuggers.

### D.2. Structured vs Unstructured

**Bad (AI can't parse):**
```
Error occurred in user service
Failed to create user
```

**Good (AI can parse, filter, diagnose):**
```json
{"level":"error","service":"user","action":"create","error":"duplicate_email","email":"test@example.com","timestamp":"2026-02-03T10:30:00Z"}
```

### D.3. What to Log

```javascript
// Entry with inputs
logger.info({ action: 'createUser', input: { email, name } });
// Exit with result
logger.info({ action: 'createUser', result: { userId, success: true } });
// Errors with full context
logger.error({ action: 'createUser', error: err.message, stack: err.stack, input: { email } });
```

Log **entry, exit, and errors** with full context on each.

### D.4. Log Levels

| Level | When | Example |
|-------|------|---------|
| ERROR | Something failed | DB connection failed |
| WARN  | Concerning but recoverable | Retry attempt 3 of 5 |
| INFO  | Normal operations | User logged in |
| DEBUG | Detailed troubleshooting | Raw query output |

Set via `.testEnvVars`: `export LOG_LEVEL="debug"`

### D.5. Recommended Libraries

| Language | Library |
|----------|---------|
| Node.js  | Pino |
| Python   | structlog |
| Go       | slog (stdlib) |
| Java     | Logback + SLF4J |
| Rust     | tracing |

### D.6. Document Logging in `ai/guides/testing.md`

```markdown
## Logs
- App logs: ./logs/app.log
- Clear: rm ./logs/*.log
- Tail: tail -100 ./logs/app.log
- Set level: LOG_LEVEL in .testEnvVars
```

---

## Part E — Testing Strategies (Unit 4)

### E.1. Two Levels

| Strategy | Level | Best For |
|----------|-------|----------|
| **TDD** | Unit | Individual functions, business logic, data validation |
| **Explore → Codify** | System | APIs, integrations, user workflows, system behavior |

Use both. TDD first; Explore → Codify after initial implementation works.

### E.2. TDD with AI (Red → Green → Refactor)

1. **RED:** Ask AI to write comprehensive tests (happy paths, error conditions, edge cases, boundary conditions). Verify tests **fail** (no implementation yet).
2. **GREEN:** Ask AI to implement the minimal code to make tests pass.
3. **REFACTOR:** Ask AI to improve code quality — tests ensure correctness throughout.
4. **REPEAT**.

**Prompt — Step 1 (write tests):**
```
I need a function that [does X]. Write comprehensive tests covering:
- Valid inputs (happy path)
- Invalid inputs and error conditions
- Edge cases and boundary conditions
Use [test framework] and follow patterns in [existing test file].
```

**Prompt — Step 4 (review tests):**
```
Review the tests you wrote. Are there cases missing? What assumptions did you make?
```

**Prompt — Step 5 (implement):**
```
Now implement [function] to pass all these tests. Use the minimal code necessary — don't over-engineer.
```

**Prompt — Step 7 (refactor):**
```
Tests are passing. Review the implementation and suggest refactoring for clarity, performance, and maintainability. Make improvements while keeping tests green.
```

### E.3. Explore → Codify (System-Level)

**Phase 1 — Explore:**
```
The server is running on [host:port]. Explore it:
- Hit each endpoint with valid and invalid inputs
- Try edge cases (empty strings, huge payloads, special characters)
- Check what happens with missing auth tokens
- Look at the logs after each request
- Report what you find — especially anything surprising.
```

AI runs ad-hoc CLI commands (curl, queries, log inspection). No scripts yet.

**Phase 2 — Codify:**
```
Based on your exploration, create scripts/test-integration.sh that:
- Tests each endpoint (happy path)
- Tests the edge cases you discovered
- Tests the failure modes you found
- Uses proper exit codes and JSON output
- Can run unattended in the test-fix loop
```

---

## Part F — Security (Unit 4)

### F.1. Never Commit

- API keys, auth tokens, passwords
- Private SSH keys or certificates
- `.env`, `.testEnvVars`, `credentials.json`
- Any real secret, ever

### F.2. Never Paste Secrets in Prompts

**Bad:**
```
Use this API key: sk-abc123xyz789 to call the service.
```

**Good:**
```
Use the API key from .testEnvVars to call the service.
```

Secrets in prompts may be logged.

### F.3. Security Checklist (Before First Commit)

- [ ] `.gitignore` covers `.env`, `.testEnvVars`, `ai/`, `*.key`, `*.pem`.
- [ ] No secrets hardcoded in source code.
- [ ] No secrets in `.cursorrules` or `ai/context.md` / `aidocs/`.
- [ ] `.env.example` committed with placeholder values only.
- [ ] Dependencies audited (`npm audit`, `pip audit`).

### F.4. The Confidence Trap

> Per [Perry et al., 2023](https://arxiv.org/abs/2211.03622): Developers using AI produce **more** security vulnerabilities — and express **higher** confidence their code is secure.

AI optimizes for plausible code, not provably secure code. Always verify. The test-fix loop and PR review matter for **security**, not just correctness.

### F.5. Common AI-Generated Vulnerabilities to Watch For

| Vulnerability | Pattern | Fix |
|---------------|---------|-----|
| SQL Injection | User input interpolated into query strings | Parameterized queries |
| Hardcoded secrets | API key literal in source | Environment variables |
| Prompt injection | User input passed directly into AI prompt | Sanitize; separate data from instructions |

---

## Part G — Meeting Capture Workflow (Unit 3.75)

### G.1. Record → Transcribe → Extract → Share

**Record:** Zoom/Teams/Meet built-in, Otter.ai, phone voice memo, OS recorder.

**Transcribe:** Otter.ai (free: 600 min/month), Whisper (free, local, open source), phone transcription.

**Always announce recording and get consent before recording any meeting.**

### G.2. AI Extraction Prompts

**Extract decisions and action items:**
```
Here is a transcript from a meeting. Extract:
- All decisions made
- Action items with owners
- Open questions that weren't resolved
- Key discussion points
- Any deadlines mentioned
Format as organized markdown with clear sections.
```

**Compare to existing project docs:**
```
Here is a meeting transcript and here is our current project PRD.
Identify: what needs to change in the PRD, new requirements discussed,
conflicts with current plans, decisions that affect our architecture.
```

**Create specs or slides from transcript:**
```
Based on this meeting transcript, create a technical specification
document for the features discussed. Include: requirements, acceptance
criteria, technical approach, and dependencies.
```

**Cross-meeting synthesis:**
```
Here are transcripts from [N] meetings. Identify: common themes,
evolving decisions (what changed), open action items, and create
a consolidated status update.
```

### G.3. Best Practices

- Stack recording + context (your codebase) for context-aware spec updates.
- Share the AI summary, not the raw transcript.
- Use for lectures too: "Create me a study guide from this transcript."
- Transcription + extraction takes ~5 minutes. ROI is enormous.

---

## Part H — Prompts Library (Copy-Paste Ready)

### H.1. Planning

**Project description:**
```
Help me write a project description for: [idea].
Create 2 paragraphs: problem it solves, who it's for, how it works (high level), why it's different.
Make it compelling in 30 seconds.
```

**PRD:**
```
Based on this project idea: [description].
Create a PRD with: problem statement, target users (primary, secondary, NOT for),
success metrics, features by priority (P0/P1/P2), 5+ user stories, out of scope, key risks.
```

**Research (facts only):**
```
Review ai/context.md and [relevant files]. Research how [feature/area] currently works.
Document what you find. DO NOT suggest changes. Save to ai/roadmaps/YYYY-MM-DD_topic_research.md.
```

**Plan + Roadmap:**
```
Create a plan doc and then a concise roadmap doc in ai/roadmaps/ for what we just discussed.
Prefix filenames with today's date. Make sure they reference each other.
Include a note in each to avoid over-engineering and legacy-compatibility cruft.
```

**MVP:**
```
Here's my PRD: [reference].
Define the MVP: (1) ONE core problem, (2) minimum feature set, (3) what to cut,
(4) simplest technical approach, (5) how to validate.
We have [X weeks] and [Y team members].
```

**MVP reality check:**
```
Here's my MVP feature list: [list].
I have [X weeks] with [Y developers]. Is this realistic?
What should I cut? What am I underestimating? What's the TRUE minimum?
```

### H.2. Implementation

**Implement:**
```
Review ai/context.md. Implement the roadmap at ai/roadmaps/[roadmap].md.
```

**Verify:**
```
Review the roadmap at ai/roadmaps/[roadmap].md.
Check off what was completed. Flag anything missed or implemented differently.
Do not make code changes — just report.
```

**Create CLI scripts:**
```
Create CLI scripts in scripts/ that exercise the features we just built.
Each script should: accept CLI arguments, run the feature, output JSON to stdout,
use exit code 0 = success / non-zero = failure, send errors to stderr.
Minimum: scripts/build.sh and scripts/test.sh.
```

**Test-fix loop:**
```
Run ./scripts/test.sh. If any tests fail, analyze the output, fix the issues, and run again.
Continue until all tests pass.
```

### H.3. TDD

**Write tests first:**
```
I need a function that [does X]. Write comprehensive tests covering happy paths,
error conditions, edge cases, and boundary conditions.
Use [framework] and follow patterns in [existing test file].
```

**Verify tests fail:**
```
Run the tests and confirm they all fail (since we haven't implemented yet).
```

**Implement to pass:**
```
Now implement [function] to pass all these tests. Minimal code — don't over-engineer.
```

**Refactor safely:**
```
Tests are passing. Suggest refactoring for clarity, performance, and maintainability.
Make improvements while keeping all tests green.
```

### H.4. Debugging

**Debug prompt pattern:**
```
I'm getting this error: [full error + stack trace]
What I was trying to do: [action]
Expected behavior: [what should happen]
Actual behavior: [what happened]
Relevant code: [file path and section]
Log output: [paste structured logs]
Please analyze, explain root cause, and fix.
```

**Stuck? Step back:**
```
Stop. Let's step back.
1. What are we actually trying to accomplish?
2. What have we tried so far?
3. What's the actual root cause?
4. Is there a completely different approach?
```

### H.5. Collaborative Prompting

**Tentative approach (not commands):**
```
We need to add [feature]. I'm thinking [approach] but I'm not sure it's best here.
What do you think?
```

**Context-first:**
```
Review ai/context.md. Then review how [feature] currently works. Understand it thoroughly.
Now here's what we need to change: [requirements].
What's your opinion on the best approach? Don't make code changes yet.
```

**Frenemy (critical review before committing):**
```
Regarding the following plan, respond with direct, critical analysis.
Prioritize clarity over kindness. Identify my logical blind spots.
Fact-check my claims. Refute my conclusions where you can. Assume I'm wrong.
[paste plan]
```

Use frenemy to tear apart a plan → then a fresh collaborative session debates what's actually valid.

### H.6. Refinement

**Gap analysis:**
```
Review this PRD: [paste]. What's missing? What questions would a developer have?
What assumptions need to be stated explicitly?
```

**Clarity:**
```
Read this spec as a developer who must implement it. What's unclear or ambiguous?
Rewrite those sections to be crystal clear.
```

**Scope creep:**
```
Compare this MVP to the original problem statement. Are we solving the original problem,
or have we drifted? What features don't serve the core problem?
```

---

## Part I — Bias Toward Truth (Unit 3)

Add this to `.cursorrules` and use it on non-trivial tasks:

```
Before implementing, please:
1. Show your reasoning step by step.
2. Flag anything you're uncertain about.
3. Say "I don't know" rather than guessing.
4. Verify against ai/context.md when in doubt.
```

**Positivity rule:** Avoid accusatory framing. Use clear, neutral language. Research shows negativity causes erratic AI behavior; positivity produces more focused results.

---

## Part J — Multi-Agent Coordination

### When this doc is used by an accountability agent (JARVIS role):

- **Pipeline keeper:** Ensure work follows the full pipeline (B above) at all times.
- **Documentation enforcer:** Call out missing scope, research, plan, or roadmap.
- **Git safety:** Remind to commit before major tasks; review after.
- **Multi-agent coordinator:** Map reported work to the pipeline; flag gaps; do not implement.

### When used by an implementation agent:

- Follow Part C (How to Run Things) end to end.
- Follow Part I (Bias Toward Truth, collaborative prompting).
- Use Part H prompts as given; never skip verification or testing when a roadmap exists.

### What the user should tell any agent:

- Which work stream they're on.
- Which pipeline phase they're in (planning / implementing / verifying / testing / debugging).
- What other agents are doing (for handoff clarity).

---

## Part K — New Work Stream Checklist

- [ ] **Scope or PRD** exists (what & why).
- [ ] **Research** (if needed) — `ai/roadmaps/YYYY-MM-DD_topic_research.md`, facts only.
- [ ] **Plan** — `ai/roadmaps/YYYY-MM-DD_feature-name_plan.md`.
- [ ] **Roadmap** — `ai/roadmaps/YYYY-MM-DD_feature-name_roadmap.md` (references plan).
- [ ] **MVP** defined and reality-checked (if applicable).
- [ ] **Git checkpoint** — committed before implementation begins.
- [ ] **CLI scripts** exist (`scripts/build.sh`, `scripts/test.sh` minimum).
- [ ] **Structured logging** in place (not console.log).
- [ ] **`.testEnvVars`** set up and gitignored.
- [ ] **Security check** — no secrets in code, `.gitignore` verified.

---

## Part L — Repo-Specific Notes (Fill In When You Copy This File)

*Replace this section with 2–4 sentences: repo name, current work streams, where main code/docs live, repo-specific conventions.*

**Example (HAFB-Capstone-Project):**
- **Repo:** HAFB-Capstone-Project (central). Work streams: recruitment-signup app, training scenarios. Code: `vms/victim/vulnerable-apps/recruitment-signup/`, `infrastructure/`, `training/`. Context: your repo’s context hub (example: `ai/context.md`). Roadmaps: `ai/roadmaps/` (may be gitignored in that project).

---

## Summary: Ironclad Rules

1. **Context first.** Read `ai/context.md` (via .cursorrules) before any work.
2. **Full pipeline.** Plan → Implement → Verify → Test → Log → Fix → Commit. Never skip steps.
3. **CLI scripts.** JSON stdout, exit codes, stderr errors. AI tests autonomously with them.
4. **Structured logs.** JSON logs, not print statements. AI debugs from logs, not debuggers.
5. **TDD + Explore → Codify.** Write tests first for units; explore live system and codify for integration.
6. **Secrets never.** Never commit or paste secrets. `.testEnvVars` for test credentials, gitignored always.
7. **Git safety.** Commit before major AI tasks. Review with `git diff`. Revert if wrong.
8. **Bias toward truth.** Show reasoning, flag uncertainty, say "I don't know," verify against context.
9. **Collaborate, don't command.** Ask "What do you think?" before big changes. Use frenemy before committing.
10. **This document wins.** When in doubt, follow JARVIS. It is the source of direction and truth.

---

*End of JARVIS. Any agent in this repo must follow this document. Copy to other repos and fill in Part L.*
