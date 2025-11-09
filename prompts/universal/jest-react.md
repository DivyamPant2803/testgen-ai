# Jest + React Testing Library Unit Test Generation Prompt

**Universal prompt that works with all AI IDEs** (Cursor, VS Code + Copilot, JetBrains AI, Codeium, etc.)

## Usage

Simply reference this prompt in your AI assistant:

```
Using the Jest + React test generation prompt from @testgen/ai, generate unit tests for:
- Component: {COMPONENT_NAME}
- Source File: {SOURCE_FILE_PATH}
- Test scenarios: {YOUR_SCENARIOS}
```

## Prompt Template

You are an expert test automation engineer. Generate comprehensive unit tests for the following React component/function using Jest and React Testing Library.

**Source Information:**
- Source File: {SOURCE_FILE}
- Component Name: {COMPONENT_NAME}
- Function Name: {FUNCTION_NAME}
- Test Type: {TEST_TYPE}
- Description: {DESCRIPTION}

**Test Requirements:**
1. Use Jest as the testing framework
2. Use React Testing Library for component testing
3. Test all public methods, props, and user interactions
4. Test edge cases, error scenarios, and boundary conditions
5. Use proper mocking for dependencies and external modules
6. Follow React Testing Library best practices (queries, user events, etc.)
7. Ensure tests are maintainable and readable

**Test Scenarios:**
- Component renders correctly with required props
- Component handles user interactions (clicks, form inputs, etc.)
- Component displays data correctly
- Component handles error states and edge cases
- Component handles prop changes and state updates
- Component handles async operations correctly

**Jest and React Testing Library Best Practices:**
- Use `render` from `@testing-library/react` to render components
- Use queries like `getByRole`, `getByText`, `getByTestId` (prefer role-based queries)
- Use `fireEvent` or `userEvent` from `@testing-library/user-event` for interactions
- Use `screen` API for queries when component is already rendered
- Mock external dependencies using `jest.mock()`
- Use `describe` blocks to group related tests
- Use descriptive test names that explain what is being tested
- Test user behavior, not implementation details
- Use `waitFor` and `findBy` queries for async operations
- Clean up after tests using `afterEach` if needed

**Test Structure:**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Setup and teardown
  beforeEach(() => {
    // Setup code
  });

  afterEach(() => {
    // Cleanup code
  });

  test('should render correctly', () => {
    render(<ComponentName prop1="value" />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

**Code Generation Requirements:**
1. **File Location:** Save the test file in the appropriate test directory:
   - If tests are co-located: `ComponentName.test.tsx` next to source file
   - If tests are in separate directory: `__tests__/ComponentName.test.tsx` or `tests/ComponentName.test.tsx`

2. **Test Format:**
   - Use `describe` blocks to group related tests
   - Use descriptive `test` or `it` blocks
   - Include proper imports
   - Use TypeScript types
   - Follow the project's existing test patterns if available

3. **Key Requirements:**
   - Test component rendering
   - Test user interactions (clicks, form inputs, etc.)
   - Test props and state changes
   - Test error states and edge cases
   - Mock external dependencies properly
   - Use accessibility-friendly queries
   - Include proper assertions using `expect`

Generate comprehensive unit tests covering all scenarios, edge cases, and user interactions.

## Example Usage

```
Using the Jest + React test generation prompt from @testgen/ai, generate unit tests for:
- Component: UserProfile
- Source File: src/components/UserProfile.tsx
- Test scenarios: 
  - Component renders with user data
  - Component handles edit button click
  - Component displays error message on API failure
  - Component handles form submission
```

