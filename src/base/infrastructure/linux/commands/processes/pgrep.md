# pgrep

**Уровень:** Средний

Ищет процессы по имени и другим атрибутам, возвращает PID.

## Синтаксис

```bash
pgrep [опции] шаблон
```

## Опции

| Опция | Описание |
|-------|----------|
| `-l` | Вывести имя процесса вместе с PID |
| `-a` | Вывести полную команду с аргументами |
| `-f` | Сопоставление шаблона с полной командной строкой |
| `-u пользователь` | Фильтр по пользователю |
| `-P PPID` | Фильтр по родительскому PID |
| `-n` | Выбрать только самый новый процесс |
| `-o` | Выбрать только самый старый процесс |
| `-c` | Вывести количество совпадений |
| `-x` | Точное совпадение имени |
| `-d разделитель` | Задать разделитель между PID |
| `-signal` | Отправить сигнал вместо вывода PID |

## Примеры

### Найти PID по имени

```bash
pgrep nginx
```

### Вывести PID и имя процесса

```bash
pgrep -l nginx
```

### Вывести полную команду

```bash
pgrep -a nginx
```

### Поиск по полной командной строке

```bash
pgrep -f "python manage.py"
```

### Процессы пользователя

```bash
pgrep -u www-data
```

### Дочерние процессы родителя

```bash
pgrep -P 1234
```

### Самый новый процесс

```bash
pgrep -n sshd
```

### Самый старый процесс

```bash
pgrep -o sshd
```

### Подсчёт процессов

```bash
pgrep -c nginx
```

### Точное совпадение имени

```bash
pgrep -x "node"
```

### Пользовательский разделитель

```bash
pgrep -d ", " nginx
```

### Отправить сигнал процессу

```bash
pgrep --signal SIGHUP nginx
```

### Завершить процессы (через xargs)

```bash
pgrep -f "stale-worker" | xargs kill
```

### Найти процессы в конкретной сессии

```bash
pgrep -s 1234
```

## Практические сценарии

### Проверка запущен ли сервис

```bash
if pgrep -x "redis-server" > /dev/null; then
    echo "Redis запущен"
else
    echo "Redis не запущен"
fi
```

### Перезапуск упавшего процесса в скрипте

```bash
if ! pgrep -f "my-daemon" > /dev/null; then
    systemctl restart my-daemon
fi
```

### Завершение всех процессов пользователя

```bash
pgrep -u testuser | xargs kill -TERM
```

:::tip
Используйте `-f` для поиска по полной командной строке, когда имя процесса — интерпретатор (python, node, bash).
:::

:::warning
Паттерн в `pgrep` — это регулярное выражение, а не glob. Точка `.` совпадает с любым символом.
:::

## Связки с другими командами

```bash
# Полная информация о процессах nginx
pgrep -x nginx | xargs ps -fp

# Завершить конкретное Python-приложение по полной команде
pgrep -f "python app.py" | xargs kill -TERM

# Подсчитать количество активных SSH-сессий
pgrep -c sshd

# Процессы www-data со статистикой CPU и памяти
pgrep -u www-data | xargs ps -o pid,cmd,%cpu,%mem -p

# Дождаться завершения скрипта перед продолжением
while pgrep -x backup.sh > /dev/null; do sleep 5; done && echo "Backup done"

# Трассировать системные вызовы процесса MySQL
pgrep -x mysqld | head -1 | xargs strace -p

# Проверить, запущен ли сервис, и перезапустить, если нет
pgrep -x redis-server > /dev/null || systemctl restart redis-server

# Найти и показать дерево дочерних процессов
ps --ppid $(pgrep -o nginx) -o pid,ppid,cmd

# Мониторинг: проверять каждые 5 секунд и алертить, если процесс пропал
while true; do pgrep -x myapp > /dev/null || echo "ALERT: myapp down at $(date)"; sleep 5; done

# Получить самый новый PID процесса и показать его открытые файлы
lsof -p $(pgrep -n node)
```

## См. также

- [pkill](pkill.md) — отправка сигнала по шаблону
- [kill](kill.md) — отправка сигнала по PID
- [ps](ps.md) — список процессов
