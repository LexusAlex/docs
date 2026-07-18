# setfacl

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

## Связанные команды

- [getfacl](getfacl.md) — просмотр расширенных прав
- [chmod](chmod.md) — базовые права доступа
- [chown](chown.md) — изменение владельца

:::tip
Используйте ACL, когда базовых прав `rwx` для user/group/other недостаточно — например, чтобы дать доступ конкретному пользователю, не меняя группу файла.
:::

:::warning
Установка ACL изменяет групповые права файла. Поле group в `ls -l` будет показывать маску ACL, а не реальную группу. Используйте `getfacl` для точного просмотра.
:::
