# git merge

**Уровень:** Средний
**Минимальная версия Git:** 0.99

`git merge` объединяет историю одной или нескольких веток с текущей веткой. Результатом может быть fast-forward, merge-коммит или конфликт, который нужно разрешить вручную.

## Синтаксис

```bash
git merge [<options>] [<commit>...]
git merge --continue
git merge --abort
git merge --quit
```

Перед слиянием проверьте текущую ветку и незакоммиченные изменения:

```bash
git branch --show-current
git status --short
```

## Основные опции

| Опция | Описание |
|---|---|
| `--ff` | Разрешить fast-forward; обычно это поведение по умолчанию |
| `--ff-only` | Завершить только fast-forward, иначе вернуть ошибку |
| `--no-ff` | Создать merge-коммит даже при возможности fast-forward |
| `--no-commit` | Остановиться перед созданием merge-коммита |
| `--squash` | Подготовить суммарный патч без merge-коммита и без записи ancestry |
| `--edit` / `--no-edit` | Открыть или не открывать редактор сообщения merge-коммита |
| `--autostash` | Временно спрятать локальные изменения и применить их после merge |
| `-s <strategy>` | Выбрать стратегию слияния |
| `-X<option>` | Передать параметр стратегии |
| `--no-verify` | Пропустить `pre-merge-commit` и `commit-msg` hooks |
| `--signoff`, `--gpg-sign[=<keyid>]` | Добавить signoff или подписать merge-коммит |

Для слияния двух веток современная стратегия по умолчанию — `ort`. Старое имя `recursive` сохранено как синоним `ort`.

## Обычный merge feature-ветки

```bash
git fetch origin
git switch main
git merge --ff-only origin/main
git merge feature/login
git log --graph --oneline --decorate -12
```

Если слияние прошло автоматически, Git уже обновил ветку: отдельные `git add` и `git commit` не нужны, кроме режима `--no-commit` или ручного разрешения конфликтов.

## Fast-forward и merge-коммит

Только fast-forward:

```bash
git merge --ff-only feature/login
```

Гарантированный merge-коммит:

```bash
git merge --no-ff feature/login
```

Проверить результат до создания merge-коммита:

```bash
git merge --no-ff --no-commit feature/login
git diff --cached --stat
git commit
```

::: info Ограничение `--no-commit`
Один `--no-commit` не останавливает fast-forward, потому что коммит не создаётся. Добавьте `--no-ff`, если нужна обязательная пауза перед коммитом.
:::

## Squash merge

```bash
git switch main
git merge --squash feature/login
git diff --cached
git commit -m "Add login feature"
```

`--squash` не создаёт коммит автоматически и не записывает feature-ветку как родителя. История feature-ветки не удаляется, но будущий Git merge не считает её уже слитой через этот squash-коммит.

## Разрешение конфликтов

```bash
git merge feature/login
git status
# исправьте файлы
git add path/to/resolved-file
git merge --continue
```

Проверка перед продолжением:

```bash
git diff --check
git diff --cached
```

Отмена всего незавершённого слияния:

```bash
git merge --abort
```

`--quit` забывает служебное состояние merge, но сохраняет текущие изменения файлов.

## Autostash

```bash
git merge --autostash feature/login
```

Git создаёт временный stash и применяет его после merge. Применение stash может само вызвать конфликты, поэтому для важных изменений прозрачнее сделать именованный stash вручную и проверить его перед `pop`.

## Стратегия `ours` и параметр `-Xours`

```bash
git merge -s ours obsolete-branch
```

Стратегия `ours` полностью игнорирует дерево другой ветки и только записывает её как слитую. Это редкая операция для замены истории.

```bash
git merge -Xours feature/login
```

`-Xours` относится к конфликтующим фрагментам стратегии `ort`; неконфликтующие изменения другой ветки всё равно применяются. Всегда проверяйте итоговый diff и тесты.

## Отмена завершённого локального merge

Если merge ещё не опубликован и после него не было важных изменений:

```bash
git show --no-patch ORIG_HEAD
git reset --merge ORIG_HEAD
```

Для опубликованного merge создайте обратный коммит:

```bash
git revert -m 1 <merge-commit>
```

## Полезные ссылки

- [Официальная документация git merge](https://git-scm.com/docs/git-merge)
- [Сценарии разрешения конфликтов](./usage-scenarios.md#_4-работа-с-конфликтами)
- [git rebase](./rebase.md)
- [git revert](./revert.md)
