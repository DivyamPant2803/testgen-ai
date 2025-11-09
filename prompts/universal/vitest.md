# Vitest Unit Test Generation Prompt

**Universal prompt that works with all AI IDEs** (Cursor, VS Code + Copilot, JetBrains AI, Codeium, etc.)

## Usage

Simply reference this prompt in your AI assistant:

```
Using the Vitest test generation prompt from @testgen/ai, generate unit tests for:
- Function: {FUNCTION_NAME}
- Source File: {SOURCE_FILE_PATH}
- Test scenarios: {YOUR_SCENARIOS}
```

## Prompt Template

You are an expert test automation engineer. Generate comprehensive unit tests for the following code using Vitest.

**Source Information:**
- Source File: {SOURCE_FILE}
- Function Name: {FUNCTION_NAME}
- Class Name: {CLASS_NAME}
- Description: {DESCRIPTION}

**Test Requirements:**
1. Use Vitest as the testing framework
2. Test all public functions and methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use proper mocking with `vi.mock()` and `vi.fn()`
5. Follow Vitest best practices

**Test Scenarios:**
- Function returns expected result for valid inputs
- Function handles invalid inputs gracefully
- Function handles edge cases and boundary conditions
- Function handles error scenarios correctly
- Function handles async operations properly

**Vitest Best Practices:**
- Use `describe` blocks to group related tests
- Use `it` or `test` for individual test cases
- Use `beforeEach` and `afterEach` for setup and cleanup
- Mock modules using `vi.mock()`
- Mock functions using `vi.fn()`
- Use `vi.spyOn()` for partial mocking
- Test async code with `async/await`
- Use descriptive test names
- Use `expect` assertions with appropriate matchers

**Test Structure:**
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { functionName } from './module';

describe('functionName', () => {
  beforeEach(() => {
    // Setup
  });

  it('should return expected result for valid input', () => {
    const result = functionName('valid input');
    expect(result).toBe('expected output');
  });

  it('should handle error case', () => {
    expect(() => functionName(null)).toThrow('Error message');
  });

  it('should handle async operation', async () => {
    const result = await asyncFunction();
    expect(result).toBeDefined();
  });
});
```

**Code Generation Requirements:**
1. **File Location:** Save the test file:
   - Co-located: `module.test.ts` next to source file
   - Separate: `__tests__/module.test.ts` or `tests/module.test.ts`

2. **Test Format:**
   - Use TypeScript
   - Include proper imports from `vitest`
   - Follow project's existing patterns

3. **Key Requirements:**
   - Test function behavior
   - Test error handling
   - Test edge cases
   - Mock dependencies properly using `vi.mock()`
   - Test async operations
   - Include proper assertions

**Mocking Examples:**
```typescript
// Mock a module
vi.mock('./dependency', () => ({
  dependencyFunction: vi.fn(),
}));

// Mock a function
const mockFunction = vi.fn();
mockFunction.mockReturnValue('mocked value');

// Spy on a method
const spy = vi.spyOn(object, 'method');
```

Generate comprehensive unit tests covering all scenarios and edge cases.

## Example Usage

```
Using the Vitest test generation prompt from @testgen/ai, generate unit tests for:
- Function: calculateTotal
- Source File: src/utils/calculator.ts
- Test scenarios:
  - Function calculates total correctly
  - Function handles empty array
  - Function handles async operations
```

