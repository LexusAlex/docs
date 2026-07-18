# gunzip

**Уровень:** Средний

Утилита для распаковки файлов, сжатых `gzip`. Полностью эквивалентна `gzip -d`.

## Синтаксис

```bash
gunzip [опции] [файлы.gz]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-k` | Сохранить сжатый файл после распаковки |
| `-f` | Принудительная перезапись |
| `-v` | Подробный вывод |
| `-l` | Показать информацию о сжатом файле |
| `-c` | Вывод в stdout, файл не изменяется |
| `-r` | Рекурсивная распаковка директорий |
| `-t` | Проверить целостность |
| `-S суффикс` | Указать альтернативное расширение |

## Примеры

### Распаковка файла

```bash
gunzip file.txt.gz
```

### Распаковка с сохранением .gz

```bash
gunzip -k file.txt.gz
```

### Принудительная распаковка

```bash
gunzip -f archive.gz
```

### Просмотр информации

```bash
gunzip -l archive.gz
```

### Распаковка в stdout

```bash
gunzip -c file.txt.gz
```

### Проверка целостности

```bash
gunzip -t archive.gz
```

### Подробный вывод

```bash
gunzip -v *.gz
```

### Рекурсивная распаковка

```bash
gunzip -r /backup/compressed/
```

### Распаковка с нестандартным расширением

```bash
gunzip -S .z file.z
```

### Распаковка нескольких файлов

```bash
gunzip file1.gz file2.gz file3.gz
```

## Практические сценарии

### Распаковка всех .gz в директории

```bash
gunzip *.gz
```

### Просмотр содержимого сжатого лога

```bash
gunzip -c /var/log/syslog.1.gz | less
```

### Распаковка с проверкой

```bash
gunzip -tv *.gz
```

### Извлечение без распаковки

```bash
gunzip -c backup.gz > backup.restored
```

## Дополнительные примеры

### Распаковка нескольких файлов с подстановкой

```bash
gunzip /var/log/*.gz
```

### Сохранение оригинала с подробным выводом

```bash
gunzip -kv archive.gz
```

### Проверка целостности всех архивов

```bash
gunzip -t /backup/*.gz
```

### Просмотр информации о сжатии

```bash
gunzip -l /var/log/syslog.*.gz
```

### Распаковка в stdout с фильтрацией

```bash
gunzip -c access.log.gz | grep "404" | wc -l
```

### Распаковка с нестандартным расширением

```bash
gunzip -S .gzip file.gzip
```

### Пакетная распаковка с find

```bash
find /backup/ -name "*.gz" -exec gunzip -k {} \;
```

### Просмотр содержимого без распаковки

```bash
gunzip -c report.csv.gz | head -20
```

## Практические сценарии

### Распаковка логов за вчера

```bash
gunzip -k /var/log/syslog.1.gz
grep "error" /var/log/syslog.1
```

### Извлечение бэкапа базы данных

```bash
gunzip -v db_backup.sql.gz
ls -lh db_backup.sql
```

### Проверка целостности бэкапов

```bash
for f in /backup/*.gz; do
  gunzip -t "$f" && echo "OK: $f" || echo "FAIL: $f"
done
```

### Просмотр архивированного лога

```bash
gunzip -c /var/log/auth.log.2.gz | grep "Failed" | tail -20
```

### Распаковка с сохранением структуры

```bash
gunzip -r /backup/compressed/
```

## Связки с другими командами

### gunzip + tar — распаковка .tar.gz

```bash
gunzip -c archive.tar.gz | tar xf -
# Или проще: tar xzf archive.tar.gz
```

### gunzip + find — распаковка всех .gz рекурсивно

```bash
find /logs/ -name "*.gz" -exec gunzip -k {} \;
```

### gunzip + zcat — просмотр без распаковки

```bash
zcat file.gz | less
# Эквивалент: gunzip -c file.gz | less
```

### gunzip + zgrep — поиск в сжатых файлах

```bash
zgrep "error" /var/log/*.gz
```

### gunzip + zless — постраничный просмотр

```bash
zless /var/log/syslog.1.gz
```

### gunzip + wc — подсчёт строк

```bash
gunzip -c access.log.gz | wc -l
```

### gunzip + diff — сравнение сжатых файлов

```bash
diff <(gunzip -c old.gz) <(gunzip -c new.gz)
```

## См. также

- [gzip](gzip.md) — сжатие файлов
- [tar](tar.md) — работа с архивами
- [bzip2](bzip2.md) — альтернативный алгоритм сжатия
- [xz](xz.md) — сжатие с высокой степенью

:::tip
`gunzip` — это просто ссылка на `gzip -d`. Можно использовать любую форму, результат идентичен.
:::

:::warning
По умолчанию `gunzip` удаляет `.gz` файл после распаковки. Используйте `-k`, если нужно сохранить сжатую копию.
:::
