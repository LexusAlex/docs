# grep

`grep` - это поиск текстовых строк по шаблону.

## Поиск внутри файлов

````shell
grep -Rnwi / -e ""
````

## Ключи

- `-i` - игнорировать регистр
- `-R` - рекурсивный поиск в директориях + следовать символическим ссылкам
- `-n` - показать номера строк при совпадении
- `-w` - искать целые слова

## Связки с другими командами

```bash
# Найти процессы nginx, исключая сам grep
ps aux | grep nginx | grep -v grep

# Последние 20 ошибок из системного лога
cat /var/log/syslog | grep -i error | tail -20

# Найти лог-файлы, содержащие OOM
find . -name "*.log" | xargs grep -l "OOM"

# Кто слушает порт 80
ss -tlnp | grep :80

# Ошибки и исключения в логах Docker (включая stderr)
docker logs container 2>&1 | grep -i exception

# Подсчитать количество ответов 200 в логах nginx
journalctl -u nginx | grep -c "200"

# Только IPv4-адреса из вывода ip addr
ip addr | grep inet | grep -v inet6

# Только физические диски в выводе df
df -h | grep -E "^(\/dev|Filesystem)"

# Пользователи с реальными оболочками
cat /etc/passwd | grep -v nologin | grep -v false

# Текущие залогиненные пользователи
last | grep -i "still logged in"
```