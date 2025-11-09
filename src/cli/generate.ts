#!/usr/bin/env node

/**
 * TestGen AI Generate CLI
 * Generate test prompts for AI agents
 */

import { TestGenerator } from '../generators/test-generator.js';
import { ConfigManager } from '../config/config-manager.js';
import { FrameworkDetector } from '../detectors/framework-detector.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { TestingFramework } from '../types.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FRAMEWORK_MAP: Record<string, TestingFramework> = {
  'jest': 'jest',
  'jest-react': 'jest',
  'jest-node': 'jest',
  'vitest': 'vitest',
  'xunit': 'xunit',
  'nunit': 'nunit',
  'mocha': 'mocha',
  'jasmine': 'jasmine',
};

async function generate() {
  const args = process.argv.slice(2);
  const frameworkArg = args[0]?.toLowerCase();

  if (!frameworkArg) {
    console.log('Usage: testgen-generate <framework>');
    console.log('\nAvailable frameworks:');
    console.log('  jest-react    - Jest + React Testing Library');
    console.log('  jest-node     - Jest for Node.js');
    console.log('  vitest        - Vitest');
    console.log('  xunit         - xUnit for .NET');
    console.log('  nunit         - NUnit for .NET');
    console.log('  mocha         - Mocha');
    console.log('  jasmine       - Jasmine');
    console.log('\nExamples:');
    console.log('  testgen-generate jest-react');
    console.log('  testgen-generate xunit');
    console.log('\nOr use auto-detection:');
    console.log('  testgen-generate');
    process.exit(1);
  }

  try {
    const configManager = new ConfigManager();
    const config = await configManager.getConfig();
    
    // Auto-detect if no framework specified or 'auto'
    let framework: TestingFramework = 'unknown';
    let projectType = config.projectType || 'unknown';

    if (frameworkArg === 'auto' || !FRAMEWORK_MAP[frameworkArg]) {
      const frameworkDetector = new FrameworkDetector(process.cwd());
      const detected = await frameworkDetector.detect();
      framework = detected.framework;
      projectType = detected.projectType;
      
      if (framework === 'unknown') {
        console.log('❌ Could not auto-detect testing framework.');
        console.log('   Please specify a framework: testgen-generate <framework>');
        process.exit(1);
      }
      
      console.log(`📋 Auto-detected: ${framework} (${projectType})\n`);
    } else {
      framework = FRAMEWORK_MAP[frameworkArg];
    }

    // Determine prompt file name
    let promptFile = '';
    if (framework === 'jest') {
      promptFile = projectType === 'react' ? 'jest-react.md' : 'jest-node.md';
    } else {
      promptFile = `${framework}.md`;
      if (framework === 'xunit' || framework === 'nunit') {
        promptFile = `${framework}-dotnet.md`;
      }
    }

    // Read prompt template
    const packageRoot = join(__dirname, '../..');
    const promptPath = join(packageRoot, 'prompts/universal', promptFile);
    
    let promptTemplate = '';
    try {
      promptTemplate = readFileSync(promptPath, 'utf-8');
    } catch {
      // Fallback to generated prompt
      const generator = new TestGenerator();
      const request = {
        framework,
        projectType,
        description: 'Generate unit tests',
      };
      promptTemplate = generator.generatePrompt(request);
    }

    console.log('📝 Unit Test Generation Prompt:\n');
    console.log('─'.repeat(60));
    console.log(promptTemplate);
    console.log('─'.repeat(60));
    console.log('\n💡 Copy this prompt and use it with your AI assistant');
    console.log('   Example: "Using this prompt, generate unit tests for ComponentName"');
    console.log(`\n📚 Framework: ${framework} | Project: ${projectType}`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generate().catch(console.error);

