# 🌐 OpenRouter API - Единый Провайдер AI Моделей

## 🎯 Принцип

**Критически важно**: Все AI операции используют OpenRouter API, а не прямые API провайдеров!

---

## 📡 Конфигурация

### API Endpoint
```
https://openrouter.ai/api/v1
```

### Аутентификация
- **API ключ**: Хранится в Infisical как `OPENROUTER_API_KEY`
- **Загрузка**: При старте приложения через Infisical

### Заголовки запросов
```typescript
{
  'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': 'https://your-domain.com',
  'X-Title': 'Vibe Agents Platform'
}
```

---

## 💻 Инициализация клиента

### Lazy Initialization Pattern

```typescript
import OpenAI from "openai";

// Lazy initialization - клиент создается только при первом обращении
let _openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!_openai) {
    // API ключ загружается из Infisical
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error(
        "OPENROUTER_API_KEY is not set. Ensure Infisical loaded secrets."
      );
    }

    _openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      timeout: 60 * 1000,
      defaultHeaders: {
        "HTTP-Referer": process.env.WEBHOOK_URL || "https://vibee.dev",
        "X-Title": "Vibe Agents Platform",
      },
    });
  }
  return _openai;
}

// Proxy для lazy initialization
export const openai = new Proxy({} as OpenAI, {
  get(target, prop) {
    return (getOpenAIClient() as any)[prop];
  },
});
```

### Принципы

1. **Lazy Loading** - клиент создается только при первом использовании
2. **Infisical First** - позволяет Infisical загрузить секреты ПЕРЕД созданием клиента
3. **Single Instance** - один экземпляр клиента на все приложение
4. **Error Handling** - проверка наличия API ключа

---

## 🤖 Использование в агентах

### Базовый вызов
```typescript
import { openai } from "@/core/openai";

// Единый клиент OpenRouter
const response = await openai.chat.completions.create({
  model: "minimax/minimax-m2", // Топовая модель для кодирования
  messages: [
    { role: "system", content: "Ты Vibe Agent..." },
    { role: "user", content: taskPrompt },
  ],
  temperature: 0.7,
  max_tokens: 2000,
});

const result = response.choices[0].message.content;
```

### В агенте
```typescript
export const vibeCoderAgent = async (task: string) => {
  // TaskEither pattern для безопасной обработки
  return pipe(
    validateTask(task),
    chain((validated) => 
      TaskEither.tryCatch(
        () => openai.chat.completions.create({
          model: "minimax/minimax-m2",
          messages: [
            { role: "system", content: CODE_SYSTEM_PROMPT },
            { role: "user", content: validated },
          ],
        }),
        (error) => new Error(`AI Error: ${error}`)
      )
    ),
    map((response) => parseCode(response.choices[0].message.content)),
    getOrElse((error) => {
      console.error('Agent error:', error);
      return left(error);
    })
  )();
};
```

---

## 🎨 Модели

### Рекомендуемые модели

#### Для кодирования и агентов
```typescript
// Топовая модель для кодирования и агентов
model: "minimax/minimax-m2"  // MoE архитектура, 230B параметров
```

#### Для общих задач
```typescript
// Баланс скорости и качества
model: "anthropic/claude-3-5-sonnet-20241022"
```

#### Для быстрых задач
```typescript
// Быстрая и экономичная
model: "anthropic/claude-3-haiku-20240307"
```

---

## 🔧 Интеграция с Агентами

### VIBE-QUEEN (Координатор)
```typescript
// Мастер-агент использует OpenRouter для оркестрации
const coordination = await openai.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "system", content: QUEEN_SYSTEM_PROMPT },
    { role: "user", content: analyzeTask(userRequest) },
  ],
});
```

### VIBE-CODER (Программист)
```typescript
// Генерация кода через OpenRouter
const code = await openai.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "system", content: CODING_SYSTEM_PROMPT },
    { role: "user", content: generateCode(requirements) },
  ],
});
```

### VIBE-TESTER (Тестировщик)
```typescript
// TDD подход - тесты через OpenRouter
const tests = await openai.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "system", content: TESTING_SYSTEM_PROMPT },
    { role: "user", content: writeTests(specification) },
  ],
});
```

---

## ✅ Лучшие Практики

### 1. **Всегда используйте TaskEither**
```typescript
// ❌ ПЛОХО - прямое использование await
const response = await openai.chat.completions.create(...);

// ✅ ХОРОШО - TaskEither для обработки ошибок
return TaskEither.tryCatch(
  () => openai.chat.completions.create(...),
  (error) => new Error(`OpenRouter Error: ${error}`)
);
```

### 2. **Типизация ответов**
```typescript
interface AgentResponse {
  action: string;
  reasoning: string;
  result: any;
}

const response = await openai.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt },
  ],
  response_format: { type: "json_object" } as any,
});
```

### 3. **Обработка ошибок**
```typescript
const handleAIError = (error: any) => {
  if (error.status === 429) {
    return new Error("Rate limit exceeded");
  }
  if (error.status === 401) {
    return new Error("Invalid API key");
  }
  return new Error(`OpenRouter Error: ${error.message}`);
};
```

### 4. **Retry с экспоненциальным backoff**
```typescript
const retryWithBackoff = async (
  operation: () => Promise<any>,
  maxRetries: number = 3
) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
};
```

---

## 🔗 Связанные Паттерны

- **Functional Programming** - интеграция с TaskEither
- **Plugin Architecture** - единый интерфейс для всех AI операций
- **Agent Orchestration** - VIBE-QUEEN координирует через OpenRouter
- **Error Handling** - FP подход к обработке ошибок

---

**🌐 OpenRouter - Единый мир AI моделей! ✨**
