# expect

**Уровень:** Продвинутый

Утилита для автоматизации интерактивных программ. Позволяет скриптовать диалоги, ввод паролей и другие交互式交互и с командами.

## Синтаксис

```bash
expect скрипт.exp
expect -c "команда"
expect -f файл
expect -- опции скрипт.exp
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-c команды` | Выполнить команды expect |
| `-f файл` | Прочитать скрипт из файла |
| `--` | Конец опций |
| `-d`, `--debug` | Отладочный вывод |
| `-D N` | Отладка с уровнем N |
| `-i` | Интерактивный режим |
| `-b` | Читать скрипт из stdin |
| `-v` | Показать версию |

## Основные команды expect

### expect

Ожидает вывод от процесса, соответствующий шаблону.

```bash
expect "password:"
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "mypass\r" }
    timeout { puts "Таймаут!"; exit 1 }
}
```

### send

Отправляет строку процессу.

```bash
send "команда\r"           # \r — как нажатие Enter
send "yes\r"
send_user "Сообщение\n"   # вывод на экран пользователя
```

### spawn

Запускает программу.

```bash
spawn ssh user@server
spawn passwd user
spawn apt-get install package
```

### interact

Передаёт управление пользователю (после автоматической части).

```bash
spawn ssh server
expect "password:"
send "pass\r"
interact                 # теперь пользователь управляет
```

### timeout

Глобальная переменная таймаута (по умолчанию 10 секунд).

```bash
set timeout 30           # 30 секунд
set timeout -1           # бесконечно
```

### exp_continue

Продолжить ожидание (не выходить из блока expect).

```bash
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "pass\r" }
}
```

### exp_internal

Включить внутреннюю отладку.

```bash
exp_internal 1           # включить
exp_internal 0           # выключить
```

## Шаблоны

### Glob-шаблоны (по умолчанию)

```bash
expect "password:"           # точное совпадение
expect "*password*"          # содержит "password"
expect "user@*:?assword:"   # с подстановочными символами
```

### Регулярные выражения

```bash
expect -re {(\d+)\s+bytes}
set size $expect_out(1,string)
```

### Точное совпадение

```bash
expect -exact "password: "
```

### Несколько шаблонов (альтернативы)

```bash
expect {
    "yes/no"   { send "yes\r" }
    "password" { send "pass\r" }
    eof        { puts "Процесс завершён" }
    timeout    { puts "Таймаут" }
}
```

## Переменные

| Переменная | Описание |
|-----------|----------|
| `expect_out(0,string)` | Вся совпавшая строка |
| `expect_out(1,string)` | Первая группа захвата |
| `expect_out(2,string)` | Вторая группа захвата |
| `expect_out(buffer)` | Весь буфер до конца совпадения |
| `spawn_id` | ID текущего процесса |
| `timeout` | Текущий таймаут |
| `errorCode` | Код ошибки |
| `errorInfo` | Информация об ошибке |

## Примеры

### 1. Автоматический SSH-вход

```bash
#!/usr/bin/expect -f
set timeout 20
set host [lindex $argv 0]
set password [lindex $argv 1]

spawn ssh $host
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$password\r" }
}
interact
```

### 2. Смена пароля

```bash
#!/usr/bin/expect -f
set user [lindex $argv 0]
set old_pass [lindex $argv 1]
set new_pass [lindex $argv 2]

spawn passwd $user
expect "Current password:"
send "$old_pass\r"
expect "New password:"
send "$new_pass\r"
expect "Retype new password:"
send "$new_pass\r"
expect eof
```

### 3. SSH с ключом (первое подключение)

```bash
#!/usr/bin/expect -f
set timeout 30
set host [lindex $argv 0]

spawn ssh-copy-id $host
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "[lindex $argv 1]\r" }
}
expect eof
```

### 4. Интерактивная установка

```bash
#!/usr/bin/expect -f
set timeout 60

spawn sudo apt-get install -y mysql-server
expect {
    "New password for" { send "rootpass\r"; exp_continue }
    "Re-enter new password" { send "rootpass\r"; exp_continue }
    "default authentication plugin" { send "\r"; exp_continue }
    eof
}
```

### 5. Подключение к Cisco-оборудованию

```bash
#!/usr/bin/expect -f
set timeout 10
set host [lindex $argv 0]

spawn ssh admin@$host
expect "Password:"
send "cisco_pass\r"
expect "#"
send "terminal length 0\r"
expect "#"
send "show running-config\r"
expect "#"
send "exit\r"
expect eof
```

### 6. Telnet-сессия

```bash
#!/usr/bin/expect -f
set timeout 5

spawn telnet 192.168.1.1
expect "login:"
send "admin\r"
expect "Password:"
send "password\r"
expect ">"
send "show status\r"
expect ">"
send "exit\r"
expect eof
```

### 7. Интерактивный git

```bash
#!/usr/bin/expect -f
set timeout 30
set repo [lindex $argv 0]

spawn git clone $repo
expect {
    "Username" { send "user\r"; exp_continue }
    "Password" { send "pass\r" }
}
expect eof
```

### 8. Ожидание и проверка

```bash
#!/usr/bin/expect -f
set timeout 120

spawn docker build -t myapp .
expect {
    "Successfully built" { puts "Сборка успешна!" }
    "ERROR" { puts "Ошибка сборки!"; exit 1 }
    timeout { puts "Таймаут сборки!"; exit 1 }
}
expect eof
```

### 9. Множественные подключения

```bash
#!/usr/bin/expect -f
set servers {server1 server2 server3}
set password "mypass"

foreach server $servers {
    spawn ssh $server "uptime"
    expect {
        "yes/no" { send "yes\r"; exp_continue }
        "password:" { send "$password\r" }
    }
    expect eof
}
```

### 10. Передача файлов (scp с паролем)

```bash
#!/usr/bin/expect -f
set timeout 60
set file [lindex $argv 0]
set host [lindex $argv 1]
set dest [lindex $argv 2]

spawn scp $file $host:$dest
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "[lindex $argv 3]\r" }
}
expect eof
```

## Практические сценарии

### Автоматизация SSH-подключений

```bash
#!/usr/bin/expect -f
# connect.exp — подключение с автоматическим вводом пароля
set host [lindex $argv 0]
set user [lindex $argv 1]
set pass [lindex $argv 2]

spawn ssh $user@$host
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$pass\r" }
}
interact
```

### Пакетное выполнение команд на серверах

```bash
#!/usr/bin/expect -f
set servers {10.0.0.1 10.0.0.2 10.0.0.3}
set pass "admin123"

foreach s $servers {
    spawn ssh root@$s "apt-get update && apt-get upgrade -y"
    expect {
        "yes/no" { send "yes\r"; exp_continue }
        "password:" { send "$pass\r" }
    }
    expect eof
}
```

### Автоматическая настройка нового сервера

```bash
#!/usr/bin/expect -f
set host [lindex $argv 0]
set root_pass [lindex $argv 1]

spawn ssh root@$host
expect "password:"
send "$root_pass\r"
expect "#"

send "apt-get install -y nginx\r"
expect "#"

send "systemctl enable nginx\r"
expect "#"

send "ufw allow 80/tcp\r"
expect "#"

send "exit\r"
expect eof
```

## Советы

:::warning
Хранение паролей в expect-скриптах небезопасно. Используйте SSH-ключи, где это возможно.
:::

:::tip
Используйте `exp_internal 1` для отладки — expect покажет, что он ожидает и что получил.
:::

:::tip
Для простых задач рассмотрите `sshpass` — он проще, чем expect, для SSH с паролем.
:::

:::warning
expect-скрипты чувствительны к точному выводу программы. При обновлении ПО скрипт может сломаться.
:::

## Связки с другими командами

- **ssh** — автоматизация SSH-подключений
- **passwd** — смена паролей
- **apt/dnf** — установка пакетов с интерактивными вопросами
- **git** — клонирование репозиториев с авторизацией
- **scp** — копирование файлов с паролем

## См. также

- [ssh](../ssh/ssh.md) — SSH-подключения
- [bash-scripts](../bash-scripts/) — скрипты bash
- [nohup](../processes/nohup.md) — запуск фоновых процессов
