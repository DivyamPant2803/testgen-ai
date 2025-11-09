#!/usr/bin/env node

/**
 * TestGen AI Run CLI
 * Run unit tests (wrapper for framework-specific test runners)
 */

async function run() {
  const args = process.argv.slice(2);
  
  console.log('🧪 Running unit tests...\n');

  // Try to detect and run tests with appropriate test runner
  try {
    // Check for package.json to determine test command
    const { readFileSync, existsSync } = await import('fs');
    const { join } = await import('path');
    
    const packageJsonPath = join(process.cwd(), 'package.json');
    
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      const scripts = packageJson.scripts || {};
      
      // Try common test commands
      const testCommands = ['test', 'test:unit', 'test:watch', 'test:coverage'];
      
      for (const cmd of testCommands) {
        if (scripts[cmd]) {
          console.log(`📋 Found test script: npm run ${cmd}`);
          console.log(`\n💡 Run tests using: npm run ${cmd}`);
          console.log('   Or use your framework-specific command:');
          console.log('   - Jest: npm test or npx jest');
          console.log('   - Vitest: npx vitest');
          console.log('   - .NET: dotnet test');
          return;
        }
      }
    }
    
    console.log('ℹ️  No test script found in package.json');
    console.log('\n💡 Run tests using your framework-specific command:');
    console.log('   - Jest: npm test or npx jest');
    console.log('   - Vitest: npx vitest');
    console.log('   - .NET: dotnet test');
    console.log('\n   Or add a test script to your package.json:');
    console.log('   "scripts": { "test": "jest" }');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

run().catch(console.error);

