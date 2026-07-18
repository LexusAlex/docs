# ssh-agent

**Уровень:** Средний

Программа-агент для управления SSH-ключами в памяти. Позволяет кешировать парольные фразы ключей, чтобы не вводить их при каждом подключении.

## Синтаксис

```bash
eval $(ssh-agent [опции])
ssh-add [опции] [файл]
```

## Опции ssh-agent

| Опция | Описание |
|-------|----------|
| `-a сокет` | Путь к сокету агента |
| `-k` | Завершить агент |
| `-s` | Вывести команды Bourne shell |
| `-c` | Вывести команды C-shell |

## Опции ssh-add

| Опция | Описание |
|-------|----------|
| `-l` | Список загруженных ключей |
| `-L` | Список публичных ключей |
| `-D` | Удалить все ключи из агента |
| `-d файл` | Удалить конкретный ключ |
| `-x` | Заблокировать агент паролем |
| `-X` | Разблокировать агент |
| `-t секунды` | Время жизни ключа |
| `-K` | Сохранить пароль в keychain (macOS) |
| `файл` | Добавить ключ из файла |

## Основное использование

### Запуск агента

```bash
eval $(ssh-agent)
```

### Добавление ключа по умолчанию

```bash
ssh-add
```

### Добавление конкретного ключа

```bash
ssh-add ~/.ssh/id_ed25519
```

### Добавление с таймаутом (удалить через 1 час)

```bash
ssh-add -t 3600 ~/.ssh/id_ed25519
```

### Список загруженных ключей

```bash
ssh-add -l
```

### Показ публичных ключей

```bash
ssh-add -L
```

### Удаление всех ключей

```bash
ssh-add -D
```

### Удаление конкретного ключа

```bash
ssh-add -d ~/.ssh/id_ed25519
```

### Блокировка агента

```bash
ssh-add -x
```

### Разблокировка агента

```bash
ssh-add -X
```

## Примеры

### Запуск агента и добавление ключа

```bash
eval $(ssh-agent)
ssh-add ~/.ssh/id_ed25519
```

### Проверка работы агента

```bash
eval $(ssh-agent)
ssh-add -l
# Должно показать загруженные ключи
```

### Добавление нескольких ключей

```bash
ssh-add ~/.ssh/id_ed25519 ~/.ssh/id_rsa ~/.ssh/work_key
```

### Добавление всех ключей из ~/.ssh

```bash
ssh-add $(ls ~/.ssh/id_* 2>/dev/null | grep -v '.pub')
```

### Остановка агента

```bash
eval $(ssh-agent -k)
```

### Добавление ключа с ограничением времени

```bash
ssh-add -t 3600 ~/.ssh/id_ed25519
# Ключ будет удалён из агента через 1 час
```

### Использование с tmux

```bash
# В ~/.tmux.conf
set -g update-environment -r
set-environment -g SSH_AUTH_SOCK ~/.ssh/ssh_auth_sock
```

## Практические сценарии

### Автоматический запуск агента в ~/.bashrc

```bash
# Добавить в ~/.bashrc
if [ -z "$SSH_AUTH_SOCK" ]; then
    eval $(ssh-agent -s)
    ssh-add ~/.ssh/id_ed25519 2>/dev/null
fi
```

### Использование с Keychain (рекомендуется)

Установка keychain:

```bash
# Ubuntu/Debian
sudo apt install keychain

# CentOS/RHEL
sudo yum install keychain
```

Добавить в `~/.bashrc`:

```bash
# ~/.bashrc
eval $(keychain --eval --agents ssh id_ed25519 id_rsa)
```

Keychain:
- Запускает ssh-agent, если он не запущен
- Переиспользует существующий агент
- Сохраняет ключи между сессиями терминала

### Использование с GNOME Keyring

В дистрибутивах с GNOME агент запускается автоматически. Проверка:

```bash
echo $SSH_AUTH_SOCK
# Должен быть путь к сокету
```

### Настройка агента для tmux/screen

```bash
# Создать symlink для стабильного пути
ln -sf "$SSH_AUTH_SOCK" ~/.ssh/ssh_auth_sock

# Добавить в ~/.bashrc
export SSH_AUTH_SOCK=~/.ssh/ssh_auth_sock
```

### Мониторинг агента

```bash
# Проверить, запущен ли агент
ssh-add -l 2>/dev/null
if [ $? -eq 0 ]; then
    echo "Агент работает, ключи загружены"
else
    echo "Агент не запущен или ключи не загружены"
fi
```

## Проброс агента (Agent Forwarding)

### Подключение с пробросом агента

```bash
ssh -A user@bastion
```

### Настройка в ~/.ssh/config

```ssh-config
Host bastion
    HostName bastion.example.com
    User admin
    ForwardAgent yes
```

### Проверка проброса на bastion

```bash
ssh -A user@bastion
ssh-add -l  # Должны отобразиться ключи с локальной машины
```

:::warning Внимание
Используйте проброс агента (`-A`) только к доверенным серверам. На промежуточном сервере злоумышленник с root-доступом может использовать ваши загруженные ключи.
:::

:::tip Совет
Используйте `keychain` вместо ручного запуска `ssh-agent` — он автоматически управляет агентом и переиспользует существующие сессии.
:::

:::tip Совет
Установите таймаут для ключей: `ssh-add -t 3600` — ключ будет автоматически удалён из агента через час.
## См. также

- [ssh-keygen](ssh-keygen.md) — генерация ключей
- [ssh](ssh.md) — подключение

:::

## Диагностика

### Проверка переменных окружения

```bash
echo $SSH_AUTH_SOCK
echo $SSH_AGENT_PID
```

### Проверка работы агента

```bash
ssh-add -l
# Если агент не запущен:
# Could not open a connection to your authentication agent.
```

### Перезапуск агента

```bash
eval $(ssh-agent -k)  # Остановить
eval $(ssh-agent)     # Запустить заново
ssh-add               # Добавить ключи
```
