# rename

**Уровень:** Средний

Пакетное переименование файлов с помощью регулярных выражений. Существует две версии: Perl (rename) и util-linux (rename).

## Синтаксис

```bash
# Perl-версия (по умолчанию в Debian/Ubuntu)
rename [опции] 's/шаблон/замена/' файлы...

# util-linux версия (CentOS/RHEL)
rename шаблон замена файлы...
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-n`, `--dry-run` | Показать, что будет сделано, без выполнения |
| `-v`, `--verbose` | Подробный вывод |
| `-f`, `--force` | Принудительная перезапись |
| `-0`, `--null` | Использовать null-terminated список файлов |
| `-a` | Заменить все вхождения (по умолчанию только первое) |
| `-g` | Глобальная замена (все вхождения в имени) |
| `-l` | Заменить только последнее вхождение |

## Perl-версия vs util-linux

```bash
# Проверить, какая версия установлена
rename --version
# Perl-версия: File::Rename version X.XX
# util-linux версия: rename from util-linux-2.XX.X

# Perl-версия (мощнее, поддерживает regex):
rename 's/\.txt$/.md/' *.txt

# util-linux версия (простая замена строк):
rename .txt .md *.txt
```

### Установка Perl-версии

```bash
# Debian/Ubuntu
sudo apt install rename

# CentOS/RHEL (альтернативное имя)
sudo dnf install perl-rename
```

## Примеры

### 1. Замена расширения

```bash
# Perl-версия
rename 's/\.txt$/.md/' *.txt

# util-linux версия
rename .txt .md *.txt
```

### 2. Замена в имени файла

```bash
# Заменить '_' на '-'
rename 's/_/-/g' *.txt
# file_name.txt -> file-name.txt
```

### 3. Добавление суффикса

```bash
rename 's/$/.backup/' *.conf
# config.conf -> config.conf.backup
```

### 4. Добавление префикса

```
rename 's/^/old_/' *.log
# access.log -> old_access.log
```

### 5. Удаление части имени

```bash
rename 's/backup_//' *.txt
# backup_file.txt -> file.txt
```

### 6. Перевод в нижний регистр

```bash
rename 'y/A-Z/a-z/' *.TXT
# FILE.TXT -> file.txt
```

### 7. Перевод в верхний регистр

```bash
rename 'y/a-z/A-Z/' *.txt
# file.txt -> FILE.TXT
```

### 8. Добавление нумерации

```bash
my $i = 1; rename "s/^/sprintf('%03d_', \$i++)/e" *.jpg
# 001_photo1.jpg, 002_photo2.jpg, ...
```

### 9. Замена пробелов на подчёркивания

```bash
rename 's/ /_/g' *
# my file.txt -> my_file.txt
```

### 10. Удаление скобок и спецсимволов

```bash
rename 's/[()]//g' *
rename 's/[^a-zA-Z0-9._-]/_/g' *
```

### 11. Предварительный просмотр (dry-run)

```bash
rename -n 's/\.jpeg$/.jpg/' *.jpeg
# rename: photo1.jpeg -> photo1.jpg
# rename: photo2.jpeg -> photo2.jpg
```

### 12. Подробный вывод

```bash
rename -v 's/\.bak$/.old/' *.bak
# file1.bak renamed as file1.old
# file2.bak renamed as file2.old
```

### 13. Изменение нумерации файлов

```bash
rename 's/(\d+)/sprintf("%04d", $1)/e' file_*.txt
# file_1.txt -> file_0001.txt
# file_42.txt -> file_0042.txt
```

### 14. Удаление расширения

```bash
rename 's/\.[^.]+$//' *.bak
# file.txt.bak -> file.txt
```

### 15. Замена с учётом регистра

```bash
rename -a 's/photo/image/' Photo*.jpg
# Photo1.jpg -> image1.jpg (глобальная замена)
```

## Сложные преобразования

### Переименование с датой

```bash
rename 's/^/20230115_/' report_*.csv
# report_sales.csv -> 20230115_report_sales.csv
```

### Переименование с подстрокой

```bash
rename 's/(.*?)_(.*)/$2_$1/' *.txt
# first_last.txt -> last_first.txt
```

### Условное переименование

```bash
# Только если файл не содержит цифры
rename 's/^/prefix_/' [^0-9]*.txt
```

### Нормализация имён

```bash
# Убрать повторяющиеся подчёркивания
rename 's/__+/_/g' *
# Убрать подчёркивания в конце
rename 's/_+$//' *
```

## util-linux версия

```bash
# Простая замена строки (без regex)
rename OLD NEW *.txt
# OLD_file.txt -> NEW_file.txt

# Замена расширения
rename .jpeg .jpg *.jpeg
# photo.jpeg -> photo.jpg

# Добавление суффикса
rename '' _backup *
# file.txt -> file.txt_backup (не работает как ожидается)
```

## Практические сценарии

### Нормализация имён файлов

```bash
# Убрать пробелы и спецсимволы
rename 's/[^a-zA-Z0-9._-]/_/g' *
# Убрать множественные подчёркивания
rename 's/__+/_/g' *
# В нижний регистр
rename 'y/A-Z/a-z/' *
```

### Конвертация расширений

```bash
rename -v 's/\.jpeg$/.jpg/' *.jpeg
rename -v 's/\.htm$/.html/' *.htm
rename -v 's/\.mpeg$/.mp4/' *.mpeg
```

### Добавление timestamps

```bash
timestamp=$(date +%Y%m%d)
rename "s/^/${timestamp}_/" *.log
```

### Переименование фото с камеры

```bash
# IMG_20230115_103045.jpg -> vacation_20230115_103045.jpg
rename 's/^IMG_/vacation_/' IMG_*.jpg
```

## Советы

:::warning
Всегда используйте `-n` (dry-run) перед выполнением, чтобы увидеть, какие файлы будут переименованы и как.
:::

:::tip
Для сложных переименований используйте Perl-версию — она поддерживает полные регулярные выражения Perl с заменами.
:::

:::warning
В CentOS/RHEL по умолчанию установлена util-linux версия. Для Perl-версии установите пакет `prename` или `perl-rename`.
:::

:::tip
Пакетное переименование с `rename` гораздо эффективнее циклов `for` с `mv` — одна команда вместо скрипта.
:::

:::warning
`rename` не отменяет изменения. При сложных преобразованиях всегда делайте резервную копию или используйте `-n` для проверки.
:::

## См. также

- [mv](mv.md) — перемещение/переименование

