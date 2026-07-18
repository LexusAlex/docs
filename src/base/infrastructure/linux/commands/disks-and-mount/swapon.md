# swapon

**Уровень:** Средний

Активация разделов и файлов подкачки (swap).

## Синтаксис

```bash
swapon [OPTIONS] [DEVICE]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-s` | Показать статус swap |
| `-a` | Активировать все из fstab |
| `-p PRIORITY` | Приоритет (чем выше, тем предпочтительнее) |
| `-d` | Игнорировать discard (для старых ядер) |
| `-e` | Если устройство не найдено, не останавливать |
| `-f` | Принудительно |
| `-v` | Подробный вывод |
| `--discard-pages` | Освобождать страницы discard |
| `--discard-once` | Один раз при активации |
| `--fixpgsz` | Исправить размер страницы |
| `--show[=COLUMN]` | Показать информацию |

## Примеры

### Просмотр состояния

```bash
# Показать активные swap
swapon -s

# Пример вывода:
# Filename    Type    Size    Used    Priority
# /dev/sda2   partition 4095996 0     -2
# /swapfile   file    2097148 0       -3

# Используя --show
swapon --show

# Подробная информация
swapon --show=NAME,TYPE,SIZE,USED,PRIO
```

### Активация раздела

```bash
# Активировать swap раздел
sudo swapon /dev/sdb1

# С приоритетом
sudo swapon -p 10 /dev/sdb1

# Все из fstab
sudo swapon -a
```

### Создание swap файла

```bash
# Создать файл
sudo fallocate -l 4G /swapfile

# Или через dd
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096

# Установить права
sudo chmod 600 /swapfile

# Форматировать
sudo mkswap /swapfile

# Активировать
sudo swapon /swapfile

# Добавить в fstab для автозагрузки
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Swap раздел

```bash
# Создать раздел (через fdisk)
sudo fdisk /dev/sdb
# n → p → 1 → (default) → +4G → t → 82 → w

# Форматировать
sudo mkswap /dev/sdb1

# Активировать
sudo swapon /dev/sdb1

# Добавить в fstab
echo 'UUID=xxx none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Управление приоритетами

```bash
# Активировать с приоритетом
sudo swapon -p 10 /dev/sdb1
sudo swapon -p 5 /swapfile

# Показать приоритеты
swapon --show=NAME,PRIO
```

## Практические сценарии

### Добавление swap

```bash
# Проверить текущий swap
swapon --show
free -h

# Создать swap файл
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Проверить
swapon --show
free -h

# Добавить в fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Увеличение swap

```bash
# Отключить текущий swap
sudo swapoff /swapfile

# Увеличить файл
sudo fallocate -l 8G /swapfile
sudo mkswap /swapfile

# Включить
sudo swapon /swapfile
```

### Swap на SSD

```bash
# Создать swap файл на SSD
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Добавить в fstab с discard
echo '/swapfile none swap sw,discard 0 0' | sudo tee -a /etc/fstab
```

### Проверка состояния

```bash
# Статус swap
swapon -s

# Использование памяти
free -h

# Детальная информация
cat /proc/swaps

# Swappiness
cat /proc/sys/vm/swappiness
```

## Настройка swappiness

```bash
# Проверить текущее значение
cat /proc/sys/vm/swappiness

# Временно изменить (0-100)
sudo sysctl vm.swappiness=10

# Постоянно изменить
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

| Значение | Поведение |
|----------|-----------|
| 0 | Минимальное использование swap |
| 10 | Рекомендуется для серверов |
| 60 | По умолчанию |
| 100 | Активное использование swap |

:::tip Swap файл vs раздел
Swap файл проще в управлении и не требует отдельного раздела. Swap раздел немного быстрее, но разница минимальна на современных системах.
:::

:::warning Права доступа
Swap файл должен иметь права `600` (только root) — иначе это угроза безопасности. Всегда выполняйте `chmod 600 /swapfile`.
:::

:::tip SSD discard
Для SSD добавьте опцию `discard` в fstab — это позволит ядру отправлять TRIM команды для поддержания производительности.
:::

:::warning swappiness
Для серверов с большим объёмом RAM установите `swappiness=10` — это уменьшит использование swap при достаточном количестве памяти.
## См. также

- [swapoff](swapoff.md) — выключение swap
- [free](monitoring/free.md) — использование памяти

:::
