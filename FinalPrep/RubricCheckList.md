# IS 590R Final Rubric Checklist (Professor-Source Build)

Use this checklist to verify final submission readiness for:
- Repo submission deadline: **Monday April 7, 23:59**
- In-class final presentation + live demo

Source basis for this checklist:
- `FinalPrep/Rubric.md` (official grading rubric text)
- Course site ([AI Applications in Business — BYU IS 590R](https://d1dtpagvh0qhqn.cloudfront.net/))

---

## 0) Final Readiness Gate (Must-Have Conditions)

- [ ] Repo and slides committed/pushed by deadline
- [ ] Team has a **20-minute** timed deck and run-of-show
- [ ] Team has a **working in-person demo** (plus backup recording)
- [x] Team can clearly show progress **since midterm** (not a repeat)
- [ ] All members can explain their own contributions
- [ ] Peer evaluations planned/submitted (confidential form)

---

## 1) Jason Domain (45%) - Product + System Design

### 1.1 System Understanding (20)
- [x] Updated system diagram is meaningfully different from midterm
- [x] Team can explain what was wrong/missing at midterm
- [x] New actors, relationships, constraints, or feedback loops are identified
- [x] Leverage points attempted are shown with outcomes
- [x] Evidence supports system-learning claims

### 1.2 Problem Identification (20)
- [x] Problem statement is sharper than midterm version
- [x] Falsification tests were executed (not only designed)
- [x] Results are documented and interpreted
- [x] If pivoted: pivot is justified by evidence
- [x] If refined: continuity is justified by validation evidence

### 1.3 Customer Focus (20)
- [x] Customer understanding has deepened over time
- [x] Interviews include people beyond friends/family
- [x] Customer insights changed assumptions or priorities
- [x] Competitive understanding evolved during build
- [x] Positioning reflects validated customer reality

### 1.4 Success & Failure Planning (20)
- [x] Success/failure criteria from midterm were tested in practice
- [x] Team can report current status against those criteria
- [x] Gaps in measurement are acknowledged and interpreted
- [x] Pivot/fallback logic now reflects real data

### 1.5 Customer Interaction (20)
- [x] Clear feedback loop shown: engage -> learn -> change -> re-engage
- [x] Specific product decisions map to specific customer feedback
- [ ] Follow-up validation after changes is demonstrated
- [x] Customer interaction improved the solution (with proof)

---

## 2) Casey Domain (45%) - Technical Process

### 2.1 PRD + Document-Driven Development (25)
- [x] PRD exists and is actionable enough to build from
- [x] `mvp.md` exists and defines scope-constrained deliverable
- [x] Development flow is evident: PRD -> mvp -> plan -> roadmap -> implementation
- [x] Docs are living artifacts (updated to current state)
- [x] If pivoted, doc history shows evolution; if not, stability is coherent
- [x] Evidence shows AI-assisted iteration, not one-shot generation

### 2.2 AI Development Infrastructure (25)
- [x] AI docs/planning folder structure is committed (not gitignored)
- [x] `context.md` uses bookshelf-style orientation and is current
- [x] Behavioral rules exist (`CLAUDE.md` or `.cursorrules`)
- [ ] Git workflow demonstrates meaningful iterative development
- [x] `.gitignore` protects secrets + local/env/library files
- [ ] No secrets are committed (env vars, keys, MCP secrets)

### 2.3 Phase-by-Phase Implementation + Working Demo (25)
- [x] Roadmaps show phased execution with checklist progression
- [ ] Git timeline shows iterative progress across the semester
- [x] Multi-session workflow is visible (plan/implement/review loops)
- [ ] Demo covers core functionality and works in person
- [x] Demo narrative ties feature state to roadmap phases

### 2.4 Structured Logging + Debugging (25)
- [x] Structured logging is integrated in application code paths
- [x] Logging is used for debugging evidence, not just declared
- [ ] CLI test scripts exist and run
- [x] Test -> log -> fix loop is evident in artifacts/history
- [x] Debugging process is documented in docs/history/presentation

---

## 3) Guest Grader Domain (10%) - Presentation Quality

### 3.1 Communication Quality (25)
- [ ] Delivery is clear, confident, and organized
- [ ] Speakers transition smoothly and explain trade-offs
- [ ] Q&A responses are thoughtful and technically grounded

### 3.2 Storytelling + Journey (25)
- [ ] Story centers on learning journey, not feature listing
- [ ] Midterm-to-final evolution is explicit
- [ ] Honest treatment of mistakes, surprises, and rethinks

### 3.3 Visual Design + Demo Integration (25)
- [ ] Slides support message and reduce cognitive load
- [ ] Product is shown throughout, not only at the end
- [ ] Demo is embedded naturally into the narrative

### 3.4 Overall Impact (25)
- [ ] Audience can explain what was built, why, and what was learned
- [ ] Team appears professional, prepared, and credible

---

## 4) Required Final Presentation Elements

- [x] System design diagram
- [x] Process narrative (plan/build/iterate/adapt)
- [ ] In-person working demo (plus backup)
- [ ] Product shown throughout presentation
- [x] Honest lessons learned + what we would do differently
- [ ] Strong Q&A with trade-off awareness
- [x] Full-journey framing (not intro repeat)

---

## 5) Midterm-to-Final Delta Checks (Explicit Additions)

- [x] Working code and runnable demo now exist
- [x] Interviews include non-friends/family target users
- [x] Falsification tests are executed and reported
- [x] PRD/context/roadmaps/changelogs are current
- [x] Structured logging is used in real app flow
- [ ] Final talk is continuation, not re-introduction
- [x] `mvp.md` is present and concrete
- [x] Behavioral guidance file present (`CLAUDE.md` or `.cursorrules`)
- [x] MCP usage can be discussed without exposing config secrets

---

## 6) Artifact-Repo Adaptation (For Proprietary/Partial Code Context)

Use this section to align with rubric expectations while clearly documenting repository boundaries.

### 6.1 Scope Transparency Files (Create/Verify)
- [x] Add/verify a plain-language file explaining **why this repo is partial**
- [x] List what is intentionally excluded (proprietary/sensitive/full monorepo areas)
- [x] Map excluded components to available evidence artifacts in this repo
- [ ] State that professors approved this submission format (if accurate)

### 6.2 Evidence Crosswalk
- [x] Include a rubric-to-artifact crosswalk so graders can quickly verify each criterion
- [x] For each criterion, name where evidence lives (doc/log/test/demo note)
- [x] Mark any unavoidable gaps clearly and honestly

### 6.3 Git History Summary (Required if full history is not obvious in this pack)
- [x] Provide a concise timeline of major milestones/pivots/debug loops
- [x] Include representative commits/PRs (date, short SHA, one-line purpose)
- [x] Show phase-by-phase progression across semester (not one-shot build)
- [x] Explicitly connect timeline entries to roadmap phases and rubric criteria

---

## 7) Course-Site Alignment Checks (Business + Agentic Development)

From course framing, ensure final evidence demonstrates both tracks:

### 7.1 Business Development
- [x] Systems thinking is visible in diagram + decisions
- [x] Customer discovery materially changed decisions
- [x] Differentiation/positioning is explicit and evidence-backed
- [x] Team demonstrates judgment in problem framing and trade-offs

### 7.2 Agentic Development
- [x] AI tools were used across ideation -> planning -> implementation -> deployment/demo
- [ ] Team can explain workflow quality, not just tool names
- [x] Agent-assisted iteration is documented through artifacts/history

---

## 8) Final 24-Hour Preflight

- [ ] Rehearse 20-minute run twice with timer
- [ ] Dry-run live demo in presentation environment
- [x] Validate all linked files open quickly from repo
- [x] Spot-check for leaked secrets/config keys
- [ ] Confirm all required docs are committed and pushed
- [ ] Prepare backup demo recording and fallback script

---

## 9) Scoring Awareness (Fast Sanity Check)

- Jason domain: 100 raw -> weighted to 90
- Casey domain: 100 raw -> weighted to 90
- Guest domain: 100 raw -> weighted to 20
- Total final score: `/200`
- A threshold: `186+`; A- threshold: `180+`

Use this to target weak areas before submission lock.
