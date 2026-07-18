# groupmod

Изменение свойств существующей группы.

## Синтаксис

```bash
groupmod [опции] имя_группы
```

## Опции

| Опция | Описание |
|-------|----------|
| `-n имя` | Новое имя группы |
| `-g GID` | Новый GID |
| `-o` | Разрешить неуникальный GID |
| `-p пароль` | Новый зашифрованный пароль |
| `-R корень` | Использовать другой корень |

## Конфигурационные файлы

| Файл | Описание |
|------|----------|
| `/etc/group` | Информация о группах |
| `/etc/gshadow` | Защищённая информация о группах |

## Примеры

### Переименование группы

```bash
groupmod -n newname developers
```

### Изменение GID

```bash
groupmod -g 1500 developers
```

### Изменение имени и GID

```bash
groupmod -n newname -g 1500 developers
```

### С неуникальным GID

```bash
groupmod -o -g 1000 developers
```

### С паролем

```bash
groupmod -p $(openssl passwd -1 "newpass") developers
```

### Проверка изменений

```bash
getent group developers
```

### Переименование с логированием

```bash
echo "Renaming group developers to project_x at $(date)" >> /var/log/group_changes.log
groupmod -n project_x developers
```

### Проверка GID

```bash
# Найти текущий GID
getent group developers | cut -d: -f3

# Изменить
groupmod -g 1500 developers

# Проверить
getent group developers
```

### Изменение нескольких групп

```bash
for group in dev ops qa; do
    groupmod -n "team_$group" "$group"
done
```

## Практические сценарии

### Переименование группы проекта

```bash
# 1. Проверить текущее состояние
getent group developers

# 2. Переименовать
groupmod -n project_x developers

# 3. Проверить
getent group project_x

# 4. Обновить конфигурационные файлы
grep -r "developers" /etc/ 2>/dev/null
```

### Изменение GID для миграции

```bash
# 1. Найти текущий GID
old_gid=$(getent group developers | cut -d: -f3)

# 2. Изменить GID
groupmod -g 1500 developers

# 3. Обновить файлы
find / -gid "$old_gid" -exec chgrp developers {} \;
```

:::tip
При переименовании группы не забудьте обновить ссылки на неё в конфигурационных файлах (sudoers, crontab и т.д.).
:::

:::warning
При изменении GID все файлы, принадлежащие старому GID, нужно будет обновить. Используйте `find / -gid old_gid` для их поиска.
:::

### Безопасное изменение GID

```bash
#!/bin/bash
GROUP="developers"
NEW_GID="1500"

# Получить старый GID
OLD_GID=$(getent group "$GROUP" | cut -d: -f3)

# Изменить GID
groupmod -g "$NEW_GID" "$GROUP"

# Обновить файлы
echo "Updating files with old GID $OLD_GID..."
find / -gid "$OLD_GID" -exec chgrp "$GROUP" {} \; 2>/dev/null

echo "Done. Group $GROUP now has GID $NEW_GID"
```

### Проверка зависимостей

```bash
# Проверить пользователей в группе
getent group developers

# Проверить sudoers
grep "developers" /etc/sudoers /etc/sudoers.d/*

# Проверить crontab
crontab -l | grep "developers"
```

## См. также

- `groupadd` — создание группы
- `groupdel` — удаление группы
- `usermod` — изменение пользователя
- `chgrp` — изменение группы файлов
