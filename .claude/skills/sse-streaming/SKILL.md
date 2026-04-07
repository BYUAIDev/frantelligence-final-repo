---
name: sse-streaming
description: Review SSE streaming implementation for correctness and cleanup
---

# SSE Streaming Review

Review streaming implementation for the Frantelligence chat system.

If uncertain about any patterns, search the web for current documentation on FastAPI StreamingResponse, ReadableStream API, AbortController, or SSE event format.

## Expected Architecture

- **Backend**: FastAPI `StreamingResponse` with async generator
- **Frontend**: `fetch` + `ReadableStream` + `AbortController`
- **Format**: `event: {name}\ndata: {json}\n\n`
- **Events**: `init`, `token`, `done`, `error`

## Backend Checks

1. Generator yields properly formatted SSE strings
2. Headers set correctly:
   - `Cache-Control: no-cache`
   - `Connection: keep-alive`
   - `X-Accel-Buffering: no`
3. Errors caught and yielded as `error` event (not thrown)
4. Resources cleaned up even on client disconnect
5. Background completion spawned for resilience

## Frontend Checks

1. `AbortController` created and stored in ref
2. Signal passed to fetch call
3. Reader stored in ref for manual cancellation
4. Abort errors don't show to user (graceful)
5. Cleanup function:
   - Calls `abortController.abort()`
   - Calls `reader.cancel()`
   - Clears refs
6. Partial content preserved on cancel
7. `[DONE]` marker terminates loop
8. Buffer flushed for incomplete final event

## Common Issues

- Missing cleanup on component unmount
- Stream error treated as component error
- Multiple concurrent requests not prevented
- Simulated streaming not cancellable
- Loading state not cleared on cancel

## Output

Issues found + corrected code

$ARGUMENTS
