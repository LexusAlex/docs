# Конвейеры (pipes)

**Уровень:** Продвинутый

Передача вывода одной команды на вход другой.

## Синтаксис

```bash
command1 | command2
command1 | command2 | command3
```

## Как работают pipes

1. `fork()` — создание нового процесса
2. `pipe()` — создание канала
3. `dup2()` — перенаправление stdin/stdout
4. `exec()` — запуск команд

## Примеры

### 1. Базовый pipe

```bash
ls -la | less
```

### 2. Фильтрация вывода

```bash
ps aux | grep nginx
```

### 3. Подсчёт строк

```bash
cat file.txt | wc -l
```

### 4. Сортировка и уникальность

```bash
cat access.log | sort | uniq -c | sort -rn
```

### 5. Извлечение столбцов

```bash
ps aux | awk '{print $1, $11}'
```

### 6. Pipe с grep

```bash
dmesg | grep -i error
journalctl | grep -i fail
```

### 7. Цепочка фильтров

```bash
cat /var/log/auth.log | grep "Failed" | awk '{print $11}' | sort | uniq -c | sort -rn
```

### 8. Статус конвейера

```bash
echo "test" | grep "test"
echo "Exit code: ${PIPESTATUS[@]}"
```

### 9. Все коды возврата

```bash
false | true | false
echo "${PIPESTATUS[0]} ${PIPESTATUS[1]} ${PIPESTATUS[2]}"
# 1 0 1
```

### 10. Именованный pipe (FIFO)

```bash
mkfifo /tmp/mypipe
echo "Hello" > /tmp/mypipe &
cat /tmp/mypipe
rm /tmp/mypipe
```

### 11. Process substitution

```bash
diff <(ls dir1) <(ls dir2)
```

### 12. Запись в process substitution

```bash
tee >(gzip > output.gz) >(sha256sum > checksum.txt) < input.txt
```

### 13. Pipe с xargs

```bash
find /tmp -name "*.log" | xargs rm
```

### 14. Pipe с while read

```bash
cat hosts.txt | while IFS= read -r host; do
    ping -c 1 "$host"
done
```

### 15. Pipe с sudo

```bash
echo "password" | sudo -S command
```

### 16. Множественные pipe

```bash
cat /etc/passwd | cut -d: -f1 | sort | head -5
```

### 17. Pipe для логирования

```bash
./script.sh 2>&1 | tee output.log
```

## Именованные pipes (FIFO)

```bash
# Создание
mkfifo /tmp/pipe

# Writer
echo "data" > /tmp/pipe

# Reader
cat /tmp/pipe

# Cleanup
rm /tmp/pipe
```

| Свойство | Обычный pipe | FIFO |
|----------|-------------|------|
| Имя | Нет | Да |
| Персистентность | Временный | Постоянный |
| Процессы | Родственные | Любые |
| Создание | Автоматически | `mkfifo` |

## Process Substitution

| Синтаксис | Описание |
|-----------|----------|
| `<(command)` | Вывод команды как файл для чтения |
| `>(command)` | Вывод идёт в команду |

```bash
# Сравнение вывода двух команд
diff <(curl -s url1) <(curl -s url2)

# Чтение из нескольких источников
paste <(cut -f1 file1) <(cut -f2 file2)
```

## Буферизация pipe

По умолчанию pipe буферизуют вывод (обычно 4KB-64KB). Для мгновенного вывода:

```bash
# stdbuf
stdbuf -oL command | grep pattern

# unbuffer (expect)
unbuffer command | grep pattern

# awk
command | awk '{print; fflush()}'
```

:::tip PIPESTATUS
Используйте `${PIPESTATUS[@]}` для получения кодов возврата всех команд в конвейере. По умолчанию `$?` содержит код только последней команды.
:::

:::warning Буферизация
При использовании pipe в скриптах, если вывод задерживается, проблема в буферизации. Используйте `stdbuf -oL` или `unbuffer`.
:::

## Советы

:::tip Pipe vs subshell
Pipe создаёт subshell для каждой команды. Переменные, изменённые в pipe, не сохраняются. Используйте process substitution или redirection.
:::

:::warning Именованные pipes
FIFO блокируют открытие до тех пор, пока обе стороны (читатель и писатель) не откроют pipe. Убедитесь, что оба процесса запущены.
## См. также

- [redirection](redirection.md) — перенаправление
- [xargs](search-files-and-commands/xargs.md) — построение аргументов

:::
