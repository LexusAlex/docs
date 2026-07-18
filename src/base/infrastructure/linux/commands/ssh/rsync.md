# rsync

Утилита для быстрой синхронизации и копирования файлов с поддержкой дельта-передачи (передаёт только изменения).

## Синтаксис

```bash
rsync [опции] источник назначение
```

## Опции

| Опция | Описание |
|-------|----------|
| `-a` | Архивный режим (рекурсия + сохранение прав, ссылок и т.д.) |
| `-v` | Подробный вывод |
| `-z` | Сжатие данных при передаче |
| `-P` | Показ прогресса + докачка partial-файлов |
| `--progress` | Показ прогресса каждого файла |
| `--partial` | Сохранять незавершённые файлы |
| `--partial-dir=DIR` | Директория для partial-файлов |
| `-e команда` | Указать удалённый shell |
| `--delete` | Удалить файлы, которых нет в источнике |
| `--exclude=паттерн` | Исключить файлы по паттерну |
| `--include=паттерн` | Включить файлы по паттерну |
| `--dry-run` / `-n` | Пробный запуск (без изменений) |
| `--bwlimit=Кбит/с` | Ограничить полосу пропускания |
| `--backup` | Создать резервные копии перезаписанных файлов |
| `--suffix=суффикс` | Суффикс для резервных копий |
| `-c` | Проверка по контрольной сумме (не по времени) |
| `--size-only` | Сравнение только по размеру |
| `--ignore-existing` | Не перезаписывать существующие файлы |
| `--append` | Дописать к существующим файлам |
| `--remove-source-files` | Удалить файлы источника после копирования |
| `--max-size=размер` | Максимальный размер файла |
| `--min-size=размер` | Минимальный размер файла |
| `--chmod=права` | Изменить права файлов |
| `--chown=владелец` | Изменить владельца |

## Важно: trailing slash

Поведение rsync зависит от наличия `/` в конце пути источника:

```bash
# Без slash: копирует директорию целиком
rsync -a /home/user/project server:/backup/
# Результат: /backup/project/

# С slash: копирует содержимое директории
rsync -a /home/user/project/ server:/backup/
# Результат: /backup/ (содержимое project внутри)
```

## Копирование на удалённый сервер

### Копирование директории

```bash
rsync -avz ./project/ user@server:/home/user/project/
```

### С прогрессом и сжатием

```bash
rsync -avzP ./data/ user@server:/data/
```

### Копирование с удалением лишних файлов

```bash
rsync -avz --delete ./site/ user@server:/var/www/html/
```

## Копирование с удалённого сервера

### Скачивание директории

```bash
rsync -avzP user@server:/var/log/ ./logs/
```

### Скачивание конкретных файлов

```bash
rsync -avzP user@server:"/var/log/*.log" ./logs/
```

## Локальная синхронизация

```bash
rsync -av /home/user/documents/ /mnt/backup/documents/
```

## Примеры

### Пробный запуск (dry run)

```bash
rsync -avzn --delete ./site/ user@server:/var/www/html/
```

### Исключение файлов

```bash
rsync -avz --exclude='*.log' --exclude='.git' ./project/ user@server:/project/
```

### Исключение по файлу

```bash
rsync -avz --exclude-from='exclude.txt' ./project/ user@server:/project/
```

### Исключение с включением

```bash
rsync -avz --include='*.conf' --exclude='*' /etc/ user@server:/backup/etc/
```

### Ограничение скорости

```bash
rsync -avz --bwlimit=5000 ./data/ user@server:/data/
# Ограничение 5000 Кбит/с ≈ 5 Мбит/с
```

### С проверкой по контрольной сумме

```bash
rsync -avzc ./data/ user@server:/data/
```

### Копирование с резервными копиями

```bash
rsync -avz --backup --suffix='.bak' ./config/ user@server:/etc/myapp/
```

### Удаление источника после копирования

```bash
rsync -avz --remove-source-files ./uploads/ user@server:/uploads/
```

### С изменением прав

```bash
rsync -avz --chmod=755 ./scripts/ user@server:/opt/scripts/
```

### Копирование через нестандартный порт

```bash
rsync -avz -e "ssh -p 2222" ./data/ user@server:/data/
```

### Копирование с указанием ключа

```bash
rsync -avz -e "ssh -i ~/.ssh/deploy_key" ./dist/ user@server:/var/www/
```

### Ограничение размера файлов

```bash
rsync -avz --max-size=100M ./data/ user@server:/data/
```

### Копирование только обновлённых файлов

```bash
rsync -avz --update ./source/ user@server:/dest/
```

## Практические сценарии

### Резервное копирование

```bash
# Полное резервное копирование
rsync -avz --delete /home/user/ /mnt/backup/home/

# С ротацией бэкапов
rsync -avz --backup --suffix=".$(date +%Y%m%d)" /home/user/ /mnt/backup/home/
```

### Деплой веб-сайта

```bash
# Пробный запуск
rsync -avzn --delete ./dist/ user@server:/var/www/html/

# Реальное копирование
rsync -avz --delete ./dist/ user@server:/var/www/html/
```

### Синхронизация между серверами

```bash
# С сервера 1 на сервер 2 через локальную машину
rsync -avz -e ssh user@server1:/data/ user@server2:/data/
```

### Резервное копирование базы данных

```bash
# Создать дамп и скопировать
ssh user@server "pg_dump mydb | gzip > /tmp/db.sql.gz"
rsync -avzP user@server:/tmp/db.sql.gz ./backups/
```

### Синхронизация конфигураций

```bash
rsync -avz --dry-run ./configs/ user@server:/etc/myapp/
# Проверить вывод, затем убрать --dry-run
rsync -avz ./configs/ user@server:/etc/myapp/
```

### Зеркалирование директории

```bash
# Полное зеркало (удалить лишнее на сервере)
rsync -avz --delete --exclude='.git' ./project/ user@server:/var/www/project/
```

### Копирование логов

```bash
rsync -avzP --max-size=100M user@server:/var/log/ ./logs/
```

### Миграция данных на новый сервер

```bash
# Старый сервер → новый сервер через локальную машину
rsync -avz -3 user@old-server:/home/ user@new-server:/home/
```

## Автоматизация с cron

```bash
# crontab -e
# Ежедневный бэкап в 3:00
0 3 * * * rsync -avz --delete /home/user/ /mnt/backup/home/ >> /var/log/backup.log 2>&1
```

## Сравнение с scp

| Функция | rsync | scp |
|---------|-------|-----|
| Дельта-передача | ✅ | ❌ |
| Докачка | ✅ | ❌ |
| Синхронизация | ✅ | ❌ |
| Исключения | ✅ | ❌ |
| Прогресс | ✅ | Базовый |
| Скорость | Быстрее | Обычная |

:::tip Совет
Всегда используйте `--dry-run` / `-n` перед важными операциями с `--delete`, чтобы проверить, какие файлы будут удалены.
:::

:::warning Внимание
`--delete` удаляет файлы в назначении, которых нет в источнике. Будьте осторожны с этим флагом — неправильный путь может привести к потере данных.
:::

:::tip Совет
Для больших файлов используйте `rsync -avzP` — флаг `-P` совмещает `--progress` и `--partial`, позволяя докачивать прерванные передачи.
:::

:::tip Совет
Используйте `-e "ssh -p PORT"` для подключения через нестандартный порт вместо `--rsh`.
:::

## Связки с другими командами

```bash
# Деплой с последующим перезапуском сервиса
rsync -avz --delete src/ user@host:/dest/ && ssh user@host 'systemctl restart app'

# Бэкап с исключением логов и зависимостей
rsync -avz --exclude='*.log' --exclude='node_modules' ./ user@host:/backup/

# Синхронизация с ограничением полосы пропускания
rsync -avz --bwlimit=5000 src/ dest/

# Превью изменений перед синхронизацией
rsync -avz --dry-run src/ dest/ | head -20

# Бэкап только конфигурационных файлов
rsync -avz --include='*.conf' --exclude='*' /etc/ user@host:/backup/etc/

# Синхронизация и проверка статуса на сервере
rsync -avz ./dist/ user@host:/var/www/html/ && ssh user@host 'curl -s -o /dev/null -w "%{http_code}" http://localhost'

# Бэкап с ротацией (удаление старых файлов)
rsync -avz --delete --backup --backup-dir="../backup-$(date +%Y%m%d)" /data/ user@host:/backup/current/

# Синхронизация с логированием изменений
rsync -avz --delete src/ dest/ | tee sync.log | wc -l

# Зеркалирование с уведомлением
rsync -avz --delete ./site/ user@host:/var/www/html/ && ssh user@host 'echo "Deploy done" | mail -s "Deploy" admin@example.com'
```
