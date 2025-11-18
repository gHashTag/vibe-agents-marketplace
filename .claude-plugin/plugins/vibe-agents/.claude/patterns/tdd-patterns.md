# 🧪 TDD Паттерны - Test-Driven Development

## 🎯 Принцип TDD

**Критически важно**: ВСЕ ФУНКЦИИ ДОЛЖНЫ БЫТЬ ПОКРЫТЫ ТЕСТАМИ!

```
🔴 RED - красный тест (падает)
🟢 GREEN - зеленый тест (проходит)
♻️ REFACTOR - рефакторинг кода
```

---

## 📋 TDD Цикл

### Шаг 1: 🔴 RED - Напишите падающий тест
```typescript
// src/__tests__/vibe-coder.test.ts
import { describe, it, expect } from 'vitest';
import { vibeCoderAgent } from '../vibe-coder';

describe('vibeCoderAgent', () => {
  it('should generate React component from specification', async () => {
    const task = {
      type: 'create-component',
      framework: 'React',
      language: 'TypeScript',
      requirements: 'Button component with onClick handler'
    };
    
    const result = await vibeCoderAgent(task);
    
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.code).toContain('React.Component');
      expect(result.value.code).toContain('onClick');
    }
  });
  
  it('should return error for invalid task', async () => {
    const invalidTask = { invalid: 'data' };
    
    const result = await vibeCoderAgent(invalidTask);
    
    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value.message).toContain('Invalid task');
    }
  });
});
```

### Шаг 2: 🟢 GREEN - Напишите минимальный код для прохождения теста
```typescript
// src/vibe-coder.ts
import { TaskEither, left, right } from 'fp-ts/lib/TaskEither';

interface CoderTask {
  type: string;
  framework?: string;
  language?: string;
  requirements: string;
}

interface CoderResult {
  code: string;
  tests?: string;
}

export const vibeCoderAgent = (
  task: CoderTask
): TaskEither<Error, CoderResult> => {
  // Валидация
  if (!task || !task.requirements) {
    return left(new Error('Invalid task'));
  }
  
  // Минимальная реализация для прохождения теста
  return right({
    code: `React.Component with ${task.requirements}`
  });
};
```

### Шаг 3: ♻️ REFACTOR - Улучшите код, сохранив прохождение тестов
```typescript
// Рефакторинг с сохранением всех тестов
import { openai } from '@/core/openai';

export const vibeCoderAgent = (
  task: CoderTask
): TaskEither<Error, CoderResult> => {
  return pipe(
    validateTask(task),
    chain((validated) => generateCode(validated)),
    chain((code) => generateTests(code)),
    map(({ code, tests }) => ({ code, tests }))
  );
};
```

---

## 🏗️ Функциональные Тестовые Паттерны

### 1. **Property-Based Testing**
```typescript
import { property } from 'fast-check';

describe('vibeCoderAgent - Property-Based Tests', () => {
  it('should always return code for valid task', async () => {
    await property(
      nonEmptyString(),
      nonEmptyString(),
      async (framework, requirements) => {
        const task = {
          type: 'create-component',
          framework,
          language: 'TypeScript',
          requirements
        };
        
        const result = await vibeCoderAgent(task);
        
        expect(result.isRight()).toBe(true);
      }
    );
  });
});
```

### 2. **Pure Function Testing**
```typescript
// Тестирование чистых функций без побочных эффектов
import { validateTask } from '../utils/validation';

describe('validateTask', () => {
  it('should validate complete task', () => {
    const task = {
      type: 'create-component',
      framework: 'React',
      language: 'TypeScript',
      requirements: 'Button'
    };
    
    const result = validateTask(task);
    
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toEqual(task);
    }
  });
  
  it('should reject incomplete task', () => {
    const incompleteTask = { type: 'create-component' };
    
    const result = validateTask(incompleteTask);
    
    expect(result.isLeft()).toBe(true);
  });
});
```

### 3. **TaskEither Testing**
```typescript
describe('TaskEither Error Handling', () => {
  it('should handle errors gracefully', async () => {
    const failingOperation = TaskEither.tryCatch(
      async () => {
        throw new Error('Network error');
      },
      (error) => new Error(`Operation failed: ${error}`)
    );
    
    const result = await failingOperation();
    
    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value.message).toContain('Network error');
    }
  });
  
  it('should chain operations correctly', async () => {
    const operation = pipe(
      right(10),
      chain((value) => right(value * 2)),
      chain((value) => right(value + 5)),
      map((value) => value.toString())
    );
    
    const result = await operation();
    
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toBe('25'); // 10 * 2 + 5
    }
  });
});
```

---

## 🎭 Агентные TDD Паттерны

### 1. **Self-Testing Agent Pattern**
```typescript
// Агент пишет тесты для своего кода
export const vibeSelfTestingAgent = (
  specification: Specification
): TaskEither<Error, SelfTestedCode> => {
  return pipe(
    generateCode(specification),
    chain((code) => generateTests(code)),
    chain((codeAndTests) => runTests(codeAndTests)),
    chain((results) => 
      results.every(r => r.passed) 
        ? right(codeAndTests)
        : left(new Error('Tests failed'))
    )
  );
};
```

### 2. **Test-First Development**
```typescript
// Всегда пишем тест ПЕРЕД реализацией
describe('VIBE-TESTER Agent', () => {
  describe('TDD Workflow', () => {
    it('should create failing test first (RED)', async () => {
      // 1. Создаем спецификацию
      const spec = {
        functionName: 'calculateDiscount',
        inputs: ['price', 'discountPercent'],
        output: 'discountedPrice'
      };
      
      // 2. Генерируем падающий тест
      const test = await vibeTester.generateTest(spec);
      
      expect(test.initialState).toBe('FAILING');
      expect(test.expectedBehavior).toBeDefined();
    });
    
    it('should implement code to make test pass (GREEN)', async () => {
      // 3. Реализуем код
      const implementation = await vibeCoder.implement(spec);
      
      // 4. Проверяем что тест проходит
      const testResult = await vibeTester.runTest(implementation);
      
      expect(testResult.passed).toBe(true);
    });
    
    it('should refactor while keeping tests green (REFACTOR)', async () => {
      // 5. Рефакторим код
      const refactored = await vibeCoder.refactor(implementation);
      
      // 6. Проверяем что тесты все еще проходят
      const testResult = await vibeTester.runAllTests(refactored);
      
      expect(testResult.allPassed).toBe(true);
      expect(testResult.performance).toBeBetterThan(implementation.performance);
    });
  });
});
```

### 3. **Continuous Testing Pattern**
```typescript
// Непрерывное тестирование во время разработки
export const continuousTesting = (
  agent: Agent,
  task: Task
): TaskEither<Error, TestedResult> => {
  return pipe(
    agent.implement(task),
    chain((implementation) => agent.test(implementation)),
    chain((testResults) => {
      if (!testResults.allPassed) {
        return agent.fixTests(implementation, testResults);
      }
      return right({ implementation, testResults });
    }),
    chain((result) => {
      if (result.testResults.performance < threshold) {
        return agent.optimize(result.implementation);
      }
      return right(result);
    })
  );
};
```

---

## 🧩 Модульные Тестовые Паттерны

### 1. **Mock Patterns**
```typescript
// Функциональные моки без побочных эффектов
const createMockAgent = (responses: Record<string, any>): Agent => ({
  id: 'mock-agent',
  execute: (task: Task) => {
    const response = responses[task.type] || responses['default'];
    return right(response);
  }
});

describe('Agent Orchestration', () => {
  it('should delegate task to correct agent', async () => {
    const mockCoder = createMockAgent({
      'create-component': { code: 'MockComponent' }
    });
    
    const result = await orchestrateTask(
      { type: 'create-component', requirements: 'Button' },
      [mockCoder]
    );
    
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.code).toBe('MockComponent');
    }
  });
});
```

### 2. **Integration Testing**
```typescript
// Тестирование взаимодействия агентов
describe('Agent Integration Tests', () => {
  it('should flow task through pipeline', async () => {
    const pipeline = [
      VIBE_QUEEN,
      VIBE_SPEC,
      VIBE_TASKER,
      VIBE_CODER,
      VIBE_TESTER
    ];
    
    const initialRequest = 'Create a login form';
    
    const result = await pipeline.reduce(
      (acc, agent) => acc.chain((data) => agent.process(data)),
      right(initialRequest)
    );
    
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.code).toBeDefined();
      expect(result.value.tests).toBeDefined();
    }
  });
});
```

### 3. **E2E Testing (Rainbow Bridge)**
```typescript
// End-to-End тестирование через Telegram
describe('Rainbow Bridge E2E Tests', () => {
  it('should complete full workflow via Telegram', async () => {
    // Отправляем команду через Telegram
    await telegramBot.sendMessage('/task Create calculator component');
    
    // Ждем выполнения всеми агентами
    const result = await waitForCompletion({
      timeout: 30000,
      pollInterval: 1000
    });
    
    expect(result.status).toBe('COMPLETED');
    expect(result.files).toContain('Calculator.tsx');
    expect(result.tests).toContain('Calculator.test.tsx');
  });
});
```

---

## 📊 Coverage Patterns

### 1. **100% Coverage Requirement**
```typescript
// jest.config.ts
export default {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
```

### 2. **Coverage Reporting**
```typescript
// scripts/coverage-report.ts
import { runCoverage } from './test-runner';

export const generateCoverageReport = async (): Promise<CoverageReport> => {
  const coverage = await runCoverage({
    include: ['src/**/*.ts'],
    exclude: ['src/**/*.test.ts', 'src/**/*.d.ts']
  });
  
  return {
    summary: {
      lines: coverage.lines.pct,
      functions: coverage.functions.pct,
      branches: coverage.branches.pct,
      statements: coverage.statements.pct
    },
    report: coverage
  };
};
```

---

## 🔄 Continuous Integration Testing

### 1. **Pre-commit Hooks**
```bash
#!/bin/bash
# .husky/pre-commit

# 1. Run type check
npm run typecheck

# 2. Run all tests
npm test

# 3. Check coverage
npm run test:coverage

# 4. Run linting
npm run lint

# 5. Run Rainbow Bridge tests (critical)
python3 scripts/rainbow-bridge-runner.py --critical-only
```

### 2. **GitHub Actions**
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## ✅ Лучшие Практики TDD

### 1. **Тесты как Документация**
```typescript
describe('vibeCoderAgent', () => {
  // ✅ ХОРОШО - тест документирует поведение
  it('should generate TypeScript React component with props interface when task type is create-component', async () => {
    // Тест читается как спецификация
  });
  
  // ❌ ПЛОХО - тест не информативен
  it('should work correctly', async () => {
    // Что значит "work correctly"?
  });
});
```

### 2. **Именование тестов**
```typescript
// ✅ ХОРОШО - поведение + контекст + ожидание
it('should return left(Error) when task requirements are empty', async () => {});

// ✅ ХОРОШО - структурированное описание
describe('vibeCoderAgent', () => {
  describe('when given valid task', () => {
    it('should return right with generated code', async () => {});
  });
  
  describe('when given invalid task', () => {
    it('should return left with validation error', async () => {});
  });
});
```

### 3. **AAA Pattern**
```typescript
// Arrange, Act, Assert
it('should generate tests for React component', async () => {
  // Arrange
  const componentSpec = {
    name: 'Button',
    props: ['onClick', 'variant'],
    framework: 'React'
  };
  
  // Act
  const result = await vibeTester.generateTests(componentSpec);
  
  // Assert
  expect(result.isRight()).toBe(true);
  if (result.isRight()) {
    expect(result.value.testFile).toContain('describe');
    expect(result.value.testFile).toContain('Button');
  }
});
```

### 4. **Тесты должны быть быстрыми**
```typescript
// ✅ Быстрые тесты - без I/O операций
const result = pureFunction(input);

// ❌ Медленные тесты - с внешними зависимостями
const result = await fetch('https://api.example.com/data');
```

---

**🧪 TDD - Качество через Тестирование! ✨**
