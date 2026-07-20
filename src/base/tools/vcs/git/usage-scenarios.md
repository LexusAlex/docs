# Сценарии использования Git

Типовые рабочие процессы и команды для повседневной работы с Git.

## Ежедневная работа

### Начало дня (синхронизация)

```bash
# Переключиться на main и получить изменения
git switch main
git pull

# Обновить develop
git switch develop
git pull
```

### Работа над фичей

```bash
# Создать ветку от develop
git switch -c feature/user-profile develop

# Работать...
# Добавить изменения
git add .
git commit -m "feat(profile): add user avatar"

# Продолжить работу...
git add .
git commit -m "feat(profile): add bio section"

# Отправить на сервер
git push -u origin feature/user-profile
```

### Завершение фичи (Merge Request)

```bash
# Обновить ветку перед merge
git switch develop
git pull
git switch feature/user-profile
git rebase develop

# Разрешить конфликты (если есть)
# ...
git rebase --continue

# Отправить обновлённую ветку
git push --force-with-lease

# После merge на сервере — удалить локальную ветку
git switch develop
git pull
git branch -d feature/user-profile
```

## Работа с Pull Request

### Подготовка ветки для PR

```bash
# Переключиться на актуальный main
git switch main
git pull

# Создать ветку
git switch -c feature/new-feature

# Работать...
git add .
git commit -m "feat: add new feature"

# Отправить
git push -u origin feature/new-feature
```

### Обновление ветки после ревью

```bash
# Получить изменения из main
git fetch origin
git rebase origin/main

# Разрешить конфликты
# ...
git rebase --continue

# Force push (с защитой)
git push --force-with-lease
```

## Работа с конфликтами

### При merge

```bash
git switch main
git merge feature/login
# Конфликт в file.js

# Посмотреть конфликты
git status

# Решить в редакторе
# Оставить нужные изменения

# Отметить как решённый
git add file.js
git commit
```

### При rebase

```bash
git rebase main
# Конфликт в file.js

# Решить конфликт
git add file.js
git rebase --continue

# Или отменить rebase
git rebase --abort
```

## Горячие исправления (Hotfix)

```bash
# Переключиться на релизную ветку
git switch main
git pull

# Создать ветку hotfix
git switch -c hotfix/v1.0.1

# Исправить баг
git add .
git commit -m "fix: critical bug in payment"

# Слить в main
git switch main
git merge hotfix/v1.0.1
git tag v1.0.1
git push origin main --tags

# Слить в develop
git switch develop
git merge hotfix/v1.0.1

# Удалить ветку
git branch -d hotfix/v1.0.1
```

## Работа с тегами

### Релиз

```bash
# Переключиться на main
git switch main
git pull

# Создать тег
git tag -a v2.0.0 -m "Release version 2.0.0"

# Отправить теги
git push origin v2.0.0
# или все теги
git push origin --tags
```

### Откат к предыдущей версии

```bash
# Посмотреть теги
git tag -l

# Переключиться на тег (detached HEAD)
git switch --detach v1.9.0

# Или создать ветку от тега
git switch -c hotfix/v1.9.1 v1.9.0
```

## Восстановление

### Отмена незакоммиченных изменений

```bash
# Один файл
git restore file.js

# Все файлы
git restore .
```

### Отмена последнего коммита

```bash
# Сохранить изменения в рабочей директории
git reset --soft HEAD~1

# Полностью отменить
git reset --hard HEAD~1
```

### Отмена коммита, который уже запушен

```bash
# Создать новый коммит, отменяющий изменения
git revert abc1234
git push
```

### Восстановление удалённой ветки

```bash
# Найти коммит в reflog
git reflog

# Восстановить ветку
git branch feature/deleted abc1234
```

## Работа со stash

### Временное сохранение

```bash
# Сохранить изменения
git stash push -m "WIP: login feature"

# Посмотреть stash
git stash list

# Восстановить
git stash pop

# Или применить без удаления
git stash apply stash@{0}
```

### Переключение между задачами

```bash
# В процессе работы над фичей
git stash push -m "WIP: user profile"

# Переключиться на hotfix
git switch main
git switch -c hotfix/bug-123

# После hotfix вернуться
git switch feature/user-profile
git stash pop
```

## Оптимизация репозитория

### Очистка

```bash
# Удалить слитые ветки
git branch --merged main | grep -v "\*\|main\|develop" | xargs git branch -d

# Удалить неотслеживаемые файлы
git clean -fd

# Удалить игнорируемые файлы
git clean -fdx

# Оптимизировать репозиторий
git gc --aggressive --prune=now
```

### Проверка целостности

```bash
# Проверка репозитория
git fsck

# Проверка размера
git count-objects -vH
```

## Связки с другими командами

```bash
# Быстрый коммит и push
git add . && git commit -m "update" && git push

# Обновление ветки перед работой
git switch main && git pull && git switch - && git rebase main

# Просмотр изменений перед коммитом
git status && git diff --cached

# Очистка + оптимизация
git gc --prune=now && git remote prune origin
```

## Советы

:::tip
Всегда обновляйте ветку перед началом работы: `git pull` или `git fetch` + `git rebase`.
:::

:::warning
Избегайте `git push --force`. Используйте `git push --force-with-lease` — это защищает от перезаписи чужих коммитов.
:::

:::tip
Используйте `git stash` для временного сохранения изменений вместо создания WIP-коммитов.
:::

:::warning
Не коммитьте секреты (ключи, пароли) в репозиторий. Используйте `.gitignore` и переменные окружения.
:::

## См. также

- [init](init.md) — создание репозитория
- [branch](branch.md) — управление ветками
- [merge](merge.md) — слияние веток
- [rebase](rebase.md) — перебазирование
- [stash](stash.md) — временное сохранение
- [tag](tag.md) — управление тегами
