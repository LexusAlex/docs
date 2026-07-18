# Шпаргалка по командам Linux

Компактный справочник самых частых команд. Для подробностей кликните по названию команды.

## Навигация и файлы

| Команда | Описание | Пример |
|---------|----------|--------|
| [ls](files-and-directories/ls.md) | Список файлов | `ls -lah` |
| [cd](files-and-directories/cd.md) | Сменить директорию | `cd /var/log` |
| [pwd](files-and-directories/pwd.md) | Текущая директория | `pwd` |
| [find](search-files-and-commands/find.md) | Найти файл | `find . -name "*.log"` |
| [cp](files-and-directories/cp.md) | Копировать | `cp -r dir/ /backup/` |
| [mv](files-and-directories/mv.md) | Переместить | `mv old.txt new.txt` |
| [rm](files-and-directories/rm.md) | Удалить | `rm -rf dir/` |
| [mkdir](files-and-directories/mkdir.md) | Создать папку | `mkdir -p /path/to/dir` |
| [ln](files-and-directories/ln.md) | Ссылка | `ln -s /target link` |
| [tree](files-and-directories/tree.md) | Дерево файлов | `tree -L 2` |

## Просмотр текста

| Команда | Описание | Пример |
|---------|----------|--------|
| [cat](viewing-and-processing-text/cat.md) | Вывод файла | `cat file.txt` |
| [less](viewing-and-processing-text/less.md) | Постраничный просмотр | `less file.log` |
| [head](viewing-and-processing-text/head.md) | Начало файла | `head -20 file.txt` |
| [tail](viewing-and-processing-text/tail.md) | Конец файла | `tail -f /var/log/syslog` |
| [grep](search-files-and-commands/grep.md) | Поиск текста | `grep -rn "error" /var/log/` |
| [sed](viewing-and-processing-text/sed.md) | Замена текста | `sed 's/old/new/g' file` |
| [awk](viewing-and-processing-text/awk.md) | Обработка текста | `awk '{print $1}' file` |
| [sort](viewing-and-processing-text/sort.md) | Сортировка | `sort -rn` |
| [uniq](viewing-and-processing-text/uniq.md) | Уникальные строки | `sort file \| uniq -c` |
| [wc](viewing-and-processing-text/wc.md) | Подсчёт строк | `wc -l file.txt` |

## Поиск

| Команда | Описание | Пример |
|---------|----------|--------|
| [find](search-files-and-commands/find.md) | Поиск файлов | `find / -name "*.conf"` |
| [locate](search-files-and-commands/locate.md) | Быстрый поиск | `locate nginx.conf` |
| [which](search-files-and-commands/which.md) | Путь к команде | `which python3` |
| [grep](search-files-and-commands/grep.md) | Поиск в тексте | `grep -r "TODO" .` |
| [xargs](search-files-and-commands/xargs.md) | Аргументы из stdin | `find . -name "*.log" \| xargs rm` |

## Процессы

| Команда | Описание | Пример |
|---------|----------|--------|
| [ps](processes/ps.md) | Список процессов | `ps aux` |
| [top](monitoring/top.md) | Монитор процессов | `top -c` |
| [kill](processes/kill.md) | Убить процесс | `kill -9 PID` |
| [pkill](processes/pkill.md) | Убить по имени | `pkill nginx` |
| [pgrep](processes/pgrep.md) | Найти PID | `pgrep -x nginx` |
| [nohup](processes/nohup.md) | Фоновый запуск | `nohup ./script.sh &` |
| [nice](processes/nice.md) | Приоритет | `nice -n 10 ./task.sh` |

## Мониторинг

| Команда | Описание | Пример |
|---------|----------|--------|
| [free](monitoring/free.md) | Память | `free -h` |
| [df](monitoring/df.md) | Дисковое пространство | `df -h` |
| [du](monitoring/du.md) | Размер папок | `du -sh * \| sort -rh` |
| [uptime](monitoring/uptime.md) | Загрузка системы | `uptime` |
| [dmesg](monitoring/dmesg.md) | Сообщения ядра | `dmesg \| tail` |
| [lsblk](disks-and-mount/lsblk.md) | Блочные устройства | `lsblk` |
| [lscpu](monitoring/lscpu.md) | Информация о CPU | `lscpu` |

## Сеть

| Команда | Описание | Пример |
|---------|----------|--------|
| [ip](network/ip.md) | Сетевые интерфейсы | `ip addr show` |
| [ss](network/ss.md) | Сокеты | `ss -tlnp` |
| [ping](network/ping.md) | Проверка связи | `ping -c 3 8.8.8.8` |
| [curl](network/curl.md) | HTTP-запрос | `curl -s https://api.com` |
| [wget](network/wget.md) | Скачивание | `wget url` |
| [dig](network/dig.md) | DNS-запрос | `dig example.com` |
| [traceroute](network/traceroute.md) | Трассировка | `traceroute 8.8.8.8` |
| [nmap](network/nmap.md) | Сканирование | `nmap -sT 192.168.1.1` |
| [scp](ssh/scp.md) | Копирование по SSH | `scp file user@host:/path` |
| [rsync](ssh/rsync.md) | Синхронизация | `rsync -avz src/ dest/` |

## Пользователи и права

| Команда | Описание | Пример |
|---------|----------|--------|
| [sudo](user-and-access/sudo.md) | Привилегии | `sudo command` |
| [chmod](permissions/chmod.md) | Права доступа | `chmod 755 file` |
| [chown](permissions/chown.md) | Владелец | `chown user:group file` |
| [useradd](user-and-access/useradd.md) | Создать пользователя | `useradd -m user` |
| [passwd](user-and-access/passwd.md) | Пароль | `passwd user` |
| [usermod](user-and-access/usermod.md) | Изменить пользователя | `usermod -aG sudo user` |

## Архивы

| Команда | Описание | Пример |
|---------|----------|--------|
| [tar](archives-and-compression/tar.md) | Архиватор | `tar -czf a.tar.gz dir/` |
| [gzip](archives-and-compression/gzip.md) | Сжатие | `gzip file` |
| [zip](archives-and-compression/zip.md) | Zip-архив | `zip -r a.zip dir/` |
| [unzip](archives-and-compression/unzip.md) | Распаковка | `unzip a.zip` |

## systemd

| Команда | Описание | Пример |
|---------|----------|--------|
| [systemctl](systemd/systemctl.md) | Управление службами | `systemctl start nginx` |
| [journalctl](systemd/journalctl.md) | Логи | `journalctl -u nginx -f` |

## Планирование

| Команда | Описание | Пример |
|---------|----------|--------|
| [crontab](cron-and-timers/crontab.md) | Cron-задачи | `crontab -e` |

## Редакторы

| Команда | Описание | Пример |
|---------|----------|--------|
| [nano](text-editors/nano.md) | Простой редактор | `nano file.txt` |
| [vim](text-editors/vim.md) | Продвинутый редактор | `vim file.txt` |

## Самые частые связки

```bash
# Топ-10 файлов по размеру
du -sh * | sort -rh | head -10

# Найти и удалить старые логи
find /var/log -name "*.log" -mtime +30 -exec rm {} \;

# Убить процесс по порту
kill $(lsof -ti:8080)

# Топ-10 IP в логах
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Следить за логом в реальном времени
tail -f /var/log/syslog | grep --line-buffered error

# Проверить все серверы из списка
for h in $(cat hosts.txt); do ssh $h 'uptime'; done

# Бэкап базы данных
mysqldump -u root db | gzip > backup_$(date +%F).sql.gz

# Размер всех папок в домашней директории
du -sh ~/* | sort -rh
```
