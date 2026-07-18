# Команды по задачам

Альтернативный справочник: команды organized по сценариям использования, а не по категориям.

## Мониторинг и диагностика

### Что происходит в системе?
- `top` / `htop` — процессы в реальном времени
- `ps aux` — список всех процессов
- `free -h` — использование памяти
- `uptime` — загрузка CPU (load average)
- `vmstat 1 5` — статистика CPU/памяти/IO

### Что ест диск?
- `df -h` — место на дисках
- `du -sh * | sort -rh` — размер папок
- `find / -type f -size +100M` — большие файлы
- `lsof +D /path` — открытые файлы в директории

### Что ест сеть?
- `ss -tlnp` — слушающие порты
- `ss -tn state established | wc -l` — активные соединения
- `iftop` / `nload` — трафик в реальном времени
- `tcpdump -i eth0` — захват пакетов

### Что упало?
- `systemctl --failed` — упавшие службы
- `journalctl -p err --since "1 hour ago"` — ошибки за час
- `dmesg | tail -20` — сообщения ядра

## Поиск и фильтрация

### Найти файл
- `find / -name "filename"` — по имени
- `locate filename` — по базе (быстро)
- `find . -name "*.log" -mtime +30` — старые логи

### Найти в файлах
- `grep -r "text" /path/` — рекурсивный поиск
- `grep -rn "TODO" --include="*.py"` — в Python-файлах
- `grep -rl "password" /etc/` — только имена файлов

### Найти команду
- `which python3` — путь к команде
- `whereis nginx` — бинарник + man + исходники
- `type cd` — тип команды (builtin/file)

## Безопасность

### Кто в системе?
- `who` — текущие пользователи
- `last -10` — последние входы
- `lastb` — неудачные попытки (нужен root)

### Кто что делает?
- `ps aux | grep username` — процессы пользователя
- `lsof -u username` — открытые файлы пользователя
- `w` — кто вошёл и что делает

### Права доступа
- `chmod 755 file` — изменить права
- `chown user:group file` — изменить владельца
- `ls -la` — посмотреть права

### Файрвол
- `ufw status` — статус (Ubuntu)
- `iptables -L -n` — правила
- `ss -tlnp` — открытые порты

## Сеть

### Проверить связь
- `ping -c 3 host` — проверить доступность
- `traceroute host` — маршрут
- `mtr host` — непрерывная трассировка

### DNS
- `dig domain.com` — DNS-запрос
- `dig +short domain.com` — только IP
- `dig -x IP` — обратный DNS

### HTTP
- `curl -sI https://example.com` — заголовки
- `curl -s url | jq` — JSON-ответ
- `wget -c url` — скачать файл (продолжить)

### Сканирование
- `nmap -sT 192.168.1.1` — сканирование портов
- `nmap -sn 192.168.1.0/24` — кто в сети
- `ss -tlnp` — локальные слушающие порты

## Архивы и бэкапы

### Создать архив
- `tar -czf archive.tar.gz /path/` — tar.gz
- `tar -cjf archive.tar.bz2 /path/` — tar.bz2
- `tar -cJf archive.tar.xz /path/` — tar.xz
- `zip -r archive.zip /path/` — zip

### Распаковать
- `tar -xzf archive.tar.gz` — tar.gz
- `tar -xjf archive.tar.bz2` — tar.bz2
- `unzip archive.zip` — zip

### Синхронизация
- `rsync -avz src/ dest/` — локальная синхронизация
- `rsync -avz src/ user@host:/dest/` — удалённая
- `scp file user@host:/path/` — копирование по SSH

## Планирование

### Запланировать задачу
- `crontab -e` — cron (повторяющаяся)
- `at now + 30 minutes` — одноразовая
- `systemd-run --on-calendar="*-*-* 03:00:00"` — systemd-timer

### Запустить в фоне
- `nohup ./script.sh &` — игнорировать SIGHUP
- `tmux` / `screen` — терминальный мультиплексор
- `disown` — отвязать от текущей сессии

## Пакеты

### Debian/Ubuntu
- `apt update && apt upgrade` — обновить всё
- `apt install pkg` — установить
- `apt remove pkg` — удалить
- `apt search keyword` — найти

### RHEL/Fedora
- `dnf update` — обновить
- `dnf install pkg` — установить
- `dnf remove pkg` — удалить

## systemd

### Управление службами
- `systemctl start/stop/restart nginx` — управление
- `systemctl enable/disable nginx` — автозапуск
- `systemctl status nginx` — статус

### Логи
- `journalctl -u nginx -f` — следить за логом
- `journalctl -u nginx --since today` — логи за сегодня
- `journalctl -p err` — только ошибки
