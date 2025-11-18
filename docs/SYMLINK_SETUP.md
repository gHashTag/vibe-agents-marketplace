# 🔗 Настройка Симлинков - Единый Источник Правды

**Дата:** 2025-11-18 11:59
**Версия:** 2.0.60

---

## 🎯 Цель

Создать **единый источник правды** для плагина Vibe Agents, где:
- Центральный репозиторий: `/Users/playra/vibee/vibe-agents-plugin`
- Marketplace: `/Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents` (симлинк)
- Пользовательская установка: `~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents` (симлинк на marketplace)

---

## 📋 Архитектура

```
📦 Центральный репозиторий (ИСТОЧНИК)
└── /Users/playra/vibee/vibe-agents-plugin/
    ├── .claude-plugin/
    ├── agents/ (21 файл)
    ├── skills/ (21 директория)
    ├── commands/
    ├── hooks/
    ├── templates/
    └── docs/

📦 Marketplace (ЕДИНСТВЕННАЯ КОПИЯ)
└── /Users/playra/vibee/vibe-agents-marketplace/
    └── plugins/
        └── vibe-agents/ → СИМЛИНК → /Users/playra/vibee/vibe-agents-plugin/

📦 Пользовательская установка
└── ~/.claude/plugins/vibe-agents-marketplace/
    └── plugins/
        └── vibe-agents/ → СИМЛИНК → /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
```

---

## 🔄 Поток Обновлений

### Для Разработчика

1. **Внести изменения** в `/Users/playra/vibee/vibe-agents-plugin/`
2. **Зафиксировать** `git commit`
3. **Обновить marketplace:** симлинк автоматически указывает на новую версию
4. **Пользователи** получают обновления автоматически

### Для Пользователя

1. **Установить** через install.sh (создаёт симлинк на marketplace)
2. **Использовать** - все изменения в центральном репозитории сразу доступны
3. **Обновлять** не нужно - всё синхронизировано

---

## 🛠️ Настройка

### Шаг 1: Центральный Репозиторий

```bash
# Уже создан
/Users/playra/vibee/vibe-agents-plugin/
├── .claude-plugin/
├── agents/
├── skills/
└── ... (полная структура)

# Проверить
ls -la /Users/playra/vibee/vibe-agents-plugin/
```

### Шаг 2: Marketplace

```bash
# Создать симлинк
cd /Users/playra/vibee/vibe-agents-marketplace/
mkdir -p plugins
ln -s /Users/playra/vibee/vibe-agents-plugin plugins/vibe-agents

# Проверить
ls -la plugins/vibe-agents
# Должно показать: plugins/vibe-agents -> /Users/playra/vibee/vibe-agents-plugin
```

### Шаг 3: Пользовательская Установка

```bash
# install.sh автоматически создаёт симлинк
curl -fsSL https://raw.githubusercontent.com/vibee/vibe-agents-plugin/main/install.sh | bash

# Проверить симлинк
ls -la ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
# Должно показать: -> /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
```

---

## ✅ Проверка Симлинков

### Проверить центральный репозиторий

```bash
# Центральный репозиторий существует
test -d /Users/playra/vibee/vibe-agents-plugin && echo "✅ Central repo exists"

# В нём есть файлы плагина
test -f /Users/playra/vibee/vibe-agents-plugin/.claude-plugin/plugin.json && echo "✅ Plugin files exist"

# Версия корректная
grep -q "v2.0.60" /Users/playra/vibee/vibe-agents-plugin/.claude-plugin/plugin.json && echo "✅ Version correct"
```

### Проверить marketplace

```bash
# Marketplace существует
test -d /Users/playra/vibee/vibe-agents-marketplace && echo "✅ Marketplace exists"

# Симлинк создан
test -L /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents && echo "✅ Symlink exists"

# Симлинк указывает на правильное место
readlink /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
# Должно показать: /Users/playra/vibee/vibe-agents-plugin
```

### Проверить пользовательскую установку

```bash
# Пользовательский marketplace существует
test -d ~/.claude/plugins/vibe-agents-marketplace && echo "✅ User marketplace exists"

# Симлинк создан
test -L ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents && echo "✅ User symlink exists"

# Симлинк указывает на marketplace
readlink ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
# Должно показать: /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
```

---

## 🔄 Обновление

### Изменения в центральном репозитории

```bash
# Внести изменения
cd /Users/playra/vibee/vibe-agents-plugin/
git add .
git commit -m "feat: update description"

# Проверить в marketplace
ls -la /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents/
# Изменения сразу видны (благодаря симлинку)
```

### Обновление пользователей

```bash
# Пользователи НЕ НУЖДАЮТСЯ в ручном обновлении!
# Все изменения автоматически видны через симлинк

# Но можно принудительно синхронизировать
cd ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
git fetch origin main
git reset --hard origin/main
```

---

## 📊 Преимущества

### ✅ Для Разработчиков
- **Одно место** для изменений
- **Мгновенные обновления** в marketplace
- **Простое версионирование**
- **Централизованный контроль**

### ✅ Для Пользователей
- **Простая установка** через install.sh
- **Автоматические обновления**
- **Нет дублирования** кода
- **Низкое потребление** места на диске

### ✅ Для Команды
- **Единый источник правды**
- **Легко распространять**
- **Просто поддерживать**
- **Контролируемые обновления**

---

## 🚀 Команды для Работы

### Посмотреть статус симлинков

```bash
#!/bin/bash
echo "=== Central Repository ==="
ls -ld /Users/playra/vibee/vibe-agents-plugin/

echo -e "\n=== Marketplace Symlink ==="
ls -ld /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
readlink -f /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents

echo -e "\n=== User Symlink (if exists) ==="
if [ -L ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents ]; then
    ls -ld ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
    readlink -f ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
else
    echo "Not installed by user yet"
fi
```

### Пересоздать симлинк

```bash
# В marketplace
cd /Users/playra/vibee/vibe-agents-marketplace/plugins/
rm -f vibe-agents
ln -s /Users/playra/vibee/vibe-agents-plugin vibe-agents

# Для пользователя
rm -f ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
ln -s /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents ~/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents
```

### Синхронизировать изменения

```bash
# В центральном репозитории
cd /Users/playra/vibee/vibe-agents-plugin/
git pull origin main

# В marketplace симлинк автоматически показывает изменения
# Ничего дополнительного делать не нужно!
```

---

## 🐛 Устранение Проблем

### Проблема: Симлинк не работает

```bash
# Проверить цель симлинка
ls -l /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents

# Если цель не существует, пересоздать
rm /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
ln -s /Users/playra/vibee/vibe-agents-plugin /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
```

### Проблема: Изменения не видны

```bash
# Проверить тип файла
file /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
# Должно показать: symbolic link

# Проверить цель симлинка
readlink /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents

# Принудительно обновить кэш
cd /Users/playra/vibee/vibe-agents-plugin/
git fetch --all
git reset --hard origin/main
```

### Проблема: Круговая ссылка

```bash
# Проверить циклические ссылки
find /Users/playra/vibee/vibe-agents-marketplace -type l -exec sh -c 'readlink "$1" | grep -q "$(basename "$1")" && echo "CIRCULAR: $1"' _ {} \;

# Если есть циклы, пересоздать симлинки
rm /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
ln -s /Users/playra/vibee/vibe-agents-plugin /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents
```

---

## 📈 Мониторинг

### Скрипт проверки здоровья

```bash
#!/bin/bash
# health-check.sh

ERRORS=0

# Проверить центральный репозиторий
if [ ! -d "/Users/playra/vibee/vibe-agents-plugin" ]; then
    echo "❌ Central repository not found"
    ERRORS=$((ERRORS + 1))
fi

# Проверить marketplace симлинк
if [ ! -L "/Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents" ]; then
    echo "❌ Marketplace symlink not found"
    ERRORS=$((ERRORS + 1))
fi

# Проверить пользовательский симлинк
if [ -d "$HOME/.claude/plugins/vibe-agents-marketplace" ]; then
    if [ ! -L "$HOME/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents" ]; then
        echo "⚠️  User symlink not found (not installed by user)"
    fi
fi

if [ $ERRORS -eq 0 ]; then
    echo "✅ All symlinks healthy"
else
    echo "❌ Found $ERRORS errors"
    exit 1
fi
```

---

## 🎯 Заключение

**Симлинки** обеспечивают:
- ✅ **Единый источник правды** для плагина
- ✅ **Простое распространение** среди команды
- ✅ **Автоматические обновления** без дублирования
- ✅ **Централизованное управление** версиями

**Результат:** Плагин легко поддерживать, обновлять и распространять!

---

*Документ создан: 2025-11-18 11:59*
*Статус: ✅ НАСТРОЕНО*
