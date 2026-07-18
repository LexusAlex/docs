# Циклы

**Уровень:** Продвинутый

Циклы в bash: for, while, until, select и связанные конструкции.

## Синтаксис

```bash
# for со списком
for var in list; do commands; done

# for в стиле C
for ((init; condition; step)); do commands; done

# while
while [ condition ]; do commands; done

# until
until [ condition ]; do commands; done

# select (меню)
select var in list; do commands; done
```

## Примеры

### 1. Цикл for со списком

```bash
for name in Alex Bob Charlie; do
    echo "Hello, $name"
done
```

### 2. Перебор файлов

```bash
for file in *.txt; do
    echo "Processing: $file"
    wc -l "$file"
done
```

### 3. Перебор чисел (brace expansion)

```bash
for i in {1..10}; do
    echo "$i"
done

for i in {0..100..5}; do
    echo "$i"   # шаг 5
done
```

### 4. Цикл for в стиле C

```bash
for ((i = 0; i < 10; i++)); do
    echo "Iteration $i"
done
```

### 5. Перебор массива

```bash
fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do
    echo "$fruit"
done
```

### 6. Перебор аргументов скрипта

```bash
for arg in "$@"; do
    echo "Argument: $arg"
done
```

### 7. Цикл while

```bash
count=0
while [ $count -lt 5 ]; do
    echo "Count: $count"
    ((count++))
done
```

### 8. Чтение файла построчно

```bash
while IFS= read -r line; do
    echo "Line: $line"
done < file.txt
```

### 9. Чтение файла с разделителем

```bash
while IFS=: read -r user _ uid gid _ home shell; do
    echo "$user -> $shell"
done < /etc/passwd
```

### 10. Цикл until

```bash
count=10
until [ $count -eq 0 ]; do
    echo "Countdown: $count"
    ((count--))
done
```

### 11. Бесконечный цикл

```bash
while true; do
    echo "Running..."
    sleep 1
done

# Альтернатива
for ((;;)); do
    echo "Running..."
    sleep 1
done
```

### 12. Меню select

```bash
echo "Choose an option:"
select option in "Start" "Stop" "Restart" "Quit"; do
    case $option in
        Start)   echo "Starting";;
        Stop)    echo "Stopping";;
        Restart) echo "Restarting";;
        Quit)    break;;
        *)       echo "Invalid option";;
    esac
done
```

### 13. break и continue

```bash
for i in {1..100}; do
    if [ $i -eq 10 ]; then
        break           # выход из цикла
    fi
    if [ $((i % 3)) -eq 0 ]; then
        continue        # пропуск итерации
    fi
    echo "$i"
done
```

### 14. Вложенные циклы

```bash
for i in {1..3}; do
    for j in {1..3}; do
        echo "($i, $j)"
    done
done
```

### 15. Параллельное выполнение

```bash
for file in *.txt; do
    process_file "$file" &
done
wait   # ожидание завершения всех фоновых процессов
```

### 16. Чтение вывода команды

```bash
while IFS= read -r pid; do
    echo "Process: $pid"
done < <(pgrep -u alex)
```

### 17. Цикл с pipe

```bash
cat file.txt | while IFS= read -r line; do
    echo "Processing: $line"
done
```

:::warning Pipe vs redirection
При чтении файла через pipe (`cat | while`) цикл выполняется в subshell. Переменные, изменённые внутри, не сохраняются. Используйте redirection (`while ... done < file`) или process substitution.
:::

:::tip IFS и пробелы
Используйте `IFS=` перед `read` для сохранения пробелов в начале и конце строк. Без этого leading/trailing пробелы будут удалены.
:::

## Советы

:::tip Проверка существования файлов
При `for file in *.txt`, если файлов нет, цикл выполнится один раз с паттерном `*.txt`. Используйте `shopt -s nullglob` для пропуска.
:::

:::warning Параллельное выполнение
При использовании `&` для параллельных задач ограничивайте количество: `for ...; do process & [[ $(jobs -r) -ge 4 ]] && wait -n; done`.
:::

## См. также

- [conditions](conditions.md) — условия
- [variables](variables.md) — переменные
