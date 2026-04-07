---
name: schema-review
description: Review database migrations and schema for performance, security, and correctness
---

# Database Schema & Migration Review

Review the selected migration or schema for PostgreSQL best practices in Supabase.

If uncertain about PostgreSQL index types, Supabase RLS policy performance, partial/covering indexes, or query plan analysis, search the web for current guidance.

## Context (Frantelligence-Specific)

### Multi-Tenant Model
- `company_id`: Organization (franchisor brand) - PRIMARY tenant key
- `franchisee_id`: Location within company
- `user_id`: Individual user
- Most queries filter by `company_id` first

## 1. Migration Structure

- Wrapped in `BEGIN; ... COMMIT;` for atomic changes
- Uses `IF NOT EXISTS` for CREATE statements
- Uses `ON CONFLICT` for seed data
- Table names: `snake_case`, plural. Column names: `snake_case`
- Index names: `idx_{table}_{columns}` pattern

## 2. Table Design

- UUIDs for primary keys (not serial/bigint)
- `TIMESTAMPTZ` for all timestamps (not TIMESTAMP)
- `TEXT` preferred over VARCHAR
- `DECIMAL` for money (not FLOAT)
- Foreign keys with appropriate `ON DELETE` behavior
- NOT NULL on required columns

## 3. Indexing Strategy

- Foreign key columns indexed (PostgreSQL doesn't auto-index FKs)
- `company_id` indexed on all multi-tenant tables
- Composite index order: high-selectivity column first
- B-tree for equality/range, GIN for JSONB/arrays, HNSW for vectors
- Partial indexes for soft deletes: `WHERE deleted_at IS NULL`

## 4. RLS Policies

- RLS enabled on all tables with sensitive data
- SELECT, INSERT, UPDATE, DELETE policies as needed
- Policies filter by `company_id` from user profile
- Efficient subquery pattern:
```sql
USING (company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()))
```

## 5. Functions & Triggers

- `SECURITY DEFINER` only when necessary
- Functions marked `STABLE` or `IMMUTABLE` when applicable
- No SQL injection in dynamic queries
- Trigger functions are lightweight

## Output

1. **Schema Issues** with severity [CRITICAL/HIGH/MED/LOW]
2. **Missing Indexes** with rationale
3. **RLS Concerns** - policy gaps or performance issues
4. **Improved Migration** - corrected SQL with comments

$ARGUMENTS
