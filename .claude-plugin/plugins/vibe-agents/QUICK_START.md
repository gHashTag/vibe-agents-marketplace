# ⚡ Быстрый старт с Vibe Agents в Claude Code

## 🚀 Установка за 30 секунд

### 1. Распакуйте плагин в ваш проект

```bash
# Распаковываем архив
unzip vibe-agents-plugin.zip

# Копируем агентов
cp -r vibe-agents-plugin/.claude/agents/ /ваш/проект/.claude/
```

### 2. Настройте агентов за 1 минуту

```typescript
// В .claude/settings.json вашего проекта
{
  "agents": {
    "enabled": true,
    "default_agent": "vibe-spec",
    "arbitration": {
      "strategy": "hierarchical",
      "max_concurrent_tasks": 3
    }
  }
}
```

### 3. Готово! Используйте агентов

```typescript
// В Claude Code просто напишите:
Task(
  subagent_type="vibe-coder",
  description="Создать новый React компонент для кнопки",
  prompt="..."
)
```

---

## 👨‍🎓 Быстрая настройка "Студента"

### Автоматическая настройка профиля

```typescript
// quick-setup.ts - Автоматическая настройка для Claude Code
import { setupStudent } from './students/setup-student'

// Настройка Junior разработчика
export const setupJuniorDev = async () => {
  const junior = await setupStudent('junior-dev', {
    name: 'My Junior Dev',
    preferredWorkflow: 'create-feature',
    customCapabilities: [
      'React + TypeScript',
      'Tailwind CSS',
      'Vitest тестирование',
    ],
  })

  return junior
}

// Настройка DevOps инженера
export const setupDevOps = async () => {
  const devops = await setupStudent('devops-engineer', {
    name: 'My DevOps Engineer',
    preferredWorkflow: 'optimize-infrastructure',
    customCapabilities: [
      'GitLab CI/CD',
      'OpenTofu',
      'Docker',
      'Kubernetes',
    ],
  })

  return devops
}

// Настройка Security аудитора
export const setupSecurityAuditor = async () => {
  const security = await setupStudent('security-auditor', {
    name: 'My Security Expert',
    preferredWorkflow: 'audit-security',
    customCapabilities: [
      'OWASP Top 10',
      'Penetration Testing',
      'Compliance (SOC 2, ISO 27001)',
    ],
  })

  return security
}
```

---

## 🎯 Готовые сценарии использования

### Сценарий 1: Создание новой функции

```typescript
// Просто скажите агенту:
"Создай новую функцию авторизации пользователя"

// Агент автоматически:
1. Вызовет vibe-spec → создаст спецификацию
2. Вызовет vibe-typescript → определит типы
3. Вызовет vibe-tester → напишет тесты
4. Вызовет vibe-coder → реализует функцию
5. Вызовет vibe-security → проверит безопасность
6. Вызовет vibe-critic → валидирует результат
7. Вернет готовую функцию с тестами
```

### Сценарий 2: Оптимизация CI/CD

```typescript
// Скажите:
"Оптимизируй пайплайн сборки для ускорения деплоя"

// Агент автоматически:
1. Вызовет vibe-cicd → проанализирует текущий пайплайн
2. Вызовет vibe-devops → проверит инфраструктуру
3. Вызовет vibe-sentry → получит метрики производительности
4. Предложит оптимизации
5. Реализует улучшения
6. Проверит результат
```

### Сценарий 3: Аудит безопасности

```typescript
// Скажите:
"Проведи аудит безопасности проекта"

// Агент автоматически:
1. Вызовет vibe-security → проанализирует код
2. Вызовет vibe-sentry → проверит логи ошибок
3. Вызовет vibe-devops → проверит конфигурации
4. Составит отчет с рекомендациями
5. Предложит план исправлений
```

---

## 🔧 Конфигурация агентов

### Базовый конфиг (.claude/agents.config.json)

```json
{
  "version": "2.0.42",
  "agents": {
    "vibe-lead": {
      "enabled": true,
      "priority": 1,
      "max_concurrent_tasks": 5,
      "arbitration_strategy": "coordinator"
    },
    "vibe-spec": {
      "enabled": true,
      "priority": 2,
      "auto_call_on": ["создать", "разработать", "реализовать"]
    },
    "vibe-tester": {
      "enabled": true,
      "priority": 3,
      "tdd_mode": true,
      "coverage_threshold": 90
    },
    "vibe-coder": {
      "enabled": true,
      "priority": 4,
      "preferred_language": "TypeScript",
      "functional_style": true
    },
    "vibe-critic": {
      "enabled": true,
      "priority": 5,
      "strict_mode": true,
      "require_tests": true
    },
    "vibe-sentry": {
      "enabled": true,
      "priority": 1,
      "monitoring": true,
      "auto_report": true
    }
  },
  "workflows": {
    "create-feature": {
      "agents": ["vibe-spec", "vibe-typescript", "vibe-tester", "vibe-coder", "vibe-security", "vibe-critic"],
      "parallel": false
    },
    "optimize-performance": {
      "agents": ["vibe-cicd", "vibe-devops", "vibe-sentry"],
      "parallel": true
    },
    "audit-security": {
      "agents": ["vibe-security", "vibe-sentry", "vibe-devops"],
      "parallel": true
    }
  },
  "call_rules": {
    "max_depth": 5,
    "timeout_per_call": 300000,
    "retry_attempts": 3,
    "enable_tracking": true
  }
}
```

---

## 📚 Шаблоны задач

### Шаблон 1: Создание плагина

```typescript
Task(
  subagent_type="vibe-spec",
  description="Create a new plugin specification",
  prompt: `
Создай спецификацию для нового плагина ElizaOS:
- Название: ${PLUGIN_NAME}
- Описание: ${PLUGIN_DESCRIPTION}
- Функции: ${PLUGIN_FEATURES}
- Технологии: TypeScript, Zod, TaskEither

Требования:
1. Следуй паттернам Vibe Agents
2. Используй функциональное программирование
3. Включи 100% покрытие тестами
4. Добавь TypeScript типы
`
)
```

### Шаблон 2: Рефакторинг кода

```typescript
Task(
  subagent_type="vibe-critic",
  description="Refactor and improve code quality",
  prompt: `
Проведи рефакторинг кода:
- Файлы: ${FILES}
- Цели: ${REFACTOR_GOALS}
- Требования к качеству: ${QUALITY_REQUIREMENTS}

Используй:
1. Функциональные паттерны
2. TypeScript строгую типизацию
3. TaskEither для обработки ошибок
4. 100% покрытие тестами
`
)
```

### Шаблон 3: Оптимизация производительности

```typescript
Task(
  subagent_type="vibe-cicd",
  description="Optimize CI/CD pipeline performance",
  prompt: `
Оптимизируй CI/CD пайплайн:
- Текущий файл: ${CI_FILE}
- Проблемы: ${ISSUES}
- Цель: ${OPTIMIZATION_GOAL}

Действия:
1. Анализируй метрики из Sentry
2. Найди узкие места
3. Предложи оптимизации
4. Реализуй изменения
`
)
```

---

## 🎓 Обучающие модули

### Модуль 1: Основы Vibe Agents (30 мин)

```typescript
// Изучите:
// 1. Что такое Vibe Agents
// 2. Как они работают together
// 3. Какие паттерны используют
// 4. Как их вызывать

Task(
  subagent_type="vibe-spec",
  description="Create learning module: Basics of Vibe Agents",
  prompt: `
Создай обучающий модуль для Junior разработчика:

Темы:
1. Что такое Vibe Agents и роевой интеллект
2. Архитектура агентной системы
3. Функциональное программирование в агентах
4. TaskEither паттерн
5. Как вызывать агентов

Формат: Markdown с примерами кода
Продолжительность: 30 минут чтения
Уровень: Beginner
`
)
```

### Модуль 2: Функциональное программирование (45 мин)

```typescript
Task(
  subagent_type="vibe-critic",
  description="Create FP learning module",
  prompt: `
Создай практический модуль по функциональному программированию:

Темы:
1. Чистые функции
2. Иммутабельность
3. Композиция (pipe, compose)
4. TaskEither и Either
5. Практические упражнения

Требования:
- 10+ практических примеров
- Упражнения с решениями
- Чек-лист лучших практик
- Задания для самостоятельной работы
`
)
```

---

## 🔍 Отладка агентов

### Просмотр логов

```bash
# Логи всех агентов
cat .claude/logs/agents.log

# Логи конкретного агента
cat .claude/logs/agents/vibe-coder.log

# Поиск ошибок
grep "ERROR" .claude/logs/agents.log

# Мониторинг в реальном времени
tail -f .claude/logs/agents.log
```

### Статус агентов

```bash
# Проверить статус всех агентов
cat .claude/status/agents-status.json

# Посмотреть активные задачи
cat .claude/status/active-tasks.json

# Посмотреть историю вызовов
cat .claude/status/call-history.json
```

---

## ⚙️ Настройка для разных ролей

### Для Junior разработчика

```json
{
  "profile": "junior-developer",
  "preferences": {
    "detailed_explanations": true,
    "step_by_step_guidance": true,
    "examples": true,
    "learning_mode": true
  },
  "agents": {
    "vibe-critic": {
      "strict_mode": false,
      "explanatory_mode": true
    },
    "vibe-tester": {
      "tutorial_mode": true,
      "show_examples": true
    }
  }
}
```

### Для Senior разработчика

```json
{
  "profile": "senior-developer",
  "preferences": {
    "concise_responses": true,
    "advanced_patterns": true,
    "performance_focused": true
  },
  "agents": {
    "vibe-spec": {
      "detailed_specs": false,
      "focus_on_architecture": true
    },
    "vibe-critic": {
      "strict_mode": true,
      "performance_check": true
    }
  }
}
```

### Для DevOps инженера

```json
{
  "profile": "devops-engineer",
  "preferences": {
    "infrastructure_focus": true,
    "automation": true,
    "monitoring": true
  },
  "agents": {
    "vibe-devops": {
      "preferred": true,
      "auto_call_on": ["deploy", "infrastructure", "ci/cd"]
    },
    "vibe-sentry": {
      "monitoring_mode": true,
      "auto_alerts": true
    }
  }
}
```

---

## 📖 Часто задаваемые вопросы

### Q: Какой агент отвечает за что?

**A:** Смотрите [AGENT_CALL_RULES.md](AGENT_CALL_RULES.md) - там есть полная матрица.

### Q: Можно ли изменить workflow?

**A:** Да! В `.claude/agents.config.json` можно настроить любые workflow.

### Q: Как добавить нового агента?

**A:** Смотрите [SPECIFICATIONS.md](SPECIFICATIONS.md) - раздел "Чек-лист создания нового агента".

### Q: Как настроить студента?

**A:** Используйте функцию `setupStudent()` из [QUICK_START.md](QUICK_START.md).

### Q: Где посмотреть логи?

**A:** В `.claude/logs/` - все логи агентов там.

---

## 🎯 Следующие шаги

1. ✅ **Установите плагин** - распакуйте и настройте
2. ✅ **Выберите профиль** - junior, senior, devops, security
3. ✅ **Настройте workflow** - под ваши задачи
4. ✅ **Изучите примеры** - используйте шаблоны
5. ✅ **Экспериментируйте** - вызывайте агентов и смотрите результат

---

**Vibe Agents в Claude Code - Быстрый старт за 5 минут! ⚡🚀**
