# which

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

:::tip
В скриптах лучше использовать `command -v` вместо `which` — это встроенный механизм shell, работающий быстрее и более предсказуемо.
:::

:::warning
`which` ищет только в `PATH`. Если команда установлена в нестандартное место и не добавлена в PATH, `which` её не найдёт.
:::
