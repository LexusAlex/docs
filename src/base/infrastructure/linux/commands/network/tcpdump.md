# tcpdump

**Уровень:** Продвинутый

Утилита для захвата и анализа сетевого трафика.

## Синтаксис

```bash
tcpdump [опции] [выражение]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-i интерфейс` | Сетевой интерфейс |
| `-n` | Без DNS-разрешения |
| `-v` / `-vv` | Подробный вывод |
| `-c количество` | Количество пакетов |
| `-w файл` | Записать в pcap-файл |
| `-r файл` | Прочитать pcap-файл |
| `-s размер` | Размер захвата (байты) |
| `-e` | Заголовки Ethernet |
| `-X` | HEX + ASCII-дамп |
| `-A` | Только ASCII |
| `-q` | Краткий вывод |
| `-t` | Без меток времени |
| `-ttt` | Относительные метки времени |

## BPF-фильтры

| Фильтр | Описание |
|--------|----------|
| `port 80` | Трафик на порту 80 |
| `host 192.168.1.1` | Трафик с/на хост |
| `src 192.168.1.1` | Трафик от источника |
| `dst 192.168.1.1` | Трафик к назначению |
| `tcp` | Только TCP |
| `udp` | Только UDP |
| `icmp` | Только ICMP |
| `arp` | Только ARP |

## Примеры

### Захват всех пакетов

```bash
tcpdump
```

### На конкретном интерфейсе

```bash
tcpdump -i eth0
```

### Без DNS

```bash
tcpdump -n -i eth0
```

### Ограничить количество

```bash
tcpdump -c 100 -i eth0
```

### Записать в файл

```bash
tcpdump -w capture.pcap -i eth0
```

### Прочитать файл

```bash
tcpdump -r capture.pcap
```

### Трафик на порту

```bash
tcpdump -n port 80
```

### Трафик от хоста

```bash
tcpdump -n host 192.168.1.1
```

### Только TCP

```bash
tcpdump -n tcp
```

### Только UDP

```bash
tcpdump -n udp
```

### HTTP-трафик

```bash
tcpdump -n -A port 80
```

### DNS-трафик

```bash
tcpdump -n port 53
```

### SSH-трафик

```bash
tcpdump -n port 22
```

### Подробный вывод

```bash
tcpdump -vv -n -i eth0
```

### С HEX-дампом

```bash
tcpdump -X -n -i eth0
```

### Трафик от подсети

```bash
tcpdump -n net 192.168.1.0/24
```

### Фильтр по протоколу

```bash
tcpdump -n tcp
```

### Комбинация фильтров

```bash
tcpdump -n "host 192.168.1.1 and port 80"
```

### Исключить трафик

```bash
tcpdump -n "not port 22"
```

### Захват с размером

```bash
tcpdump -s 0 -w full.pcap -i eth0
```

### Анализ pcap

```bash
tcpdump -r capture.pcap -n "tcp port 80"
```

### ICMP-трафик

```bash
tcpdump -n icmp
```

### ARP-трафик

```bash
tcpdump -n arp
```

### Трафик с VLAN

```bash
tcpdump -n -e -i eth0 vlan
```

## Практические сценарии

### Диагностика сетевых проблем

```bash
tcpdump -n -i eth0 "host problem-server and port 80" -w debug.pcap
```

### Мониторинг DNS

```bash
tcpdump -n -i any port 53
```

### Захват HTTP-запросов

```bash
tcpdump -n -A -s 0 "tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)"
```

### Анализ соединений

```bash
tcpdump -n -i eth0 "tcp[tcpflags] & (tcp-syn) != 0"
```

### Скрипт мониторинга

```bash
#!/bin/bash
tcpdump -n -i eth0 -c 1000 "not port 22" -w /tmp/capture-$(date +%F-%H%M).pcap
```

### Проверка трафика

```bash
tcpdump -n -i any "host 10.0.0.1" -c 50
```

### Захват TLS-хендшейка

```bash
tcpdump -n -i eth0 "tcp port 443 and (tcp[((tcp[12] & 0xf0) >> 2)] = 0x16)"
```

:::tip
Используйте `-w` для записи, затем анализируйте с `tcpdump -r` или в Wireshark.
:::

:::warning
Для захвата трафика нужны root-права или capability `CAP_NET_RAW`. Захват чужого трафика может быть незаконным.
:::

## См. также

- [nmap](nmap.md) — сканирование портов
- [ss](ss.md) — сетевые сокеты
- `Wireshark` — анализ трафика
