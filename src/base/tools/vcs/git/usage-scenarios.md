# Практические сценарии Git

Ниже собраны последовательные workflows с проверками до и после изменений. Имена `main`, `origin` и пути замените на принятые в вашем проекте.

## 1. Начать работу с существующим проектом

```bash
git clone https://example.com/team/project.git
cd project
git status --short --branch
git remote -v
git branch -vv
```

Если используются submodule:

```bash
git submodule update --init --recursive
```

Личные данные автора настраивайте глобально только на собственной машине:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Настройки конкретного проекта можно задать без `--global`.

## 2. Безопасно обновить main

Прозрачный вариант с просмотром входящих коммитов:

```bash
git fetch --prune origin
git log --oneline --left-right main...origin/main
git switch main
git merge --ff-only origin/main
```

`--ff-only` не создаст неожиданный merge-коммит. Если ветки разошлись, Git остановится — сначала разберите локальные коммиты.

## 3. Разработать feature

### Создать ветку от актуального main

```bash
git fetch origin
git switch main
git merge --ff-only origin/main
git switch -c feature/login
```

### Сделать логичный коммит

```bash
git status --short
git diff
git add -p
git diff --cached
git commit -m "Add login validation"
```

`git add -p` или явные пути не позволяют случайно включить временные файлы так легко, как безусловный `git add .`.

### Обновить feature перед review

```bash
git fetch origin
git rebase origin/main
# при конфликте: исправить файлы, git add <path>, git rebase --continue
git diff --check
git diff origin/main...HEAD
```

Если команда договорилась сохранять merge-коммиты, вместо rebase используйте:

```bash
git merge origin/main
```

### Опубликовать

```bash
git push -u origin feature/login
```

После локального rebase уже опубликованной личной ветки:

```bash
git fetch origin
git log --left-right --oneline origin/feature/login...feature/login
git push --force-with-lease --force-if-includes origin feature/login
```

Не переписывайте общую ветку без согласования.

## 4. Работа с конфликтами

### Merge-конфликт

```bash
git merge feature/login
git status
```

Исправьте маркеры в каждом файле, затем:

```bash
git add path/to/resolved-file
git diff --check
git diff --cached
git merge --continue
```

Отменить незавершённый merge:

```bash
git merge --abort
```

### Rebase-конфликт

```bash
git rebase origin/main
git status
# исправьте текущий конфликт
git add path/to/resolved-file
git rebase --continue
```

Rebase может остановиться несколько раз — по одному разу для разных переносимых коммитов. Отмена всей операции:

```bash
git rebase --abort
```

Не запускайте `--continue`, если `git status` уже не сообщает о незавершённой операции.

## 5. Срочный hotfix без нарушения текущей работы

Создайте отдельное рабочее дерево от серверного main:

```bash
git fetch origin
git worktree add -b hotfix/login ../project-hotfix origin/main
git -C ../project-hotfix status --short --branch
```

Внесите и проверьте исправление:

```bash
git -C ../project-hotfix add path/to/fixed-file
git -C ../project-hotfix diff --cached
git -C ../project-hotfix commit -m "Fix login regression"
git -C ../project-hotfix push -u origin hotfix/login
```

После слияния pull request:

```bash
git worktree remove ../project-hotfix
git fetch --prune origin
git branch --merged origin/main
# если hotfix/login перечислена как слитая:
git branch -d hotfix/login
```

## 6. Выбрать правильную отмену

| Ситуация | Решение |
|---|---|
| Изменения файла ещё не staged | `git restore -- <file>` |
| Нужно убрать файл из индекса | `git restore --staged -- <file>` |
| Последний локальный коммит надо переделать | `git reset --soft HEAD^` или `git commit --amend` |
| Опубликованный коммит надо отменить | `git revert <commit>` |
| Потерян локальный commit после reset/rebase | найти через `git reflog`, создать recovery-ветку |
| Незавершённый merge/rebase надо отменить | `git merge --abort` / `git rebase --abort` |

### Восстановить потерянный коммит

```bash
git reflog --date=local
git show <old-head>
git branch recovered-work <old-head>
```

Сначала закрепите найденный коммит веткой; не начинайте с нового `reset --hard`.

## 7. Подготовить релиз

```bash
git fetch origin
git switch main
git merge --ff-only origin/main
git status --short
# запустите тесты проекта
git tag -a v2.4.0 -m "Release 2.4.0"
git show v2.4.0 --no-patch
git push --atomic origin main refs/tags/v2.4.0
```

`--atomic` гарантирует обновление обоих refs целиком, если сервер поддерживает режим. Не используйте `git push --tags`, когда нужно отправить только один релизный тег.

## 8. Случайно добавлен секрет

### Секрет ещё не закоммичен

```bash
git restore --staged -- .env
# добавьте правило .env в .gitignore
git check-ignore -v .env
```

### Секрет уже попал в коммит или был отправлен

1. Немедленно отзовите/замените ключ, пароль или токен.
2. Уберите файл из текущего состояния:

```bash
git rm --cached -- .env
git check-ignore -v .env
git commit -m "Stop tracking local environment file"
```

3. Согласуйте очистку всей истории с командой и владельцами remote. Переписывание refs требует специального инструмента, резервной копии, force-push и повторного клонирования/очистки старых клонов.

`git rm --cached` и `.gitignore` не удаляют секрет из старых коммитов.

## 9. Очистить локальный репозиторий

### Удалить устаревшие remote-tracking ветки

```bash
git remote prune --dry-run origin
git fetch --prune origin
```

### Удалить слитую локальную ветку

```bash
git branch --merged main
git branch -d feature/login
```

Не разбирайте вывод `git branch` через `grep | xargs`: имена, текущая ветка и нестандартные символы делают такой конвейер хрупким.

### Очистить артефакты сборки

Только игнорируемые файлы:

```bash
git clean -ndX
git clean -fdX
```

Все неотслеживаемые и игнорируемые файлы:

```bash
git clean -ndx
# внимательно проверьте .env, ключи и локальные данные
git clean -fdx
```

### Обслужить объекты

```bash
git gc --auto
```

Регулярные `git gc --aggressive` и `git gc --prune=now` не нужны и сокращают возможности восстановления.

## Связанные страницы

- [git status](./status.md)
- [git diff](./diff.md)
- [git branch](./branch.md)
- [git merge](./merge.md)
- [git rebase](./rebase.md)
- [git reset](./reset.md)
- [git reflog](./reflog.md)
- [git clean](./clean.md)
- [git worktree](./worktree.md)
