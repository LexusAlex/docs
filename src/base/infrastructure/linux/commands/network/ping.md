# ping

**Уровень:** Начинающий

Проверяет доступность узла и измеряет задержку.

## Синтаксис

```bash
ping [опции] хост
```

## Опции

| Опция | Описание |
|-------|----------|
| `-c количество` | Количество пакетов |
| `-i интервал` | Интервал между пакетами (секунды) |
| `-s размер` | Размер пакета (байты) |
| `-W таймаут` | Таймаут ожидания ответа (секунды) |
| `-f` | Flood-режим (только root) |
| `-I интерфейс` | Исходный интерфейс |
| `-t TTL` | Time To Live |
| `-q` | Тихий режим (только итоги) |
| `-W` | Таймаут в секундах |
| `-4` | Только IPv4 |
| `-6` | Только IPv6 |

## Примеры

### Базовая проверка

```bash
ping google.com
```

### Ограничение по количеству

```bash
ping -c 4 google.com
```

### С интервалом 0.5 секунды

```bash
ping -i 0.5 -c 10 google.com
```

### С увеличенным пакетом

```bash
ping -s 1024 -c 4 google.com
```

### С таймаутом

```bash
ping -W 2 -c 4 192.168.1.1
```

### Тихий режим

```bash
ping -q -c 4 google.com
```

### Через конкретный интерфейс

```bash
ping -I eth0 -c 4 google.com
```

### С TTL

```bash
ping -t 10 -c 4 google.com
```

### Flood-режим (стресс-тест)

```bash
sudo ping -f google.com
```

### Проверка локальной сети

```bash
ping -c 4 192.168.1.1
```

### Проверка MTU

```bash
ping -s 1472 -M do -c 4 google.com
```

### Проверка всех узлов подсети

```bash
for i in {1..254}; do
    ping -c 1 -W 1 192.168.1.$i | grep "bytes from" &
done
wait
```

### Непрерывный мониторинг

```bash
ping -i 2 8.8.8.8
```

### Проверка IPv6

```bash
ping -6 google.com
```

## Практические сценарии

### Проверка доступности в скрипте

```bash
if ping -c 1 -W 3 8.8.8.8 > /dev/null 2>&1; then
    echo "Интернет доступен"
else
    echo "Нет подключения"
fi
```

### Мониторинг задержки

```bash
ping -c 100 -q google.com | tail -1
```

### Проверка потерь пакетов

```bash
ping -c 50 -q google.com | grep -oP '\d+(?=% packet loss)'
```

### Скрипт мониторинга

```bash
#!/bin/bash
while true; do
    result=$(ping -c 1 -W 2 8.8.8.8 2>&1)
    if [ $? -ne 0 ]; then
        echo "$(date): Потеря связи" >> /var/log/ping.log
    fi
    sleep 10
done
```

:::tip
Используйте `Ctrl+C` для остановки непрерывного пинга. Статистика будет выведена автоматически.
:::

:::warning
Flood-режим (`-f`) генерирует огромный трафик. Используйте только для тестирования в изолированной сети.
:::

## См. также

- [traceroute](traceroute.md) — трассировка маршрута
- [mtr](mtr.md) — непрерывная трассировка
- [dig](dig.md) — DNS-запросы


## Связки с другими командами

```bash
# Средняя задержка до хоста
ping -c 3 8.8.8.8 | tail -1 | awk -F'/' '{print "Avg:", $5, "ms"}'

# Проверка доступности нескольких хостов
for host in google.com yandex.ru; do
  ping -c 1 -W 1 $host > /dev/null && echo "$host: OK" || echo "$host: FAIL"
done

# Процент потерь пакетов
ping -c 10 8.8.8.8 | grep "loss" | awk '{print $6}'

# Статистика flood ping (1000 пакетов)
ping -f -c 1000 8.8.8.8 2>&1 | tail -3

# Быстрая проверка сетевого подключения через шлюз
ping -c 1 -W 1 $(ip route | grep default | awk '{print $3}') > /dev/null && echo "Network OK"

# Мониторинг задержки с логированием в файл
ping -c 60 8.8.8.8 | while read line; do echo "$(date '+%H:%M:%S') $line"; done | tee ping.log

# Проверка MTU методом бинарного поиска (DF-бит)
ping -c 1 -s 1472 -M do 8.8.8.8 > /dev/null 2>&1 && echo "MTU 1500 OK" || echo "MTU < 1500"

# Пинг всех хостов из файла и вывод только доступных
for host in $(cat hosts.txt); do
  ping -c 1 -W 1 $host > /dev/null 2>&1 && echo "$host доступен"
done

# Среднее время отклика для нескольких хостов
for host in 8.8.8.8 1.1.1.1 9.9.9.9; do
  avg=$(ping -c 3 -q $host | tail -1 | awk -F'/' '{print $5}')
  echo "$host: среднее $avg мс"
done
```
