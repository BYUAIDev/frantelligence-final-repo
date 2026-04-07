---
name: logic-bugs
description: Targeted scan for logic bugs and edge cases (ignore style)
---

# Logic Bug Scanner

Hunt for logic bugs in the selected code. Ignore style issues.

## Check For:

### 1. Boundary Errors
- Off-by-one in loops, slices, array access
- Empty array/string handling
- Pagination edge cases (first, last, single item)

### 2. Null/Undefined Handling
- Missing optional chaining (`user?.company_id`)
- Falsy confusion (`0`, `""`, `false` vs `null`/`undefined`)
- Default values masking real nulls

### 3. Async Pitfalls
- Race conditions between effects
- Stale closures in callbacks
- Missing `await` on async functions
- Unhandled promise rejections

### 4. State Transitions
- Can reach invalid state?
- State not updated in error paths?
- State not reset on re-mount?

### 5. Type Coercion
- `==` instead of `===`
- String/number confusion from API
- Date format mismatches

### 6. Domain-Specific
- Wrong role string in checks
- Visibility scope array logic
- Multi-unit franchisee edge cases
- Cost pool calculations

## For Each Bug:

1. **Quote** the exact code snippet
2. **Explain** why it's wrong/fragile
3. **Example** input that breaks it
4. **Fix** with minimal patch

$ARGUMENTS
