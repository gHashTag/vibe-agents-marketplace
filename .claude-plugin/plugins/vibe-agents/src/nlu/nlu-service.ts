/**
 * 🧠 Main NLU Service
 * AI-powered Natural Language Understanding
 */

import { openai } from '@/core/openai';
import { TaskEither, left, right, chain, map } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { Intent, Entity, NLUParsing, AgentRoute, NLUContext, NLUService } from './types';

const DEFAULT_MODEL = 'minimax/minimax-m2';
const DEFAULT_TEMPERATURE = 0.3;
const DEFAULT_MAX_TOKENS = 500;
const MIN_CONFIDENCE = 0.7;

export const createNLUService = (): NLUService => {
  return {
    parseText: (text: string, context?: NLUContext): TaskEither<Error, NLUParsing> => {
      return pipe(
        validateInput(text),
        chain((cleanText) => callMinimaxForNLU(cleanText, context)),
        map((response) => parseNLUResponse(response))
      );
    },

    recognizeIntent: (text: string): TaskEither<Error, Intent> => {
      return pipe(
        validateInput(text),
        chain((cleanText) => callMinimaxForIntent(cleanText)),
        map((response) => parseIntentResponse(response))
      );
    },

    extractEntities: (text: string, intent: Intent): TaskEither<Error, Entity[]> => {
      return pipe(
        validateInput(text),
        chain((cleanText) => callMinimaxForEntities(cleanText, intent)),
        map((response) => parseEntitiesResponse(response))
      );
    },

    routeToAgent: (intent: Intent, entities: Entity[]): TaskEither<Error, AgentRoute> => {
      return pipe(
        routeToAgentByIntent(intent),
        map((agentId) => ({
          agentId,
          intent: intent.name,
          entities,
          task: generateTaskFromNLU(intent, entities),
          confidence: intent.confidence,
          originalText: ''
        }))
      );
    },

    processNaturalLanguage: (text: string, context?: NLUContext): TaskEither<Error, AgentRoute> => {
      return pipe(
        validateInput(text),
        chain((cleanText) => parseText(text, context)),
        chain((parsing) => 
          pipe(
            routeToAgent(parsing.intent, parsing.entities),
            map((route) => ({
              ...route,
              originalText: text
            }))
          )
        ),
        map((route) => {
          if (route.confidence < MIN_CONFIDENCE) {
            throw new Error('Low confidence: ' + route.confidence);
          }
          return route;
        })
      );
    }
  };
};

const validateInput = (text: string): TaskEither<Error, string> => {
  if (!text || text.trim().length === 0) {
    return left(new Error('Empty input'));
  }
  
  const trimmed = text.trim();
  
  if (trimmed.length > 1000) {
    return left(new Error('Input too long (max 1000 chars)'));
  }
  
  if (trimmed.length < 3) {
    return left(new Error('Input too short (min 3 chars)'));
  }
  
  return right(trimmed);
};

const callMinimaxForNLU = (text: string, context?: NLUContext): TaskEither<Error, any> => {
  return TaskEither.tryCatch(
    async () => {
      const systemPrompt = createSystemPrompt(context);
      
      const response = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: DEFAULT_MAX_TOKENS,
        response_format: { type: 'json_object' } as any
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from AI');
      }

      return content;
    },
    (error) => new Error('NLU Error: ' + error)
  );
};

const callMinimaxForIntent = (text: string): TaskEither<Error, any> => {
  return TaskEither.tryCatch(
    async () => {
      const response = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'Определи намерение пользователя. Ответ JSON: {"intent": {"name": "...", "confidence": 0.95, "description": "..."}}'
          },
          { role: 'user', content: text }
        ],
        temperature: 0.2,
        max_tokens: 200,
        response_format: { type: 'json_object' } as any
      });

      return response.choices[0].message.content;
    },
    (error) => new Error('Intent Recognition Error: ' + error)
  );
};

const callMinimaxForEntities = (text: string, intent: Intent): TaskEither<Error, any> => {
  return TaskEither.tryCatch(
    async () => {
      const response = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'Извлеки сущности из текста. Типы: framework, language, taskType, technology. Ответ JSON: {"entities": [{"type": "...", "value": "...", "confidence": 0.9}]}'
          },
          { role: 'user', content: text }
        ],
        temperature: 0.2,
        max_tokens: 300,
        response_format: { type: 'json_object' } as any
      });

      return response.choices[0].message.content;
    },
    (error) => new Error('Entity Extraction Error: ' + error)
  );
};

const parseNLUResponse = (response: string): NLUParsing => {
  try {
    const parsed = JSON.parse(response);
    
    return {
      originalText: parsed.originalText || '',
      intent: {
        name: parsed.intent?.name || 'unknown',
        confidence: parsed.intent?.confidence || 0.5,
        description: parsed.intent?.description || ''
      },
      entities: parsed.entities || [],
      suggestedAction: parsed.suggestedAction || '',
      confidence: parsed.confidence || 0.5
    };
  } catch (error) {
    throw new Error('Failed to parse NLU response: ' + error);
  }
};

const parseIntentResponse = (response: string): Intent => {
  try {
    const parsed = JSON.parse(response);
    return {
      name: parsed.intent?.name || 'unknown',
      confidence: parsed.intent?.confidence || 0.5,
      description: parsed.intent?.description || ''
    };
  } catch (error) {
    throw new Error('Failed to parse intent response: ' + error);
  }
};

const parseEntitiesResponse = (response: string): Entity[] => {
  try {
    const parsed = JSON.parse(response);
    return parsed.entities || [];
  } catch (error) {
    throw new Error('Failed to parse entities response: ' + error);
  }
};

const createSystemPrompt = (context?: NLUContext): string => {
  let prompt = 'Ты NLU система для Vibe Agents.\n\nПроанализируй запрос и верни JSON с:\n1. intent - намерение пользователя\n2. entities - сущности (framework, language, etc)\n3. suggestedAction - рекомендуемое действие\n4. confidence - уверенность (0-1)\n\nДоступные intents:\n- create-component, create-application, develop-api\n- write-tests, security-audit, setup-ci\n- optimize-performance, refactor-code\n- debug-issue, generate-documentation';

  if (context?.projectContext) {
    prompt += '\n\nКонтекст проекта: ' + JSON.stringify(context.projectContext);
  }

  prompt += '\n\nОтвет в формате JSON согласно схеме.';

  return prompt;
};

const routeToAgentByIntent = (intent: Intent): TaskEither<Error, string> => {
  const routingMap: Record<string, string> = {
    'create-component': 'vibe-coder',
    'create-application': 'vibe-lead',
    'develop-api': 'vibe-coder',
    'write-tests': 'vibe-tester',
    'security-audit': 'vibe-security',
    'setup-ci': 'vibe-devops',
    'optimize-performance': 'vibe-diagnostics',
    'refactor-code': 'vibe-critic',
    'debug-issue': 'vibe-coder',
    'generate-documentation': 'vibe-knowledge-keeper'
  };

  const agentId = routingMap[intent.name];
  
  if (!agentId) {
    return left(new Error('No agent found for intent: ' + intent.name));
  }

  return right(agentId);
};

const generateTaskFromNLU = (intent: Intent, entities: Entity[]): any => {
  const framework = entities.find(e => e.type === 'framework')?.value;
  const language = entities.find(e => e.type === 'language')?.value;
  
  return {
    type: intent.name,
    framework: framework || 'React',
    language: language || 'TypeScript',
    entities,
    generatedFrom: 'NLU',
    originalIntent: intent.name
  };
};

export const nluService = createNLUService();
