# userdel

**Уровень:** Средний

Удаление пользователя из системы.

## Синтаксис

```bash
userdel [опции] имя_пользователя
```

## Опции

| Опция | Описание |
|-------|----------|
| `-r` | Удалить домашний каталог и почтовый ящик |
| `-f` | Принудительное удаление |
| `-Z` | Удалить контекст SELinux |
| `-h` | Помощь |

## Конфигурационные файлы

| Файл | Описание |
|------|----------|
| `/etc/passwd` | Информация о пользователях |
| `/etc/shadow` | Зашифрованные пароли |
| `/etc/group` | Информация о группах |
| `/var/mail/` | Почтовые ящики |

## Примеры

### Простое удаление пользователя

```bash
userdel alex
```

### Удаление с домашним каталогом

```bash
userdel -r alex
```

### Принудительное удаление

```bash
userdel -f alex
```

### Удаление с удалением почты

```bash
userdel -r alex
# Удаляет /home/alex и /var/mail/alex
```

### Проверка перед удалением

```bash
# Проверить, залогинен ли пользователь
who | grep alex

# Проверить процессы пользователя
ps -u alex
```

### Удаление заблокированного пользователя

```bash
userdel -f alex
```

### Удаление с контекстом SELinux

```bash
userdel -r -Z alex
```

### Проверка после удаления

```bash
id alex
# id: 'alex': no such user
```

### Удаление нескольких пользователей

```bash
for user in alex bob charlie; do
    userdel -r "$user"
done
```

### Проверка домашнего каталога

```bash
ls -la /home/ | grep alex
```

### Удаление с логированием

```bash
echo "Deleting user alex at $(date)" >> /var/log/user_changes.log
userdel -r alex
```

### Проверка UID

```bash
grep "1001" /etc/passwd
# Убедиться, что UID не используется
```

## Практические сценарии

### Безопасное удаление пользователя

```bash
# 1. Проверить, залогинен ли пользователь
if who | grep -q "^alex "; then
    echo "User is logged in. Kick them first."
    exit 1
fi

# 2. Убить процессы пользователя
pkill -u alex

# 3. Удалить пользователя
userdel -r alex

# 4. Проверить удаление
id alex || echo "User deleted successfully"
```

### Архивирование перед удалением

```bash
# Создать резервную копию
tar czf /backup/alex_home_$(date +%Y%m%d).tar.gz /home/alex/

# Удалить пользователя
userdel -r alex
```

:::tip
Всегда проверяйте, не запущены ли процессы пользователя перед удалением. Используйте `pkill -u username` для их завершения.
:::

:::warning
Удаление пользователя не удаляет файлы, принадлежащие ему в других каталогах. Используйте `find / -user alex` для их поиска.
:::

### Очистка файлов пользователя

```bash
# Найти файлы пользователя в других каталогах
find / -user alex -type f 2>/dev/null

# Изменить владельца
find / -user alex -exec chown root:root {} \;
```

### Удаление из групп

```bash
# Проверить группы пользователя
groups alex

# Удалить из дополнительных групп
for group in $(groups alex | cut -d: -f2); do
    gpasswd -d alex "$group"
done
```

## См. также

- [useradd](useradd.md) — создание пользователя
- [usermod](usermod.md) — изменение пользователя
- [passwd](passwd.md) — управление паролями
- [groupdel](groupdel.md) — удаление группы
