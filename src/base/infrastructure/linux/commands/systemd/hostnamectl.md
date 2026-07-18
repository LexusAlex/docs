# hostnamectl

Управление именем хоста системы.

## Синтаксис

```bash
hostnamectl [OPTIONS] [COMMAND]
```

## Команды

| Команда | Описание |
|---------|----------|
| `status` | Показать текущее имя хоста |
| `set-hostname NAME` | Установить имя хоста |
| `set-hostname --static NAME` | Статическое имя |
| `set-hostname --transient NAME` | Временное имя |
| `set-hostname --pretty NAME` | Человекочитаемое имя |

## Опции

| Опция | Описание |
|-------|----------|
| `--static` | Только статическое имя |
| `--transient` | Только временное имя |
| `--pretty` | Только красивое имя |
| `--no-ask-password` | Не запрашивать пароль |
| `-H HOST` | Управление на удалённом хосте |

## Типы имён хоста

| Тип | Описание | Файл |
|-----|----------|------|
| `static` | Основное имя, задаётся администратором | `/etc/hostname` |
| `transient` | Временное имя (от DHCP, mDNS) | В памяти |
| `pretty` | Человекочитаемое имя (с пробелами, спецсимволами) | `/etc/machine-info` |

## Примеры

### Просмотр текущего имени

```bash
# Полная информация
hostnamectl

# Пример вывода:
#    Static hostname: server01
#  Transient hostname: server01.localdomain
#    Pretty hostname: Production Web Server
#          Icon name: computer-vm
#            Chassis: vm
#         Machine ID: abc123def456
#            Boot ID: xyz789
#     Virtualization: kvm
#   Operating System: Ubuntu 22.04
#             Kernel: Linux 5.15.0-generic
#       Architecture: x86-64

# Только имя хоста
hostnamectl hostname
```

### Установка имени хоста

```bash
# Установить все типы имён
sudo hostnamectl set-hostname server01

# Только статическое имя
sudo hostnamectl set-hostname --static server01

# Только временное имя
sudo hostnamectl set-hostname --transient server01.localdomain

# Человекочитаемое имя
sudo hostnamectl set-hostname --pretty "Production Web Server"
```

### Просмотр конкретного типа

```bash
# Статическое имя
hostnamectl --static

# Временное имя
hostnamectl --transient

# Красивое имя
hostnamectl --pretty
```

## Практические сценарии

### Настройка сервера

```bash
# Установить имя для нового сервера
sudo hostnamectl set-hostname web-server-01
sudo hostnamectl set-hostname --pretty "Web Server 01 - Production"

# Проверить
hostnamectl
```

### Изменение имени хоста

```bash
# Полное изменение
sudo hostnamectl set-hostname new-name

# Проверить изменения
hostnamectl hostname

# Обновить /etc/hosts (не делается автоматически)
sudo sed -i 's/old-name/new-name/g' /etc/hosts
```

### Проверка в скриптах

```bash
# Получить имя хоста для скрипта
HOSTNAME=$(hostnamectl --static)
echo "Working on $HOSTNAME"

# Проверка типа системы
CHASSIS=$(hostnamectl chassis)
if [ "$CHASSIS" = "vm" ]; then
    echo "Running in virtual machine"
fi
```

## Конфигурационные файлы

### /etc/hostname

```
server01
```

### /etc/machine-info

```ini
PRETTY_HOSTNAME="Production Web Server"
ICON_NAME=computer
CHASSIS=server
DEPLOYMENT=production
LOCATION="Data Center 1"
```

:::tip Статическое имя
Статическое имя (`static`) — основное имя системы, которое сохраняется между перезагрузками и хранится в `/etc/hostname`.
:::

:::warning /etc/hosts
`hostnamectl` не обновляет `/etc/hosts`. После изменения имени хоста вручную обновите записи в `/etc/hosts`, иначе некоторые программы могут работать некорректно.
:::

:::tip Имя хоста от DHCP
Временное имя (`transient`) может быть установлено DHCP-сервером. Если вы хотите игнорировать такие изменения, настройте DHCP-клиент.
:::

:::warning Специальные символы
Человекочитаемое имя (`pretty`) поддерживает пробелы и спецсимволы, но статическое и временное — только ASCII буквы, цифры и дефисы.
:::
