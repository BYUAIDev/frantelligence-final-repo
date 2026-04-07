# Important backend file evidence

This folder holds a **small, intentional export** from the proprietary `ai-backend/` tree so graders can review **Knowledge Builder** implementation evidence without the full codebase.

**Included:** `app/kb_logging.py`, `app/routers/kb.py`, and `tests/knowledge_builder/` mirror the **module layout** under `ai-backend/` so imports resolve the same way (`app.kb_logging`, `app.routers.kb`).

---

## Files

### `app/kb_logging.py`

- **What it demonstrates:** Shared **structlog** configuration and helpers (`get_logger`, `log_entry`, `log_exit`, `configure_structlog`) required by the Knowledge Builder path. Satisfies “not only a standalone idea file” — this module is imported from real router code.

### `app/routers/kb.py` (excerpt / full router export)

- **What it demonstrates:** Production `kb.py` includes the **`POST .../generate-from-gaps`** handler (`generate_document_from_gaps`) and uses a **lazy import** of `kb_logging` so structlog setup runs only on that code path (not every KB route).
- **Structured logging:** Search within the file for `_kb_log_entry`, `_kb_log_exit`, and the comment block noting Knowledge Builder–only structlog JSON.
- **Rubric tie-in:** Satisfies “structured logging **integrated into application code**,” not only a standalone logger module.

### `tests/knowledge_builder/test_kb_structured_logging.py`

- **What it demonstrates:**
  - `test_kb_logging_emits_json_with_action_and_fields` — **`capsys`** asserts stdout contains parseable **JSON** lines after `configure_structlog()`, exercising the test–log–fix loop (early failures when JSON never appeared).
  - `test_generate_from_gaps_endpoint_exists_on_kb_router` — fast check that the **generate-from-gaps** route is registered on the router (guards against accidental removal during refactors).
- **Rubric tie-in:** Evidence of **CLI/pytest** workflow and **automated** checks supporting Area 4 (Structured Logging & Debugging).

### `tests/knowledge_builder/__init__.py`

- Package marker for the `knowledge_builder` test subfolder.

---

## Test–log–fix loop (how these files fit)

1. **Test:** Adding JSON assertions surfaced missing `configure_structlog()` in the test harness (empty `capsys` capture).
2. **Log:** Running the handler shows `generate_document_from_gaps.entry` / `.exit` style events in JSON (in the full deployment — see rubric narrative in [`../aidocs/is590r-rubric-evidence.md`](../aidocs/is590r-rubric-evidence.md)).
3. **Fix:** Tests and lazy-import placement were adjusted; [`../ai/changelogs/2026-04-06.md`](../ai/changelogs/2026-04-06.md) records the rubric pass.

---

## Running checks

### From the **full** Frantelligence monorepo

```bash
node knowledge-agent/scripts/test.js
# or
cd ai-backend && pytest tests/knowledge_builder/ -v
```

### From **this folder only** (minimal smoke)

Install deps, use this directory as `PYTHONPATH` so `app` resolves as a package:

```bash
cd important-backend-file-evidence
pip install structlog pytest
set PYTHONPATH=.   # Windows cmd
# $env:PYTHONPATH="."   # PowerShell
python -m pytest tests/knowledge_builder/ -v
```

**Note:** `test.js` still expects `../ai-backend/` relative to the monorepo root; it does not rewrite paths for this artifact layout.

**Reality check:** `test_generate_from_gaps_endpoint_exists_on_kb_router` imports the full `kb.py` module, which pulls **production dependencies** (e.g. `nh3`, FastAPI stack) not vendored in this folder. Expect that test to pass only in a **full `ai-backend` environment**; the **kb_logging** unit test may also need the same **structlog + stdlib** configuration as production if your local `structlog` version differs.
