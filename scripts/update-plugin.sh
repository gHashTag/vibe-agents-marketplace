#!/bin/bash

# Скрипт для быстрого обновления плагина в marketplace

echo "🔧 Обновление плагина Vibe Agents Marketplace..."

# 1. Спросить пользователя о версии
echo "Выберите тип обновления:"
echo "1) Patch (1.0.0 → 1.0.1) - исправления багов"
echo "2) Minor (1.0.0 → 1.1.0) - новые фичи"
echo "3) Major (1.0.0 → 2.0.0) - breaking changes"
read -p "Ваш выбор (1-3): " choice

# 2. Считываем текущую версию
current_version=$(grep -o '"version": "[^"]*"' .claude-plugin/marketplace.json | grep -o '[0-9.]*')
IFS='.' read -ra VERSION <<< "$current_version"
major=${VERSION[0]}
minor=${VERSION[1]}
patch=${VERSION[2]}

# 3. Вычисляем новую версию
case $choice in
  1) # Patch
    new_patch=$((patch + 1))
    new_version="$major.$minor.$new_patch"
    ;;
  2) # Minor
    new_minor=$((minor + 1))
    new_patch=0
    new_version="$major.$new_minor.$new_patch"
    ;;
  3) # Major
    new_major=$((major + 1))
    new_minor=0
    new_patch=0
    new_version="$new_major.$new_minor.$new_patch"
    ;;
  *)
    echo "❌ Неверный выбор!"
    exit 1
    ;;
esac

# 4. Обновляем версию в marketplace.json
sed -i '' "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" .claude-plugin/marketplace.json

echo "✅ Версия обновлена: $current_version → $new_version"

# 5. Просим ввести сообщение коммита
read -p "Введите сообщение коммита: " commit_msg

# 6. Коммитим и пушим
git add .
git commit -m "$commit_msg"
git push origin main

echo "🎉 Плагин успешно обновлён до версии $new_version!"
echo ""
echo "Пользователи могут обновить так:"
echo "/plugin marketplace update vibe-agents-marketplace"
echo "/plugin install vibe-agents@vibe-agents-marketplace"
