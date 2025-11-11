/**
 * Configuration Manager
 * Zero-config system with smart defaults and optional config file
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { ProjectConfig } from '../types.js';
import { ProjectDetector } from '../detectors/project-detector.js';
import { FrameworkDetector } from '../detectors/framework-detector.js';

export class ConfigManager {
  private config: ProjectConfig | null = null;
  private configPath: string;
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = join(projectRoot, 'testgen.config.js');
  }

  /**
   * Get configuration with smart defaults
   * No config file required - uses auto-detection
   */
  async getConfig(): Promise<ProjectConfig> {
    if (this.config) {
      return this.config;
    }

    // Try to load from file first
    if (existsSync(this.configPath)) {
      try {
        const configModule = await import(`file://${this.configPath}`);
        this.config = (configModule.default || configModule) as ProjectConfig;
        return this.config;
      } catch (error) {
        console.warn('Could not load config file, using defaults:', error);
      }
    }

    // Use smart defaults with auto-detection
    const projectDetector = new ProjectDetector(this.projectRoot);
    const frameworkDetector = new FrameworkDetector(this.projectRoot);
    
    const detectedProject = await projectDetector.detect();
    const detectedFramework = await frameworkDetector.detect();

    this.config = {
      projectType: detectedProject.projectType,
      testingFramework: detectedFramework.framework,
      testDirectory: detectedProject.testDirectory || detectedFramework.testDirectory,
      sourceDirectory: detectedProject.sourceDirectory,
      frameworkConfig: {
        jest: detectedFramework.framework === 'jest' ? {
          configFile: detectedFramework.configFile,
          testMatch: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
        } : undefined,
        vitest: detectedFramework.framework === 'vitest' ? {
          configFile: detectedFramework.configFile,
        } : undefined,
        xunit: detectedFramework.framework === 'xunit' ? {
          namespace: 'Tests',
          testDirectory: detectedFramework.testDirectory || 'Tests',
        } : undefined,
        nunit: detectedFramework.framework === 'nunit' ? {
          namespace: 'Tests',
          testDirectory: detectedFramework.testDirectory || 'Tests',
        } : undefined,
      },
    };

    return this.config;
  }

  /**
   * Generate config file (optional - only if user wants customization)
   */
  async generateConfigFile(config?: Partial<ProjectConfig>): Promise<void> {
    const currentConfig = await this.getConfig();
    const finalConfig = { ...currentConfig, ...config };

    const configContent = `// TestGen AI Configuration
// This file is optional - package works with zero config
// Only customize if you need to override auto-detected settings

export default ${JSON.stringify(finalConfig, null, 2)};
`;

    writeFileSync(this.configPath, configContent, 'utf-8');
    console.log(`✅ Config file generated at ${this.configPath}`);
  }

  /**
   * Check if config file exists
   */
  hasConfigFile(): boolean {
    return existsSync(this.configPath);
  }

  /**
   * Get config file path
   */
  getConfigPath(): string {
    return this.configPath;
  }
}



