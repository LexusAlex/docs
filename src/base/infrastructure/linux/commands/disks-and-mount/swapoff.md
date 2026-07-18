# swapoff

**Уровень:** Средний

Деактивация разделов и файлов подкачки (swap).

## Синтаксис

```bash
swapoff [OPTIONS] [DEVICE]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-a` | Деактивировать все swap |
| `-v` | Подробный вывод |
| `--discard-pages` | Освобождать страницы discard |
| `--fixpgsz` | Исправить размер страницы |
| `--show[=COLUMN]` | Показать информацию |

## Примеры

### Деактивация swap

```bash
# Деактивировать конкретный swap
sudo swapoff /dev/sdb1

# Деактивировать swap файл
sudo swapoff /swapfile

# Деактивировать все swap
sudo swapoff -a
```

### Проверка перед деактивацией

```bash
# Показать активные swap
swapon -s

# Проверить использование памяти
free -h

# Проверить, достаточно ли RAM
# Если swap используется, убедитесь, что хватит RAM
```

## Практические сценарии

### Изменение размера swap файла

```bash
# Деактивировать
sudo swapoff /swapfile

# Пересоздать с новым размером
sudo rm /swapfile
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile

# Включить
sudo swapon /swapfile

# Проверить
swapon --show
```

### Замена swap раздела на swap файл

```bash
# Деактивировать swap раздел
sudo swapoff /dev/sdb1

# Создать swap файл
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile

# Включить swap файл
sudo swapon /swapfile

# Обновить fstab
sudo nano /etc/fstab
# Удалить строку для /dev/sdb1
# Добавить: /swapfile none swap sw 0 0
```

### Обслуживание файловой системы

```bash
# Деактивировать swap для проверки диска
sudo swapoff /dev/sdb1

# Проверить файловую систему
sudo fsck /dev/sdb1

# Включить обратно
sudo swapon /dev/sdb1
```

### Перемещение swap

```bash
# Деактивировать старый swap
sudo swapoff /dev/sdb1

# Создать swap на новом диске
sudo mkswap /dev/sdc1
sudo swapon /dev/sdc1

# Обновить fstab
# Заменить UUID в строке swap
```

### Шифрованный swap

```bash
# Деактивировать swap
sudo swapoff /dev/sdb1

# Настроить шифрование
sudo cryptsetup luksFormat /dev/sdb1
sudo cryptsetup luksOpen /dev/sdb1 cryptswap

# Создать swap на зашифрованном разделе
sudo mkswap /dev/mapper/cryptswap
sudo swapon /dev/mapper/cryptswap
```

### Мониторинг swap

```bash
# Проверить, используется ли swap
swapon -s

# Если swap используется, проверить процессы
for pid in /proc/[0-9]*; do
    if [ -r "$pid/smaps" ]; then
        swap=$(awk '/^Swap:/{sum += $2} END{print sum}' "$pid/smaps")
        if [ "$swap" -gt 0 ]; then
            name=$(cat "$pid/comm")
            echo "$pid ($name): $swap kB"
        fi
    fi
done 2>/dev/null | sort -k2 -n -r | head -10
```

## Безопасное отключение

```bash
# Проверить использование swap
free -h
swapon -s

# Если swap используется, убедиться что хватит RAM
# Если RAM достаточно, можно отключать
sudo swapoff -a

# Проверить
free -h
```

## Практические сценарии

### Скрипт для безопасного отключения

```bash
#!/bin/bash
# Безопасное отключение swap

# Проверить использование
SWAP_USED=$(free -m | awk '/Swap/ {print $3}')
SWAP_TOTAL=$(free -m | awk '/Swap/ {print $2}')
RAM_FREE=$(free -m | awk '/Mem/ {print $4}')

echo "Swap used: ${SWAP_USED}MB / ${SWAP_TOTAL}MB"
echo "RAM free: ${RAM_FREE}MB"

if [ "$SWAP_USED" -gt "$RAM_FREE" ]; then
    echo "ERROR: Not enough RAM to disable swap"
    exit 1
fi

echo "Disabling swap..."
sudo swapoff -a

if [ $? -eq 0 ]; then
    echo "Swap disabled successfully"
else
    echo "Failed to disable swap"
    exit 1
fi
```

:::warning Достаточно RAM
Перед отключением swap убедитесь, что в системе достаточно оперативной памяти. Если swap используется, его отключение может вызвать OOM (Out of Memory).
:::

:::tip swapoff -a
`swapoff -a` отключает все swap из fstab. Для отключения конкретного устройства укажите его: `sudo swapoff /dev/sdb1`.
:::

:::warning Шифрованный swap
При работе с зашифрованным swap сначала деактивируйте swap, затем закройте LUKS: `sudo cryptsetup luksClose cryptswap`.
:::

:::tip Проверка после отключения
После отключения swap проверьте `free -h` — убедитесь, что система стабильна и RAM достаточно.
## См. также

- [swapon](swapon.md) — включение swap
- [free](monitoring/free.md) — использование памяти

:::
