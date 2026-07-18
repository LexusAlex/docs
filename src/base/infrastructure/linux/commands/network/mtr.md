# mtr

**Уровень:** Средний

Комбинация `ping` и `traceroute` — непрерывная трассировка со статистикой.

## Синтаксис

```bash
mtr [опции] хост
```

## Опции

| Опция | Описание |
|-------|----------|
| `-r` | Отчёт (текстовый режим) |
| `-c количество` | Количество циклов |
| `-n` | Без DNS-разрешения |
| `-i интервал` | Интервал между запросами |
| `-T` | Использовать TCP |
| `-P порт` | Порт для TCP |
| `-w` | Широкий формат |
| `-s размер` | Размер пакета |
| `-u` | Использовать UDP |
| `-b` | Показать IP и имя |
| `-z` | Скомпенсировать ASN |

## Примеры

### Интерактивный режим

```bash
mtr google.com
```

### Текстовый отчёт

```bash
mtr -r -c 10 google.com
```

### Без DNS

```bash
mtr -n google.com
```

### Широкий формат

```bash
mtr -rw google.com
```

### С количеством циклов

```bash
mtr -c 20 -r google.com
```

### TCP-трассировка

```bash
mtr -T -P 443 google.com
```

### UDP-трассировка

```bash
mtr -u google.com
```

### С интервалом

```bash
mtr -i 0.5 -c 50 -r google.com
```

### С размером пакета

```bash
mtr -s 1024 google.com
```

### С IP и именами

```bash
mtr -b google.com
```

### Проверка конкретного хоста

```bash
mtr -r -c 30 192.168.1.1
```

### Проверка до сервера

```bash
mtr -r -c 50 -n 10.0.0.50
```

### С компенсацией ASN

```bash
mtr -z google.com
```

### В фоне

```bash
mtr -r -c 100 google.com > mtr-report.txt &
```

### Проверка нескольких хостов

```bash
for host in google.com cloudflare.com; do
    echo "=== $host ==="
    mtr -r -c 10 "$host"
done
```

### TCP-трассировка до порта

```bash
mtr -T -P 80 -r -c 20 example.com
```

### С увеличенным пакетом

```bash
mtr -s 1400 google.com
```

### Проверка MTU

```bash
mtr -s 1472 -r -c 5 google.com
```

### Анализ потерь пакетов

```bash
mtr -r -c 50 google.com | awk '$3 > 0 {print}'
```

### Проверка задержки

```bash
mtr -r -c 30 google.com | awk '$4 > 100 {print}'
```

## Практические сценарии

### Диагностика потерь пакетов

```bash
mtr -r -c 100 -n problem-server.com
```

### Мониторинг качества соединения

```bash
#!/bin/bash
while true; do
    mtr -r -c 60 -n 8.8.8.8 >> /var/log/mtr.log
    sleep 300
done
```

### Проверка маршрута до VPN

```bash
mtr -r -c 20 -n vpn-server.company.com
```

### Сравнение провайдеров

```bash
mtr -r -c 30 provider1.com > mtr1.txt
mtr -r -c 30 provider2.com > mtr2.txt
```

### Анализ проблемного узла

```bash
mtr -r -c 100 -n 192.168.1.1 | grep -E "Loss|Avg"
```

### Проверка перед деплоем

```bash
mtr -r -c 10 -n production-server.com | tail -1
```

:::tip
Используйте `-r` для скриптов и автоматизации. Интерактивный режим лучше для ручной диагностики.
:::

:::warning
`mtr` требует root-прав для ICMP-режима. TCP-режим (`-T`) работает без root, но нужен порт.
:::

## См. также

- [ping](ping.md) — проверка доступности
- [traceroute](traceroute.md) — трассировка маршрута

