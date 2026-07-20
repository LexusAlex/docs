# git-remote

**Уровень:** Начинающий

**Версия Git:** 1.5.0

Управление набором отслеживаемых удалённых репозиториев. Позволяет добавлять, удалять, переименовывать и настраивать подключения к удалённым репозориям.

## Синтаксис

```bash
git remote [add|remove|rename|show|set-url|prune|update|get-url|set-head] [<аргументы>]
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `add <имя> <url>` | Добавляет новый удалённый репозорий |
| `remove <имя>` | Удаляет указанный удалённый репозорий |
| `rename <старое> <новое>` | Переименовывает удалённый репозорий |
| `show <имя>` | Выводит информацию об удалённом репозории |
| `-v` | Показывает URL удалённых репозориев |
| `set-url <имя> <url>` | Изменяет URL удалённого репозория |
| `prune <имя>` | Удаляет устаревшие ссылки на ветки |
| `update` | Обновляет список удалённых репозориев |
| `get-url <имя>` | Получает URL удалённого репозория |
| `set-head <имя> <ветка>` | Устанавливает ветку по умолчанию для удалённого репозория |

## Примеры

1. Показать все удалённые репозории:
```bash
git remote
```

2. Показать удалённые репозории с URL:
```bash
git remote -v
```

3. Добавить удалённый репозорий с именем origin:
```bash
git remote add origin https://github.com/user/repo.git
```

4. Добавить второй удалённый репозорий:
```bash
git remote add upstream https://github.com/original/repo.git
```

5. Показать подробную информацию об origin:
```bash
git remote show origin
```

6. Переименовать удалённый репозорий:
```bash
git remote rename origin upstream
```

7. Удалить удалённый репозорий:
```bash
git remote remove upstream
```

8. Изменить URL удалённого репозория:
```bash
git remote set-url origin https://github.com/new-url/repo.git
```

9. Изменить URL на SSH:
```bash
git remote set-url origin git@github.com:user/repo.git
```

10. Показать URL конкретного удалённого репозория:
```bash
git remote get-url origin
```

11. Удалить устаревшие ссылки на ветки:
```bash
git remote prune origin
```

12. Установить ветку по умолчанию для origin:
```bash
git remote set-head origin main
```

13. Автоматически определить ветку по умолчанию:
```bash
git remote set-head origin --auto
```

14. Обновить список удалённых репозориев:
```bash
git remote update
```

15. Обновить конкретный удалённый репозорий:
```bash
git remote update origin
```

16. Добавить удалённый репозорий для push-only:
```bash
git remote add --push origin https://github.com/user/repo.git
```

17. Показать только fetch URL:
```bash
git remote get-url --push origin
```

18. Добавить зеркало репозория:
```bash
git remote add --mirror=push origin https://github.com/user/repo.git
```

## Практические сценарии

### Настройка форк-репозория

```bash
# Клонируем свой форк
git clone https://github.com/myuser/project.git
cd project

# Добавляем оригинальный репозорий как upstream
git remote add upstream https://github.com/original/project.git

# Проверяем настройки
git remote -v

# Синхронизируем изменения из оригинала
git fetch upstream
git merge upstream/main
```

### Смена протокола подключения

```bash
# Переключаемся с HTTPS на SSH
git remote set-url origin git@github.com:user/repo.git

# Проверяем изменение
git remote -v
```

### Очистка устаревших ссылок

```bash
# После удаления веток на сервере
git remote prune origin

# Проверяем, какие ссылки были удалены
git remote prune origin --dry-run
```

## Связки с другими командами

```bash
# Получение и слияние изменений из upstream
git fetch upstream && git merge upstream/main

# Push в несколько удалённых репозориев
git push origin main && git push backup main

# Проверка перед push
git remote show origin && git push
```

## Советы

:::tip
Используйте `git remote -v` для быстрой проверки настроенных удалённых репозориев и их URL.
:::

:::warning
При изменении URL убедитесь, что новый адрес доступен и у вас есть необходимые права. Неправильный URL приведёт к ошибкам при fetch и push.
:::

## См. также

- [git-fetch](./fetch.md) — получение изменений из удалённого репозория
- [git-pull](./pull.md) — получение и слияние изменений
- [git-push](./push.md) — отправка изменений в удалённый репозорий
