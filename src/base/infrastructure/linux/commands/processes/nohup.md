# nohup

**Уровень:** Средний

Запускает команду, которая продолжит работу после закрытия терминала.

## Синтаксис

```bash
nohup команда [аргументы] &
```

## Опции

`nohup` не имеет собственных опций — это простая обёртка над командой.

## Примеры

### Базовый запуск

```bash
nohup ./my-script.sh &
```

### С перенаправлением вывода

```bash
nohup ./my-script.sh > output.log 2>&1 &
```

### Запуск Python-скрипта

```bash
nohup python3 app.py > app.log 2>&1 &
```

### Запуск Node.js приложения

```bash
nohup node server.js > server.log 2>&1 &
```

### С перенаправлением в /dev/null

```bash
nohup ./task.sh > /dev/null 2>&1 &
```

### Запуск с аргументами

```bash
nohup rsync -av /data/ /backup/ > sync.log 2>&1 &
```

### Проверка запущенного процесса

```bash
nohup ./long-task.sh &
echo "PID: $!"
```

### Запуск нескольких задач

```bash
nohup ./task1.sh > task1.log 2>&1 &
nohup ./task2.sh > task2.log 2>&1 &
```

### С явным указанием файла вывода

```bash
nohup bash -c 'while true; do date; sleep 60; done' > heartbeat.log 2>&1 &
```

### Запуск с disown

```bash
nohup ./my-script.sh > output.log 2>&1 &
disown
```

### Запуск cron-задачи вручную

```bash
nohup /usr/local/bin/backup-script.sh > /var/log/backup.log 2>&1 &
```

### Запуск сервера разработки

```bash
nohup npm run dev > dev.log 2>&1 &
```

### Запуск с переменными окружения

```bash
nohup env NODE_ENV=production node app.js > app.log 2>&1 &
```

### Просмотр nohup.out

```bash
tail -f nohup.out
```

## Практические сценарии

### Долгий деплой

```bash
nohup ./deploy.sh > deploy-$(date +%F).log 2>&1 &
echo "Деплой запущен, PID: $!"
```

### Резервное копирование

```bash
nohup tar czf /backup/full-$(date +%F).tar.gz /data/ > /var/log/backup.log 2>&1 &
```

### Запуск приложения на сервере

```bash
nohup java -jar app.jar --server.port=8080 > app.log 2>&1 &
```

:::tip
По умолчанию `nohup` записывает вывод в файл `nohup.out` в текущей директории. Перенаправляйте вывод явно для контроля.
:::

:::warning
`nohup` не отслеживает состояние процесса. Используйте `screen`, `tmux` или systemd для более надёжного управления.
:::

## См. также

- [bg](bg.md) — фоновый запуск
- [fg](fg.md) — передний план
- [jobs](jobs.md) — список задач

