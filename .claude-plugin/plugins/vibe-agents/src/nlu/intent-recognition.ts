/**
 * 🎯 Intent Recognition
 * Pattern-based + AI-powered intent detection
 */

import { TaskEither, right, left } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { Intent } from './types';

const INTENT_PATTERNS = {
  'create-component': {
    keywords: [
      'создай', 'создать', 'сделай', 'сделать', 'напиши', 'написать',
      'компонент', 'component', 'кнопку', 'форму', 'карточку',
      'button', 'form', 'card', 'modal'
    ],
    confidence: 0.85
  },
  'create-application': {
    keywords: [
      'приложение', 'application', 'сайт', 'веб-сайт', 'web',
      'SPA', 'приложение на', 'сайт на', 'проект',
      'проект на', 'app'
    ],
    confidence: 0.9
  },
  'develop-api': {
    keywords: [
      'API', 'сервер', 'endpoint', 'бэкенд', 'backend', 'REST', 'GraphQL',
      'API на', 'сервер на', 'бэкенд на', 'сервер для', 'API для'
    ],
    confidence: 0.95
  },
  'write-tests': {
    keywords: [
      'тесты', 'tests', 'тестирование', 'testing', 'написать тесты',
      'unit тесты', 'integration тесты', 'e2e тесты',
      'Jest', 'Vitest', 'Cypress', 'тест на'
    ],
    confidence: 0.95
  },
  'security-audit': {
    keywords: [
      'аудит', 'audit', 'безопасность', 'security', 'проверь безопасность',
      'scan security', 'vulnerability', 'уязвимость'
    ],
    confidence: 0.98
  },
  'setup-ci': {
    keywords: [
      'CI', 'CD', 'pipeline', 'пайплайн', 'настроить CI', 'настроить CD',
      'GitHub Actions', 'GitLab CI', 'CI/CD', 'автоматизация'
    ],
    confidence: 0.9
  },
  'optimize-performance': {
    keywords: [
      'оптимизируй', 'оптимизация', 'optimize', 'performance', 'производительность',
      'ускорить', 'быстрее', 'lazy loading', 'мемоизация'
    ],
    confidence: 0.88
  },
  'refactor-code': {
    keywords: [
      'рефакторинг', 'refactor', 'улучши код', 'оптимизируй код',
      'чистый код', 'clean code', 'для код'
    ],
    confidence: 0.92
  },
  'debug-issue': {
    keywords: [
      'баг', 'bug', 'ошибка', 'error', 'issue', 'проблема', 'problem',
      'не работает', 'fix', 'исправь', 'отладка', 'debug'
    ],
    confidence: 0.94
  },
  'generate-documentation': {
    keywords: [
      'документация', 'documentation', 'docs', 'README', 'описание',
      'написать документацию', 'генерировать документацию'
    ],
    confidence: 0.9
  }
};

export const recognizeIntent = (text: string): TaskEither<Error, Intent> => {
  const lowerText = text.toLowerCase();
  
  // Try pattern-based recognition first
  for (const [intentName, pattern] of Object.entries(INTENT_PATTERNS)) {
    const hasKeyword = pattern.keywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      return right({
        name: intentName,
        confidence: pattern.confidence,
        description: `Intent detected via keyword matching: ${intentName}`
      });
    }
  }
  
  // Fallback to unknown
  return left(new Error('Unable to recognize intent: ' + text));
};

export const getAllIntents = (): string[] => {
  return Object.keys(INTENT_PATTERNS);
};

export const getIntentPattern = (intentName: string) => {
  return INTENT_PATTERNS[intentName];
};

export const addCustomIntent = (name: string, pattern: { keywords: string[], confidence: number }) => {
  INTENT_PATTERNS[name] = pattern;
};

export const removeIntent = (name: string) => {
  delete INTENT_PATTERNS[name];
};
