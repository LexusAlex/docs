# id

**Уровень:** Начинающий

Показывает информацию о пользователе и его группах.

## Синтаксис

```bash
id [опции] [пользователь]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-u` | Показать только UID |
| `-g` | Показать только GID основной группы |
| `-G` | Показать все GID |
| `-n` | Показать имена вместо чисел |
| `-r` | Показать реальный ID вместо эффективного |
| `-Z` | Показать контекст безопасности |
| `-z` | Разделитель NUL |
| `--help` | Помощь |
| `--version` | Версия |

## Поля вывода

| Поле | Описание |
|------|----------|
| `uid` | ID пользователя |
| `gid` | ID основной группы |
| `groups` | Все группы с ID |

## Примеры

### Информация о текущем пользователе

```bash
id
```

### Информация о указанном пользователе

```bash
id alex
```

### Только UID

```bash
id -u
```

### Только имя пользователя

```bash
id -un
```

### Только GID

```bash
id -g
```

### Имя основной группы

```bash
id -gn
```

### Все группы (GID)

```bash
id -G
```

### Все группы (имена)

```bash
id -Gn
```

### Реальный UID

```bash
id -ur
```

### Эффективный UID

```bash
id -u
```

### Контекст SELinux

```bash
id -Z
```

### Проверка существования пользователя

```bash
if id alex &>/dev/null; then
    echo "User exists"
else
    echo "User does not exist"
fi
```

### Сравнение пользователей

```bash
echo "Current user: $(id -un)"
echo "Target user: $(id -un alex)"
```

### Проверка root

```bash
if [ "$(id -u)" -eq 0 ]; then
    echo "Running as root"
fi
```

## Практические сценарии

### Проверка, является ли пользователь root

```bash
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi
```

### Проверка членства в группе

```bash
if id -nG alex | grep -qw "docker"; then
    echo "alex is in docker group"
fi
```

### Проверка существования пользователя

```bash
if ! id alex &>/dev/null; then
    echo "User alex does not exist"
    useradd -m alex
fi
```

:::tip
Используйте `id -u` для получения UID в скриптах. Значение 0 означает root.
:::

:::warning
Эффективный и реальный ID могут различаться при использовании `setuid` или `sudo`. Используйте `-r` для получения реального ID.
:::

### Проверка эффективного и реального ID

```bash
echo "Real UID: $(id -ur)"
echo "Effective UID: $(id -u)"
echo "Real GID: $(id -gr)"
echo "Effective GID: $(id -g)"
```

### Список всех пользователей и их UID

```bash
awk -F: '{print $1, $3}' /etc/passwd
```

### Проверка, кто запустил скрипт

```bash
echo "Script running as: $(id -un) (UID: $(id -u))"
```

## См. также

- [groups](groups.md) — группы пользователя
- [whoami](whoami.md) — имя текущего пользователя
- [who](who.md) — кто залогинен
- [/etc/passwd](/etc/passwd.md) — информация о пользователях
