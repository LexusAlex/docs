# strace

**Уровень:** Продвинутый

Трассировка системных вызовов процесса.

## Синтаксис

```bash
strace [options] command [args]
strace [options] -p PID
```

## Опции

| Опция | Описание |
|-------|----------|
| `-e trace=set` | Фильтр системных вызовов |
| `-f` | Следовать за дочерними процессами |
| `-p PID` | Присоединиться к процессу |
| `-o file` | Вывод в файл |
| `-c` | Статистика по вызовам |
| `-t` | Временные метки (секунды) |
| `-tt` | Временные метки (микросекунды) |
| `-ttt` | Epoch timestamp |
| `-T` | Время выполнения каждого вызова |
| `-s len` | Максимальная длина строк |
| `-v` | Подробный вывод |
| `-e signal=set` | Фильтр сигналов |
| `-y` | Печатать пути файловых дескрипторов |
| `-yy` | Печатать сокет-адреса |
| `-r` | Относительные метки времени |
| `-C` | Подсчёт + вывод (комбинация -c и обычного) |

## Фильтры -e trace

| Категория | Описание |
|-----------|----------|
| `file` | Файловые операции |
| `network` | Сетевые вызовы |
| `process` | Управление процессами |
| `signal` | Сигналы |
| `ipc` | Межпроцессное взаимодействие |
| `memory` | Управление памятью |
| `desc` | Файловые дескрипторы |
| `stat` | Получение информации о файлах |
| `%stat` | stat-вызовы |
| `%statfs` | statfs-вызовы |
| `%%stat` | stat/lstat/fstat |

## Примеры

### 1. Трассировка команды

```bash
strace ls -la
```

### 2. Запись в файл

```bash
strace -o trace.log ls -la
```

### 3. Присоединение к процессу

```bash
sudo strace -p 1234
```

### 4. Следование за дочерними процессами

```bash
strace -f bash -c 'echo test'
```

### 5. Фильтр файловых операций

```bash
strace -e trace=file ls /tmp
```

### 6. Фильтр сетевых вызовов

```bash
strace -e trace=network curl example.com
```

### 7. Фильтр процессов

```bash
strace -e trace=process bash -c 'sleep 1 & wait'
```

### 8. Статистика вызовов

```bash
strace -c ls -la
```

### 9. Статистика с трассировкой

```bash
strace -C ls -la
```

### 10. Временные метки

```bash
strace -tt ls /tmp
```

### 11. Время выполнения вызовов

```bash
strace -T ls /tmp
```

### 12. Увеличение длины строк

```bash
strace -s 1024 cat /etc/passwd
```

### 13. Показ путей файловых дескрипторов

```bash
strace -y ls /tmp
```

### 14. Трассировка нескольких категорий

```bash
strace -e trace=file,network curl example.com
```

### 15. Исключение вызовов

```bash
strace -e trace=!write ls /tmp
```

## Практические сценарии

### Поиск причин отказа в доступе

```bash
strace -e trace=file open,access command 2>&1 | grep -i denied
```

### Отладка сетевого приложения

```bash
strace -e trace=network -f -o app.log ./myapp
```

### Профилирование I/O

```bash
strace -e trace=read,write -c ./heavy-program
```

### Анализ открытия конфигов

```bash
strace -e trace=open,openat,stat,access ./app 2>&1 | grep -v ENOENT
```

### Проверка подключений к БД

```bash
strace -e trace=connect -f ./app 2>&1 | grep -i postgres
```

## Анализ вывода

```
open("/etc/passwd", O_RDONLY) = 3
read(3, "root:x:0:0:root:/root:/bin/bash\n"..., 4096) = 1234
close(3)                                = 0
```

| Часть | Описание |
|-------|----------|
| `open` | Системный вызов |
| `("/etc/passwd", O_RDONLY)` | Аргументы |
| `= 3` | Возвращаемое значение |
| `errno` | Код ошибки (если есть) |

:::tip strace vs ltrace
**strace** отслеживает системные вызовы (ядро). **ltrace** отслеживает вызовы библиотек (пользовательское пространство). Для полной картины используйте оба.
:::

:::warning Производительность
strace значительно замедляет traced процесс. Не используйте в production без необходимости. Для отладки в production лучше использовать `perf` или eBPF.
:::

## Советы

:::tip Поиск проблем с файлами
```bash
strace -e trace=file -f ./app 2>&1 | grep ENOENT
```
Показывает все файлы, которые приложение пытается открыть, но не находит.
:::

:::warning Права доступа
Для присоединения к чужим процессам (`-p PID`) требуются root-права или `CAP_SYS_PTRACE`.
:::

## Связки с другими командами

```bash
# Трассировка открытия файлов процессом
strace -e trace=open,read -p PID 2>&1 | head -20

# Сводная статистика системных вызовов
strace -c -p PID 2>&1 | head -20

# Трассировка сетевых вызовов (подключения)
strace -e trace=network -p PID 2>&1 | grep connect

# Трассировка записи, игнорируя ошибки файлов
strace -f -e trace=write command 2>&1 | grep -v ENOENT

# Трассировка файловых операций без ошибок
strace -e trace=file ls /tmp 2>&1 | grep -v ENOENT

# Самые частые системные вызовы процесса
strace -p PID -e trace=read,write 2>&1 | awk '{print $1}' | sort | uniq -c | sort -rn | head

# Поиск файлов, которые приложение пытается открыть
strace -e trace=open,openat -f ./app 2>&1 | grep -v ENOENT | grep -o '"[^"]*"' | sort -u

# Трассировка с выводом в файл и параллельным анализом
strace -o trace.log -f ./app & sleep 5 && grep -c "EACCES" trace.log

# Время выполнения системных вызовов (медленные операции)
strace -T -p PID 2>&1 | awk -F'<|>' '$NF+0 > 0.1 {print}' | head -20
```

## См. также

- [ltrace](ltrace.md) — трассировка библиотечных вызовов
- [lsof](lsof.md) — открытые файлы
