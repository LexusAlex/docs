# nslookup

Утилита для DNS-запросов в интерактивном и неинтерактивном режиме.

## Синтаксис

```bash
nslookup [опции] [хост [сервер]]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-type=тип` | Тип DNS-записи |
| `-debug` | Подробный вывод |
| `-timeout=N` | Таймаут запроса |
| `-port=N` | Порт DNS-сервера |
| `-norecurse` | Без рекурсии |

## Режимы

| Режим | Описание |
|-------|----------|
| Неинтерактивный | Одноразовый запрос |
| Интерактивный | Интерактивная сессия |

## Примеры

### Базовый запрос

```bash
nslookup google.com
```

### Запрос к конкретному серверу

```bash
nslookup google.com 8.8.8.8
```

### Запись A

```bash
nslookup -type=A google.com
```

### MX-записи

```bash
nslookup -type=MX google.com
```

### NS-записи

```bash
nslookup -type=NS google.com
```

### TXT-записи

```bash
nslookup -type=TXT google.com
```

### SOA-запись

```bash
nslookup -type=SOA google.com
```

### Обратный DNS

```bash
nslookup 8.8.8.8
```

### Подробный вывод

```bash
nslookup -debug google.com
```

### Интерактивный режим

```bash
nslookup
> set type=MX
> google.com
> exit
```

### С указанием сервера в интерактивном режиме

```bash
nslookup
> server 8.8.8.8
> google.com
> exit
```

### Проверка CNAME

```bash
nslookup -type=CNAME www.google.com
```

### Проверка всех записей

```bash
nslookup -type=ANY google.com
```

### С таймаутом

```bash
nslookup -timeout=5 google.com
```

### Без рекурсии

```bash
nslookup -norecurse google.com
```

### Проверка DNS-сервера

```bash
nslookup -type=NS example.com 8.8.8.8
```

### Проверка SPF

```bash
nslookup -type=TXT google.com | grep "v=spf1"
```

### Проверка DKIM

```bash
nslookup -type=TXT selector._domainkey.google.com
```

## Практические сценарии

### Проверка DNS

```bash
nslookup example.com 8.8.8.8
nslookup example.com 1.1.1.1
```

### Проверка MX-записей

```bash
nslookup -type=MX example.com | grep "mail exchanger"
```

### Скрипт проверки DNS

```bash
#!/bin/bash
echo "=== Проверка DNS для $1 ==="
nslookup "$1" 8.8.8.8
echo ""
nslookup "$1" 1.1.1.1
```

### Проверка обратного DNS

```bash
for ip in 8.8.8.8 1.1.1.1 9.9.9.9; do
    echo "$ip -> $(nslookup $ip | awk '/name =/ {print $4}')"
done
```

:::tip
Для более продвинутых запросов используйте `dig`. Команда `nslookup` считается устаревшей, но всё ещё широко используется.
:::

:::warning
`nslookup` может давать некорректные результаты при сложных DNS-конфигурациях. Для точной отладки используйте `dig`.
:::
