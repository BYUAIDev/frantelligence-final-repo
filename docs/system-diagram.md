# System diagram — evolution since midterm

> **Midterm baseline:** [knowledge-agent/midterm/systems_design_architecture.md](../knowledge-agent/midterm/systems_design_architecture.md)  
> **Full-platform reference:** [aidocs/architecture.md §1](../aidocs/architecture.md#1-system-overview) (three-layer diagram: web, Edge, FastAPI, Supabase)

---

## Midterm emphasis (checkpoint 1)

The midterm systems doc centers the **knowledge–answer loop**:

- KB (documents → chunks → RAG)  
- Question channel (KI Chat)  
- Answer path (retrieval + generation + citations)  
- Human support (tickets, chat)

It positions Knowledge Builder at **three insertion points**: post-answer gap capture → gap-to-draft generation → draft handoff into the **existing ingestion** pipeline.

**Limitation (acknowledged in final rubric narrative):** that view **under-specified** how **usage signals** close the loop back into KB quality at a **product** level (not only technical RAG).

---

## Final emphasis (post-implementation understanding)

From **is590r-rubric-evidence** — “System diagram evolved since midterm”:

```text
chat sessions
    → knowledge_gap_analysis (gap vs answered)
    → What Users Are Asking (franchisor dashboard)
    → Generate Doc  ──►  draft in AI Generated
    → KB editor (Source Questions banner)
    → Save & Re-index
    → chunks / embeddings
    → better RAG  →  fewer repeat gaps
```

**Sub-plan 4** (rich context: KB + tickets + team chat + expert + contradiction check) is an **optional enrichment** on the generation step — **not** required to describe the closed loop.

---

## Visual assets

Raster diagrams for the **midterm slide deck** lived under `knowledge-agent/midterm/` in the full project; **this artifact pack may not include every PNG**. If graders need pixels, use midterm exports from the team’s slide repo or live demo.

---

## Where to demo

Operational flow: [docs/mvp.md](./mvp.md) (pipeline table), [aidocs/IS590R-submission-readme.md](../aidocs/IS590R-submission-readme.md) (demo script).
