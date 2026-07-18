# Сеть

Конфигурация сетевых интерфейсов, диагностика соединений, передача данных.

## Команды

| Команда | Описание |
|---------|----------|
| [ip](ip.md) | Конфигурация сетевых интерфейсов |
| [ss](ss.md) | Информация о сокетах |
| [ping](ping.md) | Проверка доступности хоста |
| [traceroute](traceroute.md) | Трассировка маршрута |
| [dig](dig.md) | DNS-запросы |
| [nslookup](nslookup.md) | DNS-запросы (упрощённый) |
| [host](host.md) | DNS-запросы |
| [curl](curl.md) | HTTP-запросы и передача данных |
| [wget](wget.md) | Скачивание файлов |
| [nc](nc.md) | netcat — TCP/UDP соединения |
| [nmap](nmap.md) | Сканирование портов |
| [tcpdump](tcpdump.md) | Захват сетевого трафика |
| [mtr](mtr.md) | Комбинация ping + traceroute |

::: tip
Команды `scp` и `rsync` описаны в разделе [SSH](/base/infrastructure/linux/commands/ssh/).
:::

## Полезные файлы

| Файл | Описание |
|------|----------|
| `/etc/hosts` | Локальное разрешение имён |
| `/etc/resolv.conf` | DNS-серверы |
| `/etc/hostname` | Имя хоста |
| `/etc/network/interfaces` | Сетевые интерфейсы (Debian) |
| `/etc/netplan/*.yaml` | Сетевые интерфейсы (Ubuntu 18+) |
