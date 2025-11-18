# 🔗 Правила вызова агентов и кросс-знания

## 🎯 Концепция кросс-агентных знаний

Агенты знают друг друга по ID и могут вызывать друг друга для решения комплексных задач. Система основана на **SubagentStop hooks** (v2.0.42) с передачей `agent_id` и `agent_transcript_path`.

---

## 📋 Реестр агентов и их ID

### Chain Agents (Queen Bee Pattern)

| Agent Name | Agent ID | Purpose | Calls Others |
|------------|----------|---------|--------------|
| **vibe-lead** | `vibe-lead` | 👑 Координатор всех агентов | ✅ Всех специалистов |
| **vibe-spec** | `vibe-spec` | 📋 Создание спецификаций | ✅ vibe-tester, vibe-devops, vibe-elizaos |
| **vibe-tester** | `vibe-tester` | 🧪 Написание тестов (TDD) | ✅ vibe-spec, vibe-security |
| **vibe-critic** | `vibe-critic` | 🎭 Валидация результатов | ✅ Всех исполнителей |

### Specialist Agents (Implementation)

| Agent Name | Agent ID | Purpose | Calls Others |
|------------|----------|---------|--------------|
| **vibe-coder** | `vibe-coder` | 💻 Главный разработчик | ✅ vibe-typescript, vibe-security, vibe-cicd |
| **vibe-typescript** | `vibe-typescript` | 📘 TypeScript эксперт | ✅ vibe-sentry (для мониторинга) |
| **vibe-tasker** | `vibe-tasker` | ✅ Менеджер задач | ✅ vibe-lead (для координации) |
| **vibe-security** | `vibe-security` | 🔐 Безопасность | ✅ vibe-devops, vibe-sentry |
| **vibe-cicd** | `vibe-cicd` | 🔄 CI/CD Pipeline | ✅ vibe-devops, vibe-sentry |
| **vibe-devops** | `vibe-devops` | 🚀 DevOps/Infrastructure | ✅ vibe-sentry, vibe-mcp |
| **vibe-roi** | `vibe-roi` | 💰 ROI аналитика | ✅ vibe-cicd, vibe-devops |

### Domain Expert Agents

| Agent Name | Agent ID | Purpose | Calls Others |
|------------|----------|---------|--------------|
| **vibe-elizaos** | `vibe-elizaos` | ⚡ ElizaOS Framework | ✅ vibe-spec, vibe-coder |
| **vibe-ai-llm** | `vibe-ai-llm` | 🤖 AI/LLM провайдер | ✅ vibe-sentry, vibe-devops |
| **vibe-mcp** | `vibe-mcp` | 🔌 Model Context Protocol | ✅ vibe-elizaos, vibe-sentry |
| **vibe-sentry** | `vibe-sentry` | 📡 Мониторинг ошибок | ✅ Всех (для мониторинга) |
| **vibe-langfuse** | `vibe-langfuse` | 📊 Наблюдаемость | ✅ vibe-sentry |

---

## 🔄 Алгоритм вызова агентов

### Standard Call Pattern

```typescript
interface AgentCall {
  targetAgentId: string
  task: string
  context: CallContext
  expectedOutput: string
  timeout?: number
}

interface CallContext {
  sourceAgentId: string
  sourceTaskId: string
  dependencies?: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  sharedState?: Record<string, any>
}

/**
 * Вызов агента по ID
 */
const callAgent = (
  agentId: string,
  task: string,
  context: CallContext
): TaskEither<Error, AgentResponse> => {
  return pipe(
    validateAgentExists(agentId),
    chain(() =>
      pipe(
        createSubagentTask(agentId, task, context),
        chain(taskDefinition => {
          // Используем Task tool для вызова агента
          return executeSubagentTask(taskDefinition)
        })
      )
    )
  )
}

/**
 * Пример использования в vibe-coder
 */
export class CoderAgent {
  implementFeature(request: FeatureRequest): TaskEither<Error, Implementation> {
    return pipe(
      // 1. Сначала вызываем спецификацию
      callAgent('vibe-spec', `Create specification for: ${request.description}`, {
        sourceAgentId: 'vibe-coder',
        sourceTaskId: request.id,
        priority: 'high',
        dependencies: [],
      }),
      chain(specResponse => {
        // 2. Затем типы
        return pipe(
          callAgent('vibe-typescript', `Define TypeScript types for: ${request.description}`, {
            sourceAgentId: 'vibe-coder',
            sourceTaskId: request.id,
            priority: 'high',
            dependencies: [specResponse.id],
            sharedState: { spec: specResponse.data },
          }),
          chain(typesResponse => {
            // 3. Тесты
            return pipe(
              callAgent('vibe-tester', `Write tests for feature: ${request.description}`, {
                sourceAgentId: 'vibe-coder',
                sourceTaskId: request.id,
                priority: 'high',
                dependencies: [specResponse.id, typesResponse.id],
                sharedState: {
                  spec: specResponse.data,
                  types: typesResponse.data,
                },
              }),
              chain(testsResponse => {
                // 4. Реализация
                return pipe(
                  implementCode(request, specResponse.data, typesResponse.data),
                  chain(code => {
                    // 5. Безопасность
                    return pipe(
                      callAgent('vibe-security', `Review code security: ${request.description}`, {
                        sourceAgentId: 'vibe-coder',
                        sourceTaskId: request.id,
                        priority: 'medium',
                        dependencies: [],
                        sharedState: { code: code },
                      }),
                      chain(securityReview => {
                        // 6. Возвращаем результат
                        return right({
                          spec: specResponse.data,
                          types: typesResponse.data,
                          tests: testsResponse.data,
                          code,
                          securityReview: securityReview.data,
                        })
                      })
                    )
                  })
                )
              })
            )
          })
        )
      })
    )
  }
}
```

---

## 📊 Матрица вызовов

### Кто кого вызывает

```typescript
// src/config/agent-call-matrix.ts
export const AGENT_CALL_MATRIX = {
  'vibe-lead': {
    canCall: ['vibe-spec', 'vibe-tester', 'vibe-critic', 'vibe-coder', 'vibe-devops', 'vibe-sentry'],
    priority: 'high',
    description: 'Координатор всех агентов',
  },

  'vibe-spec': {
    canCall: ['vibe-elizaos', 'vibe-devops', 'vibe-tester'],
    priority: 'high',
    description: 'Нужен для понимания требований',
  },

  'vibe-tester': {
    canCall: ['vibe-spec', 'vibe-security'],
    priority: 'high',
    description: 'Проверяет спецификации и безопасность',
  },

  'vibe-critic': {
    canCall: ['vibe-spec', 'vibe-tester', 'vibe-coder', 'vibe-devops', 'vibe-security'],
    priority: 'critical',
    description: 'Валидирует все результаты',
  },

  'vibe-coder': {
    canCall: ['vibe-typescript', 'vibe-security', 'vibe-cicd', 'vibe-sentry'],
    priority: 'high',
    description: 'Разработчик - координирует реализацию',
  },

  'vibe-typescript': {
    canCall: ['vibe-sentry'],
    priority: 'medium',
    description: 'Типизация и проверка',
  },

  'vibe-security': {
    canCall: ['vibe-devops', 'vibe-sentry'],
    priority: 'high',
    description: 'Проверяет безопасность',
  },

  'vibe-devops': {
    canCall: ['vibe-sentry', 'vibe-mcp'],
    priority: 'high',
    description: 'Инфраструктура и деплой',
  },

  'vibe-cicd': {
    canCall: ['vibe-devops', 'vibe-sentry'],
    priority: 'high',
    description: 'CI/CD пайплайны',
  },

  'vibe-elizaos': {
    canCall: ['vibe-spec', 'vibe-coder'],
    priority: 'high',
    description: 'Эксперт по ElizaOS',
  },

  'vibe-ai-llm': {
    canCall: ['vibe-sentry', 'vibe-devops'],
    priority: 'medium',
    description: 'AI/ML интеграции',
  },

  'vibe-mcp': {
    canCall: ['vibe-elizaos', 'vibe-sentry'],
    priority: 'medium',
    description: 'Model Context Protocol',
  },

  'vibe-sentry': {
    canCall: [], // Мониторинг - не вызывает других
    priority: 'high',
    description: 'Центр мониторинга - получает вызовы от всех',
  },

  'vibe-langfuse': {
    canCall: ['vibe-sentry'],
    priority: 'medium',
    description: 'Наблюдаемость LLM',
  },

  'vibe-tasker': {
    canCall: ['vibe-lead'],
    priority: 'medium',
    description: 'Менеджер задач',
  },

  'vibe-roi': {
    canCall: ['vibe-cicd', 'vibe-devops'],
    priority: 'low',
    description: 'Анализ ROI',
  },
}
```

---

## 🚦 Workflow вызовов

### Workflow 1: Создание новой функции

```
User Request
    ↓
[vibe-lead] Координация
    ↓
[vibe-spec] Спецификация
    ↓ (optional)
[vibe-elizaos] Экспертиза фреймворка
    ↓
[vibe-coder] Реализация
    ↓
[vibe-typescript] Типизация
    ↓
[vibe-tester] Тесты
    ↓
[vibe-security] Проверка безопасности
    ↓
[vibe-critic] Валидация
    ↓
[vibe-sentry] Мониторинг
    ↓
Отчет пользователю
```

**Реализация:**

```typescript
// src/workflows/create-feature.ts
export const createFeatureWorkflow = (
  request: FeatureRequest
): TaskEither<Error, FeatureResult> => {
  const workflowId = generateId()

  return pipe(
    // Шаг 1: Координация
    callAgent('vibe-lead', `Coordinate feature creation: ${request.description}`, {
      sourceAgentId: 'workflow-engine',
      sourceTaskId: workflowId,
      priority: 'critical',
    }),
    chain(coordination => {
      // Шаг 2: Спецификация
      return pipe(
        callAgent('vibe-spec', `Create specification for: ${request.description}`, {
          sourceAgentId: 'workflow-engine',
          sourceTaskId: workflowId,
          priority: 'high',
          dependencies: [coordination.id],
        }),
        chain(spec => {
          // Шаг 3: Экспертиза (если нужно)
          if (request.requiresFrameworkExpertise) {
            return pipe(
              callAgent('vibe-elizaos', `Review architecture: ${request.description}`, {
                sourceAgentId: 'workflow-engine',
                sourceTaskId: workflowId,
                priority: 'high',
                dependencies: [spec.id],
                sharedState: { spec: spec.data },
              }),
              chain(architecture => {
                return executeImplementation(workflowId, spec.data, architecture.data)
              })
            )
          }

          return executeImplementation(workflowId, spec.data, null)
        })
      )
    })
  )
}
```

### Workflow 2: Оптимизация производительности

```
User Request
    ↓
[vibe-lead] Анализ
    ↓
[vibe-cicd] Анализ CI/CD
    ↓ (parallel)
[vibe-devops] Инфраструктура
    ↓
[vibe-sentry] Данные мониторинга
    ↓
[vibe-critic] Рекомендации
    ↓
[vibe-devops] Реализация
    ↓
[vibe-sentry] Валидация
```

### Workflow 3: Исправление ошибки

```
Error Detected
    ↓
[vibe-sentry] Анализ ошибки
    ↓
[vibe-critic] Приоритизация
    ↓
[vibe-spec] Спецификация исправления
    ↓
[vibe-coder] Реализация
    ↓
[vibe-tester] Тесты
    ↓
[vibe-security] Проверка
    ↓
[vibe-devops] Деплой
```

---

## 🎣 SubagentStop Hook (v2.0.42)

### Структура hook

```typescript
interface SubagentStopHook {
  agent_id: string              // ID вызванного агента
  agent_transcript_path: string // Путь к транскрипту
  success: boolean              // Успех выполнения
  output?: any                  // Результат
  error?: Error                 // Ошибка
  duration: number              // Время выполнения (ms)
  metadata?: Record<string, any> // Дополнительные данные
}

/**
 * Обработчик SubagentStop hook
 */
const handleSubagentStop = (
  hook: SubagentStopHook
): TaskEither<Error, void> => {
  return pipe(
    // Логируем в Sentry
    logAgentCompletion(hook),
    chain(() => {
      // Если агент завершился с ошибкой
      if (!hook.success && hook.error) {
        return pipe(
          // Уведомляем координатора
          notifyCoordinator(hook),
          chain(() => {
            // Предлагаем исправление
            return suggestFix(hook)
          })
        )
      }

      // Успешное завершение
      return pipe(
        updateAgentStatus(hook.agent_id, 'idle'),
        right(undefined)
      )
    })
  )
}

/**
 * Использование в вызове агента
 */
const callAgentWithTracking = (
  agentId: string,
  task: string,
  context: CallContext
): TaskEither<Error, AgentResponse> => {
  return pipe(
    callAgent(agentId, task, context),
    tap(response => {
      // Hook будет вызван автоматически при завершении
      // Мы можем отследить его через callback
      trackSubagentCompletion(response.taskId, hook => {
        handleSubagentStop(hook)
      })
    })
  )
}
```

---

## 👨‍🎓 Система "Студенты" (Claude Code)

### Концепция

Студенты - это преднастроенные шаблоны агентов для быстрого старта в Claude Code.

### Типы студентов

```typescript
type StudentType =
  | 'junior-developer'     // Junior разработчик
  | 'senior-developer'     // Senior разработчик
  | 'devops-engineer'      // DevOps инженер
  | 'security-auditor'     // Аудитор безопасности
  | 'tester-specialist'    // Специалист по тестированию
  | 'framework-expert'     // Эксперт по фреймворкам
  | 'ai-engineer'          // AI инженер
  | 'data-engineer'        // Data Engineer
  | 'product-manager'      // Product Manager
  | 'tech-lead'            // Tech Lead

interface StudentProfile {
  id: string
  name: string
  type: StudentType
  description: string
  capabilities: string[]
  preferredAgents: string[]  // Каких агентов предпочитает вызывать
  learningPath: string[]
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced'
}
```

### Каталог студентов

```typescript
// src/students/student-profiles.ts
export const STUDENT_PROFILES: Record<string, StudentProfile> = {
  'junior-dev': {
    id: 'junior-dev',
    name: 'Junior Developer',
    type: 'junior-developer',
    description: 'Junior разработчик, изучает основы',
    capabilities: [
      'Базовый TypeScript',
      'Простые функции',
      'Написание тестов',
      'Отладка кода',
    ],
    preferredAgents: [
      'vibe-spec',
      'vibe-tester',
      'vibe-critic',
      'vibe-sentry', // Для обучения на ошибках
    ],
    learningPath: [
      'Основы TypeScript',
      'Функциональное программирование',
      'TDD подход',
      'Работа с ElizaOS',
    ],
    knowledgeLevel: 'beginner',
  },

  'senior-dev': {
    id: 'senior-dev',
    name: 'Senior Developer',
    type: 'senior-developer',
    description: 'Senior разработчик, эксперт в архитектуре',
    capabilities: [
      'Архитектурные решения',
      'Оптимизация производительности',
      'Управление командой',
      'Code Review',
    ],
    preferredAgents: [
      'vibe-spec',
      'vibe-critic',
      'vibe-devops',
      'vibe-security',
    ],
    learningPath: [
      'Продвинутые паттерны',
      'Микросервисная архитектура',
      'DevOps практики',
    ],
    knowledgeLevel: 'advanced',
  },

  'devops-engineer': {
    id: 'devops-eng',
    name: 'DevOps Engineer',
    type: 'devops-engineer',
    description: 'Инфраструктура и автоматизация',
    capabilities: [
      'CI/CD пайплайны',
      'Infrastructure as Code',
      'Мониторинг систем',
      'Docker/Kubernetes',
    ],
    preferredAgents: [
      'vibe-devops',
      'vibe-cicd',
      'vibe-sentry',
      'vibe-mcp',
    ],
    learningPath: [
      'OpenTofu',
      'GitLab CI/CD',
      'Sentry мониторинг',
      'Docker оркестрация',
    ],
    knowledgeLevel: 'intermediate',
  },

  'security-auditor': {
    id: 'sec-auditor',
    name: 'Security Auditor',
    type: 'security-auditor',
    description: 'Аудит безопасности',
    capabilities: [
      'Анализ уязвимостей',
      'Пентестинг',
      'Compliance',
      'Security Best Practices',
    ],
    preferredAgents: [
      'vibe-security',
      'vibe-sentry',
      'vibe-devops',
    ],
    learningPath: [
      'OWASP Top 10',
      'Security Testing',
      'Infisical секреты',
    ],
    knowledgeLevel: 'advanced',
  },
}
```

### Быстрая настройка студента

```typescript
// src/students/setup-student.ts
export const setupStudent = (
  studentType: StudentType,
  customConfig?: Partial<StudentProfile>
): TaskEither<Error, StudentInstance> => {
  return pipe(
    // 1. Загружаем профиль
    getStudentProfile(studentType),
    chain(profile => {
      // 2. Применяем кастомную конфигурацию
      const config = mergeProfiles(profile, customConfig)

      // 3. Создаем экземпляр студента
      return pipe(
        createStudentInstance(config),
        chain(instance => {
          // 4. Настраиваем предпочтения вызова агентов
          return pipe(
            configureAgentCalls(instance),
            chain(() => {
              // 5. Загружаем обучающие материалы
              return pipe(
                loadLearningMaterials(instance.learningPath),
                chain(materials => {
                  // 6. Инициализируем студента
                  return pipe(
                    initializeStudent(instance, materials),
                    right
                  )
                })
              )
            })
          )
        })
      )
    })
  )
}

/**
 * Использование в Claude Code
 */
const quickSetup = async () => {
  // Быстрая настройка junior разработчика
  const junior = await setupStudent('junior-dev', {
    name: 'My Junior Dev',
    capabilities: [
      'React разработка',
      'Redux state management',
      'Unit тестирование',
    ],
  })

  if (junior._tag === 'Right') {
    console.log('Студент настроен:', junior.value)
  }

  // Быстрая настройка DevOps инженера
  const devops = await setupStudent('devops-engineer', {
    name: 'My DevOps',
    capabilities: [
      'GitLab CI/CD',
      'Docker оркестрация',
      'OpenTofu инфраструктура',
    ],
  })
}
```

---

## 🎓 Обучающие материалы для студентов

### Структура обучения

```typescript
// src/students/curriculum/index.ts
export const CURRICULUM = {
  'junior-developer': {
    modules: [
      {
        id: 'typescript-basics',
        name: 'Основы TypeScript',
        duration: '2 часа',
        lessons: [
          'Типы и интерфейсы',
          'Generics',
          'Опциональные свойства',
          'Type guards',
        ],
        exercises: [
          'Задача 1: Типизация функций',
          'Задача 2: Интерфейсы и классы',
          'Задача 3: Generics в действии',
        ],
        tests: [
          'Тест 1: Basic Types',
          'Тест 2: Interfaces',
          'Тест 3: Generics',
        ],
      },
      {
        id: 'functional-programming',
        name: 'Функциональное программирование',
        duration: '3 часа',
        lessons: [
          'Чистые функции',
          'Иммутабельность',
          'Композиция функций',
          'TaskEither паттерн',
        ],
        exercises: [
          'Упражнение 1: Перепишите код в FP стиле',
          'Упражнение 2: Реализуйте pipe/compose',
          'Упражнение 3: TaskEither обработка',
        ],
        tests: [
          'Тест 1: Pure Functions',
          'Тест 2: Immutability',
          'Тест 3: TaskEither',
        ],
      },
    ],
  },
}
```

---

## ✅ Чек-лист настройки системы

### Базовая настройка

- [ ] **Реестр агентов** - все агенты зарегистрированы с ID
- [ ] **Матрица вызовов** - настроены связи между агентами
- [ ] **Workflow** - определены основные workflow вызовов
- [ ] **SubagentStop Hooks** - настроен мониторинг завершения
- [ ] **Кросс-знания** - агенты знают друг друга

### Для студентов

- [ ] **Профили студентов** - созданы профили для разных ролей
- [ ] **Быстрая настройка** - функция setupStudent работает
- [ ] **Обучающие материалы** - созданы модули обучения
- [ ] **Практические задания** - упражнения и тесты
- [ ] **Интеграция с Claude Code** - seamless настройка

### Мониторинг

- [ ] **Трекинг вызовов** - все вызовы агентов логируются
- [ ] **Производительность** - метрики времени ответа
- [ ] **Успешность** - процент успешных вызовов
- [ ] **Ошибки** - анализ и классификация ошибок

---

**Правила вызова агентов Vibee - Умная система кросс-координации! 🔗✨**
