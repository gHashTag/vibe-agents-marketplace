# 🧠 Natural Language Processing - AI-Powered NLU

## 🎯 Принцип

**Vibe Agents** использует AI-powered Natural Language Understanding для обработки естественного языка без команд.

**Было:** `/task создать React приложение`
**Стало:** `"создай React приложение"` ✅

---

## 🤖 Архитектура NLU

### Core Components

```typescript
interface NLUService {
  parseText: (text: string) => TaskEither<Error, NLUParsing>;
  extractIntent: (text: string) => TaskEither<Error, Intent>;
  extractEntities: (text: string, intent: Intent) => TaskEither<Error, Entity[]>;
  routeToAgent: (intent: Intent, entities: Entity[]) => TaskEither<Error, AgentRoute>;
}
```

### NLU Pipeline

```
User Input → Text Preprocessing → Intent Recognition → Entity Extraction → Agent Routing → Execution
     ↓              ↓                    ↓                  ↓               ↓
  Natural        Clean &             Determine         Find relevant    Select best
  Language       Normalize           user's goal       data for goal    agent for task
```

---

## 🔧 Реализация

### 1. OpenRouter Integration

```typescript
import { openai } from '@/core/openai';
import { TaskEither, left, right, chain, map } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';

interface Intent {
  name: string;
  confidence: number;
  description: string;
}

interface Entity {
  type: string;
  value: string;
  confidence: number;
}

interface NLUParsing {
  originalText: string;
  intent: Intent;
  entities: Entity[];
  suggestedAction: string;
}

export const nluService = {
  parseText: (text: string): TaskEither<Error, NLUParsing> => {
    return pipe(
      validateInput(text),
      chain((cleanText) => callMinimaxForNLU(cleanText)),
      map((response) => parseNLUResponse(response))
    );
  }
};

const callMinimaxForNLU = (text: string): TaskEither<Error, any> => {
  return TaskEither.tryCatch(
    async () => {
      const response = await openai.chat.completions.create({
        model: 'minimax/minimax-m2',
        messages: [
          {
            role: 'system',
            content: `Ты NLU (Natural Language Understanding) система для Vibe Agents.

Проанализируй пользовательский запрос и верни JSON с:
1. intent - намерение пользователя
2. entities - сущности (технологии, фреймворки, etc)
3. suggestedAction - рекомендуемое действие

Доступные intents:
- "create-component" - создание компонента
- "create-application" - создание приложения
- "develop-api" - разработка API
- "write-tests" - написание тестов
- "security-audit" - аудит безопасности
- "setup-ci" - настройка CI/CD
- "optimize-performance" - оптимизация производительности
- "refactor-code" - рефакторинг кода
- "debug-issue" - отладка проблемы
- "generate-documentation" - генерация документации

Пример ответа:
{
  "intent": {
    "name": "create-component",
    "confidence": 0.95,
    "description": "Пользователь хочет создать React компонент"
  },
  "entities": [
    {
      "type": "framework",
      "value": "React",
      "confidence": 0.98
    },
    {
      "type": "language",
      "value": "TypeScript",
      "confidence": 0.92
    }
  ],
  "suggestedAction": "Создать React + TypeScript компонент"
}`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: 'json_object' } as any
      });

      return response.choices[0].message.content;
    },
    (error) => new Error(`NLU Error: ${error}`)
  );
};
```

### 2. Intent Recognition

```typescript
const INTENT_PATTERNS = {
  'create-component': {
    keywords: ['создай', 'создать', 'компонент', 'component', 'сделай кнопку', 'сделай форму'],
    frameworks: ['React', 'Vue', 'Angular', 'Svelte'],
    confidence: 0.8
  },
  'create-application': {
    keywords: ['приложение', 'application', 'сайт', 'веб-сайт', 'SPA', 'приложение на'],
    frameworks: ['React', 'Next.js', 'Vue', 'Angular', 'Svelte'],
    confidence: 0.85
  },
  'develop-api': {
    keywords: ['API', 'сервер', 'endpoint', 'бэкенд', 'REST', 'GraphQL'],
    frameworks: ['Node.js', 'Express', 'FastAPI', 'Django', 'Spring'],
    confidence: 0.9
  },
  'write-tests': {
    keywords: ['тесты', 'tests', 'тестирование', 'написать тесты', 'unit tests'],
    frameworks: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'Mocha'],
    confidence: 0.95
  }
};

export const recognizeIntent = (text: string): TaskEither<Error, Intent> => {
  return pipe(
    TaskEither.fromNullable(extractIntentFromText(text)),
    mapOrElse(
      () => {
        // Fallback to AI-based recognition
        return pipe(
          callMinimaxForNLU(text),
          map((response) => JSON.parse(response).intent)
        );
      },
      (intent) => right(intent)
    )
  );
};

const extractIntentFromText = (text: string): Intent | null => {
  const lowerText = text.toLowerCase();
  
  for (const [intentName, pattern] of Object.entries(INTENT_PATTERNS)) {
    const hasKeyword = pattern.keywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      return {
        name: intentName,
        confidence: pattern.confidence,
        description: `Intent detected via keyword matching: ${intentName}`
      };
    }
  }
  
  return null;
};
```

### 3. Entity Extraction

```typescript
const ENTITY_PATTERNS = {
  framework: [
    { name: 'React', patterns: ['react', 'реакт'] },
    { name: 'Vue', patterns: ['vue', 'вью'] },
    { name: 'Angular', patterns: ['angular', 'ангуляр'] },
    { name: 'TypeScript', patterns: ['typescript', 'ts', 'тайпскрипт'] },
    { name: 'JavaScript', patterns: ['javascript', 'js', 'джаваскрипт'] },
    { name: 'Node.js', patterns: ['node', 'node.js', 'нода'] },
    { name: 'Express', patterns: ['express', 'экспресс'] }
  ],
  language: [
    { name: 'TypeScript', patterns: ['typescript', 'ts'] },
    { name: 'JavaScript', patterns: ['javascript', 'js'] },
    { name: 'Python', patterns: ['python', 'питон'] },
    { name: 'Go', patterns: ['go', 'golang'] }
  ],
  taskType: [
    { name: 'component', patterns: ['компонент', 'component', 'кнопка', 'форма'] },
    { name: 'application', patterns: ['приложение', 'application', 'сайт'] },
    { name: 'api', patterns: ['api', 'сервер', 'endpoint'] },
    { name: 'tests', patterns: ['тесты', 'tests', 'testing'] }
  ]
};

export const extractEntities = (
  text: string,
  intent: Intent
): TaskEither<Error, Entity[]> => {
  const lowerText = text.toLowerCase();
  const entities: Entity[] = [];
  
  // Extract frameworks
  for (const framework of ENTITY_PATTERNS.framework) {
    if (framework.patterns.some(pattern => lowerText.includes(pattern))) {
      entities.push({
        type: 'framework',
        value: framework.name,
        confidence: 0.9
      });
    }
  }
  
  // Extract languages
  for (const language of ENTITY_PATTERNS.language) {
    if (language.patterns.some(pattern => lowerText.includes(pattern))) {
      entities.push({
        type: 'language',
        value: language.name,
        confidence: 0.9
      });
    }
  }
  
  // Extract task types
  for (const taskType of ENTITY_PATTERNS.taskType) {
    if (taskType.patterns.some(pattern => lowerText.includes(pattern))) {
      entities.push({
        type: 'taskType',
        value: taskType.name,
        confidence: 0.8
      });
    }
  }
  
  return right(entities);
};
```

### 4. Agent Routing

```typescript
const AGENT_ROUTING_MAP = {
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

export const routeToAgent = (
  intent: Intent,
  entities: Entity[]
): TaskEither<Error, AgentRoute> => {
  const agentId = AGENT_ROUTING_MAP[intent.name];
  
  if (!agentId) {
    return left(new Error(`No agent found for intent: ${intent.name}`));
  }
  
  return right({
    agentId,
    intent: intent.name,
    entities,
    task: generateTaskFromNLU(intent, entities),
    confidence: intent.confidence
  });
};

const generateTaskFromNLU = (intent: Intent, entities: Entity[]): any => {
  const framework = entities.find(e => e.type === 'framework')?.value || 'React';
  const language = entities.find(e => e.type === 'language')?.value || 'TypeScript';
  
  return {
    type: intent.name,
    framework,
    language,
    entities,
    generatedFrom: 'NLU'
  };
};
```

---

## 🔄 Full NLU Pipeline

```typescript
export const processNaturalLanguage = (
  userInput: string
): TaskEither<Error, AgentRoute> => {
  return pipe(
    // Step 1: Validate input
    validateInput(userInput),
    
    // Step 2: Recognize intent
    chain((text) => recognizeIntent(text)),
    
    // Step 3: Extract entities
    chain((intent) => 
      pipe(
        extractEntities(userInput, intent),
        map((entities) => ({ intent, entities }))
      )
    ),
    
    // Step 4: Route to agent
    chain(({ intent, entities }) => routeToAgent(intent, entities)),
    
    // Step 5: Validate route
    map((route) => {
      console.log(`🎯 NLU Parsed: "${userInput}" → ${route.agentId}`);
      return route;
    })
  );
};

// Example usage
const executeFromNaturalLanguage = async (userInput: string) => {
  return pipe(
    processNaturalLanguage(userInput),
    chain((route) => executeAgentTask(route)),
    mapOrElse(
      (error) => {
        console.error('NLU Error:', error.message);
        return left(error);
      },
      (result) => right(result)
    )
  )();
};
```

---

## 🎨 Integration Examples

### Example 1: Create Component
```
User: "создай кнопку на React с TypeScript"

NLU Result:
{
  "intent": {
    "name": "create-component",
    "confidence": 0.95
  },
  "entities": [
    { "type": "framework", "value": "React", "confidence": 0.98 },
    { "type": "language", "value": "TypeScript", "confidence": 0.92 }
  ],
  "agentRoute": {
    "agentId": "vibe-coder",
    "task": {
      "type": "create-component",
      "framework": "React",
      "language": "TypeScript"
    }
  }
}
```

### Example 2: Write Tests
```
User: "напиши тесты для функции суммы"

NLU Result:
{
  "intent": {
    "name": "write-tests",
    "confidence": 0.98
  },
  "entities": [
    { "type": "taskType", "value": "function", "confidence": 0.85 }
  ],
  "agentRoute": {
    "agentId": "vibe-tester",
    "task": {
      "type": "write-tests",
      "target": "function"
    }
  }
}
```

### Example 3: Security Audit
```
User: "проведи аудит безопасности проекта"

NLU Result:
{
  "intent": {
    "name": "security-audit",
    "confidence": 0.97
  },
  "entities": [],
  "agentRoute": {
    "agentId": "vibe-security",
    "task": {
      "type": "security-audit",
      "scope": "full-project"
    }
  }
}
```

---

## ✅ Лучшие Практики

### 1. **Always Validate Input**
```typescript
const validateInput = (text: string): TaskEither<Error, string> => {
  if (!text || text.trim().length === 0) {
    return left(new Error('Empty input'));
  }
  
  if (text.length > 1000) {
    return left(new Error('Input too long (max 1000 chars)'));
  }
  
  return right(text.trim());
};
```

### 2. **Fallback to Default Intent**
```typescript
const handleUnknownIntent = (text: string): TaskEither<Error, AgentRoute> => {
  return pipe(
    callMinimaxForNLU(text),
    map((response) => {
      const parsed = JSON.parse(response);
      return {
        agentId: 'vibe-lead',
        intent: 'general-task',
        entities: parsed.entities || [],
        task: {
          type: 'general-task',
          originalText: text,
          aiInterpretation: parsed.suggestedAction
        }
      };
    })
  );
};
```

### 3. **Cache Frequently Used Patterns**
```typescript
const intentCache = new Map<string, AgentRoute>();

export const getCachedRoute = (text: string): AgentRoute | null => {
  const normalized = text.toLowerCase().trim();
  return intentCache.get(normaled) || null;
};

export const cacheRoute = (text: string, route: AgentRoute): void => {
  const normalized = text.toLowerCase().trim();
  intentCache.set(normalized, route);
};
```

### 4. **Confidence Threshold**
```typescript
const CONFIDENCE_THRESHOLD = 0.7;

export const isConfident = (route: AgentRoute): boolean => {
  return route.confidence >= CONFIDENCE_THRESHOLD;
};
```

---

## 🔗 Связанные Паттерны

- **OpenRouter Patterns** - AI integration для NLU
- **Agent Orchestration** - routing к агентам
- **Functional Programming** - TaskEither для обработки ошибок
- **TDD Patterns** - тестирование NLU компонентов

---

**🧠 NLU - Понимаем естественный язык! ✨**
