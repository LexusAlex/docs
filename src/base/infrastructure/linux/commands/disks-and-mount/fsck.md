# fsck

**Уровень:** Продвинутый

Проверка и восстановление файловых систем.

## Синтаксис

```bash
fsck [OPTIONS] [-t TYPE] [DEVICE]
fsck.TYPE [OPTIONS] [DEVICE]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-t TYPE` | Тип файловой системы |
| `-a` | Автоматическое исправление |
| `-y` | Ответить "да" на все вопросы |
| `-n` | Только проверка, без изменений |
| `-f` | Принудительная проверка |
| `-C` | Показать прогресс |
| `-V` | Подробный вывод |
| `-M` | Не проверять смонтированные ФС |
| `-N` | Показать, что было бы сделано |
| `-r` | Интерактивное исправление |
| `-p` | Автоматическое исправление (безопасное) |
| `-b SB` | Использовать суперблок с указанным номером |

## Команды для конкретных ФС

| Команда | Файловая система |
|---------|------------------|
| `fsck.ext4` / `e2fsck` | ext2/ext3/ext4 |
| `fsck.xfs` / `xfs_repair` | XFS |
| `fsck.btrfs` / `btrfs check` | Btrfs |
| `fsck.vfat` / `dosfsck` | FAT |
| `fsck.ntfs` / `ntfsfix` | NTFS |
| `fsck.f2fs` | F2FS |

## Примеры

### Базовая проверка

```bash
# Проверить раздел
sudo fsck /dev/sdb1

# С указанием типа
sudo fsck -t ext4 /dev/sdb1

# Автоматическое исправление
sudo fsck -a /dev/sdb1

# Ответить "да" на все вопросы
sudo fsck -y /dev/sdb1
```

### ext4 проверка

```bash
# Базовая проверка
sudo fsck.ext4 /dev/sdb1

# Автоматическое исправление
sudo fsck.ext4 -p /dev/sdb1

# Принудительная проверка
sudo fsck.ext4 -f /dev/sdb1

# С прогрессом
sudo fsck.ext4 -C 0 /dev/sdb1

# Только чтение (без изменений)
sudo fsck.ext4 -n /dev/sdb1

# Использовать альтернативный суперблок
sudo fsck.ext4 -b 32768 /dev/sdb1
```

### XFS проверка

```bash
# XFS использует xfs_repair вместо fsck
sudo xfs_repair /dev/sdb1

# Только проверка (без изменений)
sudo xfs_repair -n /dev/sdb1

# С журналом
sudo xfs_repair -L /dev/sdb1  # Очистить журнал (осторожно!)
```

### Btrfs проверка

```bash
# Проверка Btrfs
sudo btrfs check /dev/sdb1

# Проверка с исправлением
sudo btrfs check --repair /dev/sdb1

# Только чтение
sudo btrfs check --readonly /dev/sdb1

# Проверка данных
sudo btrfs check --check-data-csum /dev/sdb1
```

### Прогресс проверки

```bash
# Показать прогресс
sudo fsck -C 0 /dev/sdb1

# Для ext4 с подробностями
sudo fsck.ext4 -C 0 -f /dev/sdb1
```

## Практические сценарии

### Проверка при загрузке

```bash
# Проверить поле pass в fstab
cat /etc/fstab
# UUID=xxx /     ext4 defaults 0 1  ← pass=1, проверяется первой
# UUID=yyy /home ext4 defaults 0 2  ← pass=2, проверяется второй
# UUID=zzz /data ext4 defaults 0 0  ← pass=0, не проверяется

# Принудительная проверка при следующей загрузке
sudo touch /forcefsck

# Или через tune2fs
sudo tune2fs -C 26 /dev/sda1  # Счётчик превысит max mount count
```

### Проверка размонтированного раздела

```bash
# ОБЯЗАТЕЛЬНО размонтировать перед проверкой!
sudo umount /dev/sdb1
sudo fsck /dev/sdb1

# Проверка root (через live USB или recovery)
# Загрузиться с live USB
sudo fsck /dev/sda1
```

### Восстановление суперблока

```bash
# Найти резервные суперблоки
sudo mke2fs -n /dev/sdb1

# Восстановить с резервным суперблоком
sudo fsck.ext4 -b 32768 /dev/sdb1

# Или
sudo e2fsck -b 32768 /dev/sdb1
```

### Проверка всех разделов

```bash
# Проверить все разделы из fstab
sudo fsck -A

# С прогрессом
sudo fsck -AC 0

# Только не смонтированные
sudo fsck -M
```

### Принудительная проверка

```bash
# По количеству монтирований
sudo tune2fs -c 30 /dev/sda1  # Проверка каждые 30 монтирований

# По времени
sudo tune2fs -i 180d /dev/sda1  # Проверка каждые 180 дней

# Проверить настройки
sudo tune2fs -l /dev/sda1 | grep -i "check\|mount"
```

## Статусы возврата

| Код | Описание |
|-----|----------|
| 0 | Ошибок не найдено |
| 1 | Ошибки исправлены |
| 2 | Система нуждается в перезагрузке |
| 4 | Ошибки не исправлены |
| 8 | Ошибка операции |
| 16 | Использование или синтаксическая ошибка |
| 32 | Проверка отменена пользователем |
| 128 | Ошибка shared library |

## Практические сценарии

### Проверка в скриптах

```bash
#!/bin/bash
# Проверка всех разделов
for dev in /dev/sd{a,b,c}{1,2,3}; do
    if [ -b "$dev" ]; then
        echo "Checking $dev..."
        fsck -y "$dev"
        if [ $? -le 1 ]; then
            echo "$dev: OK"
        else
            echo "$dev: ERRORS"
        fi
    fi
done
```

### Проверка перед монтированием

```bash
# Проверить перед монтированием
if sudo fsck -y /dev/sdb1; then
    sudo mount /dev/sdb1 /mnt/data
else
    echo "Filesystem check failed!"
fi
```

:::warning Никогда не проверяйте смонтированные ФС!
Проверка смонтированной файловой системы может привести к повреждению данных. Всегда размонтируйте перед проверкой.
:::

:::tip root раздел
Для проверки корневого раздела используйте live USB или добавьте `fsck.mode=force` в параметры загрузки GRUB.
:::

:::warning XFS и fsck
Для XFS используйте `xfs_repair` вместо `fsck`. Команда `fsck.xfs` просто запускает `xfs_repair`.
:::

:::tip Резервные суперблоки
Если основной суперблок повреждён, используйте резервные. Найдите их: `sudo mke2fs -n /dev/sdb1`, затем: `sudo fsck -b 32768 /dev/sdb1`.
## См. также

- [mkfs](mkfs.md) — создание ФС
- [blkid](blkid.md) — тип файловой системы

:::
