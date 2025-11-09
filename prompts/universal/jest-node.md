# Jest for Node.js Unit Test Generation Prompt

**Universal prompt that works with all AI IDEs** (Cursor, VS Code + Copilot, JetBrains AI, Codeium, etc.)

## Usage

Simply reference this prompt in your AI assistant:

```
Using the Jest Node.js test generation prompt from @testgen/ai, generate unit tests for:
- Function: {FUNCTION_NAME}
- Source File: {SOURCE_FILE_PATH}
- Test scenarios: {YOUR_SCENARIOS}
```

## Prompt Template

You are an expert test automation engineer. Generate comprehensive unit tests for the following Node.js function/module using Jest.

**Source Information:**
- Source File: {SOURCE_FILE}
- Function Name: {FUNCTION_NAME}
- Class Name: {CLASS_NAME}
- Test Type: {TEST_TYPE}
- Description: {DESCRIPTION}

**Test Requirements:**
1. Use Jest as the testing framework
2. Test all public functions and methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use proper mocking for dependencies, modules, and external services
5. Test async functions properly with async/await
6. Follow Jest best practices

**Test Scenarios:**
- Function returns expected result for valid inputs
- Function handles invalid inputs gracefully
- Function handles edge cases and boundary conditions
- Function handles error scenarios correctly
- Function handles async operations properly
- Function mocks dependencies correctly

**Jest Best Practices:**
- Use `describe` blocks to group related tests
- Use `test` or `it` for individual test cases
- Use `beforeEach` and `afterEach` for setup and cleanup
- Mock modules using `jest.mock()`
- Mock functions using `jest.fn()`
- Use `jest.spyOn()` for partial mocking
- Test async code with `async/await` or `done` callback
- Use descriptive test names
- Use `expect` assertions with appropriate matchers

**Test Structure:**
```typescript
import { functionName } from './module';

describe('functionName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  test('should return expected result for valid input', () => {
    const result = functionName('valid input');
    expect(result).toBe('expected output');
  });

  test('should handle error case', () => {
    expect(() => functionName(null)).toThrow('Error message');
  });

  test('should handle async operation', async () => {
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
   - Include proper imports
   - Follow project's existing patterns
   - Use descriptive test names

3. **Key Requirements:**
   - Test function behavior
   - Test error handling
   - Test edge cases
   - Mock dependencies properly
   - Test async operations
   - Include proper assertions

**Mocking Examples:**
```typescript
// Mock a module
jest.mock('./dependency', () => ({
  dependencyFunction: jest.fn(),
}));

// Mock a function
const mockFunction = jest.fn();
mockFunction.mockReturnValue('mocked value');

// Spy on a method
const spy = jest.spyOn(object, 'method');
```

Generate comprehensive unit tests covering all scenarios and edge cases.

## Example Usage

```
Using the Jest Node.js test generation prompt from @testgen/ai, generate unit tests for:
- Function: calculateTotal
- Source File: src/utils/calculator.ts
- Test scenarios:
  - Function calculates total correctly
  - Function handles empty array
  - Function handles negative numbers
  - Function throws error for invalid input
```

