/**
 * Test Generator Utility
 * Generates detailed unit test prompts for AI agents
 */

import type { UnitTestGenerationRequest, TestingFramework } from '../types.js';

export class TestGenerator {
  /**
   * Generate a unit test prompt based on framework and project type
   */
  generatePrompt(request: UnitTestGenerationRequest): string {
    switch (request.framework) {
      case 'jest':
        if (request.projectType === 'react') {
          return this.generateJestReactPrompt(request);
        }
        return this.generateJestNodePrompt(request);
      
      case 'vitest':
        return this.generateVitestPrompt(request);
      
      case 'xunit':
        return this.generateXUnitPrompt(request);
      
      case 'nunit':
        return this.generateNUnitPrompt(request);
      
      case 'mocha':
        return this.generateMochaPrompt(request);
      
      case 'jasmine':
        return this.generateJasminePrompt(request);
      
      default:
        return this.generateGenericPrompt(request);
    }
  }

  /**
   * Generate Jest + React Testing Library prompt
   */
  private generateJestReactPrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests for the following React component/function using Jest and React Testing Library.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
${request.componentName ? `- Component Name: ${request.componentName}` : ''}
${request.functionName ? `- Function Name: ${request.functionName}` : ''}
${request.className ? `- Class Name: ${request.className}` : ''}
- Test Type: ${request.testType || 'component'}
- Description: ${request.description}

**Test Requirements:**
1. Use Jest as the testing framework
2. Use React Testing Library for component testing
3. Test all public methods, props, and user interactions
4. Test edge cases, error scenarios, and boundary conditions
5. Use proper mocking for dependencies and external modules
6. Follow React Testing Library best practices (queries, user events, etc.)
7. Ensure tests are maintainable and readable

**Test Scenarios:**
${request.scenarios?.map(s => `   - ${s}`).join('\n') || this.getDefaultScenarios(request.testType)}

**Jest and React Testing Library Best Practices:**
- Use \`render\` from \`@testing-library/react\` to render components
- Use queries like \`getByRole\`, \`getByText\`, \`getByTestId\` (prefer role-based queries)
- Use \`fireEvent\` or \`userEvent\` from \`@testing-library/user-event\` for interactions
- Use \`screen\` API for queries when component is already rendered
- Mock external dependencies using \`jest.mock()\`
- Use \`describe\` blocks to group related tests
- Use descriptive test names that explain what is being tested
- Test user behavior, not implementation details
- Use \`waitFor\` and \`findBy\` queries for async operations
- Clean up after tests using \`afterEach\` if needed

**Test Structure:**
\`\`\`typescript
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
    // Test implementation
  });

  test('should handle user interactions', async () => {
    // Test implementation
  });
});
\`\`\`

**Code Generation Requirements:**
1. **File Location:** Save the test file in the appropriate test directory:
   - If tests are co-located: \`ComponentName.test.tsx\` next to source file
   - If tests are in separate directory: \`__tests__/ComponentName.test.tsx\` or \`tests/ComponentName.test.tsx\`

2. **Test Format:**
   - Use \`describe\` blocks to group related tests
   - Use descriptive \`test\` or \`it\` blocks
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
   - Include proper assertions using \`expect\`

4. **Example Test File:**
\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  test('should render with required props', () => {
    render(<ComponentName prop1="value" />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
\`\`\`

Generate comprehensive unit tests covering all scenarios, edge cases, and user interactions.`;
  }

  /**
   * Generate Jest for Node.js prompt
   */
  private generateJestNodePrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests for the following Node.js function/module using Jest.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
${request.functionName ? `- Function Name: ${request.functionName}` : ''}
${request.className ? `- Class Name: ${request.className}` : ''}
- Test Type: ${request.testType || 'function'}
- Description: ${request.description}

**Test Requirements:**
1. Use Jest as the testing framework
2. Test all public functions and methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use proper mocking for dependencies, modules, and external services
5. Test async functions properly with async/await
6. Follow Jest best practices

**Test Scenarios:**
${request.scenarios?.map(s => `   - ${s}`).join('\n') || this.getDefaultScenarios(request.testType)}

**Jest Best Practices:**
- Use \`describe\` blocks to group related tests
- Use \`test\` or \`it\` for individual test cases
- Use \`beforeEach\` and \`afterEach\` for setup and cleanup
- Mock modules using \`jest.mock()\`
- Mock functions using \`jest.fn()\`
- Use \`jest.spyOn()\` for partial mocking
- Test async code with \`async/await\` or \`done\` callback
- Use descriptive test names
- Use \`expect\` assertions with appropriate matchers

**Test Structure:**
\`\`\`typescript
import { functionName } from './module';

describe('functionName', () => {
  beforeEach(() => {
    // Setup
  });

  test('should handle normal case', () => {
    // Test implementation
  });

  test('should handle error case', () => {
    // Test implementation
  });
});
\`\`\`

**Code Generation Requirements:**
1. **File Location:** Save the test file:
   - Co-located: \`module.test.ts\` next to source file
   - Separate: \`__tests__/module.test.ts\` or \`tests/module.test.ts\`

2. **Test Format:**
   - Use TypeScript
   - Include proper imports
   - Follow project's existing patterns

3. **Key Requirements:**
   - Test function behavior
   - Test error handling
   - Test edge cases
   - Mock dependencies
   - Test async operations
   - Include proper assertions

Generate comprehensive unit tests covering all scenarios and edge cases.`;
  }

  /**
   * Generate xUnit for .NET prompt
   */
  private generateXUnitPrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET class/method using xUnit.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
${request.className ? `- Class Name: ${request.className}` : ''}
${request.functionName ? `- Method Name: ${request.functionName}` : ''}
- Description: ${request.description}

**Test Requirements:**
1. Use xUnit as the testing framework
2. Test all public methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use Moq or NSubstitute for mocking dependencies
5. Follow xUnit and .NET testing best practices
6. Use appropriate xUnit attributes and assertions

**Test Scenarios:**
${request.scenarios?.map(s => `   - ${s}`).join('\n') || this.getDefaultScenarios(request.testType)}

**xUnit Best Practices:**
- Use \`[Fact]\` for parameterless tests
- Use \`[Theory]\` with \`[InlineData]\` for parameterized tests
- Use \`IClassFixture<T>\` for shared test context
- Use \`IDisposable\` for cleanup
- Mock dependencies using Moq: \`var mock = new Mock<IDependency>()\`
- Use \`Assert\` class methods: \`Assert.Equal\`, \`Assert.NotNull\`, etc.
- Use \`Assert.Throws\` for exception testing
- Organize tests with descriptive class and method names
- Follow Arrange-Act-Assert (AAA) pattern

**Test Structure:**
\`\`\`csharp
using Xunit;
using Moq;

namespace Tests
{
    public class ClassNameTests
    {
        private readonly Mock<IDependency> _mockDependency;
        private readonly ClassName _sut; // System Under Test

        public ClassNameTests()
        {
            _mockDependency = new Mock<IDependency>();
            _sut = new ClassName(_mockDependency.Object);
        }

        [Fact]
        public void MethodName_Should_ExpectedBehavior()
        {
            // Arrange
            // Act
            // Assert
        }

        [Theory]
        [InlineData(1, 2, 3)]
        public void MethodName_WithParameters_Should_ReturnExpected(int a, int b, int expected)
        {
            // Arrange, Act, Assert
        }
    }
}
\`\`\`

**Code Generation Requirements:**
1. **File Location:** Save in \`Tests/\` directory with matching namespace
   - File: \`Tests/ClassNameTests.cs\`
   - Namespace: Match source namespace with \`.Tests\` suffix

2. **Test Format:**
   - Use C# naming conventions
   - Include proper using statements
   - Follow Arrange-Act-Assert pattern
   - Use descriptive test method names: \`MethodName_Scenario_ExpectedResult\`

3. **Key Requirements:**
   - Test all public methods
   - Test error cases with \`Assert.Throws\`
   - Mock dependencies properly
   - Test edge cases and boundary conditions
   - Use appropriate assertions

Generate comprehensive unit tests following xUnit and .NET best practices.`;
  }

  /**
   * Generate NUnit for .NET prompt
   */
  private generateNUnitPrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET class/method using NUnit.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
${request.className ? `- Class Name: ${request.className}` : ''}
${request.functionName ? `- Method Name: ${request.functionName}` : ''}
- Description: ${request.description}

**Test Requirements:**
1. Use NUnit as the testing framework
2. Test all public methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use Moq or NSubstitute for mocking
5. Follow NUnit and .NET testing best practices

**Test Scenarios:**
${request.scenarios?.map(s => `   - ${s}`).join('\n') || this.getDefaultScenarios(request.testType)}

**NUnit Best Practices:**
- Use \`[Test]\` attribute for test methods
- Use \`[TestCase]\` for parameterized tests
- Use \`[SetUp]\` and \`[TearDown]\` for test setup/cleanup
- Use \`[OneTimeSetUp]\` and \`[OneTimeTearDown]\` for class-level setup
- Use \`Assert\` class: \`Assert.AreEqual\`, \`Assert.IsNotNull\`, etc.
- Use \`Assert.Throws\` for exception testing
- Follow Arrange-Act-Assert pattern

**Test Structure:**
\`\`\`csharp
using NUnit.Framework;
using Moq;

namespace Tests
{
    [TestFixture]
    public class ClassNameTests
    {
        private Mock<IDependency> _mockDependency;
        private ClassName _sut;

        [SetUp]
        public void SetUp()
        {
            _mockDependency = new Mock<IDependency>();
            _sut = new ClassName(_mockDependency.Object);
        }

        [Test]
        public void MethodName_Should_ExpectedBehavior()
        {
            // Arrange, Act, Assert
        }
    }
}
\`\`\`

Generate comprehensive unit tests following NUnit best practices.`;
  }

  /**
   * Generate Vitest prompt
   */
  private generateVitestPrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests using Vitest.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
${request.functionName ? `- Function Name: ${request.functionName}` : ''}
- Description: ${request.description}

**Test Requirements:**
1. Use Vitest as the testing framework
2. Test all functions and methods
3. Test edge cases and error scenarios
4. Use proper mocking
5. Follow Vitest best practices

**Test Scenarios:**
${request.scenarios?.map(s => `   - ${s}`).join('\n') || this.getDefaultScenarios(request.testType)}

**Vitest Best Practices:**
- Use \`describe\` and \`it\` or \`test\`
- Use \`vi.mock()\` for mocking
- Use \`expect\` assertions
- Test async code with async/await

Generate comprehensive unit tests using Vitest.`;
  }

  /**
   * Generate Mocha prompt
   */
  private generateMochaPrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests using Mocha.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
- Description: ${request.description}

**Test Requirements:**
1. Use Mocha as the testing framework
2. Test all functions
3. Test edge cases
4. Use proper assertions (Chai recommended)

Generate comprehensive unit tests using Mocha.`;
  }

  /**
   * Generate Jasmine prompt
   */
  private generateJasminePrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests using Jasmine.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
- Description: ${request.description}

**Test Requirements:**
1. Use Jasmine as the testing framework
2. Test all functions
3. Test edge cases

Generate comprehensive unit tests using Jasmine.`;
  }

  /**
   * Generate generic prompt
   */
  private generateGenericPrompt(request: UnitTestGenerationRequest): string {
    return `You are an expert test automation engineer. Generate comprehensive unit tests.

**Source Information:**
${request.sourceFile ? `- Source File: ${request.sourceFile}` : ''}
- Description: ${request.description}

**Test Requirements:**
1. Test all public methods/functions
2. Test edge cases and error scenarios
3. Use proper mocking
4. Follow testing best practices

Generate comprehensive unit tests.`;
  }

  /**
   * Get default scenarios based on test type
   */
  private getDefaultScenarios(testType?: string): string {
    switch (testType) {
      case 'component':
        return `   - Component renders correctly
   - Component handles user interactions
   - Component displays data correctly
   - Component handles error states
   - Component handles edge cases`;
      
      case 'function':
        return `   - Function returns expected result
   - Function handles valid inputs
   - Function handles invalid inputs
   - Function handles edge cases
   - Function handles error scenarios`;
      
      case 'class':
        return `   - Class instantiates correctly
   - Methods work as expected
   - Methods handle edge cases
   - Methods handle errors
   - State management works correctly`;
      
      case 'hook':
        return `   - Hook returns expected values
   - Hook handles state changes
   - Hook handles dependencies
   - Hook handles cleanup
   - Hook handles edge cases`;
      
      default:
        return `   - Normal case
   - Edge cases
   - Error scenarios
   - Boundary conditions`;
    }
  }
}



