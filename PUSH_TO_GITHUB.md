# Push to GitHub Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `testgen-ai`
3. Description: `AI-powered unit test generator - zero config, works with all AI IDEs. Supports Jest, xUnit, NUnit and more.`
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push to GitHub

After creating the repository, run these commands:

```bash
cd "/Users/divyampant/Documents/Projects/Playwright MCP/testgen-ai-package"

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/testgen-ai.git

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/testgen-ai.git
git push -u origin main
```

## Verify

After pushing, verify at: https://github.com/YOUR_USERNAME/testgen-ai

