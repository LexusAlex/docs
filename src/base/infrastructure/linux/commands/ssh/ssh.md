# ssh

Клиент для безопасного подключения к удалённым серверам по протоколу SSH (Secure Shell).

## Синтаксис

```bash
ssh [опции] [user@]host [команда]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-p порт` | Указать порт |
| `-i файл` | Файл приватного ключа |
| `-v` | Подробный вывод (отладка) |
| `-A` | Пересылка SSH-агента |
| `-X` | Пересылка X11 (графика) |
| `-Y` | Доверенная пересылка X11 |
| `-L [б.:]порт:хост:порт` | Локальный проброс порта |
| `-R [б.:]порт:хост:порт` | Удалённый проброс порта |
| `-D порт` | Динамический прокси (SOCKS) |
| `-N` | Не выполнять удалённую команду |
| `-f` | Фоновый режим |
| `-T` | Отключить выделение псевдо-терминала |
| `-t` | Принудительно выделить псевдо-терминал |
| `-C` | Сжатие данных |
| `-o опция` | Дополнительные параметры |
| `-J прокси` | Jump host |
| `-W хост:порт` | Проброс stdin/stdout |
| `-q` | Тихий режим |

## Основные подключения

### Подключение к серверу

```bash
ssh user@192.168.1.100
```

### Подключение на нестандартном порту

```bash
ssh -p 2222 user@server.example.com
```

### Подключение с указанием ключа

```bash
ssh -i ~/.ssh/my_key user@host
```

### Выполнение команды на сервере

```bash
ssh user@host "df -h && free -m"
```

### Подключение с отладкой

```bash
ssh -v user@host
```

### Максимальная отладка

```bash
ssh -vvv user@host
```

## Проброс портов

### Локальный проброс (Local Forwarding)

Проброс удалённого порта на локальную машину:

```bash
ssh -L 8080:localhost:80 user@server
```

Теперь `localhost:8080` → `server:80`.

### Проброс MySQL

```bash
ssh -L 3306:db-server:3306 user@bastion
```

### Удалённый проброс (Remote Forwarding)

Проброс локального порта на удалённый сервер:

```bash
ssh -R 9090:localhost:3000 user@server
```

### Динамический прокси (SOCKS5)

```bash
ssh -D 1080 -N -f user@server
```

Использование: настроить браузер на SOCKS5-прокси `localhost:1080`.

## Jump Host (ProxyJump)

### Через промежуточный сервер

```bash
ssh -J jump@bastion internal@10.0.0.5
```

### Цепочка промежуточных серверов

```bash
ssh -J jump1@host1,jump2@host2 user@target
```

## Примеры

### Запуск графического приложения

```bash
ssh -X user@host firefox
```

### Копирование файлов через SSH-туннель

```bash
ssh -N -L 2222:localhost:22 user@remote
# В другом терминале:
scp -P 2222 file.txt user@localhost:/tmp/
```

### Подключение без проверки ключа хоста

```bash
ssh -o StrictHostKeyChecking=no user@new-server
```

### Установка таймаута

```bash
ssh -o ServerAliveInterval=60 -o ServerAliveCountMax=3 user@host
```

### Запуск команды с sudo

```bash
ssh -t user@host "sudo systemctl restart nginx"
```

### Проброс агента

```bash
ssh -A user@bastion
```

### Фоновое подключение

```bash
ssh -fN -L 8080:localhost:80 user@server
```

### Подключение через прокси

```bash
ssh -o ProxyCommand="nc -X connect -x proxy:8080 %h %p" user@host
```

## Конфигурация ~/.ssh/config

Файл `~/.ssh/config` позволяет настроить подключения:

```ssh-config
# ~/.ssh/config

# Глобальные настройки
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_ed25519

# Рабочий сервер
Host work
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/work_key

# Через jump host
Host internal
    HostName 10.0.0.5
    User developer
    ProxyJump jump@bastion.example.com

# Туннель для базы данных
Host db-tunnel
    HostName db-server.example.com
    User dbadmin
    LocalForward 5432 localhost:5432
    RequestTTY no
    RemoteCommand sleep infinity

# Домашний сервер
Host home
    HostName home.example.com
    User alex
    DynamicForward 1080
```

Использование алиасов:

```bash
ssh work
ssh internal
ssh -N db-tunnel
```

## Практические сценарии

### Доступ к удалённой базе данных

```bash
# Проброс PostgreSQL через bastion
ssh -L 5432:db-internal:5432 -N -f user@bastion
psql -h localhost -U myuser -d mydb
```

### Безопасный доступ к веб-панели

```bash
ssh -L 8443:10.0.0.10:443 -N -f user@bastion
# Открыть https://localhost:8443
```

### Резервное копирование через SSH

```bash
ssh user@server "pg_dump mydb" > backup.sql
```

### Мониторинг удалённого сервера

```bash
ssh user@host "top -b -n 1 | head -20"
```

### Перезапуск сервиса

```bash
ssh -t user@host "sudo systemctl restart apache2"
```

## Мультиплексирование соединений

Создание файла конфигурации для ускорения подключений:

```ssh-config
# ~/.ssh/config
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

Создайте директорию для сокетов:

```bash
mkdir -p ~/.ssh/sockets
```

Первое подключение создаёт соединение, последующие — переиспользуют его.

:::tip Совет
Используйте `-N` с `-f` для туннелей, которые не требуют удалённой оболочки: `ssh -fN -L 8080:localhost:80 user@server`.
:::

:::warning Внимание
Избегайте `StrictHostKeyChecking=no` в продакшене — это отключает проверку подлинности сервера и уязвимо для MITM-атак.
:::

:::tip Совет
Добавьте `AddKeysToAgent yes` в `~/.ssh/config`, чтобы ключи автоматически добавлялись в ssh-agent при первом использовании.
:::

## Связки с другими командами

```bash
# Топ 5 процессов по CPU на удалённом сервере
ssh user@host 'ps aux | sort -k3 -rn | head -5'

# Диски с заполнением >80% на удалённом сервере
ssh user@host 'df -h | awk "NR>1 && gsub(/%/,\"\",\$5) && \$5>80"'

# Использование памяти на удалённом сервере
ssh user@host 'free -m | awk "/Mem:/{printf \"%.1f%%\", \$3/\$2*100}"'

# Последние 5 входов на удалённый сервер
ssh user@host 'last -5'

# Проверка порта 80 на удалённом сервере
ssh user@host 'ss -tlnp | grep :80'

# Интерактивный htop на удалённом сервере
ssh -t user@host 'htop'

# Следить за логами на удалённом сервере, фильтруя ошибки
ssh user@host 'tail -f /var/log/syslog' | grep error

# Версия ОС на удалённом сервере
ssh user@host 'cat /etc/os-release | grep PRETTY'

# Средняя загрузка удалённого сервера
ssh user@host 'uptime' | awk -F'load average:' '{print $2}'

# Проверка статуса nginx на удалённом сервере
ssh user@host 'sudo systemctl status nginx'
```
