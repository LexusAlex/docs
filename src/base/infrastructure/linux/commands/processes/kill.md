# kill

**Уровень:** Начинающий

Отправляет сигнал процессу по PID.

## Синтаксис

```bash
kill [опции] PID [...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-l` | Список всех сигналов |
| `-s сигнал` | Отправить указанный сигнал |
| `-номер` | Отправить сигнал по номеру |

## Стандартные сигналы

| Сигнал | Номер | Описание |
|--------|-------|----------|
| `SIGHUP` | 1 | Перезагрузка конфигурации |
| `SIGINT` | 2 | Прерывание (Ctrl+C) |
| `SIGQUIT` | 3 | Выход с дампом |
| `SIGKILL` | 9 | Принудительное завершение |
| `SIGTERM` | 15 | Корректное завершение (по умолчанию) |
| `SIGSTOP` | 19 | Приостановка процесса |
| `SIGCONT` | 18 | Продолжение выполнения |
| `SIGUSR1` | 10 | Пользовательский сигнал 1 |
| `SIGUSR2` | 12 | Пользовательский сигнал 2 |

## Примеры

### Корректное завершение (SIGTERM)

```bash
kill 1234
```

### Принудительное завершение (SIGKILL)

```bash
kill -9 1234
```

### Отправка SIGHUP (перечитать конфиг)

```bash
kill -HUP 1234
```

### Отправка по имени сигнала

```bash
kill -s SIGTERM 1234
```

### Список всех сигналов

```bash
kill -l
```

### Завершение нескольких процессов

```bash
kill 1234 5678 9012
```

### Приостановить процесс

```bash
kill -STOP 1234
```

### Возобновить процесс

```bash
kill -CONT 1234
```

### Перезагрузка конфигурации nginx

```bash
kill -HUP $(pidof -s nginx)
```

### Пользовательский сигнал

```bash
kill -USR1 1234
```

### Проверка номера сигнала

```bash
kill -l SIGTERM
```

### Отправка сигнала группе процессов

```bash
kill -TERM -1234
```

### Graceful shutdown приложения

```bash
kill -TERM 1234 && sleep 5 && kill -0 1234 && kill -KILL 1234
```

## Практические сценарии

### Корректная остановка приложения

```bash
PID=$(pidof -s myapp)
kill -TERM "$PID"
# Ждём завершения
timeout 10 tail --pid="$PID" -f /dev/null
# Если не завершился — убиваем
kill -0 "$PID" 2>/dev/null && kill -KILL "$PID"
```

### Перечитать конфигурацию без перезапуска

```bash
kill -HUP $(pidof -s nginx)
```

### Скрипт с обработкой сигналов

```bash
trap 'echo "Получен SIGTERM"; exit 0' SIGTERM
trap 'echo "Получен SIGHUP"; reload_config' SIGHUP
```

:::tip
Используйте `SIGTERM` (15) перед `SIGKILL` (9). Это даёт процессу возможность корректно завершиться.
:::

:::warning
`SIGKILL` (9) нельзя перехватить или проигнорировать. Процесс будет принудительно завершён ядром без очистки ресурсов.
:::

## См. также

- [pgrep](pgrep.md) — поиск PID по имени
- [pkill](pkill.md) — отправка сигнала по шаблону
- [killall](killall.md) — убить по имени
- [ps](ps.md) — список процессов


## Связки с другими командами

```bash
# Корректно остановить все процессы nginx
pgrep nginx | xargs kill -TERM

# Найти и убить зомби-процессы
ps aux | grep "[z]ombie" | awk '{print $2}' | xargs kill -9

# Убить конкретный Python-скрипт по шаблону
ps aux | grep "python.*old_script" | awk '{print $2}' | xargs kill

# Убить процесс, занимающий порт 8080
lsof -ti:8080 | xargs kill -9

# Очистить все зомби-процессы (с подавлением ошибок)
ps aux | grep defunct | awk '{print $2}' | xargs kill -9 2>/dev/null

# Остановить все Docker-контейнеры
docker ps -q | xargs docker kill

# Убить процессы по шаблону командной строки
pkill -f "sleep 999" && echo "Killed"

# Graceful shutdown: SIGTERM, ожидание 10 секунд, затем SIGKILL
PID=$(pgrep -x myapp); kill -TERM "$PID"; timeout 10 tail --pid="$PID" -f /dev/null; kill -0 "$PID" 2>/dev/null && kill -KILL "$PID"

# Убить все процессы пользователя, кроме текущего сеанса
pgrep -u testuser | grep -v $$ | xargs kill -TERM

# Перезагрузить конфигурацию всех процессов nginx (SIGHUP)
pgrep -x nginx | xargs kill -HUP
```
