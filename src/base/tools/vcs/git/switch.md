# git switch

**Уровень:** Начальный
**Добавлена в Git:** 2.23

`git switch` переключает ветки и создаёт новые. Для восстановления файлов используйте `git restore`.

## Синтаксис

```bash
git switch [<options>] [<branch>]
git switch [<options>] --detach [<start-point>]
git switch [<options>] (-c|-C) <new-branch> [<start-point>]
```

## Основные опции

| Опция | Описание |
|---|---|
| `-c <name>`, `--create <name>` | Создать новую ветку и переключиться |
| `-C <name>`, `--force-create <name>` | Создать либо принудительно переместить существующую ветку |
| `-d`, `--detach` | Переключиться в detached HEAD |
| `--track[=<mode>]` | Настроить upstream; режим — `direct` или `inherit` |
| `--guess` / `--no-guess` | Разрешить/запретить подбор единственной remote-ветки |
| `-m`, `--merge` | Попытаться перенести локальные изменения трёхсторонним слиянием |
| `--discard-changes` | Выбросить локальные изменения, мешающие переключению |
| `--orphan <name>` | Создать ветку без родителей |
| `--recurse-submodules` | Обновить активные submodule к записанным состояниям |
| `--ignore-other-worktrees` | Обойти запрет checkout ветки в другом worktree |

## Переключить ветку

```bash
git status --short
git switch main
```

Вернуться к предыдущей:

```bash
git switch -
```

## Создать feature-ветку

```bash
git fetch origin
git switch -c feature/login origin/main
```

## Создать tracking-ветку

```bash
git switch --track origin/feature/login
```

Если существует только одна подходящая remote-ветка, Git часто угадает её:

```bash
git switch feature/login
```

Проверьте upstream через `git branch -vv`.

## Detached HEAD

```bash
git switch --detach v2.4.0
```

Для сохранения сделанных здесь коммитов:

```bash
git switch -c investigate-v2
```

## Перенести локальные изменения при переключении

```bash
git switch --merge other-branch
```

Git пытается выполнить трёхстороннее слияние и может оставить конфликтующие файлы. Сначала проверьте `git status`; для важных изменений обычно яснее сделать WIP-коммит или именованный stash.

## Принудительно создать/переместить ветку

```bash
git branch backup-feature feature/login
git switch -C feature/login origin/main
```

`-C` может переместить существующую ветку и скрыть её прежние коммиты из обычного лога. Backup-ветка делает действие обратимым.

## Orphan-ветка

```bash
git switch --orphan gh-pages
```

Git создаст новую историю без родителей и удалит отслеживаемые файлы из индекса/рабочего дерева. Проверьте `git status` перед первым коммитом.

## Submodule и worktree

```bash
git switch --recurse-submodules main
```

Активные submodule обновляются к коммитам, записанным в superproject, и их `HEAD` может стать detached. Локальные изменения внутри submodule могут помешать или быть потеряны при force-режимах.

```bash
git switch --ignore-other-worktrees main
```

::: danger Обход защиты worktree
Одна ветка обычно не должна быть checkout в двух worktree: оба каталога изменяют общий ref. `--ignore-other-worktrees` используйте только для осознанной диагностики, а для параллельной работы создайте отдельную ветку.
:::

## Обновить main

```bash
git fetch origin
git switch main
git merge --ff-only origin/main
```

Так обновление не создаст неожиданный merge-коммит.

## Полезные ссылки

- [Официальная документация git switch](https://git-scm.com/docs/git-switch)
- [git restore](./restore.md)
- [git checkout](./checkout.md)
- [git worktree](./worktree.md)
