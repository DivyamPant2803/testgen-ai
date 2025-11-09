/**
 * IDE Detector
 * Detects which IDE the user is using (for future enhancements)
 */

import { existsSync } from 'fs';
import { join } from 'path';

export type IDE = 'cursor' | 'vscode' | 'jetbrains' | 'codeium' | 'unknown';

export interface IDEDetectionResult {
  ide: IDE;
  needsConfig: boolean;
}

export class IDEDetector {
  /**
   * Detect which IDE is being used
   */
  static detect(): IDEDetectionResult {
    const cwd = process.cwd();

    // Check for Cursor
    if (existsSync(join(cwd, '.cursor'))) {
      return {
        ide: 'cursor',
        needsConfig: false, // Prompts work without config
      };
    }

    // Check for VS Code
    if (existsSync(join(cwd, '.vscode'))) {
      return {
        ide: 'vscode',
        needsConfig: false,
      };
    }

    // Check for JetBrains
    if (existsSync(join(cwd, '.idea'))) {
      return {
        ide: 'jetbrains',
        needsConfig: false,
      };
    }

    // Check for Codeium
    if (existsSync(join(cwd, '.codeium'))) {
      return {
        ide: 'codeium',
        needsConfig: false,
      };
    }

    return {
      ide: 'unknown',
      needsConfig: false,
    };
  }
}

