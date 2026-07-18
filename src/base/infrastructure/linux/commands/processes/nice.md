# nice

Запускает команду с изменённым приоритетом (niceness).

## Синтаксис

```bash
nice [опции] [команда [аргументы]]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-n корректировка` | Задать корректировку приоритета |
| `--help` | Справка |
| `--version` | Версия |

## Приоритеты (niceness)

| Значение | Описание |
|----------|----------|
| `-20` | Наивысший приоритет |
| `0` | Обычный приоритет (по умолчанию) |
| `19` | Наименьший приоритет |

:::tip
Обычные пользователи могут только понижать приоритет (увеличивать niceness). Для установки отрицательных значений нужны права root.
:::

## Примеры

### Запуск с приоритетом по умолчанию (+10)

```bash
nice ./cpu-intensive-task
```

### Запуск с пониженным приоритетом

```bash
nice -n 15 ./background-job
```

### Запуск с повышенным приоритетом (root)

```bash
sudo nice -n -10 ./critical-task
```

### Просмотр текущего приоритета

```bash
nice
```

### Запуск с минимальным приоритетом

```bash
nice -n 19 ./low-priority-task
```

### Запуск компиляции с низким приоритетом

```bash
nice -n 19 make -j4
```

### Запуск резервного копирования

```bash
nice -n 10 rsync -av /data/ /backup/
```

### Запуск с наивысшим приоритетом

```bash
sudo nice -n -20 ./real-time-task
```

### nice в скрипте

```bash
#!/bin/bash
nice -n 15 ./heavy-computation &
echo "Задача запущена в фоне с пониженным приоритетом"
```

### Проверка приоритета процесса

```bash
ps -o pid,ni,cmd -p $(pidof -s myapp)
```

### Запуск нескольких задач с разными приоритетами

```bash
nice -n 19 ./backup.sh &
nice -n 10 ./process-data.sh &
nice -n 0 ./interactive-task.sh
```

### nice с find

```bash
nice -n 19 find / -name "*.log" -mtime +30 -delete
```

### nice с tar

```bash
nice -n 15 tar czf backup.tar.gz /important-data/
```

### nice с ffmpeg

```bash
nice -n 19 ffmpeg -i input.mp4 output.mp4
```

## Практические сценарии

### Фоновое резервное копирование

```bash
nice -n 19 tar czf /backup/$(date +%F).tar.gz /data/ &
```

### Компиляция без замедления системы

```bash
nice -n 15 make -j$(nproc)
```

### Пакетная обработка данных

```bash
for file in data/*.csv; do
    nice -n 10 process_file "$file" &
done
wait
```

:::tip
Значение по умолчанию при запуске `nice` без `-n` равно 10, а не 0.
:::

:::warning
Не устанавливайте приоритет `-20` для длительных задач — это может заблокировать систему для других процессов.
:::
