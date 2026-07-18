# curl

Универсальный клиент для передачи данных по протоколам HTTP, HTTPS, FTP и др.

## Синтаксис

```bash
curl [опции] URL
```

## Опции

| Опция | Описание |
|-------|----------|
| `-X метод` | HTTP-метод (GET, POST, PUT, DELETE) |
| `-H "заголовок"` | Добавить заголовок |
| `-d "данные"` | Тело запроса (POST/PUT) |
| `-o файл` | Сохранить в файл (с именем) |
| `-O` | Сохранить с оригинальным именем |
| `-L` | Следовать редиректам |
| `-k` | Игнорировать SSL-ошибки |
| `-v` | Подробный вывод |
| `-s` | Тихий режим |
| `-S` | Показать ошибки в тихом режиме |
| `-u логин:пароль` | Базовая авторизация |
| `-b файл` | Файл cookies |
| `-c файл` | Сохранить cookies |
| `-A строка` | User-Agent |
| `-I` | Только заголовки ответа |
| `-w формат` | Формат вывода после выполнения |
| `-x прокси` | Использовать прокси |
| `-e URL` | Referer |
| `--data-urlencode` | URL-кодирование данных |
| `-F "поле=значение"` | multipart/form-data |
| `--connect-timeout` | Таймаут подключения |
| `--max-time` | Максимальное время выполнения |

## Примеры

### GET-запрос

```bash
curl https://api.example.com/data
```

### POST с JSON

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"test","value":123}' \
  https://api.example.com/data
```

### POST с формой

```bash
curl -X POST -d "username=admin&password=secret" \
  https://example.com/login
```

### Сохранить в файл

```bash
curl -o page.html https://example.com
```

### С оригинальным именем

```bash
curl -O https://example.com/file.zip
```

### Следовать редиректам

```bash
curl -L https://short.url/abc
```

### Подробный вывод

```bash
curl -v https://example.com
```

### Тихий режим с ошибками

```bash
curl -sS https://api.example.com
```

### Базовая авторизация

```bash
curl -u admin:password https://api.example.com/admin
```

### С заголовками

```bash
curl -H "Authorization: Bearer token123" \
  -H "Accept: application/json" \
  https://api.example.com/data
```

### PUT-запрос

```bash
curl -X PUT -H "Content-Type: application/json" \
  -d '{"name":"updated"}' \
  https://api.example.com/data/1
```

### DELETE-запрос

```bash
curl -X DELETE https://api.example.com/data/1
```

### Только заголовки

```bash
curl -I https://example.com
```

### Загрузка файла

```bash
curl -F "file=@/path/to/file.txt" https://example.com/upload
```

### С прокси

```bash
curl -x http://proxy:8080 https://example.com
```

### С cookies

```bash
curl -b cookies.txt -c cookies.txt https://example.com
```

### Игнорировать SSL

```bash
curl -k https://self-signed.example.com
```

### Проверка HTTP-статуса

```bash
curl -s -o /dev/null -w "%{http_code}" https://example.com
```

### С таймаутом

```bash
curl --connect-timeout 10 --max-time 30 https://example.com
```

### Скачивание с прогрессом

```bash
curl -# -O https://example.com/large-file.zip
```

### JSON API — получить данные

```bash
curl -s https://api.example.com/users | jq .
```

### JSON API — создать запись

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}' \
  https://api.example.com/users
```

## Практические сценарии

### Проверка API

```bash
curl -s https://api.example.com/health | jq .
```

### Скачивание файлов в скрипте

```bash
curl -sSfL -o /tmp/file.zip https://example.com/file.zip || {
    echo "Ошибка загрузки"
    exit 1
}
```

### Проверка SSL-сертификата

```bash
curl -vI https://example.com 2>&1 | grep -i "expire\|subject"
```

### Мониторинг API

```bash
status=$(curl -s -o /dev/null -w "%{http_code}" https://api.example.com/health)
[ "$status" != "200" ] && echo "API недоступен: $status"
```

:::tip
Используйте `-sS` вместо `-s`: тихий режим, но ошибки всё равно отображаются.
:::

:::warning
Будьте осторожны с `-k`: отключение проверки SSL делает соединение уязвимым для MITM-атак.
:::

## Связки с другими командами

```bash
# Парсинг JSON-ответа с помощью jq
curl -s https://api.github.com/users/octocat | jq '.name'

# Проверка заголовков ответа (сервер, тип контента)
curl -sI https://example.com | grep -i "server\|content-type"

# Получить только HTTP-статус код
curl -s -o /dev/null -w "%{http_code}" https://example.com

# Узнать свой публичный IP через API
curl -s https://httpbin.org/ip | jq '.origin'

# Извлечь заголовок <title> из HTML-страницы
curl -sL https://example.com | grep -oP '<title>\K[^<]+'

# POST-запрос с JSON-телом и парсинг ответа
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"key":"value"}' https://api.example.com/data | jq

# Детальная статистика таймингов (создайте curl-format.txt заранее)
curl -w "@curl-format.txt" -s -o /dev/null https://example.com

# Удалить HTML-теги из страницы и посмотреть первые строки
curl -s https://example.com | sed 's/<[^>]*>//g' | head -20

# Проверить HTTP-статус для списка URL из файла
for url in $(cat urls.txt); do
  curl -s -o /dev/null -w "$url: %{http_code}\n" "$url"
done

# Повторные попытки при ошибках (3 попытки с задержкой 5 сек)
curl -s --retry 3 --retry-delay 5 https://api.example.com/data

# Сравнение времени ответа двух серверов
echo "Server 1:"; curl -s -o /dev/null -w "%{time_total}s\n" https://server1.example.com
echo "Server 2:"; curl -s -o /dev/null -w "%{time_total}s\n" https://server2.example.com
```
