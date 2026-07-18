# sar

Сбор и анализ статистики системной активности (пакет sysstat).

## Синтаксис

```bash
sar [options] [interval] [count]
sar -f file
```

## Опции

| Опция | Описание |
|-------|----------|
| `-u` | Загрузка CPU |
| `-r` | Использование памяти |
| `-b` | I/O операции |
| `-d` | Активность дисков |
| `-n DEV` | Сетевые интерфейсы |
| `-n SOCK` | Сокеты |
| `-n TCP` | TCP-соединения |
| `-n EDEV` | Ошибки сети |
| `-q` | Загрузка системы (load average) |
| `-w` | Переключения контекста |
| `-v` | Информация о ядре |
| `-S` | Своп |
| `-W` | Своп-активность |
| `-f file` | Чтение из файла |
| `-s HH:MM:SS` | Начало периода |
| `-e HH:MM:SS` | Конец периода |
| `-o file` | Запись в файл |
| `-P CPU` | Конкретный CPU |
| `-A` | Все метрики |

## Включение sysstat

```bash
# Установка
sudo dnf install sysstat
sudo apt install sysstat

# Включение сбора данных
sudo systemctl enable sysstat
sudo systemctl start sysstat

# Редактирование /etc/sysstat/sysstat
HISTORY=28
COMPRESSAFTER=10
```

## Примеры

### 1. Загрузка CPU (текущая)

```bash
sar -u 1 5
```

### 2. Загрузка CPU (история)

```bash
sar -u
```

### 3. Загрузка CPU за конкретный день

```bash
sar -u -f /var/log/sysstat/sa17
```

### 4. Использование памяти

```bash
sar -r 1 5
```

### 5. Память за день

```bash
sar -r -f /var/log/sysstat/sa17
```

### 6. I/O операции

```bash
sar -b 1 5
```

### 7. Сетевая активность

```bash
sar -n DEV 1 5
```

### 8. Ошибки сети

```bash
sar -n EDEV 1 5
```

### 9. Сокеты

```bash
sar -n SOCK 1 5
```

### 10. Загрузка системы

```bash
sar -q 1 5
```

### 11. Дисковая активность

```bash
sar -d 1 5
```

### 12. Конкретный CPU

```bash
sar -P 0 1 5
```

### 13. Все CPU отдельно

```bash
sar -P ALL 1 5
```

### 14. Период времени

```bash
sar -u -s 09:00:00 -e 17:00:00
```

### 15. Запись в файл

```bash
sar -u -o output.dat 1 60
```

### 16. Чтение из файла

```bash
sar -u -f output.dat
```

### 17. Все метрики

```bash
sar -A
```

## Практические сценарии

### Анализ загрузки CPU за неделю

```bash
for day in /var/log/sysstat/sa*; do
    echo "=== $day ==="
    sar -u -f "$day" | tail -1
done
```

### Мониторинг памяти в реальном времени

```bash
sar -r 5  # каждые 5 секунд
```

### Поиск пиковых нагрузок

```bash
sar -u -f /var/log/sysstat/sa17 | sort -k3 -nr | head -5
```

### Проверка сетевого трафика

```bash
sar -n DEV -f /var/log/sysstat/sa17 | grep eth0
```

### Анализ I/O

```bash
sar -b -f /var/log/sysstat/sa17
```

## Файлы данных

| Путь | Описание |
|------|----------|
| `/var/log/sysstat/saNN` | Бинарные данные (NN = день) |
| `/var/log/sysstat/sarNN` | Текстовые отчёты |
| `/etc/sysstat/sysstat` | Конфигурация |
| `/etc/cron.d/sysstat` | Cron для сбора |

## Cron для сбора данных

```bash
# /etc/cron.d/sysstat
*/10 * * * * root /usr/lib/sysstat/sa1 1 1
53 23 * * * root /usr/lib/sysstat/sa2 -A
```

:::tip Интервал сбора
По умолчанию данные собираются каждые 10 минут. Для более детальной статистики измените cron на `*/1 * * * *`.
:::

:::warning Хранение данных
Данные хранятся по умолчанию 28 дней. Увеличьте `HISTORY` в `/etc/sysstat/sysstat` для длительного хранения.
:::

## Советы

:::tip Экспорт данных
Используйте `sadf` для экспорта данных sar в форматы CSV, JSON или XML: `sadf -d /var/log/sysstat/sa17 -- -u`.
:::

:::warning Бинарные файлы
Файлы `saNN` бинарные. Используйте `sar -f` для чтения, а не `cat`.
:::
