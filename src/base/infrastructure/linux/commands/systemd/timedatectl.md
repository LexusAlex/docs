# timedatectl

**Уровень:** Средний

Управление системными датой, временем и часовым поясом.

## Синтаксис

```bash
timedatectl [OPTIONS] [COMMAND]
```

## Команды

| Команда | Описание |
|---------|----------|
| `status` | Показать текущие настройки времени |
| `set-time TIME` | Установить системное время |
| `set-timezone ZONE` | Установить часовой пояс |
| `list-timezones` | Список доступных часовых поясов |
| `set-ntp BOOL` | Включить/отключить NTP синхронизацию |
| `set-local-rtc BOOL` | Управление RTC (аппаратные часы) |
| `show-timesync` | Показать статус NTP |
| `timesync-status` | Статус синхронизации времени |

## Опции

| Опция | Описание |
|-------|----------|
| `--no-ask-password` | Не запрашивать пароль |
| `-H HOST` | Управление на удалённом хосте |
| `--adjust-system-clock` | Скорректировать системные часы при изменении RTC |

## Примеры

### Просмотр текущих настроек

```bash
# Полная информация
timedatectl

# Пример вывода:
#                Local time: Thu 2024-01-15 14:30:45 MSK
#            Universal time: Thu 2024-01-15 11:30:45 UTC
#                  RTC time: Thu 2024-01-15 11:30:45
#                 Time zone: Europe/Moscow (MSK, +0300)
# System clock synchronized: yes
#               NTP service: active
#           RTC in local TZ: no
```

### Установка часового пояса

```bash
# Установить часовой пояс
sudo timedatectl set-timezone Europe/Moscow

# Установить UTC
sudo timedatectl set-timezone UTC

# Найти часовой пояс
timedatectl list-timezones | grep Moscow

# Список всех часовых поясов
timedatectl list-timezones
```

### Установка времени

```bash
# Установить дату и время
sudo timedatectl set-time "2024-01-15 14:30:00"

# Установить только время
sudo timedatectl set-time "14:30:00"

# Установить только дату
sudo timedatectl set-time "2024-01-15"
```

### NTP синхронизация

```bash
# Включить NTP
sudo timedatectl set-ntp true

# Отключить NTP
sudo timedatectl set-ntp false

# Проверить статус NTP
timedatectl show-timesync

# Подробный статус синхронизации
timedatectl timesync-status
```

### Управление RTC

```bash
# RTC в UTC (рекомендуется)
sudo timedatectl set-local-rtc 0

# RTC в местном времени (для двойной загрузки с Windows)
sudo timedatectl set-local-rtc 1
```

## Практические сценарии

### Настройка нового сервера

```bash
# Установить часовой пояс
sudo timedatectl set-timezone Europe/Moscow

# Включить NTP
sudo timedatectl set-ntp true

# Проверить
timedatectl
```

### Поиск часового пояса

```bash
# Поиск по региону
timedatectl list-timezones | grep America

# Поиск по городу
timedatectl list-timezones | grep -i tokyo

# Все часовые пояса России
timedatectl list-timezones | grep Europe
```

### Двойная загрузка с Windows

```bash
# Windows использует местное время для RTC
sudo timedatectl set-local-rtc 1

# Или настроить Windows использовать UTC (предпочтительно)
# Через реестр: HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation
# Создать DWORD: RealTimeIsUniversal = 1
```

### Проверка синхронизации

```bash
# Проверить, синхронизированы ли часы
timedatectl show -p NTPSynchronized

# Подробная информация о NTP
timedatectl timesync-status

# Статус NTP сервиса
timedatectl show-timesync
```

## Разница между RTC и системными часами

| Часы | Описание | Настройка |
|------|----------|-----------|
| System clock | Системные часы (в памяти) | `set-time` |
| RTC | Аппаратные часы (Real Time Clock) | `set-local-rtc` |

:::tip NTP синхронизация
Всегда включайте NTP (`set-ntp true`) на серверах — точное время критично для логирования, сертификатов и кербероса.
:::

:::warning Windows и RTC
Если вы используете двойную загрузку с Windows, установите `set-local-rtc 1` или настройте Windows использовать UTC. Иначе время будет «прыгать» при переключении между ОС.
:::

:::tip Изменение времени
При включённом NTP нельзя вручную установить время — сначала отключите NTP: `sudo timedatectl set-ntp false`.
:::

:::warning Часовые пояса
Часовые пояса хранятся как ссылки в `/usr/share/zoneinfo/`. При обновлении системы часовые пояса могут обновиться.
## См. также

- [hostnamectl](hostnamectl.md) — имя хоста
- [localectl](localectl.md) — настройка локали

:::
