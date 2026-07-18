# tldr

Упрощённые справочные страницы с практическими примерами. Community-maintained альтернатива `man` с фокусом на повседневное использование.

## Синтаксис

```bash
tldr [опции] [команда]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-u` | Обновить кеш страниц |
| `-l` | Показать все доступные страницы |
| `-p платформа` | Платформа (linux, osx, windows, common) |
| `-L язык` | Указать язык |
| `--render` | Отрендерить локальный файл |

## Установка

```bash
# Через npm
npm install -g tldr

# Через pip
pip install tldr

# Через snap
sudo snap install tldr

# Debian/Ubuntu
sudo apt install tldr
```

## Примеры

### Справка по команде

```bash
tldr tar
```

### Обновление кеша

```bash
tldr -u
```

### Все доступные страницы

```bash
tldr -l
```

### Страница дляопределённной платформы

```bash
tldr -p linux find
```

### Страница на русском

```bash
tldr -L ru tar
```

### Поиск по подкоманде

```bash
tldr docker-compose
```

### Страница для macOS

```bash
tldr -p osx ls
```

### Просмотр локального файла

```bash
tldr --render ./custom-page.md
```

### Проверка наличия страницы

```bash
tldr mycommand 2>/dev/null && echo "Есть" || echo "Нет"
```

## Практические сценарии

### Быстрое начало работы с командой

```bash
tldr ffmpeg
tldr docker
tldr git
```

### Поиск команды по задаче

```bash
tldr -l | grep -i "compress"
```

### Сравнение с man

```bash
# tldr — практические примеры
tldr tar

# man — полная документация
man tar
```

## tldr vs man

| Параметр | tldr | man |
|----------|------|-----|
| Формат | Markdown | troff |
| Содержимое | Практические примеры | Полная документация |
| Объём | 1-2 страницы | Десятки страниц |
| Язык | Многоязычный | Обычно английский |

## Клиенты tldr

| Клиент | Установка |
|--------|-----------|
| `tldr` (Node.js) | `npm i -g tldr` |
| `tldr-python-client` | `pip install tldr` |
| `tealdeer` (Rust) | `cargo install tealdeer` |

:::tip
`tldr` — лучший выбор для быстрого напоминания синтаксиса. Примеры сразу показывают наиболее частые использования команды.
:::

:::warning
`tldr` не заменяет `man`. Для полного списка опций и деталей используйте `man`.
:::
