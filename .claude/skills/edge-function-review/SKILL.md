---
name: edge-function-review
description: Deep review of Supabase Edge Functions for correctness, security, and patterns
---

# Supabase Edge Function Review

Review the selected Edge Function for correctness, security, and best practices.

If the function uses unfamiliar Supabase Edge Function APIs, Stripe webhook verification, Deno runtime features, or third-party APIs, search the web for current documentation before analyzing.

## Context

### File Structure
```
supabase/functions/
├── _shared/           # Shared utilities (cors.ts, security-middleware.ts)
├── {function-name}/
│   └── index.ts       # Main handler
```

### Supabase Client Types
- **Service Role**: `SUPABASE_SERVICE_ROLE_KEY` - Bypasses RLS (admin operations only)
- **User Context**: Extract JWT from `Authorization` header, verify with `auth.getUser(token)`

## 1. Security Review

### Authentication
- Validates `Authorization` header before processing
- Uses `auth.getUser(token)` to verify JWT (not just parsing)
- Service role key only used when truly needed
- No secrets logged or returned in responses

### Webhook Security (if applicable)
- Stripe: Verifies `stripe-signature` header
- Slack/Teams: Validates request signature
- No webhook processes unsigned requests

### Multi-Tenant Isolation
- Queries filter by `company_id` or `user_id`
- Cannot access other companies' data via parameter manipulation

## 2. Error Handling

- All code paths return a Response
- Errors caught and returned as JSON with appropriate status
- No stack traces leaked to client
- External API call failures handled gracefully

## 3. Database Operations

- Checks `.error` before using `.data`
- Uses `.single()` or `.maybeSingle()` appropriately
- Idempotent: safe to call twice with same input
- Race conditions considered for concurrent calls

## 4. Performance

- Heavy imports at module level (not per-request)
- No unbounded queries without LIMIT
- Environment variables checked at start

## Output

1. **Issues Found** with severity [CRITICAL/HIGH/MED/LOW]
2. **Security Concerns** - auth/data access issues
3. **Updated Code** - corrected function with comments

$ARGUMENTS
