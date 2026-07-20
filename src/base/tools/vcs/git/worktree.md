# git worktree

**Уровень:** Средний
**Минимальная версия Git:** 2.5

`git worktree` создаёт дополнительные рабочие деревья одного репозитория. Они разделяют объекты и большинство refs, но имеют отдельные `HEAD`, индекс и рабочие файлы.

## Основные команды

```bash
git worktree list [--porcelain]
git worktree add [<options>] <path> [<commit-ish>]
git worktree move <worktree> <new-path>
git worktree remove [--force] <worktree>
git worktree lock [--reason <text>] <worktree>
git worktree unlock <worktree>
git worktree prune [-n|--dry-run]
git worktree repair [<path>...]
```

## Создать worktree с новой веткой

```bash
git fetch origin
git worktree add -b feature/login ../docs-feature origin/main
```

Git создаст ветку `feature/login` от `origin/main` и checkout в указанном каталоге.

## Открыть существующую ветку

```bash
git worktree add ../docs-review review-branch
```

Одна обычная ветка не может быть checkout одновременно в двух worktree. Это защищает общий ref от конкурирующих изменений.

## Hotfix без переключения основного рабочего дерева

```bash
git fetch origin
git worktree add -b hotfix/login ../docs-hotfix origin/main
git -C ../docs-hotfix status --short --branch
# внесите исправление
git -C ../docs-hotfix add path/to/file
git -C ../docs-hotfix commit -m "Fix login regression"
git -C ../docs-hotfix push -u origin hotfix/login
```

После слияния hotfix и завершения работы:

```bash
git worktree remove ../docs-hotfix
git fetch --prune origin
git branch --merged origin/main
# если hotfix/login перечислена как слитая:
git branch -d hotfix/login
git worktree prune
```

`worktree remove` откажется удалять дерево с изменёнными или неотслеживаемыми файлами без `--force`.

## Detached worktree для проверки коммита

```bash
git worktree add --detach ../docs-old v2.0.0
git -C ../docs-old status --short --branch
```

Удобно для тестирования старой версии без создания ветки. Для сохранения новых коммитов создайте ветку:

```bash
git -C ../docs-old switch -c investigate-v2
```

## Просмотр и машинный формат

```bash
git worktree list
git worktree list --porcelain
```

Porcelain-формат стабилен для скриптов; не разбирайте обычный выровненный вывод.

## Переместить или восстановить связь

```bash
git worktree move ../docs-review ../reviews/docs
git worktree repair ../reviews/docs
```

`repair` полезен, если каталог переместили средствами файловой системы или переместили сам основной репозиторий.

## Заблокировать переносной worktree

```bash
git worktree lock --reason "External SSD is offline" ../docs-external
git worktree unlock ../docs-external
```

Lock предотвращает автоматическую очистку административных данных отсутствующего дерева.

## Очистить устаревшие записи

```bash
git worktree prune --dry-run
git worktree prune
```

Сначала используйте dry-run, особенно если часть worktree находится на отключаемых дисках.

::: danger Force-операции
`git worktree add --force` разрешает обход некоторых проверок ветки, а `remove --force` может удалить изменённые файлы. Применяйте force только после `git worktree list` и `git -C <path> status`.
:::

## Полезные ссылки

- [Официальная документация git worktree](https://git-scm.com/docs/git-worktree)
- [git switch](./switch.md)
- [git branch](./branch.md)
