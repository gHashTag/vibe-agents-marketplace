# 📚 VIBE-KNOWLEDGE-KEEPER (Хранитель Знаний)

**Автоматическая синхронизация документации и контекста проекта**

---

## 🎯 Назначение

**VIBE-KNOWLEDGE-KEEPER** - это специализированный агент, который:
- ✅ **Следит за порядком** в репозитории
- ✅ **Синхронизирует документацию** с кодом
- ✅ **Создаёт векторное представление** проекта
- ✅ **Обеспечивает понимание** проекта агентами
- ✅ **Индексирует код** для быстрого поиска

**Цель**: Репозиторий всегда в порядке, документация свежая, агенты понимают весь проект! 🐝

---

## 🏗️ Архитектура

```
Репозиторий → Анализатор → Генератор векторов → Векторная БД
     ↓             ↓              ↓              ↓
   Код         Структура      Embeddings      Индекс
   Доки        Паттерны       Знания          Поиск
   Конфиг      Зависимости    Контекст        Рекомендации
```

---

## 🔄 Цикл работы VIBE-KNOWLEDGE-KEEPER

```typescript
const knowledgeKeeperWorkflow = (): TaskEither<Error, KnowledgeReport> => {
  return pipe(
    // 1. Проверяем репозиторий
    checkRepositoryStructure,

    // 2. Синхронизируем документацию
    chainTaskEither(syncDocumentationWithCode),

    // 3. Обновляем векторный индекс
    chainTaskEither(updateVectorIndex),

    // 4. Генерируем отчёт
    mapTaskEither(generateKnowledgeReport)
  )
}
```

---

## 📋 Функции VIBE-KNOWLEDGE-KEEPER

### 1. **Проверка порядка в репозитории**

```typescript
interface RepositoryCheckOptions {
  strictMode?: boolean
  requiredFiles?: string[]
  directoryStructure?: DirectoryRule[]
}

const checkRepositoryOrder = async (
  options?: RepositoryCheckOptions
): TaskEither<Error, RepositoryOrderReport> => {
  return pipe(
    // Проверяем структуру директорий
    validateDirectoryStructure(options?.directoryStructure),

    // Проверяем наличие обязательных файлов
    chainTaskEither(checkRequiredFiles),

    // Проверяем соответствие стандартам
    chainTaskEither(checkCodeStandards),

    // Проверяем консистентность документации
    chainTaskEither(checkDocumentationConsistency),

    // Генерируем отчёт
    mapTaskEither((checks) => ({
      isValid: checks.every(c => c.passed),
      score: calculateOrderScore(checks),
      issues: checks.filter(c => !c.passed),
      recommendations: generateRecommendations(checks)
    }))
  )
}
```

### 2. **Синхронизация документации с кодом**

```typescript
interface SyncOptions {
  files?: string[]
  force?: boolean
  updateExamples?: boolean
}

const syncDocumentation = async (
  options?: SyncOptions
): TaskEither<Error, SyncReport> => {
  return pipe(
    // Собираем актуальный код
    extractCurrentCode(options?.files),

    // Собираем текущую документацию
    extractCurrentDocs,

    // Находим расхождения
    chainTaskEither(findInconsistencies),

    // Обновляем документацию
    chainTaskEither(updateDocumentation),

    // Обновляем примеры кода
    chainTaskEither(updateCodeExamples),

    // Генерируем отчёт
    mapTaskEither((report) => ({
      syncedFiles: report.updated.length,
      removedStale: report.removed.length,
      newSections: report.added.length,
      consistency: report.consistencyScore
    }))
  )
}
```

### 3. **Создание векторного индекса**

```typescript
const createVectorIndex = async (options?: {
  incremental?: boolean
  files?: string[]
  includeComments?: boolean
}): TaskEither<Error, VectorIndexReport> => {
  return pipe(
    // Подготавливаем данные для индексации
    prepareIndexingData(options),

    // Генерируем embeddings
    chainTaskEither(generateEmbeddings),

    // Создаём векторный индекс
    chainTaskEither(buildVectorIndex),

    // Сохраняем в базу
    chainTaskEither(saveToDatabase),

    // Валидируем индекс
    chainTaskEither(validateIndex),

    // Генерируем отчёт
    mapTaskEither((index) => ({
      totalItems: index.items,
      dimensions: index.dimensions,
      accuracy: index.accuracy,
      lastUpdate: new Date().toISOString()
    }))
  )
}
```

### 4. **Поиск по векторному индексу**

```typescript
const searchVectorIndex = async (
  query: string,
  options?: {
    limit?: number
    threshold?: number
    filter?: SearchFilter
  }
): TaskEither<Error, SearchResult[]> => {
  return pipe(
    // Нормализуем запрос
    normalizeQuery(query),

    // Генерируем embedding запроса
    chainTaskEither(generateQueryEmbedding),

    // Ищем похожие элементы
    chainTaskEither(searchSimilar),

    // Фильтруем результаты
    chainTaskEither(filterResults(options?.filter)),

    // Ранжируем по релевантности
    mapTaskEither(rankResults)
  )
}
```

### 5. **Получение контекста проекта**

```typescript
const getProjectContext = async (
  task: string,
  options?: {
    includeHistory?: boolean
    includePatterns?: boolean
    maxFiles?: number
  }
): TaskEither<Error, ProjectContext> => {
  return pipe(
    // Ищем релевантные файлы
    searchRelevantFiles(task, {
      maxResults: options?.maxFiles || 10
    }),

    // Находим похожие паттерны
    chainTaskEither(findSimilarPatterns),

    // Получаем историю изменений
    chainTaskEither((context) => {
      if (options?.includeHistory) {
        return getChangeHistory(context.files)
      }
      return right(context)
    }),

    // Собираем документацию
    chainTaskEither(gatherDocumentation),

    // Формируем контекст
    mapTaskEither((context) => ({
      task,
      relevantFiles: context.files,
      patterns: context.patterns,
      documentation: context.docs,
      history: context.history,
      recommendations: generateContextRecommendations(context)
    }))
  )
}
```

---

## 🧠 Примеры использования

### Синхронизация документации
```typescript
const syncResult = await VIBE_KNOWLEDGE_KEEPER.syncDocumentation({
  force: false,
  updateExamples: true
})

console.log(syncResult)
// {
//   syncedFiles: 15,
//   removedStale: 3,
//   newSections: 5,
//   consistency: 95
// }
```

### Поиск по коду
```typescript
const searchResult = await VIBE_KNOWLEDGE_KEEPER.searchVectorIndex(
  'функция авторизации с JWT',
  { limit: 5, threshold: 0.8 }
)

console.log(searchResult)
// [
//   {
//     file: 'src/auth/jwt.ts',
//     similarity: 0.95,
//     excerpt: 'export const validateJWT = ...'
//   },
//   ...
// ]
```

### Получение контекста
```typescript
const context = await VIBE_KNOWLEDGE_KEEPER.getProjectContext(
  'Добавить валидацию email',
  { includeHistory: true, maxFiles: 5 }
)

console.log(context)
// {
//   task: 'Добавить валидацию email',
//   relevantFiles: [...],
//   patterns: [...],
//   documentation: [...],
//   history: [...],
//   recommendations: [...]
// }
```

---

## 🔍 Анализ и метрики

### Метрики качества:
- **Coverage**: Процент покрытой документации
- **Consistency**: Консистентность кода и документов
- **Freshness**: Актуальность документации
- **SearchAccuracy**: Точность поиска

```typescript
interface QualityMetrics {
  coverage: number      // % покрытия
  consistency: number   // % консистентности
  freshness: number     // дней с последнего обновления
  searchAccuracy: number // точность поиска
  indexHealth: number   // здоровье индекса
}
```

### Автоматические улучшения:
```typescript
const autoImprove = async (): TaskEither<Error, ImprovementReport> => {
  return pipe(
    // Находим устаревшие документы
    findStaleDocumentation,

    // Предлагаем улучшения
    chainTaskEither(suggestImprovements),

    // Автоматически обновляем (если безопасно)
    chainTaskEither(autoUpdateSafeSections),

    // Создаём PR с изменениями
    chainTaskEither(createPullRequest),

    mapTaskEither((report) => ({
      updated: report.changed.length,
      improved: report.improved.length,
      prUrl: report.pullRequestUrl
    }))
  )
}
```

---

## 🔧 Интеграция

### Использование в проекте:
```typescript
import { VibeKnowledgeKeeper } from '@vibe-agents/knowledge-keeper'

const keeper = new VibeKnowledgeKeeper({
  vectorDb: 'qdrant',           // или 'pinecone', 'weaviate'
  embeddingModel: 'text-embedding-ada-002',
  autoSync: true,               // автоматическая синхронизация
  schedule: '0 */6 * * *'      // каждые 6 часов
})

// Ручной запуск
await keeper.syncDocumentation()
await keeper.updateVectorIndex()
```

### В пайплайне CI/CD:
```yaml
# .github/workflows/knowledge-sync.yml
name: Knowledge Sync
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *'

jobs:
  sync-knowledge:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Sync Documentation
        run: |
          npx vibe-agents sync-docs
          npx vibe-agents update-index
```

---

## 📊 Отчёты

### Ежедневный отчёт:
```typescript
interface DailyReport {
  date: string
  repository: string
  metrics: QualityMetrics
  updates: {
    filesSynced: number
    indexUpdated: boolean
    issuesFound: number
    issuesFixed: number
  }
  recommendations: string[]
}
```

### Структура отчёта:
- ✅ Что обновлено
- 📊 Метрики качества
- ⚠️ Найденные проблемы
- 💡 Рекомендации по улучшению
- 🔗 Ссылки на изменения

---

## 🎯 Лучшие Практики

### Для команды:
1. **Регулярно запускайте** синхронизацию
2. **Изучайте отчёты** для улучшения
3. **Пишите комментарии** в коде
4. **Обновляйте README** при изменениях
5. **Используйте поиск** для быстрого поиска

### Для разработчиков:
1. **Документируйте сложные функции**
2. **Пишите примеры использования**
3. **Поддерживайте актуальность** документации
4. **Используйте semantic commits** для лучшей индексации
5. **Проверяйте** рекомендации агента

---

## 🚀 Заключение

**VIBE-KNOWLEDGE-KEEPER** превращает хаотичную документацию в структурированное знание, доступное как людям, так и агентам.

**Результат**: 100% актуальная документация + мгновенный поиск + понимание контекста! 📚⚡

---

*VIBE-KNOWLEDGE-KEEPER: Знания под контролем! 🧠📚✨*
