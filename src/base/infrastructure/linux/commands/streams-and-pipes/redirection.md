# Перенаправление ввода-вывода

Управление потоками данных в bash: stdin, stdout, stderr.

## Файловые дескрипторы

| Дескриптор | Имя | Описание |
|------------|-----|----------|
| `0` | stdin | Стандартный ввод |
| `1` | stdout | Стандартный вывод |
| `2` | stderr | Стандартная ошибка |

## Операторы перенаправления

| Оператор | Описание |
|----------|----------|
| `>` | stdout в файл (перезапись) |
| `>>` | stdout в файл (добавление) |
| `2>` | stderr в файл |
| `2>>` | stderr в файл (добавление) |
| `&>` | stdout и stderr в файл |
| `&>>` | stdout и stderr (добавление) |
| `2>&1` | stderr в stdout |
| `<` | stdin из файла |
| `<<` | heredoc |
| `<<<` | here string |
| `<>` | Чтение и запись |
| `>\|` | Перезапись (игнорирование noclobber) |

## Примеры

### 1. Перезапись файла

```bash
echo "Hello" > file.txt
```

### 2. Добавление в файл

```bash
echo "World" >> file.txt
```

### 3. Перенаправление stderr

```bash
command 2> error.log
```

### 4. Перенаправление stdout и stderr

```bash
command &> output.log
command > output.log 2>&1
```

### 5. Добавление stdout и stderr

```bash
command &>> output.log
```

### 6. Чтение из файла

```bash
sort < unsorted.txt
```

### 7. Heredoc

```bash
cat <<EOF
Line 1
Line 2
Line 3
EOF

# С табуляцией
cat <<-EOF
	Indented text
	Another line
	EOF
```

### 8. Heredoc с переменными

```bash
name="Alex"
cat <<EOF
Hello, $name!
Current date: $(date)
EOF
```

### 9. Heredoc без подстановки

```bash
cat <<'EOF'
$name will not be expanded
$(date) will not run
EOF
```

### 10. Here string

```bash
cat <<< "Hello World"
grep "pattern" <<< "search in this string"
read -r var <<< "value"
```

### 11. Отправка в /dev/null

```bash
command > /dev/null 2>&1
command &> /dev/null
```

### 12. Пользовательский файловый дескриптор

```bash
exec 3> custom.log
echo "To FD 3" >&3
exec 3>&-   # закрыть FD 3
```

### 13. Чтение из пользовательского FD

```bash
exec 4< input.txt
read -r line <&4
exec 4<&-   # закрыть FD 4
```

### 14. Перенаправление в pipe

```bash
command 2>&1 | grep "error"
```

### 15. Tee для stdout и файла

```bash
command | tee output.log
```

### 16. Noclobber (защита от перезаписи)

```bash
set -o noclobber
echo "test" > file.txt   # Ошибка если файл существует
echo "test" >| file.txt  # Принудительная перезапись
set +o noclobber
```

### 17. Обмен stdout и stderr

```bash
command 3>&1 1>&2 2>&3
```

## Практические сценарии

### Логирование с разделением потоков

```bash
command > >(tee stdout.log) 2> >(tee stderr.log >&2)
```

### Сохранение вывода и кода возврата

```bash
output=$(command 2>&1)
status=$?
```

### Чтение файла построчно

```bash
while IFS= read -r line; do
    echo "$line"
done < file.txt
```

### Запись в несколько файлов

```bash
echo "log entry" | tee -a file1.txt file2.txt file3.txt
```

### Heredoc для SQL

```bash
psql -d mydb <<'SQL'
SELECT * FROM users WHERE active = true;
SQL
```

### Heredoc для конфигурации

```bash
cat > /etc/nginx/conf.d/app.conf <<'EOF'
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
}
EOF
```

:::tip Порядок перенаправления
В `command > file 2>&1` сначала stdout направляется в файл, затем stderr присоединяется к stdout (который уже в файле). В `command 2>&1 > file` stderr идёт в оригинальный stdout, а stdout — в файл.
:::

:::warning Heredoc в скриптах
При использовании heredoc в функциях отступы должны совпадать с `<<-EOF`. Без `-` heredoc должен начинаться с начала строки.
:::

## Советы

:::tip Перенаправление всех потоков
Используйте `&>` для краткости вместо `> file 2>&1`. Оба варианта эквивалентны.
:::

:::warning Чтение и запись
Оператор `<>` открывает файл для чтения и записи. Используйте осторожно — позиция чтения и записи общая.
:::
