# ip

Универсальная утилита для управления сетевой конфигурацией. Заменяет `ifconfig` и `route`.

## Синтаксис

```bash
ip [опции] объект команда [аргументы]
```

## Объекты

| Объект | Описание |
|--------|----------|
| `addr` | Управление IP-адресами |
| `link` | Управление сетевыми интерфейсами |
| `route` | Управление таблицей маршрутизации |
| `neigh` | Управление таблицей ARP/соседей |
| `rule` | Управление правилами маршрутизации |
| `netns` | Управление сетевыми пространствами имён |

## Примеры

### Показать все IP-адреса

```bash
ip addr show
```

### Краткий вывод адресов

```bash
ip -br addr
```

### Добавить IP-адрес

```bash
ip addr add 192.168.1.100/24 dev eth0
```

### Удалить IP-адрес

```bash
ip addr del 192.168.1.100/24 dev eth0
```

### Очистить адреса интерфейса

```bash
ip addr flush dev eth0
```

### Показать интерфейсы

```bash
ip link show
```

### Включить интерфейс

```bash
ip link set eth0 up
```

### Выключить интерфейс

```bash
ip link set eth0 down
```

### Показать таблицу маршрутизации

```bash
ip route show
```

### Добавить маршрут

```bash
ip route add 10.0.0.0/8 via 192.168.1.1
```

### Удалить маршрут

```bash
ip route del 10.0.0.0/8
```

### Добавить шлюз по умолчанию

```bash
ip route add default via 192.168.1.1
```

### Показать ARP-таблицу

```bash
ip neigh show
```

### Добавить статическую ARP-запись

```bash
ip neigh add 192.168.1.1 lladdr 00:11:22:33:44:55 dev eth0
```

### Показать правила маршрутизации

```bash
ip rule show
```

### Добавить правило

```bash
ip rule add from 192.168.1.0/24 table 100
```

### Статистика интерфейса

```bash
ip -s link show eth0
```

### MTU интерфейса

```bash
ip link set eth0 mtu 9000
```

### Показать только IPv4

```bash
ip -4 addr
```

### Показать только IPv6

```bash
ip -6 addr
```

## Практические сценарии

### Настройка интерфейса

```bash
ip addr flush dev eth0
ip addr add 192.168.1.100/24 dev eth0
ip link set eth0 up
ip route add default via 192.168.1.1
```

### Проверка сетевого подключения

```bash
ip addr show eth0 | grep "inet "
ip route get 8.8.8.8
```

### Настройка VLAN

```bash
ip link add link eth0 name eth0.100 type vlan id 100
ip addr add 10.100.0.1/24 dev eth0.100
ip link set eth0.100 up
```

:::tip
Используйте сокращения: `ip a` вместо `ip addr`, `ip l` вместо `ip link`, `ip r` вместо `ip route`.
:::

:::warning
Изменения, сделанные через `ip`, не сохраняются после перезагрузки. Для постоянной настройки используйте `/etc/network/interfaces` или NetworkManager.
:::

## Связки с другими командами

```bash
# Все IP-адреса (только адреса)
ip addr show | grep 'inet ' | awk '{print $2}'

# Шлюз по умолчанию
ip route | grep default | awk '{print $3}'

# Основной IP-адрес машины (через интерфейс default-маршрута)
ip addr show $(ip route | grep default | awk '{print $5}') | grep 'inet ' | awk '{print $2}'

# Активные интерфейсы с IP-адресами
ip -br addr | awk '$2=="UP" {print $1, $3}'

# ARP-таблица: IP + MAC
ip neigh | grep lladdr | awk '{print $1, $5}'

# Через какой интерфейс идёт трафик в интернет
ip route get 8.8.8.8 | awk '{print $7; exit}'

# Пинг шлюза (проверка сетевого подключения)
ping -c 1 $(ip route | grep default | awk '{print $3}') > /dev/null && echo "Gateway OK"

# Список всех интерфейсов и их состояний
ip -br link | awk '{print $1, $2}'

# Все MAC-адреса соседних устройств с IP
ip neigh show | awk '$4 != "FAILED" && $4 != "INCOMPLETE" {print $1, $5}'

# Проверка MTU всех интерфейсов
ip -br link | awk '{print $1}' | xargs -I{} sh -c 'echo -n "{}: "; ip link show {} | grep mtu | awk "{print \$5}"'
```
