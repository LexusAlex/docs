# Команды Linux

Справочник по основным командам Linux, сгруппированным в 25 тематических категорий.

## Быстрый старт

| Страница | Описание |
|----------|----------|
| [Шпаргалка](cheat-sheet.md) | Компактный справочник 50 самых частых команд |
| [Как сделать...](how-to.md) | Задача → команда → пример |
| [По задачам](by-use-case.md) | Команды по сценариям (мониторинг, безопасность, сеть) |

## Категории

| Категория | Описание | Команд |
|-----------|----------|--------|
| [Файлы и каталоги](files-and-directories/) | Создание, копирование, перемещение, удаление | 15 |
| [Просмотр и обработка текста](viewing-and-processing-text/) | cat, less, sed, awk, sort, jq | 16 |
| [Перенаправление потоков и конвейеры](streams-and-pipes/) | >, >>, \|, pipe | 2 |
| [Поиск файлов и команд](search-files-and-commands/) | find, locate, grep, xargs | 7 |
| [Пользователи и группы](user-and-access/) | useradd, sudo, su, passwd | 14 |
| [Права доступа](permissions/) | chmod, chown, chgrp, ACL | 6 |
| [Управление процессами](processes/) | ps, kill, nice, jobs | 14 |
| [Мониторинг системы](monitoring/) | top, htop, free, df, vmstat | 13 |
| [Диски и монтирование](disks-and-mount/) | fdisk, mount, lsblk, fsck | 11 |
| [Архивы и сжатие](archives-and-compression/) | tar, gzip, zip, 7z | 8 |
| [Сеть](network/) | ip, ss, ping, curl, dig | 13 |
| [Файрвол](firewall/) | iptables, nftables, ufw | 4 |
| [SSH](ssh/) | ssh, scp, rsync, ssh-keygen | 6 |
| [Управление пакетами](package-management/) | apt, dpkg, dnf, rpm | 8 |
| [Текстовые редакторы](text-editors/) | nano, vim | 2 |
| [Переменные окружения](environment/) | export, PATH, ~/.bashrc | 5 |
| [systemd и службы](systemd/) | systemctl, journalctl | 6 |
| [Планирование задач](cron-and-timers/) | crontab, systemd-timers | 2 |
| [Bash-скрипты](bash-scripts/) | Переменные, условия, циклы, функции | 6 |
| [Диагностика](diagnostics/) | strace, ltrace, lsof, sar | 4 |
| [Справка и документация](reference/) | man, tldr, apropos | 5 |
| [Терминальные мультиплексоры](terminal-multiplexers/) | tmux, screen | 2 |
| [Планировщики задач (at/batch)](scheduling/) | at, batch | 2 |
| [Автоматизация](automation/) | expect, chroot | 2 |
| [Сборка](build-tools/) | make | 1 |

## Уровень сложности

Каждая страница команды имеет маркер уровня:

- **Начинающий** — ls, cd, cat, grep, chmod, ps, kill, ping, apt, nano
- **Средний** — awk, sed, tar, rsync, ssh, systemctl, find, xargs, vim
- **Продвинутый** — strace, iptables, nftables, expect, chroot, awk (regex)
