# git-worktree

**Уровень:** Продвинутый
**Версия Git:** 2.5.0

Управляет несколькими рабочими деревьями, привязанными к одному репозиторию. Позволяет одновременно работать с несколькими ветками без переключения и без копирования репозитория.

## Синтаксис

```bash
git worktree add [опции] <путь> [<ветка>]
git worktree list [опции]
git worktree move <путь> <новый-путь>
git worktree remove [опции] <путь>
git worktree prune [опции]
git worktree lock [опции] <путь>
git worktree unlock <путь>
```

## Основные опции

| Опция | Описание |
|---|---|
| `add` | Добавить новое рабочее дерево |
| `list` | Список рабочих деревьев |
| `move` | Переместить рабочее дерево |
| `remove` | Удалить рабочее дерево |
| `prune` | Удалить недействительные деревья |
| `lock` | Заблокировать рабочее дерево |
| `unlock` | Разблокировать рабочее дерево |
| `--detach` | Отделить HEAD в новом дереве |
| `--checkout` | Выполнить checkout ветки |
| `--lock` | Заблокировать при создании |

## Примеры

1. Добавить рабочее дерево для ветки:
```bash
git worktree add ../feature-tree feature-branch
```

2. Добавить рабочее дерево с новой веткой:
```bash
git worktree add -b new-feature ../new-tree
```

3. Список рабочих деревьев:
```bash
git worktree list
```

4. Удалить рабочее дерево:
```bash
git worktree remove ../feature-tree
```

5. Переместить рабочее дерево:
```bash
git worktree move ../old-path ../new-path
```

6. Заблокировать рабочее дерево:
```bash
git worktree lock ../feature-tree
```

7. Разблокировать рабочее дерево:
```bash
git worktree unlock ../feature-tree
```

8. Добавить дерево в режиме detached HEAD:
```bash
git worktree add --detach ../review-tree HEAD~3
```

9. Добавить дерево с принудительной проверкой:
```bash
git worktree add --force ../backup-tree main
```

10. Очистка недействительных деревьев:
```bash
git worktree prune
```

11. Добавить дерево для ревью кода:
```bash
git worktree add ../review-pr-123 origin/feature-branch
```

12. Добавить дерево для хотфикса:
```bash
git worktree add -b hotfix-1.2 ../hotfix-tree v1.2.0
```

13. Список деревьев с подробной информацией:
```bash
git worktree list --porcelain
```

14. Добавить дерево с блокировкой:
```bash
git worktree add --lock ../stable-tree main
```

15. Удалить дерево принудительно:
```bash
git worktree remove --force ../old-tree
```

## Практические сценарии

**Параллельная разработка:**
Работа над несколькими функциями одновременно без переключения веток.

```bash
git worktree add ../feature-auth feature/authentication
git worktree add ../feature-api feature/api-refactoring
# Работаем одновременно в двух директориях
```

**Ревью pull request:**
Создание отдельного дерева для проверки PR без остановки текущей работы.

```bash
git worktree add ../review-pr origin/feature-branch
cd ../review-pr
npm ci && npm test
cd -
```

**Экстренный хотфикс:**
Быстрое создание изолированного окружения для исправления критического бага.

```bash
git worktree add -b hotfix-v2.1 ../hotfix v2.1.0
cd ../hotfix
# Исправляем баг
git commit -am "fix: критическое исправление"
git checkout main && git merge hotfix-v2.1
```

## Связки с другими командами

```bash
# Проверка ветки в отдельном дереве
git worktree add ../test-branch origin/feature && cd ../test-branch && npm test

# Создание хотфикса
git worktree add -b hotfix ../hotfix v1.0.0 && cd ../hotfix && git commit -am "fix"

# Очистка неиспользуемых деревьев
git worktree list && git worktree prune

# Переключение между деревьями
cd ../feature-tree && git pull && cd -
```

## Советы

:::tip
Рабочие деревья позволяют избежать `git stash` при переключении веток — просто создайте отдельное дерево для каждой задачи.
:::

:::warning
Нельзя иметь два рабочих дерева с одной и тегой веткой. Используйте `--detach` или создавайте новую ветку.
:::

## См. также

- [git-branch](/base/tools/vcs/git/branch) — управление ветками
- [git-checkout](/base/tools/vcs/git/checkout) — переключение веток
- [git-stash](/base/tools/vcs/git/stash) — сохранение изменений
- [git-clone](/base/tools/vcs/git/clone) — клонирование репозитория
- [git-remote](/base/tools/vcs/git/remote) — управление удалёнными репозиториями
