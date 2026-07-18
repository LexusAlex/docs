# Функции bash

**Уровень:** Продвинутый

Создание и использование функций в bash-скриптах.

## Синтаксис

```bash
# Вариант 1
function name {
    commands
}

# Вариант 2 (предпочтительный)
name() {
    commands
}
```

## Примеры

### 1. Простая функция

```bash
greet() {
    echo "Hello, World!"
}
greet
```

### 2. Функция с аргументами

```bash
greet() {
    echo "Hello, $1! You are $2 years old."
}
greet "Alex" 30
```

### 3. Локальные переменные

```bash
calculate() {
    local a=$1
    local b=$2
    local result=$((a + b))
    echo "$result"
}
sum=$(calculate 5 3)
```

### 4. Возврат кода

```bash
is_even() {
    if (( $1 % 2 == 0 )); then
        return 0
    else
        return 1
    fi
}

if is_even 4; then
    echo "Even"
fi
```

### 5. Возврат значения через echo

```bash
get_hostname() {
    echo "$(hostname -f)"
}
host=$(get_hostname)
```

### 6. Возврат массива

```bash
get_files() {
    local -n result=$1
    result=()
    for f in *.txt; do
        result+=("$f")
    done
}

get_files my_files
echo "${my_files[@]}"
```

### 7. Значения по умолчанию

```bash
connect() {
    local host="${1:-localhost}"
    local port="${2:-8080}"
    echo "Connecting to $host:$port"
}
connect
connect "example.com" "443"
```

### 8. Проверка количества аргумент

```bash
backup() {
    if [ $# -lt 2 ]; then
        echo "Usage: backup <source> <dest>" >&2
        return 1
    fi
    local src="$1"
    local dst="$2"
    cp -r "$src" "$dst"
}
```

### 9. Имя функции ($FUNCNAME)

```bash
log() {
    echo "[$FUNCNAME] $1"
}
log "Starting process"
```

### 10. Рекурсия

```bash
factorial() {
    if [ $1 -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $(( $1 - 1 )))
        echo $(( $1 * prev ))
    fi
}
result=$(factorial 5)
```

### 11. Экспорт функции

```bash
helper() {
    echo "I help"
}
export -f helper

# Теперь доступна в subshell
bash -c 'helper'
```

### 12. Библиотека функций

Создайте файл `lib.sh`:

```bash
log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') $1"
}

log_error() {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') $1" >&2
}

check_command() {
    command -v "$1" &> /dev/null
}
```

Использование:

```bash
source lib.sh
log_info "Script started"
```

### 13. trap для очистки

```bash
cleanup() {
    echo "Cleaning up..."
    rm -f "$temp_file"
}

trap cleanup EXIT

temp_file=$(mktemp)
echo "Working with $temp_file"
```

### 14. Обработка ошибок

```bash
error_handler() {
    echo "Error on line $1" >&2
    exit 1
}

trap 'error_handler $LINENO' ERR

# Любая ошибка вызовет error_handler
false
```

### 15. Функция с trap для разных сигналов

```bash
setup_traps() {
    trap 'echo "Caught SIGHUP"; reload_config' HUP
    trap 'echo "Caught SIGINT"; graceful_shutdown' INT
    trap 'echo "Caught SIGTERM"; graceful_shutdown' TERM
}
```

## Область видимости

| Контекст | Описание |
|----------|----------|
| `local` | Только внутри функции |
| `global` (по умолчанию) | Доступна везде |
| `declare -g` | Принудительно глобальная |

:::tip local обязательны
Всегда используйте `local` для переменных в функциях. Без `local` переменные перезаписывают глобальные и могут вызвать неожиданные побочные эффекты.
:::

:::warning return vs echo
`return` возвращает только код 0-255. Для возврата данных используйте `echo` с command substitution: `result=$(my_func)`.
:::

## Советы

:::tip Проверка существования функции
```bash
if declare -f "my_func" > /dev/null; then
    my_func
fi
```
:::

:::warning Субшеллы и pipe
Функции в pipe (`command | while read`) выполняются в subshell. Изменения переменных не сохраняются. Используйте process substitution.
:::

## См. также

- [variables](variables.md) — переменные
- [arguments](arguments.md) — аргументы
