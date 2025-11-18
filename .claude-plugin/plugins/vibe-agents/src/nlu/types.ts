/**
 * 🧠 NLU Type Definitions
 */

import { TaskEither } from 'fp-ts/lib/TaskEither';

export interface Intent {
  name: string;
  confidence: number;
  description: string;
  entities?: string[];
}

export interface Entity {
  type: string;
  value: string;
  confidence: number;
  start?: number;
  end?: number;
}

export interface NLUParsing {
  originalText: string;
  intent: Intent;
  entities: Entity[];
  suggestedAction: string;
  confidence: number;
}

export interface AgentRoute {
  agentId: string;
  intent: string;
  entities: Entity[];
  task: any;
  confidence: number;
  originalText: string;
}

export interface NLUOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  minConfidence?: number;
  enableCache?: boolean;
}

export interface NLUResult {
  success: boolean;
  route?: AgentRoute;
  error?: string;
  processingTime: number;
}

export interface NLUContext {
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  userPreferences?: {
    preferredFramework?: string;
    preferredLanguage?: string;
    codingStyle?: string;
  };
  projectContext?: {
    framework?: string;
    language?: string;
    hasTests?: boolean;
    hasCI?: boolean;
  };
}

export type NLUService = {
  parseText: (text: string, context?: NLUContext) => TaskEither<Error, NLUParsing>;
  recognizeIntent: (text: string) => TaskEither<Error, Intent>;
  extractEntities: (text: string, intent: Intent) => TaskEither<Error, Entity[]>;
  routeToAgent: (intent: Intent, entities: Entity[]) => TaskEither<Error, AgentRoute>;
  processNaturalLanguage: (text: string, context?: NLUContext) => TaskEither<Error, AgentRoute>;
};
