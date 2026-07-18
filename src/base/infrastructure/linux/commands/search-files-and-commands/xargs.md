# xargs

**Уровень:** Средний

Строит и выполняет команды, читая входные данные из stdin. Преобразует поток данных в аргументы другой команды.

## Синтаксис

```bash
xargs [опции] [команда [начальные аргументы]]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-I замена` | Заполнитель для подстановки аргументов |
| `-n максимум` | Максимальное количество аргументов за вызов |
| `-P максимум` | Количество параллельных процессов |
| `-0` | Null-разделитель (для файлов с пробелами) |
| `-p` | Запрашивать подтверждение |
| `-t` | Показывать команды перед выполнением |
| `-d разделитель` | Указать разделитель ввода |
| `-s максимум` | Максимальная длина командной строки |
| `-r` | Не выполнять при пустом вводе |

## Примеры

### Базовое использование

```bash
printf '%s\n' file1.txt file2.txt | xargs -r rm --
```

### С заполнителем

```bash
printf '%s\n' file1.txt file2.txt | xargs -r -I {} mv -- {} /backup/
```

### Ограничение аргументов

```bash
echo {1..10} | xargs -n 3 echo
```

### Параллельное выполнение

```bash
find . -type f -name "*.png" -print0 | xargs -0 -r -P 4 -I {} sh -c 'convert "$1" "${1%.png}.webp"' _ {}
```

### С null-разделителем

```bash
find . -type f -name "*.log" -print0 | xargs -0 -r rm --
```

### С подтверждением

```bash
echo "important-file" | xargs -p rm
```

### С пользовательским разделителем

```bash
echo "a,b,c,d" | xargs -d "," -n 2 echo
```

### Пустой ввод — ничего не делать

```bash
echo "" | xargs -r echo "Выполнено"
```

### Множественные команды через shell

```bash
find . -type f -name "*.tmp" -print0 | xargs -0 -r -I {} sh -c 'printf "Удаление: %s\n" "$1"; rm -- "$1"' _ {}
```

## Практические сценарии

### Параллельное сжатие

```bash
find . -type f -name "*.log" -print0 | xargs -0 -r -P "$(nproc)" gzip --
```

### Поиск в определённых файлах

```bash
git ls-files -z | xargs -0 -r grep -n -- "TODO"
```

### Массовое переименование

```bash
find . -maxdepth 1 -type f -name "*.txt" -print0 | xargs -0 -r -I {} bash -c 'mv -- "$1" "${1%.txt}.md"' _ {}
```

### Массовое изменение прав

```bash
find /var/www -type f -print0 | xargs -0 -r chmod 644 --
```

### Пакетный git add

```bash
git add -A
```

### Удаление старых контейнеров Docker

```bash
docker ps -aq --filter "status=exited" | xargs -r docker rm
```

:::tip
Всегда используйте `-print0 | xargs -0` при работе с `find` для безопасной обработки файлов с пробелами и спецсимволами.
:::

:::warning
Без `-0` `xargs` разделяет ввод по пробелам. Файлы с пробелами в именах будут обработаны некорректно.
:::

## Связки с другими командами

```bash
# Архивировать логи, содержащие ошибки; имена передаются через NUL
find . -type f -name "*.log" -exec grep -lZ -- "error" {} + |
    tar --null -T - -czf error-logs.tar.gz

# Показать зомби и их родителей: отправлять сигнал самому зомби бесполезно
ps -eo pid=,ppid=,stat=,cmd= | awk '$3 ~ /^Z/ {print}'

# Параллельный SSH-опрос непустых строк без комментариев
sed -e '/^[[:space:]]*#/d' -e '/^[[:space:]]*$/d' hosts.txt |
    xargs -r -P 5 -I {} ssh -- {} uptime

# Параллельное сжатие файлов
find . -type f -name "*.bak" -print0 | xargs -0 -r -P 4 gzip --

# Удалить висящие Docker-образы
docker images -f "dangling=true" -q | xargs -r docker rmi

# Показать заголовки всех CSV-файлов
find . -maxdepth 1 -type f -name "*.csv" -exec sh -c \
    'printf "=== %s ===\n" "$1"; head -n 1 -- "$1"' _ {} \;

# Проверить синтаксис всей конфигурации nginx
sudo nginx -t

# Найти и удалить файлы старше 90 дней
find /tmp -type f -mtime +90 -print0 | xargs -0 -r rm -f --

# Количество строк во всех Go-файлах проекта
find . -type f -name "*.go" -print0 | xargs -0 -r wc -l -- | tail -n 1

# Пакетное преобразование изображений в WebP
find . -type f -name "*.png" -print0 |
    xargs -0 -r -P "$(nproc)" -I {} sh -c 'cwebp -q 80 "$1" -o "${1%.png}.webp"' _ {}
```

## См. также

- [find](find.md) — поиск файлов
- [grep](grep.md) — поиск текста
