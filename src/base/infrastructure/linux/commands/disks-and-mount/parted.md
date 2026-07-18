# parted

**Уровень:** Продвинутый

Управление таблицами разделов с поддержкой GPT и MBR.

## Синтаксис

```bash
parted [OPTIONS] [DEVICE [COMMAND]]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-l` | Показать все разделы |
| `-s` | Неинтерактивный режим |
| `-a ALIGNMENT` | Выравнивание (none, cylinder, minimal, optimal) |
| `-j` | JSON вывод |

## Команды

| Команда | Описание |
|---------|----------|
| `print` | Показать таблицу разделов |
| `mklabel LABEL` | Создать таблицу разделов |
| `mkpart PARTTYPE [FSTYPE] START END` | Создать раздел |
| `rm NUMBER` | Удалить раздел |
| `resizepart NUMBER END` | Изменить размер раздела |
| `move NUMBER START END` | Переместить раздел |
| `set NUMBER FLAG STATE` | Установить флаг |
| `name NUMBER NAME` | Имя раздела |
| `check NUMBER` | Проверить раздел |
| `rescue START END` | Восстановить раздел |

## GPT vs MBR

| Характеристика | MBR | GPT |
|----------------|-----|-----|
| Максимум разделов | 4 primary | 128 |
| Максимум размер | 2TB | 9.4 ZB |
| Избыточность | Нет | Да (backup header) |
| Загрузка | BIOS | UEFI |
| Совместимость | Старые системы | Новые системы |

## Примеры

### Просмотр разделов

```bash
# Все разделы
sudo parted -l

# Конкретный диск
sudo parted /dev/sdb print

# В секторах
sudo parted /dev/sdb unit s print

# В мегабайтах
sudo parted /dev/sdb unit MB print
```

### Создание таблицы разделов

```bash
# GPT таблица
sudo parted /dev/sdb mklabel gpt

# MBR таблица
sudo parted /dev/sdb mklabel msdos

# Проверить
sudo parted /dev/sdb print
```

### Создание разделов

```bash
# Создать GPT раздел
sudo parted /dev/sdb mkpart primary ext4 0% 100%

# Несколько разделов
sudo parted /dev/sdb mkpart primary ext4 0% 50%
sudo parted /dev/sdb mkpart primary xfs 50% 100%

# В конкретных единицах
sudo parted /dev/sdb unit GB mkpart primary ext4 0GB 50GB

# С выравниванием
sudo parted -a optimal /dev/sdb mkpart primary ext4 0% 100%
```

### Удаление разделов

```bash
# Удалить раздел
sudo parted /dev/sdb rm 1

# Удалить несколько
sudo parted /dev/sdb rm 1 rm 2
```

### Изменение размера

```bash
# Изменить размер раздела
sudo parted /dev/sdb resizepart 1 100%

# В конкретных единицах
sudo parted /dev/sdb unit GB resizepart 1 100GB
```

### Установка флагов

```bash
# Флаг загрузки
sudo parted /dev/sdb set 1 boot on

# Флаг esp (для EFI)
sudo parted /dev/sdb set 1 esp on

# Флаг hidden
sudo parted /dev/sdb set 1 hidden on
```

## Практические сценарии

### Подготовка диска с GPT

```bash
# Создать GPT таблицу
sudo parted /dev/sdb mklabel gpt

# Создать разделы
sudo parted /dev/sdb mkpart primary ext4 0% 50%
sudo parted /dev/sdb mkpart primary ext4 50% 100%

# Проверить
sudo parted /dev/sdb print

# Создать файловые системы
sudo mkfs.ext4 /dev/sdb1
sudo mkfs.ext4 /dev/sdb2
```

### Подготовка EFI диска

```bash
# GPT таблица
sudo parted /dev/sdb mklabel gpt

# EFI раздел
sudo parted /dev/sdb mkpart primary fat32 1MiB 512MiB
sudo parted /dev/sdb set 1 esp on

# Корневой раздел
sudo parted /dev/sdb mkpart primary ext4 512MiB 100%

# Форматирование
sudo mkfs.fat -F32 /dev/sdb1
sudo mkfs.ext4 /dev/sdb2
```

### Диск > 2TB

```bash
# Использовать GPT
sudo parted /dev/sdb mklabel gpt

# Создать один большой раздел
sudo parted /dev/sdb mkpart primary ext4 0% 100%

# Форматировать
sudo mkfs.ext4 /dev/sdb1
```

### Неинтерактивный режим

```bash
# Скрипт для автоматизации
sudo parted -s /dev/sdb mklabel gpt
sudo parted -s /dev/sdb mkpart primary ext4 0% 50%
sudo parted -s /dev/sdb mkpart primary ext4 50% 100%

# Или одной командой
sudo parted /dev/sdb -- mklabel gpt mkpart primary ext4 0% 100%
```

### Восстановление раздела

```bash
# Поиск потерянных разделов
sudo parted /dev/sdb rescue 0% 100%

# С указанием файловой системы
sudo parted /dev/sdb rescue 0% 100% ext4
```

## Выравнивание

```bash
# Проверить выравнивание
sudo parted /dev/sdb align-check optimal 1

# Выравнивание при создании
sudo parted -a optimal /dev/sdb mkpart primary ext4 0% 100%

# Без выравнивания
sudo parted -a none /dev/sdb mkpart primary ext4 0% 100%
```

:::tip GPT по умолчанию
Для новых дисков всегда используйте GPT. MBR нужен только для совместимости со старыми системами (BIOS).
:::

:::warning Выравнивание
Всегда используйте `0%` и `100%` вместо конкретных секторов — это обеспечит правильное выравнивание для SSD и расширенных форматов.
:::

:::tip Единицы измерения
Используйте `%`, `GB`, `MB`, `s` (секторы) для указания размеров. Проценты автоматически обеспечивают правильное выравнивание.
:::

:::warning Несовместимость
`parted` может изменить таблицу разделов при каждом запуске. Для простых операций лучше использовать `fdisk` (MBR) или `gdisk` (GPT).
:::

## См. также

- [fdisk](fdisk.md) — разметка (MBR)
- [lsblk](lsblk.md) — блочные устройства
