# git-fetch

**Уровень:** Начинающий

**Версия Git:** 1.5.0

Загружает объекты и ссылки из удалённого репозория без автоматического слияния. Позволяет безопасно просматривать изменения перед их интеграцией.

## Синтаксис

```bash
git fetch [<удалённый_репозорий>] [<ветка>] [опции]
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--all` | Загружает из всех удалённых репозориев |
| `--prune` | Удаляет устаревшие ссылки на ветки |
| `--tags` | Загружает все теги из удалённого репозория |
| `--depth <n>` | Загружает только n последних коммитов |
| `--unshallow` | Преобразует неполный репозорий в полный |
| `--dry-run` | Показывает, что будет сделано, без выполнения |
| `--force` | Принудительно обновляет ссылки |
| `--jobs <n>` | Количество параллельных загрузок |

## Примеры

1. Загрузить изменения из origin:
```bash
git fetch origin
```

2. Загрузить изменения из всех удалённых репозориев:
```bash
git fetch --all
```

3. Загрузить конкретную ветку из origin:
```bash
git fetch origin main
```

4. Загрузить и удалить устаревшие ссылки:
```bash
git fetch --prune
```

5. Загрузить все теги:
```bash
git fetch --tags
```

6. Загрузить только теги:
```bash
git fetch origin --tags
```

7. Неполная загрузка (последние 10 коммитов):
```bash
git fetch --depth 10
```

8. Преобразовать неполный репозорий в полный:
```bash
git fetch --unshallow
```

9. Показать, что будет загружено:
```bash
git fetch --dry-run
```

10. Загрузить с принудительным обновлением ссылок:
```bash
git fetch --force
```

11. Загрузить из конкретного удалённого репозория:
```bash
git fetch upstream
```

12. Загрузить несколько веток:
```bash
git fetch origin main develop feature
```

13. Загрузить с указанием refspec:
```bash
git fetch origin refs/heads/*:refs/remotes/origin/*
```

14. Загрузить тег с определённым именем:
```bash
git fetch origin tag v2.0
```

15. Загрузить с параллельными потоками:
```bash
git fetch --jobs 4
```

16. Загрузить и обновить все удалённые ветки:
```bash
git fetch --all --prune
```

17. Загрузить из URL напрямую:
```bash
git fetch https://github.com/user/repo.git main
```

18. Загрузить конкретную ветку в FETCH_HEAD:
```bash
git fetch origin pull/123/head:pr-123
```

## Практические сценарии

### Ревью Pull Request локально

```bash
# Загружаем PR из GitHub
git fetch origin pull/123/head:pr-123

# Переключаемся на ветку PR
git checkout pr-123

# Просматриваем изменения
git log main..pr-123
```

### Синхронизация с upstream

```bash
# Загружаем изменения из оригинального репозория
git fetch upstream

# Просматриваем новые коммиты
git log --oneline HEAD..upstream/main

# Сливаем изменения
git merge upstream/main
```

### Быстрая проверка удалённых изменений

```bash
# Загружаем изменения без слияния
git fetch origin

# Сравниваем локальные и удалённые ветки
git log --oneline origin/main..main

# Просматриваем статистику изменений
git diff --stat main origin/main
```

## Связки с другими командами

```bash
# Просмотр изменений после fetch
git fetch origin && git log --oneline HEAD..origin/main

# Fetch с последующим rebase
git fetch origin && git rebase origin/main

# Fetch и удаление устаревших веток
git fetch --prune && git branch -vv | grep ': gone]'
```

## Советы

:::tip
Используйте `git fetch --prune` регулярно для очистки ссылок на удалённые ветки, которые уже не существуют на сервере.
:::

:::warning
`git fetch` не изменяет вашу рабочую директорию. Изменения загружаются только в удалённые трекинг-ветки (например, `origin/main`).
:::

## См. также

- [git-remote](./remote.md) — управление удалёнными репозориями
- [git-pull](./pull.md) — получение и слияние изменений
- [git-push](./push.md) — отправка изменений в удалённый репозорий
