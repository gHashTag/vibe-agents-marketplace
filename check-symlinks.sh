#!/bin/bash
# Скрипт проверки здоровья симлинков
# Дата: 2025-11-18 12:38

echo "=== ПРОВЕРКА СИМЛИНКОВ VIBE AGENTS ==="
echo ""

ERRORS=0

# Проверить центральный репозиторий
echo "1. Центральный репозиторий:"
if [ -d "/Users/playra/vibee/vibe-agents-plugin" ]; then
    echo "   ✅ Найден: /Users/playra/vibee/vibe-agents-plugin"
    ls -ld /Users/playra/vibee/vibe-agents-plugin | awk '{print "   📁", $9, "(" $1 ")"}'

    # Проверить файлы плагина
    if [ -f "/Users/playra/vibee/vibe-agents-plugin/.claude-plugin/plugin.json" ]; then
        echo "   ✅ plugin.json найден"
        grep -q "v2.0.60" /Users/playra/vibee/vibe-agents-plugin/.claude-plugin/plugin.json && echo "   ✅ Версия: v2.0.60"
    else
        echo "   ❌ plugin.json НЕ найден"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "   ❌ НЕ найден: /Users/playra/vibee/vibe-agents-plugin"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Проверить marketplace симлинк
echo "2. Marketplace симлинк:"
if [ -d "/Users/playra/vibee/vibe-agents-marketplace" ]; then
    echo "   ✅ Найден: /Users/playra/vibee/vibe-agents-marketplace"
else
    echo "   ❌ НЕ найден: /Users/playra/vibee/vibe-agents-marketplace"
    ERRORS=$((ERRORS + 1))
    exit 1
fi

if [ -L "/Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents" ]; then
    echo "   ✅ Симлинк существует"
    TARGET=$(readlink /Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents)
    echo "   🔗 Указывает на: $TARGET"

    if [ "$TARGET" = "/Users/playra/vibee/vibe-agents-plugin" ]; then
        echo "   ✅ Цель корректная"
    else
        echo "   ❌ Неверная цель (ожидается /Users/playra/vibee/vibe-agents-plugin)"
        ERRORS=$((ERRORS + 1))
    fi

    # Проверить, что симлинк работает
    if [ -f "/Users/playra/vibee/vibe-agents-marketplace/plugins/vibe-agents/.claude-plugin/commands/task.md" ]; then
        echo "   ✅ Симлинк работает (task.md доступен)"
    else
        echo "   ❌ Симлинк НЕ работает"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "   ❌ Симлинк НЕ найден"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Проверить пользовательский симлинк (если существует)
echo "3. Пользовательская установка:"
if [ -d "$HOME/.claude/plugins/vibe-agents-marketplace" ]; then
    echo "   ✅ Пользовательский marketplace найден"
    if [ -L "$HOME/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents" ]; then
        echo "   ✅ Пользовательский симлинк существует"
        USER_TARGET=$(readlink $HOME/.claude/plugins/vibe-agents-marketplace/plugins/vibe-agents)
        echo "   🔗 Указывает на: $USER_TARGET"
    else
        echo "   ⚠️  Пользовательский симлинк НЕ найден (не установлен пользователем)"
    fi
else
    echo "   ℹ️  Пользовательский marketplace не найден (не установлен)"
fi
echo ""

# Итоговый статус
echo "=== РЕЗУЛЬТАТ ==="
if [ $ERRORS -eq 0 ]; then
    echo "✅ ВСЁ В ПОРЯДКЕ!"
    echo "   Центральный репозиторий настроен"
    echo "   Marketplace симлинк работает"
    echo "   Команда /task доступна"
    exit 0
else
    echo "❌ НАЙДЕНО ОШИБОК: $ERRORS"
    echo "   Проверьте вывод выше"
    exit 1
fi
