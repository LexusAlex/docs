# git pull

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git pull` сначала выполняет `git fetch`, затем интегрирует полученную ветку через merge или rebase. Для предсказуемой истории явно выбирайте способ интеграции.

## Синтаксис

```bash
git pull [<options>] [<repository> [<refspec>...]]
```

## Основные опции

| Опция | Описание |
|---|---|
| `--ff-only` | Разрешить только fast-forward; при расхождении завершиться ошибкой |
| `--rebase[=<mode>]` | Интегрировать через rebase; режим: `false`, `true`, `merges` или `interactive` |
| `--no-rebase` | Интегрировать через merge |
| `--autostash` | Временно убрать локальные изменения; итоговое применение может конфликтовать |
| `--prune` | При fetch удалить устаревшие remote-tracking refs |
| `--tags` | Помимо обычного fetch получить все теги, а не «слить все теги» |
| `--no-commit` | При merge остановиться перед созданием merge-коммита |
| `--no-edit` | Использовать автоматически подготовленное сообщение merge-коммита |

Поведение без `--rebase`, `--no-rebase` или `--ff-only` зависит от конфигурации. В современных версиях Git при расходящихся ветках может потребоваться явный выбор.

## Самый прозрачный способ обновить main

```bash
git fetch origin
git log --oneline --left-right main...origin/main
git switch main
git merge --ff-only origin/main
```

Разделение fetch и merge позволяет сначала увидеть, что именно пришло с сервера.

Эквивалентная короткая команда для ветки без локальных расходящихся коммитов:

```bash
git pull --ff-only origin main
```

## Обновить feature через rebase

```bash
git switch feature/login
git status --short
git pull --rebase origin feature/login
```

После rebase идентификаторы локальных коммитов изменятся. Если старая версия ветки уже опубликована, для отправки понадобится согласованный `--force-with-lease`, а не обычный force-push.

## Явный merge

```bash
git pull --no-rebase origin main
```

Если локальная и удалённая истории разошлись, Git может создать merge-коммит.

## Squash при pull

```bash
git pull --squash origin feature/login
git diff --cached
git commit -m "Integrate login feature"
```

`--squash` только подготавливает суммарные изменения в индексе. Чтобы получить один коммит, его нужно создать явно.

## Конфликты

Для merge-режима:

```bash
git status
# исправьте файлы
git add path/to/resolved-file
git merge --continue
# или отмените
git merge --abort
```

Для rebase-режима:

```bash
git status
# исправьте файлы
git add path/to/resolved-file
git rebase --continue
# или отмените
git rebase --abort
```

Не запускайте `--continue` без проверки `git status`: если операция завершилась автоматически, продолжать уже нечего.

## Настройка поведения

Настройка только текущего репозитория:

```bash
# Разрешать pull только без расхождения
git config pull.ff only
```

Или, если команда договорилась о rebase для feature-веток:

```bash
git config pull.rebase true
```

Не добавляйте `--global`, пока не хотите изменить поведение всех локальных репозиториев.

## Несколько remote

Не выполняйте подряд безусловные `pull origin main` и `pull upstream main`: это сразу интегрирует две истории. Сначала получите обе и сравните:

```bash
git fetch origin
git fetch upstream
git log --graph --oneline --decorate --all -20
```

После проверки явно выберите `merge`, `rebase` или `reset` для нужной ветки.

## Полезные ссылки

- [Официальная документация git pull](https://git-scm.com/docs/git-pull)
- [git fetch](./fetch.md)
- [git merge](./merge.md)
- [git rebase](./rebase.md)
