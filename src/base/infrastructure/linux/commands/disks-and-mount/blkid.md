# blkid

Просмотр информации о блочных устройствах (UUID, LABEL, TYPE).

## Синтаксис

```bash
blkid [OPTIONS] [DEVICE]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-o FORMAT` | Формат вывода |
| `-s TAG` | Показать только указанный тег |
| `-p` | Низкоуровневая проверка (пробный доступ) |
| `-c FILE` | Файл кэша |
| `-g` | Очистить кэш |
| `-l` | Найти устройство по тегу |
| `-L LABEL` | Найти устройство по метке |
| `-U UUID` | Найти устройство по UUID |
| `-d` | Только несъёмные устройства |
| `-i` | Показать информацию о I/O |
| `--match-token TOKEN` | Фильтр по тегу |

## Форматы вывода (-o)

| Формат | Описание |
|--------|----------|
| `full` | Полный вывод (по умолчанию) |
| `value` | Только значение |
| `list` | Список в формате: NAME=value |
| `device` | Только имя устройства |
| `export` | Формат export (KEY=VALUE) |
| `udev` | Совместимый с udev |

## Теги

| Тег | Описание |
|-----|----------|
| `UUID` | Уникальный идентификатор |
| `LABEL` | Метка тома |
| `TYPE` | Тип файловой системы |
| `PARTUUID` | UUID раздела (GPT) |
| `PARTLABEL` | Метка раздела (GPT) |
| `PTTYPE` | Тип таблицы разделов |
| `SEC_TYPE` | Тип безопасности |
| `USAGE` | Использование (filesystem, raid, crypto) |

## Примеры

### Просмотр информации

```bash
# Все устройства
sudo blkid

# Конкретное устройство
sudo blkid /dev/sda1

# Пример вывода:
# /dev/sda1: UUID="12345678-abcd-efgh-ijkl-123456789abc" TYPE="ext4" LABEL="root"
# /dev/sda2: UUID="ABCD-1234" TYPE="vfat" LABEL="EFI"
```

### Формат вывода

```bash
# Только значение (для скриптов)
sudo blkid -o value -s UUID /dev/sda1

# Список
sudo blkid -o list

# Export формат
sudo blkid -o export /dev/sda1

# Устройство
sudo blkid -o device -s UUID -U "12345678-abcd"
```

### Поиск по тегам

```bash
# По UUID
sudo blkid -U "12345678-abcd-efgh-ijkl-123456789abc"

# По метке
sudo blkid -L "root"

# Только UUID
sudo blkid -s UUID /dev/sda1

# Только TYPE
sudo blkid -s TYPE /dev/sda1

# Только LABEL
sudo blkid -s LABEL /dev/sda1
```

### Конкретные теги

```bash
# PARTUUID (для GPT)
sudo blkid -s PARTUUID /dev/sda1

# PARTLABEL
sudo blkid -s PARTLABEL /dev/sda1

# PTTYPE (тип таблицы разделов)
sudo blkid -s PTTYPE /dev/sda
```

### Вывод для fstab

```bash
# Получить UUID для fstab
sudo blkid -o value -s UUID /dev/sda1

# Полная строка для fstab
echo "UUID=$(sudo blkid -o value -s UUID /dev/sda1) / ext4 defaults 0 1"
```

## Практические сценарии

### Подготовка fstab

```bash
# Получить все UUID
sudo blkid -o list

# Создать строки для fstab
for dev in /dev/sd{a,b}1; do
    if [ -b "$dev" ]; then
        UUID=$(sudo blkid -o value -s UUID "$dev")
        TYPE=$(sudo blkid -o value -s TYPE "$dev")
        echo "UUID=$UUID  /mountpoint  $TYPE  defaults  0  2"
    fi
done
```

### Проверка файловой системы

```bash
# Определить тип ФС
sudo blkid -s TYPE /dev/sdb1

# Проверить, отформатирован ли раздел
sudo blkid /dev/sdb1
# Если пустой вывод — раздел не отформатирован
```

### Поиск устройства

```bash
# Найти устройство по UUID
DEVICE=$(sudo blkid -o device -s UUID -U "12345678-abcd")
echo "Device: $DEVICE"

# Найти устройство по метке
DEVICE=$(sudo blkid -o device -s LABEL -L "Data")
echo "Device: $DEVICE"
```

### Скрипты

```bash
#!/bin/bash
# Проверка, смонтирован ли раздел по UUID
UUID="12345678-abcd-efgh-ijkl-123456789abc"
DEVICE=$(sudo blkid -o device -s UUID -U "$UUID")

if [ -n "$DEVICE" ]; then
    echo "Device $DEVICE found with UUID $UUID"
else
    echo "Device with UUID $UUID not found"
fi
```

### Проверка перед монтированием

```bash
# Проверить тип ФС перед монтированием
TYPE=$(sudo blkid -o value -s TYPE /dev/sdb1)
case "$TYPE" in
    ext4|ext3|ext2)
        sudo mount -t ext4 /dev/sdb1 /mnt/data
        ;;
    xfs)
        sudo mount -t xfs /dev/sdb1 /mnt/data
        ;;
    *)
        echo "Unknown filesystem: $TYPE"
        ;;
esac
```

:::tip blkid vs lsblk
`blkid` показывает UUID, LABEL и TYPE файловых систем. `lsblk` показывает структуру блочных устройств. Используйте обе команды вместе для полной картины.
:::

:::warning Права доступа
Для полного доступа к информации о блочных устройствах используйте `sudo`. Без sudo blkid может показать неполную информацию.
:::

:::tip UUID vs PARTUUID
`UUID` — идентификатор файловой системы. `PARTUUID` — идентификатор раздела (GPT). Для fstab используйте `UUID` — он уникальнее и надёжнее.
:::

:::warning Кэш
blkid использует кэш `/run/blkid/blkid.tab`. При изменении разделов может потребоваться `sudo blkid -g` для очистки кэша.
:::
