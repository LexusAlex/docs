# journalctl

Просмотр системных журналов systemd-journald.

## Синтаксис

```bash
journalctl [OPTIONS] [MATCHING...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-u UNIT` | Логи указанного сервиса |
| `-f` | Следить за логами в реальном времени |
| `-n N` | Показать последние N строк |
| `-e` | Перейти к концу лога |
| `--since TIME` | Начиная с указанного времени |
| `--until TIME` | До указанного времени |
| `-p PRIORITY` | Фильтр по приоритету |
| `-b [BOOT]` | Логи указанной загрузки |
| `--list-boots` | Список загрузок |
| `-k` | Только сообщения ядра |
| `-a` | Показать все символы |
| `--no-pager` | Не использовать постраничный вывод |
| `-o FORMAT` | Формат вывода |
| `--disk-usage` | Использование диска журналом |
| `--vacuum-size=SIZE` | Очистить до указанного размера |
| `--vacuum-time=TIME` | Удалить записи старше указанного времени |
| `--utc` | Время в UTC |
| `--no-hostname` | Без имени хоста |
| `-g PATTERN` | Поиск по сообщению (grep) |

## Форматы вывода (-o)

| Формат | Описание |
|--------|----------|
| `short` | Стандартный формат (по умолчанию) |
| `short-iso` | С ISO временем |
| `short-precise` | С микросекундами |
| `json` | JSON формат |
| `json-pretty` | Читаемый JSON |
| `verbose` | Все поля |
| `cat` | Только сообщение без метаданных |
| `journal` | Бинарный формат журнала |

## Приоритеты (-p)

| Значение | Уровень | Описание |
|----------|---------|----------|
| 0 | emerg | Аварийная ситуация |
| 1 | alert | Требует немедленного внимания |
| 2 | crit | Критическая ошибка |
| 3 | err | Ошибка |
| 4 | warning | Предупреждение |
| 5 | notice | Уведомление |
| 6 | info | Информация |
| 7 | debug | Отладка |

Можно указать диапазон: `-p err` покажет emerg, alert, crit, err.

## Примеры

### Просмотр логов сервиса

```bash
# Логи nginx
journalctl -u nginx

# Логи в реальном времени
journalctl -u nginx -f

# Последние 50 строк
journalctl -u nginx -n 50

# Перейти к концу
journalctl -u nginx -e
```

### Фильтрация по времени

```bash
# За последний час
journalctl -u nginx --since "1 hour ago"

# За сегодня
journalctl -u nginx --since today

# Конкретный период
journalctl --since "2024-01-15 10:00" --until "2024-01-15 12:00"

# За последние 30 минут
journalctl --since "30 min ago"
```

### Фильтрация по приоритету

```bash
# Только ошибки и критические
journalctl -p err

# Предупреждения и выше
journalctl -u nginx -p warning

# Только отладка
journalctl -p debug
```

### Логи загрузки

```bash
# Текущая загрузка
journalctl -b

# Предыдущая загрузка
journalctl -b -1

# Загрузка перед предыдущей
journalctl -b -2

# Список всех загрузок
journalctl --list-boots
```

### Логи ядра

```bash
# Все сообщения ядра
journalctl -k

# Ядро текущей загрузки
journalctl -k -b
```

### Формат вывода

```bash
# JSON формат
journalctl -u nginx -o json

# Только сообщения без метаданных
journalctl -u nginx -o cat

# Подробный вывод
journalctl -u nginx -o verbose
```

### Комбинирование фильтров

```bash
# Ошибки nginx за последний час
journalctl -u nginx -p err --since "1 hour ago"

# Логи ядра текущей загрузки в JSON
journalctl -k -b -o json

# Логи без постраничного вывода (для скриптов)
journalctl -u nginx --no-pager -n 20
```

### Управление размером журнала

```bash
# Использование диска
journalctl --disk-usage

# Очистить до 500MB
sudo journalctl --vacuum-size=500M

# Удалить записи старше 30 дней
sudo journalctl --vacuum-time=30d

# Оставить только последние 5 загрузок
sudo journalctl --vacuum-files=5
```

### Поиск по сообщению

```bash
# Поиск ошибок в логах
journalctl -g "error"

# Поиск по PID
journalctl _PID=1234

# Поиск по пользователю
journalctl _UID=1000
```

## Практические сценарии

### Отладка падения сервиса

```bash
# Посмотреть логи перед падением
journalctl -u myapp -n 200 --no-pager

# Ошибки за последний час
journalctl -u myapp -p err --since "1 hour ago"
```

### Мониторинг в реальном времени

```bash
# Следить за несколькими сервисами
journalctl -u nginx -u myapp -f

# Только ошибки в реальном времени
journalctl -f -p err
```

### Экспорт логов

```bash
# Экспорт в файл
journalctl -u nginx --since today > nginx-logs.txt

# JSON экспорт
journalctl -u nginx -o json > nginx-logs.json
```

## Настройка постоянного хранения

По умолчанию журнал хранится в `/run/log/journal/` (volatile). Для постоянного хранения:

```bash
# Создать директорию
sudo mkdir -p /var/log/journal/

# Перезапустить journald
sudo systemctl restart systemd-journald
```

Или в `/etc/systemd/journald.conf`:

```ini
[Journal]
Storage=persistent
SystemMaxUse=1G
MaxRetentionSec=3month
```

:::tip Постоянное хранение
Для сохранения логов между перезагрузками создайте `/var/log/journal/` — journald автоматически начнёт использовать постоянное хранилище.
:::

:::warning Права доступа
Обычные пользователи видят только свои логи. Для просмотра всех логов используйте `sudo` или добавьте пользователя в группу `systemd-journal`.
:::

:::tip Временные метки
Используйте человекочитаемые форматы времени: `"1 hour ago"`, `"yesterday"`, `"2024-01-15 10:00"`, `"2 days ago"`.
:::

:::warning Очистка журнала
Регулярно очищайте журнал: `sudo journalctl --vacuum-time=30d` — иначе он может занять значительное место на диске.
:::

## Связки с другими командами

```bash
# Количество ошибок nginx за сегодня
journalctl -u nginx --since today | grep -i error | wc -l

# Источники ошибок за последний час
journalctl -p err --since "1 hour ago" | awk '{print $6}' | sort | uniq -c | sort -rn

# IP-адреса с неудачными попытками входа по SSH
journalctl -u sshd | grep "Failed" | awk '{print $11}' | sort | uniq -c | sort -rn

# События OOM killer
journalctl -k | grep -i "oom\|kill" | tail -10

# Размер журнала на диске
journalctl --disk-usage

# Количество ответов 200 от nginx за конкретный день
journalctl -u nginx --since "2024-01-01" --until "2024-01-02" | grep -c "200"

# Следить за ошибками nginx в реальном времени
journalctl -f -u nginx | grep --line-buffered error

# Количество предупреждений Docker с вчерашнего дня
journalctl -p warning -u docker --since yesterday | wc -l

# Самые частые сообщения об ошибках
journalctl -p err --since today -o cat | sort | uniq -c | sort -rn | head -10

# Логи перезагрузок системы
journalctl -b | head -5 && journalctl --list-boots
```
