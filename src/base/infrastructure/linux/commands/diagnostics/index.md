# Диагностика

Инструменты для отладки и диагностики проблем в системе.

## Команды

| Команда | Описание |
|---------|----------|
| [strace](strace.md) | Трассировка системных вызовов |
| [ltrace](ltrace.md) | Трассировка библиотечных вызовов |
| [lsof](lsof.md) | Список открытых файлов |
| [sar](sar.md) | Системная активность (sysstat) |

::: tip
Команды мониторинга `free`, `vmstat`, `iostat`, `dmesg` описаны в разделе [Мониторинг системы](/base/infrastructure/linux/commands/monitoring/).
:::

## Сценарии диагностики

### Сервис не запускается
```bash
systemctl status service_name    # статус и последние логи
journalctl -u service_name -n 50 # последние 50 строк лога
journalctl -u service_name -f    # лог в реальном времени
```

### Высокая загрузка CPU
```bash
top -c                  # процессы по CPU
ps aux --sort=-%cpu | head -10  # топ-10 по CPU
strace -p PID           # что делает процесс
```

### Нехватка памяти
```bash
free -h                 # использование памяти
ps aux --sort=-%mem | head -10  # топ-10 по памяти
dmesg | grep -i oom     # сообщения OOM-killer
```

### Диск забит
```bash
df -h                   # место на дисках
du -sh /* | sort -rh | head -10  # крупнейшие директории
find / -type f -size +100M -exec ls -lh {} \;  # большие файлы
```

### Сеть не работает
```bash
ip addr show            # сетевые интерфейсы
ping -c 3 8.8.8.8      # проверка связи
dig google.com          # DNS-резолв
ss -tlnp                # слушающие порты
```
