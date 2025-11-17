# 🐛 Troubleshooting Guide

**Руководство по устранению типовых проблем системы агентов**

---

## 🔍 Диагностика Агентов

### Автоматическая диагностика

```typescript
const diagnoseSystem = async (): TaskEither<Error, DiagnosisReport> => {
  return pipe(
    checkAgentHealth(),
    combine(checkDatabaseConnection()),
    combine(checkMemoryUsage()),
    map(([agents, db, memory]) => ({
      overall: agents.status === 'OK' && db.connected && memory.usage < 80,
      agents,
      database: db,
      memory,
      recommendations: generateRecommendations({ agents, db, memory })
    }))
  )
}
```

---

## 🚨 Типовые Проблемы

### 1️⃣ Агент не регистрируется в рое

**Симптомы**:
- Агент не появляется в списке доступных агентов
- Задачи не распределяются на агента
- Ошибки "Agent not found"

**Решение**:
```typescript
// 1. Проверить подключение к БД
const checkDb = async (): TaskEither<Error, boolean> => {
  try {
    const result = await db.query('SELECT 1')
    return right(result.length > 0)
  } catch (error) {
    return left(new Error(`Database connection failed: ${error}`))
  }
}

// 2. Проверить правильность queenId
const validateQueenId = (agent: Agent): Either<Error, Agent> => {
  if (!agent.queenId) {
    return left(new Error('Queen ID is required'))
  }
  return right(agent)
}

// 3. Проверить инициализацию агента
const initializeAgent = async (config: AgentConfig): TaskEither<Error, Agent> => {
  return pipe(
    validateQueenId(config),
    eitherToTaskEither,
    chainTaskEither(registerWithQueen),
    tapTaskEither(agent => logger.info(`Agent ${agent.id} registered`))
  )
}
```

**Чек-лист**:
- [ ] Проверить подключение к БД
- [ ] Проверить правильность `queenId`
- [ ] Проверить логи инициализации агента
- [ ] Убедиться, что агент вызвал `registerWithQueen`
- [ ] Проверить права доступа к БД

---

### 2️⃣ Ошибки валидации Zod

**Симптомы**:
- `ZodError` при валидации входных данных
- Ошибки типов TypeScript
- Некорректные данные в базе

**Решение**:
```typescript
// 1. Правильная схема с optional полями
const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email().optional(),
  age: z.number().int().positive().optional(),
})

// 2. Валидация с обработкой ошибок
const validateUser = (data: unknown): TaskEither<Error, User> => {
  const result = UserSchema.safeParse(data)
  return result.success
    ? right(result.data)
    : left(new Error(`Validation failed: ${result.error.message}`))
}

// 3. Использование default значений
const ConfigSchema = z.object({
  timeout: z.number().default(30000),
  retries: z.number().default(3),
  debug: z.boolean().default(false),
})
```

**Чек-лист**:
- [ ] Проверить схему Zod на соответствие данным
- [ ] Добавить `.optional()` для необязательных полей
- [ ] Использовать `.default()` для значений по умолчанию
- [ ] Проверить типы данных перед валидацией
- [ ] Логировать ошибки валидации для отладки

---

### 3️⃣ Ошибки базы данных (ORM)

**Симптомы**:
- Ошибки при запросах к БД
- `Connection refused`
- Таймауты запросов
- Deadlock ошибки

**Решение**:
```typescript
// 1. Проверка подключения
const checkDatabaseConnection = async (): TaskEither<Error, DatabaseStatus> => {
  try {
    const start = Date.now()
    await db.query('SELECT 1')
    const latency = Date.now() - start

    return right({
      connected: true,
      latency,
      status: latency < 100 ? 'OK' : 'SLOW'
    })
  } catch (error) {
    return left(new Error(`Database error: ${error}`))
  }
}

// 2. Транзакции с retry
const executeWithRetry = <T>(
  operation: () => Promise<T>,
  retries: number = 3
): TaskEither<Error, T> => {
  return retry(
    async () => {
      const result = await db.transaction(operation)
      return right(result)
    },
    retries
  )
}

// 3. Проверка схемы
const validateSchema = async (): TaskEither<Error, boolean> => {
  const tables = await db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `)

  const requiredTables = ['agents', 'tasks', 'users']
  const missingTables = requiredTables.filter(
    t => !tables.find(table => table.table_name === t)
  )

  if (missingTables.length > 0) {
    return left(new Error(`Missing tables: ${missingTables.join(', ')}`))
  }

  return right(true)
}
```

**Чек-лист**:
- [ ] Проверить подключение к БД (`DATABASE_URL`)
- [ ] Проверить правильность схемы Drizzle
- [ ] Убедиться, что таблицы созданы в БД
- [ ] Проверить права доступа к БД
- [ ] Проверить производительность запросов

---

### 4️⃣ Баланс не списывается

**Симптомы**:
- Операция выполняется, но баланс не изменяется
- Неконсистентные данные
- Ошибки транзакций

**Решение**:
```typescript
// 1. Атомарное списание баланса
const deductBalanceAtomically = async (
  userId: string,
  amount: number
): TaskEither<Error, User> => {
  return async () => {
    try {
      const result = await db.transaction(async (trx) => {
        // Проверяем баланс
        const user = await trx.query(
          'SELECT * FROM users WHERE id = $1 FOR UPDATE',
          [userId]
        )

        if (!user) {
          throw new Error('User not found')
        }

        if (user.balance < amount) {
          throw new Error('Insufficient balance')
        }

        // Списываем баланс
        const updated = await trx.query(
          'UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING *',
          [amount, userId]
        )

        return right(updated[0])
      })

      return result
    } catch (error) {
      return left(error as Error)
    }
  }
}

// 2. Проверка консистентности
const checkBalanceConsistency = async (userId: string): TaskEither<Error, boolean> => {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])

  const operations = await db.query(
    'SELECT SUM(amount) as total FROM balance_operations WHERE user_id = $1',
    [userId]
  )

  const expectedBalance = 1000 - (operations[0]?.total || 0) // Начальный баланс минус операции

  return user.balance === expectedBalance
    ? right(true)
    : left(new Error(`Balance inconsistency: ${user.balance} !== ${expectedBalance}`))
}
```

**Чек-лист**:
- [ ] Проверить использование транзакций Drizzle
- [ ] Убедиться в атомарности операции
- [ ] Проверить логику `deductBalanceAtomically`
- [ ] Проверить наличие достаточного баланса
- [ ] Проверить консистентность данных

---

### 5️⃣ Агент не получает задачи

**Симптомы**:
- Задачи не распределяются на агента
- Агент в статусе `idle`, но не получает задачи
- Задачи накапливаются в очереди

**Решение**:
```typescript
// 1. Проверка статуса агента
const checkAgentStatus = async (agentId: string): TaskEither<Error, AgentStatus> => {
  const agent = await db.query('SELECT * FROM agents WHERE id = $1', [agentId])

  return right({
    id: agent.id,
    status: agent.status,
    loadPercentage: agent.load_percentage,
    specialties: agent.specialties,
    isAvailable: agent.status === 'idle' && agent.load_percentage < 80
  })
}

// 2. Перераспределение задач
const redistributeTasks = async (): TaskEither<Error, Task[]> => {
  return pipe(
    getIdleAgents,
    combine(getPendingTasks),
    chainTaskEither(([agents, tasks]) => {
      // Распределяем задачи по специализации и загрузке
      const distribution = assignTasksByLoad(agents, tasks)
      return executeDistribution(distribution)
    })
  )
}

// 3. Оптимизация загрузки
const balanceAgentLoad = async (): TaskEither<Error, boolean> => {
  const agents = await getAllAgents()

  const overloaded = agents.filter(a => a.load_percentage > 80)
  const underloaded = agents.filter(a => a.load_percentage < 50)

  if (overloaded.length === 0 || underloaded.length === 0) {
    return right(true) // Баланс в норме
  }

  // Перераспределяем задачи
  return pipe(
    getTasksForRedistribution(overloaded),
    chainTaskEither(tasks => reassignTasks(tasks, underloaded))
  )
}
```

**Чек-лист**:
- [ ] Проверить статус агента (`idle` или `busy`)
- [ ] Проверить специализации агента
- [ ] Проверить загрузку агента (`load_percentage < 80`)
- [ ] Проверить логи королевы
- [ ] Перераспределить задачи при дисбалансе

---

### 6️⃣ Высокое потребление памяти

**Симптомы**:
- `OutOfMemoryError`
- Замедление работы агентов
- Частые сборки мусора

**Решение**:
```typescript
// 1. Мониторинг памяти
const monitorMemory = async (): TaskEither<Error, MemoryStats> => {
  const usage = process.memoryUsage()

  return right({
    heapUsed: usage.heapUsed,
    heapTotal: usage.heapTotal,
    external: usage.external,
    arrayBuffers: usage.arrayBuffers,
    percentage: (usage.heapUsed / usage.heapTotal) * 100
  })
}

// 2. Очистка кэша
const clearCache = (): TaskEither<Error, void> => {
  cache.clear()
  return right(void 0)
}

// 3. Принудительная сборка мусора (только для debug)
const forceGarbageCollection = (): TaskEither<Error, void> => {
  if (global.gc) {
    global.gc()
    return right(void 0)
  }
  return left(new Error('Garbage collection not available'))
}

// 4. Оптимизация кэша
const optimizeCache = (): TaskEither<Error, CacheStats> => {
  const stats = cache.getStats()
  const unused = Object.entries(stats.entries)
    .filter(([_, entry]) => entry.lastAccessed < Date.now() - 3600000) // 1 час

  unused.forEach(([key]) => cache.delete(key))

  return right({
    cleared: unused.length,
    remaining: cache.size()
  })
}
```

**Чек-лист**:
- [ ] Мониторить использование памяти
- [ ] Очищать кэш регулярно
- [ ] Избегать утечек памяти
- [ ] Оптимизировать хранение данных
- [ ] Использовать streaming для больших данных

---

## 🛠️ Утилиты Диагностики

### Проверка здоровья системы

```typescript
const healthCheck = async (): TaskEither<Error, HealthReport> => {
  return pipe(
    checkDatabaseConnection,
    combine(checkRedisConnection),
    combine(checkAgentStatuses),
    combine(checkMemoryUsage),
    map(([db, redis, agents, memory]) => ({
      overall: db.connected && redis.connected && agents.healthy && memory.percentage < 80,
      database: db,
      redis,
      agents,
      memory,
      timestamp: new Date().toISOString()
    }))
  )
}
```

### Сбор логов ошибок

```typescript
const collectErrorLogs = async (hours: number = 24): TaskEither<Error, ErrorLog[]> => {
  const since = new Date(Date.now() - hours * 3600000)

  return pipe(
    getLogsSince(since),
    map(logs => logs.filter(log => log.level === 'ERROR')),
    tapTaskEither(logs => {
      if (logs.length > 0) {
        logger.warn(`Found ${logs.length} errors in last ${hours} hours`)
      }
    })
  )
}
```

### Автоматическое исправление

```typescript
const autoFix = async (): TaskEither<Error, FixReport> => {
  return pipe(
    diagnoseSystem,
    chainTaskEither(diagnosis => {
      const fixes = []

      // Исправляем проблемы с базой
      if (!diagnosis.database.connected) {
        fixes.push(restartDatabase())
      }

      // Перезапускаем агентов
      if (diagnosis.agents.unhealthy > 0) {
        fixes.push(restartUnhealthyAgents())
      }

      // Очищаем память
      if (diagnosis.memory.percentage > 80) {
        fixes.push(clearCache())
      }

      return combineAll(fixes)
    }),
    tapTaskEither(results => {
      logger.info(`Auto-fix completed: ${results.length} fixes applied`)
    })
  )
}
```

---

## 📊 Мониторинг и Алерты

### Настройка алертов

```typescript
const setupAlerts = (): void => {
  // Ошибки базы данных
  monitor('database_errors')
    .threshold(5, '5 minutes')
    .action(() => sendAlert('Database errors threshold exceeded'))

  // Высокая загрузка агентов
  monitor('agent_load')
    .threshold(90, '1 minute')
    .action(() => sendAlert('Agent load too high'))

  // Память
  monitor('memory_usage')
    .threshold(85, '5 minutes')
    .action(() => sendAlert('Memory usage critical'))
}
```

---

## 📚 Полезные Команды

### Диагностика агентов
```bash
# Проверить статус всех агентов
/task diagnostic agents --status

# Проверить загрузку агентов
/task diagnostic agents --load

# Перезапустить агента
/task diagnostic agents --restart <agent-id>

# Проверить базу данных
/task diagnostic database --health
```

### Мониторинг системы
```bash
# Показать метрики системы
/task diagnostic metrics

# Очистить кэш
/task diagnostic cache --clear

# Перезагрузить конфигурацию
/task diagnostic config --reload
```

---

## 🎯 Лучшие Практики

1. **Всегда используйте TaskEither** для обработки ошибок
2. **Логируйте все операции** для упрощения диагностики
3. **Мониторьте метрики** регулярно
4. **Настройте алерты** для критических проблем
5. **Документируйте решения** проблем
6. **Автоматизируйте исправления** типовых проблем
7. **Тестируйте нагрузку** перед продакшеном
8. **Регулярно обновляйте** зависимости

---

*Удачной диагностики! 🐝✨*
