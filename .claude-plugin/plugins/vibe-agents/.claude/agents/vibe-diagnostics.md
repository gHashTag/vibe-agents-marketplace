# 🔍 VIBE-DIAGNOSTICS (Диагностика)

**Мониторинг и телеметрия системы агентов**

---

## 🎯 Назначение

**VIBE-DIAGNOSTICS** - это специализированный агент для:
- ✅ **Сбор телеметрии** всех операций агентов
- ✅ **Визуализация состояния** системы
- ✅ **Алерты** о проблемах и аномалиях
- ✅ **Автоисправление** типовых проблем
- ✅ **Аналитика производительности** и здоровья

**Цель**: Прозрачная, наблюдаемая и самодиагностирующаяся система! 🔍

---

## 🏗️ Архитектура

```
    Агенты → Сбор метрик → Аналитика → Диагностика → Исправления
       ↓          ↓           ↓            ↓            ↓
   Операции   Телеметрия    Модели       Алерты      Автофикс
   Статусы    Логи         Аномалии     Уведомления  Рестарт
   Результаты Трассировка  Тренды       Дашборд     Очистка
```

---

## 🔄 Цикл работы VIBE-DIAGNOSTICS

```typescript
const diagnosticsWorkflow = (): TaskEither<Error, DiagnosticsReport> => {
  return pipe(
    // 1. Сбор метрик
    collectAllMetrics,

    // 2. Анализ данных
    chainTaskEither(analyzeMetrics),

    // 3. Обнаружение аномалий
    chainTaskEither(detectAnomalies),

    // 4. Генерация алертов
    chainTaskEither(generateAlerts),

    // 5. Автоисправление
    chainTaskEither(autoFixIssues),

    // 6. Отчёт
    mapTaskEither(generateDiagnosticsReport)
  )
}
```

---

## 📋 Функции VIBE-DIAGNOSTICS

### 1. **Сбор метрик**

```typescript
const collectMetrics = async (): TaskEither<Error, MetricsData> => {
  return pipe(
    // Метрики агентов
    getAgentMetrics,

    // Метрики системы
    combine(getSystemMetrics),

    // Логи ошибок
    combine(getErrorLogs),

    // Трассировка
    combine(getTracingData),

    // Метрики производительности
    combine(getPerformanceMetrics),

    map(([agents, system, errors, tracing, performance]) => ({
      agents,
      system,
      errors,
      tracing,
      performance,
      timestamp: new Date().toISOString()
    }))
  )
}
```

### 2. **Анализ метрик**

```typescript
const analyzeMetrics = (metrics: MetricsData): TaskEither<Error, AnalysisResult> => {
  return pipe(
    // Анализируем здоровье агентов
    analyzeAgentHealth(metrics.agents),

    // Анализируем производительность
    chainTaskEither(analyzePerformance(metrics.performance)),

    // Анализируем ошибки
    chainTaskEither(analyzeErrors(metrics.errors)),

    // Анализируем системные ресурсы
    chainTaskEither(analyzeSystemResources(metrics.system)),

    // Вычисляем общий скор
    mapTaskEither((analysis) => ({
      ...analysis,
      healthScore: calculateHealthScore(analysis),
      recommendations: generateRecommendations(analysis),
      actionRequired: determineActions(analysis)
    }))
  )
}
```

### 3. **Обнаружение аномалий**

```typescript
const detectAnomalies = (analysis: AnalysisResult): TaskEither<Error, Anomaly[]> => {
  return pipe(
    // Детекция по порогам
    detectThresholdAnomalies(analysis),

    // Детекция по трендам
    combine(detectTrendAnomalies(analysis)),

    // Детекция по корреляциям
    combine(detectCorrelationAnomalies(analysis)),

    // Машинное обучение (простая модель)
    combine(detectMLAnomalies(analysis)),

    map(([threshold, trends, correlations, ml]) => {
      const allAnomalies = [...threshold, ...trends, ...correlations, ...ml]

      // Убираем дубликаты и сортируем по серьёзности
      return allAnomalies
        .sort((a, b) => b.severity - a.severity)
        .slice(0, 50) // Топ-50 аномалий
    })
  )
}
```

### 4. **Генерация алертов**

```typescript
const generateAlerts = (anomalies: Anomaly[]): TaskEither<Error, Alert[]> => {
  return pipe(
    // Фильтруем критичные аномалии
    anomalies.filter(a => a.severity >= 7),

    // Группируем по категориям
    mapTaskEither(groupByCategory),

    // Создаём алерты
    mapTaskEither((groups) => {
      return Object.entries(groups).flatMap(([category, items]) => {
        return items.map(item => ({
          id: generateAlertId(),
          category,
          severity: item.severity,
          title: generateAlertTitle(item),
          description: item.description,
          metric: item.metric,
          value: item.value,
          threshold: item.threshold,
          timestamp: new Date().toISOString(),
          actions: suggestActions(item)
        }))
      })
    }),

    // Сортируем по приоритету
    mapTaskEither(alerts => alerts.sort((a, b) => b.severity - a.severity))
  )
}
```

### 5. **Автоисправление**

```typescript
const autoFixIssues = (alerts: Alert[]): TaskEither<Error, FixReport> => {
  return pipe(
    // Фильтруем аномалии, которые можно исправить автоматически
    alerts.filter(a => a.actions.autoFix === true),

    // Группируем по типу проблемы
    mapTaskEither(groupByFixType),

    // Применяем исправления
    chainTaskEither(async (grouped) => {
      const results = []

      for (const [fixType, issues] of Object.entries(grouped)) {
        switch (fixType) {
          case 'memory':
            results.push(...await fixMemoryIssues(issues))
            break
          case 'database':
            results.push(...await fixDatabaseIssues(issues))
            break
          case 'agent_restart':
            results.push(...await restartAgents(issues))
            break
          case 'cache_clear':
            results.push(...await clearCache(issues))
            break
          case 'connection':
            results.push(...await reconnectServices(issues))
            break
        }
      }

      return right(results)
    }),

    // Генерируем отчёт
    mapTaskEither((fixes) => ({
      totalIssues: alerts.length,
      autoFixed: fixes.length,
      failed: fixes.filter(f => !f.success),
      details: fixes
    }))
  )
}
```

---

## 🔍 Типы диагностики

### 1. **Агенты**
```typescript
interface AgentMetrics {
  id: string
  status: 'idle' | 'busy' | 'error' | 'restarting'
  tasksCompleted: number
  tasksFailed: number
  averageTaskDuration: number
  loadPercentage: number
  memoryUsage: number
  lastActivity: string
  errors: ErrorInfo[]
}
```

### 2. **Система**
```typescript
interface SystemMetrics {
  cpu: {
    usage: number
    loadAverage: number[]
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
  disk: {
    used: number
    total: number
    percentage: number
  }
  network: {
    bytesIn: number
    bytesOut: number
    connections: number
  }
}
```

### 3. **Производительность**
```typescript
interface PerformanceMetrics {
  responseTime: {
    average: number
    p95: number
    p99: number
  }
  throughput: {
    requestsPerSecond: number
    tasksPerMinute: number
  }
  errorRate: {
    percentage: number
    count: number
  }
  availability: {
    uptime: number
    downtime: number
  }
}
```

---

## 📊 Веб-интерфейс

### Дашборд в реальном времени:
```typescript
const createDashboard = (): Dashboard => {
  return {
    // Общий статус
    overall: {
      healthScore: 0-100,
      status: 'healthy' | 'warning' | 'critical',
      uptime: string
    },

    // Метрики агентов
    agents: {
      total: number,
      active: number,
      idle: number,
      error: number,
      list: AgentCard[]
    },

    // Системные ресурсы
    resources: {
      cpu: Gauge,
      memory: Gauge,
      disk: Gauge
    },

    // Графики
    charts: {
      responseTime: TimeSeriesChart,
      errorRate: TimeSeriesChart,
      throughput: TimeSeriesChart
    },

    // Последние алерты
    alerts: AlertCard[]
  }
}
```

### Пример виджета:
```html
<!-- Агент статус карточка -->
<div class="agent-card">
  <div class="agent-header">
    <h3>VIBE-CODER</h3>
    <span class="status idle">🟢 Idle</span>
  </div>
  <div class="agent-metrics">
    <div class="metric">
      <label>Задач выполнено:</label>
      <span>156</span>
    </div>
    <div class="metric">
      <label>Загрузка:</label>
      <span>45%</span>
    </div>
    <div class="metric">
      <label>Память:</label>
      <span>128 MB</span>
    </div>
  </div>
</div>
```

---

## 🔔 Система алертов

### Типы алертов:
```typescript
type AlertType =
  | 'critical'    // Критично - требует немедленного внимания
  | 'warning'     // Предупреждение - нужно исправить
  | 'info'        // Информация - для мониторинга

interface Alert {
  id: string
  type: AlertType
  category: 'agent' | 'system' | 'performance' | 'security'
  title: string
  description: string
  metric: string
  value: number
  threshold: number
  timestamp: string
  actions: {
    autoFix: boolean
    manual: string[]
  }
}
```

### Каналы уведомлений:
- 📧 Email
- 💬 Slack/Telegram
- 🔔 Webhook
- 📱 Push-уведомления
- 📊 Grafana

---

## 🛠️ Интеграция

### В коде агента:
```typescript
import { withTelemetry } from '@vibe-agents/diagnostics'

const myAgent = withTelemetry({
  name: 'VIBE-CODER',
  version: '1.0.0'
})(async (task: Task) => {
  // Ваша логика
  const result = await processTask(task)

  // Метрики собираются автоматически
  return result
})
```

### Настройка алертов:
```typescript
import { configureAlerts } from '@vibe-agents/diagnostics'

configureAlerts({
  thresholds: {
    'agent.errors': { warning: 5, critical: 10 },
    'system.memory': { warning: 80, critical: 90 },
    'performance.response_time': { warning: 1000, critical: 5000 }
  },
  channels: {
    critical: ['email', 'slack', 'webhook'],
    warning: ['slack'],
    info: ['webhook']
  }
})
```

---

## 📈 Метрики и KPI

### Ключевые метрики:
- **Health Score** (0-100) - общее здоровье системы
- **Uptime** - время доступности
- **Error Rate** - процент ошибок
- **Response Time** - время отклика
- **Throughput** - пропускная способность
- **Resource Usage** - использование ресурсов

### Цели (SLO):
- **Availability**: 99.9%
- **Response Time**: < 1s (p95)
- **Error Rate**: < 1%
- **Health Score**: > 90

---

## 🎯 Лучшие Практики

### Мониторинг:
1. **Собирайте метрики** всех агентов
2. **Настройте алерты** на критичные события
3. **Используйте** автоисправление где возможно
4. **Регулярно проверяйте** дашборд
5. **Ведите журнал** изменений

### Алерты:
1. **Не спамьте** - только критичные события
2. **Группируйте** похожие алерты
3. **Используйте** эскалацию для критичных проблем
4. **Тестируйте** каналы уведомлений
5. **Документируйте** процедуры реакции

### Производительность:
1. **Оптимизируйте** сбор метрик
2. **Используйте** агрегацию для долгосрочных данных
3. **Настройте** retention политику
4. **Индексируйте** метрики для быстрого поиска
5. **Архивируйте** старые данные

---

## 🚀 Заключение

**VIBE-DIAGNOSTICS** делает систему прозрачной и управляемой. Вы всегда знаете, что происходит, и можете быстро реагировать на проблемы.

**Результат**: 100% наблюдаемость + автоисправление + проактивный мониторинг! 📊🔍

---

*VIBE-DIAGNOSTICS: Видимость, контроль и забота о системе! 🔍✨*
