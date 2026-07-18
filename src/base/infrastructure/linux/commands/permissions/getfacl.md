# getfacl

**Уровень:** Средний

Вывод расширенных прав доступа (ACL — Access Control List) для файлов и директорий.

## Синтаксис

```bash
getfacl [опции] файл...
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-a`, `--access` | Показать только ACL доступа |
| `-d`, `--default` | Показать только ACL по умолчанию |
| `-c`, `--omit-header` | Не показывать заголовок |
| `-e`, `--no-effective` | Не показывать эффективные права |
| `-R`, `--recursive` | Рекурсивно |
| `-t`, `--omit-time` | Не показывать timestamps |
| `-n`, `--numeric` | Числовые UID/GID |
| `--absolute-names` | Полные пути (не удалять префикс) |

## Примеры

### Просмотр ACL файла

```bash
getfacl file.txt
```

Вывод:
```
# file: file.txt
# owner: user
# group: group
user::rw-
user:guest:r--
group::r--
mask::r--
other::r--
```

### Просмотр ACL директории (включая default)

```bash
getfacl -d /shared/
```

### Рекурсивный просмотр

```bash
getfacl -R /project/
```

### Числовой формат

```bash
getfacl -n file.txt
```

## Понимание вывода

| Строка | Описание |
|--------|----------|
| `user::rw-` | Права владельца |
| `user:guest:r--` | Права конкретного пользователя |
| `group::r--` | Права группы-владельца |
| `group:dev:rw-` | Права конкретной группы |
| `mask::rw-` | Маска ACL (ограничивает групповые и user-записи) |
| `other::r--` | Права остальных |

## Дополнительные примеры

### Рекурсивный просмотр ACL с числами

```bash
getfacl -Rn /project/
```

### Сравнение ACL двух файлов

```bash
diff <(getfacl file1.txt) <(getfacl file2.txt)
```

### Просмотр только default ACL

```bash
getfacl -d -c /shared/
```

### Экспорт ACL в файл

```bash
getfacl -R /project/ > project_acl_backup.txt
```

### Восстановление ACL из файла

```bash
setfacl --restore=project_acl_backup.txt
```

### Просмотр ACL без timestamps

```bash
getfacl -t file.txt
```

### ACL для всех файлов в директории

```bash
getfacl /project/* 2>/dev/null
```

## Практические сценарии

### Общий проектный каталог

```bash
# Назначить ACL для команды разработки
setfacl -R -m g:dev:rw /project/
setfacl -R -d -m g:dev:rw /project/

# Проверить наследование
getfacl -d /project/
touch /project/newfile.txt
getfacl /project/newfile.txt
```

### Права для веб-сервера

```bash
# Дать веб-серверу доступ только на чтение
setfacl -R -m u:www-data:r /var/www/site/

# Проверить эффективные права
getfacl -e /var/www/site/index.html
```

### Бэкап и восстановление ACL

```bash
# Сохранить ACL всего сайта
getfacl -R /var/www/ > /backup/acl_backup.txt

# Восстановить после деплоя
setfacl --restore=/backup/acl_backup.txt
```

### Аудит прав доступа

```bash
# Показать все файлы с расширенными ACL
find /project/ -exec getfacl -c {} + 2>/dev/null | sort -u
```

## Связки с другими командами

### getfacl + setfacl — копирование ACL

```bash
getfacl source_dir/ | setfacl --restore=-
```

### getfacl + diff — сравнение ACL

```bash
diff <(getfacl dir1/) <(getfacl dir2/)
```

### getfacl + find — поиск файлов с ACL

```bash
find /project/ -type f -exec sh -c 'getfacl -c "$1" | grep -q "user:" && echo "$1"' _ {} \;
```

### getfacl + grep — фильтрация записей

```bash
getfacl -R /project/ | grep "user:"
```

### getfacl + chmod — проверка после изменения прав

```bash
chmod 750 /project/
getfacl /project/
```

### getfacl + ls -l — сравнение базовых и расширенных прав

```bash
ls -l file.txt
getfacl file.txt
```

## См. также

- [setfacl](setfacl.md) — установка расширенных прав доступа
- [chmod](chmod.md) — базовые права доступа
- [chown](chown.md) — изменение владельца файла

:::tip
ACL позволяют назначать права для конкретных пользователей и групп, что невозможно с базовыми правами rwx.
:::

:::warning
Файловая система должна поддерживать ACL (ext4, XFS, Btrfs). Для проверки: `mount | grep acl`.
:::
