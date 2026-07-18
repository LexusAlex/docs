# lsblk

**Уровень:** Средний

Просмотр информации о блочных устройствах.

## Синтаксис

```bash
lsblk [OPTIONS] [DEVICE]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-a` | Показать все устройства (включая пустые) |
| `-b` | Размер в байтах |
| `-f` | Информация о файловых системах |
| `-m` | Права доступа и владелец |
| `-o` | Выбрать столбцы для вывода |
| `-p` | Полные пути к устройствам |
| `-t` | Информация о топологии |
| `-d` | Только диски (без разделов) |
| `-J` | Вывод в JSON |
| `-P` | Вывод в формате key=value |
| `-n` | Без заголовков |
| `-e` | Исключить устройства |
| `-i` | Отступы для ASCII |
| `-l` | Плоский список (не дерево) |

## Столбцы вывода

| Столбец | Описание |
|---------|----------|
| `NAME` | Имя устройства |
| `KNAME` | Внутреннее имя ядра |
| `MAJ:MIN` | Major:Minor номера |
| `RM` | Съёмное устройство |
| `SIZE` | Размер |
| `RO` | Только для чтения |
| `TYPE` | Тип (disk, part, lvm, loop) |
| `MOUNTPOINT` | Точка монтирования |
| `FSTYPE` | Тип файловой системы |
| `UUID` | UUID файловой системы |
| `LABEL` | Метка файловой системы |
| `MODEL` | Модель устройства |
| `SERIAL` | Серийный номер |
| `VENDOR` | Производитель |
| `WWN` | World Wide Name |
| `TRAN` | Транспорт (sata, nvme, usb) |
| `HOTPLUG` | Поддержка горячего подключения |
| `ALIGNMENT` | Выравнивание |
| `MIN-IO` | Минимальный размер I/O |
| `OPT-IO` | Оптимальный размер I/O |
| `PHY-SEC` | Физический сектор |
| `LOG-SEC` | Логический сектор |
| `ROTA` | Вращающееся устройство |
| `SCHED` | Планировщик I/O |
| `RQ-SIZE` | Размер очереди запросов |
| `PARTTYPE` | Тип раздела |
| `PARTLABEL` | Метка раздела |
| `PARTUUID` | UUID раздела |

## Примеры

### Базовый просмотр

```bash
# Все блочные устройства (дерево)
lsblk

# Пример вывода:
# NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
# sda      8:0    0 238.5G  0 disk
# ├─sda1   8:1    0   512M  0 part /boot/efi
# └─sda2   8:2    0   238G  0 part
#   └─vg0-root 253:0  0   238G  0 lvm  /
# sr0     11:0    1  1024M  0 rom

# Только диски
lsblk -d

# Плоский список
lsblk -l
```

### Информация о файловых системах

```bash
# Тип ФС, UUID, точка монтирования
lsblk -f

# Пример вывода:
# NAME   FSTYPE LABEL UUID                                 MOUNTPOINT
# sda
# ├─sda1 vfat         ABCD-1234                            /boot/efi
# └─sda2 ext4         12345678-abcd-efgh-ijkl-123456789abc
#   └─vg0-root ext4   12345678-abcd-efgh-ijkl-123456789abc /

# Конкретное устройство
lsblk -f /dev/sda
```

### Права доступа

```bash
# Права, владелец, группа
lsblk -m

# Пример вывода:
# NAME          SIZE OWNER GROUP  MODE
# sda         238.5G root  disk   brw-rw----
# ├─sda1        512M root  disk   brw-rw----
# └─sda2        238G root  disk   brw-rw----
```

### Выбор столбцов

```bash
# Выбрать конкретные столбцы
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINT

# С моделью и серийным номером
lsblk -o NAME,SIZE,MODEL,SERIAL,VENDOR

# С транспортом
lsblk -o NAME,SIZE,TRAN,HOTPLUG

# Без заголовков (для скриптов)
lsblk -no NAME,SIZE
```

### Топология

```bash
# Информация о топологии
lsblk -t

# Пример вывода:
# NAME   ALIGNMENT MIN-IO OPT-IO PHY-SEC LOG-SEC ROTA SCHED RQ-SIZE  RA WSAME
# sda          0    512      0     512     512    1 cfq       128 256    0B
```

### JSON вывод

```bash
# JSON формат
lsblk -J

# JSON для конкретного устройства
lsblk -J /dev/sda

# Сохранить в файл
lsblk -J > disks.json
```

### Полные пути

```bash
# Полные пути к устройствам
lsblk -p

# Пример вывода:
# NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
# /dev/sda      8:0    0 238.5G  0 disk
# /dev/sda1     8:1    0   512M  0 part /boot/efi
```

### Проверка конкретного устройства

```bash
# Информация о диске
lsblk /dev/sda

# Информация о разделе
lsblk /dev/sda1

# Информация о LVM
lsblk /dev/vg0/root
```

## Практические сценарии

### Проверка монтирования

```bash
# Какие разделы смонтированы
lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT

# Несмонтированные разделы
lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT | grep -v "/"
```

### Подготовка к монтированию

```bash
# Найти UUID для fstab
lsblk -o NAME,UUID,FSTYPE,SIZE

# Проверить тип файловой системы
lsblk -f /dev/sdb1
```

### Скрипты

```bash
# Получить список дисков
lsblk -dno NAME

# Получить размер диска
lsblk -bno SIZE /dev/sda

# Проверить, съёмное ли устройство
lsblk -dno RM /dev/sdb
```

### Поиск устройства

```bash
# Найти устройство по UUID
lsblk -o NAME,UUID | grep "12345678-abcd"

# Найти устройство по точке монтирования
lsblk -o NAME,MOUNTPOINT | grep "/home"

# Найти NVMe диски
lsblk -d -o NAME,TRAN | grep nvme
```

:::tip Дерево устройств
`lsblk` показывает иерархию: диск → разделы → LVM. Это помогает понять структуру хранения.
:::

:::warning LVM и RAID
Для LVM и RAID `lsblk` показывает логические устройства. Для полной информации используйте `lvs`, `vgs`, `pvs` (LVM) или `mdadm --detail` (RAID).
:::

:::tip JSON вывод
`lsblk -J` удобен для автоматической обработки в скриптах. Используйте `jq` для парсинга.
:::

:::warning Устройства без файловых систем
Пустые разделы или разделы с неизвестной файловой системой не покажут FSTYPE. Используйте `blkid` для определения типа.
## См. также

- [fdisk](fdisk.md) — разметка дисков
- [blkid](blkid.md) — UUID и тип ФС
- [mount](mount.md) — монтирование

:::
