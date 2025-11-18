# 🤖 Реестр Агентов Vibe Agents

## Обзор

Полный список всех 21 агента в системе Vibe Agents. Каждый агент имеет уникальный ID, специализацию и может взаимодействовать с другими агентами через `agentId` и `resume` параметр.

---

## 🐝 Топ-Уровень (Tier 0)

### 1. VIBE-QUEEN (ID: vibe-queen)
- **Эмодзи**: 🐝
- **Специализация**: Главный Роевой Координатор
- **Роль**: Мастер-координатор всей системы из 21 агента
- **Задачи**: Управляет VIBE-LEAD, координирует всю swarm intelligence
- **ID-агента**: `vibe-queen`
- **Model**: Sonnet
- **Tools**: Task, Read, Write, Grep, Glob, Bash

---

## 👑 Оркестрация (Tier 1)

### 2. VIBE-LEAD (ID: vibe-lead)
- **Эмодзи**: 👑
- **Специализация**: Мастер Оркестрации (Queen Bee)
- **Роль**: Главный координатор проектов
- **Задачи**: Анализирует задачи, определяет агентов, координирует swarm intelligence
- **ID-агента**: `vibe-lead`
- **Model**: inherit
- **Tools**: Task
- **Взаимодействует с**: Все 20 агентов

---

## 📋 Планирование и Спецификации (Tier 2)

### 3. VIBE-SPEC (ID: vibe-spec)
- **Эмодзи**: 📋
- **Специализация**: Specification Master
- **Роль**: Создает технические спецификации
- **Задачи**: OpenAPI 3.2, JSON Schema, AsyncAPI
- **ID-агента**: `vibe-spec`
- **Model**: inherit
- **Tools**: Read, Write, Grep, Glob

### 4. VIBE-TASKER (ID: vibe-tasker)
- **Эмодзи**: ✅
- **Специализация**: Task Manager & Controller
- **Роль**: Менеджер задач
- **Задачи**: Декомпозиция, планирование, приоритеты
- **ID-агента**: `vibe-tasker`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash, Task

---

## 💻 Разработка (Tier 3)

### 5. VIBE-CODER (ID: vibe-coder)
- **Эмодзи**: 💻
- **Специализация**: Implementation Specialist
- **Роль**: Специалист по реализации
- **Задачи**: Написание кода, fp-ts, Clean Architecture
- **ID-агента**: `vibe-coder`
- **Model**: inherit
- **Tools**: Read, Write, Edit, Grep, Glob

### 6. VIBE-TYPESCRIPT (ID: vibe-typescript)
- **Эмодзи**: 📘
- **Специализация**: TypeScript Expert
- **Роль**: Эксперт по типизации
- **Задачи**: Type safety, Zod, advanced types
- **ID-агента**: `vibe-typescript`
- **Model**: inherit
- **Tools**: Read, Write, Grep, Glob

### 7. VIBE-TESTER (ID: vibe-tester)
- **Эмодзи**: 🧪
- **Специализация**: QA Engineer и TDD
- **Роль**: QA инженер и тестировщик
- **Задачи**: Unit/Integration/E2E тесты, TDD (RED → GREEN → REFACTOR)
- **ID-агента**: `vibe-tester`
- **Model**: inherit
- **Tools**: Read, Write, Grep, Glob

### 8. VIBE-CRITIC (ID: vibe-critic)
- **Эмодзи**: 🎭
- **Специализация**: Critic Agent
- **Роль**: Критик и код-ревьюер
- **Задачи**: Код-ревью, качество кода, архитектурный анализ
- **ID-агента**: `vibe-critic`
- **Model**: inherit
- **Tools**: Read, Grep, Glob

---

## 🔐 Безопасность и Инфраструктура (Tier 4)

### 9. VIBE-SECURITY (ID: vibe-security)
- **Эмодзи**: 🔐
- **Специализация**: Security & Vulnerability Expert
- **Роль**: Эксперт по безопасности
- **Задачи**: Security audit, Snyk, OWASP Top 10, compliance
- **ID-агента**: `vibe-security`
- **Model**: inherit
- **Tools**: Read, Grep, Glob

### 10. VIBE-DEVOPS (ID: vibe-devops)
- **Эмодзи**: 🚀
- **Специализация**: DevOps Expert
- **Роль**: DevOps специалист
- **Задачи**: OpenTofu, Docker, Kubernetes, CI/CD
- **ID-агента**: `vibe-devops`
- **Model**: sonnet
- **Tools**: Read, Write, Bash, Grep, Glob

### 11. VIBE-CICD (ID: vibe-cicd)
- **Эмодзи**: 🔄
- **Специализация**: CI/CD Pipeline Master
- **Роль**: Мастер пайплайнов
- **Задачи**: GitLab CI, GitHub Actions, multi-stage deployments
- **ID-агента**: `vibe-cicd`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

---

## ⚡ Технологические Эксперты (Tier 5)

### 12. VIBE-ELIZAOS (ID: vibe-elizaos)
- **Эмодзи**: ⚡
- **Специализация**: ElizaOS Framework Expert
- **Роль**: Эксперт по ElizaOS
- **Задачи**: Плагины, агенты, Actions, Services
- **ID-агента**: `vibe-elizaos`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

### 13. VIBE-AI-LLM (ID: vibe-ai-llm)
- **Эмодзи**: 🤖
- **Специализация**: AI/LLM Integration Master
- **Роль**: Мастер AI интеграций
- **Задачи**: Claude, OpenAI, OpenRouter, промпт-инжиниринг
- **ID-агента**: `vibe-ai-llm`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, WebFetch

### 14. VIBE-MCP (ID: vibe-mcp)
- **Эмодзи**: 🔌
- **Специализация**: Model Context Protocol Expert
- **Роль**: Эксперт по MCP
- **Задачи**: fal.ai, Neon, Sentry, progressive disclosure
- **ID-агента**: `vibe-mcp`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, WebFetch

---

## 📡 Мониторинг и Аналитика (Tier 6)

### 15. VIBE-SENTRY (ID: vibe-sentry)
- **Эмодзи**: 📡
- **Специализация**: Error Monitoring & AI Telemetry
- **Роль**: Мониторинг ошибок
- **Задачи**: Sentry, performance monitoring, distributed tracing
- **ID-агента**: `vibe-sentry`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

### 16. VIBE-LANGFUSE (ID: vibe-langfuse)
- **Эмодзи**: 📊
- **Специализация**: LLM Observability Master
- **Роль**: LLM observability
- **Задачи**: Langfuse, tracing, cost tracking, latency analysis
- **ID-агента**: `vibe-langfuse`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

### 17. VIBE-ROI (ID: vibe-roi)
- **Эмодзи**: 💰
- **Специализация**: ROI Analysis Master
- **Роль**: Анализ эффективности
- **Задачи**: ROI агентов, экономия времени, productivity metrics
- **ID-агента**: `vibe-roi`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

---

## 🔄 Управление и Обслуживание (Tier 7)

### 18. VIBE-UPDATER (ID: vibe-updater)
- **Эмодзи**: 🔄
- **Специализация**: Update Orchestrator
- **Роль**: Оркестратор обновлений
- **Задачи**: Dependency management, автоматические обновления
- **ID-агента**: `vibe-updater`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

### 19. VIBE-KNOWLEDGE-KEEPER (ID: vibe-knowledge-keeper)
- **Эмодзи**: 📚
- **Специализация**: Knowledge Master
- **Роль**: Хранитель знаний
- **Задачи**: Документация, паттерны, контекстная память
- **ID-агента**: `vibe-knowledge-keeper`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

### 20. VIBE-DIAGNOSTICS (ID: vibe-diagnostics)
- **Эмодзи**: 🔍
- **Специализация**: System Diagnostics Master
- **Роль**: Системная диагностика
- **Задачи**: Health checks, performance profiling, ML anomaly detection
- **ID-агента**: `vibe-diagnostics`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob, Bash

### 21. VIBE-LEARN (ID: vibe-learn)
- **Эмодзи**: 🎓
- **Специализация**: Learning & Adaptation Specialist
- **Роль**: Обучение и адаптация
- **Задачи**: Интерактивные курсы, TDD обучение, геймификация
- **ID-агента**: `vibe-learn`
- **Model**: sonnet
- **Tools**: Read, Write, Grep, Glob

---

## 🔗 Схема Взаимодействия

### Иерархия Управления
```
VIBE-QUEEN (🐝)
    ↓
VIBE-LEAD (👑)
    ↓
[20 Агентов]
    ├── vibe-spec (📋)
    ├── vibe-tasker (✅)
    ├── vibe-coder (💻)
    ├── vibe-tester (🧪)
    ├── vibe-critic (🎭)
    ├── vibe-typescript (📘)
    ├── vibe-security (🔐)
    ├── vibe-devops (🚀)
    ├── vibe-cicd (🔄)
    ├── vibe-elizaos (⚡)
    ├── vibe-ai-llm (🤖)
    ├── vibe-mcp (🔌)
    ├── vibe-sentry (📡)
    ├── vibe-langfuse (📊)
    ├── vibe-roi (💰)
    ├── vibe-updater (🔄)
    ├── vibe-knowledge-keeper (📚)
    ├── vibe-diagnostics (🔍)
    └── vibe-learn (🎓)
```

### Пример Workflow с agentId

```typescript
// 1. Главный координатор запускает задачу
const leadId = await Task({
  subagent_type: 'vibe-lead',
  description: 'Анализ архитектуры e-commerce'
});

// 2. Спецификация
const specId = await Task({
  subagent_type: 'vibe-spec',
  description: 'Создать API спецификацию',
  resume: leadId
});

// 3. Планирование
const taskerId = await Task({
  subagent_type: 'vibe-tasker',
  description: 'Декомпозиция на задачи',
  resume: specId
});

// 4. Параллельная реализация
const coderId = await Task({
  subagent_type: 'vibe-coder',
  description: 'Реализация backend',
  resume: taskerId
});

const testerId = await Task({
  subagent_type: 'vibe-tester',
  description: 'Создание тестов',
  resume: taskerId
});

const securityId = await Task({
  subagent_type: 'vibe-security',
  description: 'Аудит безопасности',
  resume: taskerId
});

// 5. Код-ревью
const criticId = await Task({
  subagent_type: 'vibe-critic',
  description: 'Код-ревью',
  resume: coderId
});

// 6. Деплой
const devopsId = await Task({
  subagent_type: 'vibe-devops',
  description: 'Развертывание',
  resume: criticId
});
```

## 🎯 Ключевые Принципы

### 1. Resumable Subagents
- Каждый агент имеет уникальный `agentId`
- Контекст сохраняется в `agent-{agentId}.jsonl`
- Продолжение через `resume: 'agentId'`

### 2. Chaining
- Цепочки агентов для сложных workflow
- Передача контекста между агентами
- Параллельное и последовательное выполнение

### 3. Automatic Delegation
- "MUST BE USED PROACTIVELY" для автоактивации
- Context-based selection агентов
- Tool permissions для безопасности

### 4. Model Selection
- `inherit` для адаптивности
- `sonnet` для сложных задач
- Специфичные модели для экспертов

---

## 📊 Статистика

- **Всего агентов**: 21
- **Tier 0 (Топ)**: 1 агент
- **Tier 1 (Оркестрация)**: 1 агент
- **Tier 2 (Планирование)**: 2 агента
- **Tier 3 (Разработка)**: 4 агента
- **Tier 4 (Безопасность)**: 3 агента
- **Tier 5 (Технологии)**: 3 агента
- **Tier 6 (Мониторинг)**: 3 агента
- **Tier 7 (Управление)**: 4 агента

---

## 🚀 Использование

Все агенты доступны через:
1. `/task` - запуск swarm intelligence
2. Прямой вызов `Task({ subagent_type: 'agent-id' })`
3. Chaining через `resume: 'agentId'`
4. Автоактивация через ключевые слова

**Каждый агент знает о существовании всех остальных 20 агентов и может с ними взаимодействовать!**

---

*Обновлено: v2.0.48 - 100% Complete*
