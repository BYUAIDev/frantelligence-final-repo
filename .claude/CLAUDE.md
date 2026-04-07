# Frantelligence Codebase Context

## Stack

### Frontend (`src/`)
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: Custom hooks in `src/hooks/`, AuthContext for user
- **Data**: Supabase client from `@/integrations/supabase/client`
- **Real-time**: SSE streaming for AI chat, Supabase realtime subscriptions

### Backend (`ai-backend/`)
- **Framework**: Python 3.11+ FastAPI, fully async
- **Services**: Dependency injection via `Depends()`, service classes
- **LLM**: OpenRouter API via `ChatCompletionService`
- **DB**: Supabase PostgreSQL client (async)
- **Observability**: LangFuse with `@observe` decorators

### Edge Functions (`supabase/functions/`)
- **Runtime**: Deno + TypeScript
- **Auth**: JWT verification from Supabase
- **Webhooks**: Slack, Teams, SMS integrations

## Domain Model

### Multi-Tenant Architecture
- `company_id`: Organization (franchisor brand)
- `franchisee_id`: Individual location/franchise
- `user_id`: Individual user within organization

### Roles (in order of access)
1. `franchisor_admin` - Full company access
2. `franchisor_employee` - Company-wide read access
3. `multi_unit_franchisee` - Multiple owned locations full access
4. `franchisee` - Single owned location full access
5. `franchisee_employee` - Basic location access

### Visibility Scopes (document access)
- `company` - Everyone in the same company
- `corporate` - Franchisor roles only
- `franchisee` - Specific franchisee(s)
- `owners` - Specific user(s) only

### Usage/Billing
- Cost pools per franchisee with tier-based limits
- Usage gating checks before AI operations
- LangFuse tracks token/cost usage

## Key Patterns

### Frontend Hooks
```typescript
// Standard return shape
const { data, isLoading, error, refetch } = useMyHook();

// Auth always from context
const { user } = useAuth();

// Supabase queries
const { data, error } = await supabase.from('table').select('*');
```

### Backend Services
```python
# Dependency injection
def get_service(supabase: SupabaseDep) -> MyService:
    return MyService(supabase)

# Async everywhere
async def my_operation(self) -> Result:
    return await self._client.query(...)

# Pydantic models for I/O
class MyRequest(BaseModel):
    field: str
```

### Error Handling
- Frontend: Show user-friendly toast, log detailed error
- Backend: Raise HTTPException with appropriate status, log context
- Never swallow errors silently

## File Locations

| What | Where |
|------|-------|
| React components | `src/components/` |
| Custom hooks | `src/hooks/` |
| Pages/routes | `src/pages/` |
| TypeScript types | `src/types/` |
| API routers | `ai-backend/app/routers/` |
| Backend services | `ai-backend/app/services/` |
| Pydantic models | `ai-backend/app/models/` |
| Edge functions | `supabase/functions/` |
| DB migrations | `supabase/migrations/` |

## Common Issues to Watch

1. **Multi-tenant leakage**: Always filter by company_id
2. **Missing await**: All DB/API calls are async
3. **Stale closures**: useCallback deps in effects
4. **SSE cleanup**: AbortController must be cleaned up
5. **Role confusion**: Check `user.role` not `user.user_type`
6. **Visibility scopes**: Array intersection, not equality

---

# Feature Flag Requirement

All new user-facing features **MUST** be gated behind a feature flag.

### Naming Convention
Frontend: `VITE_FEATURE_<FEATURE_NAME>=true`
Backend: `feature_my_feature: bool = False` in `ai-backend/app/config.py`

### Implementation Checklist

1. **Register in `src/config/environment.ts`**:
```typescript
features: {
  myFeature: import.meta.env.VITE_FEATURE_MY_FEATURE === 'true',
},
```

2. **Gate UI entry points** (routes in `src/App.tsx`, nav items in sidebar configs):
```typescript
{config.features.myFeature && <Route ... />}
```

3. **Backend gating** (if applicable):
```python
if not settings.feature_my_feature:
    raise HTTPException(status_code=404, detail="Feature not available")
```

### Rules
- Gate at entry points (route, nav item, settings tab), not deep in component tree
- Use env vars, not hardcoded booleans
- All new user-facing features get a flag, even "small" ones
- Preview deployments: flag `true`. Production: flag `false` until launch

---

# Supabase Migrations

**Always** use the Supabase CLI to create migration files:

```bash
npx supabase migration new <descriptive_migration_name>
```

### Naming Conventions (lowercase snake_case)
- `create_` — new table or major schema addition
- `add_` — adding columns, indexes, or policies
- `alter_` — modifying existing columns or constraints
- `fix_` — correcting a previous migration or patching data
- `drop_` — removing tables, columns, or policies
- `seed_` — inserting reference/seed data

**Never** manually create files in `supabase/migrations/` — let the CLI generate the timestamp.

---

# Vendor Documentation Guidelines

When working with code that integrates external services (`supabase/functions/**`, Stripe, Slack, Teams), search the web to verify current best practices for:
- Webhook signature verification (security-critical)
- API version-specific behavior
- Rate limiting or retry strategies
- Authentication flows

### Key Vendors
- **Supabase Edge Functions**: Deno runtime, `@supabase/supabase-js`, JWT via `auth.getUser(token)`
- **Stripe**: Verify `stripe-signature` header, use idempotency keys, handle out-of-order events
- **Slack**: Verify `x-slack-signature` header
- **Microsoft Teams**: Verify bot framework token, Adaptive Cards format
