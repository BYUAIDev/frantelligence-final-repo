---
name: backend-hotpath
description: Performance and correctness review for hot-path Python backend code
---

# Backend Hot-Path Review

Optimize the selected Python service/module for a high-traffic production environment.

If the code uses OpenRouter API, Cohere Rerank, LangFuse `@observe` decorators, or unfamiliar async Python patterns, search the web for current documentation.

## 1. Async Correctness

- All I/O uses `await` (no blocking calls)
- httpx clients have timeout configuration
- No blocking operations in async functions
- Proper use of `asyncio.gather()` for parallel operations

## 2. Database Patterns

- No N+1 queries (loops making DB calls)
- Batching with `IN` clauses where possible
- Filtering on indexed columns
- Using async context managers for connections

## 3. Error Handling & Resilience

- External API calls have timeouts
- Retries with exponential backoff (`tenacity`)
- Errors logged with context (user_id, company_id)
- Graceful degradation (e.g., LangFuse down doesn't break chat)

## 4. Resource Usage

- No unbounded lists or memory leaks
- Streaming responses yield incrementally
- Large payloads processed in chunks

## 5. Security

- User context validated before operations
- Visibility scopes enforced in queries
- No SQL injection (parameterized queries)
- Sensitive data not logged

## 6. Output

1. Issues with severity tags [HIGH/MED/LOW]
2. Refactored code with targeted comments
3. Focus on structural wins, not micro-optimizations

$ARGUMENTS
