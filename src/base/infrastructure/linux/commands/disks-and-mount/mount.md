# mount

**Уровень:** Средний

Монтирование файловых систем.

## Синтаксис

```bash
mount [OPTIONS] DEVICE MOUNTPOINT
mount [OPTIONS] [-t TYPE] [-o OPTIONS] DEVICE MOUNTPOINT
mount -a
```

## Опции

| Опция | Описание |
|-------|----------|
| `-t TYPE` | Тип файловой системы |
| `-o OPTIONS` | Параметры монтирования |
| `-a` | Монтировать все из fstab |
| `-r` | Только для чтения (ro) |
| `-w` | Для чтения и записи (rw) |
| `-L LABEL` | Монтировать по метке |
| `-U UUID` | Монтировать по UUID |
| `-n` | Не записывать в /etc/mtab |
| `-v` | Подробный вывод |
| `-B` | Bind mount |
| `-o remount` | Перемонтировать |
| `--bind` | Привязка директории |
| `--make-shared` | Общий mount namespace |

## Параметры монтирования (-o)

| Параметр | Описание |
|----------|----------|
| `ro` | Только чтение |
| `rw` | Чтение и запись (по умолчанию) |
| `noexec` | Запрет выполнения файлов |
| `nosuid` | Игнорировать suid/sgid |
| `nodev` | Игнорировать устройства |
| `remount` | Перемонтировать |
| `bind` | Привязка директории |
| `defaults` | rw, suid, dev, exec, auto, nouser, async |
| `user` | Разрешить монтирование обычным пользователям |
| `users` | Разрешить размонтирование обычным пользователям |
| `nofail` | Не останавливать загрузку при ошибке |
| `errors=continue` | Продолжать при ошибках |
| `errors=remount-ro` | Перемонтировать ro при ошибках |
| `discard` | TRIM для SSD |
| `noatime` | Не обновлять время доступа |
| `relatime` | Обновлять atime разумно |
| `sync` | Синхронная запись |
| `async` | Асинхронная запись |
| `x-systemd.automount` | Автомонтирование через systemd |

## Примеры

### Базовое монтирование

```bash
# Монтировать раздел
sudo mount /dev/sdb1 /mnt/data

# С указанием типа ФС
sudo mount -t ext4 /dev/sdb1 /mnt/data

# С параметрами
sudo mount -o rw,noexec /dev/sdb1 /mnt/data

# Только для чтения
sudo mount -o ro /dev/sdb1 /mnt/data
```

### Монтирование по UUID и LABEL

```bash
# По UUID
sudo mount -U "12345678-abcd-efgh-ijkl-123456789abc" /mnt/data

# По метке
sudo mount -L "Data" /mnt/data
```

### Монтирование из fstab

```bash
# Монтировать все из fstab
sudo mount -a

# Проверить fstab перед монтированием
sudo mount -a --fake  # Проверка без реального монтирования
```

### Перемонтирование

```bash
# Перемонтировать rw
sudo mount -o remount,rw /mnt/data

# Перемонтировать ro
sudo mount -o remount,ro /mnt/data

# Перемонтировать root
sudo mount -o remount,rw /
```

### Bind mount

```bash
# Привязать директорию
sudo mount --bind /home/user/data /mnt/data

# С параметрами
sudo mount --bind /home/user/data /mnt/data
sudo mount -o remount,ro,bind /mnt/data

# Привязать файл
sudo mount --bind /etc/hostname /mnt/hostname
```

### Монтирование ISO

```bash
# Монтировать ISO образ
sudo mount -o loop image.iso /mnt/iso

# Только для чтения (по умолчанию для ISO)
sudo mount -o loop,ro image.iso /mnt/iso
```

### tmpfs

```bash
# Временная ФС в памяти
sudo mount -t tmpfs -o size=1G tmpfs /mnt/tmp

# С ограничением inode
sudo mount -t tmpfs -o size=1G,nr_inodes=100k tmpfs /mnt/tmp
```

### NFS

```bash
# Монтировать NFS
sudo mount -t nfs server:/share /mnt/nfs

# С параметрами
sudo mount -t nfs -o rw,hard,intr server:/share /mnt/nfs

# NFSv4
sudo mount -t nfs4 server:/share /mnt/nfs
```

### CIFS/SMB

```bash
# Монтировать Samba share
sudo mount -t cifs //server/share /mnt/smb -o username=user,password=pass

# С опциями
sudo mount -t cifs //server/share /mnt/smb -o username=user,vers=3.0
```

## /etc/fstab

Формат: `<device> <mountpoint> <type> <options> <dump> <pass>`

```bash
# UUID
UUID=12345678-abcd /               ext4    errors=remount-ro 0 1
UUID=abcd1234-efgh /home           ext4    defaults          0 2
UUID=efgh1234-abcd /boot/efi       vfat    umask=0077        0 1
UUID=1234abcd-efgh none            swap    sw                0 0

# По метке
LABEL=Data          /mnt/data       ext4    defaults,noatime  0 2

# tmpfs
tmpfs               /tmp            tmpfs   defaults,size=2G  0 0

# NFS
server:/share       /mnt/nfs        nfs     defaults          0 0

# Bind mount
/home/user/data     /mnt/data       none    bind              0 0
```

### Поля fstab

| Поле | Описание |
|------|----------|
| 1 | Устройство (UUID, LABEL, путь) |
| 2 | Точка монтирования |
| 3 | Тип ФС |
| 4 | Параметры (через запятую) |
| 5 | Dump (0=нет, 1=да) |
| 6 | Pass (0=нет проверка, 1=root, 2=остальные) |

## Практические сценарии

### Монтирование нового диска

```bash
# Найти диск
lsblk
sudo blkid

# Создать точку монтирования
sudo mkdir -p /mnt/data

# Монтировать
sudo mount /dev/sdb1 /mnt/data

# Добавить в fstab
echo 'UUID=xxx /mnt/data ext4 defaults 0 2' | sudo tee -a /etc/fstab
```

### Монтирование с безопасностью

```bash
# Без выполнения файлов и suid
sudo mount -o rw,noexec,nosuid,nodev /dev/sdb1 /mnt/data

# Для ненадёжных носителей
sudo mount -o ro,noexec,nosuid /dev/sdb1 /mnt/data
```

### Автомонтирование через systemd

```bash
# В fstab
UUID=xxx /mnt/data ext4 defaults,x-systemd.automount 0 2

# Применить
sudo systemctl daemon-reload
sudo systemctl restart local-fs.target
```

### Просмотр текущих монтирований

```bash
# Все монтирования
mount

# Конкретная ФС
mount | grep ext4

# Используя findmnt
findmnt
```

:::tip fstab проверка
Всегда проверяйте fstab командой `sudo mount -a` перед перезагрузкой. Ошибка в fstab может сделать систему незагружаемой.
:::

:::warning nofail
Для необязательных дисков (внешние, NFS) добавляйте `nofail` в fstab, чтобы система загружалась даже если диск недоступен.
:::

:::tip noatime
Добавляйте `noatime` для SSD и часто используемых разделов — это уменьшает количество записей и ускоряет работу.
:::

:::warning Старые записи
При изменении fstab не удаляйте записи по ошибке. Повреждение fstab приведёт к проблемам при загрузке.
:::

## См. также

- [umount](umount.md) — размонтирование
- [findmnt](findmnt.md) — просмотр монтирований
- [blkid](blkid.md) — UUID и тип ФС
- [fstab](lsblk.md) — файл fstab
