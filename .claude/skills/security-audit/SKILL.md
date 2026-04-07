---
name: security-audit
description: Multi-tenant security audit for data isolation and access control
---

# Multi-Tenant Security Audit

Audit the selected code for multi-tenant security vulnerabilities.

If uncertain about Supabase RLS policies, JWT validation patterns, or specific vulnerability types, search the web for current security guidance.

## Data Model Reference

- `company_id`: Organization (franchisor brand)
- `franchisee_id`: Location within company
- `user_id`: Individual user
- Visibility scopes: `["global", "company", "franchisee", "owner"]`

## 1. Data Isolation

- Queries filter by appropriate tenant ID (company_id, franchisee_id)
- No cross-company data leakage possible
- RLS in DB is backup, not sole protection

## 2. Role-Based Access

- `franchisor_admin`: All data in their company
- `franchisor_user`: Read-only company-wide
- `franchisee_owner/manager`: Their location(s) only
- `employee`: Restricted access
- Multi-unit franchisees: All owned locations

## 3. Document Visibility

Check visibility scope logic:
- `global`: Everyone
- `company`: Same company_id
- `franchisee`: Same franchisee_id
- `owner`: Only uploader (user_id match)

Verify array intersection logic is correct (not equality).

## 4. API Endpoints

- User context validated before data return
- Cannot access other user's data via ID manipulation
- Bulk operations respect per-record permissions

## 5. Frontend Display

- UI doesn't reveal existence of inaccessible data
- Error messages don't leak sensitive info

## Output

Security issues with severity [CRITICAL/HIGH/MED/LOW] + fixes

$ARGUMENTS
