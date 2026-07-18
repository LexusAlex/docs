# cat

**Уровень:** Начинающий

Команда `cat` (concatenate) объединяет и выводит содержимое файлов в стандартный вывод.

## Синтаксис

```bash
cat [опции] [файл...]
cat -  # чтение из stdin
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-n` | Нумеровать все строки |
| `-b` | Нумеровать только непустые строки |
| `-s` | Сжимать несколько пустых строк в одну |
| `-A` | Показать все символы (табы, концы строк) |
| `-T` | Показать табуляции как `^I` |
| `-E` | Показать концы строк как `$` |
| `-v` | Показать непечатаемые символы |
| `--number` | То же, что `-n` |
| `--squeeze-blank` | То же, что `-s` |

## Примеры

```bash
# Вывести содержимое файла
cat file.txt

# Вывести несколько файлов подряд
cat file1.txt file2.txt file3.txt

# Нумерация всех строк
cat -n script.py

# Нумерация только непустых строк
cat -b document.txt

# Сжатие пустых строк
cat -s log.txt

# Показать табуляции и концы строк
cat -A config.yaml

# Показать только табуляции
cat -T Makefile

# Показать только концы строк
cat -E data.csv

# Создать файл с помощью перенаправления
cat > newfile.txt << EOF
первая строка
вторая строка
EOF

# Дописать в конец файла
cat >> existing.txt << EOF
новая строка
EOF

# Объединение файлов в один
cat part1.txt part2.txt part3.txt > combined.txt

# Вывод с пайпом в less
cat largefile.log | less

# Нумерация строк в выводе grep
grep "error" log.txt | cat -n

# Показать непечатаемые символы в файле
cat -v binary_data.txt
```

## Практические сценарии

### Просмотр конфигурационных файлов
```bash
# Быстрый просмотр с невидимыми символами
cat -A /etc/nginx/nginx.conf
# Помогает обнаружить проблемы с отступами (табы vs пробелы)
```

### Создание скриптов из командной строки
```bash
cat > deploy.sh << 'SCRIPT'
#!/bin/bash
echo "Деплой начался..."
git pull origin main
npm install
npm run build
echo "Деплой завершён!"
SCRIPT
chmod +x deploy.sh
```

### Объединение логов
```bash
cat access.log.1 access.log.2 access.log.3 > all_logs.txt
```

### Просмотр CSV с форматированием
```bash
cat -T data.csv | column -t -s $'\t'
```

### Проверка концов строк (Windows vs Linux)
```bash
cat -E suspicious_file.txt
# Если видны \r$ перед $, файл в формате Windows
```

## Советы

:::tip
Для просмотра больших файлов используйте `less` вместо `cat`, так как `cat` выведет всё сразу и вы не сможете прокручивать.
:::

:::warning
Будьте осторожны с `cat > file` — перезапишет файл без предупреждения. Используйте `>>` для дописывания.
:::

:::tip
Опция `-A` эквивалентна `-vET` — она показывает все непечатаемые символы, табуляции и концы строк.
:::

## Дополнительные примеры

### Нумерация только непустых строк

```bash
cat -b document.txt
```

### Показать управляющие символы

```bash
cat -v binary_file.dat
```

### Конкатенация нескольких файлов с нумерацией

```bash
cat -n part1.txt part2.txt part3.txt
```

### Сжатие пустых строк при объединении

```bash
cat -s merged.txt
```

### Создание файла с точным содержимым

```bash
cat > config.yml << 'EOF'
server:
  port: 8080
  host: 0.0.0.0
EOF
```

### Дописывание без перезаписи

```bash
cat >> /etc/hosts << 'EOF'
192.168.1.10 myserver.local
EOF
```

### Просмотр файла с табуляцией

```bash
cat -T Makefile
```

### Проверка Windows-переносов строк

```bash
cat -E file_from_windows.txt
# Если видны \r$ — файл в формате Windows
```

## Практические сценарии

### Просмотр конфигурационных файлов

```bash
cat -A /etc/nginx/nginx.conf
# Помогает обнаружить проблемы с отступами
```

### Создание скрипта из командной строки

```bash
cat > setup.sh << 'SCRIPT'
#!/bin/bash
apt update && apt upgrade -y
apt install -y git curl wget
SCRIPT
chmod +x setup.sh
```

### Объединение логов

```bash
cat /var/log/app/access.log.* > /tmp/all_access.log
```

### Просмотр CSV с форматированием

```bash
cat -T data.csv | column -t -s $'\t'
```

### Быстрое создание тестовых данных

```bash
cat > test.txt << 'EOF'
строка 1
строка 2
строка 3
EOF
```

### Проверка кодировки файла

```bash
cat -v suspicious_file.txt | head -5
```

### Просмотр бинарного файла

```bash
cat -v /usr/bin/ls | head -20
```

## Связки с другими командами

### cat + grep — фильтрация содержимого

```bash
cat config.yml | grep "port"
```

### cat + sed — замена текста

```bash
cat file.txt | sed 's/old/new/g'
```

### cat + awk — обработка данных

```bash
cat data.csv | awk -F',' '{print $1, $3}'
```

### cat + wc — подсчёт строк/слов/символов

```bash
cat file.txt | wc -l
```

### cat + head — просмотр начала

```bash
cat largefile.log | head -20
```

### cat + tail — просмотр конца

```bash
cat largefile.log | tail -20
```

### cat + less — постраничный просмотр

```bash
cat largefile.log | less
```

### cat + sort — сортировка содержимого

```bash
cat unsorted.txt | sort
```

### cat + uniq — удаление дубликатов

```bash
cat list.txt | sort | uniq
```

### cat + tee — вывод в файл и на экран

```bash
cat config.yml | tee config_backup.yml
```

## См. также

- [less](less.md) — постраничный просмотр файлов
- [head](head.md) — просмотр начала файла
- [tail](tail.md) — просмотр конца файла
- [more](more.md) — постраничный просмотр (устаревший)
