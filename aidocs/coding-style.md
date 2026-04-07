# Frantelligence Code Style Guide

## Table of Contents
- [General Principles](#general-principles)
- [TypeScript/React Standards](#typescriptreact-standards)
- [Python/FastAPI Standards](#pythonfastapi-standards)
- [Database Conventions](#database-conventions)
- [API Design](#api-design)
- [Testing Standards](#testing-standards)
- [Git Commit Guidelines](#git-commit-guidelines)
- [Documentation](#documentation)

---

## General Principles

### Code Philosophy

1. **Readability First:** Code is read more often than written
2. **Explicit Over Implicit:** Favor clarity over cleverness
3. **DRY (Don't Repeat Yourself):** Abstract common patterns
4. **KISS (Keep It Simple, Stupid):** Simplest solution that works
5. **YAGNI (You Aren't Gonna Need It):** Don't add functionality speculatively
6. **Separation of Concerns:** Each module/function should have a single responsibility

### Universal Standards

- **Line Length:** Max 100 characters (Prettier enforced)
- **Indentation:** 2 spaces (TypeScript/JSON/YAML), 4 spaces (Python)
- **Line Endings:** LF (Unix style)
- **Trailing Commas:** Always use (Prettier enforced)
- **Semicolons:** Required in TypeScript (Prettier enforced)
- **Quotes:** Single quotes for TypeScript, double quotes for Python

---

## TypeScript/React Standards

### File Naming

**Components:**
```
PascalCase.tsx
- Example: UserProfile.tsx, ChatMessage.tsx
```

**Hooks:**
```
camelCase.ts (prefix with "use")
- Example: useAuth.ts, useUserRole.ts
```

**Utilities:**
```
camelCase.ts
- Example: dateUtils.ts, apiHelpers.ts
```

**Types:**
```
camelCase.ts (often types/ directory)
- Example: roles.ts, chat.ts
```

### Component Structure

**Functional Components (Preferred):**
```typescript
import React, { useState, useEffect } from 'react';
import { ComponentProps } from './types';

interface MyComponentProps {
  title: string;
  onAction: () => void;
  children?: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onAction, 
  children 
}) => {
  // 1. Hooks (always at the top, never conditional)
  const [state, setState] = useState<string>('');
  const { user } = useAuth();

  // 2. Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // 3. Event handlers
  const handleClick = () => {
    onAction();
  };

  // 4. Render helpers (if complex)
  const renderContent = () => {
    return <div>{state}</div>;
  };

  // 5. Return JSX
  return (
    <div className="container">
      <h1>{title}</h1>
      {renderContent()}
      {children}
    </div>
  );
};
```

**Component Organization:**
```
src/components/
├── MyFeature/
│   ├── MyFeatureContainer.tsx    # Smart component (logic)
│   ├── MyFeatureView.tsx          # Presentation component
│   ├── MyFeatureCard.tsx          # Sub-component
│   ├── types.ts                   # Component-specific types
│   ├── hooks/
│   │   └── useMyFeature.ts        # Feature-specific hook
│   └── utils/
│       └── myFeatureHelpers.ts    # Helper functions
```

### Naming Conventions

**Variables & Functions:**
```typescript
// camelCase for variables and functions
const userName = 'John Doe';
const fetchUserData = async () => { /* ... */ };

// UPPER_SNAKE_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// PascalCase for components and classes
class UserService { }
const MyComponent = () => { };
```

**Boolean Variables:**
```typescript
// Prefix with "is", "has", "should", "can"
const isLoading = true;
const hasPermission = false;
const shouldRender = true;
const canEdit = false;
```

**Event Handlers:**
```typescript
// Prefix with "handle"
const handleClick = () => { };
const handleSubmit = () => { };
const handleChange = () => { };

// For prop callbacks, use "on"
interface Props {
  onClick: () => void;
  onSubmit: (data: FormData) => void;
  onChange: (value: string) => void;
}
```

### TypeScript Best Practices

**Always Define Types:**
```typescript
// ❌ Bad: Implicit any
const fetchData = (id) => { };

// ✅ Good: Explicit types
const fetchData = (id: string): Promise<User> => { };
```

**Use Interfaces for Objects:**
```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
  role: CanonicalRole;
}

// ✅ Also good for extending
interface AdminUser extends User {
  permissions: string[];
}
```

**Use Type for Unions/Aliases:**
```typescript
// ✅ Good
type Status = 'pending' | 'approved' | 'rejected';
type ID = string | number;
```

**Avoid `any`, Use `unknown` Instead:**
```typescript
// ❌ Bad
const parseData = (data: any) => { };

// ✅ Good
const parseData = (data: unknown) => {
  if (typeof data === 'object' && data !== null) {
    // Type guard narrows the type
    return data;
  }
};
```

**Optional Chaining & Nullish Coalescing:**
```typescript
// ✅ Good: Safe property access
const userName = user?.profile?.name ?? 'Guest';

// ❌ Bad: Verbose null checks
const userName = user && user.profile && user.profile.name 
  ? user.profile.name 
  : 'Guest';
```

### React Patterns

**Custom Hooks:**
```typescript
// Standard return shape
export const useMyFeature = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [dependencies]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
};
```

**Context Pattern:**
```typescript
// 1. Define context type
interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}

// 2. Create context
const MyContext = createContext<MyContextType | undefined>(undefined);

// 3. Provider component
export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [value, setValue] = useState('');
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// 4. Custom hook for consuming
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

**Error Boundaries (Class Component Exception):**
```typescript
// Note: Error boundaries must be class components in React
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

### Supabase Queries

**Standard Pattern:**
```typescript
// Always check for errors
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('company_id', companyId);

if (error) {
  console.error('Database error:', error);
  toast.error('Failed to load data');
  return;
}

// Use data
setData(data);
```

**With Type Safety:**
```typescript
// Use generated types
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

if (error) throw error;

const profile: Profile = data;
```

**Use `.maybeSingle()` for Optional Results:**
```typescript
// ❌ Bad: .single() throws if no row found
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

// ✅ Good: .maybeSingle() returns null if no row
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .maybeSingle();

if (error) throw error;
if (!data) {
  // Handle missing profile
}
```

### Styling (Tailwind CSS)

**Component Styling:**
```typescript
// ✅ Good: Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold">Title</h2>
</div>

// Use clsx for conditional classes
import { clsx } from 'clsx';

<button 
  className={clsx(
    'px-4 py-2 rounded',
    isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click Me
</button>
```

**Responsive Design:**
```typescript
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>
```

**Dark Mode:**
```typescript
// Use dark: prefix
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

---

## Python/FastAPI Standards

### File Naming

```
snake_case.py
- Example: chat_completion.py, file_upload.py
```

### Module Structure

```python
"""
Module docstring: Brief description of what this module does.

Detailed explanation if needed.
"""

# 1. Standard library imports
import logging
from typing import List, Optional
from datetime import datetime

# 2. Third-party imports
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

# 3. Local imports
from app.services import ChatService
from app.dependencies import get_current_user

# 4. Constants
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

# 5. Type definitions
logger = logging.getLogger(__name__)

# 6. Pydantic models
class MyRequest(BaseModel):
    field: str
    count: int = 0

# 7. Router/app setup
router = APIRouter()

# 8. Route handlers
@router.post("/endpoint")
async def my_endpoint(request: MyRequest):
    """Route handler docstring."""
    # Implementation
    pass
```

### Naming Conventions

**Functions & Variables:**
```python
# snake_case for functions and variables
def fetch_user_data(user_id: str) -> User:
    pass

user_name = "John Doe"

# UPPER_SNAKE_CASE for constants
MAX_CONNECTIONS = 100
API_VERSION = "v1"

# PascalCase for classes
class UserService:
    pass
```

**Private Members:**
```python
class MyClass:
    # Single underscore for "internal use" (not enforced)
    def _internal_method(self):
        pass
    
    # Double underscore for name mangling (rarely needed)
    def __private_method(self):
        pass
```

### Type Hints

**Always Use Type Hints:**
```python
# ❌ Bad: No type hints
def process_data(data, limit):
    pass

# ✅ Good: Full type hints
def process_data(data: List[Dict[str, Any]], limit: int) -> List[str]:
    pass
```

**Complex Types:**
```python
from typing import List, Dict, Optional, Union, Any

# Optional for nullable
def get_user(id: str) -> Optional[User]:
    pass

# Union for multiple types
def process(value: Union[str, int]) -> str:
    pass

# Generic types
from typing import TypeVar

T = TypeVar('T')

def first_element(items: List[T]) -> Optional[T]:
    return items[0] if items else None
```

### Async Patterns

**All I/O Should Be Async:**
```python
# ✅ Good: Async database query
async def fetch_users(company_id: str) -> List[User]:
    data = await supabase.table('users').select('*').eq('company_id', company_id).execute()
    return data.data

# ✅ Good: Async HTTP request
async def call_external_api(url: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()
```

**Dependency Injection:**
```python
from fastapi import Depends
from app.dependencies import SupabaseDep, get_current_user

@router.post("/items")
async def create_item(
    request: CreateItemRequest,
    supabase: SupabaseDep = Depends(),
    user: User = Depends(get_current_user)
):
    # supabase and user are injected
    pass
```

### Service Pattern

```python
from typing import Protocol

# 1. Define interface (Protocol)
class ChatServiceProtocol(Protocol):
    async def generate_response(self, prompt: str) -> str:
        ...

# 2. Implement service
class ChatService:
    def __init__(self, supabase_client):
        self._client = supabase_client
    
    async def generate_response(self, prompt: str) -> str:
        # Implementation
        response = await self._call_llm(prompt)
        await self._save_to_db(response)
        return response
    
    async def _call_llm(self, prompt: str) -> str:
        # Private helper
        pass
    
    async def _save_to_db(self, response: str):
        # Private helper
        pass

# 3. Dependency provider
def get_chat_service(supabase: SupabaseDep) -> ChatService:
    return ChatService(supabase)
```

### Error Handling

**Raise HTTPException:**
```python
from fastapi import HTTPException, status

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    user = await fetch_user(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_id} not found"
        )
    
    return user
```

**Custom Exception Classes:**
```python
class UsageExceededError(Exception):
    """Raised when user exceeds usage limits."""
    pass

class InsufficientPermissionsError(Exception):
    """Raised when user lacks required permissions."""
    pass
```

**Try-Except Pattern:**
```python
import logging

logger = logging.getLogger(__name__)

async def risky_operation():
    try:
        result = await external_api_call()
        return result
    except httpx.HTTPError as e:
        logger.error(f"HTTP error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=502, detail="External service unavailable")
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
```

### LangFuse Observability

```python
from langfuse.decorators import observe

@observe()  # Automatically traces function
async def generate_completion(prompt: str) -> str:
    """Generate LLM completion with automatic tracking."""
    response = await openrouter_client.chat(prompt)
    return response

# Custom metadata
@observe(name="custom_name", metadata={"version": "1.0"})
async def complex_operation():
    pass
```

### Pydantic Models

**Request/Response Models:**
```python
from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

class CreateUserRequest(BaseModel):
    """Request model for creating a user."""
    email: str = Field(..., description="User email address")
    full_name: str = Field(..., min_length=1, max_length=100)
    role: str = Field(default="employee")
    
    @validator('email')
    def validate_email(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email address')
        return v.lower()

class UserResponse(BaseModel):
    """Response model for user data."""
    id: str
    email: str
    full_name: str
    role: str
    created_at: datetime
    
    class Config:
        # Allow ORM models to be converted
        from_attributes = True
```

---

## Database Conventions

### Table Naming

```sql
-- snake_case, plural nouns
CREATE TABLE users (...);
CREATE TABLE chat_messages (...);
CREATE TABLE support_tickets (...);
```

### Column Naming

```sql
-- snake_case
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Foreign Keys

```sql
-- Suffix with _id for foreign keys
company_id UUID REFERENCES companies(id)
user_id UUID REFERENCES users(id)
franchisee_id UUID REFERENCES franchisees(id)
```

### Indexes

```sql
-- Prefix with idx_
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);

-- Unique indexes
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);
```

### RLS Policies

```sql
-- Descriptive names: table_action_condition
CREATE POLICY "users_select_own_company" ON users
  FOR SELECT
  USING (company_id IN (
    SELECT company_id FROM profiles WHERE id = auth.uid()
  ));

CREATE POLICY "documents_insert_authenticated" ON documents
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
```

### Migrations

**File Naming:**
```
YYYYMMDDHHMMSS_descriptive_name.sql
- Example: 20260207123045_add_training_visibility.sql
```

**Migration Structure:**
```sql
-- =============================================================================
-- Migration: Add training visibility controls
-- Description: Adds visibility column to trainings table for access control
-- =============================================================================

-- Add column
ALTER TABLE trainings 
ADD COLUMN IF NOT EXISTS visibility TEXT[] DEFAULT ARRAY['company'];

-- Create index
CREATE INDEX IF NOT EXISTS idx_trainings_visibility 
ON trainings USING GIN(visibility);

-- Update RLS policy
DROP POLICY IF EXISTS "trainings_select_policy" ON trainings;
CREATE POLICY "trainings_select_policy" ON trainings
  FOR SELECT
  USING (
    visibility && get_user_visibility_groups(auth.uid())
  );

-- Grant permissions
GRANT SELECT ON trainings TO authenticated;
```

### RPC Functions

```sql
-- snake_case naming
CREATE OR REPLACE FUNCTION get_user_profile(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER  -- Use sparingly, only when necessary
AS $$
BEGIN
  -- Validate permissions
  IF NOT can_access_user(auth.uid(), user_uuid) THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
  
  -- Return data
  RETURN QUERY
  SELECT u.id, u.full_name, u.email
  FROM users u
  WHERE u.id = user_uuid;
END;
$$;
```

---

## API Design

### REST Conventions

**Endpoint Structure:**
```
/api/v1/resource
/api/v1/resource/:id
/api/v1/resource/:id/subresource
```

**HTTP Methods:**
- `GET`: Retrieve resource(s)
- `POST`: Create new resource
- `PUT`: Replace entire resource
- `PATCH`: Update partial resource
- `DELETE`: Remove resource

**Examples:**
```
GET    /api/v1/users           # List users
GET    /api/v1/users/:id       # Get specific user
POST   /api/v1/users           # Create user
PUT    /api/v1/users/:id       # Replace user
PATCH  /api/v1/users/:id       # Update user fields
DELETE /api/v1/users/:id       # Delete user

GET    /api/v1/users/:id/sessions  # Get user's sessions
```

### Response Format

**Success Response:**
```json
{
  "data": { ... },
  "metadata": {
    "timestamp": "2026-02-06T12:00:00Z",
    "request_id": "req_abc123"
  }
}
```

**Error Response:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address",
    "details": {
      "field": "email",
      "constraint": "format"
    }
  }
}
```

**List Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

### Status Codes

**Common Codes:**
- `200 OK`: Successful GET, PUT, PATCH, DELETE
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE (no response body)
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing/invalid authentication
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Resource conflict (e.g., duplicate)
- `422 Unprocessable Entity`: Semantic validation error
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `502 Bad Gateway`: Upstream service error
- `503 Service Unavailable`: Temporary unavailability

---

## Testing Standards

### Test File Naming

**Frontend:**
```
ComponentName.test.tsx
hookName.test.ts
utilName.test.ts
```

**Backend:**
```
test_module_name.py
```

### Test Structure (Python)

```python
import pytest
from app.services import UserService

class TestUserService:
    """Tests for UserService."""
    
    @pytest.fixture
    def user_service(self, mock_supabase):
        """Fixture providing UserService instance."""
        return UserService(mock_supabase)
    
    def test_create_user_success(self, user_service):
        """Test successful user creation."""
        # Arrange
        user_data = {"email": "test@example.com", "name": "Test User"}
        
        # Act
        result = user_service.create_user(user_data)
        
        # Assert
        assert result.id is not None
        assert result.email == "test@example.com"
    
    def test_create_user_duplicate_email(self, user_service):
        """Test user creation with duplicate email fails."""
        # Arrange
        user_data = {"email": "existing@example.com", "name": "Test"}
        
        # Act & Assert
        with pytest.raises(DuplicateEmailError):
            user_service.create_user(user_data)
```

### Test Coverage Goals

- **Critical Paths:** 100% coverage
- **Business Logic:** 90%+ coverage
- **UI Components:** 70%+ coverage
- **Utilities:** 100% coverage

---

## Git Commit Guidelines

### Commit Message Format

```
type(scope): brief summary (50 chars or less)

Detailed explanation if needed. Wrap at 72 characters.

- Bullet points for multiple changes
- Each change on its own line

Fixes #123
Closes #456
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code restructuring (no feature/bug change)
- `perf`: Performance improvement
- `test`: Test additions or changes
- `chore`: Build process, tooling, dependencies

### Examples

```
feat(chat): add message editing capability

Users can now edit their own messages within 5 minutes of sending.
Edited messages show an "(edited)" indicator.

- Add edit button to message menu
- Implement edit modal with character limit
- Update RLS policy to allow edits

Closes #234

---

fix(auth): prevent race condition in token refresh

Token refresh was occasionally failing when multiple tabs
were open simultaneously.

- Add mutex lock around refresh logic
- Debounce refresh calls

Fixes #456

---

docs: update architecture documentation

- Add section on real-time features
- Document Supabase Realtime usage patterns
- Update deployment diagrams

---

chore(deps): upgrade React to 18.3.1

Security patch for CVE-2023-xxxxx
```

---

## Documentation

### Code Comments

**When to Comment:**
- **Complex Logic:** If it takes more than a few seconds to understand
- **Non-Obvious Decisions:** Explain "why", not "what"
- **Gotchas/Warnings:** Potential pitfalls or edge cases
- **TODO/FIXME:** Track technical debt

**Comment Style:**
```typescript
// ✅ Good: Explains WHY
// Using debounce to prevent excessive API calls during typing
const debouncedSearch = useDebounce(searchTerm, 300);

// ❌ Bad: States the obvious
// Set loading to true
setLoading(true);
```

### Function Documentation

**TypeScript (JSDoc):**
```typescript
/**
 * Fetches user profile data from the database.
 * 
 * @param userId - The unique identifier of the user
 * @param includePermissions - Whether to include permission data
 * @returns User profile object with optional permissions
 * @throws {NotFoundError} If user doesn't exist
 * 
 * @example
 * const profile = await getUserProfile('user-123', true);
 */
async function getUserProfile(
  userId: string,
  includePermissions = false
): Promise<UserProfile> {
  // Implementation
}
```

**Python (Docstring):**
```python
def calculate_usage_cost(
    token_count: int,
    model: str,
    user_tier: str
) -> float:
    """
    Calculate the cost of AI usage based on tokens and user tier.
    
    Args:
        token_count: Number of tokens consumed
        model: Name of the AI model used (e.g., "gpt-4")
        user_tier: User's subscription tier ("starter", "pro", "enterprise")
    
    Returns:
        Cost in USD as a float
    
    Raises:
        ValueError: If token_count is negative or model is invalid
    
    Example:
        >>> calculate_usage_cost(1000, "gpt-4", "pro")
        0.03
    """
    # Implementation
```

### README Files

**Project Root `README.md`:**
- Project overview
- Setup instructions
- Environment variables
- Development commands
- Deployment guide
- Contributing guidelines

**Component/Module `README.md`:**
- Module purpose
- Usage examples
- API documentation
- Architecture decisions

---

## Prettier Configuration

**`.prettierrc`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false
}
```

## ESLint Configuration

**`eslint.config.js` (Key Rules):**
```javascript
export default [
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
```

---

## Quick Reference Checklist

Before submitting a PR, verify:

- [ ] Code follows naming conventions
- [ ] TypeScript: All functions have type annotations
- [ ] Python: All functions have type hints
- [ ] Error handling is comprehensive
- [ ] No console.log/print statements (use logger)
- [ ] Comments explain "why", not "what"
- [ ] Tests added for new features
- [ ] Tests pass locally
- [ ] No linter warnings
- [ ] Prettier formatting applied
- [ ] Commit messages follow convention
- [ ] Documentation updated if needed
- [ ] No hardcoded secrets or credentials

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Maintained By:** Engineering Team
