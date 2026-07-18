# nft

Управление межсетевым экраном nftables (замена iptables).

## Синтаксис

```bash
nft [OPTIONS] [COMMAND]
```

## nftables vs iptables

| Особенность | iptables | nftables |
|-------------|----------|----------|
| Архитектура | Отдельные таблицы для IPv4/IPv6 | Единые таблицы для inet |
| Производительность | Линейный перебор правил | Оптимизированные наборы (sets) |
| Синтаксис | Сложный | Более читаемый |
| Мониторинг | Нет встроенного | Встроенный мониторинг |
| Конфигурация | Скрипты | Единый файл /etc/nftables.conf |

## Семейства (families)

| Семейство | Описание |
|-----------|----------|
| `ip` | IPv4 |
| `ip6` | IPv6 |
| `inet` | IPv4 + IPv6 |
| `bridge` | Мостовые пакеты |
| `arp` | ARP |
| `netdev` | Сетевые устройства |

## Типы цепочек

| Тип | Описание |
|-----|----------|
| `filter` | Фильтрация пакетов |
| `nat` | Трансляция адресов |
| `route` | Маршрутизация |

## Хуки (hooks)

| Хук | Описание |
|-----|----------|
| `ingress` | До обработки (ранний этап) |
| `prerouting` | До маршрутизации |
| `input` | Входящие пакеты |
| `forward` | Транзитные пакеты |
| `output` | Исходящие пакеты |
| `postrouting` | После маршрутизации |

## Команды

| Команда | Описание |
|---------|----------|
| `add table` | Создать таблицу |
| `add chain` | Создать цепочку |
| `add rule` | Добавить правило |
| `add set` | Создать набор |
| `list ruleset` | Показать все правила |
| `list tables` | Показать таблицы |
| `list chains` | Показать цепочки |
| `list chain` | Показать правила цепочки |
| `flush ruleset` | Очистить все правила |
| `flush table` | Очистить таблицу |
| `delete table` | Удалить таблицу |
| `delete rule` | Удалить правило |

## Примеры

### Базовая конфигурация

```bash
# Создать таблицу
sudo nft add table inet filter

# Создать цепочки
sudo nft add chain inet filter input { type filter hook input priority 0 \; policy drop \; }
sudo nft add chain inet filter forward { type filter hook forward priority 0 \; policy drop \; }
sudo nft add chain inet filter output { type filter hook output priority 0 \; policy accept \; }

# Добавить правила
sudo nft add rule inet filter input iif lo accept
sudo nft add rule inet filter input ct state established,related accept
sudo nft add rule inet filter input tcp dport 22 accept
sudo nft add rule inet filter input tcp dport { 80, 443 } accept
sudo nft add rule inet filter input icmp type echo-request accept
```

### Просмотр правил

```bash
# Все правила
sudo nft list ruleset

# Конкретная таблица
sudo nft list table inet filter

# Конкретная цепочка
sudo nft list chain inet filter input

# С номерами строк
sudo nft -a list ruleset

# В формате команд
sudo nft list ruleset -a
```

### Удаление правил

```bash
# Очистить все правила
sudo nft flush ruleset

# Очистить таблицу
sudo nft flush table inet filter

# Удалить правило по хэндлу
sudo nft delete rule inet filter input handle 4

# Удалить таблицу
sudo nft delete table inet filter
```

### NAT конфигурация

```bash
# Таблица NAT
sudo nft add table ip nat

# Цепочки
sudo nft add chain ip nat prerouting { type nat hook prerouting priority -100 \; }
sudo nft add chain ip nat postrouting { type nat hook postrouting priority 100 \; }

# DNAT
sudo nft add rule ip nat prerouting tcp dport 80 dnat to 192.168.1.10:8080

# Masquerade
sudo nft add rule ip nat postrouting oif eth0 masquerade
```

### Наборы (sets)

```bash
# Создать набор IP-адресов
sudo nft add set inet filter blacklist { type ipv4_addr \; }

# Добавить элементы
sudo nft add element inet filter blacklist { 192.168.1.100, 10.0.0.5 }

# Использовать в правиле
sudo nft add rule inet filter input ip saddr @blacklist drop

# Диапазоны портов
sudo nft add set inet filter webports { type inet_service \; elements = { 80, 443, 8080 \} }
sudo nft add rule inet filter input tcp dport @webports accept
```

### Карты (maps)

```bash
# Карта для DNAT по порту
sudo nft add table ip nat
sudo nft add chain ip nat prerouting { type nat hook prerouting priority -100 \; }

sudo nft add map ip nat dnat_map { type inet_service : ipv4_addr \; }
sudo nft add element ip nat dnat_map { 80 : 192.168.1.10, 443 : 192.168.1.11 }

sudo nft add rule ip nat prerouting tcp dport dnat to tcp dport map @dnat_map
```

### Сохранение и загрузка

```bash
# Сохранить правила
sudo nft list ruleset > /etc/nftables.conf

# Загрузить правила
sudo nft -f /etc/nftables.conf

# Автозагрузка
sudo systemctl enable nftables
```

## Конфигурационный файл

### /etc/nftables.conf

```bash
#!/usr/sbin/nft -f

flush ruleset

table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;
        
        iif lo accept
        ct state established,related accept
        ct state invalid drop
        
        tcp dport 22 accept
        tcp dport { 80, 443 } accept
        icmp type echo-request accept
        
        counter drop
    }
    
    chain forward {
        type filter hook forward priority 0; policy drop;
    }
    
    chain output {
        type filter hook output priority 0; policy accept;
    }
}
```

### Применение конфигурации

```bash
# Проверить синтаксис
sudo nft -c -f /etc/nftables.conf

# Применить
sudo nft -f /etc/nftables.conf

# Перезагрузить сервис
sudo systemctl reload nftables
```

## Практические сценарии

### Миграция с iptables

```bash
# Конвертировать правила iptables в nftables
sudo iptables-translate -A INPUT -p tcp --dport 22 -j ACCEPT
# Вывод: nft add rule ip filter INPUT tcp dport 22 accept

# Автоматическая миграция
sudo iptables-translate-save > /tmp/nftables.conf
```

### Веб-сервер

```bash
#!/usr/sbin/nft -f
flush ruleset

table inet webserver {
    chain input {
        type filter hook input priority 0; policy drop;
        iif lo accept
        ct state established,related accept
        tcp dport { 22, 80, 443 } accept
        icmp type echo-request accept
        counter drop
    }
}
```

### Защита от сканирования

```bash
sudo nft add rule inet filter input tcp flags & (fin|syn|rst|ack) == syn ct state new tcp dport 22 meter flood { ip saddr limit rate 3/minute burst 3 packets } accept
```

:::tip inet семейство
Используйте `inet` вместо `ip` и `ip6` — это позволяет обрабатывать IPv4 и IPv6 одной таблицей.
:::

:::warning Порядок правил
Правила в цепочке обрабатываются сверху вниз. Первое совпадение определяет судьбу пакета. Правила с `accept` должны быть перед общим `drop`.
:::

:::tip Конфигурационный файл
Всегда используйте `/etc/nftables.conf` вместо отдельных команд. Файл загружается при старте системы через `nftables.service`.
:::

:::warning Миграция
При миграции с iptables убедитесь, что все модули совместимы. Некоторые сложные правила iptables требуют адаптации для nftables.
:::
