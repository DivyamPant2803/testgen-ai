#!/usr/bin/env node

/**
 * TestGen AI Init CLI
 * One-command setup with zero configuration
 */

import { ConfigManager } from '../config/config-manager.js';
import { FrameworkDetector } from '../detectors/framework-detector.js';
import { ProjectDetector } from '../detectors/project-detector.js';
import { IDEDetector } from '../utils/ide-detector.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

async function init() {
  const projectRoot = process.cwd();
  const configManager = new ConfigManager(projectRoot);
  const frameworkDetector = new FrameworkDetector(projectRoot);
  const projectDetector = new ProjectDetector(projectRoot);

  console.log('🚀 Initializing TestGen AI...\n');

  try {
    // Auto-detect project and framework
    console.log('📋 Detecting project configuration...');
    const detectedProject = await projectDetector.detect();
    const detectedFramework = await frameworkDetector.detect();
    
    console.log(`   ✓ Project type: ${detectedProject.projectType}`);
    console.log(`   ✓ Testing framework: ${detectedFramework.framework}`);
    
    if (detectedFramework.configFile) {
      console.log(`   ✓ Config file: ${detectedFramework.configFile}`);
    }
    if (detectedFramework.testDirectory) {
      console.log(`   ✓ Test directory: ${detectedFramework.testDirectory}`);
    }

    // Get config (uses smart defaults)
    const config = await configManager.getConfig();

    // Create test directories if they don't exist
    const testDir = config.testDirectory || detectedFramework.testDirectory || 
                   (detectedProject.projectType === 'dotnet' ? 'Tests' : '__tests__');

    console.log(`\n📁 Creating test directory...`);
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
      console.log(`   ✓ Created ${testDir}`);
    } else {
      console.log(`   ✓ Test directory already exists: ${testDir}`);
    }

    // Detect IDE
    const ideDetection = IDEDetector.detect();
    if (ideDetection.ide !== 'unknown') {
      console.log(`\n🔧 IDE Detected: ${ideDetection.ide}`);
      console.log('   ✓ Prompts work with all AI IDEs - no configuration needed!');
    }

    console.log('\n✅ Setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Use prompts in your AI IDE:');
    console.log('      "Using @testgen/ai prompts, generate unit tests for ComponentName"');
    console.log('   2. Or use the CLI to show prompts:');
    console.log('      npx testgen-generate jest-react');
    console.log('\n💡 Tip: No config file needed - everything works with smart defaults!');
  } catch (error: any) {
    console.error('❌ Error during initialization:', error.message);
    process.exit(1);
  }
}

init().catch(console.error);

