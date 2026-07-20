# git switch

**Уровень:** Начинающий
**Версия Git:** 2.23.0

Переключает ветки. Рекомендуемая замена `git checkout` для переключения веток (начиная с Git 2.23). Восстановление файлов вынесено в `git restore`.

## Синтаксис

```bash
git switch <ветка>
git switch -c <новая-ветка> [начальная-точка]
git switch [опции] <ветка>
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-c <имя>` / `--create <имя>` | Создать и переключиться |
| `-C <имя>` / `--force-create <имя>` | Создать/сбросить и переключиться |
| `-d` / `--detach` | Отключить HEAD |
| `--guess` / `--no-guess` | Автоматический tracking |
| `-f` / `--force` / `--discard-changes` | Принудительное переключение |
| `-m` / `--merge` | Сохранить локальные изменения |
| `--conflict=<стиль>` | Стиль конфликтов |
| `-t` / `--track` | Настроить tracking |
| `--no-track` | Без tracking |
| `--orphan <имя>` | Ветка без истории |
| `-q` / `--quiet` | Тихий режим |
| `--ignore-other-worktrees` | Игнорировать другие worktree |
| `--recurse-submodules` | Обновить подмодули |

## Примеры

### 1. Переключение на существующую ветку

```bash
git switch main
# Переключает на ветку main
```

### 2. Возврат на предыдущую ветку

```bash
git switch -
# Возвращает на предыдущую ветку
```

### 3. Создание и переключение на новую ветку

```bash
git switch -c feature/login
# Создаёт ветку и переключает на неё
```

### 4. Создание от удалённой ветки

```bash
git switch -c feature/new origin/develop
# Новая ветка от origin/develop
```

### 5. Автоматический tracking (короткий синтаксис)

```bash
git switch feature/login
# Если ветки нет локально, но есть в одном remote
# Автоматически создаёт с tracking
```

### 6. Отключённый HEAD (detached)

```bash
git switch --detach abc1234
# HEAD указывает на коммит
```

### 7. Отключённый HEAD по тегу

```bash
git switch --detach v1.0.0
# Detached HEAD на теге
```

### 8. Принудительное переключение

```bash
git switch -f main
# Отбрасывает локальные изменения
```

### 9. Переключение с сохранением изменений

```bash
git switch -m feature/login
# Пытается слить локальные изменения
```

### 10. Создание orphan-ветки

```bash
git switch --orphan gh-pages
# Новая ветка без истории
```

### 11. Создание и переключение с tracking

```bash
git switch -c feature/new --track origin/feature/new
```

### 12. Принудительное создание ветки

```bash
git switch -C feature/login origin/develop
# Сбрасывает существующую ветку
```

### 13. Переключение с обновлением подмодулей

```bash
git switch --recurse-submodules main
```

### 14. Игнорирование других worktree

```bash
git switch --ignore-other-worktrees main
# Разрешает переключиться, даже если ветка в другом worktree
```

## Практические сценарии

### Быстрое переключение между ветками

```bash
git switch develop
# ... работа ...
git switch -
# Возврат на предыдущую ветку
```

### Новая feature-ветка

```bash
git switch -c feature/user-profile
# Начать работу над фичей
```

### Возврат к стабильной версии

```bash
git switch --detach v1.0.0
# Посмотреть на код версии 1.0.0
# Если нужно сохранить:
git switch -c hotfix/v1.0.1
```

## Связки с другими командами

```bash
# Создать ветку и закоммитить
git switch -c feature/new && git add . && git commit -m "Start feature"

# Переключиться и pull
git switch main && git pull

# Переключиться на предыдущую ветку
git switch -
```

## Советы

:::tip
Используйте `git switch` вместо `git checkout` для переключения веток — команда более безопасная и понятная.
:::

:::warning
`git switch` не восстанавливает файлы. Для этого используйте `git restore`.
:::

:::tip
Настройте алиас: `git config --global alias.sw switch`
:::

## См. также

- [checkout](checkout.md) — переключение и восстановление
- [restore](restore.md) — восстановление файлов
- [branch](branch.md) — управление ветками
- [merge](merge.md) — слияние веток
