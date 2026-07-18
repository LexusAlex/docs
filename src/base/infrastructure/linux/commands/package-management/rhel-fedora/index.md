# RHEL/Fedora

Управление пакетами в семействе RHEL/Fedora/CentOS/Rocky Linux/AlmaLinux.

## Команды

| Команда | Описание |
|---------|----------|
| [dnf](dnf.md) | Менеджер пакетов (замена yum) |
| [yum](yum.md) | Менеджер пакетов (устаревший) |
| [rpm](rpm.md) | Низкоуровневый менеджер пакетов |

## Сравнение команд

| Операция | dnf | rpm |
|----------|-----|-----|
| Установить | `dnf install pkg` | `rpm -i pkg.rpm` |
| Удалить | `dnf remove pkg` | `rpm -e pkg` |
| Обновить | `dnf update` | `rpm -U pkg.rpm` |
| Поиск | `dnf search keyword` | `rpm -qa \| grep keyword` |
| Информация | `dnf info pkg` | `rpm -qi pkg` |
| Список файлов | `dnf repoquery -l pkg` | `rpm -ql pkg` |
| Какому пакету принадлежит файл | `dnf provides /path` | `rpm -qf /path` |
