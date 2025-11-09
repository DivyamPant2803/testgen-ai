/**
 * Framework Detector
 * Auto-detects testing frameworks from project structure
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import type { TestingFramework, ProjectType, DetectedFramework } from '../types.js';

export class FrameworkDetector {
  constructor(private projectRoot: string) {}

  /**
   * Detect testing framework and project type
   */
  async detect(): Promise<DetectedFramework> {
    const packageJson = this.readPackageJson();
    const hasDotNet = this.detectDotNet();
    
    const projectType = this.detectProjectType(packageJson, hasDotNet);
    const framework = await this.detectTestingFramework(packageJson, hasDotNet, projectType);
    
    const result: DetectedFramework = {
      framework,
      projectType,
    };

    // Add framework-specific details
    if (framework === 'jest') {
      result.configFile = this.findJestConfig();
      result.testDirectory = this.findTestDirectory('jest');
      result.hasReactTestingLibrary = this.hasReactTestingLibrary(packageJson);
      result.hasTestingLibrary = this.hasTestingLibrary(packageJson);
      result.version = this.getJestVersion(packageJson);
    } else if (framework === 'vitest') {
      result.configFile = this.findVitestConfig();
      result.testDirectory = this.findTestDirectory('vitest');
      result.version = this.getVitestVersion(packageJson);
    } else if (framework === 'xunit') {
      result.testDirectory = this.findDotNetTestDirectory('xunit');
    } else if (framework === 'nunit') {
      result.testDirectory = this.findDotNetTestDirectory('nunit');
    }

    return result;
  }

  private readPackageJson(): any {
    const packageJsonPath = join(this.projectRoot, 'package.json');
    if (!existsSync(packageJsonPath)) {
      return {};
    }
    try {
      return JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    } catch {
      return {};
    }
  }

  private detectDotNet(): boolean {
    try {
      const files = readdirSync(this.projectRoot);
      return files.some(f => f.endsWith('.csproj'));
    } catch {
      return false;
    }
  }

  private detectProjectType(
    packageJson: any,
    hasDotNet: boolean
  ): ProjectType {
    if (hasDotNet) return 'dotnet';
    
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (deps.react || deps['react-dom']) return 'react';
    if (deps.vue || deps['@vue/core']) return 'vue';
    if (deps['@angular/core']) return 'angular';
    if (deps.express || deps.fastify || deps.koa) return 'nodejs';
    
    return 'unknown';
  }

  private async detectTestingFramework(
    packageJson: any,
    hasDotNet: boolean,
    projectType: ProjectType
  ): Promise<TestingFramework> {
    if (hasDotNet) {
      return this.detectDotNetFramework();
    }

    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Priority: Jest > Vitest > Mocha > Jasmine
    if (deps.jest || deps['@jest/globals']) {
      return 'jest';
    }
    
    if (deps.vitest || deps['vitest']) {
      return 'vitest';
    }
    
    if (deps.mocha) {
      return 'mocha';
    }
    
    if (deps.jasmine || deps['jasmine-core']) {
      return 'jasmine';
    }

    // Check for config files
    if (existsSync(join(this.projectRoot, 'jest.config.js')) ||
        existsSync(join(this.projectRoot, 'jest.config.ts')) ||
        existsSync(join(this.projectRoot, 'jest.config.json'))) {
      return 'jest';
    }

    if (existsSync(join(this.projectRoot, 'vitest.config.ts')) ||
        existsSync(join(this.projectRoot, 'vitest.config.js'))) {
      return 'vitest';
    }

    return 'unknown';
  }

  private detectDotNetFramework(): TestingFramework {
    // Check for .csproj files with testing framework references
    try {
      const files = readdirSync(this.projectRoot, { recursive: true });
      
      for (const file of files) {
        if (typeof file === 'string' && file.endsWith('.csproj')) {
          const content = readFileSync(join(this.projectRoot, file), 'utf-8');
          
          if (content.includes('xunit') || content.includes('Xunit')) {
            return 'xunit';
          }
          if (content.includes('nunit') || content.includes('NUnit')) {
            return 'nunit';
          }
          if (content.includes('MSTest') || content.includes('mstest')) {
            return 'mstest';
          }
        }
      }
    } catch {
      // Ignore errors
    }

    // Check for test project directories
    const testDirs = ['Tests', 'tests', 'Test', 'test'];
    for (const dir of testDirs) {
      const testDirPath = join(this.projectRoot, dir);
      if (existsSync(testDirPath)) {
        try {
          const files = readdirSync(testDirPath, { recursive: true });
          for (const file of files) {
            if (typeof file === 'string' && file.endsWith('.csproj')) {
              const content = readFileSync(join(testDirPath, file), 'utf-8');
              if (content.includes('xunit')) return 'xunit';
              if (content.includes('nunit')) return 'nunit';
              if (content.includes('MSTest')) return 'mstest';
            }
          }
        } catch {
          // Continue
        }
      }
    }

    // Default to xUnit for .NET if not detected
    return 'xunit';
  }

  private findJestConfig(): string | undefined {
    const configFiles = [
      'jest.config.js',
      'jest.config.ts',
      'jest.config.json',
      'jest.config.mjs',
    ];
    
    for (const file of configFiles) {
      if (existsSync(join(this.projectRoot, file))) {
        return file;
      }
    }
    
    return undefined;
  }

  private findVitestConfig(): string | undefined {
    const configFiles = [
      'vitest.config.ts',
      'vitest.config.js',
      'vite.config.ts',
    ];
    
    for (const file of configFiles) {
      if (existsSync(join(this.projectRoot, file))) {
        return file;
      }
    }
    
    return undefined;
  }

  private findTestDirectory(framework: 'jest' | 'vitest'): string | undefined {
    // Common test directory patterns
    const patterns = [
      '__tests__',
      'tests',
      'test',
      'spec',
      'specs',
    ];

    for (const pattern of patterns) {
      const testDir = join(this.projectRoot, pattern);
      if (existsSync(testDir)) {
        return pattern;
      }
    }

    // Check if tests are co-located (e.g., *.test.ts)
    return undefined;
  }

  private findDotNetTestDirectory(framework: 'xunit' | 'nunit'): string | undefined {
    const testDirs = ['Tests', 'tests', 'Test', 'test'];
    
    for (const dir of testDirs) {
      const testDirPath = join(this.projectRoot, dir);
      if (existsSync(testDirPath)) {
        return dir;
      }
    }
    
    return 'Tests'; // Default for .NET
  }

  private hasReactTestingLibrary(packageJson: any): boolean {
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    return !!(deps['@testing-library/react'] || deps['@testing-library/react-hooks']);
  }

  private hasTestingLibrary(packageJson: any): boolean {
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    return !!(deps['@testing-library/react'] || 
              deps['@testing-library/vue'] || 
              deps['@testing-library/angular'] ||
              deps['@testing-library/dom']);
  }

  private getJestVersion(packageJson: any): string | undefined {
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    return deps.jest || deps['@jest/globals'];
  }

  private getVitestVersion(packageJson: any): string | undefined {
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    return deps.vitest;
  }
}

