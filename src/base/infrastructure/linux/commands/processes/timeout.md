# timeout

**Уровень:** Средний

Запускает команду с ограничением по времени выполнения.

## Синтаксис

```bash
timeout [опции] продолжительность команда [аргументы]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-s сигнал` | Сигнал для отправки (по умолчанию TERM) |
| `--preserve-status` | Сохранить код возврата команды |
| `--foreground` | Не создавать группу процессов |
| `--kill-after время` | Убить через время после первого сигнала |

## Суффиксы времени

| Суффикс | Описание |
|---------|----------|
| `s` | Секунды (по умолчанию) |
| `m` | Минуты |
| `h` | Часы |
| `d` | Дни |

## Примеры

### Ограничение по времени

```bash
timeout 30 ./long-task.sh
```

### С указанием минут

```bash
timeout 5m ./backup.sh
```

### С сигналом KILL

```bash
timeout -s KILL 10s ./hung-process
```

### Сохранить статус команды

```bash
timeout --preserve-status 30s ./task.sh
```

### Принудительное завершение

```bash
timeout --kill-after=10s 30s ./ stubborn-process
```

### В фоновом режиме

```bash
timeout 60s ./task.sh > output.log 2>&1 &
```

### Ограничение для ping

```bash
timeout 5 ping google.com
```

### Ограничение для curl

```bash
timeout 10s curl -s https://example.com
```

### Ограничение для find

```bash
timeout 5m find / -name "*.log"
```

### Ограничение для rsync

```bash
timeout 1h rsync -av /data/ /backup/
```

### С проверкой кода возврата

```bash
if timeout 30s ./check-health.sh; then
    echo "Проверка пройдена"
else
    exit_code=$?
    if [ $exit_code -eq 124 ]; then
        echo "Таймаут"
    else
        echo "Ошибка: $exit_code"
    fi
fi
```

### Принудительное завершение с задержкой

```bash
timeout --kill-after=30s 5m ./deploy.sh
```

### Ограничение для скрипта

```bash
timeout 2h bash -c 'while true; do process_item; sleep 1; done'
```

### С сигналом SIGINT

```bash
timeout -s INT 10s ./interactive-task
```

## Практические сценарии

### Безопасный запуск внешних скриптов

```bash
timeout 300s ./external-script.sh || {
    exit_code=$?
    [ $exit_code -eq 124 ] && echo "Скрипт превысил лимит времени"
}
```

### Мониторинг с таймаутом

```bash
timeout 60s tail -f /var/log/app.log | grep -m 1 "Ready"
```

### Проверка доступности сервиса

```bash
timeout 5s nc -z localhost 8080 && echo "Сервис доступен"
```

:::tip
Код возврата 124 означает, что команда была завершена по таймауту.
:::

:::warning
`timeout` по умолчанию отправляет SIGTERM. Если процесс не реагирует, используйте `--kill-after` для принудительного завершения.
:::

## См. также

- [kill](kill.md) — отправка сигнала

