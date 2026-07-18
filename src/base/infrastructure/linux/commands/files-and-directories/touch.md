# touch

**Уровень:** Начинающий

Изменяет timestamps (временные метки) файлов. Если файл не существует, создаёт пустой файл.

## Синтаксис

```bash
touch [опции] файл...
touch файл1 файл2 файл3
touch -t YYYYMMDDhhmm файл
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-a` | Изменить только время последнего доступа (atime) |
| `-m` | Изменить только время последнего изменения (mtime) |
| `-c` | Не создавать файл, если он не существует |
| `-r файл` | Использовать timestamps указанного файла как образец |
| `-t [[CC]YY]MMDDhhmm[.ss]` | Задать конкретное время |
| `-d строка` | Задать время строкой (распознаётся GNU date) |
| `--no-create` | То же, что `-c` |
| `--reference=файл` | То же, что `-r` |

## Примеры

### 1. Создание пустого файла

```bash
touch file.txt
ls -l file.txt
# -rw-r--r-- 1 alex alex 0 Jan 15 10:30 file.txt
```

### 2. Создание нескольких файлов

```bash
touch file1.txt file2.txt file3.txt
```

### 3. Создание файлов с шаблоном (brace expansion)

```bash
touch file_{1..10}.txt
# Создаст: file_1.txt file_2.txt ... file_10.txt
```

### 4. Создание файлов с разными расширениями

```bash
touch report.{doc,xls,pdf,html}
# Создаст: report.doc report.xls report.pdf report.html
```

### 5. Обновить время модификации (по умолчанию)

```bash
touch existing_file.txt
# Обновляет mtime и atime до текущего времени
```

### 6. Изменить только время доступа

```bash
touch -a file.txt
# Изменяет только atime, mtime остаётся прежним
```

### 7. Изменить только время модификации

```bash
touch -m file.txt
# Изменяет только mtime, atime остаётся прежним
```

### 8. Задать конкретное время

```bash
touch -t 202301151030 file.txt
# 15 января 2023, 10:30
```

### 9. Задать время строкой

```bash
touch -d "2023-01-15 10:30:00" file.txt
touch -d "yesterday" file.txt
touch -d "2 days ago" file.txt
touch -d "next Monday" file.txt
```

### 10. Использовать время другого файла

```bash
touch -r reference.txt new_file.txt
# new_file.txt получит те же timestamps, что и reference.txt
```

### 11. Не создавать файл

```bash
touch -c nonexistent.txt
# Файл НЕ будет создан
```

### 12. Создание файла с именем, начинающимся с `-`

```bash
touch -- -filename.txt
touch ./-filename.txt
# Два способа создать файл с именем, начинающимся с дефиса
```

### 13. Обновление времени для всех файлов в каталоге

```bash
touch /tmp/lockfile
# Обновить время модификации (используется как маркер активности)
```

### 14. Создание файлов с временным штампом

```bash
timestamp=$(date +%Y%m%d_%H%M%S)
touch "backup_${timestamp}.txt"
# backup_20230115_103045.txt
```

### 15. Установка времени в будущем

```bash
touch -d "next year" future.txt
ls -l future.txt
# Показывает дату через год
```

## Практические сценарии

### Создание лок-файла

```bash
touch /var/lock/myapp.lock
# Пустой файл-маркер для предотвращения повторного запуска
```

### Обновление кеша

```bash
touch /var/cache/myapp/cache.db
# "Потрогать" файл, чтобы система знала о его актуальности
```

### Создание структуры проекта

```bash
mkdir -p src/{components,utils,styles}
touch src/components/{Header,Footer,App}.{js,css}
touch src/utils/helpers.js
touch src/styles/main.css
```

### Проверка, был ли файл изменён

```bash
touch /tmp/checkpoint
# ... выполняем операции ...
if [ /etc/config.conf -nt /tmp/checkpoint ]; then
    echo "Конфигурация была изменена"
fi
```

### Создание маркеров для тестов

```bash
# Создать файлы для тестирования скрипта
mkdir -p test_dir
touch test_dir/{a,b,c}.txt
touch test_dir/.hidden
```

## Советы

:::tip
Используйте `touch` для создания пустых файлов-заглушок, например `.gitkeep` для отслеживания пустых каталогов в Git.
:::

:::warning
`touch` не может изменить timestamps файлов, владельцем которых вы не являетесь, без использования `sudo`.
:::

:::tip
Для создания файла с содержимым используйте `echo "text" > file.txt` или `cat > file.txt`. `touch` создаёт только пустые файлы.
:::

:::warning
При использовании `-t` помните формат: `[[CC]YY]MMDDhhmm[.ss]`. Порядок: год (опционально), месяц, день, час, минута, секунды (опционально).
:::

## См. также

- [mkdir](mkdir.md) — создание директорий
- `stat` — информация о файле
