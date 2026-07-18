# Аргументы скрипта

**Уровень:** Продвинутый

Обработка аргументов командной строки в bash-скриптах.

## Специальные переменные

| Переменная | Описание |
|------------|----------|
| `$1`..`$9` | Позиционные аргументы 1-9 |
| `${10}`.. | Аргументы с номером ≥ 10 |
| `$0` | Имя скрипта |
| `$#` | Количество аргументов |
| `$@` | Все позиционные аргументы; в `"$@"` каждый остаётся отдельным shell-словом |
| `$*` | Все позиционные аргументы; в `"$*"` объединяются первым символом `IFS` |
| `$$` | PID процесса |
| `$!` | PID последнего фонового процесса |
| `$?` | Код возврата |

## Различия $@ и $*

| Раскрытие | Результат |
|-----------|-----------|
| `"$@"` | Одно shell-слово на каждый исходный аргумент; границы аргументов сохраняются |
| `"$*"` | Одно shell-слово: аргументы объединены первым символом `IFS` |
| `$@` или `$*` без кавычек | Выполняются word splitting и pathname expansion; исходные границы аргументов теряются |

## Примеры

### 1. Базовое использование аргументов

```bash
#!/bin/bash
echo "Script: $0"
echo "First arg: $1"
echo "Second arg: $2"
echo "All args: $@"
echo "Count: $#"
```

### 2. Перебор аргументов

```bash
#!/bin/bash
for arg in "$@"; do
    echo "Argument: $arg"
done
```

### 3. Проверка количества аргументов

```bash
#!/bin/bash
if [ $# -lt 2 ]; then
    echo "Usage: $0 <source> <dest>" >&2
    exit 1
fi
```

### 4. Сдвиг аргументов (shift)

```bash
#!/bin/bash
echo "First: $1"
shift
echo "New first: $1"
echo "Remaining: $#"

# Сдвиг на N
shift 2
```

### 5. Обработка опций с getopts

```bash
#!/bin/bash
verbose=false
output=""

while getopts "vo:h" opt; do
    case $opt in
        v) verbose=true ;;
        o) output="$OPTARG" ;;
        h) echo "Usage: $0 [-v] [-o file] [-h]" ; exit 0 ;;
        ?) echo "Invalid option" ; exit 1 ;;
    esac
done
shift $((OPTIND - 1))

echo "Verbose: $verbose"
echo "Output: $output"
echo "Remaining args: $@"
```

### 6. Длинные опции с getopt

```bash
#!/bin/bash
options=$(getopt -o vo:h --long verbose,output:,help -n "$0" -- "$@")
eval set -- "$options"

verbose=false
output=""

while true; do
    case "$1" in
        -v|--verbose) verbose=true; shift ;;
        -o|--output) output="$2"; shift 2 ;;
        -h|--help) echo "Usage: $0 [OPTIONS]"; exit 0 ;;
        --) shift; break ;;
        *) echo "Error"; exit 1 ;;
    esac
done
```

### 7. Конец опций (--)

```bash
#!/bin/bash
# Всё после -- это аргументы, не опции
for arg in "$@"; do
    if [ "$arg" = "--" ]; then
        shift
        break
    fi
    shift
done

echo "Files: $@"
```

### 8. Команда read

```bash
read -p "Enter name: " name
echo "Hello, $name"
```

### 9. read с паролем (скрытый ввод)

```bash
read -s -p "Password: " password
echo
echo "Got password: ${#password} chars"
```

### 10. read с таймаутом

```bash
if read -t 5 -p "Answer in 5 seconds: " answer; then
    echo "You said: $answer"
else
    echo "Timeout!"
fi
```

### 11. read с ограничением символов

```bash
read -n 1 -p "Continue? (y/n): " answer
echo
```

### 12. read в массив

```bash
read -a words -p "Enter words: "
echo "First: ${words[0]}"
echo "All: ${words[@]}"
```

### 13. read с разделителем

```bash
IFS=':' read -r user _ uid gid _ home shell <<< "root:x:0:0:root:/root:/bin/bash"
echo "$user -> $shell"
```

### 14. Чтение CSV

```bash
while IFS=, read -r name age city; do
    echo "Name: $name, Age: $age, City: $city"
done < data.csv
```

### 15. IFS (Internal Field Separator)

```bash
# Изменение разделителя
IFS=':'
read -r a b c <<< "one:two:three"
echo "$a $b $c"

# Восстановление
IFS=$' \t\n'
```

## Опции read

| Опция | Описание |
|-------|----------|
| `-p prompt` | Приглашение для ввода |
| `-s` | Тихий режим (пароли) |
| `-n chars` | Ограничение количества символов |
| `-t timeout` | Таймаут чтения (секунды) |
| `-a array` | Чтение в массив |
| `-d delim` | Альтернативный разделитель |
| `-r` | Raw mode (без интерпретации `\`) |
| `-N chars` | Ровно N символов (включая разделители) |
| `-e` | Использовать readline |

:::tip Всегда используйте -r
Опция `-r` предотвращает интерпретацию обратных слэшей. Без неё `\t` будет интерпретирован как tab.
:::

:::warning $@ vs $*
Всегда используйте `"$@"` (с кавычками) для перебора аргументов. `"$*"` объединяет все аргументы в одну строку.
:::

## Советы

:::tip Паттерн обработки опций
```bash
while [ $# -gt 0 ]; do
    case "$1" in
        -f|--file) file="$2"; shift 2 ;;
        -v|--verbose) verbose=true; shift ;;
        --) shift; break ;;
        -*) echo "Unknown option: $1" >&2; exit 1 ;;
        *) break ;;
    esac
done
```
:::

:::warning OPTIND
После `getopts` всегда делайте `shift $((OPTIND - 1))` для удаления обработанных опций из списка аргументов.
:::

## См. также

- [variables](variables.md) — переменные
- [functions](functions.md) — функции
