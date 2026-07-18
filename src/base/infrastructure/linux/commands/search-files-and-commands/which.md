# which

**Уровень:** Средний

Показывает полный путь к исполняемому файлу команды. Ищет в директориях, указанных в переменной `PATH`.

## Синтаксис

```bash
which [опции] команда [команда...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-a` | Показать все совпадения в PATH |
| `--read-alias` | Читать алиасы из stdin (GNU which) |
| `--skip-alias` | Игнорировать алиасы (GNU which) |
| `--skip-functions` | Игнорировать функции (GNU which) |

## Примеры

### Найти путь к команде

```bash
which python3
```

### Найти несколько команд

```bash
which python3 node npm
```

### Показать все совпадения

```bash
which -a python
```

### Проверка наличия команды

```bash
which nginx && echo "Установлен" || echo "Не установлен"
```

### Проверка в скрипте

```bash
if ! command -v docker &> /dev/null; then
  echo "Docker не установлен"
fi
```

### Показать все python-версии

```bash
which -a python python3 python3.11
```

### Использование с алиасами

```bash
which --skip-alias ls
```

### Проверка нескольких утилит

```bash
which git curl wget vim
```

### Получение директории из PATH

```bash
dirname $(which python3)
```

### Проверка перед установкой

```bash
which node || sudo apt install nodejs
```

## Практические сценарии

### Проверка зависимостей в скрипте

```bash
for cmd in git curl docker; do
  which "$cmd" > /dev/null 2>&1 || echo "Отсутствует: $cmd"
done
```

### Определение версии команды

```bash
ls -la $(which java)
```

### Проверка, какая версия используется

```bash
which python3 && python3 --version
```

### Поиск конфликтующих команд

```bash
which -a java
```

### Вывод пути для PATH

```bash
echo "Добавьте в PATH: $(dirname $(which myapp))"
```

## Дополнительные примеры

### Поиск всех экземпляров команды

```bash
which -a python3
```

### Проверка с выводом кода возврата

```bash
which git > /dev/null 2>&1; echo $?
```

### Получение директории команды

```bash
dirname $(which node)
```

### Проверка нескольких команд в цикле

```bash
for cmd in git docker kubectl; do
  which "$cmd" && echo "Найден" || echo "Не найден: $cmd"
done
```

### Вывод только имени команды

```bash
basename $(which python3)
```

## Сравнение: which vs whereis vs type vs command -v

| Инструмент | Ищет | Учитывает алиасы | Встроен в shell | Возвращает |
|------------|------|-------------------|-----------------|------------|
| `which` | Бинарники в PATH | Нет (GNU: опционально) | Нет | Полный путь |
| `whereis` | Бинарники, man, исходники | Нет | Нет | Все расположения |
| `type` | Всё (алиасы, функции, бинарники) | Да | Да | Тип и путь |
| `command -v` | Бинарники и функции | Нет | Да | Путь или имя |
| `hash` | Кэш команд | Нет | Да | Кэшированный путь |

## Практические сценарии

### Проверка наличия команды в скрипте

```bash
#!/bin/bash
if ! command -v docker &> /dev/null; then
  echo "Docker не установлен"
  exit 1
fi
```

### Проверка всех зависимостей

```bash
deps=(git curl docker node npm)
for dep in "${deps[@]}"; do
  which "$dep" > /dev/null 2>&1 || echo "Отсутствует: $dep"
done
```

### Определение, какая версия используется

```bash
which python3
python3 --version
```

### Поиск конфликтующих установок

```bash
which -a java
# Показывает все java в PATH
```

### Автоматическая установка отсутствующих пакетов

```bash
which jq > /dev/null 2>&1 || sudo apt-get install -y jq
```

## Связки с другими командами

### which + whereis — полная информация о команде

```bash
echo "Бинарник: $(which git)"
echo "Все расположения: $(whereis git)"
```

### which + type — проверка алиасов

```bash
which ls    # Показывает /usr/bin/ls
type ls     # Показывает: ls is aliased to 'ls --color=auto'
```

### which + command -v — надёжная проверка в скриптах

```bash
# Рекомендуется в скриптах
command -v docker > /dev/null 2>&1 || { echo "Нет docker"; exit 1; }
```

### which + hash — сброс кэша

```bash
which python3  # Найти путь
hash -r         # Сбросить кэш
```

### which + dirname — получение директории

```bash
export PATH="$PATH:$(dirname $(which myapp))"
```

## См. также

- [whereis](whereis.md) — поиск бинарников, man-страниц и исходников
- [type](type.md) — определение типа команды
- [locate](locate.md) — поиск файлов по базе данных

:::tip
В скриптах лучше использовать `command -v` вместо `which` — это встроенный механизм shell, работающий быстрее и более предсказуемо.
:::

:::warning
`which` ищет только в `PATH`. Если команда установлена в нестандартное место и не добавлена в PATH, `which` её не найдёт.
:::
