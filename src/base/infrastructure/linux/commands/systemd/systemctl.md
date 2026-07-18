# systemctl

**Уровень:** Средний

Управление системными сервисами и юнитами systemd.

## Синтаксис

```bash
systemctl [OPTIONS] COMMAND [UNIT...]
```

## Основные команды

| Команда | Описание |
|---------|----------|
| `start UNIT` | Запустить юнит |
| `stop UNIT` | Остановить юнит |
| `restart UNIT` | Перезапустить юнит |
| `reload UNIT` | Перечитать конфигурацию сервиса |
| `enable UNIT` | Включить автозапуск |
| `disable UNIT` | Отключить автозапуск |
| `status UNIT` | Показать статус юнита |
| `is-active UNIT` | Проверить, активен ли юнит |
| `is-enabled UNIT` | Проверить, включён ли автозапуск |
| `list-units` | Список загруженных юнитов |
| `list-unit-files` | Список файлов юнитов |
| `mask UNIT` | Заблокировать юнит |
| `unmask UNIT` | Разблокировать юнит |
| `daemon-reload` | Перезагрузить конфигурацию systemd |
| `show UNIT` | Показать свойства юнита |
| `edit UNIT` | Редактировать юнит |
| `cat UNIT` | Показать содержимое файла юнита |
| `enable --now UNIT` | Включить автозапуск и запустить |

## Опции

| Опция | Описание |
|-------|----------|
| `--type=TYPE` | Фильтр по типу (service, socket, timer, mount) |
| `--state=STATE` | Фильтр по состоянию (active, inactive, failed) |
| `--full` | Не обрезать вывод |
| `--no-pager` | Не использовать постраничный вывод |
| `--now` | Применить немедленно (для enable/disable) |
| `-l` | Полный вывод без обрезки |
| `--user` | Управление пользовательскими юнитами |
| `-a` | Показать все юниты, включая неактивные |
| `--failed` | Показать только failed юниты |
| `-H HOST` | Управление на удалённом хосте |

## Примеры

### Запуск и остановка сервисов

```bash
# Запустить nginx
sudo systemctl start nginx

# Остановить nginx
sudo systemctl stop nginx

# Перезапустить nginx
sudo systemctl restart nginx

# Перечитать конфигурацию без перезапуска
sudo systemctl reload nginx
```

### Автозапуск

```bash
# Включить автозапуск nginx
sudo systemctl enable nginx

# Отключить автозапуск
sudo systemctl disable nginx

# Включить автозапуск и сразу запустить
sudo systemctl enable --now nginx
```

### Просмотр статуса

```bash
# Статус сервиса
systemctl status nginx

# Проверка в скриптах
systemctl is-active nginx
echo $?  # 0 = активен

# Проверка автозапуска
systemctl is-enabled nginx
```

### Список юнитов

```bash
# Все сервисы
systemctl list-units --type=service

# Только активные сервисы
systemctl list-units --type=service --state=active

# Все сокеты
systemctl list-units --type=socket

# Failed юниты
systemctl --failed

# Все файлы юнитов
systemctl list-unit-files --type=service
```

### Блокировка юнитов

```bash
# Заблокировать сервис (нельзя запустить вручную)
sudo systemctl mask nginx

# Разблокировать
sudo systemctl unmask nginx
```

### Просмотр свойств

```bash
# Все свойства юнита
systemctl show nginx

# Конкретное свойство
systemctl show -p ActiveState nginx
systemctl show -p MainPID nginx
systemctl show -p SubState nginx
```

### Редактирование юнитов

```bash
# Создать override файл
sudo systemctl edit nginx

# Редактировать основной файл юнита
sudo systemctl edit --full nginx

# Показать содержимое файла юнита
systemctl cat nginx
```

### Перезагрузка конфигурации

```bash
# После изменения файлов юнитов
sudo systemctl daemon-reload
```

## Создание сервисного файла

Файл: `/etc/systemd/system/myapp.service`

```ini
[Unit]
Description=My Application
After=network.target
Requires=postgresql.service
Wants=redis.service

[Service]
Type=simple
User=myapp
Group=myapp
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/start.sh
ExecStop=/opt/myapp/bin/stop.sh
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Основные директивы

| Раздел | Директива | Описание |
|--------|-----------|----------|
| Unit | `Description` | Описание юнита |
| Unit | `After=` | Запуск после указанных юнитов |
| Unit | `Requires=` | Жёсткая зависимость |
| Unit | `Wants=` | Мягкая зависимость |
| Service | `Type=` | Тип сервиса (simple, forking, oneshot, notify) |
| Service | `Restart=` | Политика перезапуска |
| Service | `RestartSec=` | Задержка перед перезапуском |
| Install | `WantedBy=` | Целевой юнит для enable |

### Политики перезапуска (Restart=)

| Значение | Описание |
|----------|----------|
| `no` | Не перезапускать (по умолчанию) |
| `always` | Всегда перезапускать |
| `on-success` | При успешном завершении (код 0) |
| `on-failure` | При ошибке (ненулевой код) |
| `on-abnormal` | При сигнале или таймауте |
| `on-abort` | При необработанном сигнале |

## Практические сценарии

### Проверка всех failed сервисов

```bash
systemctl --failed --no-pager
```

### Перезапуск всех сервисов проекта

```bash
for svc in nginx myapp-worker myapp-scheduler; do
    sudo systemctl restart "$svc"
done
```

### Проверка зависимостей

```bash
# Какие юниты требует сервис
systemctl list-dependencies nginx

# Обратные зависимости (кто зависит от)
systemctl list-dependencies --reverse nginx
```

:::tip Журналирование
Для просмотра логов сервиса используйте `journalctl -u nginx -f` — это покажет логи в реальном времени.
:::

:::warning daemon-reload
После редактирования файлов юнитов в `/etc/systemd/system/` обязательно выполняйте `sudo systemctl daemon-reload`, иначе изменения не применятся.
:::

:::tip Пользовательские сервисы
Для создания сервиса текущего пользователя используйте `~/.config/systemd/system/` и управление с флагом `--user`:
```bash
systemctl --user enable myapp
systemctl --user start myapp
```
:::

:::warning mask vs disable
`disable` отключает автозапуск, но позволяет запустить сервис вручную. `mask` полностью блокирует сервис — даже ручной запуск станет невозможен.
## См. также

- [journalctl](journalctl.md) — чтение логов
- [systemd-analyze](systemd-analyze.md) — анализ загрузки

:::

## Связки с другими командами

```bash
# Список запущенных сервисов, отсортированный по имени
systemctl list-units --type=service --state=running | awk '{print $1}' | sort

# Количество сервисов с включённым автозапуском
systemctl list-unit-files --type=service --state=enabled | wc -l

# Ключевая информация о сервисе nginx
systemctl status nginx 2>&1 | grep -E "Active:|Main PID:|Memory:"

# Список таймеров systemd
systemctl list-timers --all | head -20

# Пользовательские сервисы текущего пользователя
systemctl --user list-units --type=service --state=running

# Зависимости сервиса nginx
systemctl list-dependencies nginx.service | head -20

# Текущее потребление памяти сервисом
systemctl show nginx -p MemoryCurrent

# Список сервисов с ошибками
systemctl list-units --type=service --state=failed

# Количество ошибок nginx за последний час
journalctl -u nginx --since "1 hour ago" | grep -c error

# Перезапуск всех сервисов с ошибками
systemctl --failed --no-pager | grep failed | awk '{print $2}' | xargs -I {} sudo systemctl restart {}
```
