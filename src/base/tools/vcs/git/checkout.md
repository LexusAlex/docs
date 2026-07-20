# git checkout

**Уровень:** Средний
**Минимальная версия Git:** 0.99

`git checkout` — совместимая многоцелевая команда для переключения веток и восстановления файлов. В новом workflow обычно понятнее использовать `git switch` для веток и `git restore` для файлов.

## Основные формы

```bash
git checkout [<options>] <branch>
git checkout [<options>] -b <new-branch> [<start-point>]
git checkout [<options>] [<tree-ish>] [--] <pathspec>...
git checkout [<options>] --detach [<commit>]
```

## Переключить ветку

```bash
git status --short
git checkout main
```

Современный эквивалент:

```bash
git switch main
```

Создать ветку и переключиться:

```bash
git checkout -b feature/login origin/main
# современная форма
git switch -c feature/login origin/main
```

## Tracking-ветка

```bash
git checkout --track origin/feature/login
```

Git создаст локальную ветку и настроит upstream. Если имя однозначно совпадает, часто достаточно `git switch feature/login`.

## Detached HEAD

```bash
git checkout --detach v2.4.0
```

Коммиты в detached HEAD не принадлежат ветке. Чтобы сохранить работу:

```bash
git switch -c investigate-v2
```

## Восстановить файлы: важная разница источников

Без `tree-ish` checkout берёт содержимое **из индекса**:

```bash
git checkout -- path/to/file
```

Если файл уже staged, это не обязательно версия из `HEAD`. Явный современный эквивалент:

```bash
git restore --worktree -- path/to/file
```

С указанным коммитом Git обновляет и индекс, и рабочий файл:

```bash
git checkout HEAD -- path/to/file
git checkout <commit> -- path/to/file
```

Современная явная форма:

```bash
git restore --source=<commit> --staged --worktree -- path/to/file
```

::: warning Потеря незакоммиченного текста
Checkout пути перезаписывает выбранные рабочие файлы. Сначала проверьте `git diff` и `git diff --cached`.
:::

## Интерактивно восстановить части

```bash
git checkout -p -- path/to/file
# современная форма
git restore -p -- path/to/file
```

## Конфликтующие версии

```bash
git checkout --ours -- path/to/conflicted-file
git checkout --theirs -- path/to/conflicted-file
git add path/to/conflicted-file
```

Во время rebase роли `ours` и `theirs` могут выглядеть поменявшимися: `ours` относится к уже переписанной базе, `theirs` — к переносимому коммиту. Проверяйте содержимое, а не выбирайте сторону только по названию.

## Переключиться с локальными изменениями

```bash
git checkout -m other-branch
```

`-m` пытается выполнить трёхстороннее слияние локальных изменений и может оставить конфликты. Это не гарантия сохранения без вмешательства. Более прозрачный вариант:

```bash
git stash push -u -m "WIP before branch switch"
git switch other-branch
```

## Orphan-ветка

Старый интерфейс:

```bash
git checkout --orphan gh-pages
```

Он создаёт ветку без родителей, но индекс и файлы требуют отдельной проверки перед первым коммитом. В современном Git используйте более явную команду:

```bash
git switch --orphan gh-pages
```

## Force

```bash
git checkout -f main
```

`-f` при переключении выбрасывает мешающие локальные изменения и неслитые записи. Не используйте его до `git status` и сохранения нужной работы.

## Полезные ссылки

- [Официальная документация git checkout](https://git-scm.com/docs/git-checkout)
- [git switch](./switch.md)
- [git restore](./restore.md)
- [git stash](./stash.md)
