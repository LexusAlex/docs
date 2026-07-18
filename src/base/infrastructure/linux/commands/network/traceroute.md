# traceroute

**Уровень:** Средний

Трассирует маршрут пакетов до узла, показывая промежуточные хопы.

## Синтаксис

```bash
traceroute [опции] хост [макс_хопов]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-n` | Числовой вывод (без DNS) |
| `-I` | Использовать ICMP |
| `-T` | Использовать TCP |
| `-U` | Использовать UDP (по умолчанию) |
| `-p порт` | Целевой порт (для TCP/UDP) |
| `-q запросов` | Количество запросов на хоп |
| `-w время` | Таймаут ожидания ответа (секунды) |
| `-m макс_хопов` | Максимальное количество хопов |
| `-z задержка` | Задержка между запросами (мс) |
| `-4` | Только IPv4 |
| `-6` | Только IPv6 |

## Примеры

### Базовая трассировка

```bash
traceroute google.com
```

### Без DNS-разрешения

```bash
traceroute -n google.com
```

### Использовать ICMP

```bash
traceroute -I google.com
```

### Использовать TCP

```bash
traceroute -T -p 443 google.com
```

### Один запрос на хоп

```bash
traceroute -q 1 google.com
```

### Увеличить максимум хопов

```bash
traceroute -m 30 google.com
```

### С таймаутом

```bash
traceroute -w 3 google.com
```

### Трассировка до порта

```bash
traceroute -T -p 80 example.com
```

### Быстрая трассировка

```bash
traceroute -n -q 1 -w 2 google.com
```

### Трассировка с задержкой

```bash
traceroute -z 100 google.com
```

### Трассировка UDP

```bash
traceroute -U -p 53 google.com
```

### Обход брандмауэра

```bash
traceroute -T -p 443 -n host-behind-firewall.com
```

### Трассировка IPv6

```bash
traceroute -6 google.com
```

### Проверка маршрута до сервера

```bash
traceroute -n -q 1 10.0.0.50
```

### Анализ задержки на каждом хопе

```bash
traceroute -q 3 google.com
```

## Практические сценарии

### Диагностика проблем сети

```bash
# Проверяем, где теряются пакеты
traceroute -n -q 1 problem-server.com
```

### Проверка маршрута до VPN

```bash
traceroute -n vpn-server.company.com
```

### Сравнение маршрутов

```bash
traceroute -n provider1.com > route1.txt
traceroute -n provider2.com > route2.txt
diff route1.txt route2.txt
```

### Скрипт диагностики

```bash
#!/bin/bash
echo "=== Трассировка до 8.8.8.8 ==="
traceroute -n -q 1 8.8.8.8
echo ""
echo "=== Трассировка до шлюза ==="
traceroute -n -q 1 $(ip route | awk '/default/ {print $3}')
```

:::tip
Используйте `-I` для ICMP, если UDP блокируется. Используйте `-T` для TCP, если ICMP тоже блокируется.
:::

:::warning
Некоторые промежуточные узлы не отвечают на запросы, что отображается звёздочками (`*`). Это нормально.
:::

## См. также

- [ping](ping.md) — проверка доступности
- [mtr](mtr.md) — непрерывная трассировка

