---
name: pre-merge
description: Quick pre-merge checklist for staged changes
---

# Pre-Merge Checklist

Review the current staged/changed files against this checklist.

## Code Quality
- [ ] No `console.log` left (use structured logging)
- [ ] No commented-out code blocks
- [ ] No `any` types in TypeScript
- [ ] No TODO/FIXME without issue link

## Security
- [ ] No secrets in code
- [ ] User input validated
- [ ] Auth checked before sensitive ops
- [ ] Multi-tenant isolation maintained
- [ ] Visibility scopes correctly applied

## Performance
- [ ] No N+1 queries introduced
- [ ] No blocking in async code
- [ ] Large lists paginated/virtualized
- [ ] Proper cleanup in useEffect

## UX
- [ ] Loading states for async ops
- [ ] Error states with friendly messages
- [ ] Empty states for lists

## Compatibility
- [ ] No breaking API changes (or documented)
- [ ] DB migration included if schema changed
- [ ] New env vars documented

## Output

Either:
- "Ready to merge"
- "Needs fixes:" + list of issues

$ARGUMENTS
