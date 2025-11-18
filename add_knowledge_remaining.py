#!/usr/bin/env python3
"""
Добавляет секцию знания в остальные 13 агентов
"""

import os
import glob

# Список всех оставшихся агентов
REMAINING_AGENTS = [
    'vibe-elizaos.md',
    'vibe-ai-llm.md',
    'vibe-mcp.md',
    'vibe-sentry.md',
    'vibe-langfuse.md',
    'vibe-roi.md',
    'vibe-updater.md',
    'vibe-knowledge-keeper.md',
    'vibe-diagnostics.md',
    'vibe-learn.md',
    'vibe-queen.md',
    'vibe-cicd.md'
]

def add_knowledge_section(file_path, agent_name):
    """Добавляет секцию знания в файл агента"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Проверяем, есть ли уже секция знания
    if '### 🆔 Знание Других Агентов' in content:
        print(f"⚠️ {file_path}: секция уже существует")
        return False
    
    # Находим место для вставки (после первого заголовка ##)
    pattern = r'(## [^#\n]+[^#]\n)'
    match = re.search(pattern, content)
    
    if not match:
        print(f"❌ {file_path}: не найдено место для вставки")
        return False
    
    # Формируем секцию знания
    knowledge_section = f"""
### 🆔 Знание Других Агентов

**Знает и Взаимодействует С:**
- `vibe-lead (👑) - получаю от него координацию`
- `vibe-spec (📋) - могу использовать его спецификации`
- `vibe-tasker (✅) - получаю планирование от него`
- `vibe-coder (💻) - взаимодействую с его кодом`
- `vibe-tester (🧪) - могу использовать его тесты`
- `vibe-critic (🎭) - получаю feedback по работе`

**Получает Задачи От:**
- `vibe-lead (👑) - получаю основные задачи`
- `vibe-queen (🐝) - могу получить задачи от главного координатора`
- Другие агенты могут взаимодействовать со мной

**Пример Взаимодействия:**
```typescript
// Запуск с resume для продолжения контекста
Task({{
  subagent_type: '{agent_name}',
  description: 'задача для {agent_name}',
  prompt: 'Детали задачи...',
  resume: 'previous-agent-id'  // Продолжает работу предыдущего агента
}});

// Получение agentId для последующего использования
const agentId = await Task({{
  subagent_type: '{agent_name}',
  description: 'Начать работу'
}});
```
"""
    
    # Вставляем секцию
    insert_pos = match.end()
    new_content = content[:insert_pos] + knowledge_section + content[insert_pos:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ {file_path}: добавлена секция знания")
    return True

import re

def main():
    agents_dir = '.claude/agents/'
    updated_count = 0
    
    for filename in REMAINING_AGENTS:
        file_path = os.path.join(agents_dir, filename)
        if os.path.exists(file_path):
            agent_name = filename.replace('.md', '')
            if add_knowledge_section(file_path, agent_name):
                updated_count += 1
        else:
            print(f"⚠️ Файл не найден: {file_path}")
    
    print(f"\n🎉 Обновлено агентов: {updated_count}/{len(REMAINING_AGENTS)}")

if __name__ == '__main__':
    main()
