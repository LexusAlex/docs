# groupadd

**Уровень:** Средний

Создание новой группы в системе.

## Синтаксис

```bash
groupadd [опции] имя_группы
```

## Опции

| Опция | Описание |
|-------|----------|
| `-g GID` | Указать GID |
| `-r` | Создать системную группу |
| `-f` | Принудительное создание |
| `-K ключ=значение` | Переопределить параметры из /etc/login.defs |
| `-o` | Разрешить неуникальный GID |
| `-p пароль` | Зашифрованный пароль группы |
| `--system` | Создать системную группу (альтернатива -r) |

## Конфигурационные файлы

| Файл | Описание |
|------|----------|
| `/etc/group` | Информация о группах |
| `/etc/gshadow` | Защищённая информация о группах |
| `/etc/login.defs` | Параметры по умолчанию |

## Формат /etc/group

```
имя_группы:пароль:GID:список_членов
```

## Примеры

### Создание простой группы

```bash
groupadd developers
```

### С определённым GID

```bash
groupadd -g 1500 developers
```

### Системная группа

```bash
groupadd -r myservice
```

### Принудительное создание

```bash
groupadd -f developers
```

### С паролем

```bash
groupadd -p $(openssl passwd -1 "grouppass") developers
```

### С неуникальным GID

```bash
groupadd -o -g 1000 developers
```

### Системная группа (альтернатива)

```bash
groupadd --system myservice
```

### Проверка создания

```bash
grep developers /etc/group
```

### Создание нескольких групп

```bash
for group in dev ops qa; do
    groupadd "$group"
done
```

### Проверка GID

```bash
getent group developers
```

### Создание с логированием

```bash
echo "Creating group developers at $(date)" >> /var/log/group_changes.log
groupadd developers
```

### С кастомными параметрами

```bash
groupadd -K GID_MIN=1000 -K GID_MAX=2000 developers
```

## Практические сценарии

### Создание группы для проекта

```bash
# Создание группы
groupadd -g 1500 project_x

# Добавление пользователей
usermod -aG project_x alex
usermod -aG project_x bob

# Проверка
getent group project_x
```

### Создание системных групп для сервисов

```bash
groupadd -r myapp
useradd -r -g myapp -s /usr/sbin/nologin myapp
```

### Миграция с другой системы

```bash
# Создание с тем же GID
groupadd -g 1001 migrated_group
```

:::tip
Используйте `getent group имя_группы` для проверки создания группы. Это работает с локальными и сетевыми группами.
:::

:::warning
Не создавайте группы с GID ниже 1000 для обычных пользователей. Эти GID зарезервированы для системных групп.
:::

## См. также

- [groupdel](groupdel.md) — удаление группы
- [groupmod](groupmod.md) — изменение группы
- [useradd](useradd.md) — создание пользователя
- [gpasswd](gpasswd.md) — управление группой
