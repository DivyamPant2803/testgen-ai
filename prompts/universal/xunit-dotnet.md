# xUnit for .NET Unit Test Generation Prompt

**Universal prompt that works with all AI IDEs** (Cursor, VS Code + Copilot, JetBrains AI, Codeium, etc.)

## Usage

Simply reference this prompt in your AI assistant:

```
Using the xUnit .NET test generation prompt from @testgen/ai, generate unit tests for:
- Class: {CLASS_NAME}
- Source File: {SOURCE_FILE_PATH}
- Test scenarios: {YOUR_SCENARIOS}
```

## Prompt Template

You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET class/method using xUnit.

**Source Information:**
- Source File: {SOURCE_FILE}
- Class Name: {CLASS_NAME}
- Method Name: {METHOD_NAME}
- Description: {DESCRIPTION}

**Test Requirements:**
1. Use xUnit as the testing framework
2. Test all public methods
3. Test edge cases, error scenarios, and boundary conditions
4. Use Moq or NSubstitute for mocking dependencies
5. Follow xUnit and .NET testing best practices
6. Use appropriate xUnit attributes and assertions

**Test Scenarios:**
- Method returns expected result for valid inputs
- Method handles invalid inputs correctly
- Method handles edge cases and boundary conditions
- Method throws appropriate exceptions for error cases
- Method interacts with dependencies correctly
- Method handles async operations properly

**xUnit Best Practices:**
- Use `[Fact]` for parameterless tests
- Use `[Theory]` with `[InlineData]` for parameterized tests
- Use `IClassFixture<T>` for shared test context
- Use `IDisposable` for cleanup
- Mock dependencies using Moq: `var mock = new Mock<IDependency>()`
- Use `Assert` class methods: `Assert.Equal`, `Assert.NotNull`, etc.
- Use `Assert.Throws` for exception testing
- Organize tests with descriptive class and method names
- Follow Arrange-Act-Assert (AAA) pattern

**Test Structure:**
```csharp
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
            var input = "test input";
            var expected = "expected output";
            
            // Act
            var result = _sut.MethodName(input);
            
            // Assert
            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(1, 2, 3)]
        [InlineData(0, 0, 0)]
        [InlineData(-1, 1, 0)]
        public void MethodName_WithParameters_Should_ReturnExpected(int a, int b, int expected)
        {
            // Arrange
            // Act
            var result = _sut.MethodName(a, b);
            
            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void MethodName_WithInvalidInput_Should_ThrowException()
        {
            // Arrange
            var invalidInput = (string)null;
            
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => _sut.MethodName(invalidInput));
        }
    }
}
```

**Code Generation Requirements:**
1. **File Location:** Save in `Tests/` directory with matching namespace
   - File: `Tests/ClassNameTests.cs`
   - Namespace: Match source namespace with `.Tests` suffix

2. **Test Format:**
   - Use C# naming conventions
   - Include proper using statements
   - Follow Arrange-Act-Assert pattern
   - Use descriptive test method names: `MethodName_Scenario_ExpectedResult`

3. **Key Requirements:**
   - Test all public methods
   - Test error cases with `Assert.Throws`
   - Mock dependencies properly using Moq
   - Test edge cases and boundary conditions
   - Use appropriate assertions
   - Follow AAA pattern

**Moq Examples:**
```csharp
// Setup mock return value
_mockDependency.Setup(x => x.Method()).Returns("value");

// Setup mock to throw exception
_mockDependency.Setup(x => x.Method()).Throws<Exception>();

// Verify mock was called
_mockDependency.Verify(x => x.Method(), Times.Once);

// Setup async method
_mockDependency.Setup(x => x.MethodAsync()).ReturnsAsync("value");
```

Generate comprehensive unit tests following xUnit and .NET best practices.

## Example Usage

```
Using the xUnit .NET test generation prompt from @testgen/ai, generate unit tests for:
- Class: UserService
- Source File: Services/UserService.cs
- Test scenarios:
  - GetUserById returns user for valid ID
  - GetUserById throws NotFoundException for invalid ID
  - CreateUser creates user successfully
  - CreateUser throws ValidationException for invalid data
```

