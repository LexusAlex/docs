# findmnt

**Уровень:** Средний

Поиск и отображение смонтированных файловых систем.

## Синтаксис

```bash
findmnt [OPTIONS] [DEVICE|POINT]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-t TYPE` | Фильтр по типу ФС |
| `-S SOURCE` | Найти по источнику (устройству) |
| `-T TARGET` | Найти по точке монтирования |
| `-o COLUMNS` | Выбрать столбцы |
| `-J` | JSON вывод |
| `-l` | Плоский список |
| `--real` | Только реальные ФС |
| `-D` | Показать только пропущенные |
| `-p` | Парный вывод |
| `-u` | Не выводить теги |
| `-s` | fstab режим |
| `-m` | mtab режим |
| `-O OPTIONS` | Фильтр по параметрам |
| `-M` | Найти в mtab |
| `--fstab` | Показать только fstab |
| `--mtab` | Показать только mtab |
| `-n` | Без заголовков |

## Столбцы вывода

| Столбец | Описание |
|---------|----------|
| `TARGET` | Точка монтирования |
| `SOURCE` | Устройство |
| `FSTYPE` | Тип ФС |
| `OPTIONS` | Параметры монтирования |
| `SIZE` | Размер |
| `USED` | Использовано |
| `AVAIL` | Доступно |
| `USE%` | Процент использования |
| `UUID` | UUID ФС |
| `LABEL` | Метка |
| `MAJ:MIN` | Major:Minor |
| `FSROOT` | Корень ФС |
| `TID` | ID монтирования |
| `ID` | ID родителя |
| `OPT_FIELDS` | Доп. поля |
| `VFS-OPTIONS` | Параметры VFS |
| `FS-OPTIONS` | Параметры ФС |
| `MP-OPTIONS` | Параметры точки |

## Примеры

### Базовый просмотр

```bash
# Все монтирования (дерево)
findmnt

# Плоский список
findmnt -l

# Только реальные ФС (без pseudo)
findmnt --real

# Пример вывода:
# TARGET    SOURCE    FSTYPE  OPTIONS
# /         /dev/sda2 ext4    rw,relatime
# ├─/boot   /dev/sda1 ext4    rw,relatime
# └─/home   /dev/sda3 ext4    rw,relatime
```

### Поиск по устройству

```bash
# По источнику
findmnt -S /dev/sda1

# По UUID
findmnt -U "12345678-abcd-efgh-ijkl-123456789abc"

# По метке
findmnt -L "root"
```

### Поиск по точке монтирования

```bash
# По цели
findmnt -T /home

# Конкретное монтирование
findmnt /home
```

### Фильтрация

```bash
# По типу ФС
findmnt -t ext4
findmnt -t nfs
findmnt -t tmpfs

# По параметрам
findmnt -O ro
findmnt -O noexec

# Комбинация
findmnt -t ext4 -O rw
```

### Выбор столбцов

```bash
# Конкретные столбцы
findmnt -o TARGET,SOURCE,FSTYPE,SIZE

# С размерами
findmnt -o TARGET,SOURCE,FSTYPE,SIZE,USED,AVAIL,USE%

# Без заголовков (для скриптов)
findmnt -ln -o TARGET
```

### JSON вывод

```bash
# Все в JSON
findmnt -J

# Для конкретной точки
findmnt -J -T /home
```

### fstab режим

```bash
# Только из fstab
findmnt --fstab

# Сравнить с реальными монтированиями
findmnt --verify
```

## Практические сценарии

### Проверка монтирования

```bash
# Проверить, смонтировано ли устройство
if findmnt -S /dev/sdb1 > /dev/null 2>&1; then
    echo "Device is mounted"
    findmnt -S /dev/sdb1
else
    echo "Device is not mounted"
fi

# Проверить точку монтирования
if findmnt -T /mnt/data > /dev/null 2>&1; then
    echo "/mnt/data is mounted"
else
    echo "/mnt/data is not mounted"
fi
```

### Мониторинг использования

```bash
# Показать использование диска
findmnt -o TARGET,SIZE,USED,AVAIL,USE% -t ext4

# Найти почти заполненные
findmnt -o TARGET,USE% -t ext4 | awk '$2 > 90 {print}'
```

### Поиск NFS монтирований

```bash
# Все NFS
findmnt -t nfs

# NFS с серверами
findmnt -t nfs -o TARGET,SOURCE,OPTIONS
```

### Скрипты

```bash
# Получить список точек монтирования
findmnt -ln -o TARGET

# Проверить fstab
findmnt --fstab -o TARGET,SOURCE,FSTYPE

# Сравнить fstab и текущее состояние
diff <(findmnt --fstab -ln -o TARGET | sort) \
     <(findmnt -ln -o TARGET | sort)
```

### Диагностика

```bash
# Найти проблемные монтирования
findmnt --real -o TARGET,SOURCE,FSTYPE,OPTIONS

# Проверить параметры безопасности
findmnt -o TARGET,OPTIONS | grep -E "noexec|nosuid|nodev"
```

:::tip findmnt vs mount
`findmnt` — современная замена `mount` для просмотра монтирований. Поддерживает фильтрацию, JSON и более удобный вывод.
:::

:::warning fstab и реальность
`findmnt --fstab` показывает ожидаемые монтирования. `findmnt` показывает реальные. Разница может указывать на проблемы.
:::

:::tip JSON вывод
`findmnt -J` удобен для автоматической обработки. Используйте `jq` для парсинга.
:::

:::warning --real
По умолчанию `findmnt` показывает все ФС, включая pseudo (proc, sysfs). Используйте `--real` для отображения только реальных файловых систем.
## См. также

- [mount](mount.md) — монтирование
- [lsblk](lsblk.md) — блочные устройства

:::
