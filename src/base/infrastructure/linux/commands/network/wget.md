# wget

**Уровень:** Начинающий

Утилита для загрузки файлов по HTTP, HTTPS и FTP.

## Синтаксис

```bash
wget [опции] URL
```

## Опции

| Опция | Описание |
|-------|----------|
| `-O файл` | Сохранить с указанным именем |
| `-c` | Продолжить прерванную загрузку |
| `-b` | Загрузка в фоне |
| `-r` | Рекурсивная загрузка |
| `-l уровень` | Глубина рекурсии |
| `-np` | Не подниматься выше по иерархии |
| `-A список` | Принять файлы по расширению |
| `-R список` | Отклонить файлы по расширению |
| `--limit-rate` | Ограничить скорость |
| `--mirror` | Зеркалирование сайта |
| `-q` | Тихий режим |
| `--spider` | Проверить без загрузки |
| `--tries=N` | Количество попыток |
| `--wait=N` | Пауза между запросами |
| `-E` | Добавить расширение .html |
| `--no-check-certificate` | Игнорировать SSL |

## Примеры

### Скачать файл

```bash
wget https://example.com/file.zip
```

### Сохранить с именем

```bash
wget -O output.zip https://example.com/file.zip
```

### Продолжить загрузку

```bash
wget -c https://example.com/large-file.zip
```

### В фоне

```bash
wget -b https://example.com/large-file.log
```

### Рекурсивная загрузка

```bash
wget -r -l 2 https://example.com/docs/
```

### Ограничить глубину

```bash
wget -r -l 1 -np https://example.com/files/
```

### Принять только PDF

```bash
wget -r -A "*.pdf" https://example.com/documents/
```

### Отклонить файлы

```bash
wget -r -R "*.jpg,*.png" https://example.com/
```

### Ограничить скорость

```bash
wget --limit-rate=1m https://example.com/large-file.zip
```

### Зеркалирование сайта

```bash
wget --mirror -p --convert-links https://example.com
```

### Проверить доступность

```bash
wget --spider https://example.com/file.zip
```

### Тихий режим

```bash
wget -q https://example.com/file.zip
```

### С таймаутом и попытками

```bash
wget --tries=3 --timeout=30 https://example.com/file.zip
```

### Пауза между запросами

```bash
wget -r --wait=2 https://example.com/files/
```

### Скачать несколько файлов

```bash
wget -i urls.txt
```

### Игнорировать SSL

```bash
wget --no-check-certificate https://self-signed.example.com/file
```

### Скачать с авторизацией

```bash
wget --user=admin --password=secret https://example.com/protected/
```

### Рекурсивно только HTML

```bash
wget -r -l 3 -A "*.html" https://example.com/
```

### Скачать все ссылки со страницы

```bash
wget -r -l 1 -nd -A "*.pdf" https://example.com/resources/
```

### С логированием

```bash
wget -o download.log https://example.com/file.zip
```

## Практические сценарии

### Скачивание с повторами

```bash
wget --tries=10 --retry-connrefused --waitretry=5 https://example.com/file.zip
```

### Загрузка в скрипте

```bash
if wget -q --spider https://example.com/file.zip; then
    wget -q https://example.com/file.zip
else
    echo "Файл недоступен"
fi
```

### Зеркалирование документации

```bash
wget --mirror --convert-links --adjust-extension \
  --page-requisites --no-parent https://docs.example.com
```

### Пакетная загрузка

```bash
while read -r url; do
    wget -q "$url" &
done < urls.txt
wait
```

:::tip
Используйте `-c` для продолжения прерванной загрузки. Это работает с большинством серверов.
:::

:::warning
Рекурсивная загрузка (`-r`) может создать огромное количество запросов. Всегда ограничивайте глубину (`-l`) и используйте `--wait`.
:::

## См. также

- [curl](curl.md) — HTTP-запросы
- [scp](ssh/scp.md) — копирование по SSH


## Связки с другими командами

```bash
# Получить последний релиз из GitHub API
wget -qO- https://api.github.com/repos/user/repo/releases/latest | jq '.tag_name'

# Параллельная загрузка URL из файла (4 потока)
cat urls.txt | xargs -P 4 wget -q

# Проверить HTTP-статус без загрузки тела
wget -qO /dev/null -S https://example.com 2>&1 | grep "HTTP/"

# Проверить ссылки на странице (рекурсивно, 1 уровень)
wget --spider -r -l 1 https://example.com 2>&1 | grep "HTTP/" | head -20

# Зеркалирование сайта (2 уровня вглубь)
wget -r -l 2 -np -k https://example.com

# Загрузить файл и проверить его целостность через checksum
wget -q https://example.com/file.zip && sha256sum file.zip

# Скачать страницу и извлечь все ссылки
wget -qO- https://example.com | grep -oP 'href="\K[^"]+' | head -20

# Загрузка с прогрессом в лог-файл
wget https://example.com/large-file.zip 2>&1 | tee download.log | grep -E "saved|error"

# Проверить доступность нескольких файлов
while read -r url; do
  wget --spider -q "$url" && echo "OK: $url" || echo "FAIL: $url"
done < urls.txt

# Скачать только файлы определённого размера (> 1MB)
wget -r -l 1 -np https://example.com/files/ 2>&1 | grep -E "^\s*[0-9]" | awk '$2 > 1048576 {print $NF}'
```
