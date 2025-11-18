# 🔄 Руководство по Обновлению Vibe Agents Marketplace

## 📋 Пошаговые Инструкции

### 1️⃣ ПЕРВОЕ ПОДКЛЮЧЕНИЕ (если marketplace еще не настроен)

```bash
# Добавляем marketplace в систему
/plugin marketplace add gHashTag/vibe-agents-marketplace

# Устанавливаем плагин с marketplace
/plugin install vibe-agents@vibe-agents-marketplace

# Проверяем установку
/plugin list | grep vibe
```

### 2️⃣ ОБНОВЛЕНИЕ ДО v2.0.48 (если marketplace уже настроен)

```bash
# Обновляем marketplace до последней версии
/plugin marketplace update vibe-agents-marketplace

# Переустанавливаем плагин с обновленной версией
/plugin uninstall vibe-agents
/plugin install vibe-agents@vibe-agents-marketplace

# Проверяем версию
/plugin list | grep vibe-agents
```

### 3️⃣ РУЧНОЕ КОПИРОВАНИЕ (если нужно в существующий проект)

```bash
# Копируем плагин в ваш проект
cp -r .claude-plugin/plugins/vibe-agents /path/to/your/project/.claude-plugin/plugins/

# Копируем marketplace.json
cp .claude-plugin/marketplace.json /path/to/your/project/.claude-plugin/

# Обновляем character.ts в вашем проекте:
# Добавляем импорт плагина
```

## 🎯 Структура Файлов

После установки у вас будет:

```
your-project/
└── .claude-plugin/
    ├── marketplace.json          # Настройки marketplace
    └── plugins/
        └── vibe-agents/          # Основной плагин
            ├── package.json
            ├── index.ts
            └── .claude/
                ├── agents/       # 21 агент (vibe-*.md)
                ├── skills/       # Автоскиллы
                ├── commands/     # Команды (/task, /learn)
                └── patterns/     # Архитектурные паттерны
```

## ⚙️ Настройка character.ts

Добавьте в ваш `character.ts` или `index.ts`:

```typescript
import { VibeAgentsPlugin } from './plugins/vibe-agents'

export const character = {
    name: 'vibee',

    plugins: [
        // ... ваши другие плагины ...

        VibeAgentsPlugin({
            agents: {
                // Включаем всех 21 агента
                vibeLead: true,
                vibeTasker: true,
                vibeCoder: true,
                vibeCritic: true,
                vibeTypescript: true,
                vibeTester: true,
                vibeSecurity: true,
                vibeDevops: true,
                vibeSentry: true,
                vibeElizaos: true,
                vibeAiLLM: true,
                vibeMCP: true,
                vibeLangfuse: true,
                vibeROI: true,
                vibeUpdater: true,
                vibeKnowledgeKeeper: true,
                vibeDiagnostics: true,
                vibeCICD: true,
                vibeSpec: true,
                vibeQueen: true,
                vibeLearn: true
            },

            swarmIntelligence: {
                enabled: true,
                maxConcurrentAgents: 5,
                autoCoordination: true,
                queenBeePattern: true
            }
        })
    ]
}
```

## 🚀 Проверка Работы

После установки протестируйте:

```bash
# Тест 1: Команда /task
/task Создать простой API с аутентификацией

# Тест 2: Команда /learn
/learn создание-плагина

# Тест 3: Прямой вызов агента
Task(
    subagent_type="vibe-coder",
    description="Создать функцию сортировки",
    prompt="..."
)
```

## 📊 Версии

- **v2.0.48** - Полная система из 21 профессионального агента
- **21/21 агент** - 100% бриллиантовое качество
- **500+ TypeScript примеров** - практические демо
- **20,000+ строк документации** - полное описание

## 🆘 Решение Проблем

### Проблема: "No marketplaces configured"
**Решение:** Сначала добавьте marketplace:
```bash
/plugin marketplace add gHashTag/vibe-agents-marketplace
```

### Проблема: "Plugin not found"
**Решение:** Переустановите плагин:
```bash
/plugin install vibe-agents@vibe-agents-marketplace
```

### Проблема: Агенты не отвечают
**Решение:** Перезапустите Claude Code и проверьте character.ts

---

## 🎉 Готово!

После выполнения всех шагов у вас будет полнофункциональная система из 21 агента для автономной разработки!

**Команды для тестирования:**
- `/task Создать систему авторизации`
- `/task Настроить CI/CD`
- `/learn создание-плагина`

**Время выполнения:** 5-15 минут вместо дней!
