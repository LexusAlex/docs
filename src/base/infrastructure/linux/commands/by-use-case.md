# Сценарии диагностики Linux

Runbook-справочник для типовых инцидентов. В отличие от [шпаргалки](cheat-sheet.md) и навигатора [«Как сделать...»](how-to.md), здесь команды расположены в порядке проверки: от наблюдения симптома к поиску причины и безопасному действию.

:::warning
Не перезапускайте службы и не удаляйте данные до сбора состояния и логов. Сначала сохраните вывод диагностических команд, затем меняйте систему и повторяйте проверку.
:::

## Заканчивается место на диске

### 1. Определить файловую систему и тип исчерпания

```bash
df -hT
df -ih
```

`df -hT` показывает занятые байты, `df -ih` — inode. Свободные гигабайты не помогут, если закончились inode из-за большого количества мелких файлов.

### 2. Найти крупные каталоги и файлы

```bash
sudo du -xhd1 /var | sort -h
sudo find /var -xdev -type f -size +1G -printf '%s %p\n' | sort -rn | head -n 20
```

Опция `-x`/`-xdev` не позволяет случайно уйти в другие файловые системы. Повторяйте `du` для найденного крупного каталога, постепенно сужая поиск.

### 3. Проверить удалённые, но открытые файлы

```bash
sudo lsof +L1
journalctl --disk-usage
```

Если процесс продолжает держать удалённый лог, место освободится только после корректного переоткрытия файла или перезапуска соответствующей службы. Не завершайте процесс, пока не оцените влияние.

### 4. Проверить результат очистки

```bash
df -hT
df -ih
```

См. [df](monitoring/df.md), [du](monitoring/du.md), [find](search-files-and-commands/find.md) и [lsof](diagnostics/lsof.md).

## Сайт не отвечает

### 1. Зафиксировать симптом с клиентской стороны

```bash
curl -sS -o /dev/null -w 'HTTP %{http_code}, connect=%{time_connect}s, total=%{time_total}s\n' \
  https://example.com
```

Код `000` означает, что HTTP-ответ не получен: отдельно проверяйте DNS, маршрут, TLS и доступность порта.

### 2. Проверить службу и слушающие сокеты

```bash
sudo systemctl status nginx --no-pager
sudo ss -ltnp 'sport = :80'
sudo ss -ltnp 'sport = :443'
```

Если порт не слушается, переходите к журналу и проверке конфигурации. Если слушается только loopback-адрес, внешний трафик до службы не дойдёт.

### 3. Проверить локальный ответ и журнал

```bash
curl -sS -I http://127.0.0.1/
sudo journalctl -u nginx --since '-15 min' --no-pager
sudo nginx -t
```

Исправляйте первую содержательную ошибку в журнале или проверке конфигурации. После изменения конфигурации повторите `nginx -t` и только затем применяйте её.

### 4. Отделить проблему приложения от сети

```bash
dig +short example.com
ip route get 1.1.1.1
sudo nft list ruleset
```

См. [curl](network/curl.md), [ss](network/ss.md), [journalctl](systemd/journalctl.md) и [nftables](firewall/nftables.md).

## Служба systemd не запускается

### 1. Получить состояние и последние сообщения

```bash
sudo systemctl status myapp.service --no-pager
sudo journalctl -u myapp.service -b -n 100 --no-pager
```

Запишите `Result`, код завершения и первую ошибку процесса. Последующие сообщения часто являются следствием первоначальной причины.

### 2. Проверить фактический unit и зависимости

```bash
systemctl cat myapp.service
systemctl show myapp.service -p FragmentPath -p User -p Group -p ExecStart
systemctl list-dependencies myapp.service
```

Проверяйте существование исполняемого файла, права пользователя службы, рабочий каталог, переменные окружения и доступность зависимых ресурсов.

### 3. Проверить unit перед применением

```bash
systemd-analyze verify /etc/systemd/system/myapp.service
sudo systemctl daemon-reload
sudo systemctl restart myapp.service
sudo systemctl status myapp.service --no-pager
```

`reset-failed` очищает только состояние failed и не устраняет причину сбоя.

См. [systemctl](systemd/systemctl.md), [journalctl](systemd/journalctl.md) и [systemd-analyze](systemd/systemd-analyze.md).

## Высокая нагрузка или система тормозит

### 1. Определить вид нагрузки

```bash
uptime
vmstat 1 5
free -h
iostat -xz 1 5
```

Load average включает не только выполняющиеся задачи, но и процессы в непрерываемом ожидании I/O. Сопоставляйте его с очередью `r`, ожиданием `wa`, swap и задержками устройств.

### 2. Найти процессы-кандидаты

```bash
ps -eo pid,ppid,user,stat,%cpu,%mem,etime,cmd --sort=-%cpu | head -n 20
ps -eo pid,ppid,user,stat,%cpu,%mem,etime,cmd --sort=-%mem | head -n 20
```

Высокий CPU сам по себе не означает неисправность. Сначала выясните роль процесса, длительность нагрузки и ожидаемое поведение приложения.

### 3. Проверить сообщения ядра и I/O

```bash
sudo journalctl -k -p warning --since '-30 min' --no-pager
dmesg -T | tail -n 50
```

Ищите OOM, ошибки дисков, файловых систем, сети и драйверов. Не отправляйте `SIGKILL`, пока процесс может корректно завершиться через `SIGTERM`.

См. [uptime](monitoring/uptime.md), [vmstat](monitoring/vmstat.md), [iostat](monitoring/iostat.md), [ps](processes/ps.md) и [kill](processes/kill.md).

## Нет сетевого доступа

### 1. Проверить интерфейс, адрес и маршрут

```bash
ip -br address
ip route
ip route get 1.1.1.1
```

### 2. Проверить доступность по уровням

```bash
ping -c 3 GATEWAY_IP
ping -c 3 1.1.1.1
dig example.com
curl -sS -I https://example.com
```

Если доступен IP, но не имя — исследуйте DNS. Если не доступен шлюз — проверяйте локальный интерфейс и сеть. Если DNS и маршрут работают, но HTTP нет — проверяйте TLS, прокси и фильтрацию портов.

### 3. Посмотреть сокеты и маршрут пакетов

```bash
ss -s
traceroute example.com
sudo tcpdump -ni any host 1.1.1.1
```

Ограничивайте `tcpdump` фильтром и временем работы: захват может содержать чувствительные данные.

См. [ip](network/ip.md), [ping](network/ping.md), [dig](network/dig.md), [traceroute](network/traceroute.md) и [tcpdump](network/tcpdump.md).

## Общий порядок работы

1. Зафиксируйте время, симптом и исходный вывод команд.
2. Сузьте проблему до подсистемы: процесс, память, диск, сеть или конфигурация.
3. Сформулируйте одну проверяемую гипотезу.
4. Выполните одно обратимое изменение.
5. Повторите исходную проверку и сохраните результат.
6. Если действие не помогло, откатите его перед следующей гипотезой.
