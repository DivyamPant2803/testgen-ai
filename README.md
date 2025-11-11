# @testgen/ai

**AI-powered unit test generator - zero config, works with all AI IDEs**

Generate comprehensive unit tests using AI assistants (Cursor, VS Code + Copilot, JetBrains, etc.) with framework-specific prompts for Jest, xUnit, NUnit, and more.

## Quick Start (2 Minutes)

```bash
# Install
npm install -D @testgen/ai

# Initialize (auto-detects everything)
npx testgen-init

# Done! Start using prompts in your AI IDE
```

## Features

- ✅ **Zero Configuration**: Works out of the box with smart defaults
- ✅ **Lightweight**: < 5MB package size
- ✅ **Universal**: Works with all AI IDEs (Cursor, VS Code + Copilot, JetBrains, Codeium, etc.)
- ✅ **Auto-Detection**: Automatically detects project type and testing framework
- ✅ **Multi-Framework**: Supports Jest, xUnit, NUnit, Vitest, Mocha, Jasmine
- ✅ **Detailed Prompts**: Framework-specific prompts with best practices and examples
- ✅ **Smart Defaults**: No config file needed unless you want customization

## Installation

```bash
npm install -D @testgen/ai
npx testgen-init
```

That's it! The package will:
- Auto-detect your project type (React, Node.js, .NET, etc.)
- Auto-detect your testing framework (Jest, xUnit, NUnit, etc.)
- Create test directories
- Configure everything automatically

## Usage with AI IDEs

### Universal Prompt Format

Works identically in **all AI IDEs** (Cursor, VS Code + Copilot, JetBrains AI, Codeium, etc.):

```
Using @testgen/ai prompts, generate unit tests for ComponentName
```

```
Using the Jest + React test generation prompt from @testgen/ai, generate unit tests for:
- Component: UserProfile
- Source File: src/components/UserProfile.tsx
- Test scenarios: Component renders, handles user interactions, displays errors
```

### Example: Jest + React Tests

```
Using @testgen/ai Jest + React prompt, generate unit tests for:
- Component: UserProfile
- Source File: src/components/UserProfile.tsx
- Test scenarios: 
  - Component renders with user data
  - Component handles edit button click
  - Component displays error message on API failure
```

### Example: Jest + Node.js Tests

```
Using @testgen/ai Jest Node.js prompt, generate unit tests for:
- Function: calculateTotal
- Source File: src/utils/calculator.ts
- Test scenarios:
  - Function calculates total correctly
  - Function handles empty array
  - Function throws error for invalid input
```

### Example: xUnit .NET Tests

```
Using @testgen/ai xUnit .NET prompt, generate unit tests for:
- Class: UserService
- Source File: Services/UserService.cs
- Test scenarios:
  - GetUserById returns user for valid ID
  - GetUserById throws NotFoundException for invalid ID
  - CreateUser creates user successfully
```

## CLI Commands

```bash
# Initialize (one-time setup)
npx testgen-init

# Generate test prompts
npx testgen-generate jest-react    # Show Jest + React prompt
npx testgen-generate jest-node     # Show Jest Node.js prompt
npx testgen-generate xunit         # Show xUnit .NET prompt
npx testgen-generate               # Auto-detect and show prompt

# Run tests (helper command)
npx testgen-run                    # Shows how to run tests
```

## Supported Frameworks

### Primary Support
- ✅ **Jest** - React components and Node.js functions
- ✅ **xUnit** - .NET classes and methods

### Extended Support
- ✅ **NUnit** - .NET testing
- ✅ **Vitest** - Fast Vite-native unit testing
- ✅ **Mocha** - Flexible JavaScript testing
- ✅ **Jasmine** - Behavior-driven JavaScript testing

## Project Detection

The package automatically detects:
- **Project Type**: React, Vue, Angular, .NET, Node.js
- **Testing Framework**: Jest, Vitest, xUnit, NUnit, Mocha, Jasmine
- **Test Directory**: `__tests__`, `tests`, `Tests`, etc.
- **IDE**: Cursor, VS Code, JetBrains, Codeium

## Configuration (Optional)

The package works with **zero configuration**. A config file is only needed for customization:

```javascript
// testgen.config.js (optional)
export default {
  projectType: 'react',
  testingFramework: 'jest',
  testDirectory: './__tests__',
  sourceDirectory: './src',
};
```

## IDE Support

### Cursor
- Auto-detected
- Prompts work immediately
- No configuration needed

### VS Code + GitHub Copilot
- Auto-detected
- Use prompts in Copilot Chat
- No configuration needed

### JetBrains AI
- Auto-detected
- Use prompts in AI Assistant
- No configuration needed

### Codeium
- Uses VS Code configuration
- Works with Codeium extension
- No configuration needed

### Any Other AI IDE
- Prompts work universally
- Copy prompts from `npx testgen-generate`
- No configuration needed

## Available Prompts

Prompts are located in `prompts/universal/`:
- `jest-react.md` - Jest + React Testing Library
- `jest-node.md` - Jest for Node.js
- `xunit-dotnet.md` - xUnit for .NET
- `nunit-dotnet.md` - NUnit for .NET
- `vitest.md` - Vitest
- `README.md` - Usage documentation

## Requirements

- Node.js 20+
- TypeScript (optional, peer dependency)
- Testing framework installed in your project (Jest, xUnit, etc.)

## How It Works

1. **Install** the package: `npm install -D @testgen/ai`
2. **Initialize**: `npx testgen-init` (auto-detects everything)
3. **Use Prompts**: Reference prompts in your AI IDE
4. **Generate Tests**: AI generates comprehensive unit tests
5. **Run Tests**: Use your framework's test runner

## Examples

### React Component Test

```typescript
// Generated by AI using @testgen/ai prompts
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  test('should render with user data', () => {
    render(<UserProfile user={{ name: 'John', email: 'john@example.com' }} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  test('should handle edit button click', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={{ name: 'John' }} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
```

### .NET xUnit Test

```csharp
// Generated by AI using @testgen/ai prompts
using Xunit;
using Moq;

namespace Tests
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _mockRepository;
        private readonly UserService _sut;

        public UserServiceTests()
        {
            _mockRepository = new Mock<IUserRepository>();
            _sut = new UserService(_mockRepository.Object);
        }

        [Fact]
        public void GetUserById_WithValidId_Should_ReturnUser()
        {
            // Arrange
            var userId = 1;
            var expectedUser = new User { Id = userId, Name = "John" };
            _mockRepository.Setup(x => x.GetById(userId)).Returns(expectedUser);
            
            // Act
            var result = _sut.GetUserById(userId);
            
            // Assert
            Assert.Equal(expectedUser, result);
        }
    }
}
```

## License

MIT

## Support

- **Documentation**: See `prompts/universal/README.md` for prompt usage
- **Issues**: [GitHub Issues](https://github.com/DivyamPant2803/testgen-ai/issues)
- **IDE Setup**: See USAGE.md for detailed usage guide



