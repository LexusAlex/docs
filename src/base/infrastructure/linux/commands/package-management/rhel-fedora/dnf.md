# dnf

Менеджер пакетов для RHEL, Fedora, CentOS 8+.

## Синтаксис

```bash
dnf [options] <command> [package...]
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
| `group install` | Установка группы пакетов |
| `group remove` | Удаление группы |
| `group list` | Список групп |
| `repoquery` | Запрос к репозиторию |
| `history` | История операций |
| `clean` | Очистка кэша |
| `makecache` | Создание кэша |
| `autoremove` | Удаление неиспользуемых зависимостей |
| `module` | Управление модулями |

## Опции

| Опция | Описание |
|-------|----------|
| `-y` | Автоматическое подтверждение |
| `-q` | Тихий режим |
| `-v` | Подробный вывод |
| `--enablerepo=repo` | Включить репозиторий |
| `--disablerepo=repo` | Отключить репозиторий |
| `--nogpgcheck` | Пропустить проверку GPG |
| `--best` | Установить лучшую версию |
| `--allowerasing` | Разрешить удаление конфликтующих |
| `--downloadonly` | Только скачать |
| `--installroot=path` | Корень установки |
| `--releasever=ver` | Версия релиза |

## Примеры

### 1. Установка пакета

```bash
sudo dnf install nginx
```

### 2. Установка нескольких пакетов

```bash
sudo dnf install nginx php mariadb-server
```

### 3. Установка с подтверждением

```bash
sudo dnf -y install nginx
```

### 4. Удаление пакета

```bash
sudo dnf remove nginx
```

### 5. Обновление одного пакета

```bash
sudo dnf update nginx
```

### 6. Обновление всех пакетов

```bash
sudo dnf upgrade
```

### 7. Поиск пакета

```bash
dnf search nginx
dnf search "web server"
```

### 8. Информация о пакете

```bash
dnf info nginx
```

### 9. Список установленных

```bash
dnf list installed
dnf list installed | grep nginx
```

### 10. Список доступных

```bash
dnf list available
```

### 11. Какой пакет предоставляет файл

```bash
dnf provides /usr/bin/nginx
dnf provides "*/config.php"
```

### 12. Установка группы

```bash
sudo dnf group install "Web Server"
sudo dnf group install "Development Tools"
```

### 13. Список групп

```bash
dnf group list
dnf group list --installed
```

### 14. Удаление неиспользуемых

```bash
sudo dnf autoremove
```

### 15. Очистка кэша

```bash
sudo dnf clean all
sudo dnf clean packages
sudo dnf clean metadata
```

### 16. Создание кэша

```bash
sudo dnf makecache
```

### 17. История

```bash
dnf history
dnf history info 15
dnf history undo 15
dnf history rollback 10
```

### 18. Repoquery

```bash
dnf repoquery --requires nginx
dnf repoquery --list nginx
dnf repoquery --whatprovides "*/libssl.so"
```

### 19. Скачивание пакета

```bash
dnf download nginx
dnf download --resolve nginx
```

### 20. Установка из RPM

```bash
sudo dnf install ./package.rpm
sudo dnf install https://example.com/package.rpm
```

## Модули (Fedora/RHEL 8+)

### Список модулей

```bash
dnf module list
```

### Включение потока

```bash
sudo dnf module enable nodejs:18
```

### Установка модуля

```bash
sudo dnf module install nodejs:18/common
```

### Сброс модуля

```bash
sudo dnf module reset nodejs
```

### Переключение потока

```bash
sudo dnf module switch-to nodejs:20
```

## Репозитории

| Путь | Описание |
|------|----------|
| `/etc/yum.repos.d/` | Файлы репозиториев |
| `/etc/dnf/dnf.conf` | Конфигурация DNF |

### Добавление репозитория

```bash
sudo dnf config-manager --add-repo https://example.com/repo.repo
```

### Включение/отключение

```bash
sudo dnf config-manager --set-enabled repo-name
sudo dnf config-manager --set-disabled repo-name
```

### Импорт GPG-ключа

```bash
sudo rpm --import https://example.com/RPM-GPG-KEY
```

## Безопасность

### Обновления безопасности

```bash
sudo dnf update --security
```

### Список уязвимостей

```bash
dnf updateinfo list
dnf updateinfo info
```

### Автоматические обновления

```bash
sudo dnf install dnf-automatic
sudo systemctl enable --now dnf-automatic-install.timer
```

:::tip dnf vs yum
dnf — замена yum. Все команды yum работают в dnf. Используйте dnf на RHEL 8+, Fedora 22+, CentOS 8+.
:::

:::warning Автоматическое подтверждение
Флаг `-y` пропускает все подтверждения. Используйте с осторожностью в production.
:::

## Советы

:::tip Поиск быстрее
Используйте `dnf provides "*/filename"` для поиска пакета, содержащего конкретный файл.
:::

:::warning Откат изменений
Сохраняйте ID транзакций (`dnf history`). Для отката: `dnf history undo <ID>`.
:::
