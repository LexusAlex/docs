# host

**Уровень:** Средний

Простая утилита для DNS-запросов с кратким выводом.

## Синтаксис

```bash
host [опции] имя [сервер]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-t тип` | Тип DNS-записи |
| `-a` | Все записи (подробный вывод) |
| `-v` | Подробный режим |
| `-W таймаут` | Таймаут ожидания |
| `-r` | Без рекурсии |
| `-4` | Только IPv4 |
| `-6` | Только IPv6 |

## Примеры

### Базовый запрос

```bash
host google.com
```

### Запись A

```bash
host -t A google.com
```

### Запись AAAA

```bash
host -t AAAA google.com
```

### MX-записи

```bash
host -t MX google.com
```

### NS-записи

```bash
host -t NS google.com
```

### TXT-записи

```bash
host -t TXT google.com
```

### SOA-запись

```bash
host -t SOA google.com
```

### Все записи

```bash
host -a google.com
```

### Обратный DNS

```bash
host 8.8.8.8
```

### Через конкретный сервер

```bash
host google.com 8.8.8.8
```

### С таймаутом

```bash
host -W 5 google.com
```

### Без рекурсии

```bash
host -r google.com
```

### Подробный вывод

```bash
host -v google.com
```

### Проверка CNAME

```bash
host -t CNAME www.google.com
```

### Проверка PTR-записи

```bash
host -t PTR 8.8.8.8
```

### Проверка SPF

```bash
host -t TXT google.com | grep "v=spf1"
```

### Проверка MX с приоритетом

```bash
host -t MX google.com
```

### Быстрая проверка IP

```bash
host google.com | awk '/has address/ {print $4}'
```

## Практические сценарии

### Проверка DNS-записей

```bash
echo "A: $(host -t A google.com | awk '/has address/ {print $4}')"
echo "MX: $(host -t MX google.com | awk '/is handled by/ {print $6}')"
```

### Проверка обратного DNS

```bash
for ip in 8.8.8.8 1.1.1.1; do
    host "$ip" | awk '/domain name/ {print $NF}'
done
```

### Скрипт проверки

```bash
#!/bin/bash
domain="$1"
echo "=== $domain ==="
host -t A "$domain"
host -t MX "$domain"
host -t NS "$domain"
```

### Проверка DNS-сервера

```bash
host google.com 8.8.8.8
host google.com 1.1.1.1
```

### Проверка доступности DNS

```bash
if host google.com > /dev/null 2>&1; then
    echo "DNS работает"
else
    echo "DNS не отвечает"
fi
```

:::tip
`host` даёт самый краткий вывод среди DNS-утилит. Идеален для скриптов.
:::

:::warning
`host` не поддерживает все типы DNS-записей. Для комплексных запросов используйте `dig`.
:::

## См. также

- [dig](dig.md) — DNS-запросы
- [nslookup](nslookup.md) — DNS-запросы

