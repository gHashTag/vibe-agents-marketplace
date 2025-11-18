# ✅ VIBE-TASKER (Функциональный Планировщик Задач)

**Мастер декомпозиции, топологической сортировки и автономного выполнения**

---

## 🎯 Архитектурная Роль

**VIBE-TASKER** - это **функциональный планировщик**, который преобразует архитектурные спецификации в план автономного выполнения, используя принципы **Dependency Injection**, **TaskEither композиции** и **топологической сортировки** для минимизации зависимостей и максимального параллелизма.

### Ключевые принципы работы:

1. **🔗 Декомпозиция на чистые функции** - каждая задача как самостоятельная единица
2. **📊 Топологическая сортировка** - автоматическое определение порядка выполнения
3. **⚡ Параллельное выполнение** - максимальное использование ресурсов
4. **🔄 Автономные циклы** - работа до успешного завершения всех тестов
5. **🎯 Self-Coding поддержка** - агенты генерируют и выполняют задачи самостоятельно

---

## 🧠 Функциональная Парадигма

### TaskEither композиция в планировании

```typescript
import { pipe, chain, map, TaskEither } from 'fp-ts/TaskEither'
import { Graph, topologicalSort, detectCycles } from '../functional/graph'

interface TaskPlan {
  tasks: Task[]
  dependencies: DependencyGraph
  executionOrder: ExecutionOrder
  parallelGroups: ParallelGroup[]
}

// Основной workflow планирования
const createTaskPlan = pipe(
  // 1. Анализ спецификации
  parseSpecification(spec),

  // 2. Функциональная декомпозиция
  chain(decomposeIntoTasks),

  // 3. Построение графа зависимостей
  chain(buildDependencyGraph),

  // 4. Проверка циклов
  chain(validateNoCircularDeps),

  // 5. Оптимизация выполнения
  map(optimizeExecutionPlan)
)

const decomposeIntoTasks = (
  spec: Specification
): TaskEither<Error, Task[]> => {
  return pipe(
    // Типы и валидация (основа)
    generateTypeTasks(spec.types),

    // Доменные модели
    chain(generateDomainTasks(spec.architecture.domain)),

    // API endpoints
    chain(generateApiTasks(spec.api)),

    // Репозитории
    chain(generateRepositoryTasks(spec.database)),

    // Интеграции
    chain(generateIntegrationTasks(spec.integrations)),

    // Сборка всех задач
    map(combineAllTasks)
  )
}
```

---

## 📋 Архитектура Задач

### **1. Базовый интерфейс задачи**

```typescript
interface Task {
  // Идентификация
  id: TaskId
  name: string
  type: TaskType

  // Функциональная природа
  isPure: boolean          // Чистая функция или есть эффекты
  sideEffects: Effect[]    // Типы побочных эффектов

  // Данные и зависимости
  input: ZodSchema         // Входные данные (валидируются через Zod)
  output: ZodSchema        // Выходные данные
  dependencies: TaskId[]   // ID задач, которые должны выполниться раньше

  // Выполнение
  priority: Priority       // Приоритет для планирования
  estimatedTime: Duration  // Оценка времени выполнения
  maxRetries: number       // Максимум попыток при ошибке

  // Связь с агентами
  responsible: AgentType   // Какой агент будет выполнять
  validator: AgentType     // Кто будет проверять результат

  // Self-* паттерны
  patterns: SelfPattern[]  // Self-Coding, Self-Testing, etc.
}

type TaskType =
  | 'type-definition'      // Zod схемы, TypeScript типы
  | 'domain-model'         // Entities, Value Objects
  | 'pure-function'        // Бизнес-логика без эффектов
  | 'repository'           // Database операции
  | 'api-endpoint'         // HTTP endpoints
  | 'integration'          // Внешние сервисы
  | 'test-suite'           // Тесты (TDD)
  | 'documentation'        // Документация
```

### **2. Граф зависимостей**

```typescript
interface DependencyGraph {
  // Топологический граф задач
  nodes: Map<TaskId, Task>
  edges: Map<TaskId, Set<TaskId>>  // taskId -> зависимости

  // Функциональные операции над графом
  operations: {
    // Топологическая сортировка
    sortTopologically: () => TaskEither<Error, TaskId[]>

    // Проверка циклов
    detectCycles: () => TaskEither<Error, Cycle[]>

    // Найти параллельные группы
    findParallelGroups: () => ParallelGroup[]

    // Критический путь
    findCriticalPath: () => TaskId[]

    // Минимальные зависимости
    findMinimalDependencies: (taskId: TaskId) => TaskId[]
  }
}

// Граф как функциональная структура
const createDependencyGraph = (tasks: Task[]): DependencyGraph => {
  const graph = tasks.reduce((acc, task) => {
    acc.nodes.set(task.id, task)
    acc.edges.set(task.id, new Set(task.dependencies))
    return acc
  }, {
    nodes: new Map<TaskId, Task>(),
    edges: new Map<TaskId, Set<TaskId>>()
  })

  return {
    ...graph,
    operations: {
      sortTopologically: () => topologicalSort(graph),
      detectCycles: () => detectCycles(graph),
      findParallelGroups: () => identifyParallelTasks(graph),
      findCriticalPath: () => calculateCriticalPath(graph),
      findMinimalDependencies: (taskId) => findMinDeps(graph, taskId)
    }
  }
}
```

### **3. Группировка для параллельного выполнения**

```typescript
interface ParallelGroup {
  id: GroupId
  name: string
  tasks: TaskId[]
  maxConcurrency: number    // Максимум одновременных задач
  resourceRequirements: ResourceSpec
  dependencies: GroupId[]   // Группы, которые должны завершиться раньше
}

interface ResourceSpec {
  cpu: number         // В процентах (0-100)
  memory: number      // В МБ
  network: boolean    // Нужно ли сетевое подключение
  database: boolean   // Нужен ли доступ к БД
}

// Функциональная группировка
const groupTasksForParallelExecution = (
  tasks: Task[],
  graph: DependencyGraph
): ParallelGroup[] => {
  return pipe(
    // Идентификация независимых задач
    findIndependentTasks(tasks, graph),

    // Группировка по типам ресурсов
    groupByResourceRequirements,

    // Определение оптимального параллелизма
    mapOptimizeConcurrency,

    // Создание групп
    createParallelGroups
  )
}
```

---

## 🔄 Паттерны Автономного Выполнения

### **1. Self-Coding Pattern в задачах**

```typescript
interface SelfCodingTask extends Task {
  patterns: ['self-coding']

  // Генерация кода
  generateCode: (
    specification: SubSpec,
    patterns: CodePattern[]
  ) => TaskEither<Error, GeneratedCode>

  // Валидация сгенерированного кода
  validateCode: (code: GeneratedCode) => TaskEither<Error, ValidationResult>

  // Автоматическое создание тестов
  createTests: (code: GeneratedCode) => TaskEither<Error, TestSuite>

  // Рефакторинг при необходимости
  refactorCode: (
    code: Code,
    feedback: ValidationFeedback
  ) => TaskEither<Error, RefactoredCode>
}

// Реализация self-coding задачи
const createTypeDefinitionTask = (spec: TypeSpec): SelfCodingTask => ({
  id: TaskId.generate(),
  name: `Define type: ${spec.name}`,
  type: 'type-definition',
  isPure: true,
  dependencies: [],

  patterns: ['self-coding'],

  generateCode: (specification) => pipe(
    // Анализ требований
    analyzeTypeRequirements(specification),

    // Генерация Zod схемы
    chain(generateZodSchema),

    // Генерация TypeScript типа
    chain(generateTypeScriptType),

    // Генерация валидаторов
    map(generateValidators),

    // Проверка корректности
    chain(validateGeneratedCode)
  ),

  validateCode: (code) => pipe(
    // Статический анализ
    analyzeTypes(code),

    // Проверка Zod схем
    validateZodSchemas(code),

    // Компиляция TypeScript
    validateTypescript(code),

    map(toValidationResult)
  ),

  createTests: (code) => pipe(
    // Property-based тесты для типов
    generatePropertyTests(code),

    // Валидационные тесты
    generateValidationTests(code),

    // Граничные случаи
    generateBoundaryTests(code),

    map(createTestSuite)
  )
})
```

### **2. Автономный цикл выполнения**

```typescript
interface AutonomousExecutionCycle {
  // Непрерывный цикл до успеха
  runUntilSuccess: (
    task: Task,
    context: ExecutionContext
  ) => TaskEither<Error, ExecutionResult>

  // Автоматическое исправление ошибок
  autoRecover: (
    error: Error,
    task: Task,
    attempts: number
  ) => TaskEither<Error, RecoveryAction>

  // Self-improvement цикл
  improveAfterFailure: (
    task: Task,
    failureAnalysis: FailureAnalysis
  ) => TaskEither<Error, ImprovedTask>
}

// Основной цикл автономного выполнения
const executeTaskAutonomously = (
  task: Task,
  context: ExecutionContext
): TaskEither<Error, ExecutionResult> => {
  return pipe(
    // Проверка готовности к выполнению
    validatePrerequisites(task, context),

    // Выполнение с автоповторами
    retryWithBackoff(task.execute, {
      maxRetries: task.maxRetries,
      backoff: exponentialBackoff,
      retryCondition: shouldRetry
    }),

    // Валидация результата
    chain(validateResult(task.validator)),

    // Если не прошло - self-improvement
    chain((result) => {
      if (result.success) {
        return right(result)
      }

      return pipe(
        analyzeFailure(result.error, task),
        chain(improveTaskStrategy),
        chain((improvedTask) =>
          executeTaskAutonomously(improvedTask, context)
        )
      )
    })
  )
}

// Автоматическое улучшение после ошибки
const improveTaskStrategy = (
  analysis: FailureAnalysis
): TaskEither<Error, ImprovedTask> => {
  return pipe(
    // Анализ причины ошибки
    categorizeError(analysis.error),

    // Выбор стратегии улучшения
    selectImprovementStrategy,

    // Генерация улучшенной задачи
    generateImprovedTask,

    // Проверка улучшенной версии
    validateImprovedTask
  )
}
```

---

## 📊 Стратегии Планирования

### **1. Приоритизация задач**

```typescript
interface PrioritizationStrategy {
  // Вес для каждого типа задачи
  typeWeights: Record<TaskType, number>

  // Факторы приоритета
  factors: {
    dependencyCount: number        // Больше зависимостей = выше приоритет
    dependentsCount: number        // Больше зависимых = выше приоритет
    estimatedTime: Duration        // Короткие задачи = выше приоритет
    resourceAvailability: number   // Ресурсы доступны = выше приоритет
    criticalPath: boolean          // На критическом пути = выше приоритет
  }

  // Расчет итогового приоритета
  calculatePriority: (task: Task, context: PlanningContext) => Priority
}

// Приоритизация с учетом зависимостей
const prioritizeTasks = (
  tasks: Task[],
  graph: DependencyGraph,
  strategy: PrioritizationStrategy
): PrioritizedTask[] => {
  return tasks.map((task) => {
    const metrics = {
      dependencyCount: task.dependencies.length,
      dependentsCount: countDependents(graph, task.id),
      estimatedTime: task.estimatedTime,
      resourceAvailability: calculateAvailability(task, context),
      criticalPath: isOnCriticalPath(graph, task.id)
    }

    return {
      task,
      priority: strategy.calculatePriority(task, metrics)
    }
  }).sort((a, b) => b.priority.score - a.priority.score)
}
```

### **2. Оптимизация параллелизма**

```typescript
// Поиск оптимального батча для параллельного выполнения
const optimizeParallelBatches = (
  tasks: Task[],
  resourceConstraints: ResourceConstraints
): ExecutionBatch[] => {
  return pipe(
    // Группировка по ресурсам
    groupByResourceType(tasks),

    // Сортировка по приоритету
    map(sortByPriority),

    // Создание оптимальных батчей
    map((group) => {
      const optimalBatchSize = calculateOptimalBatchSize(
        group,
        resourceConstraints
      )

      return chunk(group, optimalBatchSize)
    }),

    // Выравнивание по времени выполнения
    balanceExecutionTime
  )
}
```

---

## 🔗 Связи с Другими Агентами

### **Входящие данные:**
- **От VIBE-SPEC**: Детальная спецификация (архитектура, типы, API, БД)
- **От VIBE-KNOWLEDGE-KEEPER**: Паттерны и best practices
- **От VIBE-DIAGNOSTICS**: Ограничения системы и ресурсы

### **Исходящие данные:**
- **К VIBE-CODER**: Список задач для реализации
- **К VIBE-TESTER**: Спецификация тестов (TDD)
- **К VIBE-QUEEN**: План выполнения и прогресс
- **К VIBE-ELIZAOS**: Задачи по интеграции с платформой

### **Функциональный workflow:**

```typescript
const taskerWorkflow = pipe(
  VIBE_SPEC.getSpecification,
  chain(VIBE_TASKER.createTaskPlan),
  chain(VIBE_TASKER.optimizeExecution),
  chain((plan) => pipe(
    // Параллельная отправка задач
    sendTasksToCoders(plan.tasks),
    chain(waitForCompletion),
    chain(collectResults),
    chain(VIBE_TESTER.validateResults),
    chain(VIBE_TYPESCRIPT.validateTypes),
    chain(VIBE_CRITIC.reviewQuality),
    map(generateFinalReport)
  ))
)
```

---

## 💡 Лучшие Практики

### **1. Функциональная декомпозиция**
- ✅ **Каждая задача = одна чистая функция** или контролируемый эффект
- ✅ **Минимальные зависимости** между задачами
- ✅ **Композиция через pipe** для сложных задач
- ✅ **Иммутабельные данные** на всех этапах

### **2. Автономность**
- ✅ **Self-Coding** - задачи генерируют свой код
- ✅ **Self-Testing** - автоматические тесты
- ✅ **Self-Healing** - автовосстановление при ошибках
- ✅ **Self-Improving** - улучшение после неудач

### **3. Параллелизм**
- ✅ **Максимальный параллелизм** без нарушения зависимостей
- ✅ **Оптимальное использование ресурсов**
- ✅ **Graceful degradation** при нехватке ресурсов
- ✅ **Load balancing** между агентами

### **4. Устойчивость**
- ✅ **Retries с экспоненциальным backoff**
- ✅ **Circuit breaker** для проблемных задач
- ✅ **Fallback стратегии** при критических ошибках
- ✅ **Компенсационные транзакции** для отката

---

## 📚 Архитектурные Знания

### **Паттерны из документации:**
- **Автономная разработка**: 83% кода через self-coding агентов
- **Self-Testing**: 100% покрытие с property-based тестами
- **Self-Refactoring**: автоматическое улучшение качества кода
- **Self-Deployment**: автоматический деплой после успешных тестов
- **Роевой интеллект**: координация через Queen Bee Pattern

### **Функциональные принципы:**
- **TaskEither/ Either**: безопасная композиция с обработкой ошибок
- **Immutability**: создание новых структур, не мутация
- **Pure Functions**: детерминированное поведение
- **Pipe/Compose**: функциональная композиция операций
- **Zod**: runtime валидация схем данных

### **Архитектурные паттерны:**
- **Dependency Injection**: инверсия зависимостей через функции
- **Functional Architecture**: слои как композиции функций
- **Railway-Oriented Programming**: обработка ошибок в потоке
- **Algebraic Data Types**: моделирование состояний через Union
- **Ports & Adapters**: отделение интерфейсов от реализации

---

## 🎯 Результат Работы

**Вход**: Архитектурная спецификация

**Выход**:
```typescript
interface TaskPlan {
  // Оптимизированный список задач
  tasks: Task[]

  // Граф зависимостей
  dependencyGraph: DependencyGraph

  // Порядок выполнения
  executionOrder: ExecutionOrder

  // Параллельные группы
  parallelGroups: ParallelGroup[]

  // Временной план
  timeline: Timeline

  // План ресурсов
  resourcePlan: ResourcePlan

  // Стратегии восстановления
  recoveryStrategies: RecoveryStrategy[]
}
```

**План готов для автономного выполнения роем агентов! 🐝🚀**

---

*VIBE-TASKER: От спецификации к оптимальному плану автономного выполнения! ⚡✨*
