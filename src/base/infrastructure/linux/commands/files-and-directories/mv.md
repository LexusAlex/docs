# mv

**Уровень:** Начинающий

Перемещает и переименовывает файлы и каталоги. Также используется для переименования в пределах одной файловой системы (без фактического копирования).

## Синтаксис

```bash
mv [опции] источник... назначение
mv файл1 файл2          # переименовать
mv файл каталог/        # переместить в каталог
mv файл каталог/имя     # переместить и переименовать
mv каталог1 каталог2    # переименовать каталог
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-i` | Интерактивный режим — спрашивать перед перезаписью |
| `-f` | Принудительная перезапись без вопросов |
| `-n` | Не перезаписывать существующие файлы (no clobber) |
| `-u` | Перемещать только если источник новее назначения |
| `-v` | Подробный вывод |
| `--backup` | Создать резервную копию перед перезаписью |
| `--backup=NUMBERED` | Нумерованные резервные копии |
| `--backup=SIMPLE` | Резервная копия с суффиксом `~` |
| `-S суффикс` | Задать суффикс для резервных копий |
| `-T` | Обрабатывать назначение как обычный файл (не каталог) |
| `--strip-trailing-slashes` | Удалить завершающие слеши у источника |
| `--no-copy` | Не копировать, если переименование невозможно |
| `--context` | Задать контекст безопасности SELinux |

## Примеры

### 1. Переименование файла

```bash
mv old_name.txt new_name.txt
```

### 2. Переименование каталога

```bash
mv old_dir new_dir
```

### 3. Перемещение файла в каталог

```bash
mv file.txt /tmp/
```

### 4. Перемещение и переименование

```bash
mv file.txt /backup/file_backup.txt
```

### 5. Перемещение нескольких файлов в каталог

```bash
mv file1.txt file2.txt file3.txt /destination/
```

### 6. Интерактивное перемещение

```bash
mv -i file.txt /existing/file.txt
# mv: overwrite '/existing/file.txt'? (y/n)
```

### 7. Принудительное перемещение

```bash
mv -f file.txt /destination/
# Перезаписывает без вопросов
```

### 8. Без перезаписи существующих

```bash
mv -n file.txt /destination/
# Ничего не произойдёт, если файл уже существует
```

### 9. Перемещение только новых файлов

```bash
mv -u source/*.txt /destination/
# Перемещает только если источник новее
```

### 10. Подробный вывод

```bash
mv -v file.txt /backup/
# renamed 'file.txt' -> '/backup/file.txt'
```

### 11. С резервной копией

```bash
mv --backup file.txt /etc/file.txt
# Создаёт /etc/file.txt~ перед перемещением

mv --backup=numbered file.txt /etc/file.txt
# Создаёт /etc/file.txt.~1~, /etc/file.txt.~2~
```

### 12. Перемещение файлов с шаблонами

```bash
mv *.log /var/archive/
mv report_*.csv /data/reports/
mv file[0-9].txt /tmp/
```

### 13. Перемещение с именем, начинающимся с `-`

```bash
mv -- -filename.txt newname.txt
mv ./-filename.txt newname.txt
```

### 14. Перемещение в текущий каталог

```bash
mv /path/to/file.txt .
```

### 15. Безопасное переименование

```bash
mv -n important.conf important.conf.new
# Не перезаписывает, если .new уже существует
```

## Переименование vs перемещение

```bash
# Переименование (в том же каталоге)
mv oldname.txt newname.txt

# Перемещение (в другой каталог)
mv file.txt /other/directory/

# Перемещение и переименование
mv file.txt /other/directory/newname.txt
```

:::tip
На одной файловой системе `mv` просто меняет inode-записи — файл не копируется физически. Это очень быстро даже для больших файлов.
:::

## Практические сценарии

### Переименование с резервной копией

```bash
mv --backup=numbered config.conf config.conf
# config.conf -> config.conf.~1~
```

### Перемещение логов в архив

```bash
mv /var/log/myapp/*.log /var/log/archive/
mv -v /var/log/myapp/*.log /var/log/archive/
```

### Пакетное переименование

```bash
for f in *.jpeg; do
    mv "$f" "${f%.jpeg}.jpg"
done
```

### Безопасное перемещение

```bash
mv -i important.doc /backup/
# Спросит перед перезаписью, если файл уже есть
```

### Очистка рабочего стола

```bash
mv ~/Desktop/*.pdf ~/Documents/PDF/
mv ~/Desktop/*.png ~/Documents/Images/
```

## Связки с другими командами

```bash
# Переместить все .jpg файлы в каталог photos
find . -name "*.jpg" -exec mv {} /photos/ \;

# Переименовать все .txt файлы в .txt.bak
find . -maxdepth 1 -type f -name "*.txt" -exec sh -c 'for file do mv -- "$file" "$file.bak"; done' sh {} +

# Архивировать логи старше 30 дней
find . -type f -name "*.log" -mtime +30 -exec mv -t /archive/ -- {} +

# Переместить файлы, найденные по содержимому
grep -rlZ -- "OLD_API" src/ | xargs -0 -r mv -t /deprecated/ --

# Переименовать файлы, заменяя пробелы на подчёркивания
ls | grep " " | while read f; do mv "$f" "$(echo "$f" | tr ' ' '_')"; done

# Переместить файлы больше 100МБ в отдельный каталог
find . -type f -size +100M -exec mv -t /large_files/ -- {} +

# Переименовать фотографии по дате съёмки
ls *.jpg | while read f; do mv "$f" "$(date -r "$f" +%Y%m%d_%H%M%S).jpg"; done

# Переместить файлы в подкаталоги по расширению
ls | awk -F. '{print $NF}' | sort -u | while read ext; do
    mkdir -p "$ext" && mv *."$ext" "$ext/" 2>/dev/null
done

# Переместить и сжать старые логи
find /var/log -type f -name "*.log" -mtime +7 -exec sh -c 'for file do gzip -- "$file" && mv -- "$file.gz" /archive/; done' sh {} +

# Безопасное перемещение с предпросмотром
find . -type f -name "*.bak" -print -exec mv -t /trash/ -- {} +
```

## Советы

:::warning
`mv` перезаписывает файл назначения по умолчанию. Используйте `mv -i` для безопасности или `mv -n` для предотвращения перезаписи.
:::

:::tip
Используйте `mv --backup` при перемещении важных файлов — это автоматически создаёт резервную копию перед перезаписью.
:::

:::warning
При перемещении каталога в уже существующий: `mv dir existing_dir` поместит `dir` внутрь `existing_dir`, если `existing_dir` существует. Иначе переименует `existing_dir` в `dir`.
:::

:::tip
Для пакетного переименования лучше использовать `rename` — это мощнее и быстрее циклов с `mv`.
:::

## См. также

- [cp](cp.md) — копирование файлов
- [rename](rename.md) — пакетное переименование
