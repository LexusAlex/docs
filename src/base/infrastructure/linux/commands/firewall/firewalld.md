# firewall-cmd

Управление межсетевым экраном firewalld с зонами безопасности.

## Синтаксис

```bash
firewall-cmd [OPTIONS]
```

## Зоны

| Зона | Описание |
|------|----------|
| `drop` | Все входящие пакеты отбрасываются |
| `block` | Все входящие пакеты отклоняются |
| `public` | Только разрешённые соединения (по умолчанию) |
| `external` | Для внешних сетей с NAT |
| `internal` | Для внутренних сетей |
| `trusted` | Все соединения разрешены |
| `work` | Для рабочих сетей |
| `home` | Для домашних сетей |
| `dmz` | Для демилитаризованной зоны |

## Основные команды

| Команда | Описание |
|---------|----------|
| `--state` | Показать состояние firewalld |
| `--reload` | Перезагрузить правила |
| `--list-all` | Показать все настройки зоны |
| `--get-zones` | Список всех зон |
| `--get-services` | Список всех сервисов |
| `--get-active-zones` | Активные зоны |
| `--get-default-zone` | Зона по умолчанию |
| `--set-default-zone` | Установить зону по умолчанию |
| `--add-service` | Разрешить сервис |
| `--remove-service` | Запретить сервис |
| `--add-port` | Разрешить порт |
| `--remove-port` | Запретить порт |
| `--add-rich-rule` | Добавить rich rule |
| `--remove-rich-rule` | Удалить rich rule |

## Опции

| Опция | Описание |
|-------|----------|
| `--permanent` | Постоянное правило (требует reload) |
| `--zone=ZONE` | Указать зону |
| `--add-interface=IFACE` | Назначить интерфейс зоне |
| `--remove-interface=IFACE` | Убрать интерфейс из зоны |
| `--change-interface=IFACE` | Изменить зону интерфейса |
| `--add-source=IP` | Добавить источник в зону |
| `--remove-source=IP` | Убрать источник из зоны |

## Примеры

### Статус и информация

```bash
# Состояние firewalld
sudo firewall-cmd --state

# Все настройки зоны
sudo firewall-cmd --list-all

# Конкретная зона
sudo firewall-cmd --zone=public --list-all

# Все зоны
sudo firewall-cmd --get-zones

# Все сервисы
sudo firewall-cmd --get-services

# Активные зоны
sudo firewall-cmd --get-active-zones

# Зона по умолчанию
sudo firewall-cmd --get-default-zone
```

### Управление сервисами

```bash
# Разрешить сервис
sudo firewall-cmd --add-service=http
sudo firewall-cmd --add-service=https
sudo firewall-cmd --add-service=ssh

# Постоянное правило
sudo firewall-cmd --permanent --add-service=http

# Удалить сервис
sudo firewall-cmd --remove-service=http

# Разрешить сервис для конкретной зоны
sudo firewall-cmd --zone=public --add-service=http

# Показать разрешённые сервисы
sudo firewall-cmd --list-services
```

### Управление портами

```bash
# Разрешить порт
sudo firewall-cmd --add-port=8080/tcp
sudo firewall-cmd --add-port=3000-4000/tcp

# Постоянное правило
sudo firewall-cmd --permanent --add-port=8080/tcp

# Удалить порт
sudo firewall-cmd --remove-port=8080/tcp

# Показать разрешённые порты
sudo firewall-cmd --list-ports
```

### Зоны и интерфейсы

```bash
# Назначить интерфейс зоне
sudo firewall-cmd --zone=internal --add-interface=eth1

# Изменить зону интерфейса
sudo firewall-cmd --zone=public --change-interface=eth0

# Убрать интерфейс из зоны
sudo firewall-cmd --zone=internal --remove-interface=eth1

# Добавить источник в зону
sudo firewall-cmd --zone=trusted --add-source=192.168.1.0/24
```

### Rich rules

```bash
# Разрешить доступ с конкретного IP
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.100" accept'

# Заблокировать IP
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="10.0.0.5" drop'

# Разрешить порт для конкретного IP
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port port="8080" protocol="tcp" accept'

# Логирование
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" log prefix="BLOCKED: " level="notice" drop'

# Ограничение частоты
sudo firewall-cmd --add-rich-rule='rule family="ipv4" port port="22" protocol="tcp" accept limit value="3/m"'

# Показать rich rules
sudo firewall-cmd --list-rich-rules
```

### Direct rules

```bash
# Добавить direct rule
sudo firewall-cmd --direct --add-rule ipv4 filter INPUT 0 -s 192.168.1.0/24 -p tcp --dport 22 -j ACCEPT

# Показать direct rules
sudo firewall-cmd --direct --get-all-rules

# Удалить direct rule
sudo firewall-cmd --direct --remove-rule ipv4 filter INPUT 0 -s 192.168.1.0/24 -p tcp --dport 22 -j ACCEPT
```

### Применение правил

```bash
# Перезагрузить правила
sudo firewall-cmd --reload

# Правила применяются немедленно (без --permanent)
# Для постоянных правил нужно --permanent + reload
```

## Практические сценарии

### Настройка веб-сервера

```bash
# Постоянные правила
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh

# Применить
sudo firewall-cmd --reload

# Проверить
sudo firewall-cmd --list-all
```

### Настройка внутренней сети

```bash
# Создать зону для внутренней сети
sudo firewall-cmd --permanent --new-zone=internal-net

# Назначить интерфейс
sudo firewall-cmd --permanent --zone=internal-net --add-interface=eth1

# Разрешить сервисы
sudo firewall-cmd --permanent --zone=internal-net --add-service=ssh
sudo firewall-cmd --permanent --zone=internal-net --add-service=http

# Применить
sudo firewall-cmd --reload
```

### Доступ только из доверенных сетей

```bash
# Удалить сервис из public
sudo firewall-cmd --permanent --zone=public --remove-service=ssh

# Добавить rich rule для конкретной подсети
sudo firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept'

# Применить
sudo firewall-cmd --reload
```

## Конфигурационные файлы

| Путь | Описание |
|------|----------|
| `/etc/firewalld/firewalld.conf` | Основная конфигурация |
| `/etc/firewalld/zones/` | Пользовательские зоны |
| `/etc/firewalld/services/` | Пользовательские сервисы |
| `/usr/lib/firewalld/zones/` | Системные зоны |
| `/usr/lib/firewalld/services/` | Системные сервисы |

### Пример сервиса

```xml
<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>My App</short>
  <description>My custom application</description>
  <port protocol="tcp" port="8080"/>
  <port protocol="tcp" port="8443"/>
</service>
```

:::tip Постоянные vs временные правила
Правила без `--permanent` применяются немедленно, но сбрасываются при reload. Правила с `--permanent` требуют `--reload` для применения.
:::

:::warning Проверка перед reload
Перед `--reload` проверьте, что SSH разрешён в permanent правилах. Иначе можете потерять доступ.
:::

:::tip Зоны
Каждый интерфейс может быть в своей зоне. Это позволяет иметь разные правила для разных сетей (например, eth0 — public, eth1 — internal).
:::

:::warning Rich rules vs direct rules
Rich rules — предпочтительный способ для сложных правил. Direct rules — для прямого доступа к iptables/nftables, используйте только при необходимости.
:::
