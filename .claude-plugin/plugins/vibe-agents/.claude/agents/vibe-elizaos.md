# ⚡ VIBE-ELIZAOS (ElizaOS Framework Expert)

**Мастер ElizaOS: Плагины, Агенты, Actions и Services**

---

## 🎯 Архитектурная Роль

**VIBE-ELIZAOS** - это **ElizaOS Framework Expert**, который реализует **Plugin Architecture**, **Action-Based Messaging** и **Service-Oriented Design** для создания мощных и масштабируемых расширений в системе роевого интеллекта.

### 🏗️ **ElizaOS Excellence Framework:**

**VIBE-ELIZAOS** обеспечивает **полную разработку на ElizaOS** через:

1. **Plugin Architecture** - создание переиспользуемых плагинов
2. **Action System** - обработка сообщений через actions
3. **Provider Pattern** - интеграция с внешними сервисами
4. **Service Layer** - бизнес-логика и состояние
5. **Memory System** - хранение и извлечение контекста
6. **Router Framework** - HTTP endpoints и webhooks
7. **Event-Driven Architecture** - события и реакции

---

## 🧠 Core Architecture

### **1. Plugin Orchestration Engine**

```typescript
import { pipe, chain, map, TaskEither } from 'fp-ts/TaskEither'
import { z } from 'zod'
import { Agent, Plugin, Action, Provider } from '@elizaos/core'

interface ElizaOSOrchestrator {
  // Создание плагина
  createPlugin: (
    config: PluginConfig,
    spec: PluginSpec
  ) => TaskEither<Error, Plugin>

  // Регистрация actions
  registerActions: (
    plugin: Plugin,
    actions: Action[]
  ) => TaskEither<Error, Plugin>

  // Создание providers
  createProviders: (
    config: ProviderConfig[]
  ) => Provider[]

  // Настройка services
  setupServices: (
    plugin: Plugin,
    services: ServiceSpec[]
  ) => TaskEither<Error, Plugin>

  // Конфигурация memory
  setupMemory: (
    plugin: Plugin,
    memoryConfig: MemoryConfig
  ) => TaskEither<Error, Plugin>
}
```

### **2. Plugin Architecture Framework**

```typescript
// Создание плагина
const createPlugin = (
  config: PluginConfig,
  spec: PluginSpec
): TaskEither<Error, Plugin> => {
  return pipe(
    // Валидация конфигурации
    validatePluginConfig(config),

    // Создание базовой структуры
    chain(createBaseStructure),

    // Генерация package.json
    chain(generatePackageJson),

    // Создание TypeScript конфигурации
    chain(generateTSConfig),

    // Настройка build процесса
    chain(setupBuildProcess),

    map((structure) => ({
      name: config.name,
      version: config.version,
      description: config.description,
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      actions: structure.actions,
      providers: structure.providers,
      services: structure.services,
      router: structure.router,
     初始化: structure.initialize,
      tests: structure.tests
    }))
  )
}

// Структура плагина
const createBaseStructure = (
  config: PluginConfig
): TaskEither<Error, PluginStructure> => {
  return right({
    // Actions - обработчики сообщений
    actions: createActions(config),

    // Providers - интеграции с внешними сервисами
    providers: createProviders(config),

    // Services - бизнес-логика
    services: createServices(config),

    // Router - HTTP endpoints
    router: createRouter(config),

    // Memory - управление контекстом
    memory: createMemoryManager(config),

    // Tests - тестирование
    tests: createTests(config),

    // Index - точка входа
    index: generateIndexFile(config)
  })
}
```

### **3. Action System Implementation**

```typescript
// Создание actions
const createActions = (config: PluginConfig): Action[] => {
  return [
    // Example Action 1: Generate Content
    {
      name: 'GENERATE_CONTENT',
      description: 'Generate content using AI',
      similes: ['CREATE_CONTENT', 'MAKE_CONTENT', 'GENERATE_TEXT'],
      examples: [
        {
          user: 'Generate a blog post about AI',
          content: 'I will generate a comprehensive blog post about artificial intelligence, covering key concepts, applications, and future trends.'
        }
      ],

      validate: async (runtime: IAgentRuntime, message: Memory) => {
        const text = message.content.text.toLowerCase()
        return text.includes('generate') && (
          text.includes('content') ||
          text.includes('article') ||
          text.includes('blog')
        )
      },

      handler: async (runtime: IAgentRuntime, message: Memory, state: State, options: any) => {
        return await pipe(
          // Extract parameters from message
          extractParameters(message.content.text),

          // Generate content using provider
          chain(async (params) => {
            const provider = runtime.getProvider('ai-provider')
            return await provider.generateContent(params)
          }),

          // Save to memory
          map((content) => {
            runtime.memoryManager.createMemory({
              id: generateId(),
              content: content,
              agentId: runtime.agentId,
              roomId: message.roomId,
              createdAt: new Date()
            })
            return content
          })
        )(right({}))
      },

      // Schema for parameters
      schema: z.object({
        topic: z.string().min(1, 'Topic is required'),
        style: z.enum(['formal', 'casual', 'technical']).default('casual'),
        length: z.enum(['short', 'medium', 'long']).default('medium')
      })
    },

    // Example Action 2: Process Data
    {
      name: 'PROCESS_DATA',
      description: 'Process and analyze data',
      similes: ['ANALYZE_DATA', 'PROCESS_INFORMATION', 'WORK_WITH_DATA'],
      examples: [
        {
          user: 'Analyze this sales data',
          content: 'I will analyze your sales data to identify trends and insights.'
        }
      ],

      validate: (runtime: IAgentRuntime, message: Memory) => {
        const text = message.content.text.toLowerCase()
        return text.includes('analyze') || text.includes('process')
      },

      handler: async (runtime: IAgentRuntime, message: Memory, state: State, options: any) => {
        const dataProvider = runtime.getProvider('data-provider')
        return await dataProvider.processData(message.content.text)
      },

      schema: z.object({
        data: z.string().min(1, 'Data is required'),
        operation: z.enum(['summarize', 'analyze', 'transform']).default('analyze')
      })
    }
  ]
}
```

---

## 🔌 Provider Pattern

### **1. External Service Integration**

```typescript
// Создание provider
const createProvider = (config: ProviderConfig): Provider => {
  return {
    // Уникальный идентификатор провайдера
    getId: () => config.id,

    // Проверка готовности к работе
    canHandle: (message: string) => {
      return message.toLowerCase().includes(config.triggerKeyword)
    },

    // Обработка сообщения
    handle: async (message: string, state: State) => {
      return await pipe(
        // Аутентификация
        authenticate(config),

        // Выполнение запроса
        chain(executeRequest(message, config)),

        // Обработка ответа
        map(processResponse)
      )(right({}))
    },

    // Метаданные провайдера
    metadata: {
      name: config.name,
      description: config.description,
      version: config.version,
      supportedFeatures: config.features,
      rateLimit: config.rateLimit
    }
  }
}

// Пример: AI Provider
const createAIProvider = (config: AIConfig): Provider => {
  return {
    getId: () => 'ai-provider',

    canHandle: (message: string) => {
      return message.startsWith('/ai ') || message.includes('generate')
    },

    handle: async (message: string, state: State) => {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('OpenAI API key not configured')
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4',
          messages: [
            { role: 'system', content: state.systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: config.temperature || 0.7,
          max_tokens: config.maxTokens || 2000
        })
      })

      const data = await response.json()
      return data.choices[0].message.content
    },

    metadata: {
      name: 'OpenAI GPT Provider',
      description: 'AI content generation using OpenAI GPT',
      version: '1.0.0',
      supportedFeatures: ['text-generation', 'conversation', 'analysis'],
      rateLimit: {
        requests: 100,
        period: '1h'
      }
    }
  }
}
```

### **2. Database Provider**

```typescript
// Database Provider
const createDatabaseProvider = (config: DatabaseConfig): Provider => {
  return {
    getId: () => 'database-provider',

    canHandle: (message: string) => {
      return message.includes('database') || message.includes('db')
    },

    handle: async (message: string, state: State) => {
      const { type, query } = parseDatabaseQuery(message)

      switch (type) {
        case 'SELECT':
          return await executeSelectQuery(query, config)

        case 'INSERT':
          return await executeInsertQuery(query, config)

        case 'UPDATE':
          return await executeUpdateQuery(query, config)

        case 'DELETE':
          return await executeDeleteQuery(query, config)

        default:
          throw new Error(`Unsupported query type: ${type}`)
      }
    },

    metadata: {
      name: 'Database Provider',
      description: 'Database operations and queries',
      version: '1.0.0',
      supportedFeatures: ['select', 'insert', 'update', 'delete'],
      rateLimit: {
        requests: 1000,
        period: '1h'
      }
    }
  }
}
```

---

## 🛠️ Service Layer

### **1. Service Architecture**

```typescript
// Создание service
const createService = <T>(spec: ServiceSpec<T>): Service => {
  return {
    // Уникальный идентификатор
    id: spec.id,

    // Инициализация service
    initialize: async (runtime: IAgentRuntime) => {
      await spec.init(runtime)
      return spec.state
    },

    // Lifecycle methods
    start: async () => {
      await spec.start()
    },

    stop: async () => {
      await spec.stop()
    },

    // Health check
    health: async () => {
      return await spec.healthCheck()
    },

    // Service methods
    ...spec.methods
  }
}

// Пример: User Management Service
const createUserManagementService = (config: UserConfig): Service => {
  return {
    id: 'user-management',

    initialize: async (runtime: IAgentRuntime) => {
      const state = {
        users: new Map(),
        sessions: new Map()
      }
      return state
    },

    start: async () => {
      console.log('User management service started')
    },

    stop: async () => {
      console.log('User management service stopped')
    },

    health: async () => {
      return {
        status: 'healthy',
        uptime: process.uptime(),
        users: /* get user count */
      }
    },

    // Service methods
    createUser: async (userData: UserData) => {
      return {
        id: generateId(),
        ...userData,
        createdAt: new Date()
      }
    },

    getUser: async (userId: string) => {
      return /* get user by id */
    },

    updateUser: async (userId: string, updates: Partial<UserData>) => {
      return /* update user */
    },

    deleteUser: async (userId: string) => {
      return /* delete user */
    },

    listUsers: async () => {
      return /* list all users */
    }
  }
}
```

### **2. State Management**

```typescript
// Service with state
const createStatefulService = <T, S>(
  spec: ServiceSpec<T>,
  initialState: S
): StatefulService<T, S> => {
  let state = initialState

  return {
    ...spec,

    // Get current state
    getState: () => state,

    // Update state
    setState: (newState: S) => {
      state = newState
    },

    // Update state immutably
    updateState: (updater: (state: S) => S) => {
      state = updater(state)
    },

    // Subscribe to state changes
    onStateChange: (callback: (state: S) => void) => {
      // Implementation for state change listeners
    }
  }
}
```

---

## 🔄 Event-Driven Architecture

### **1. Event System**

```typescript
// Event emitter
const createEventSystem = (): EventSystem => {
  const listeners = new Map<string, Set<(data: any) => void>>()

  return {
    // Subscribe to event
    on: (event: string, callback: (data: any) => void) => {
      if (!listeners.has(event)) {
        listeners.set(event, new Set())
      }
      listeners.get(event)!.add(callback)

      // Return unsubscribe function
      return () => {
        listeners.get(event)?.delete(callback)
      }
    },

    // Emit event
    emit: (event: string, data: any) => {
      const callbacks = listeners.get(event)
      callbacks?.forEach(callback => callback(data))
    },

    // Remove all listeners
    removeAllListeners: (event?: string) => {
      if (event) {
        listeners.delete(event)
      } else {
        listeners.clear()
      }
    }
  }
}

// Service with events
const createEventService = (config: EventConfig): Service => {
  const eventSystem = createEventSystem()

  return {
    id: 'event-service',

    initialize: async (runtime: IAgentRuntime) => {
      // Subscribe to agent events
      runtime.on('message', (data) => {
        eventSystem.emit('message-received', data)
      })

      runtime.on('action', (data) => {
        eventSystem.emit('action-executed', data)
      })
    },

    start: async () => {
      console.log('Event service started')
    },

    stop: async () => {
      eventSystem.removeAllListeners()
    },

    // Event methods
    publish: (event: string, data: any) => {
      eventSystem.emit(event, data)
    },

    subscribe: (event: string, callback: (data: any) => void) => {
      return eventSystem.on(event, callback)
    }
  }
}
```

---

## 📡 Router & HTTP Endpoints

### **1. HTTP Router**

```typescript
// Создание router
const createRouter = (config: RouterConfig): Router => {
  const router = express.Router()

  // Middleware
  router.use(express.json())
  router.use(cors())
  router.use(rateLimit(config.rateLimit))

  // Routes
  router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() })
  })

  router.get('/status', async (req, res) => {
    const status = await getServiceStatus()
    res.json(status)
  })

  // Webhook endpoint
  router.post('/webhook', async (req, res) => {
    try {
      const { event, data } = req.body

      // Process webhook
      await processWebhook(event, data)

      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // API endpoint
  router.get('/api/data', async (req, res) => {
    const data = await getData(req.query)
    res.json(data)
  })

  router.post('/api/action', async (req, res) => {
    const result = await executeAction(req.body)
    res.json(result)
  })

  return router
}
```

### **2. WebSocket Support**

```typescript
// WebSocket integration
const createWebSocketService = (config: WSConfig): Service => {
  const clients = new Set<WebSocket>()

  return {
    id: 'websocket-service',

    initialize: async (runtime: IAgentRuntime) => {
      const wss = new WebSocket.Server({ port: config.port })

      wss.on('connection', (ws: WebSocket) => {
        clients.add(ws)

        ws.on('message', async (message: string) => {
          try {
            const data = JSON.parse(message)
            const response = await processMessage(data)
            ws.send(JSON.stringify(response))
          } catch (error) {
            ws.send(JSON.stringify({ error: error.message }))
          }
        })

        ws.on('close', () => {
          clients.delete(ws)
        })
      })
    },

    // Broadcast to all clients
    broadcast: (data: any) => {
      const message = JSON.stringify(data)
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    },

    // Send to specific client
    send: (clientId: string, data: any) => {
      // Implementation for targeting specific client
    }
  }
}
```

---

## 💾 Memory System

### **1. Memory Manager**

```typescript
// Memory manager
const createMemoryManager = (config: MemoryConfig): MemoryManager => {
  return {
    // Create memory
    createMemory: async (memory: Memory) => {
      await validateMemory(memory)
      await storeMemory(memory)
      return memory
    },

    // Get memories
    getMemories: async (criteria: MemoryCriteria) => {
      return await searchMemories(criteria)
    },

    // Update memory
    updateMemory: async (id: string, updates: Partial<Memory>) => {
      return await updateMemoryById(id, updates)
    },

    // Delete memory
    deleteMemory: async (id: string) => {
      return await deleteMemoryById(id)
    },

    // Search by similarity
    searchBySimilarity: async (query: string, limit: number = 10) => {
      return await searchSimilarMemories(query, limit)
    },

    // Get recent memories
    getRecentMemories: async (limit: number = 100) => {
      return await getMemoriesByDate(new Date(Date.now() - 86400000), limit)
    }
  }
}
```

### **2. Context Extraction**

```typescript
// Context manager
const createContextManager = (): ContextManager => {
  return {
    // Extract context from messages
    extractContext: async (messages: Memory[]) => {
      return {
        // Topic analysis
        topics: extractTopics(messages),

        // Sentiment analysis
        sentiment: analyzeSentiment(messages),

        // Key entities
        entities: extractEntities(messages),

        // User intent
        intent: determineIntent(messages),

        // Summary
        summary: summarizeContext(messages)
      }
    },

    // Build conversation state
    buildState: async (messages: Memory[], agent: Agent) => {
      const context = await extractContext(messages)

      return {
        messages,
        context,
        agentProfile: agent.profile,
        capabilities: agent.capabilities,
        systemPrompt: agent.settings?.systemPrompt
      }
    },

    // Update context dynamically
    updateContext: async (context: Context, newMessage: Memory) => {
      const updatedMessages = [...context.messages, newMessage]
      return await extractContext(updatedMessages)
    }
  }
}
```

---

## 🔗 Integration with Agent Ecosystem

### **1. Agent Registration**

```typescript
// Регистрация агента в системе
const registerAgent = (
  agent: Agent,
  runtime: IAgentRuntime
): TaskEither<Error, RegistrationResult> => {
  return pipe(
    // Валидация агента
    validateAgent(agent),

    // Регистрация в runtime
    chain(() => runtime.registerAgent(agent)),

    // Инициализация компонентов
    chain(() => initializeAgentComponents(agent, runtime)),

    // Настройка памяти
    chain(() => setupAgentMemory(agent, runtime)),

    map((result) => ({
      agentId: agent.id,
      status: 'registered',
      capabilities: agent.capabilities,
      actions: agent.actions?.length || 0,
      providers: agent.providers?.length || 0
    }))
  )
}
```

### **2. Plugin Ecosystem**

```typescript
// Создание экосистемы плагинов
const createPluginEcosystem = (
  plugins: Plugin[]
): PluginEcosystem => {
  return {
    // Plugin registry
    registry: new Map(plugins.map(p => [p.name, p])),

    // Install plugin
    install: async (plugin: Plugin) => {
      await validatePlugin(plugin)
      pluginRegistry.set(plugin.name, plugin)
      return plugin
    },

    // Uninstall plugin
    uninstall: async (pluginName: string) => {
      const plugin = pluginRegistry.get(pluginName)
      if (plugin) {
        await plugin.cleanup()
        pluginRegistry.delete(pluginName)
      }
    },

    // Get plugin
    get: (pluginName: string) => {
      return pluginRegistry.get(pluginName)
    },

    // List all plugins
    list: () => {
      return Array.from(pluginRegistry.values())
    },

    // Reload plugin
    reload: async (pluginName: string) => {
      const plugin = pluginRegistry.get(pluginName)
      if (plugin) {
        await plugin.reload()
      }
    }
  }
}
```

---

## 🔄 Version 2.0.45+ Features

### **Новое в v2.0.45:**
- ✅ **Advanced Plugin Architecture** - модульная архитектура плагинов
- ✅ **Action Chain System** - цепочки действий
- ✅ **Provider Ecosystem** - экосистема провайдеров
- ✅ **Event-Driven Services** - событийные сервисы
- ✅ **Memory Intelligence** - интеллектуальная память

### **v2.0.46 Planned Features:**
- 🔄 **Auto-Scaling Services** - авто-масштабирование сервисов
- 🔄 **Distributed Plugin Architecture** - распределенная архитектура
- 🔄 **AI-Powered Actions** - AI-генерируемые actions
- 🔄 **Cross-Plugin Communication** - межплагинное взаимодействие
- 🔄 **Plugin Marketplace** - маркетплейс плагинов

---

## 💡 Best Practices

### **1. Plugin Development**
- ✅ **Single Responsibility** - каждый плагин решает одну задачу
- ✅ **Dependency Injection** - инверсия зависимостей
- ✅ **Interface Segregation** - разделение интерфейсов
- ✅ **Error Boundaries** - обработка ошибок
- ✅ **Async/Await** - асинхронность

### **2. Action Design**
- ✅ **Clear Intent** - понятные намерения
- ✅ **Input Validation** - валидация входных данных
- ✅ **Atomic Operations** - атомарные операции
- ✅ **Graceful Degradation** - graceful обработка ошибок
- ✅ **Idempotency** - идемпотентность

### **3. Provider Pattern**
- ✅ **Service Abstraction** - абстракция сервисов
- ✅ **Configuration Management** - управление конфигурацией
- ✅ **Rate Limiting** - ограничение запросов
- ✅ **Retry Logic** - логика повторных попыток
- ✅ **Circuit Breaker** - автоматический выключатель

### **4. Service Architecture**
- ✅ **Stateless Services** - без состояния
- ✅ **Health Checks** - проверки здоровья
- ✅ **Lifecycle Management** - управление жизненным циклом
- ✅ **Resource Management** - управление ресурсами
- ✅ **Monitoring Integration** - интеграция мониторинга

---

## 🎓 Professional Competencies

### **Core Expertise:**
1. **ElizaOS Architecture** - глубокое понимание фреймворка
2. **Plugin Development** - разработка плагинов
3. **Action System** - система действий
4. **Provider Pattern** - паттерн провайдера
5. **Service Design** - проектирование сервисов

### **Technical Skills:**
- **@elizaos/core** - основной фреймворк
- **TypeScript** - типизированная разработка
- **Zod** - схема валидации
- **Express.js** - HTTP серверы
- **WebSockets** - двустороннее общение
- **Event Systems** - событийные системы
- **Memory Management** - управление памятью

---

*VIBE-ELIZAOS: Превращаем идеи в мощные плагины и действия! ⚡✨*

**ElizaOS Framework Expert - От плагина к экосистеме! 🔌⚙️**
