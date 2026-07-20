# git restore

**Уровень:** Начальный
**Добавлена в Git:** 2.23

`git restore` восстанавливает файлы в рабочем дереве и/или индексе. В отличие от `git reset`, команда не перемещает ветку.

## Модель источников

- Без `--staged` рабочий файл восстанавливается из индекса.
- С `--staged` индекс по умолчанию восстанавливается из `HEAD`.
- `--source=<tree>` задаёт источник явно.

## Синтаксис

```bash
git restore [<options>] [--source=<tree>] [--staged] [--worktree] -- <pathspec>...
```

Разделитель `--` полезен, если путь похож на опцию или имя ветки.

## Основные опции

| Опция | Описание |
|---|---|
| `-s <tree>`, `--source=<tree>` | Взять содержимое из коммита, ветки или другого tree-ish |
| `-S`, `--staged` | Восстановить индекс |
| `-W`, `--worktree` | Восстановить рабочее дерево |
| `-p`, `--patch` | Интерактивно выбрать части патча |
| `--ours`, `--theirs` | Взять одну из сторон неслитого файла из индекса |
| `--conflict=<style>` | Задать представление конфликтов: `merge`, `diff3` или `zdiff3` |
| `--ignore-unmerged` | Не завершаться ошибкой на неслитых путях |
| `--recurse-submodules` | Обновить активные submodule до записанного коммита |

## Примеры

### Отменить незакоммиченные изменения файла

```bash
git diff -- path/to/file
git restore -- path/to/file
```

Рабочая копия станет такой же, как версия в индексе.

::: warning Потеря изменений
`git restore` перезаписывает незакоммиченный текст в выбранных файлах. Сначала проверьте `git diff`; при сомнениях сохраните патч или сделайте `git stash push`.
:::

### Убрать файл из индекса, сохранив рабочую копию

```bash
git restore --staged -- path/to/file
git status --short
```

Источник для индекса по умолчанию — `HEAD`.

### Восстановить и индекс, и рабочее дерево из HEAD

```bash
git restore --source=HEAD --staged --worktree -- path/to/file
```

Короткая форма `git restore HEAD -- file` неверна: источник задаётся только через `--source`/`-s`.

### Восстановить файл из другого коммита

```bash
git show <commit>:path/to/file
git restore --source=<commit> -- path/to/file
```

По умолчанию изменится только рабочая копия. Чтобы сразу подготовить эту версию к коммиту:

```bash
git restore --source=<commit> --staged --worktree -- path/to/file
```

### Выбрать отдельные части изменений

```bash
git restore --patch -- path/to/file
```

Команда показывает фрагменты и спрашивает, какие вернуть к состоянию индекса.

### Восстановить все отслеживаемые файлы

```bash
git diff --stat
git restore --worktree :/
```

Специальный pathspec `:/` означает корень репозитория и не зависит от текущего каталога.

### Разрешить конфликт

```bash
git status --short
git restore --ours -- path/to/conflicted-file
# или
git restore --theirs -- path/to/conflicted-file
git add path/to/conflicted-file
```

Во время `rebase` и `pull --rebase` значения `ours` и `theirs` могут казаться поменявшимися местами: rebase временно считает уже переписанную базу нашей стороной, а переносимый коммит — их стороной. Всегда проверяйте результат через `git diff --check` и обычный `git diff`.

### Обновить submodule вместе с записанным состоянием

```bash
git restore --source=HEAD --worktree --recurse-submodules -- path/to/submodule
```

Это возвращает активный submodule к коммиту, записанному в superproject, и переводит его `HEAD` в detached-состояние. Локальные изменения внутри submodule могут быть потеряны — сначала проверьте `git -C path/to/submodule status`.

## Restore, reset или checkout

| Задача | Предпочтительная команда |
|---|---|
| Восстановить файлы | `git restore` |
| Убрать файлы из индекса | `git restore --staged` |
| Переместить ветку/`HEAD` | `git reset` |
| Переключить ветку | `git switch` |
| Совместимость со старым Git | `git checkout` |

## Полезные ссылки

- [Официальная документация git restore](https://git-scm.com/docs/git-restore)
- [git reset](./reset.md)
- [git checkout](./checkout.md)
