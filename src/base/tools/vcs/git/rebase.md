# git rebase

**Уровень:** Продвинутый
**Минимальная версия Git:** 1.5

`git rebase` переносит коммиты на новую базу и создаёт для них новые идентификаторы. Команда помогает получить линейную историю, но переписывает переносимые коммиты.

## Синтаксис

```bash
git rebase [<options>] [<upstream> [<branch>]]
git rebase [<options>] --onto <newbase> [<upstream> [<branch>]]
git rebase (--continue | --abort | --skip | --quit | --edit-todo)
```

`upstream` — позиционный аргумент; опции `--upstream` нет.

## Основные опции

| Опция | Описание |
|---|---|
| `-i`, `--interactive` | Открыть todo-список для изменения серии коммитов |
| `--onto <newbase>` | Явно задать новую базу |
| `--rebase-merges` | Попытаться сохранить структуру merge-коммитов |
| `--autosquash` | Автоматически расположить `fixup!`/`squash!` коммиты |
| `--autostash` | Временно убрать локальные изменения и применить их после rebase |
| `--update-refs` | Переместить локальные refs, указывающие на переписываемые коммиты |
| `--empty=<mode>` | Для ставших пустыми коммитов выбрать `drop`, `keep` или `stop` |
| `--exec <cmd>` | Выполнить команду после каждого выбранного коммита |
| `--keep-base` | Использовать merge-base upstream и ветки как базу |

## Обновить feature-ветку поверх origin/main

```bash
git fetch origin
git switch feature/login
git status --short
git rebase origin/main
```

После успешного rebase проверьте серию:

```bash
git log --graph --oneline --decorate -12
git diff origin/main...HEAD
git diff --check
```

## Перенести подветку через `--onto`

Допустим, `topic` создана от `next`, а перенести её нужно на `main`:

```bash
git rebase --onto main next topic
```

Git выберет коммиты, достижимые из `topic`, но не из `next`, и повторит их поверх `main`.

## Интерактивно отредактировать последние коммиты

```bash
git rebase -i HEAD~4
```

Основные действия todo:

| Действие | Назначение |
|---|---|
| `pick` | оставить коммит |
| `reword` | изменить сообщение |
| `edit` | остановиться для изменения содержимого |
| `squash` | объединить с предыдущим и отредактировать сообщение |
| `fixup` | объединить с предыдущим без сохранения обычного сообщения |
| `drop` | удалить коммит из новой истории |

Чтобы включить конкретный коммит `A`, указывайте его родителя:

```bash
git rebase -i A^
```

Диапазон после `A` (`git rebase -i A`) сам `A` не включает.

## Fixup и autosquash

```bash
git commit --fixup=<target-commit>
git rebase -i --autosquash <target-commit>^
```

Так Git сам связывает исправление с целевым коммитом.

## Проверять каждый коммит тестами

```bash
git rebase -i --exec "npm test" origin/main
```

При ошибке исправьте проблему, добавьте изменения и продолжите:

```bash
git add path/to/fixed-file
git rebase --continue
```

## Конфликты и управление операцией

```bash
git status
git diff
# исправьте конфликт
git add path/to/resolved-file
git rebase --continue
```

Другие действия:

```bash
git rebase --skip
git rebase --abort
git rebase --quit
```

`--abort` возвращает ветку к исходному состоянию. `--quit` оставляет текущие файлы и `HEAD`, но завершает служебное состояние rebase.

`--autostash` разрешает начать rebase с грязным рабочим деревом, однако финальное применение stash может конфликтовать. Для важных правок безопаснее сохранить их явным коммитом или именованным stash.

## Публикация переписанной ветки

::: danger Не переписывайте общую историю без согласования
Rebase меняет идентификаторы коммитов. Не выполняйте его над коммитами, на которых уже строят работу другие участники.
:::

Для своей опубликованной feature-ветки:

```bash
git fetch origin
git log --left-right --oneline origin/feature...feature
git push --force-with-lease --force-if-includes origin feature
```

Для сравнения старой и новой серий особенно полезен `git range-diff`:

```bash
git range-diff <old-base>..<old-tip> <new-base>..<new-tip>
```

## Полезные ссылки

- [Официальная документация git rebase](https://git-scm.com/docs/git-rebase)
- [git merge](./merge.md)
- [git push](./push.md)
- [git reflog](./reflog.md)
