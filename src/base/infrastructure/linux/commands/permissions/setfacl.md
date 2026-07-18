# setfacl

**Уровень:** Средний

Установка расширенных прав доступа (ACL — Access Control List) для файлов и директорий.

## Синтаксис

```bash
setfacl [опции] правила файл...
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-m`, `--modify` | Изменить ACL |
| `-x`, `--remove` | Удалить запись ACL |
| `-b`, `--remove-all` | Удалить все расширенные ACL |
| `-d`, `--default` | Установить ACL по умолчанию (для директорий) |
| `-k`, `--remove-default` | Удалить ACL по умолчанию |
| `-R`, `--recursive` | Рекурсивно |
| `--set` | Заменить ACL полностью |
| `--restore` | Восстановить ACL из файла |
| `-n`, `--no-mask` | Не пересчитывать effective mask |
| `--mask` | Пересчитать effective mask |
| `--omit-header` | Не показывать заголовок |

## Формат правил

```
[ug]:имя:[rwx]
```

| Префикс | Описание |
|---------|----------|
| `u:name:perms` | Права для пользователя |
| `g:name:perms` | Права для группы |
| `o:perms` | Права для остальных |
| `m::perms` | Маска ACL |

## Примеры

### Дать права пользователю

```bash
setfacl -m u:guest:rw file.txt
```

### Дать права группе

```bash
setfacl -m g:developers:r /project/
```

### Удалить права пользователя

```bash
setfacl -x u:guest file.txt
```

### Очистить все ACL

```bash
setfacl -b file.txt
```

### ACL по умолчанию для директории

Наследуемые права для новых файлов:

```bash
setfacl -d -m g:developers:rw /shared/
```

### Рекурсивная установка

```bash
setfacl -R -m g:developers:rw /project/
```

### Установить несколько прав одновременно

```bash
setfacl -m u:alice:rwx -m u:bob:r-x -m g:dev:rw file.txt
```

### Запретить доступ для конкретного пользователя

```bash
setfacl -m u:nobody:--- file.txt
```

### Копирование ACL с одного файла на другой

```bash
getfacl source.txt | setfacl --restore -M target.txt
```

## Маска ACL

Маска определяет **максимальные** права для записей `group`, `user:name` и `named group`. Даже если пользователю назначено `rwx`, а маска `r--`, эффективные права будут `r--`.

```bash
setfacl -m m::rw file.txt  # установить маску
getfacl file.txt            # посмотреть effective rights
```

## Дополнительные примеры

### Удаление конкретной записи ACL

```bash
setfacl -x u:guest file.txt
```

### Удаление ACL для группы

```bash
setfacl -x g:developers file.txt
```

### Копирование ACL между файлами

```bash
getfacl source.txt | setfacl --set - target.txt
```

### Копирование ACL с stdin

```bash
echo "user:guest:rw-" | setfacl -M - file.txt
```

### Пересчёт маски

```bash
setfacl --mask -m g:developers:rw file.txt
```

### Запрет доступа (запись пустого ACL)

```bash
setfacl -m u:nobody:000 file.txt
```

### Установка ACL из файла

```bash
cat acl_rules.txt | setfacl -M - /project/
```

### Формат файла правил

```
u:alice:rwx
u:bob:r-x
g:dev:rw
m::rw
```

## Практические сценарии

### Командный каталог

```bash
# Создаём общий каталог
mkdir /team/project
chmod 770 /team/project

# Назначаем ACL для участников
setfacl -m u:alice:rwx /team/project
setfacl -m u:bob:rx /team/project
setfacl -m g:qa:rx /team/project

# Наследование для новых файлов
setfacl -d -m g:dev:rw /team/project
```

### Read-only доступ для аудитора

```bash
# Аудитор может читать, но не менять
setfacl -R -m u:auditor:r /project/

# Проверить
getfacl /project/important.txt
```

### Отзыв доступа

```bash
# Полный отзыв прав пользователя
setfacl -x u:former_employee /project/

# Проверить
getfacl /project/
```

### Временный доступ

```bash
# Дать временный доступ
setfacl -m u:intern:rw /project/

# Отозвать через cron (скрипт revoke_access.sh)
# setfacl -x u:intern /project/
```

### Изоляция директорий

```bash
# Каждый разработчик видит только свой каталог
setfacl -m u:dev1:rwx /project/dev1/
setfacl -m u:dev1:000 /project/dev2/
```

## Связки с другими командами

### setfacl + getfacl — проверка после установки

```bash
setfacl -m u:guest:rw file.txt
getfacl file.txt
```

### setfacl + chmod — совместное использование

```bash
chmod 750 /project/
setfacl -m u:guest:r /project/
# ACL расширяет базовые права
```

### setfacl + find — рекурсивная установка ACL

```bash
find /project/ -type d -exec setfacl -m g:dev:rx {} \;
find /project/ -type f -exec setfacl -m g:dev:rw {} \;
```

### setfacl + xargs — ACL для списка файлов

```bash
cat file_list.txt | xargs -I {} setfacl -m u:guest:r {}
```

### setfacl + stat — проверка наличия ACL

```bash
stat -c "%a %n" file.txt
getfacl file.txt
```

## См. также

- [getfacl](getfacl.md) — просмотр расширенных прав доступа
- [chmod](chmod.md) — базовые права доступа
- [chown](chown.md) — изменение владельца файла

:::tip
Используйте ACL, когда базовых прав `rwx` для user/group/other недостаточно — например, чтобы дать доступ конкретному пользователю, не меняя группу файла.
:::

:::warning
Установка ACL изменяет групповые права файла. Поле group в `ls -l` будет показывать маску ACL, а не реальную группу. Используйте `getfacl` для точного просмотра.
:::
