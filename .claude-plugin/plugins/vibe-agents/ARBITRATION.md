# 🐝 Логика арбитрации агентов Vibee

## 🎯 Концепция роевого интеллекта

**Роевой интеллект** - это подход, где множество автономных агентов-пчелок работают together под централизованной координацией через VIBE-QUEEN (vibe-lead).

### Принципы роевого интеллекта

1. **Децентрализация** - каждый агент автономен в своей области
2. **Централизованная координация** - vibe-lead управляет всей системой
3. **Самоорганизация** - агенты сами распределяют задачи
4. **Адаптивность** - система подстраивается под изменения
5. **Отказоустойчивость** - если один агент падает, другие подхватывают

---

## 🏗️ Архитектура арбитрации

### Иерархия агентов

```
                    ┌─────────────────┐
                    │   USER REQUEST  │
                    │  (Радужный мост)│
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   VIBE-QUEEN    │
                    │    (vibe-lead)  │
                    │  👑 Координатор │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
    │   SPECIALIST │  │  DOMAIN     │  │ INFRASTRUCT │
    │   AGENTS     │  │  EXPERTS    │  │   AGENTS    │
    │              │  │             │  │             │
    │ • vibe-spec  │  │ • vibe-     │  │ • vibe-     │
    │ • vibe-test  │  │   elizaos   │  │   devops    │
    │ • vibe-      │  │ • vibe-     │  │ • vibe-     │
    │   coder      │  │   ai-llm    │  │   sentry    │
    │ • vibe-      │  │ • vibe-     │  │ • vibe-     │
    │   critic     │  │   mcp       │  │   langfuse  │
    └──────┬───────┘  └──────┬──────┘  └──────┬──────┘
           │                 │                 │
           └─────────────────┼─────────────────┘
                             │
                    ┌────────▼────────┐
                    │   VIBE-SENTRY   │
                    │   (Мониторинг)  │
                    └─────────────────┘
```

---

## 🎛️ Алгоритм арбитрации

### Основной цикл арбитрации

```typescript
import { TaskEither, right, left, chain, pipe } from '@/utils/functional'

interface ArbitrationRequest {
  userRequest: string
  context: UserContext
  priority: 'low' | 'medium' | 'high' | 'critical'
  deadline?: Date
}

interface ArbitrationResult {
  selectedAgents: AgentSelection[]
  executionOrder: ExecutionOrder
  strategy: ExecutionStrategy
  estimatedTime: number
  resources: ResourceAllocation
}

/**
 * Центральный арбитр - выбирает агентов для задачи
 */
export const arbitrateAgents = (
  request: ArbitrationRequest
): TaskEither<Error, ArbitrationResult> => {
  return pipe(
    // 1. Анализируем запрос пользователя
    analyzeUserRequest(request),
    chain(analysis =>
      // 2. Определяем требуемые компетенции
      pipe(
        extractRequiredCompetencies(analysis),
        chain(competencies =>
          // 3. Ищем агентов с нужными компетенциями
          pipe(
            findMatchingAgents(competencies),
            chain(agents =>
              // 4. Оцениваем нагрузку и доступность
              pipe(
                assessAgentCapacity(agents),
                chain(capacity =>
                  // 5. Выбираем оптимальную комбинацию
                  pipe(
                    selectOptimalAgents(capacity),
                    chain(selection =>
                      // 6. Определяем порядок выполнения
                      pipe(
                        defineExecutionOrder(selection),
                        chain(order =>
                          // 7. Составляем план арбитрации
                          pipe(
                            createArbitrationPlan(selection, order),
                            right
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
}

/**
 * Анализ запроса пользователя
 */
const analyzeUserRequest = (request: ArbitrationRequest): TaskEither<Error, RequestAnalysis> => {
  return async () => {
    const { userRequest } = request

    // Извлекаем ключевые слова
    const keywords = extractKeywords(userRequest)

    // Определяем тип задачи
    const taskType = classifyTaskType(userRequest)

    // Оцениваем сложность
    const complexity = assessComplexity(userRequest)

    // Определяем домены
    const domains = identifyDomains(keywords)

    // Проверяем на критичность
    const isCritical = detectCriticalKeywords(userRequest)

    return right({
      keywords,
      taskType,
      complexity,
      domains,
      isCritical,
      confidence: calculateConfidence(keywords, domains),
    })
  }
}

/**
 * Поиск агентов по компетенциям
 */
const findMatchingAgents = (competencies: RequiredCompetency[]): TaskEither<Error, AgentMatch[]> => {
  return async () => {
    const allAgents = getAllRegisteredAgents()

    const matches = allAgents
      .map(agent => ({
        agent,
        matchScore: calculateMatchScore(agent, competencies),
        availability: checkAgentAvailability(agent),
        currentLoad: getAgentCurrentLoad(agent),
      }))
      .filter(match => match.matchScore > 0.5) // Минимальный порог соответствия
      .sort((a, b) => b.matchScore - a.matchScore) // Сортируем по убыванию

    return right(matches)
  }
}

/**
 * Определение порядка выполнения
 */
const defineExecutionOrder = (selection: AgentSelection[]): TaskEither<Error, ExecutionOrder> => {
  return right({
    type: determineExecutionType(selection),
    sequence: createExecutionSequence(selection),
    parallelGroups: groupParallelAgents(selection),
    dependencies: buildDependencyGraph(selection),
  })
}

/**
 * Типы выполнения
 */
type ExecutionType =
  | 'sequential'    // Последовательно
  | 'parallel'      // Параллельно
  | 'pipeline'      // Конвейер (поэтапно)
  | 'hierarchical'  // Иерархически (подчиненные)

/**
 * Создание последовательности выполнения
 */
const createExecutionSequence = (agents: AgentSelection[]): AgentExecutionStep[] => {
  return agents
    .sort((a, b) => a.priority - b.priority) // По приоритету
    .map((agent, index) => ({
      agentId: agent.agent.id,
      stepNumber: index + 1,
      estimatedDuration: agent.estimatedDuration,
      dependencies: agent.dependencies,
      canRunInParallel: agent.canRunInParallel,
    }))
}
```

---

## 📊 Стратегии арбитрации

### 1. Sequential (Последовательная)

```typescript
{
  type: 'sequential',
  description: 'Агенты выполняют задачи по очереди',
  example: 'spec → tester → coder → critic',
  useWhen: 'Сложные задачи с зависимостями между шагами',
}
```

### 2. Parallel (Параллельная)

```typescript
{
  type: 'parallel',
  description: 'Агенты выполняют задачи одновременно',
  example: '[sentry, devops, langfuse] одновременно',
  useWhen: 'Независимые задачи, требующие быстрого выполнения',
}
```

### 3. Pipeline (Конвейер)

```typescript
{
  type: 'pipeline',
  description: 'Задача проходит через цепочку агентов',
  example: 'data → analyzer → processor → validator → output',
  useWhen: 'Обработка данных поэтапно',
}
```

### 4. Hierarchical (Иерархическая)

```typescript
{
  type: 'hierarchical',
  description: 'Главный агент координирует подчиненных',
  example: 'lead → [spec, tester, coder] → critic',
  useWhen: 'Крупные проекты с множеством специалистов',
}
```

---

## 🎯 Критерии выбора агентов

### Матрица компетенций

```typescript
interface CompetencyMatrix {
  // Технологические компетенции
  technologies: {
    typescript: number      // 0-1, важность TypeScript
    elizaos: number         // 0-1, важность ElizaOS
    react: number           // 0-1, важность React
    nodejs: number          // 0-1, важность Node.js
    // ... другие технологии
  }

  // Доменные компетенции
  domains: {
    framework: number       // 0-1, работа с фреймворками
    testing: number         // 0-1, тестирование
    security: number        // 0-1, безопасность
    devops: number          // 0-1, DevOps
    ai: number              // 0-1, ИИ/ML
    // ... другие домены
  }

  // Типы задач
  taskTypes: {
    development: number     // 0-1, разработка
    debugging: number       // 0-1, отладка
    refactoring: number     // 0-1, рефакторинг
    optimization: number    // 0-1, оптимизация
    documentation: number   // 0-1, документация
    // ... другие типы задач
  }
}

/**
 * Расчет соответствия агента задаче
 */
const calculateMatchScore = (
  agent: VibeAgent,
  competencies: RequiredCompetency[]
): number => {
  let totalScore = 0
  let maxPossibleScore = 0

  for (const competency of competencies) {
    const weight = competency.weight // Важность компетенции (0-1)
    const agentLevel = getAgentCompetencyLevel(agent, competency.name) // 0-1

    totalScore += weight * agentLevel
    maxPossibleScore += weight
  }

  return maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0
}
```

### Оценка доступности агента

```typescript
interface AgentCapacity {
  currentTasks: number
  maxConcurrentTasks: number
  averageTaskDuration: number
  isAvailable: boolean
  loadPercentage: number // 0-100
}

/**
 * Проверка доступности агента
 */
const assessAgentCapacity = (matches: AgentMatch[]): TaskEither<Error, AgentCapacity[]> => {
  return right(
    matches.map(match => ({
      ...match,
      capacity: {
        currentTasks: getCurrentTaskCount(match.agent.id),
        maxConcurrentTasks: match.agent.maxConcurrentTasks || 3,
        averageTaskDuration: getAverageTaskDuration(match.agent.id),
        isAvailable: isAgentAvailable(match.agent.id),
        loadPercentage: calculateLoadPercentage(match.agent.id),
      },
      priority: calculateArbitrationPriority(match, match.capacity),
    }))
  )
}
```

---

## 🔄 Динамическая арбитрация

### Перераспределение задач

```typescript
/**
 * Мониторинг выполнения и перераспределение
 */
export const monitorAndRedistribute = (
  executionPlan: ExecutionPlan
): TaskEither<Error, RedistributionResult> => {
  return pipe(
    // Следим за выполнением
    monitorExecution(executionPlan),
    chain(status =>
      // Если агент перегружен или не отвечает
      pipe(
        identifyIssues(status),
        chain(issues =>
          // Перераспределяем задачи
          redistributeTasks(issues, executionPlan)
        )
      )
    )
  )
}

/**
 * Примеры перераспределения
 */
const redistributeTasks = (
  issues: ExecutionIssue[],
  plan: ExecutionPlan
): TaskEither<Error, RedistributionResult> => {
  switch (issues[0]?.type) {
    case 'agent-overloaded':
      // Переносим задачу к менее загруженному агенту
      return transferTaskToBackupAgent(issues[0])

    case 'agent-unavailable':
      // Назначаем резервного агента
      return assignBackupAgent(issues[0])

    case 'task-failing':
      // Меняем стратегию выполнения
      return changeExecutionStrategy(issues[0])

    default:
      return right({ status: 'no-action-needed' })
  }
}
```

---

## 🎛️ Конфигурация арбитрации

### Настройки для каждого агента

```yaml
# В файле агента (YAML frontmatter)
vibe_arbitration:
  max_concurrent_tasks: 3      # Максимум одновременных задач
  backup_agents:               # Резервные агенты
    - vibe-coder
    - vibe-typescript
  preferred_execution_type: sequential  # Предпочтительный тип выполнения
  arbitration_priority: 5      # Приоритет в арбитрации (1-10)
  cooldown_period: 300         # Период охлаждения после задачи (сек)
  trust_level: 0.9             # Уровень доверия (0-1)
  auto_scaling: true           # Автоматическое масштабирование
```

### Глобальные настройки

```typescript
// src/config/arbitration.config.ts
export const ARBITRATION_CONFIG = {
  // Общие настройки
  defaultExecutionType: 'hierarchical',
  maxChainLength: 5,
  timeoutPerAgent: 300000, // 5 минут

  // Мониторинг
  monitoringInterval: 5000, // 5 секунд
  redistributeThreshold: 0.8, // 80% нагрузки

  // Бэкап агенты
  backupAgentPool: [
    'vibe-lead',        // Всегда доступен как последний резерв
    'vibe-coder',       // Универсальный разработчик
    'vibe-spec',        // Специалист по анализу
  ],

  // Критичные задачи
  criticalTaskTimeout: 600000, // 10 минут
  criticalAgentPool: [
    'vibe-lead',
    'vibe-spec',
    'vibe-tester',
  ],
}
```

---

## 📈 Метрики и аналитика

### Отслеживаемые метрики

```typescript
interface ArbitrationMetrics {
  // Эффективность арбитрации
  averageSelectionTime: number       // Среднее время выбора агентов
  selectionAccuracy: number          // Точность выбора (0-1)
  userSatisfactionScore: number      // Оценка пользователя (0-10)

  // Производительность
  tasksCompleted: number             // Завершенные задачи
  averageTaskDuration: number        // Среднее время задачи
  successRate: number                // Процент успешного выполнения

  // Ресурсы
  agentUtilization: Record<string, number>    // Загрузка агентов
  totalIdleTime: number              // Общее время простоя
  redistributeCount: number          // Количество перераспределений

  // Качество
  reworkRate: number                 // Процент доработок
  errorRate: number                  // Процент ошибок
  userInterventionRate: number       // Вмешательство пользователя
}

/**
 * Сбор метрик арбитрации
 */
const collectArbitrationMetrics = (): TaskEither<Error, ArbitrationMetrics> => {
  return right({
    averageSelectionTime: calculateAverageSelectionTime(),
    selectionAccuracy: calculateSelectionAccuracy(),
    userSatisfactionScore: getAverageUserRating(),
    tasksCompleted: getCompletedTaskCount(),
    averageTaskDuration: getAverageTaskDuration(),
    successRate: calculateSuccessRate(),
    agentUtilization: getAgentUtilization(),
    totalIdleTime: getTotalIdleTime(),
    redistributeCount: getRedistributionCount(),
    reworkRate: calculateReworkRate(),
    errorRate: calculateErrorRate(),
    userInterventionRate: calculateUserInterventionRate(),
  })
}
```

---

## 🚀 Примеры арбитрации

### 1. Задача: "Создать новый плагин для ElizaOS"

```typescript
// Анализ
{
  keywords: ['создать', 'плагин', 'ElizaOS'],
  domains: ['framework', 'development'],
  taskType: 'development',
  complexity: 'medium',
  isCritical: false,
}

// Выбор агентов
[
  {
    agent: 'vibe-spec',
    matchScore: 0.95,
    role: 'Создание спецификации плагина',
  },
  {
    agent: 'vibe-elizaos',
    matchScore: 0.90,
    role: 'Экспертиза по фреймворку',
  },
  {
    agent: 'vibe-tester',
    matchScore: 0.85,
    role: 'Написание тестов',
  },
  {
    agent: 'vibe-coder',
    matchScore: 0.80,
    role: 'Реализация плагина',
  },
]

// Стратегия выполнения
{
  type: 'hierarchical',
  sequence: ['vibe-spec → vibe-elizaos → vibe-tester → vibe-coder → vibe-critic'],
  parallelGroups: [], // Нет параллельных задач
  estimatedTime: 30, // минут
}
```

### 2. Задача: "Оптимизировать производительность CI/CD"

```typescript
// Анализ
{
  keywords: ['оптимизация', 'CI/CD', 'производительность'],
  domains: ['cicd', 'devops'],
  taskType: 'optimization',
  complexity: 'high',
  isCritical: true,
}

// Выбор агентов
[
  {
    agent: 'vibe-cicd',
    matchScore: 0.98,
    role: 'Основной эксперт по CI/CD',
  },
  {
    agent: 'vibe-devops',
    matchScore: 0.92,
    role: 'Инфраструктурная экспертиза',
  },
  {
    agent: 'vibe-sentry',
    matchScore: 0.70,
    role: 'Мониторинг производительности',
  },
]

// Стратегия выполнения
{
  type: 'parallel',
  parallelGroups: [
    ['vibe-cicd', 'vibe-devops'],
    ['vibe-sentry'], // Запускается после анализа
  ],
  estimatedTime: 60, // минут
}
```

---

## ✅ Чек-лист реализации арбитрации

### Обязательные компоненты

- [ ] **Анализатор запросов** - извлекает ключевые слова и определяет тип задачи
- [ ] **Матрица компетенций** - база знаний о возможностях агентов
- [ ] **Поиск агентов** - находит агентов по компетенциям
- [ ] **Оценка загрузки** - проверяет доступность агентов
- [ ] **Оптимизатор выбора** - выбирает лучшую комбинацию
- [ ] **Планировщик выполнения** - определяет порядок и стратегию
- [ ] **Мониторинг выполнения** - отслеживает прогресс
- [ ] **Система перераспределения** - динамически перераспределяет задачи
- [ ] **Метрики и аналитика** - собирает статистику
- [ ] **Резервные агенты** - система бэкапа для критичных задач

### Критичные требования

- [ ] **Автономность** - арбитрация работает без участия человека
- [ ] **Отказоустойчивость** - система продолжает работать при сбоях агентов
- [ ] **Производительность** - выбор агентов занимает < 1 секунды
- [ ] **Масштабируемость** - система работает с 100+ агентами
- [ ] **Адаптивность** - подстраивается под изменения нагрузки
- [ ] **Прозрачность** - пользователь видит какие агенты выбраны и почему

---

**Арбитрация агентов Vibee - Умное распределение задач в рое пчелок! 🐝✨**
