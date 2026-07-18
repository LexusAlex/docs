# systemd timers

Планировщик задач systemd — современная альтернатива cron с расширенными возможностями.

## Синтаксис

```bash
systemctl list-timers [--all]
systemctl start timer-name.timer
systemctl stop timer-name.timer
systemctl enable timer-name.timer
systemctl disable timer-name.timer
systemctl status timer-name.timer
```

## Типы таймеров

| Тип | Директива | Описание |
|-----|-----------|----------|
| Realtime | `OnCalendar=` | По расписанию (как cron) |
| Monotonic | `OnBootSec=` | От момента загрузки |
| Monotonic | `OnStartupSec=` | От старта systemd |
| Monotonic | `OnUnitActiveSec=` | От последней активации юнита |
| Monotonic | `OnUnitInactiveSec=` | От последней деактивации |
| Monotonic | `OnActiveSec=` | От активации таймера |

## Синтаксис OnCalendar

```
DayOfWeek Year-Month-Day Hour:Minute:Second
```

| Пример | Описание |
|--------|----------|
| `hourly` | Каждый час |
| `daily` | Раз в день (полночь) |
| `weekly` | Раз в неделю (понедельник) |
| `monthly` | Раз в месяц (1-е число) |
| `yearly` | Раз в год (1 января) |
| `Mon..Fri *-*-* 09:00:00` | Будни в 9:00 |
| `*-*-01 00:00:00` | Первое число месяца |
| `Mon *-*-* 00:00:00` | Каждый понедельник |
| `*-*-* 00/2:00:00` | Каждые 2 часа |
| `*~07/2` | Через день в июле |

## Директивы .timer

| Директива | Описание |
|-----------|----------|
| `OnCalendar=` | Расписание выполнения |
| `OnBootSec=` | Время после загрузки |
| `OnUnitActiveSec=` | Интервал между запусками |
| `OnUnitInactiveSec=` | Интервал неактивности |
| `AccuracySec=` | Точность срабатывания (по умолчанию 1min) |
| `Persistent=` | Сохранять время последнего запуска |
| `Unit=` | Юнит для активации |
| `RandomizedDelaySec=` | Случайная задержка |

## Примеры

### 1. Таймер ежедневного бэкапа

Создайте сервис `/etc/systemd/system/backup.service`:

```ini
[Unit]
Description=Daily Backup

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh
User=backup
```

Создайте таймер `/etc/systemd/system/backup.timer`:

```ini
[Unit]
Description=Run backup daily

[Timer]
OnCalendar=daily
Persistent=true
AccuracySec=1h

[Install]
WantedBy=timers.target
```

### 2. Каждые 15 минут

```ini
[Timer]
OnCalendar=*:0/15
AccuracySec=1s
```

### 3. Будни в 9:00

```ini
[Timer]
OnCalendar=Mon..Fri *-*-* 09:00:00
```

### 4. Каждый понедельник и четверг в 14:30

```ini
[Timer]
OnCalendar=Mon,Thu *-*-* 14:30:00
```

### 5. Первое число каждого месяца

```ini
[Timer]
OnCalendar=*-*-01 00:00:00
```

### 6. Через 5 минут после загрузки

```ini
[Timer]
OnBootSec=5min
OnUnitActiveSec=1d
```

### 7. Каждые 30 минут после активации

```ini
[Timer]
OnUnitActiveSec=30min
```

### 8. Случайная задержка для распределения нагрузки

```ini
[Timer]
OnCalendar=daily
RandomizedDelaySec=30min
```

### 9. Просмотр всех таймеров

```bash
systemctl list-timers
systemctl list-timers --all
systemctl list-timers --no-pager
```

### 10. Включение таймера

```bash
sudo systemctl enable backup.timer
sudo systemctl start backup.timer
```

### 11. Проверка статуса

```bash
systemctl status backup.timer
journalctl -u backup.service -f
```

### 12. Отключение таймера

```bash
sudo systemctl stop backup.timer
sudo systemctl disable backup.timer
```

### 13. Таймер мониторинга с логированием

```ini
[Unit]
Description=Health Check Timer

[Timer]
OnCalendar=*:0/5
AccuracySec=10s

[Install]
WantedBy=timers.target
```

```ini
[Unit]
Description=Health Check Service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/health-check.sh
StandardOutput=journal
StandardError=journal
```

### 14. Таймер с зависимостями

```ini
[Unit]
Description=Database Cleanup
After=postgresql.service
Requires=postgresql.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/db-cleanup.sh
```

## Преимущества над cron

| Возможность | cron | systemd timers |
|-------------|------|----------------|
| Логирование | Ручное | Через journald |
| Зависимости | Нет | Да |
| Пропущенные запуски | Нет | Persistent=true |
| Случайная задержка | Нет | RandomizedDelaySec |
| Мониторинг | Нет | systemctl status |
| Точность | Минута | Настраиваемая |

:::tip Анализ пропущенных запусков
Используйте `Persistent=true` в таймере. При перезагрузке системы systemd запустит пропущенные задачи. Это аналог anacron.
:::

:::warning Точность по умолчанию
По умолчанию `AccuracySec=1min` — systemd группирует запуски таймеров для экономии ресурсов. Для точного расписания установите `AccuracySec=1s` или `AccuracySec=1us`.
:::

## Советы

:::tip Отладка таймеров
Проверяйте журнал сервиса: `journalctl -u service-name.service`. Для ручного запуска используйте `systemctl start service-name.service`.
:::

:::warning Миграция с cron
При миграции с cron учитывайте, что systemd timers не наследуют переменные окружения пользователя. Используйте `Environment=` или `EnvironmentFile=` в .service файле.
:::
