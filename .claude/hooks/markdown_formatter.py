#!/usr/bin/env python3
"""
Claude Code Hook - Markdown Formatter
Автоматически форматирует Markdown файлы при сохранении
"""

import json
import sys
import re

def format_markdown(content: str) -> str:
    """
    Форматирует Markdown контент согласно best practices
    """
    lines = content.split('\n')
    formatted = []

    for line in lines:
        # Исправляем пробелы вокруг заголовков
        if re.match(r'^#{1,6}\s', line):
            line = re.sub(r'\s+', ' ', line.strip())

        # Исправляем множественные пробелы
        line = re.sub(r'\s{2,}', ' ', line)

        # Добавляем пустую строку после заголовков
        if re.match(r'^#{1,3}\s', line) and formatted and formatted[-1]:
            formatted.append('')

        formatted.append(line)

    # Убираем лишние пустые строки
    result = []
    prev_empty = False
    for line in formatted:
        current_empty = not line.strip()
        if not (current_empty and prev_empty):
            result.append(line)
        prev_empty = current_empty

    return '\n'.join(result)

def main():
    """
    Главная функция hook
    Получает JSON данные от Claude Code через stdin
    """
    try:
        # Читаем JSON данные от Claude Code
        data = json.load(sys.stdin)

        # Получаем путь к файлу
        file_path = data.get('tool_input', {}).get('file_path', '')

        # Проверяем, что это Markdown файл
        if file_path.endswith(('.md', '.mdx', '.markdown')):
            print(f"🔧 Formatting Markdown file: {file_path}", file=sys.stderr)

            # Читаем содержимое
            content = data.get('tool_input', {}).get('content', '')

            # Форматируем
            formatted_content = format_markdown(content)

            # Выводим отформатированный контент
            print(formatted_content)
        else:
            # Если не Markdown, просто выводим оригинал
            content = data.get('tool_input', {}).get('content', '')
            if content:
                print(content)

    except Exception as e:
        print(f"❌ Hook error: {e}", file=sys.stderr)
        # В случае ошибки просто выводим оригинал
        content = data.get('tool_input', {}).get('content', '') if 'data' in locals() else ''
        if content:
            print(content)

if __name__ == '__main__':
    main()
