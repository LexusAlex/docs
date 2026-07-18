# Диски и монтирование

Управление дисками, разделами, файловыми системами и точками монтирования.

## Команды

| Команда | Описание |
|---------|----------|
| [lsblk](lsblk.md) | Список блочных устройств |
| [fdisk](fdisk.md) | Разметка дисков (MBR) |
| [parted](parted.md) | Разметка дисков (GPT) |
| [mkfs](mkfs.md) | Создание файловой системы |
| [mount](mount.md) | Монтирование файловой системы |
| [umount](umount.md) | Размонтирование файловой системы |
| [fsck](fsck.md) | Проверка и восстановление ФС |
| [blkid](blkid.md) | UUID и тип файловой системы |
| [findmnt](findmnt.md) | Просмотр точек монтирования |
| [swapon](swapon.md) | Включение swap |
| [swapoff](swapoff.md) | Выключение swap |

## Структура `/etc/fstab`

```
# <устройство>  <точка монтирования>  <тип ФС>  <опции>  <dump>  <pass>
UUID=xxx         /                    ext4      defaults  0       1
UUID=yyy         /home                ext4      defaults  0       2
UUID=zzz         none                 swap      sw        0       0
```
