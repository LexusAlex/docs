# dig

Утилита для DNS-запросов и отладки DNS.

## Синтаксис

```bash
dig [опции] имя [тип_записи]
```

## Опции

| Опция | Описание |
|-------|----------|
| `@сервер` | Использовать указанный DNS-сервер |
| `+short` | Краткий вывод |
| `+trace` | Трассировка пути DNS |
| `+noall +answer` | Только секция ответа |
| `-x адрес` | Обратный DNS-запрос |
| `-p порт` | Порт DNS-сервера |
| `+noall +authority` | Только секция authority |
| `+stats` | Показать статистику |

## Типы записей

| Тип | Описание |
|-----|----------|
| `A` | IPv4-адрес |
| `AAAA` | IPv6-адрес |
| `MX` | Почтовый сервер |
| `NS` | DNS-сервер |
| `TXT` | Текстовые записи |
| `CNAME` | Каноническое имя |
| `SOA` | Start of Authority |
| `PTR` | Обратная запись |

## Примеры

### Базовый запрос

```bash
dig google.com
```

### Запись A

```bash
dig google.com A
```

### Запись AAAA

```bash
dig google.com AAAA
```

### MX-записи

```bash
dig google.com MX
```

### NS-записи

```bash
dig google.com NS
```

### TXT-записи

```bash
dig google.com TXT
```

### CNAME-запись

```bash
dig www.google.com CNAME
```

### SOA-запись

```bash
dig google.com SOA
```

### Краткий вывод

```bash
dig +short google.com
```

### Только ответ

```bash
dig +noall +answer google.com
```

### Обратный DNS

```bash
dig -x 8.8.8.8
```

### Через конкретный сервер

```bash
dig @8.8.8.8 google.com
```

### Трассировка DNS

```bash
dig +trace google.com
```

### Краткие MX-записи

```bash
dig +short google.com MX
```

### Запрос к Cloudflare DNS

```bash
dig @1.1.1.1 google.com A
```

### Проверка SPF-записи

```bash
dig +short google.com TXT | grep "v=spf1"
```

### Проверка DKIM-записи

```bash
dig +short selector._domainkey.google.com TXT
```

### Все записи домена

```bash
dig google.com ANY
```

### Статистика запроса

```bash
dig +stats google.com
```

### Проверка DNSSEC

```bash
dig +dnssec google.com
```

## Практические сценарии

### Проверка DNS-записей

```bash
echo "=== A записи ==="
dig +short example.com A
echo "=== MX записи ==="
dig +short example.com MX
echo "=== NS записи ==="
dig +short example.com NS
```

### Проверка разных DNS-серверов

```bash
for dns in 8.8.8.8 1.1.1.1 9.9.9.9; do
    echo "=== $dns ==="
    dig +short @$dns example.com
done
```

### Диагностика DNS

```bash
dig +trace +nodnssec example.com
```

### Скрипт проверки DNS

```bash
#!/bin/bash
domain="$1"
echo "Домен: $domain"
echo "A: $(dig +short $domain A)"
echo "AAAA: $(dig +short $domain AAAA)"
echo "MX: $(dig +short $domain MX)"
echo "NS: $(dig +short $domain NS)"
```

:::tip
Используйте `+short` для скриптов и `+noall +answer` для более читаемого вывода.
:::

:::warning
Записи `ANY` могут не возвращать все записи из-за кэширования и политик DNS-серверов.
:::

## Связки с другими командами

```bash
# Получить только первый IP-адрес домена
dig +short example.com | head -1

# MX-записи, отсортированные по приоритету
dig +short example.com MX | sort -n

# Пакетный DNS-запрос для списка доменов из файла
for domain in $(cat domains.txt); do
  echo -n "$domain: "; dig +short $domain
done

# DNS-резолвинг + проверка HTTP-статуса каждого IP
dig +short example.com | xargs -I{} curl -s -o /dev/null -w "{}: %{http_code}\n" http://{}

# Трассировка DNS (последние 5 хопов)
dig +trace example.com | tail -5

# Запрос ко всем NS-серверам домена
dig example.com NS +short | xargs -I{} dig @{} example.com +short

# Обратный DNS для домена
dig -x $(dig +short example.com) +short

# Время DNS-запроса
dig example.com +noall +answer +stats | grep "Query time"

# Сравнение ответов от разных DNS-серверов
for dns in 8.8.8.8 1.1.1.1 9.9.9.9; do
  echo -n "$dns: "; dig +short @$dns example.com
done

# Проверка SPF, DKIM и DMARC записей
echo "SPF:"; dig +short example.com TXT | grep "v=spf1"
echo "DMARC:"; dig +short _dmarc.example.com TXT
```
