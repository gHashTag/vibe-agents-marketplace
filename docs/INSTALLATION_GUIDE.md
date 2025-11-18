# 🚀 Руководство по Установке - Vibe Agents

**Версия:** 2.0.60
**Дата:** 2025-11-18

> Это руководство поможет установить плагин Vibe Agents различными способами.

---

## 🎯 Быстрая Установка (Рекомендуется)

### Для Пользователей

```bash
curl -fsSL https://raw.githubusercontent.com/vibee/vibe-agents-plugin/main/install.sh | bash
```

### Для Разработчиков

```bash
# Клонировать с submodule
git clone --recursive https://github.com/vibee/vibe-agents-plugin.git your-project/.claude/plugins/vibe-agents
```

---

## 📋 Варианты Установки

### 1. 🚀 Автоматическая Установка

**Шаги:**
1. Откройте терминал
2. Выполните команду:
```bash
curl -fsSL https://raw.githubusercontent.com/vibee/vibe-agents-plugin/main/install.sh | bash
```
3. Дождитесь завершения установки
4. Перезапустите Claude Code

**Что происходит:**
- Скачивается последняя версия плагина
- Создаются необходимые директории
- Устанавливаются права доступа
- Создаются скрипты обновления и удаления
- Проверяется корректность установки

---

### 2. 🔧 Ручная Установка

**Шаги:**

#### 2.1 Установить через Git

```bash
# Создать директорию marketplace
mkdir -p ~/.claude/plugins/vibe-agents-marketplace/plugins/

# Клонировать плагин
git clone https://github.com/vibee/vibe-agents-plugin.git ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents

# Перейти в директорию плагина
cd ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents

# Проверить версию
cat .claude-plugin/plugin.json | grep version
```

#### 2.2 Установить через ZIP

```bash
# Скачать последний релиз
wget https://github.com/vibee/vibe-agents-plugin/archive/v2.0.60.tar.gz

# Распаковать
tar -xzf v2.0.60.tar.gz

# Скопировать в marketplace
mkdir -p ~/.claude/plugins/vibe-agents-marketplace/plugins/
cp -r vibe-agents-plugin-2.0.60/* ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/

# Удалить временные файлы
rm -rf v2.0.60.tar.gz vibe-agents-plugin-2.0.60
```

---

### 3. 🔗 Установка через Submodule (для разработчиков)

**Если у вас есть проект с Git:**

```bash
# Добавить submodule
git submodule add https://github.com/vibee/vibe-agents-plugin.git .claude/plugins/vibe-agents

# Инициализировать submodule
git submodule update --init --recursive

# Проверить статус
git submodule status
```

**Если нужно обновить:**

```bash
# Обновить submodule до последней версии
git submodule update --remote --merge

# Или перейти в директорию и обновить вручную
cd .claude/plugins/vibe-agents
git pull origin main
cd ../..
git add .claude/plugins/vibe-agents
git commit -m "chore: update vibe-agents plugin"
```

---

### 4. 🏢 Установка в Организации

**Для команды разработчиков:**

#### Вариант 1: Централизованный репозиторий

```bash
# Клонировать marketplace
git clone https://github.com/your-org/vibe-agents-marketplace.git

# Установить симлинк на центральный плагин
cd vibe-agents-marketplace
ln -s /path/to/vibe-agents-plugin plugins/vibe-agents

# Каждый разработчик клонирует marketplace
git clone https://github.com/your-org/vibe-agents-marketplace.git
```

#### Вариант 2: Скрипт для команды

Создать `install-for-team.sh`:

```bash
#!/bin/bash
# Скрипт для установки в команде

TEAM_PLUGIN_DIR="/shared/vibe-agents-plugin"
USER_MARKETPLACE_DIR="$HOME/.claude/plugins/vibe-agents-marketplace"

# Создать директорию
mkdir -p "$USER_MARKETPLACE_DIR/plugins"

# Создать симлинк на общий плагин
ln -sf "$TEAM_PLUGIN_DIR" "$USER_MARKETPLACE_DIR/plugins/vibe-agents"

echo "✅ Плагин установлен из общего репозитория"
echo "📍 Локация: $USER_MARKETPLACE_DIR/plugins/vibe-agents"
echo "🔄 Обновления: Синхронизируются автоматически"
```

---

## 🎓 Установка для Студентов

### Образовательный Пакет

**Создать репозиторий для студентов:**

```
student-resources/
├── .claude/
│   └── plugins/
│       └── vibe-agents/ → Симлинк на центральный плагин
├── README-STUDENT.md
└── examples/
    ├── react-project/
    ├── node-api/
    └── testing-examples/
```

**Инструкция для студентов:**

```markdown
# Использование Vibe Agents

## Установка
1. Перейдите в директорию проекта
2. Выполните: `git submodule update --init --recursive`
3. Перезапустите Claude Code

## Примеры использования
- `/task Создать React компонент`
- `/learn TDD`

## Документация
- docs/QUICK_START.md - быстрый старт
- docs/DEVELOPMENT_GUIDE.md - лучшие практики
```

---

## 🔄 Обновление

### Автоматическое Обновление

```bash
# Использовать скрипт обновления
~/.claude/plugins/vibe-agents-marketplace/update-vibe-agents.sh
```

### Ручное Обновление

```bash
# Перейти в директорию плагина
cd ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents

# Обновить до последней версии
git fetch origin main
git checkout main
git reset --hard origin/main

# Или обновить до конкретной версии
git checkout v2.0.61
```

---

## 🗑️ Удаление

### Автоматическое Удаление

```bash
# Использовать скрипт удаления
~/.claude/plugins/vibe-agents-marketplace/uninstall-vibe-agents.sh
```

### Ручное Удаление

```bash
# Удалить плагин
rm -rf ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents

# Удалить конфигурацию marketplace
rm -f ~/.claude/plugins/vibe-agents-marketplace/marketplace.json

# Удалить скрипты обновления/удаления
rm -f ~/.claude/plugins/vibe-agents-marketplace/update-vibe-agents.sh
rm -f ~/.claude/plugins/vibe-agents-marketplace/uninstall-vibe-agents.sh

echo "✅ Vibe Agents удалён"
```

---

## ✅ Проверка Установки

### Быстрая Проверка

```bash
# Проверить наличие плагина
ls -la ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/

# Проверить версию
cat ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/.claude-plugin/plugin.json | grep version

# Проверить количество агентов
ls ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/agents/ | wc -l

# Проверить количество skills
ls ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/skills/ | wc -l
```

**Ожидаемый результат:**
```
✅ Версия: v2.0.60
✅ Агентов: 21
✅ Skills: 21
```

### Функциональная Проверка

```bash
# Тест в Claude Code
/task Проверить работу плагина Vibe Agents
```

**Ожидаемый результат:**
```
✅ Плагин работает корректно
✅ Все агенты доступны
✅ Команды /task и /learn работают
```

---

## 🔍 Устранение Проблем

### Проблема: Плагин не загружается

**Решение 1: Проверить права доступа**
```bash
chmod +x ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/scripts/*.sh
```

**Решение 2: Проверить JSON синтаксис**
```bash
python3 -m json.tool ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/.claude-plugin/plugin.json
```

**Решение 3: Проверить структуру директорий**
```bash
find ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents -type f -name "*.md" | head -5
```

### Проблема: Команды /task и /learn не работают

**Решение: Проверить YAML frontmatter**
```bash
head -5 ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/commands/task.md
```

Должно начинаться с:
```yaml
---
description: ...
model: inherit
---
```

### Проблема: Skills не активируются

**Решение: Проверить структуру skills**
```bash
ls ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/skills/testing-tdd/
```

Должно содержать:
- `SKILL.md`
- `examples.md`
- `reference.md`

### Проблема: Ошибка "Plugin not found"

**Решение: Проверить marketplace.json**
```bash
cat ~/.claude/plugins/vibe-agents-marketplace/marketplace.json
```

---

## 📊 Сравнение Методов Установки

| Метод | Сложность | Скорость | Обновления | Контроль |
|-------|-----------|----------|------------|----------|
| Автоматический | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Ручной Git | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Submodule | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| ZIP архив | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

**Рекомендации:**
- **Новички:** Автоматический
- **Разработчики:** Submodule
- **Команда:** Централизованный репозиторий
- **Студенты:** Образовательный пакет

---

## 🎯 Рекомендации

### Для Разработчиков

1. **Используйте Submodule** - это даёт контроль над версиями
2. **Следите за обновлениями** - проверяйте CHANGELOG.md
3. **Тестируйте локально** - перед обновлением в продакшн

### Для Команды

1. **Централизованный репозиторий** - единый источник правды
2. **Скрипты автоматизации** - упрощают установку
3. **Документация** - обучайте команду

### Для Студентов

1. **Образовательный пакет** - готовые примеры
2. **Пошаговые инструкции** - не перегружайте информацией
3. **Практические примеры** - учите на практике

---

## 📞 Поддержка

### Получить Помощь

```bash
# Проверить документацию
cat ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/docs/QUICK_START.md

# Проверить примеры
cat ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents/docs/EXAMPLES.md

# Создать issue
# https://github.com/vibee/vibe-agents-plugin/issues
```

### Связаться с Нами

- **Email:** team@vibee.dev
- **GitHub:** https://github.com/vibee/vibe-agents-plugin
- **Документация:** https://vibee.dev/docs/vibe-agents

---

## 🎉 Заключение

**Vibe Agents** легко установить и использовать! Выберите метод, который подходит именно вам, и начинайте использовать мощь 21 AI-агента для автономной разработки.

**Следующий шаг:** Прочитайте [QUICK_START.md](docs/QUICK_START.md) для начала работы.

---

*Руководство обновлено: 2025-11-18*
*Версия плагина: 2.0.60*
