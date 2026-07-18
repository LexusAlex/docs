# mkfs

**Уровень:** Продвинутый

Создание файловых систем на разделах.

## Синтаксис

```bash
mkfs [-t TYPE] [OPTIONS] DEVICE
```

## Команды

| Команда | Файловая система |
|---------|------------------|
| `mkfs.ext4` | ext4 |
| `mkfs.xfs` | XFS |
| `mkfs.btrfs` | Btrfs |
| `mkfs.vfat` | FAT32 |
| `mkfs.ntfs` | NTFS |
| `mkfs.fat` | FAT (vfat) |
| `mkfs.exfat` | exFAT |
| `mkfs.f2fs` | F2FS |
| `mkswap` | Swap |

## Опции

| Опция | Описание |
|-------|----------|
| `-t TYPE` | Тип файловой системы |
| `-L LABEL` | Метка тома |
| `-b SIZE` | Размер блока |
| `-m PERCENT` | Зарезервированные блоки (%) |
| `-i BYTES` | Байт на inode |
| `-n LENGTH` | Длина имени файла |
| `-U UUID` | Установить UUID |
| `-q` | Тихий режим |
| `-f` | Принудительно |
| `-V` | Подробный вывод |

## Сравнение файловых систем

| ФС | Макс. размер | Макс. файл | Журналирование | Сжатие | Снимки |
|----|--------------|------------|----------------|--------|--------|
| ext4 | 1 EB | 16 TB | Да | Нет | Нет |
| XFS | 8 EB | 8 EB | Да | Нет | Да (reflink) |
| Btrfs | 16 EB | 16 EB | Да | Да | Да |
| F2FS | 16 TB | 3.94 TB | Да | Да | Да |
| FAT32 | 8 TB | 4 GB | Нет | Нет | Нет |
| NTFS | 256 TB | 16 TB | Да | Да | Да |

## Примеры

### ext4

```bash
# Базовое создание
sudo mkfs.ext4 /dev/sdb1

# С меткой
sudo mkfs.ext4 -L "Data" /dev/sdb1

# С размером блока 4K
sudo mkfs.ext4 -b 4096 /dev/sdb1

# С 5% зарезервированных блоков
sudo mkfs.ext4 -m 5 /dev/sdb1

# Без зарезервированных блоков (для данных)
sudo mkfs.ext4 -m 0 /dev/sdb1

# С конкретным UUID
sudo mkfs.ext4 -U "12345678-abcd-efgh-ijkl-123456789abc" /dev/sdb1

# Принудительно (если уже есть ФС)
sudo mkfs.ext4 -F /dev/sdb1
```

### XFS

```bash
# Базовое создание
sudo mkfs.xfs /dev/sdb1

# С меткой
sudo mkfs.xfs -L "Data" /dev/sdb1

# С размером блока
sudo mkfs.xfs -b size=4096 /dev/sdb1

# Принудительно
sudo mkfs.xfs -f /dev/sdb1
```

### Btrfs

```bash
# Базовое создание
sudo mkfs.btrfs /dev/sdb1

# С меткой
sudo mkfs.btrfs -L "Data" /dev/sdb1

# На нескольких устройствах (RAID)
sudo mkfs.btrfs -d raid1 -m raid1 /dev/sdb1 /dev/sdc1

# С конкретным UUID
sudo mkfs.btrfs -U "12345678-abcd-efgh-ijkl-123456789abc" /dev/sdb1
```

### FAT32 / exFAT

```bash
# FAT32
sudo mkfs.vfat -F 32 /dev/sdb1

# FAT32 с меткой
sudo mkfs.vfat -F 32 -n "USB_DRIVE" /dev/sdb1

# exFAT
sudo mkfs.exfat /dev/sdb1

# exFAT с меткой
sudo mkfs.exfat -n "USB_DRIVE" /dev/sdb1
```

### Swap

```bash
# Создать swap раздел
sudo mkswap /dev/sdb1

# С меткой
sudo mkswap -L "SWAP" /dev/sdb1

# С конкретным UUID
sudo mkswap -U "12345678-abcd-efgh-ijkl-123456789abc" /dev/sdb1

# Включить
sudo swapon /dev/sdb1
```

## Практические сценарии

### Подготовка диска для данных

```bash
# Создать раздел
sudo parted /dev/sdb mklabel gpt
sudo parted /dev/sdb mkpart primary ext4 0% 100%

# Создать ФС без зарезервированных блоков
sudo mkfs.ext4 -m 0 -L "Data" /dev/sdb1

# Монтировать
sudo mkdir /mnt/data
sudo mount /dev/sdb1 /mnt/data
```

### Подготовка USB-накопителя

```bash
# Создать раздел
sudo fdisk /dev/sdb
# n → p → 1 → (default) → (default) → w

# FAT32 для совместимости
sudo mkfs.vfat -F 32 -n "USB" /dev/sdb1

# Или exFAT для больших файлов
sudo mkfs.exfat -n "USB" /dev/sdb1
```

### Выбор файловой системы

```bash
# Для корневого раздела (надёжность)
sudo mkfs.ext4 -m 2 /dev/sda1

# Для базы данных (производительность)
sudo mkfs.xfs /dev/sdb1

# Для файлового хранилища (сжатие, снимки)
sudo mkfs.btrfs /dev/sdc1

# Для SSD (оптимизация)
sudo mkfs.ext4 -m 0 -O ^has_journal /dev/nvme0n1p1
```

### Проверка после создания

```bash
# Проверить созданную ФС
sudo blkid /dev/sdb1

# Проверить целостность
sudo fsck /dev/sdb1

# Проверить метку
sudo e2label /dev/sdb1
```

:::tip Зарезервированные блоки
Для разделов с данными (не корневых) устанавливайте `-m 0` — иначе 5% диска будет зарезервировано для root без необходимости.
:::

:::warning Данные будут потеряны
Создание файловой системы уничтожает все данные на разделе. Убедитесь, что выбрали правильное устройство.
:::

:::tip ext4 vs XFS
ext4 — универсальный выбор, хорошо подходит для большинства случаев. XFS лучше для больших файлов и высокой нагрузки на I/O. Btrfs — для снимков и сжатия.
:::

:::warning SSD и discard
Для SSD не используйте `-O ^has_journal`. Вместо этого настройте `discard` в fstab или используйте периодическую команду `fstrim`.
:::

## См. также

- [fdisk](fdisk.md) — разметка дисков
- [mount](mount.md) — монтирование
