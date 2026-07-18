# iptables

**Уровень:** Продвинутый

Управление межсетевым экраном Linux (netfilter).

## Синтаксис

```bash
iptables [OPTIONS] CHAIN [RULE] [TARGET]
```

## Таблицы

| Таблица | Описание |
|---------|----------|
| `filter` | Фильтрация пакетов (по умолчанию) |
| `nat` | Трансляция адресов (NAT) |
| `mangle` | Изменение пакетов |
| `raw` | Обработка до отслеживания соединений |

## Цепочки (chains)

| Цепочка | Описание |
|---------|----------|
| `INPUT` | Входящие пакеты |
| `OUTPUT` | Исходящие пакеты |
| `FORWARD` | Транзитные пакеты |
| `PREROUTING` | До маршрутизации (DNAT) |
| `POSTROUTING` | После маршрутизации (SNAT/Masquerade) |

## Основные опции

| Опция | Описание |
|-------|----------|
| `-A` | Добавить правило в конец цепочки |
| `-I` | Вставить правило в начало (или на позицию) |
| `-D` | Удалить правило |
| `-L` | Показать правила |
| `-F` | Очистить все правила |
| `-P` | Установить политику по умолчанию |
| `-N` | Создать новую цепочку |
| `-X` | Удалить пользовательскую цепочку |
| `-R` | Заменить правило |
| `-S` | Показать правила в формате команд |

## Параметры правил

| Параметр | Описание |
|----------|----------|
| `-s` | Источник (IP/сеть) |
| `-d` | Назначение (IP/сеть) |
| `-p` | Протокол (tcp, udp, icmp) |
| `--dport` | Порт назначения |
| `--sport` | Порт источника |
| `-i` | Входящий интерфейс |
| `-o` | Исходящий интерфейс |
| `-j` | Цель (TARGET) |
| `-m` | Модуль совпадения |
| `--state` | Состояние соединения |

## Цели (targets)

| Цель | Описание |
|------|----------|
| `ACCEPT` | Принять пакет |
| `DROP` | Отбросить (без ответа) |
| `REJECT` | Отклонить (с ответом) |
| `LOG` | Записать в лог |
| `MASQUERADE` | Маскарадинг (NAT) |
| `DNAT` | Трансляция назначения |
| `SNAT` | Трансляция источника |
| `RETURN` | Вернуться в родительскую цепочку |

## Модули совпадения

| Модуль | Описание |
|--------|----------|
| `state` | Фильтрация по состоянию |
| `conntrack` | Расширенная фильтрация по соединениям |
| `multiport` | Несколько портов |
| `tcp` | Параметры TCP |
| `udp` | Параметры UDP |
| `icmp` | Параметры ICMP |
| `limit` | Ограничение частоты |
| `recent` | Отслеживание недавних соединений |
| `string` | Поиск строки в пакете |

## Примеры

### Просмотр правил

```bash
# Все правила
sudo iptables -L

# С номерами строк
sudo iptables -L --line-numbers

# С подробностями
sudo iptables -L -v

# Конкретная таблица
sudo iptables -L -t nat

# В формате команд
sudo iptables -S
```

### Базовые правила

```bash
# Разрешить loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Разрешить установленные соединения
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Разрешить SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Разрешить HTTP/HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Запретить всё остальное
sudo iptables -P INPUT DROP
```

### Удаление правил

```bash
# Удалить по номеру
sudo iptables -D INPUT 3

# Удалить по содержимому
sudo iptables -D INPUT -p tcp --dport 80 -j ACCEPT

# Очистить все правила
sudo iptables -F

# Очистить конкретную таблицу
sudo iptables -F -t nat
```

### Политики по умолчанию

```bash
# Запретить всё входящее
sudo iptables -P INPUT DROP

# Запретить всё исходящее
sudo iptables -P OUTPUT DROP

# Запретить транзит
sudo iptables -P FORWARD DROP
```

### Фильтрация по IP

```bash
# Разрешить с конкретного IP
sudo iptables -A INPUT -s 192.168.1.100 -j ACCEPT

# Заблокировать IP
sudo iptables -A INPUT -s 10.0.0.5 -j DROP

# Разрешить подсеть
sudo iptables -A INPUT -s 192.168.1.0/24 -j ACCEPT

# Заблокировать подсеть
sudo iptables -A INPUT -s 10.0.0.0/8 -j DROP
```

### Мультипорт

```bash
# Несколько портов за раз
sudo iptables -A INPUT -p tcp -m multiport --dports 80,443,8080 -j ACCEPT

# Порт диапазон
sudo iptables -A INPUT -p tcp --dport 1000:2000 -j ACCEPT
```

### Логирование

```bash
# Логировать dropped пакеты
sudo iptables -A INPUT -j LOG --log-prefix "IPT-DROP: " --log-level 4

# Логировать только TCP
sudo iptables -A INPUT -p tcp -j LOG --log-prefix "IPT-TCP: "
```

### NAT и Masquerade

```bash
# Включить IP forwarding
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward

# Masquerade для исходящих
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# DNAT (перенаправление порта)
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.10:8080

# SNAT
sudo iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j SNAT --to-source 203.0.113.1
```

### Сохранение и восстановление

```bash
# Сохранить правила
sudo iptables-save > /etc/iptables/rules.v4
sudo iptables-save -t nat > /etc/iptables/nat-rules.v4

# Восстановить правила
sudo iptables-restore < /etc/iptables/rules.v4

# Автозагрузка (Debian/Ubuntu)
sudo apt install iptables-persistent
sudo netfilter-persistent save
```

## Практические сценарии

### Базовый сервер

```bash
# Очистить
sudo iptables -F
sudo iptables -X

# Loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Установленные соединения
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# HTTP/HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# ICMP (ping)
sudo iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Всё остальное — запретить
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
```

### Защита от брутфорса

```bash
# Ограничить попытки SSH
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set --name SSH
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 --name SSH -j DROP
```

### Веб-сервер

```bash
# Разрешить только нужные порты
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -P INPUT DROP
```

## Состояния соединений

| Состояние | Описание |
|-----------|----------|
| `NEW` | Новое соединение |
| `ESTABLISHED` | Установленное соединение |
| `RELATED` | Связанное соединение (FTP, ICMP ошибки) |
| `INVALID` | Невалидный пакет |

:::tip Всегда разрешайте ESTABLISHED,RELATED
Первым правилом всегда добавляйте разрешение установленных соединений — это критично для корректной работы.
:::

:::warning Политика по умолчанию
Устанавливайте `DROP` для INPUT и FORWARD только после того, как добавите все необходимые правила. Иначе вы заблокируете сами себя.
:::

:::tip Сохранение правил
Правила iptables не сохраняются между перезагрузками. Всегда сохраняйте их: `sudo iptables-save > /etc/iptables/rules.v4`.
:::

:::warning iptables vs nftables
iptables постепенно заменяется на nftables. Для новых систем рассмотрите использование nft.
## См. также

- [nftables](nftables.md) — современная замена
- [ufw](ufw.md) — простой интерфейс
- [ss](network/ss.md) — сетевые сокеты

:::
