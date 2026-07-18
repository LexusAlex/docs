# sudo

Выполнение команд от имени другого пользователя (по умолчанию root).

## Синтаксис

```bash
sudo [опции] команда
```

## Опции

| Опция | Описание |
|-------|----------|
| `-u пользователь` | Выполнить от имени пользователя |
| `-i` | Полный вход (login shell) |
| `-s` | Запустить оболочку |
| `-l` | Показать привилегии |
| `-v` | Обновить timestamp |
| `-k` | Сбросить timestamp |
| `-K` | Полностью удалить timestamp |
| `-b` | Запустить в фоне |
| `-e` | Редактировать файл |
| `-H` | Установить HOME |
| `-n` | Не запрашивать пароль |
| `-S` | Читать пароль из stdin |
| `-p промпт` | Кастомный промпт |
| `--preserve-env` | Сохранить окружение |

## Конфигурационные файлы

| Файл | Описание |
|------|----------|
| `/etc/sudoers` | Основной файл конфигурации |
| `/etc/sudoers.d/` | Дополнительные файлы |
| `/var/log/auth.log` | Лог действий sudo |

## Формат /etc/sudoers

```
# Пользователь    Хост=(Целевой_пользователь) Команды
alex    ALL=(ALL:ALL) ALL
%group  ALL=(ALL) NOPASSWD: ALL
```

## Примеры

### Команда от root

```bash
sudo apt update
```

### От имени другого пользователя

```bash
sudo -u www-data cat /var/www/html/index.html
```

### Полный вход как root

```bash
sudo -i
```

### Запуск оболочки

```bash
sudo -s
```

### Показать привилегии

```bash
sudo -l
```

### Обновить timestamp

```bash
sudo -v
```

### Сбросить timestamp

```bash
sudo -k
```

### Запуск в фоне

```bash
sudo -b updatedb
```

### Редактирование файла

```bash
sudo -e /etc/ssh/sshd_config
```

### Сохранить окружение

```bash
sudo --preserve-env env
```

### Без запроса пароля

```bash
sudo -n true
```

### Кастомный промпт

```bash
sudo -p "Password for %u: " whoami
```

### Выполнить несколько команд

```bash
sudo bash -c "apt update && apt upgrade -y"
```

### Проверка конфигурации

```bash
sudo -l
```

### Редактирование sudoers

```bash
sudo visudo
```

## Практические сценарии

### Настройка NOPASSWD

```bash
# Добавить в /etc/sudoers.d/alex
echo "alex ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/alex
sudo chmod 440 /etc/sudoers.d/alex
```

### Ограничение команд

```bash
# Разрешить только apt
alex ALL=(ALL) /usr/bin/apt
```

### Проверка привилегий

```bash
if sudo -l | grep -q "ALL"; then
    echo "User has full sudo access"
fi
```

:::tip
Всегда используйте `visudo` для редактирования `/etc/sudoers`. Он проверяет синтаксис перед сохранением.
:::

:::warning
Не давайте полный доступ sudo (`ALL=(ALL) ALL`) без необходимости. Ограничивайте конкретными командами.
:::

### Алиасы команд

```bash
# В /etc/sudoers
Cmnd_Alias RESTART_SERVICES = /usr/bin/systemctl restart nginx, /usr/bin/systemctl restart apache2
alex ALL=(ALL) RESTART_SERVICES
```

### Логирование sudo

```bash
# Проверить лог
grep "sudo:" /var/log/auth.log

# Или
journalctl | grep "sudo"
```

## См. также

- `su` — переключение пользователя
- `visudo` — редактирование sudoers
- `sudoers` — формат файла
- `/var/log/auth.log` — лог аутентификации
