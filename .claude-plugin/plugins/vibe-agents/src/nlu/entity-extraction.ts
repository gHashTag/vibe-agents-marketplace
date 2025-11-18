/**
 * 🔍 Entity Extraction
 * Extract frameworks, languages, technologies from text
 */

import { TaskEither, right } from 'fp-ts/lib/TaskEither';
import { Entity } from './types';

const ENTITY_PATTERNS = {
  framework: [
    { name: 'React', patterns: ['react', 'реакт', 'реакт.js'] },
    { name: 'Vue', patterns: ['vue', 'вью', 'vue.js'] },
    { name: 'Angular', patterns: ['angular', 'ангуляр', 'angular.js'] },
    { name: 'Next.js', patterns: ['next.js', 'next', 'некст'] },
    { name: 'Nuxt', patterns: ['nuxt', 'нукс'] },
    { name: 'Svelte', patterns: ['svelte', 'свилт'] },
    { name: 'Remix', patterns: ['remix', 'ремикс'] },
    { name: 'Astro', patterns: ['astro', 'астро'] }
  ],
  language: [
    { name: 'TypeScript', patterns: ['typescript', 'ts', 'тайпскрипт'] },
    { name: 'JavaScript', patterns: ['javascript', 'js', 'джаваскрипт'] },
    { name: 'Python', patterns: ['python', 'питон'] },
    { name: 'Go', patterns: ['go', 'golang', 'го'] },
    { name: 'Rust', patterns: ['rust', 'раст'] },
    { name: 'Java', patterns: ['java', 'джава'] },
    { name: 'C#', patterns: ['c#', 'csharp', 'си шарп'] }
  ],
  taskType: [
    { name: 'component', patterns: ['компонент', 'component', 'кнопка', 'button', 'форма', 'form'] },
    { name: 'application', patterns: ['приложение', 'application', 'сайт', 'site'] },
    { name: 'api', patterns: ['api', 'сервер', 'server', 'endpoint'] },
    { name: 'tests', patterns: ['тесты', 'tests', 'testing'] },
    { name: 'hook', patterns: ['хук', 'hook', 'useEffect', 'useState'] }
  ],
  technology: [
    { name: 'Express', patterns: ['express', 'экспресс'] },
    { name: 'FastAPI', patterns: ['fastapi', 'fast api'] },
    { name: 'Django', patterns: ['django', 'джанго'] },
    { name: 'Spring', patterns: ['spring', 'спринг'] },
    { name: 'MongoDB', patterns: ['mongodb', 'монго'] },
    { name: 'PostgreSQL', patterns: ['postgresql', 'postgres'] },
    { name: 'MySQL', patterns: ['mysql', 'майскюэль'] },
    { name: 'Redis', patterns: ['redis', 'редис'] }
  ]
};

export const extractEntities = (text: string, intent?: any): Entity[] => {
  const lowerText = text.toLowerCase();
  const entities: Entity[] = [];

  // Extract entities for each type
  for (const [type, patterns] of Object.entries(ENTITY_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.patterns.some(p => lowerText.includes(p))) {
        entities.push({
          type,
          value: pattern.name,
          confidence: 0.9
        });
      }
    }
  }

  return entities;
};

export const extractFramework = (text: string): Entity | null => {
  const lowerText = text.toLowerCase();
  
  for (const framework of ENTITY_PATTERNS.framework) {
    if (framework.patterns.some(p => lowerText.includes(p))) {
      return {
        type: 'framework',
        value: framework.name,
        confidence: 0.95
      };
    }
  }
  
  return null;
};

export const extractLanguage = (text: string): Entity | null => {
  const lowerText = text.toLowerCase();
  
  for (const language of ENTITY_PATTERNS.language) {
    if (language.patterns.some(p => lowerText.includes(p))) {
      return {
        type: 'language',
        value: language.name,
        confidence: 0.95
      };
    }
  }
  
  return null;
};

export const getAllEntities = (): Record<string, any[]> => {
  return ENTITY_PATTERNS;
};

export const addCustomEntity = (type: string, name: string, patterns: string[]) => {
  if (!ENTITY_PATTERNS[type]) {
    ENTITY_PATTERNS[type] = [];
  }
  
  ENTITY_PATTERNS[type].push({ name, patterns });
};

export const removeEntity = (type: string, name: string) => {
  if (ENTITY_PATTERNS[type]) {
    ENTITY_PATTERNS[type] = ENTITY_PATTERNS[type].filter(e => e.name !== name);
  }
};

export const getEntitySuggestions = (text: string): Entity[] => {
  const lowerText = text.toLowerCase();
  const suggestions: Entity[] = [];

  for (const [type, patterns] of Object.entries(ENTITY_PATTERNS)) {
    for (const pattern of patterns) {
      const similarity = calculateSimilarity(lowerText, pattern.patterns);
      
      if (similarity > 0.5) {
        suggestions.push({
          type,
          value: pattern.name,
          confidence: similarity
        });
      }
    }
  }

  return suggestions.sort((a, b) => b.confidence - a.confidence);
};

const calculateSimilarity = (text: string, patterns: string[]): number => {
  let maxSimilarity = 0;
  
  for (const pattern of patterns) {
    const similarity = text.includes(pattern) ? 0.8 : 0;
    maxSimilarity = Math.max(maxSimilarity, similarity);
  }
  
  return maxSimilarity;
};
