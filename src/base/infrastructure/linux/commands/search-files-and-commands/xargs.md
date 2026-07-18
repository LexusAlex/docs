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
echo "file1.txt file2.txt" | xargs rm
```

### С заполнителем

```bash
echo "file1.txt file2.txt" | xargs -I {} mv {} /backup/
```

### Ограничение аргументов

```bash
echo {1..10} | xargs -n 3 echo
```

### Параллельное выполнение

```bash
find . -name "*.png" | xargs -P 4 -I {} convert {} {}.webp
```

### С null-разделителем

```bash
find . -name "*.log" -print0 | xargs -0 rm
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
find . -name "*.tmp" | xargs -I {} sh -c 'echo "Удаление: {}"; rm "{}"'
```

## Практические сценарии

### Параллельное сжатие

```bash
find . -name "*.log" -print0 | xargs -0 -P $(nproc) gzip
```

### Поиск вопределённных файлах

```bash
git ls-files | xargs grep "TODO"
```

### Массовое переименование

```bash
ls *.txt | xargs -I {} bash -c 'mv "$1" "${1%.txt}.md"' _ {}
```

### Массовое изменение прав

```bash
find /var/www -type f -print0 | xargs -0 chmod 644
```

### Пакетный git add

```bash
git status --porcelain | awk '{print $2}' | xargs git add
```

### Удаление старых контейнеров Docker

```bash
docker ps -aq --filter "status=exited" | xargs docker rm
```

:::tip
Всегда используйте `-print0 | xargs -0` при работе с `find` для безопасной обработки файлов с пробелами и спецсимволами.
:::

:::warning
Без `-0` `xargs` разделяет ввод по пробелам. Файлы с пробелами в именах будут обработаны некорректно.
:::

## См. также

- [find](find.md) — поиск файлов
- [grep](grep.md) — поиск текста


## Связки с другими командами

```bash
# Архивировать логи, содержащие ошибки
find . -name "*.log" | xargs grep -l "error" | xargs tar -czf error-logs.tar.gz

# Завершить зомби-процессы
ps aux | grep zombie | awk '{print $2}' | xargs kill -9

# Параллельный SSH-опрос нескольких хостов
cat hosts.txt | xargs -I{} -P 5 ssh {} 'uptime'

# Параллельное сжатие файлов
find . -name "*.bak" | xargs -P 4 gzip

# Удалить висящие Docker-образы
docker images -f "dangling=true" -q | xargs docker rmi

# Показать заголовки всех CSV-файлов
ls *.csv | xargs -I{} sh -c 'echo "=== {} ===" && head -1 {}'

# Массовая проверка синтаксиса конфигов
find /etc/nginx -name "*.conf" -print0 | xargs -0 sudo nginx -t -c

# Найти и удалить файлы старше 90 дней
find /tmp -type f -mtime +90 -print0 | xargs -0 rm -f

# Количество строк во всех Go-файлах проекта
find . -name "*.go" -print0 | xargs -0 wc -l | tail -1

# Пакетное преобразование изображений в WebP
find . -name "*.png" -print0 | xargs -0 -P $(nproc) -I {} sh -c 'cwebp -q 80 "$1" -o "${1%.png}.webp"' _
```
