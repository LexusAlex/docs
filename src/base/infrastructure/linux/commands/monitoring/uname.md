# uname

**Уровень:** Начинающий

Отображение информации о системе и ядре.

## Синтаксис

```bash
uname [опции]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-a` | Вся информация |
| `-s` | Имя ядра (по умолчанию) |
| `-n` | Имя сети (hostname) |
| `-r` | Релиз ядра |
| `-v` | Версия ядра |
| `-m` | Архитектура машины |
| `-p` | Тип процессора |
| `-i` | Платформа аппаратного обеспечения |
| `-o` | Название операционной системы |

## Поля вывода

| Поле | Описание | Пример |
|------|----------|--------|
| kernel name | Имя ядра | Linux |
| hostname | Имя хоста | server1 |
| kernel release | Релиз ядра | 5.15.0-58-generic |
| kernel version | Версия | #64-Ubuntu SMP ... |
| machine | Архитектура | x86_64 |
| processor | Процессор | x86_64 |
| operating system | ОС | GNU/Linux |

## Примеры

### Вся информация

```bash
uname -a
# Linux server1 5.15.0-58-generic #64-Ubuntu SMP x86_64 x86_64 x86_64 GNU/Linux
```

### Только имя ядра

```bash
uname -s
# Linux
```

### Релиз ядра

```bash
uname -r
# 5.15.0-58-generic
```

### Архитектура

```bash
uname -m
# x86_64
```

### Имя хоста

```bash
uname -n
# server1
```

### Операционная система

```bash
uname -o
# GNU/Linux
```

### Тип процессора

```bash
uname -p
# x86_64
```

### Платформа

```bash
uname -i
# x86_64
```

### Проверка архитектуры

```bash
if [ "$(uname -m)" = "x86_64" ]; then
    echo "64-bit system"
else
    echo "32-bit system"
fi
```

### Проверка ядра Linux

```bash
if [ "$(uname -s)" = "Linux" ]; then
    echo "Running on Linux"
fi
```

### Совместимость с ОС

```bash
case "$(uname -s)" in
    Linux*)     echo "Linux";;
    Darwin*)    echo "macOS";;
    CYGWIN*)    echo "Cygwin";;
    MINGW*)     echo "MinGw";;
    *)          echo "Unknown";;
esac
```

### Проверка версии ядра

```bash
uname -r | awk -F'[-.]' '{print $1"."$2"."$3}'
# 5.15.0
```

### hostnamectl vs uname

```bash
uname -r
# 5.15.0-58-generic
hostnamectl
# Более подробная информация о системе
```

## Практические сценарии

### Определение типа системы при установке ПО

```bash
ARCH=$(uname -m)
if [ "$ARCH" = "x86_64" ]; then
    wget https://example.com/package-amd64.deb
elif [ "$ARCH" = "aarch64" ]; then
    wget https://example.com/package-arm64.deb
fi
```

### Проверка версии ядра для совместимости

```bash
KERNEL=$(uname -r | cut -d. -f1,2)
if (( $(echo "$KERNEL < 5.4" | bc -l) )); then
    echo "Kernel too old, upgrade required"
fi
```

:::tip
Используйте `uname -r` для получения точной версии ядра, что полезно при установке модулей и драйверов.
:::

:::warning
Некоторые опции (как `-p` и `-i`) могут возвращать `unknown` на некоторых системах. Используйте `-m` для архитектуры.
:::

## См. также

- [hostnamectl](hostnamectl.md) — информация о хосте
- [lsb_release](lsb_release.md) — информация о дистрибутиве
- [/proc/version](/proc/version.md) — версия ядра
- [arch](arch.md) — архитектура (псевдоним для `uname -m`)
