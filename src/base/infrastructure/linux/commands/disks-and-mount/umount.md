# umount

**Уровень:** Средний

Размонтирование файловых систем.

## Синтаксис

```bash
umount [OPTIONS] DIRECTORY
umount [OPTIONS] DEVICE
```

## Опции

| Опция | Описание |
|-------|----------|
| `-f` | Принудительное размонтирование |
| `-l` | Ленивое размонтирование (lazy) |
| `-t TYPE` | Размонтировать ФС указанного типа |
| `-n` | Не записывать в /etc/mtab |
| `-r` | Перемонтировать ro при ошибке |
| `-a` | Размонтировать все из /etc/mtab |
| `-d` | Освободить loop устройства |
| `--fake` | Не размонтировать, только выполнить остальное |

## Примеры

### Базовое размонтирование

```bash
# По точке монтирования
sudo umount /mnt/data

# По устройству
sudo umount /dev/sdb1

# Несколько точек
sudo umount /mnt/data /mnt/backup

# Все ФС указанного типа
sudo umount -t nfs
```

### Принудительное размонтирование

```bash
# Принудительно (для NFS, зависших ФС)
sudo umount -f /mnt/nfs

# Ленивое размонтирование (отложить до освобождения)
sudo umount -l /mnt/data

# Комбинирование
sudo umount -lf /mnt/nfs
```

### Размонтирование всех ФС

```bash
# Все из fstab (кроме root)
sudo umount -a

# Все ФС указанного типа
sudo umount -a -t nfs

# Только для чтения
sudo umount -a -r
```

### ISO образы и loop

```bash
# Размонтировать ISO
sudo umount /mnt/iso

# С освобождением loop устройства
sudo umount -d /mnt/iso
```

## Практические сценарии

### "target is busy"

Когда точка монтирования используется:

```bash
# Попытка размонтировать
sudo umount /mnt/data
# umount: /mnt/data: target is busy.

# Найти процессы, использующие точку
sudo lsof +D /mnt/data
sudo fuser -m /mnt/data

# Убить процессы
sudo fuser -km /mnt/data

# Затем размонтировать
sudo umount /mnt/data
```

### Проверка перед размонтированием

```bash
# Проверить, кто использует
sudo lsof /mnt/data
sudo fuser -mv /mnt/data

# Проверить текущие монтирования
mount | grep /mnt/data
findmnt /mnt/data
```

### Lazy umount

```bash
# Размонтировать немедленно, закрыть дескрипторы позже
sudo umount -l /mnt/data

# Полезно когда:
# - Файловая система зависла
# - NFS сервер недоступен
# - Нужно отмонтировать занятую ФС
```

### NFS размонтирование

```bash
# Обычное размонтирование NFS
sudo umount /mnt/nfs

# Принудительное (если NFS завис)
sudo umount -f /mnt/nfs

# Ленивое (если NFS совсем не отвечает)
sudo umount -l /mnt/nfs

# Все NFS монтирования
sudo umount -a -t nfs
```

### Размонтирование в скриптах

```bash
# Безопасное размонтирование
if mountpoint -q /mnt/data; then
    sudo umount /mnt/data
    echo "Unmounted /mnt/data"
else
    echo "/mnt/data is not mounted"
fi

# Проверка перед размонтированием
if findmnt --mountpoint /mnt/data > /dev/null 2>&1; then
    sudo umount /mnt/data
fi
```

### Автоматическое завершение процессов

```bash
# Найти и завершить все процессы
sudo fuser -km /mnt/data
sleep 1
sudo umount /mnt/data

# Или в цикле
while sudo fuser -m /mnt/data 2>/dev/null; do
    echo "Waiting for processes to finish..."
    sleep 1
done
sudo umount /mnt/data
```

:::warning target is busy
При ошибке "target is busy" используйте `lsof +D` или `fuser -m` для поиска процессов. Не используйте `-f` на локальных ФС без понимания причины.
:::

:::tip lazy umount
`-l` (lazy) полезен для NFS и зависших ФС. Размонтирование произойдёт немедленно, но дескрипторы закроются, когда процессы освободят их.
:::

:::warning -f для NFS
`-f` безопасен для NFS, но может повредить данные на локальных ФС. Используйте `-f` только для сетевых ФС.
:::

:::tip findmnt
Используйте `findmnt` вместо `mount | grep` — он показывает информацию в удобном формате и поддерживает фильтрацию.
:::

## См. также

- [mount](mount.md) — монтирование
- [lsof](../diagnostics/lsof.md) — открытые файлы
- `fuser` — процессы использующие файл
