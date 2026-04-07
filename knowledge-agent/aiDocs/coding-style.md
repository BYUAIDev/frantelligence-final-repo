# Knowledge Builder Agent — Coding Style Guide

**Scope:** This guide covers conventions specific to the Knowledge Builder Agent work stream.
**Base guide:** All general conventions (naming, TypeScript, React, database, git) live in the root
[`aidocs/coding-style.md`](../../aidocs/coding-style.md). Read that first. This document only adds
or overrides what is KB-specific.

---

## Python — Knowledge Builder Services

### File Layout

Each Knowledge Builder service is a single Python file in `ai-backend/app/services/`:

```
ai-backend/app/services/
├── gap_detection.py          # GapDetectionService
├── style_extraction.py       # StyleExtractionService
├── document_generation.py    # DocumentGenerationService
└── kb_orchestrator.py        # KnowledgeBuilderOrchestrator
```

The router lives in its own file:

```
ai-backend/app/routers/
└── knowledge_builder.py      # All /api/v1/knowledge-builder/ endpoints
```

### Required Module Header

Every KB Agent service file must start with:

```python
"""
<ServiceName> — one-sentence purpose.

Detailed description of what the service does, key decisions, and any
non-obvious constraints (e.g., rate limits, token budgets, caching rules).
"""

from app.kb_logging import get_logger

logger = get_logger(__name__)
```

`__name__` gives LangFuse and log analysis clean module-level labels like
`app.services.gap_detection`.

### Structured Logging — Required Pattern

**Never** use `print()`, `logging.getLogger()`, or bare `logger.info("string")` in KB Agent code.
Always use the structured logger from `app.kb_logging` and pass keyword arguments:

```python
# ✅ Required: structured fields — parseable by log analysis tools
logger.info("gap_detected", gap_id=gap_id, company_id=company_id, severity=score)
logger.warning("gap_below_threshold", gap_id=gap_id, score=score, threshold=MIN_SEVERITY)
logger.error("generation_failed", gap_id=gap_id, error=str(e), action="generate_document")

# ❌ Forbidden: unstructured string messages
logger.info(f"Gap {gap_id} detected with severity {score}")
print(f"Error: {e}")
```

Use the helpers from `kb_logging` for the standard entry/exit/error pattern:

```python
from app.kb_logging import get_logger, log_entry, log_exit, log_error

logger = get_logger(__name__)

async def detect_gaps(self, company_id: str, days: int = 30) -> list[KnowledgeGap]:
    log_entry(logger, "detect_gaps", company_id=company_id, days=days)
    try:
        result = await self._query_gaps(company_id, days)
        log_exit(logger, "detect_gaps", company_id=company_id, count=len(result))
        return result
    except Exception as e:
        log_error(logger, "detect_gaps", e, company_id=company_id)
        raise
```

### Service Class Pattern

All KB Agent services follow the same constructor and async pattern:

```python
class GapDetectionService:
    """
    Detects and scores knowledge gaps from chat history.

    Reads from the knowledge_gap_analysis view. Scores gaps using the
    severity formula from PRD FR-1.3. Does not write to the database —
    only reads and returns structured results.
    """

    def __init__(self, supabase_client) -> None:
        self._db = supabase_client
        self._logger = get_logger(__name__)

    async def detect_gaps(
        self,
        company_id: str,
        days: int = 30,
        min_severity: int = 15,
    ) -> list[KnowledgeGap]:
        """
        Return scored, filtered gaps for a company.

        Args:
            company_id: UUID of the franchisor company.
            days: Look-back window for chat history analysis.
            min_severity: Minimum severity score to include (PRD FR-1.3).

        Returns:
            List of KnowledgeGap objects sorted by severity descending.

        Raises:
            DatabaseError: If the knowledge_gap_analysis view is unreachable.
        """
        log_entry(self._logger, "detect_gaps", company_id=company_id, days=days)
        # ... implementation
```

### Pydantic Models — KB Agent

KB Agent Pydantic models live in `ai-backend/app/models/knowledge_builder.py`:

```python
from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime

class KnowledgeGap(BaseModel):
    gap_id: str
    company_id: str
    category: str
    question_count: int
    unique_user_count: int
    trend: Literal["increasing", "stable", "decreasing"]
    severity_score: int
    sample_questions: list[str] = Field(default_factory=list)

class StyleProfile(BaseModel):
    company_id: str
    tone_formality: Literal["formal", "casual", "balanced"]
    tone_technicality: Literal["technical", "accessible", "mixed"]
    prefers_bullets: bool
    avg_word_count: int
    analyzed_at: datetime
```

### LangFuse Tracing

Every public method that calls an LLM must be decorated with `@observe()`:

```python
from langfuse.decorators import observe

class DocumentGenerationService:

    @observe(name="kb.generate_document")
    async def generate_document(
        self,
        gap: KnowledgeGap,
        style_profile: StyleProfile,
    ) -> GeneratedDocument:
        """Observed automatically by LangFuse — token usage tracked."""
        ...
```

---

## Tests — Knowledge Builder

### Location

```
ai-backend/tests/knowledge_builder/
├── __init__.py
├── conftest.py                   # Shared fixtures (mock Supabase, sample gaps)
├── test_gap_detection.py
├── test_style_extraction.py
├── test_document_generation.py
└── test_kb_orchestrator.py
```

### Test Class Naming

```python
class TestGapDetectionService:
    """Tests for GapDetectionService."""

    @pytest.fixture
    def service(self, mock_supabase):
        return GapDetectionService(mock_supabase)

    async def test_detect_gaps_returns_sorted_by_severity(self, service):
        """Highest severity gaps come first."""
        ...

    async def test_detect_gaps_filters_below_threshold(self, service):
        """Gaps below min_severity are excluded."""
        ...

    async def test_detect_gaps_empty_result_when_no_history(self, service):
        """Returns empty list (not an error) when no gaps found."""
        ...
```

### Mandatory Test Cases per Service

For every KB Agent service, tests must cover:

| Category | Examples |
|---|---|
| Happy path | Detects gaps, generates document, approves suggestion |
| Empty / zero-data | No gaps found, no docs in KB for style extraction |
| Error / exception | DB unreachable, LLM timeout, invalid token |
| Boundary conditions | Severity exactly at threshold, max word count, expired tokens |

---

## Database — KB Agent Tables

All KB Agent tables are prefixed `knowledge_builder_`:

| Table | Purpose |
|---|---|
| `knowledge_builder_style_profiles` | Cached style profiles per company |
| `knowledge_builder_suggestions` | Generated documents pending review |
| `knowledge_builder_runs` | Audit log of orchestrator runs |
| `knowledge_builder_outcomes` | Impact tracking after approval |

Migration files follow the project convention: `supabase/migrations/YYYYMMDDHHMMSS_kb_<description>.sql`

---

## API Routes — KB Agent

All KB Agent endpoints are grouped under `/api/v1/knowledge-builder/` and defined in
`ai-backend/app/routers/knowledge_builder.py`.

```python
router = APIRouter(prefix="/api/v1/knowledge-builder", tags=["knowledge-builder"])

@router.post("/generate/{gap_id}")    # Trigger on-demand generation for a gap
@router.get("/gaps")                  # List gaps with status
@router.get("/suggestions")          # List generated suggestions
@router.post("/approve/{token}")     # One-click approve from email
@router.post("/dismiss/{token}")     # Dismiss a gap
@router.get("/preview/{token}")      # Preview generated document
```

The router must be registered in `ai-backend/app/main.py` behind the feature flag:

```python
if settings.feature_knowledge_builder:
    from app.routers import knowledge_builder
    app.include_router(knowledge_builder.router)
```

---

## Frontend — KB Agent Components

Components live in `src/components/knowledge-builder/`:

```
src/components/knowledge-builder/
├── KnowledgeBuilderDashboard.tsx     # Main page container
├── KnowledgeGapRow.tsx               # Single gap row with action button
├── KnowledgeSuggestionModal.tsx      # Review modal (preview + evidence + actions)
├── KnowledgeBuilderMetrics.tsx       # Approval rate, docs generated
└── hooks/
    └── useKnowledgeBuilder.ts        # Data fetching and state management
```

All UI entry points must check the feature flag before rendering:

```typescript
import { config } from '@/config/environment';

if (!config.features.knowledgeBuilder) return null;
```

---

## Quick Reference

Before opening a PR for KB Agent work:

- [ ] All new Python functions have type hints and docstrings
- [ ] All log statements use `kb_logging` with keyword fields (not f-strings)
- [ ] Tests exist for the new code (happy path + at least one error case)
- [ ] No `print()` or bare `logging.getLogger()` calls in KB Agent files
- [ ] Feature flag checked at every UI entry point
- [ ] No secrets or test credentials in source code
- [ ] Roadmap task checked off in the relevant `ai/roadmaps/` file

---

**Maintained by:** Knowledge Builder Agent work stream  
**Last Updated:** February 2026  
**Base style guide:** [`../../aidocs/coding-style.md`](../../aidocs/coding-style.md)
