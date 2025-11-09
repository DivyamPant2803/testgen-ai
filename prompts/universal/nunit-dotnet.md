# NUnit for .NET Unit Test Generation Prompt

**Universal prompt that works with all AI IDEs** (Cursor, VS Code + Copilot, JetBrains AI, Codeium, etc.)

## Usage

Simply reference this prompt in your AI assistant:

```
Using the NUnit .NET test generation prompt from @testgen/ai, generate unit tests for:
- Class: {CLASS_NAME}
- Source File: {SOURCE_FILE_PATH}
- Test scenarios: {YOUR_SCENARIOS}
```

## Prompt Template

You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET class/method using NUnit.

**Source Information:**
- Source File: {SOURCE_FILE}
- Class Name: {CLASS_NAME}
- Method Name: {METHOD_NAME}
- Description: {DESCRIPTION}

**Test Requirements:**
1. Use NUnit as the testing framework
2. Test all public methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use Moq or NSubstitute for mocking dependencies
5. Follow NUnit and .NET testing best practices

**Test Scenarios:**
- Method returns expected result for valid inputs
- Method handles invalid inputs correctly
- Method handles edge cases and boundary conditions
- Method throws appropriate exceptions for error cases
- Method interacts with dependencies correctly

**NUnit Best Practices:**
- Use `[Test]` attribute for test methods
- Use `[TestCase]` for parameterized tests
- Use `[SetUp]` and `[TearDown]` for test setup/cleanup
- Use `[OneTimeSetUp]` and `[OneTimeTearDown]` for class-level setup
- Use `Assert` class: `Assert.AreEqual`, `Assert.IsNotNull`, etc.
- Use `Assert.Throws` for exception testing
- Follow Arrange-Act-Assert pattern

**Test Structure:**
```csharp
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
            // Arrange
            var input = "test input";
            var expected = "expected output";
            
            // Act
            var result = _sut.MethodName(input);
            
            // Assert
            Assert.AreEqual(expected, result);
        }

        [TestCase(1, 2, 3)]
        [TestCase(0, 0, 0)]
        public void MethodName_WithParameters_Should_ReturnExpected(int a, int b, int expected)
        {
            // Arrange, Act, Assert
            var result = _sut.MethodName(a, b);
            Assert.AreEqual(expected, result);
        }
    }
}
```

**Code Generation Requirements:**
1. **File Location:** Save in `Tests/` directory
   - File: `Tests/ClassNameTests.cs`
   - Namespace: Match source namespace with `.Tests` suffix

2. **Test Format:**
   - Use C# naming conventions
   - Include proper using statements
   - Follow Arrange-Act-Assert pattern
   - Use descriptive test method names

3. **Key Requirements:**
   - Test all public methods
   - Test error cases with `Assert.Throws`
   - Mock dependencies properly
   - Test edge cases and boundary conditions

Generate comprehensive unit tests following NUnit best practices.

