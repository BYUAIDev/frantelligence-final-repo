---
name: generate-tests
description: Generate focused regression tests for recent changes
---

# Regression Test Generator

Generate high-value tests for the selected code.

## Frontend Testing (Vitest + React Testing Library)

File naming: `{ComponentName}.test.tsx` or `{hookName}.test.ts`

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({ select: vi.fn(), insert: vi.fn() })),
    auth: { getSession: vi.fn() },
  },
}));
```

## Backend Testing (pytest + pytest-asyncio)

File naming: `test_{module}.py`

```python
import pytest
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
async def test_should_do_something():
    # Arrange
    mock_supabase = AsyncMock()

    # Act
    result = await my_function(mock_supabase)

    # Assert
    assert result.status == "success"
```

## Test Priorities

1. **Happy path**: Normal usage with valid data
2. **Edge cases**: Empty data, null user, expired session
3. **Error handling**: API failures, network errors
4. **Auth/permissions**: Different roles see different results
5. **Multi-tenant**: Data isolation between companies

## Test Structure

For each test:
- **Name**: `test_should_X_when_Y`
- **Setup**: Minimal fixtures
- **Action**: Single call under test
- **Assert**: Expected behavior
- **Cleanup**: Reset mocks if needed

## Output

5-10 high-value tests (not exhaustive coverage), runnable code.

$ARGUMENTS
