# Условные операторы

**Уровень:** Продвинутый

Условные конструкции в bash: if, case и операторы сравнения.

## Синтаксис

```bash
if [ condition ]; then
    commands
elif [ condition ]; then
    commands
else
    commands
fi
```

## Операторы сравнения строк

| Оператор | Описание |
|----------|----------|
| `=` | Равно |
| `!=` | Не равно |
| `-z` | Строка пустая |
| `-n` | Строка не пустая |
| `<` | Лексикографически меньше |
| `>` | Лексикографически больше |

## Операторы сравнения чисел

| Оператор | Описание |
|----------|----------|
| `-eq` | Равно |
| `-ne` | Не равно |
| `-lt` | Меньше |
| `-le` | Меньше или равно |
| `-gt` | Больше |
| `-ge` | Больше или равно |

## Проверки файлов

| Оператор | Описание |
|----------|----------|
| `-f` | Существует и является файлом |
| `-d` | Существует и является директорией |
| `-e` | Существует |
| `-r` | Доступен для чтения |
| `-w` | Доступен для записи |
| `-x` | Доступен для выполнения |
| `-s` | Существует и не пустой |
| `-L` | Является символической ссылкой |
| `-nt` | Новее указанного файла |
| `-ot` | Старее указанного файла |
| `-S` | Является сокетом |
| `-p` | Является именованным каналом |
| `-b` | Является блочным устройством |
| `-c` | Является символьным устройством |

## Логические операторы

| Оператор | Описание |
|----------|----------|
| `-a` | И (в test) |
| `-o` | ИЛИ (в test) |
| `!` | НЕ |
| `&&` | И (между командами) |
| `||` | ИЛИ (между командами) |

## Примеры

### 1. Простое условие if

```bash
if [ "$name" = "Alex" ]; then
    echo "Hello Alex"
fi
```

### 2. if/else

```bash
if [ -f "/etc/passwd" ]; then
    echo "File exists"
else
    echo "File not found"
fi
```

### 3. if/elif/else

```bash
if [ "$age" -lt 18 ]; then
    echo "Minor"
elif [ "$age" -lt 65 ]; then
    echo "Adult"
else
    echo "Senior"
fi
```

### 4. Проверка строки

```bash
if [ -z "$input" ]; then
    echo "Input is empty"
fi

if [ -n "$input" ]; then
    echo "Input: $input"
fi
```

### 5. Проверка файла

```bash
if [ -f "$file" ] && [ -r "$file" ]; then
    cat "$file"
fi
```

### 6. Двойные скобки [[ ]]

```bash
if [[ "$name" == "Alex" && "$age" -gt 18 ]]; then
    echo "Adult Alex"
fi

# Regex в [[ ]]
if [[ "$email" =~ ^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$ ]]; then
    echo "Valid email"
fi
```

### 7. Сравнение строк в [[ ]]

```bash
if [[ "$str" < "abc" ]]; then
    echo "Less than abc"
fi
```

### 8. Логические операторы

```bash
if [ "$a" -gt 0 ] && [ "$b" -gt 0 ]; then
    echo "Both positive"
fi

if [ "$a" -eq 0 ] || [ "$b" -eq 0 ]; then
    echo "At least one is zero"
fi
```

### 9. Конструкция case

```bash
case "$1" in
    start)
        echo "Starting"
        ;;
    stop)
        echo "Stopping"
        ;;
    restart)
        echo "Restarting"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
```

### 10. Паттерны в case

```bash
case "$file" in
    *.tar.gz)
        tar -xzf "$file"
        ;;
    *.zip)
        unzip "$file"
        ;;
    *.tar.bz2)
        tar -xjf "$file"
        ;;
    *)
        echo "Unknown format"
        ;;
esac
```

### 11. Множественные паттерны в case

```bash
case "$answer" in
    y|Y|yes|YES)
        echo "Confirmed"
        ;;
    n|N|no|NO)
        echo "Denied"
        ;;
esac
```

### 12. Тернарный оператор (через && ||)

```bash
[ "$count" -gt 0 ] && echo "Positive" || echo "Zero or negative"
```

### 13. Арифметические условия

```bash
if (( a > b )); then
    echo "$a is greater"
fi

if (( a % 2 == 0 )); then
    echo "Even"
else
    echo "Odd"
fi
```

### 14. Проверка команды

```bash
if command -v git &> /dev/null; then
    echo "Git installed"
else
    echo "Git not found"
fi
```

### 15. Вложенные условия

```bash
if [ -f "$file" ]; then
    if [ -r "$file" ]; then
        if [ -s "$file" ]; then
            cat "$file"
        else
            echo "File is empty"
        fi
    else
        echo "File not readable"
    fi
else
    echo "File not found"
fi
```

## Различия [ ] и [[ ]]

| Особенность | `[ ]` | `[[ ]]` |
|-------------|-------|---------|
| POSIX | Да | Нет (bash/zsh) |
| Regex `=~` | Нет | Да |
| Паттерны `==` | Нет | Да |
| Логические операторы | `-a`, `-o` | `&&`, `\|\|` |
| Защита от кавычек | Нет | Да |

:::tip Используйте [[ ]]
В bash-скриптах предпочитайте `[[ ]]` вместо `[ ]`. Двойные скобки безопаснее (не требуют кавычек вокруг переменных) и поддерживают расширенные операции.
:::

:::warning Кавычки в условиях
В `[ ]` всегда кавычек переменные: `[ "$var" = "value" ]`. Без кавычек пустая переменная вызовет ошибку синтаксиса.
:::

## Советы

:::tip Проверка существования переменной
Используйте `${var:?error message}` для проверки обязательных переменных или `[[ -n "$var" ]]` для проверки.
:::

:::warning Числовое сравнение строк
Не используйте `-eq` для строк. Для строковых сравнений используйте `=` или `==`. Для числовых — `-eq`, `-ne` и т.д.
## См. также

- [variables](variables.md) — переменные
- [loops](loops.md) — циклы

:::
