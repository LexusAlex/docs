# batch

**Уровень:** Средний

Выполняет команды, когда средняя загрузка системы падает ниже определённого порога (0.8 по умолчанию). Идеален для ресурсоёмких задач, которые не нужно выполнять немедленно.

## Синтаксис

```bash
batch                              # интерактивный ввод
echo "команда" | batch             # через pipe
batch -f файл                      # из файла
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-f файл` | Читать команды из файла |
| `-q буква` | Указать очередь (по умолчанию `a`) |
| `-V` | Показать версию |
| `-t время` | Запланировать время (как в at) |

## Как работает batch

1. Проверяет среднюю загрузку системы (load average)
2. Если загрузка ниже порога (по умолчанию 0.8) — выполняет задачу
3. Если загрузка выше — ждёт и проверяет снова
4. Проверяет каждые 5 минут

batch использует тот же механизм, что и `at`, но с условием низкой нагрузки.

## Управление доступом

Как и `at`, batch подчиняется тем же файлам доступа:

- `/etc/at.allow` — только перечисленные пользователи
- `/etc/at.deny` — запрещённые пользователи

```bash
cat /etc/at.allow
cat /etc/at.deny
```

## Команды-спутники

### atq — список задач batch

```bash
atq
# Показывает и at, и batch задачи (batch использует ту же очередь)
```

### atrm — удаление задачи

```bash
atrm номер
```

## Примеры

### 1. Тяжёлая задача при низкой нагрузке

```bash
echo "find / -name '*.log' -delete" | batch
```

### 2. Интерактивный ввод

```bash
batch
# Приглашение at>
tar -czf /backup/full.tar.gz /data/
# Ctrl+D
```

### 3. Из файла

```bash
cat > /tmp/batch_task.sh << 'EOF'
#!/bin/bash
make -C /usr/src/kernel clean
make -C /usr/src/kernel -j$(nproc)
make -C /usr/src/kernel modules_install
EOF

batch -f /tmp/batch_task.sh
```

### 4. Компиляция при низкой нагрузке

```bash
echo "make -C /path/to/project -j\$(nproc)" | batch
```

### 5. Резервное копирование

```bash
cat << 'EOF' | batch
rsync -avz --delete /data/ /backup/data/
mysqldump --all-databases | gzip > /backup/db.sql.gz
EOF
```

### 6. Очистка и обслуживание

```bash
cat << 'SCRIPT' | batch
apt-get update
apt-get upgrade -y
apt-get autoremove -y
apt-get clean
journalctl --vacuum-time=7d
SCRIPT
```

### 7. Обработка видео/изображений

```bash
echo "ffmpeg -i input.mp4 -c:v libx265 output.mp4" | batch
```

## Практические сценарии

### Компиляция ядра Linux

```bash
cat << 'SCRIPT' | batch
cd /usr/src/linux
make -j$(nproc)
make modules_install
cp arch/x86/boot/bzImage /boot/vmlinuz-custom
SCRIPT
```

### Индексация файлов

```bash
echo "updatedb" | batch
# updatedb — тяжёлая операция, лучше при низкой нагрузке
```

### Сжатие логов

```bash
cat << 'EOF' | batch
find /var/log -name "*.log" -size +100M -exec gzip {} \;
find /var/log -name "*.gz" -mtime +30 -delete
EOF
```

### Генерация отчётов

```bash
echo "python3 /opt/scripts/generate_report.py" | batch
```

## Настройка порога загрузки

Порог загрузки по умолчанию — 0.8. Изменить можно через переменную окружения:

```bash
# Проверить текущую загрузку
uptime
# 14:30:00 up 10 days, load average: 0.50, 0.60, 0.55

# Запустить с более высоким порогом
echo "heavy_task" | at -b now
# -b эквивалент batch
```

## batch vs at vs cron

| Характеристика | batch | at | crontab |
|---------------|-------|-----|---------|
| Количество выполнений | 1 | 1 | Повторяющееся |
| Условие | Низкая нагрузка | Конкретное время | Расписание |
| Очередь | `a` | `a-z` | Нет |
| Порог нагрузки | 0.8 | Нет | Нет |
| Использование | Тяжёлые задачи | Одноразовые | Периодические |

## Советы

:::tip
Используйте batch для задач, которые потребляют много CPU или I/O, но не срочны (компиляция, индексация, бэкапы).
:::

:::warning
batch не подходит для задач с жёстким дедлайном — задача будет ждать, пока нагрузка снизится.
:::

:::tip
Проверяйте `atq` после добавления задачи — batch-задачи выглядят как at-задачи в списке.
:::

:::warning
Если система постоянно загружена, batch-задача может никогда не выполниться. Проверяйте `uptime` заранее.
:::

## Связки с другими командами

- **at** — одноразовые задачи без условия нагрузки
- **nice/renice** — управление приоритетом процессов
- **crontab** — повторяющиеся задачи
- **nohup** — запуск процессов, не привязанных к терминалу

## См. также

- [at](at.md) — одноразовые запланированные задачи
- [crontab](../cron-and-timers/crontab.md) — повторяющиеся задачи
- [systemd-timers](../cron-and-timers/systemd-timers.md) — таймеры systemd
