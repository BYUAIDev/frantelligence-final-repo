# Knowledge Builder Agent - Context

## Overview
This directory contains all documentation, plans, and verification scripts for the **Knowledge Builder Agent**, an autonomous AI system designed for proactive knowledge gap detection and documentation generation within the Frantelligence platform.

## Relation to Frantelligence
The Knowledge Builder is a core module of Frantelligence. While this folder is isolated for AI-friendly development (the "two-folder pattern" from Unit 3 of the Agentic Dev Course), it inherits requirements from the main project.

- **Main Project Context**: [context.md](../../aidocs/context.md)
- **Main Architecture**: [architecture.md](../../aidocs/architecture.md)
- **Main MVP**: [mvp.md](../../aidocs/mvp.md) — read **Document roles** and **Knowledge Builder — end-to-end pipeline** for IS 590r vs commercial MVP; the closed loop (gap → generate → review → publish) is spelled out there, with [sub-plan 4](../../ai/roadmaps/2026-04-01-gap-auto-doc-04-context-pipeline.md) as optional enrichment.

## Agent Scope
- **Domain**: Franchise operations documentation & support deflection.
- **Key Files**:
    - [PRD](./prd.md)
    - [Roadmaps](./roadmaps/)

## Development Principles (JARVIS Mode)
Following the Agentic Development Course:
1. **Planning First**: PRD/Roadmap -> implementation_plan.md.
2. **Context Separation**: This folder isolates context to avoid pollution.
3. **CLI-First**: Verification scripts will be built as CLI tools.
4. **Autonomous Test-Fix**: Use verification scripts to iterate.
