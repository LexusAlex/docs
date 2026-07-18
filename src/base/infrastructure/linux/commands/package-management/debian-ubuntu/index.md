# Debian/Ubuntu

Управление пакетами в семействе Debian/Ubuntu. Пакеты `.deb`, менеджер `apt`, низкоуровневый `dpkg`.

## Команды

| Команда | Описание |
|---------|----------|
| [apt](apt.md) | Высокоуровневый менеджер пакетов |
| [apt-get](apt-get.md) | Низкоуровневый менеджер (для скриптов) |
| [apt-cache](apt-cache.md) | Информация о пакетах |
| [dpkg](dpkg.md) | Установка .deb-пакетов |
| [snap](snap.md) | Snap-пакеты |

## Сравнение команд

| Операция | apt | apt-get | dpkg |
|----------|-----|---------|------|
| Установить | `apt install pkg` | `apt-get install pkg` | `dpkg -i pkg.deb` |
| Удалить | `apt remove pkg` | `apt-get remove pkg` | `dpkg -r pkg` |
| Обновить индекс | `apt update` | `apt-get update` | — |
| Обновить пакеты | `apt upgrade` | `apt-get upgrade` | — |
| Поиск | `apt search keyword` | — | — |
| Информация | `apt show pkg` | `apt-cache show pkg` | `dpkg -s pkg` |
| Список файлов | `apt list --installed` | — | `dpkg -L pkg` |

## Ключевые файлы

| Файл | Описание |
|------|----------|
| `/etc/apt/sources.list` | Основной список репозиториев |
| `/etc/apt/sources.list.d/` | Дополнительные репозитории |
| `/var/cache/apt/archives/` | Кэш скачанных пакетов |
| `/var/lib/dpkg/status` | Состояние установленных пакетов |
