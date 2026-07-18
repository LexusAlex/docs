# chown

Изменение владельца и группы файлов.

## Синтаксис

```bash
chown [опции] [владелец][:.группа] файл...
```

## Опции

| Опция | Описание |
|-------|----------|
| `-R` | Рекурсивно |
| `-v` | Подробный вывод |
| `-c` | Показать только изменения |
| `--reference=файл` | Использовать владельца другого файла |
| `--preserve-root` | Не рекурсивно для / |
| `--from=текущий_владелец` | Изменить только если совпадает |
| `--help` | Помощь |
| `--version` | Версия |

## Синтаксис изменения

| Команда | Описание |
|---------|----------|
| `chown user file` | Изменить владельца |
| `chown user:group file` | Изменить владельца и группу |
| `chown :group file` | Изменить только группу |
| `chown user: file` | Изменить владельца и группу на его основную |

## Примеры

### Изменить владельца

```bash
chown alex file.txt
```

### Изменить владельца и группу

```bash
chown alex:developers file.txt
```

### Изменить только группу

```bash
chown :developers file.txt
```

### Рекурсивно

```bash
chown -R alex:developers /var/www/html
```

### Подробный вывод

```bash
chown -v alex file.txt
```

### Только изменения

```bash
chown -c alex file.txt
```

### По образцу

```bash
chown --reference=file1.txt file2.txt
```

### Изменить если совпадает

```bash
chown --from=root alex file.txt
```

### С точкой вместо двоеточия

```bash
chown alex.developers file.txt
```

### Изменить владельца каталога

```bash
chown alex:alex /home/alex
```

### Рекурсивно с подробным выводом

```bash
chown -Rv alex:developers /project
```

### Изменить все файлы в каталоге

```bash
chown alex:alex /home/alex/*
```

### Скрытые файлы

```bash
chown alex:alex /home/alex/.*
```

### Проверка после изменения

```bash
ls -l file.txt
```

## Практические сценарии

### Изменение владельца для веб-сервера

```bash
chown -R www-data:www-data /var/www/html
```

### Восстановление прав домашнего каталога

```bash
chown -R alex:alex /home/alex
```

### Безопасное изменение

```bash
# Проверить текущего владельца
ls -l file.txt

# Изменить
chown alex:developers file.txt

# Проверить
ls -l file.txt
```

:::tip
Используйте `chown -R` с осторожностью. Неправильный владелец может сломать работу сервисов.
:::

:::warning
Изменение владельца системных файлов может привести к неработоспособности системы. Всегда проверяйте, что вы делаете.
:::

### Пакетное изменение

```bash
find /var/www -type f -exec chown www-data:www-data {} \;
find /var/www -type d -exec chown www-data:www-data {} \;
```

### Изменение с сохранением прав

```bash
# Изменить владельца, сохранив группу
chown alex: file.txt
```

## См. также

- `chmod` — изменение прав
- `chgrp` — изменение группы
- `ls -l` — просмотр владельца и прав
- `find` — поиск файлов для изменения

## Связки с другими командами

```bash
# Изменить владельца всех файлов веб-сервера
find /var/www -type f -exec chown www-data:www-data {} \;

# Перенести владение файлов от одного пользователя к другому
find /home/user -type f -user olduser -exec chown newuser {} \;

# Сделать текущего пользователя владельцем проекта
chown -R $(whoami):$(whoami) ~/project

# Сгруппировать файлы по владельцу
ls -la | awk 'NR>1 {print $3, $9}' | sort | uniq -c

# Изменить владельца только директорий
find /var/www -type d -exec chown www-data:www-data {} \;

# Изменить владельца файлов, игнорируя символические ссылки
find /var/www -type f ! -type l -exec chown www-data:www-data {} \;

# Проверить файлы с неправильным владельцем
find /var/www ! -user www-data -exec ls -la {} \;

# Изменить владельца и права одновременно
find /var/www -type f -exec chown www-data:www-data {} \; -exec chmod 644 {} \;

# Найти файлы, принадлежащие несуществующему пользователю
find / -nouser 2>/dev/null | head -20

# Массовое изменение группы для проекта
find /project -type f -exec chown :developers {} \;
```
