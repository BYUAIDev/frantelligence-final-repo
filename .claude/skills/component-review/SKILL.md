---
name: component-review
description: Deep review of a React component for behavior, performance, and UX issues
---

# Component Deep Review

Review the selected React component for correctness, performance, and UX.

If uncertain about React 18 concurrent features, shadcn/ui component APIs, or Supabase Realtime subscription patterns, search the web for current documentation.

## 1. State & Data Flow

Identify all state:
- useState/useReducer variables
- Props received
- Context consumed (useAuth, etc.)
- Data from hooks (useQuery patterns)

Flag issues:
- Redundant state (derivable from other state/props)
- State duplication with child hooks
- Effects with unstable deps or missing cleanup
- Supabase subscriptions without cleanup

## 2. Rendering Performance

Analyze re-render triggers:
- Which state/prop changes cause full re-render?
- Are callbacks stable (useCallback) when passed to memoized children?
- Expensive operations in render body?
  - Large array `.map()` without proper keys
  - Inline object/function creation
  - Date parsing, regex, or heavy computation

Suggest memoization only where measurable benefit exists.

## 3. UX & Edge Cases

Check handling of:
- **Loading**: Shows skeleton/spinner during async ops?
- **Error**: Errors from Supabase/API displayed to user?
- **Empty**: What renders when data array is empty?
- **Auth expired**: What if user is null mid-action?
- **Role-based**: Features hidden/shown by role correctly?
- **Multi-unit**: Handles users with multiple franchisee_ids?
- **Streaming**: If chat, is abort cleanup handled?

## 4. Output

Provide:
1. Bullet list of issues with severity [HIGH/MED/LOW]
2. Updated component code with fixes
3. Comments only for non-obvious changes

$ARGUMENTS
