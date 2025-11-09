# Publish to NuGet Instructions

## Prerequisites

1. **NuGet Account**: Create an account at https://www.nuget.org if you don't have one
2. **API Key**: Get your API key from https://www.nuget.org/account/apikeys

## Step 1: Get NuGet API Key

1. Go to https://www.nuget.org/account/apikeys
2. Click "Create" to create a new API key
3. Set expiration (recommended: 1 year)
4. Select scope: "Select a package" or "All packages"
5. Copy the API key (you'll only see it once!)

## Step 2: Add API Key to NuGet

```bash
cd "/Users/divyampant/Documents/Projects/Playwright MCP/testgen-ai-package/dotnet-tool/TestGenAI.Tool"

# Add API key (replace YOUR_API_KEY with your actual key)
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
dotnet nuget update source nuget.org --username YOUR_NUGET_USERNAME --password YOUR_API_KEY --store-password-in-clear-text
```

Or set it as an environment variable:
```bash
export NUGET_API_KEY=your_api_key_here
```

## Step 3: Publish to NuGet

```bash
cd "/Users/divyampant/Documents/Projects/Playwright MCP/testgen-ai-package/dotnet-tool/TestGenAI.Tool"

# Publish using API key directly
dotnet nuget push bin/Release/TestGenAI.Tool.0.1.0.nupkg --api-key YOUR_API_KEY --source https://api.nuget.org/v3/index.json

# Or if you set NUGET_API_KEY environment variable
dotnet nuget push bin/Release/TestGenAI.Tool.0.1.0.nupkg --api-key $NUGET_API_KEY --source https://api.nuget.org/v3/index.json
```

## Step 4: Verify

After publishing, verify at:
- https://www.nuget.org/packages/TestGenAI.Tool

It may take a few minutes to appear.

## Installation

After publishing, users can install with:

```bash
# Global tool
dotnet tool install -g TestGenAI.Tool

# Local tool
dotnet tool install TestGenAI.Tool
```

## Usage

```bash
testgen init
testgen generate xunit
testgen generate nunit
testgen generate auto
```

## Troubleshooting

### "API key is invalid"
- Make sure you copied the full API key
- Check that the API key hasn't expired
- Verify you're using the correct username

### "Package already exists"
- Update the version in `TestGenAI.Tool.csproj`
- Rebuild and republish

### "Package validation failed"
- Check that all required metadata is in the .csproj file
- Ensure README.md is included in the package

