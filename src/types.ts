/**
 * Type definitions for @testgen/ai
 */

export type TestingFramework = 
  | 'jest' 
  | 'vitest' 
  | 'mocha' 
  | 'jasmine' 
  | 'xunit' 
  | 'nunit' 
  | 'mstest'
  | 'unknown';

export type ProjectType = 
  | 'react' 
  | 'vue' 
  | 'angular' 
  | 'dotnet' 
  | 'nodejs' 
  | 'unknown';

export interface UnitTestGenerationRequest {
  framework: TestingFramework;
  projectType: ProjectType;
  sourceFile?: string;
  componentName?: string;
  functionName?: string;
  className?: string;
  description: string;
  scenarios?: string[];
  testType?: 'component' | 'function' | 'class' | 'hook' | 'utility';
}

export interface DetectedFramework {
  framework: TestingFramework;
  projectType: ProjectType;
  configFile?: string;
  testDirectory?: string;
  hasReactTestingLibrary?: boolean;
  hasTestingLibrary?: boolean;
  version?: string;
}

export interface ProjectConfig {
  projectType?: ProjectType;
  testingFramework?: TestingFramework;
  testDirectory?: string;
  sourceDirectory?: string;
  frameworkConfig?: {
    jest?: {
      configFile?: string;
      testMatch?: string[];
    };
    vitest?: {
      configFile?: string;
    };
    xunit?: {
      namespace?: string;
      testDirectory?: string;
    };
    nunit?: {
      namespace?: string;
      testDirectory?: string;
    };
  };
}



