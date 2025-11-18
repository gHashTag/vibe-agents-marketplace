# Claude Code Hooks - Автоматизация

## Обзор

Данная директория содержит hooks для автоматизации в Claude Code. Hooks позволяют выполнять автоматические действия при использовании инструментов.

## 🎣 Типы Hooks

### 1. **Command Hooks** (JSON конфигурация)
Конфигурируются через `/hooks` команду в Claude Code или в `.claude/settings.json`.

### 2. **Python Hooks** (Python скрипты)
Более сложная автоматизация через Python скрипты.

## 📦 Доступные Hooks

### 1. Markdown Formatter (`markdown_formatter.py`)
**Назначение**: Автоматически форматирует Markdown файлы

**Возможности**:
- Исправляет пробелы в заголовках
- Убирает лишние пробелы
- Добавляет пустые строки после заголовков
- Нормализует отступы

**Использование**:
```json
{
  "matcher": "Write",
  "hooks": [
    {
      "type": "command",
      "command": "python3 .claude/hooks/markdown_formatter.py"
    }
  ]
}
```

## 🚀 Установка Hooks

### Через CLI (Рекомендуется)

1. **Логирование Bash команд**:
```bash
/claude hooks add PreToolUse Bash --matcher Bash --command \
  'jq -r "\"\(.tool_input.command) - \(.tool_input.description // \"No description\")\"" >> ~/.claude/bash-command-log.txt'
```

2. **Автоформатирование TypeScript**:
```bash
/claude hooks add PostToolUse Edit --matcher Edit|Write --command \
  'jq -r ".tool_input.file_path" | xargs -I {} npx prettier --write {}'
```

3. **Защита критичных файлов**:
```bash
/claude hooks add PreToolUse Edit --matcher Edit|Write --command \
  'jq -r ".tool_input.file_path" | grep -qE "(\.env|package-lock\.json|\.git/)" && exit 2 || exit 0'
```

### Через Настройки

Отредактируйте `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | grep -qE '(\\.env|package-lock\\.json|\\.git/)' && exit 2 || exit 0"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I {} npx prettier --write {} 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

## 🎯 Рекомендуемые Hooks

### 1. **Bash Command Logging** (PreToolUse)
Логирует все выполненные Bash команды

```bash
jq -r '"\\(.tool_input.command) - \\(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

### 2. **File Protection** (PreToolUse)
Блокирует редактирование критичных файлов

```bash
jq -r '.tool_input.file_path' | grep -qE '(\\.env|package-lock\\.json|\\.git/)' && exit 2 || exit 0
```

### 3. **Auto-formatting** (PostToolUse)
Автоматически форматирует код после редактирования

```bash
# TypeScript/JavaScript
jq -r '.tool_input.file_path' | grep -q '\\.ts$' && npx prettier --write {} || true

# Python
jq -r '.tool_input.file_path' | grep -q '\\.py$' && black {} || true
```

### 4. **TypeScript Type Check** (PostToolUse)
Проверяет типы TypeScript после изменений

```bash
jq -r '.tool_input.file_path' | grep -q '\\.ts$' && npx tsc --noEmit || true
```

### 5. **Test Run** (PostToolUse)
Автоматически запускает тесты при изменениях

```bash
jq -r '.tool_input.file_path' | grep -qE '(\\.(test|spec)\\.ts|src/)' && npm test || true
```

## 🔒 Безопасность

⚠️ **ВАЖНО**: Hooks выполняются с вашими текущими credentials. Всегда:

1. Проверяйте код hooks перед регистрацией
2. Не добавляйте hooks из ненадежных источников
3. Ограничивайте доступ к чувствительным данным
4. Регулярно проверяйте logs

## 🛠️ Отладка Hooks

### Проверка конфигурации
```bash
# Просмотр активных hooks
cat ~/.claude/settings.json | jq '.hooks'

# Тест hook
echo '{"tool_input":{"command":"ls","file_path":"test.ts"}}' | python3 .claude/hooks/markdown_formatter.py
```

### Логирование
Hook команды могут писать в stderr:
```bash
# Добавить логирование
jq -r '"Hook executed for: \(.tool_input.file_path)"' >&2
```

## 📚 Ресурсы

- [Официальная документация Hooks](https://code.claude.com/docs/en/hooks-guide)
- [Hook Events Reference](https://code.claude.com/docs/en/reference/hooks-events)
- [Security Best Practices](https://code.claude.com/docs/en/hooks-guide#security-considerations)

## 🔄 Управление Hooks

### Добавление
```bash
/claude hooks add <Event> <Matcher> --matcher <Pattern> --command "<Command>"
```

### Удаление
```bash
/claude hooks remove <Event> <Matcher>
```

### Просмотр
```bash
/claude hooks list
```

---

*Автоматизация делает разработку эффективнее! 🚀*
