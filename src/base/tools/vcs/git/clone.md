# git clone

**Уровень:** Начинающий
**Версия Git:** 0.99

Клонирует удалённый репозиторий в локальную директорию. Создаёт полную копию всех веток, тегов и истории коммитов.

## Синтаксис

```bash
git clone <url> [каталог]
git clone [опции] <url> [каталог]
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--depth <глубина>` | Поверхностное клонирование (только N последних коммитов) |
| `--branch <ветка>` | Клонировать указанную ветку (вместо default) |
| `--single-branch` | Клонировать только одну ветку |
| `--no-checkout` | Не создавать рабочую директорию (только .git) |
| `--bare` | Создать «голый» репозиторий |
| `--mirror` | Зеркальное клонирование (все ссылки) |
| `--recurse-submodules` | Клонировать подмодули |
| `--shallow-since=<дата>` | Поверхностное клонирование до даты |
| `--shallow-exclude=<ревизия>` | Исключить коммиты до ревизии |
| `--jobs <число>` | Параллельное клонирование подмодулей |
| `--filter=<фильтр>` | Фильтрация объектов (partial clone) |
| `--sparse` | Разреженное клонирование |

## Примеры

### 1. Базовое клонирование

```bash
git clone https://github.com/user/repo.git
# Создаёт директорию repo/ с полной копией
```

### 2. Клонирование в指定ную директорию

```bash
git clone https://github.com/user/repo.git my-project
# Клонирует в my-project/
```

### 3. Клонирование по SSH

```bash
git clone git@github.com:user/repo.git
# Использует SSH-ключ для аутентификации
```

### 4. Поверхностное клонирование (для экономии места)

```bash
git clone --depth 1 https://github.com/user/repo.git
# Только последний коммит — быстро и мало места
```

### 5. Клонирование конкретной ветки

```bash
git clone --branch develop https://github.com/user/repo.git
# Клонирует ветку develop вместо main
```

### 6. Клонирование одной ветки

```bash
git clone --single-branch --branch main https://github.com/user/repo.git
# Только ветка main, без fetch других веток
```

### 7. Клонирование с подмодулями

```bash
git clone --recurse-submodules https://github.com/user/repo.git
# Автоматически инициализирует и клонирует подмодули
```

### 8. Зеркальное клонирование (для миграции)

```bash
git clone --mirror https://github.com/user/repo.git
# Все ссылки (ветки, теги) — для переноса на другой сервер
```

### 9. Поверхностное клонирование до даты

```bash
git clone --shallow-since=2024-01-01 https://github.com/user/repo.git
# Коммиты только с 1 января 2024
```

### 10. Частичное клонирование (без больших файлов)

```bash
git clone --filter=blob:none https://github.com/user/repo.git
# Метаданные загружены, blob'ы по требованию
```

### 11. Частичное клонирование (без деревьев)

```bash
git clone --filter=tree:0 https://github.com/user/repo.git
# Минимальная загрузка — деревья по требованию
```

### 12. Разреженное клонирование

```bash
git clone --sparse https://github.com/user/repo.git
# Только файлы из корня, остальные — по checkout
```

### 13. Клонирование без checkout

```bash
git clone --no-checkout https://github.com/user/repo.git
# Только .git, без файлов проекта
```

### 14. Клонирование голого репозитория

```bash
git clone --bare https://github.com/user/repo.git
# Репозиторий без рабочей директории
```

### 15. Клонирование с ограничением глубины и одной веткой

```bash
git clone --depth 1 --single-branch --branch main https://github.com/user/repo.git
# Максимально быстрое клонирование
```

## Протоколы

| Протокол | URL-формат | Пример |
|----------|-----------|--------|
| HTTPS | `https://host/user/repo.git` | `https://github.com/user/repo.git` |
| SSH | `git@host:user/repo.git` | `git@github.com:user/repo.git` |
| Git | `git://host/user/repo.git` | `git://github.com/user/repo.git` |
| Локальный | `/path/to/repo.git` | `/srv/git/project.git` |
| file:// | `file:///path/to/repo.git` | `file:///srv/git/project.git` |

## Практические сценарии

### Быстрое клонирование большого репозитория

```bash
# Поверхностное клонирование нужной ветки
git clone --depth 1 --single-branch --branch develop https://github.com/user/huge-repo.git

# Позже, если нужна полная история:
git fetch --unshallow
```

### Клонирование для участия в Open Source

```bash
# Клонировать свой форк
git clone git@github.com:your-user/repo.git

# Добавить upstream
git remote add upstream git@github.com:original-user/repo.git

# Синхронизация
git fetch upstream
git merge upstream/main
```

### Миграция репозитория на другой сервер

```bash
# Зеркальное клонирование
git clone --mirror git@old-server:project.git

# Настройка нового remote
cd project.git
git remote set-url origin git@new-server:project.git

# Push всех ссылок
git push --mirror
```

### Клонирование монорепозитория (sparse)

```bash
git clone --sparse https://github.com/user/monorepo.git
cd monorepo
git sparse-checkout set services/my-service
# Только нужная часть монорепозитория
```

## Связки с другими командами

```bash
# Клонирование + переход в директорию
git clone https://github.com/user/repo.git && cd repo

# Клонирование + настройка + переход
git clone git@github.com:user/repo.git && cd repo && git config user.name "Name"

# Поверхностное клонирование + checkout тега
git clone --depth 1 --branch v1.0.0 https://github.com/user/repo.git
```

## Советы

:::tip
Для больших репозиториев используйте `--depth 1` — это ускоряет клонирование в десятки раз.
:::

:::warning
Поверхностное клонирование (`--depth`) не позволяет push'ить в удалённый репозиторий. Используйте `git fetch --unshallow` для получения полной истории.
:::

:::tip
Используйте SSH вместо HTTPS — не нужно вводить пароль при каждом push/pull.
:::

:::warning
`git clone --mirror` перезаписывает все ссылки в целевом репозитории. Используйте только для миграции.
:::

## См. также

- [init](init.md) — создание нового репозитория
- [remote](remote.md) — управление удалёнными репозиториями
- [fetch](fetch.md) — получение изменений
- [pull](pull.md) — получение и слияние изменений
