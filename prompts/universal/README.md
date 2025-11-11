# Unit Test Generation Prompts

This directory contains detailed prompts for generating unit tests using various testing frameworks. These prompts are designed to work with AI coding assistants (like Cursor, VS Code + Copilot, JetBrains AI, etc.).

## Available Prompts

### Jest + React Testing Library
- **File:** `jest-react.md`
- **Purpose:** Generate unit tests for React components using Jest and React Testing Library
- **Use Case:** Testing React components, hooks, and UI interactions

### Jest for Node.js
- **File:** `jest-node.md`
- **Purpose:** Generate unit tests for Node.js functions and modules using Jest
- **Use Case:** Testing utility functions, services, and Node.js modules

### xUnit for .NET
- **File:** `xunit-dotnet.md`
- **Purpose:** Generate unit tests for .NET classes and methods using xUnit
- **Use Case:** Testing C# classes, services, and .NET applications

### NUnit for .NET
- **File:** `nunit-dotnet.md`
- **Purpose:** Generate unit tests for .NET using NUnit
- **Use Case:** Testing C# classes with NUnit framework

### Vitest
- **File:** `vitest.md`
- **Purpose:** Generate unit tests using Vitest
- **Use Case:** Testing JavaScript/TypeScript code with Vitest

## How to Use

1. **With Cursor/AI Agent:**
   - Reference the prompt in your request
   - Fill in the placeholders with your specific requirements
   - The AI will generate comprehensive unit tests

2. **Example Request:**
   ```
   Using the Jest + React test generation prompt from @testgen/ai, generate unit tests for:
   - Component: UserProfile
   - Source File: src/components/UserProfile.tsx
   - Test scenarios: Component renders, handles user interactions, displays errors
   ```

3. **The AI will:**
   - Analyze the source code
   - Generate comprehensive test cases
   - Follow framework-specific best practices
   - Create test files in the appropriate location
   - Include proper mocking and assertions

## Benefits

- **Framework-Specific:** Each prompt is tailored to the specific testing framework
- **Best Practices:** Includes framework-specific best practices and patterns
- **Comprehensive:** Covers normal cases, edge cases, and error scenarios
- **Maintainable:** Generates clean, readable, and maintainable test code
- **Zero Config:** Works with any AI IDE without additional setup

## Framework Detection

The `@testgen/ai` package automatically detects your testing framework. Use the appropriate prompt based on your detected framework, or specify the framework manually.

## Best Practices

1. Provide clear, specific requirements in your prompts
2. Include expected behaviors and edge cases
3. Mention any special considerations or dependencies
4. Specify the source file path for better context
5. The AI will automatically follow framework conventions and best practices



