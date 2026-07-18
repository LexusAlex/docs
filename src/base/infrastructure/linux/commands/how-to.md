# Как сделать...

Страница-навигатор: задача → команда → пример. Если вы не знаете, какую команду использовать, начните отсюда.

## Файлы и директории

| Задача | Команда | Пример |
|--------|---------|--------|
| Найти файл по имени | `find` | `find / -name "config.yml"` |
| Найти файл по содержимому | `grep` | `grep -r "password" /etc/` |
| Посмотреть размер папок | `du` | `du -sh * \| sort -rh` |
| Посмотреть место на диске | `df` | `df -h` |
| Сравнить два файла | `diff` | `diff file1 file2` |
| Создать файл | `touch` | `touch newfile.txt` |
| Копировать с правами | `install` | `install -m 755 script.sh /usr/local/bin/` |
| Перезаписать и удалить файл на обычном HDD | `shred` | `shred -u sensitive.txt` |
| Создать архив | `tar` | `tar -czf archive.tar.gz /path/` |
| Распаковать архив | `tar` | `tar -xzf archive.tar.gz` |
| Символьная ссылка | `ln` | `ln -s /path/to/file link_name` |
| Переименовать файлы массово | `rename` | `rename 's/.txt/.md/' *.txt` |

:::warning Ограничения shred
`shred` не гарантирует удаление данных на SSD, CoW-файловых системах, снапшотах и резервных копиях. Для таких носителей используйте шифрование и штатные средства безопасного стирания устройства.
:::

## Процессы

| Задача | Команда | Пример |
|--------|---------|--------|
| Посмотреть процессы | `ps` | `ps aux` |
| Убить процесс по имени | `pkill` | `pkill nginx` |
| Завершить процесс по TCP-порту | `lsof` + `kill` | `lsof -tiTCP:8080 -sTCP:LISTEN \| xargs -r kill -TERM --` |
| Запустить в фоне | `nohup` | `nohup ./script.sh &` |
| Посмотреть что ест CPU | `top` | `top -c` |
| Убить все процессы по имени | `killall` | `killall chrome` |
| Найти PID процесса | `pgrep` | `pgrep -x nginx` |
| Изменить приоритет | `nice` | `nice -n 10 ./heavy_task.sh` |
| Остановить процесс | `kill` | `kill -STOP PID` |
| Продолжить процесс | `kill` | `kill -CONT PID` |

## Сеть

| Задача | Команда | Пример |
|--------|---------|--------|
| Проверить доступность хоста | `ping` | `ping -c 3 8.8.8.8` |
| Посмотреть открытые порты | `ss` | `ss -tlnp` |
| Кто слушает порт 80 | `ss` | `sudo ss -ltnp 'sport = :80'` |
| Скачать файл | `wget` | `wget https://example.com/file.zip` |
| HTTP-запрос | `curl` | `curl -s https://api.example.com` |
| Посмотреть DNS | `dig` | `dig example.com` |
| Трассировка маршрута | `traceroute` | `traceroute 8.8.8.8` |
| Сканировать порты | `nmap` | `nmap -sT 192.168.1.1` |
| Посмотреть IP | `ip` | `ip addr show` |
| Проверить DNS-резолв | `dig` | `dig +short example.com` |
| Захватить трафик | `tcpdump` | `tcpdump -i eth0 port 80` |

## Пользователи и права

| Задача | Команда | Пример |
|--------|---------|--------|
| Добавить пользователя | `useradd` | `sudo useradd -m -s /bin/bash newuser` |
| Удалить пользователя | `userdel` | `sudo userdel -r olduser` |
| Сменить пароль | `passwd` | `passwd username` |
| Дать sudo | `usermod` | `sudo usermod -aG sudo username` |
| Посмотреть группы | `groups` | `groups username` |
| Изменить права файла | `chmod` | `chmod 755 script.sh` |
| Изменить владельца | `chown` | `chown user:group file.txt` |
| Посмотреть кто в системе | `who` | `who` |
| Посмотреть историю входов | `last` | `last -10` |
| Переключиться на root | `sudo` | `sudo -i` |

## Мониторинг

| Задача | Команда | Пример |
|--------|---------|--------|
| Использование памяти | `free` | `free -h` |
| Загрузка CPU | `uptime` | `uptime` |
| Информация о ядре | `uname` | `uname -a` |
| Размер файлов | `du` | `du -sh /var/log/*` |
| Сообщения ядра | `dmesg` | `dmesg \| tail -20` |
| Список дисков | `lsblk` | `lsblk` |
| Информация о CPU | `lscpu` | `lscpu` |
| Статистика в реальном времени | `vmstat` | `vmstat 1 5` |

## Управление пакетами

| Задача | Команда | Пример |
|--------|---------|--------|
| Установить пакет (Debian) | `apt` | `sudo apt install nginx` |
| Установить пакет (RHEL) | `dnf` | `sudo dnf install nginx` |
| Обновить все пакеты | `apt` | `sudo apt update && sudo apt upgrade` |
| Найти пакет | `apt` | `apt search nginx` |
| Удалить пакет | `apt` | `sudo apt remove nginx` |
| Посмотреть информацию | `apt` | `apt show nginx` |
| Какой пакет содержит файл | `dpkg` | `dpkg -S /usr/bin/ls` |

## systemd и службы

| Задача | Команда | Пример |
|--------|---------|--------|
| Запустить службу | `systemctl` | `sudo systemctl start nginx` |
| Остановить службу | `systemctl` | `sudo systemctl stop nginx` |
| Перезапустить службу | `systemctl` | `sudo systemctl restart nginx` |
| Включить автозапуск | `systemctl` | `sudo systemctl enable nginx` |
| Посмотреть статус | `systemctl` | `systemctl status nginx` |
| Посмотреть логи | `journalctl` | `journalctl -u nginx -f` |
| Логи за последний час | `journalctl` | `journalctl -u nginx --since "1 hour ago"` |
| Службы, которые не стартовали | `systemctl` | `systemctl --failed` |

## SSH и удалённый доступ

| Задача | Команда | Пример |
|--------|---------|--------|
| Подключиться к серверу | `ssh` | `ssh user@host` |
| Скопировать файл на сервер | `scp` | `scp file.txt user@host:/path/` |
| Скопировать файл с сервера | `scp` | `scp user@host:/path/file.txt ./` |
| Синхронизировать папки | `rsync` | `rsync -avz src/ user@host:/dest/` |
| Сгенерировать SSH-ключ | `ssh-keygen` | `ssh-keygen -t ed25519` |
| Скопировать ключ на сервер | `ssh-copy-id` | `ssh-copy-id user@host` |
| Пробросить порт | `ssh` | `ssh -L 8080:localhost:80 user@host` |

## Bash-скрипты

| Задача | Команда | Пример |
|--------|---------|--------|
| Запустить скрипт | `bash` | `bash script.sh` |
| Сделать исполняемым | `chmod` | `chmod +x script.sh` |
| Проверить существует ли файл | `test` | `[ -f file.txt ] && echo "exists"` |
| Прочитать ввод пользователя | `read` | `read -p "Name: " name` |
| Зациклить команду | `watch` | `watch -n 2 'df -h'` |
| Записать вывод в файл | `>` | `command > output.txt` |
| Добавить в файл | `>>` | `command >> log.txt` |
| Передать в другую команду | `\|` | `ps aux \| grep nginx` |
