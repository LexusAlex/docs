# yum

**Уровень:** Средний

Менеджер пакетов для RHEL 7, CentOS 7 и старше.

:::warning Устаревший инструмент
yum заменён на **dnf** в RHEL 8+, Fedora 22+, CentOS 8+. Используйте dnf для новых систем. Все команды yum работают в dnf.
:::

## Синтаксис

```bash
yum [options] <command> [package...]
```

## Основные команды

| Команда | Описание |
|---------|----------|
| `install` | Установка пакета |
| `remove` | Удаление пакета |
| `update` | Обновление пакета |
| `upgrade` | Обновление всех пакетов |
| `search` | Поиск пакета |
| `info` | Информация о пакете |
| `list` | Список пакетов |
| `provides` | Какой пакет предоставляет файл |
| `group install` | Установка группы |
| `group remove` | Удаление группы |
| `group list` | Список групп |
| `history` | История операций |
| `clean all` | Очистка кэша |
| `makecache` | Создание кэша |
| `autoremove` | Удаление неиспользуемых |
| `repolist` | Список репозиториев |

## Опции

| Опция | Описание |
|-------|----------|
| `-y` | Автоматическое подтверждение |
| `-q` | Тихий режим |
| `-v` | Подробный вывод |
| `--enablerepo=repo` | Включить репозиторий |
| `--disablerepo=repo` | Отключить репозиторий |
| `--nogpgcheck` | Пропустить проверку GPG |
| `--downloadonly` | Только скачать |
| `--skip-broken` | Пропустить конфликты |
| `--assumeyes` | Автоподтверждение |

## Примеры

### 1. Установка пакета

```bash
sudo yum install nginx
```

### 2. Установка нескольких пакетов

```bash
sudo yum install nginx php mariadb-server
```

### 3. Удаление пакета

```bash
sudo yum remove nginx
```

### 4. Обновление пакета

```bash
sudo yum update nginx
```

### 5. Обновление всех пакетов

```bash
sudo yum update
```

### 6. Поиск пакета

```bash
yum search nginx
```

### 7. Информация о пакете

```bash
yum info nginx
```

### 8. Список установленных

```bash
yum list installed
```

### 9. Какой пакет предоставляет файл

```bash
yum provides /usr/bin/nginx
```

### 10. Установка группы

```bash
sudo yum groupinstall "Web Server"
```

### 11. Список групп

```bash
yum group list
```

### 12. История

```bash
yum history
yum history info 15
yum history undo 15
```

### 13. Очистка кэша

```bash
sudo yum clean all
```

### 14. Список репозиториев

```bash
yum repolist
yum repolist all
```

### 15. Автоудаление

```bash
sudo yum autoremove
```

## Репозитории

| Путь | Описание |
|------|----------|
| `/etc/yum.repos.d/` | Файлы репозиториев |
| `/etc/yum.conf` | Конфигурация |

### Добавление репозитория

```bash
sudo yum install epel-release
```

### Включение/отключение

```bash
sudo yum-config-manager --enable repo-name
sudo yum-config-manager --disable repo-name
```

## Миграция на dnf

| yum | dnf |
|-----|-----|
| `yum install` | `dnf install` |
| `yum remove` | `dnf remove` |
| `yum update` | `dnf update` |
| `yum search` | `dnf search` |
| `yum info` | `dnf info` |
| `yum list` | `dnf list` |
| `yum groupinstall` | `dnf group install` |
| `yum history` | `dnf history` |
| `yum clean all` | `dnf clean all` |
| `yum repolist` | `dnf repolist` |

### Ключевые отличия dnf

- Быстрее и лучше разрешает зависимости
- Поддержка модулей
- Улучшенная история и откат
- API для расширений
- Лучшая документация

:::tip Совместимость
Все команды yum работают в dnf через алиас. Вы можете использовать `yum` на RHEL 8+ — это симлинк на dnf.
:::

:::warning CentOS 7
CentOS 7 использует yum. Для миграции на dnf обновитесь до RHEL 8+ или AlmaLinux/Rocky Linux 8+.
:::

## Советы

:::tip Проверка перед обновлением
Используйте `yum check-update` для проверки доступных обновлений без установки.
:::

:::warning Параллельные загрузки
yum загружает пакеты последовательно. Для ускорения используйте `yum-plugin-fastestmirror`.
:::

## См. также

- [dnf](dnf.md) — современный менеджер
- [rpm](rpm.md) — низкоуровневый менеджер
