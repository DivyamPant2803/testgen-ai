/**
 * Project Detector
 * Auto-detects project type and structure
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import type { ProjectType } from '../types.js';

export interface DetectedProject {
  projectType: ProjectType;
  sourceDirectory?: string;
  testDirectory?: string;
  hasTypeScript: boolean;
  hasReact: boolean;
  hasVue: boolean;
  hasAngular: boolean;
}

export class ProjectDetector {
  constructor(private projectRoot: string) {}

  /**
   * Detect project configuration
   */
  async detect(): Promise<DetectedProject> {
    const packageJson = this.readPackageJson();
    const hasDotNet = this.detectDotNet();
    const hasTypeScript = this.detectTypeScript();
    
    const projectType = this.detectProjectType(packageJson, hasDotNet);
    const sourceDirectory = this.detectSourceDirectory(projectType);
    const testDirectory = this.detectTestDirectory(projectType);
    
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    const hasReact = !!(deps.react || deps['react-dom']);
    const hasVue = !!(deps.vue || deps['@vue/core']);
    const hasAngular = !!deps['@angular/core'];

    return {
      projectType,
      sourceDirectory,
      testDirectory,
      hasTypeScript,
      hasReact,
      hasVue,
      hasAngular,
    };
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

  private detectTypeScript(): boolean {
    return existsSync(join(this.projectRoot, 'tsconfig.json')) ||
           existsSync(join(this.projectRoot, 'tsconfig.app.json'));
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

  private detectSourceDirectory(projectType: ProjectType): string | undefined {
    const commonDirs = ['src', 'lib', 'app', 'source'];
    
    for (const dir of commonDirs) {
      if (existsSync(join(this.projectRoot, dir))) {
        return dir;
      }
    }

    // .NET projects
    if (projectType === 'dotnet') {
      return undefined; // .NET uses project structure
    }

    return 'src'; // Default
  }

  private detectTestDirectory(projectType: ProjectType): string | undefined {
    if (projectType === 'dotnet') {
      const testDirs = ['Tests', 'tests', 'Test', 'test'];
      for (const dir of testDirs) {
        if (existsSync(join(this.projectRoot, dir))) {
          return dir;
        }
      }
      return 'Tests'; // Default for .NET
    }

    // JavaScript/TypeScript projects
    const testDirs = ['__tests__', 'tests', 'test', 'spec', 'specs'];
    for (const dir of testDirs) {
      if (existsSync(join(this.projectRoot, dir))) {
        return dir;
      }
    }

    return undefined; // Tests might be co-located
  }
}



