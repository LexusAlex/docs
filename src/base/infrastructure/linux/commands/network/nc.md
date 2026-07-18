# nc (netcat)

Универсальная утилита для работы с TCP/UDP соединениями.

## Синтаксис

```bash
nc [опции] хост порт
```

## Опции

| Опция | Описание |
|-------|----------|
| `-l` | Режим прослушивания (сервер) |
| `-p порт` | Порт для прослушивания |
| `-u` | Режим UDP |
| `-v` | Подробный вывод |
| `-w таймаут` | Таймаут соединения |
| `-z` | Сканирование портов |
| `-e команда` | Выполнить команду при подключении |
| `-n` | Без DNS-разрешения |
| `-k` | Принимать несколько подключений |
| `-s адрес` | Исходный адрес |
| `-q секунды` | Пауза после EOF |

## Примеры

### Подключение к серверу

```bash
nc example.com 80
```

### Прослушивание порта

```bash
nc -l 8080
```

### Сканирование портов

```bash
nc -zv example.com 80-100
```

### UDP-соединение

```bash
nc -u example.com 53
```

### С таймаутом

```bash
nc -w 5 example.com 80
```

### Простой чат-сервер

```bash
nc -l 12345
```

### Клиент чата

```bash
nc localhost 12345
```

### Передача файла (сервер)

```bash
nc -l 9999 > received_file
```

### Передача файла (клиент)

```bash
nc server 9999 < file_to_send
```

### Проверка порта

```bash
nc -zv localhost 80
```

### HTTP-запрос

```bash
echo -e "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80
```

### Сканирование нескольких портов

```bash
nc -zv example.com 22 80 443
```

### Пробный запуск UDP

```bash
nc -uv localhost 53
```

### Прокси-сервер

```bash
mkfifo fifo
nc -l 8080 < fifo | nc example.com 80 > fifo
```

### Реверс-шелл (сервер)

```bash
nc -l 4444 -e /bin/bash
```

### Реверс-шелл (клиент)

```bash
nc server 4444
```

### Сканирование с задержкой

```bash
nc -zv -w 1 example.com 1-1000 2>&1 | grep "succeeded"
```

### Проверка нескольких хостов

```bash
for host in server1 server2 server3; do
    nc -zv "$host" 22 2>&1 | grep -q "succeeded" && echo "$host: SSH OK"
done
```

### UDP-сервер

```bash
nc -lu 5353
```

### Перенаправление порта

```bash
nc -l 8080 | nc remote-server 80
```

## Практические сценарии

### Проверка доступности сервиса

```bash
nc -zv -w 3 localhost 8080 && echo "Сервис доступен"
```

### Быстрый HTTP-тест

```bash
echo -e "GET /health HTTP/1.1\r\nHost: localhost\r\n\r\n" | nc localhost 8080
```

### Передача данных между серверами

```bash
# На сервере-получателе
nc -l 9999 > backup.tar.gz
# На сервере-отправителе
nc receiver 9999 < backup.tar.gz
```

### Тест SMTP

```bash
nc mail.example.com 25
EHLO test
MAIL FROM:<test@example.com>
QUIT
```

:::tip
Используйте `-z` только для сканирования, `-zv` для подробного вывода открытых/закрытых портов.
:::

:::warning
Опция `-e` создаёт серьёзную уязвимость. Используйте только в изолированных тестовых средах.
:::
