# CaseyWebsite: Agentic Development Course (Exhaustive Knowledge Base)

This document is an exhaustive, slide-by-slide transcript and synthesis of the [Agentic Development Course](https://d1dtpagvh0qhqn.cloudfront.net/) taught by Casey Johnson (BYU IS 590R, 2026). It is designed to be a complete source of truth for anyone or any AI agent to understand the course content without needing the original website.

---

## Unit 1: Generative AI Fundamentals & How Agents Work

### Core Concepts
- **LLM as Autocomplete:** LLMs (Large Language Models) are essentially "World's Best Autocomplete." They predict the next "token" (sub-word unit, ~4 characters) based on patterns in massive training data. Plausible prediction ≠ factual truth.
- **Tokens vs. Words:** Tokens are the atomic units of AI processing. Limits and costs are always measured in tokens.
- **Context Window:** The "working memory" of the AI. It includes the system prompt, history, and any attached files. Sizes vary: Claude (~200K), GPT-4 (~128K), Gemini (~1M+).
- **Temperature:** Controls randomness. 0 is deterministic (good for code/facts), 1.0 is creative (good for writing).

### The Agentic Equation
- **Agent = LLM (Brain) + Tools (Hands) + Reasoning Loop (Process).**
- **Management is the Superpower:** As development shifts from doing to delegating, your ability to specify, review, and manage the AI becomes the primary skill.
- **The Jagged Frontier:** AI is superhuman at some tasks (coding, diagnosis) but struggles with others (simple logic, counting). Humans must fill the gaps.

### The ReAct Framework
- **Reasoning + Acting:** A loop where the AI thinks about the task, takes an action (tool call), observes the result, and repeats until the goal is met. This systematic process is more reliable than "one-shot" generation.

---

## Unit 2: Ideation & Planning with AI

### Ideation Techniques
- **Quantity Generation:** Forcing 15+ ideas to get past the obvious ones.
- **Constraint-Based:** Working within rigid limits to spark creativity.
- **Demon's Advocate (Frenemy):** Asking the AI to find every reason why a project will fail.

### Market Research (Perplexity Focus)
- **Competitive Positioning:** Identifying gaps in existing solutions.
- **Founding Hypothesis:** "For [target customer], who has [problem], our [approach] will solve it better than [competition] because [differentiation]."
- **Success/Failure Indicators:** Define measurable metrics early.

### The Documentation Pipeline
The sequence of documents acts as the "Source of Truth" for the AI:
1.  **Project Description:** The elevator pitch.
2.  **PRD (Product Requirements Document):** High-level "What & Why".
3.  **Plan:** Detailed technical "What & How".
4.  **Roadmap:** A task-by-task checklist for execution.

---

## Unit 3 & 3.5: Development Setup & Implementation

### The Two-Folder Pattern
Organizing the workspace for AI efficiency:
-   **`aidocs/` + `ai/` (Tracked in Git, submission layout):** Permanent technical docs and AI bookshelf / roadmaps.
    -   `context.md`: The "map" for the AI. Lists tech stack, core files, and current status.
    -   `prd.md`, `architecture.md`, `changelog.md`.
-   **`ai/` (Gitignored):** Ephemeral files for the AI's "internal" thoughts.
    -   Roadmaps, research scratchpads, implementation plans.

### Tooling: Claude Code vs Cursor
-   **Claude Code:** Terminal-based, excellent for automation and large-scale refactoring. Uses MCP natively.
-   **Cursor:** IDE integration, visual "Composer" for multi-file edits.
-   **Git as Infrastructure:** Treat Git as the audit log. Commit before every major prompt; use `git diff` as the primary review tool.

### The Autonomous Loop (CLI-First)
- **Goal:** Enable the AI to verify its own work.
- **Requirements:**
    - CLI test scripts that the AI can run.
    - **Exit Codes:** 0 for success, non-zero for failure. The AI uses these to "know" if it should continue or fix an error.
    - **JSON Output:** Machine-parseable logs and test results.

---

## Unit 4: Building AI-Friendly Code

### Structured Logging
-   Moving away from `console.log("here")`.
-   **JSON Logs:** Must include `level`, `service`, `action`, `context`, and `error`.
-   **Purpose:** Logs are the "eyes" of the AI. When an error occurs, the AI reads the structured log to diagnose the root cause without human help.

### Testing Strategies
-   **Unit-level (TDD):** AI writes the test first, then the implementation.
-   **Explore → Codify:** The AI explores a running system (like an API) and then writes a test to "lock in" that behavior.

### Security and The Confidence Trap
-   AI makes you fast, which makes you overlook security flaws.
-   **Rules:** No hardcoded secrets. Use `.testEnvVars`. Sanitized inputs.
-   **Audit:** Always run `npm audit` or similar AI-assisted security checks.

---

## Midterm Project Deliverables (Rubric Alignments)

### 1. Falsification Test (Unit 2 & 5)
-   **Objective:** Proof that your core assumption is valid.
-   **Process:** Pick your "Leap of Faith" assumption (e.g., "Users want X"). Design a test that could prove you WRONG. If it doesn't prove you wrong, you have a validated foundation.

### 2. 2x2 Differentiation Grid (Unit 2 & 5)
-   **Objective:** Visual proof of a "Radical Differentiation" strategy.
-   **Setup:** Two axes representing the most important values for your target user (e.g., Speed vs. Customization).
-   **Plotting:** Place at least 3 competitors. Your project should occupy a "white space" that no one else fills.

### 3. Slide Deck Requirements
-   **C-Suite Pitch:** Present to "Executives" (Casey and Jason).
-   **Content:** 50% Product/System Design (Theory/Strategy), 50% Technical Demonstration (Process/Evidence).
-   **Evidence:** Show your Git history, your roadmaps, and your AI-augmented workflow.
