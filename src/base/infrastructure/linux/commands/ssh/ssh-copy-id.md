# ssh-copy-id

**Уровень:** Средний

Утилита для копирования публичного SSH-ключа на удалённый сервер в файл `~/.ssh/authorized_keys`.

## Синтаксис

```bash
ssh-copy-id [опции] [user@]host
```

## Опции

| Опция | Описание |
|-------|----------|
| `-i файл` | Указать публичный ключ для копирования |
| `-p порт` | Использовать нестандартный порт |
| `-f` | Принудительно (не проверять authorized_keys) |
| `-n` | Пробный запуск (dry run) |
| `-o опция` | Дополнительные SSH-опции |
| `-s` | Использовать sftp вместо ssh |

## Примеры

### Копирование ключа по умолчанию

```bash
ssh-copy-id user@server
```

### Копирование конкретного ключа

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server
```

### Копирование на нестандартный порт

```bash
ssh-copy-id -p 2222 user@server
```

### Копирование с указанием файла и порта

```bash
ssh-copy-id -i ~/.ssh/my_key.pub -p 2222 user@server
```

### Пробный запуск (показать что будет сделано)

```bash
ssh-copy-id -n user@server
```

### Принудительное копирование

```bash
ssh-copy-id -f user@server
```

### Копирование с дополнительными опциями

```bash
ssh-copy-id -o "StrictHostKeyChecking=no" user@new-server
```

### Копирование через sftp

```bash
ssh-copy-id -s user@server
```

### Копирование ключа для нескольких серверов

```bash
for host in server1 server2 server3; do
    ssh-copy-id -i ~/.ssh/id_ed25519.pub user@$host
done
```

### Копирование с нестандартным ключом на нестандартный порт

```bash
ssh-copy-id -i ~/.ssh/deploy_key.pub -p 2222 deploy@production
```

### Проверка после копирования

```bash
ssh-copy-id user@server && ssh user@server "echo 'Подключение работает!'"
```

## Практические сценарии

### Первоначальная настройка сервера

```bash
# Сгенерировать ключ (если нет)
ssh-keygen -t ed25519

# Скопировать на сервер
ssh-copy-id user@new-server

# Подключиться без пароля
ssh user@new-server
```

### Настройка доступа для Ansible

```bash
# Генерация ключа для Ansible
ssh-keygen -t ed25519 -f ~/.ssh/ansible_key -N ""

# Копирование на все серверы
for host in web1 web2 db1 db2; do
    ssh-copy-id -i ~/.ssh/ansible_key.pub ansible@$host
done
```

### Замена устаревшего ключа

```bash
# Новый ключ
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_new

# Копирование на серверы
for host in $(cat servers.txt); do
    ssh-copy-id -i ~/.ssh/id_ed25519_new.pub user@$host
done
```

### Настройка доступа без ввода пароля

```bash
# Шаг 1: Создание ключа
ssh-keygen -t ed25519 -C "automation"

# Шаг 2: Копирование ключа
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server

# Шаг 3: Проверка
ssh user@server "hostname"
```

## Альтернатива: ручное копирование

Если `ssh-copy-id` недоступен:

### Вариант 1: Через cat и ssh

```bash
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### Вариант 2: Через scp

```bash
scp ~/.ssh/id_ed25519.pub user@server:/tmp/key.pub
ssh user@server "cat /tmp/key.pub >> ~/.ssh/authorized_keys && rm /tmp/key.pub"
```

### Вариант 3: Вручную

```bash
# Скопировать содержимое ключа
cat ~/.ssh/id_ed25519.pub

# Подключиться к серверу
ssh user@server

# На сервере:
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "вставьте_ключ_здесь" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## Устранение неполадок

### Ошибка: Permission denied

```bash
# Проверить права на сервере
ssh user@server "ls -la ~/.ssh/"
# Должно быть:
# drwx------  ~/.ssh
# -rw-------  authorized_keys
```

### Ошибка: Connection refused

```bash
# Проверить порт
ssh -p 22 user@server

# Указать порт при копировании
ssh-copy-id -p 2222 user@server
```

### Ошибка: Host key verification failed

```bash
# Удалить старый ключ хоста
ssh-keygen -R server

# Повторить попытку
ssh-copy-id user@server
```

:::tip Совет
Перед копированием ключа проверьте, что на сервере включена аутентификация по ключам в `/etc/ssh/sshd_config`:
```
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```
:::

:::warning Внимание
После копирования ключа и проверки подключения без пароля, рассмотрите отключение аутентификации по паролю в `/etc/ssh/sshd_config`:
```
PasswordAuthentication no
```
:::

:::tip Совет
Используйте `ssh-copy-id -n` для проверки, что будет сделано, прежде чем фактически копировать ключ на продакшен-сервер.
## См. также

- [ssh](ssh.md) — подключение
- [ssh-keygen](ssh-keygen.md) — генерация ключей

:::
