# ufw

**Уровень:** Средний

Uncomplicated Firewall — упрощённый интерфейс для управления iptables/nftables.

## Синтаксис

```bash
ufw COMMAND [ARGUMENTS]
```

## Основные команды

| Команда | Описание |
|---------|----------|
| `enable` | Включить межсетевой экран |
| `disable` | Отключить межсетевой экран |
| `status` | Показать статус и правила |
| `reload` | Перезагрузить правила |
| `reset` | Сбросить все правила |
| `default` | Установить политику по умолчанию |
| `allow` | Разрешить соединение |
| `deny` | Запретить соединение |
| `reject` | Отклонить с ответом |
| `delete` | Удалить правило |
| `app list` | Список профилей приложений |
| `app info` | Информация о профиле |
| `logging` | Управление логированием |

## Опции

| Опция | Описание |
|-------|----------|
| `verbose` | Подробный вывод статуса |
| `numbered` | Нумерация правил (для удаления) |
| `comment` | Комментарий к правилу |
| `proto` | Протокол (tcp, udp) |
| `from` | Источник |
| `to` | Назначение |
| `port` | Порт |

## Примеры

### Включение и отключение

```bash
# Включить firewall
sudo ufw enable

# Отключить firewall
sudo ufw disable

# Проверить статус
sudo ufw status

# Подробный статус
sudo ufw status verbose

# С номерами правил
sudo ufw status numbered
```

### Политики по умолчанию

```bash
# Запретить всё входящее
sudo ufw default deny incoming

# Разрешить всё исходящее
sudo ufw default allow outgoing

# Запретить всё транзитное
sudo ufw default deny forward
```

### Разрешение портов

```bash
# Разрешить порт
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443

# Разрешить диапазон портов
sudo ufw allow 1000:2000/tcp

# Разрешить порт для конкретного протокола
sudo ufw allow 53/udp
sudo ufw allow 53/tcp
```

### Разрешение сервисов

```bash
# По имени сервиса
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# По имени из /etc/services
sudo ufw allow smtp
sudo ufw allow dns
```

### Разрешение по IP

```bash
# С конкретного IP
sudo ufw allow from 192.168.1.100

# С подсети
sudo ufw allow from 192.168.1.0/24

# К конкретному порту
sudo ufw allow from 192.168.1.100 to any port 22

# К конкретному порту по протоколу
sudo ufw allow from 192.168.1.0/24 to any port 80 proto tcp
```

### Запрет правил

```bash
# Запретить порт
sudo ufw deny 23

# Запретить с IP
sudo ufw deny from 10.0.0.5

# Запретить доступ к порту
sudo ufw deny from 10.0.0.5 to any port 80
```

### Удаление правил

```bash
# Удалить по номеру
sudo ufw status numbered
sudo ufw delete 3

# Удалить по описанию
sudo ufw delete allow 80
sudo ufw delete deny from 10.0.0.5

# Удалить правило по имени
sudo ufw delete allow ssh
```

### Профили приложений

```bash
# Список профилей
sudo ufw app list

# Информация о профиле
sudo ufw app info 'Nginx Full'

# Разрешить профиль
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'

# Кастомный профиль
sudo ufw app info 'My App'
```

### Логирование

```bash
# Включить логирование
sudo ufw logging on

# Отключить логирование
sudo ufw logging off

# Уровень логирования
sudo ufw logging low
sudo ufw logging medium
sudo ufw logging high
sudo ufw logging full
```

### Rate limiting

```bash
# Ограничить SSH (6 попыток за 30 секунд)
sudo ufw limit ssh
sudo ufw limit 22/tcp

# Аналогично для других сервисов
sudo ufw limit 80/tcp
```

## Практические сценарии

### Базовая настройка сервера

```bash
# Сбросить правила
sudo ufw reset

# Политики по умолчанию
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Разрешить SSH
sudo ufw allow ssh

# Разрешить HTTP/HTTPS
sudo ufw allow http
sudo ufw allow https

# Включить
sudo ufw enable

# Проверить
sudo ufw status verbose
```

### Веб-сервер

```bash
# Сбросить
sudo ufw reset

# Политики
sudo ufw default deny incoming
sudo ufw default allow outgoing

# SSH (ограничить попытки)
sudo ufw limit ssh

# Веб-сервер
sudo ufw allow 'Nginx Full'

# Включить
sudo ufw enable
```

### Доступ только из локальной сети

```bash
# Запретить всё
sudo ufw default deny incoming

# Разрешить только из локальной сети
sudo ufw allow from 192.168.1.0/24

# Или для конкретных сервисов
sudo ufw allow from 192.168.1.0/24 to any port 22
sudo ufw allow from 192.168.1.0/24 to any port 80
```

### Мониторинг

```bash
# Проверить, что блокируется
sudo ufw status verbose

# Логи
sudo ufw logging medium
journalctl -f | grep UFW
```

## Конфигурационные файлы

| Файл | Описание |
|------|----------|
| `/etc/ufw/ufw.conf` | Основная конфигурация |
| `/etc/ufw/user.rules` | Пользовательские правила IPv4 |
| `/etc/ufw/user6.rules` | Пользовательские правила IPv6 |
| `/etc/ufw/applications.d/` | Профили приложений |

:::tip Порядок действий
Всегда сначала настройте правила SSH, затем включайте firewall. Иначе вы можете заблокировать доступ к серверу.
:::

:::warning Проверка перед включением
Перед `ufw enable` проверьте, что SSH разрешён: `sudo ufw allow ssh`. Это предотвратит блокировку удалённого доступа.
:::

:::tip Простота
UFW идеален для простых случаев. Для сложных конфигураций (NAT, множественные зоны) используйте iptables/nftables или firewalld.
:::

:::warning IPv6
UFW автоматически применяет правила к IPv6. Убедитесь, что IPv6 отключён, если не используете его, или настройте правила отдельно.
## См. также

- [iptables](iptables.md) — классический файрвол
- [nftables](nftables.md) — современный файрвол

:::
