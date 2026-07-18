# groups

Показывает группы, к которым принадлежит пользователь.

## Синтаксис

```bash
groups [пользователь...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `--help` | Показать помощь |
| `--version` | Показать версию |

## Поля вывода

| Поле | Описание |
|------|----------|
| Имя пользователя | Имя пользователя |
| Список групп | Группы через пробел |

## Типы групп

| Тип | Описание |
|-----|----------|
| Основная (primary) | Группа, указанная в `/etc/passwd` |
| Дополнительные (supplementary) | Группы из `/etc/group` |

## Примеры

### Группы текущего пользователя

```bash
groups
```

### Группы указанного пользователя

```bash
groups alex
```

### Группы нескольких пользователей

```bash
groups alex bob root
```

### Только имена групп

```bash
groups alex | cut -d: -f2
```

### Проверка принадлежности к группе

```bash
groups alex | grep -q "docker" && echo "Alex in docker group"
```

### Все пользователи в группе

```bash
getent group sudo | cut -d: -f4
```

### Список всех групп

```bash
getent group | cut -d: -f1
```

### Проверка, является ли пользователь членом

```bash
if groups alex | grep -q "sudo"; then
    echo "User has sudo access"
fi
```

### Группы в формате списка

```bash
groups alex | tr ' ' '\n' | sort
```

### Проверка нескольких групп

```bash
for group in sudo docker www-data; do
    if groups alex | grep -q "$group"; then
        echo "alex is in $group"
    fi
done
```

## Практические сценарии

### Проверка прав доступа

```bash
# Проверить, может ли пользователь использовать docker
if groups alex | grep -q "docker"; then
    echo "User can use docker"
else
    echo "User needs to be added to docker group"
fi
```

### Аудит групп

```bash
# Показать группы всех пользователей
awk -F: '$7 != "/sbin/nologin" && $7 != "/bin/false" {print $1}' /etc/passwd | while read user; do
    echo "$user: $(groups "$user" | cut -d: -f2)"
done
```

### Проверка перед установкой ПО

```bash
# Проверить, есть ли группа vboxusers
if ! groups alex | grep -q "vboxusers"; then
    echo "Adding alex to vboxusers group"
    usermod -aG vboxusers alex
fi
```

:::tip
Используйте `groups username` для быстрой проверки групп пользователя. Для более подробной информации используйте `id username`.
:::

:::warning
После добавления пользователя в группу нужно перелогиниться, чтобы изменения вступили в силу. Или используйте `newgrp groupname`.
:::

### Сравнение групп двух пользователей

```bash
diff <(groups alex | tr ' ' '\n' | sort) <(groups bob | tr ' ' '\n' | sort)
```

### Проверка, кто в группе sudo

```bash
getent group sudo | cut -d: -f4 | tr ',' '\n'
```

## См. также

- `id` — подробная информация о пользователе
- `usermod` — изменение пользователя
- `groupadd` — создание группы
- `getent` — получение записей из баз данных
