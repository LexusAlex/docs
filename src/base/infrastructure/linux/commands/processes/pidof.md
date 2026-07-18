# pidof

**Уровень:** Средний

Находит PID запущенного процесса по имени.

## Синтаксис

```bash
pidof [опции] имя_процесса
```

## Опции

| Опция | Описание |
|-------|----------|
| `-s` | Вывести только один PID (одиночный режим) |
| `-x` | Учитывать скрипты (с шебангом) |
| `-o PID` | Исключить PID из результатов |
| `-c` | Только процессы с корневым каталогом (root) |
| `-d разделитель` | Задать разделитель между PID |

## Примеры

### Найти PID процесса

```bash
pidof nginx
```

### Один PID (для скриптов)

```bash
pidof -s sshd
```

### Для скриптов (shell, python)

```bash
pidof -x bash
```

### Исключить свой PID

```bash
pidof -o $$ bash
```

### Исключить конкретный PID

```bash
pidof -o 1234 nginx
```

### С разделителем запятая

```bash
pidof -d ", " nginx
```

### Проверка запущен ли процесс

```bash
if pidof -s nginx > /dev/null; then
    echo "nginx работает"
fi
```

### Перезапуск процесса

```bash
kill $(pidof -s myapp) && myapp &
```

### Все экземпляры

```bash
pidof java
```

### Использование в скриптах

```bash
PID=$(pidof -s my-daemon)
echo "PID демона: $PID"
```

### Скрипты Python

```bash
pidof -x python3
```

### Скрипты Node.js

```bash
pidof -x node
```

### Проверка единственного экземпляра

```bash
if [ $(pidof -c myapp | wc -w) -gt 1 ]; then
    echo "Ошибка: несколько экземпляров myapp"
fi
```

## Практические сценарии

### Запрет повторного запуска

```bash
#!/bin/bash
if pidof -s "$0" > /dev/null; then
    echo "Скрипт уже запущен"
    exit 1
fi
# основной код
```

### Мониторинг с автоматическим перезапуском

```bash
while true; do
    if ! pidof -s myservice > /dev/null; then
        myservice &
    fi
    sleep 10
done
```

### Остановка всех экземпляров

```bash
for pid in $(pidof myapp); do
    kill "$pid"
done
```

:::tip
`pidof` проще `pgrep`, когда нужно найти PID по точному имени исполняемого файла.
:::

:::warning
`pidof` ищет по имени бинарника, а не по командной строке. Для поиска по аргументам используйте `pgrep -f`.
:::

## См. также

- [pgrep](pgrep.md) — поиск PID по имени
- [kill](kill.md) — отправка сигнала

