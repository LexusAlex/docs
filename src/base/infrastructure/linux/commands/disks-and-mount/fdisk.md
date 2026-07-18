# fdisk

**Уровень:** Средний

Управление таблицами разделов дисков (MBR).

## Синтаксис

```bash
fdisk [OPTIONS] DEVICE
```

## Опции

| Опция | Описание |
|-------|----------|
| `-l` | Показать все разделы |
| `-l DEVICE` | Показать разделы конкретного диска |
| `-s DEVICE` | Показать размер раздела |
| `-b SIZE` | Размер сектора (по умолчанию 512) |
| `-C CYLINDERS` | Количество цилиндров |
| `-H HEADS` | Количество головок |
| `-S SECTORS` | Секторов на дорожку |
| `-u` | Показать размеры в секторах |

## Интерактивные команды

| Команда | Описание |
|---------|----------|
| `n` | Создать новый раздел |
| `d` | Удалить раздел |
| `p` | Показать таблицу разделов |
| `t` | Изменить тип раздела |
| `a` | Переключить флаг загрузки |
| `w` | Записать изменения и выйти |
| `q` | Выйти без сохранения |
| `v` | Проверить таблицу разделов |
| `u` | Переключить единицы измерения |
| `x` | Дополнительные функции |

## Типы разделов MBR

| Тип | Описание |
|-----|----------|
| Primary | Основной раздел (макс. 4) |
| Extended | Расширенный раздел (контейнер) |
| Logical | Логический раздел (внутри extended) |

## Коды типов разделов

| Код | Тип |
|-----|-----|
| `83` | Linux |
| `82` | Linux swap |
| `8e` | Linux LVM |
| `fd` | Linux RAID |
| `7` | HPFS/NTFS/exFAT |
| `b` | W95 FAT32 |
| `ef` | EFI (FAT-12/16/32) |
| `8` | AIX |
| `85` | Linux extended |

## Примеры

### Просмотр разделов

```bash
# Все разделы
sudo fdisk -l

# Конкретный диск
sudo fdisk -l /dev/sda

# Размер раздела
sudo fdisk -s /dev/sda1

# В секторах
sudo fdisk -lu /dev/sda
```

### Интерактивный режим

```bash
# Запуск интерактивного режима
sudo fdisk /dev/sdb

# Пример сессии:
Command (m for help): p           # Показать разделы
Command (m for help): n           # Новый раздел
Partition type: p                 # Primary
Partition number: 1               # Номер
First sector: default             # Начальный сектор
Last sector: +10G                 # Размер
Command (m for help): w           # Записать
```

### Создание разделов

```bash
# В интерактивном режиме
sudo fdisk /dev/sdb

# Новый primary раздел
Command: n
Partition type: p
Partition number: 1
First sector: (default)
Last sector: +10G

# Новый extended раздел
Command: n
Partition type: e
Partition number: 2
First sector: (default)
Last sector: (default)

# Новый logical раздел
Command: n
Partition type: l
First sector: (default)
Last sector: +5G
```

### Удаление разделов

```bash
# В интерактивном режиме
sudo fdisk /dev/sdb

# Удалить раздел
Command: d
Partition number: 1

# Удалить все разделы (по одному)
Command: d
Partition number: 1
Command: d
Partition number: 2
```

### Изменение типа раздела

```bash
# В интерактивном режиме
sudo fdisk /dev/sdb

# Изменить тип
Command: t
Partition number: 1
Hex code: 8e  # Linux LVM

# Список типов
Command: L
```

## Практические сценарии

### Подготовка нового диска

```bash
# Посмотреть диск
sudo fdisk -l /dev/sdb

# Создать разделы
sudo fdisk /dev/sdb

# Команды:
# n → p → 1 → (default) → +20G    # Первый раздел 20GB
# n → p → 2 → (default) → (default) # Второй раздел — остаток
# w                                  # Записать

# Создать файловую систему
sudo mkfs.ext4 /dev/sdb1
sudo mkfs.ext4 /dev/sdb2

# Монтировать
sudo mount /dev/sdb1 /mnt/data
```

### Создание swap

```bash
# Создать раздел swap
sudo fdisk /dev/sdb

# Команды:
# n → p → 1 → (default) → +4G
# t → 1 → 82              # Тип Linux swap
# w

# Форматировать как swap
sudo mkswap /dev/sdb1

# Включить
sudo swapon /dev/sdb1
```

### Создание LVM

```bash
# Создать раздел для LVM
sudo fdisk /dev/sdb

# Команды:
# n → p → 1 → (default) → (default)
# t → 1 → 8e              # Тип Linux LVM
# w

# Создать LVM
sudo pvcreate /dev/sdb1
sudo vgcreate myvg /dev/sdb1
sudo lvcreate -L 10G -n mylv myvg
```

### Проверка перед изменениями

```bash
# Показать текущую таблицу
sudo fdisk -l /dev/sda

# Проверить целостность
sudo fdisk /dev/sda
Command: v

# Выйти без изменений
Command: q
```

## MBR ограничения

| Ограничение | Описание |
|-------------|----------|
| Максимум 4 primary раздела | Или 3 primary + 1 extended |
| Максимум 128 logical разделов | Внутри extended |
| Максимум 2TB | Для дисков > 2TB используйте GPT |
| Нет встроенной избыточности | Таблица разделов может быть потеряна |

:::tip Всегда проверяйте
Перед записью изменений используйте `p` для просмотра текущей таблицы разделов. Это поможет избежать ошибок.
:::

:::warning Данные будут потеряны
Изменение таблицы разделов уничтожает данные на затронутых разделах. Всегда делайте резервные копии перед изменением.
:::

:::tip GPT для больших дисков
Для дисков > 2TB используйте `gdisk` или `parted` с GPT. MBR не поддерживает диски больше 2TB.
:::

:::warning Запись изменений
Изменения применяются только после команды `w`. Если вы ошиблись, используйте `q` для выхода без сохранения.
## См. также

- [parted](parted.md) — разметка (GPT)
- [lsblk](lsblk.md) — блочные устройства
- [mkfs](mkfs.md) — создание ФС

:::
