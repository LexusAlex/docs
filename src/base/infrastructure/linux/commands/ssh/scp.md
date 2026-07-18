# scp

**Уровень:** Начинающий

Утилита для копирования файлов между хостами по протоколу SSH (Secure Copy Protocol).

## Синтаксис

```bash
scp [опции] источник назначение
```

## Опции

| Опция | Описание |
|-------|----------|
| `-r` | Рекурсивное копирование директорий |
| `-P порт` | Указать порт SSH |
| `-i файл` | Файл приватного ключа |
| `-C` | Сжатие данных |
| `-l кбит/с` | Ограничить полосу пропускания |
| `-v` | Подробный вывод (отладка) |
| `-q` | Тихий режим |
| `-3` | Копирование через локальную машину |
| `-o опция` | Дополнительные SSH-опции |
| `-B` | Пакетный режим (без запроса пароля) |
| `-c шифр` | Указать алгоритм шифрования |

## Формат путей

```
Локальный файл:       /path/to/file
Удалённый файл:       user@host:/path/to/file
```

## Копирование на удалённый сервер

### Копирование файла

```bash
scp file.txt user@server:/home/user/
```

### Копирование с новым именем

```bash
scp file.txt user@server:/home/user/new_name.txt
```

### Копирование в текущую директорию на сервере

```bash
scp file.txt user@server:
```

### Копирование нескольких файлов

```bash
scp file1.txt file2.txt file3.txt user@server:/home/user/
```

### Копирование с использованием wildcard

```bash
scp *.txt user@server:/home/user/
scp data_2024*.csv user@server:/data/
```

### Копирование директории (рекурсивно)

```bash
scp -r my_project/ user@server:/home/user/
```

## Копирование с удалённого сервера

### Копирование файла с сервера

```bash
scp user@server:/home/user/file.txt ./
```

### Копирование директории с сервера

```bash
scp -r user@server:/var/log/ ./logs/
```

### Копирование нескольких файлов с сервера

```bash
scp user@server:"/var/log/*.log" ./logs/
```

## Копирование между серверами

### Через локальную машину

```bash
scp -3 user1@server1:/path/file.txt user2@server2:/path/
```

### Напрямую (без -3)

```bash
scp user1@server1:/path/file.txt user2@server2:/path/
```

## Примеры

### Копирование с нестандартным портом

```bash
scp -P 2222 file.txt user@server:/home/user/
```

### Копирование с указанием ключа

```bash
scp -i ~/.ssh/deploy_key file.txt user@server:/var/www/
```

### Копирование с сжатием

```bash
scp -C large_file.tar.gz user@server:/tmp/
```

### Ограничение скорости (500 Кбит/с)

```bash
scp -l 500 big_file.iso user@server:/tmp/
```

### Рекурсивное копирование с портом и ключом

```bash
scp -r -P 2222 -i ~/.ssh/key my_dir/ user@server:/home/user/
```

### Копирование с подробным выводом

```bash
scp -v file.txt user@server:/home/user/
```

### Копирование без запроса пароля (пакетный режим)

```bash
scp -B file.txt user@server:/home/user/
```

### Копирование скрытых файлов

```bash
scp -r /home/user/.* user@server:/home/user/
```

### Копирование с изменением алгоритма шифрования

```bash
scp -c aes128-ctr file.txt user@server:/home/user/
```

### Копирование через jump host

```bash
scp -o ProxyCommand="ssh -W %h:%p jump@bastion" file.txt user@internal:/home/user/
```

### Копирование файла с пробелами в имени

```bash
scp "my file with spaces.txt" user@server:/home/user/
scp my\ file\ with\ spaces.txt user@server:/home/user/
```

### Копирование из директории с пробелами

```bash
scp user@server:"/path/to/my\ file.txt" ./
```

## Практические сценарии

### Деплой веб-приложения

```bash
scp -r ./dist/* user@server:/var/www/html/
```

### Резервное копирование с сервера

```bash
scp -r user@server:/var/backups/ ./backups/$(date +%Y%m%d)/
```

### Копирование конфигурации на сервер

```bash
scp nginx.conf user@server:/etc/nginx/nginx.conf
sudo scp -r ./sites-available/ user@server:/etc/nginx/
```

### Загрузка логов

```bash
scp user@server:/var/log/nginx/access.log ./logs/
scp user@server:"/var/log/app/*.log" ./logs/
```

### Копирование базы данных

```bash
# На сервере сделать дамп
ssh user@server "pg_dump mydb > /tmp/mydb.sql"

# Скопировать дамп
scp user@server:/tmp/mydb.sql ./
```

### Синхронизация конфигов

```bash
# Копировать изменённые конфиги
scp -r ./configs/ user@server:/etc/myapp/
ssh user@server "sudo systemctl restart myapp"
```

## scp vs rsync

| Критерий | scp | rsync |
|----------|-----|-------|
| Скорость копирования | Обычная | Быстрее (delta transfer) |
| Докачка | Нет | Да (`--partial`) |
| Синхронизация | Нет | Да (`--delete`) |
| Исключения | Нет | Да (`--exclude`) |
| Сжатие | `-C` | `-z` |
| Прогресс | Базовый | Подробный (`-P`) |
| Рекурсия | `-r` | `-a` |

:::tip Совет
Используйте `scp` для простого копирования нескольких файлов. Для синхронизации директорий, докачки больших файлов или исключения файлов используйте `rsync`.
:::

:::warning Внимание
`scp` не поддерживает докачку — при обрыве соединения копирование начнётся заново. Для больших файлов используйте `rsync --partial`.
:::

:::tip Совет
Для копирования через bastion-сервер используйте SSH-конфигурацию с `ProxyJump` вместо сложных команд `scp`.
:::

## Альтернативы

### rsync (для синхронизации)

```bash
rsync -avz -e ssh ./dir/ user@server:/path/dir/
```

### sftp (интерактивный режим)

```bash
sftp user@server
sftp> put file.txt
sftp> get file.txt
```

### tar через SSH (для множества файлов)

```bash
tar czf - ./dir/ | ssh user@server "tar xzf - -C /path/"
```

## Связки с другими командами

```bash
# Скачать логи с сервера в виде tar-архива
ssh user@host 'tar -czf - /var/log' > logs.tar.gz

# Загрузить проект на сервер через tar
tar -czf - ./project | ssh user@host 'tar -xzf - -C /opt/'

# Сделать резервную копию MySQL с удалённого сервера
ssh user@host 'mysqldump -u root db' > backup.sql

# Скачать логи и проверить наличие ошибок
scp user@host:/var/log/*.log /tmp/ && grep -i error /tmp/*.log

# Загрузить конфигурационные файлы на сервер
find . -name "*.conf" | tar -czf - -T - | ssh user@host 'tar -xzf - -C /etc/'

# Скачать директорию и сразу распаковать
ssh user@host 'tar -czf - /opt/app' | tar -xzf - -C ./backup/

# Сравнить локальный файл с удалённым
diff <(cat local.conf) <(ssh user@host 'cat /etc/app.conf')

# Массовое копирование файлов на несколько серверов
for h in host1 host2 host3; do scp app.tar.gz user@$h:/opt/; done

# Проверить целостность скопированного файла
ssh user@host 'md5sum /opt/app.tar.gz' && md5sum app.tar.gz
```

## См. также

- [rsync](rsync.md) — синхронизация файлов
- [ssh](ssh.md) — подключение
