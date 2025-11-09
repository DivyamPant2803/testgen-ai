# TestGenAI.Tool

AI-powered unit test generator for .NET - zero config, works with all AI IDEs. Supports xUnit, NUnit, and more.

## Installation

Install as a .NET global tool:

```bash
dotnet tool install -g TestGenAI.Tool
```

Or install as a local tool:

```bash
dotnet tool install TestGenAI.Tool
```

## Usage

```bash
# Initialize
testgen init

# Generate prompts
testgen generate xunit
testgen generate nunit
testgen generate auto    # Auto-detect framework

# Show help
testgen help
```

## Features

- ✅ Auto-detects xUnit, NUnit, MSTest
- ✅ Generates framework-specific prompts
- ✅ Works with all AI IDEs (Cursor, VS Code, JetBrains)
- ✅ Zero configuration required

## For Full Features

For complete functionality including Jest, Vitest, and more, install the npm package:

```bash
npm install -D testgen-ai-cli
```

## Links

- **NuGet Package**: https://www.nuget.org/packages/TestGenAI.Tool
- **GitHub**: https://github.com/DivyamPant2803/testgen-ai
- **NPM Package**: https://www.npmjs.com/package/testgen-ai-cli

