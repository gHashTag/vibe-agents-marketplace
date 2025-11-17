# 🐝 Vibe Agents Marketplace

**Система роевого интеллекта для Claude Code**

[![Лицензия: MIT](https://img.shields.io/badge/Лицензия-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Совместим-green.svg)](https://claude.ai/code)
[![Версия](https://img.shields.io/badge/Версия-1.1.0-blue.svg)]()

---

## ⚡ Быстрый Старт

```bash
# 1. Добавить Marketplace
/plugin marketplace add gHashTag/vibe-agents-marketplace

# 2. Установить Плагин
/plugin install vibe-agents@vibe-agents-marketplace

# 3. Использовать!
/task Ваша задача здесь
```

---

## 🎯 Что Это?

**Система из 20 умных агентов-пчелок**, которые работают вместе для автономной разработки.

### Визуализация

```
                    👑 VIBE-LEAD (Королева-Пчёлка)
                           ↓
    ┌─────────────────────────────────────────────────────────┐
    |            🐝 РОЙ АГЕНТОВ-ПЧЕЛОК                       |
    |                                                         |
    |  📋 Спецификатор  ➤  ✅ Планировщик  ➤  🧪 Тестировщик   |
    |           ↓                    ↓              ↓          |
    |  💻 Программист  ➤  📘 TypeScript  ➤  🎭 Критик        |
    |                                                         |
    |  🔐 Безопасность  ➤  🚀 DevOps  ➤  📡 Sentry           |
    |                                                         |
    └─────────────────────────────────────────────────────────┘
```

---

## 🚀 3 Способа Использования

### 1️⃣ Команда /task (Самый Простой!)

```bash
/task Создать систему авторизации с JWT
```

**Результат**: Агенты автоматически работают и через 5-10 минут вы получаете готовый результат!

### 2️⃣ Прямой Вызов Агента

```typescript
Task(
  subagent_type="vibe-elizaos",
  description="Создать плагин для Telegram бота",
  prompt="Создай плагин который будет отправлять сообщения..."
)
```

### 3️⃣ Автоактивация (Скиллы)

Просто пишите на русском, **ключевые слова** автоматически активируют агентов:

| Если напишете... | Активируется... |
|------------------|------------------|
| "Создай **ElizaOS** плагин" | ⚡ **vibe-elizaos** |
| "Проанализируй код на **уязвимости**" | 🔐 **vibe-security** |
| "Настрой **CI/CD**" | 🔄 **vibe-cicd** |

---

## 📦 Что Включено

### 🤖 20 Агентов

| Агент | Эмодзи | Что Делает |
|-------|--------|-----------|
| **vibe-queen** | 🐝 | Координация роя (Queen Bee) |
| **vibe-lead** | 👑 | Лидер разработки |
| **vibe-spec** | 📋 | Создаёт техзадания |
| **vibe-tester** | 🧪 | Пишет тесты (TDD) |
| **vibe-coder** | 💻 | Пишет код |
| **vibe-critic** | 🎭 | Проверяет код |
| **vibe-typescript** | 📘 | Работает с типами |
| **vibe-security** | 🔐 | Ищет уязвимости |
| **vibe-cicd** | 🔄 | Настраивает CI/CD |
| **vibe-devops** | 🚀 | DevOps |
| **vibe-sentry** | 📡 | Мониторинг |
| **vibe-elizaos** | ⚡ | ElizaOS плагины |
| **vibe-ai-llm** | 🤖 | AI интеграции |
| **vibe-mcp** | 🔌 | Model Context Protocol |
| **vibe-langfuse** | 📊 | LLM observability |
| **vibe-roi** | 💰 | Анализ проекта |
| **vibe-updater** | 🔄 | Обновления |
| **vibe-tasker** | ✅ | Планирование |
| **vibe-knowledge-keeper** | 📚 | Хранитель знаний |
| **vibe-diagnostics** | 🔍 | Диагностика системы |

### 🎣 17 Автоскиллов

Скиллы автоматически активируются по ключевым словам в ваших сообщениях.

### ⚡ Команда /task

Главная команда для запуска всей системы агентов.

---

## 🧠 Понимание: Как Это Работает?

### Queen Bee Pattern

**vibe-lead** (Королева-Пчёлка) координирует всех агентов:

```
👑 vibe-lead → 📋 spec → ✅ tasker → 🧪 tester → 💻 coder → 📘 typescript → 🎭 critic → 👑 lead
```

### Автономность

Агенты работают **самостоятельно** пока не решат задачу полностью:
- ✅ Работают до завершения (не нужно "продолжать")
- ✅ Автоматически исправляют ошибки
- ✅ Повторяют попытки до успеха
- ✅ Самостоятельно решают проблемы

---

## 📚 Документация

### Полная Документация
- **[Паттерны](./.claude-plugin/plugins/vibe-agents/.claude/patterns/README.md)** - архитектурные паттерны
- **[Функциональное Программирование](./.claude-plugin/plugins/vibe-agents/.claude/patterns/functional-programming.md)** - основы FP
- **[Troubleshooting Guide](./.claude-plugin/plugins/vibe-agents/.claude/patterns/troubleshooting.md)** - решение проблем
- **[Диаграммы Архитектуры](./.claude-plugin/plugins/vibe-agents/.claude/patterns/architecture-diagrams.md)** - визуализация
- **[Агенты](./.claude-plugin/plugins/vibe-agents/.claude/agents/)** - описания всех агентов
- **[Скиллы](./.claude-plugin/plugins/vibe-agents/.claude/skills/)** - автоактивация

### Агенты (Детально)
- [vibe-queen](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-queen.md) - координация роя
- [vibe-knowledge-keeper](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-knowledge-keeper.md) - хранитель знаний
- [vibe-diagnostics](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-diagnostics.md) - диагностика
- [vibe-lead](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-lead.md) - лидер разработки
- [vibe-spec](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-spec.md) - создание техзаданий
- [vibe-coder](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-coder.md) - написание кода
- [vibe-tester](./.claude-plugin/plugins/vibe-agents/.claude/agents/vibe-tester.md) - тестирование
- [и все остальные...](./.claude-plugin/plugins/vibe-agents/.claude/agents/)

---

## 💡 Примеры

### Пример 1: Создание Плагина

```bash
/task Создать плагин для работы с MongoDB
```

**Автоматически**:
1. 📋 Создаёт план
2. 🧪 Пишет тесты
3. 💻 Реализует код
4. 📘 Проверяет типы
5. 🔍 Делает ревью

**Результат**: Готовый плагин за 5-10 минут!

### Пример 2: Настройка CI/CD

```bash
"Настроить GitLab CI/CD с автотестами"
```

→ Автоматически активируется **vibe-cicd** и настраивает полный pipeline.

---

## 🎯 Особенности

✅ **20 агентов-специалистов** - каждый мастер в своём деле
✅ **Автоматическая координация** - агенты сами знают что делать
✅ **TDD подход** - тесты пишутся перед кодом
✅ **Русская локализация** - удобно для СНГ
✅ **Полная автономность** - работают пока не сделают
✅ **Простота** - одна команда `/task`
✅ **Паттерны** - извлечены все алгоритмические знания
✅ **Knowledge Keeper** - автоматическая синхронизация документации
✅ **Diagnostics** - мониторинг и телеметрия системы
✅ **Troubleshooting Guide** - решение типовых проблем
✅ **Архитектурные диаграммы** - визуализация системы
✅ **Продвинутое ФП** - curry, fold, retry, recover

---

## 🔧 Управление

```bash
# Список marketplace
/plugin marketplace list

# Обновить marketplace
/plugin marketplace update vibe-agents-marketplace

# Удалить marketplace
/plugin marketplace remove vibe-agents-marketplace
```

---

## 📄 Лицензия

MIT License - используйте свободно в любых целях

---

## 🎉 Заключение

**Vibe Agents Marketplace** - готовая система из 17 умных агентов для автономной разработки.

**Устанавливайте и начинайте!** 🚀

```bash
/plugin marketplace add gHashTag/vibe-agents-marketplace
/plugin install vibe-agents@vibe-agents-marketplace
```

**Добро пожаловать в мир автономной разработки!** 🐝✨

---

*Создано с ❤️ командой Vibee для сообщества Claude Code*
