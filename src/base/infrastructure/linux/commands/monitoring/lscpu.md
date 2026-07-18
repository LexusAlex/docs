# lscpu

**Уровень:** Начинающий

Отображение информации о архитектуре процессора.

## Синтаксис

```bash
lscpu [опции]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-a` | Включить отключенные CPU |
| `-b` | Только онлайн CPU |
| `-c` | Только оффлайн CPU |
| `-e [extended]` | Расширенный вывод |
| `-p [parseable]` | Разделяемый формат |
| `-s разделитель` | Указать разделитель |
| `-x` | Шестнадцатеричный формат для масок |
| `-j JSON` | Вывод в JSON |
| `-y` | Показать расширенные числовые поля |

## Поля вывода

| Поле | Описание |
|------|----------|
| `Architecture` | Архитектура (x86_64, aarch64) |
| `CPU(s)` | Общее количество CPU |
| `On-line CPU(s) list` | Список активных CPU |
| `Thread(s) per core` | Потоков на ядро |
| `Core(s) per socket` | Ядер на сокет |
| `Socket(s)` | Количество сокетов |
| `NUMA node(s)` | Количество NUMA-узлов |
| `Vendor ID` | ID производителя |
| `Model name` | Название модели |
| `CPU MHz` | Текущая частота |
| `CPU max MHz` | Максимальная частота |
| `CPU min MHz` | Минимальная частота |
| `L1d cache` | Кеш L1 данных |
| `L1i cache` | Кеш L1 инструкций |
| `L2 cache` | Кеш L2 |
| `L3 cache` | Кеш L3 |
| `Flags` | Флаги процессора |

## Примеры

### Полная информация

```bash
lscpu
```

### Расширенный вывод

```bash
lscpu -e
```

### Разделяемый формат

```bash
lscpu -p
```

### В JSON

```bash
lscpu -J
```

### Только модель

```bash
lscpu | grep "Model name"
```

### Количество ядер

```bash
lscpu | grep "^CPU(s):"
```

### Архитектура

```bash
lscpu | grep "Architecture"
```

### Кеш процессора

```bash
lscpu | grep -i cache
```

### Флаги процессора

```bash
lscpu | grep "Flags"
```

### NUMA информация

```bash
lscpu | grep -i numa
```

### Проверка виртуализации

```bash
lscpu | grep -i "virtualization\|hypervisor"
```

### Количество сокетов

```bash
lscpu | grep "Socket(s):"
```

### Потоки на ядро

```bash
lscpu | grep "Thread(s) per core:"
```

### Частота процессора

```bash
lscpu | grep -i "mhz"
```

## Практические сценарии

### Определение физических ядер

```bash
SOCKETS=$(lscpu | grep "Socket(s):" | awk '{print $2}')
CORES=$(lscpu | grep "Core(s) per socket:" | awk '{print $4}')
PHYSICAL_CORES=$((SOCKETS * CORES))
echo "Physical cores: $PHYSICAL_CORES"
```

### Проверка поддержки инструкций

```bash
lscpu | grep -i "avx\|sse\|aes"
```

### Проверка гипервизора

```bash
if lscpu | grep -q "Hypervisor"; then
    echo "Running in virtual machine"
else
    echo "Running on bare metal"
fi
```

:::tip
Используйте `lscpu -e` для получения информации о каждом логическом процессоре, включая NUMA-узел.
:::

:::warning
Значение "CPU MHz" показывает текущую частоту, которая может меняться из-за Dynamic Frequency Scaling. Используйте "CPU max MHz" для максимальной частоты.
:::

### Оптимизация производительности

```bash
# Проверка NUMA для привязки процессов
lscpu | grep "NUMA"

# Проверка кеша для оптимизации памяти
lscpu | grep -i "cache"
```

## См. также

- `/proc/cpuinfo` — детальная информация о CPU
- `nproc` — количество доступных процессоров
- `lshw` — полная информация об оборудовании
- `dmidecode` — информация DMI/SMBIOS
