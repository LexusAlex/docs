# git-rebase

**Уровень:** Продвинутый

**Версия Git:** 1.5.0

Перебазирует (rebase) коммиты на другую базу. Перемещает или применяет последовательность коммитов на новый базовый коммит, создавая линейную историю.

## Синтаксис

```bash
git rebase [<options>] [<upstream> [<branch>]]
git rebase --onto <newbase> [<upstream>] [<branch>]
git rebase --continue
git rebase --skip
git rebase --abort
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-i, --interactive` | Интерактивный режим для редактирования, squash, reorder коммитов |
| `--onto <newbase>` | Перебазировать на указанный коммит/ветку |
| `--abort` | Отменить rebase и вернуть исходное состояние |
| `--continue` | Продолжить после разрешения конфликтов |
| `--skip` | Пропустить текущий коммит при конфликте |
| `--autosquash` | Автоматически обрабатывать fixup!/squash! коммиты |
| `--autostash` | Автоматически stash/pop незакоммиченные изменения |
| `--root` | Перебазировать все коммиты от корня |
| `--exec <cmd>` | Выполнить команду после каждого перебазированного коммита |
| `--force-rebase` | Принудительно перебазировать даже без новых коммитов |
| `--no-ff` | Создавать новые коммиты даже при возможности fast-forward |
| `--onto <newbase>` | Новая база для перебазирования |
| `--upstream <upstream>` | Коммит, на который перебазировать |
| `--keep-base` | Сохранить исходный базовый коммит |
| `--fork-point` | Использовать fork-point для определения базы |

## Примеры

### 1. Простой rebase на main

```bash
# Находясь в ветке feature, перебазировать на main
git checkout feature
git rebase main
```

### 2. Интерактивный rebase (последние 5 коммитов)

```bash
# Открыть интерактивный режим для редактирования последних 5 коммитов
git rebase -i HEAD~5
```

### 3. Squash коммитов через интерактивный режим

```bash
# В интерактивном режиме заменить "pick" на "squash" для объединения
git rebase -i HEAD~3
# В редакторе: изменить pick на squash для нужных коммитов
```

### 4. Rebase onto конкретную ветку

```bash
# Перебазировать feature на конкретную точку в main
git rebase --onto main feature~3 feature
```

### 5. Rebase с автоматическим squash (autosquash)

```bash
# Используется с коммитами, начинающимися с fixup! или squash!
git rebase -i --autosquash main
```

### 6. Rebase с автосташем

```bash
# Автоматически спрятать и восстановить незакоммиченные изменения
git rebase --autostash main
```

### 7. Отмена rebase

```bash
# Если что-то пошло не так, отменить rebase
git rebase --abort
```

### 8. Продолжение rebase после разрешения конфликтов

```bash
# Разрешить конфликты в файлах
# ...
git add .
git rebase --continue
```

### 9. Пропуск проблемного коммита

```bash
# Пропустить коммит, который вызывает неразрешимые конфликты
git rebase --skip
```

### 10. Rebase всех коммитов от корня

```bash
# Перебазировать всю историю от корня
git rebase --root --onto main
```

### 11. Rebase с выполнением команды после каждого коммита

```bash
# Запустить тесты после каждого перебазированного коммита
git rebase --exec "npm test" main
```

### 12. Изменение порядка коммитов

```bash
# В интерактивном режиме переставить строки коммитов местами
git rebase -i HEAD~4
```

### 13. Переименование коммита

```bash
# В интерактивном режиме заменить "pick" на "reword"
git rebase -i HEAD~1
```

### 14. Разделение коммита на несколько

```bash
# В интерактивном режиме заменить "pick" на "edit"
git rebase -i HEAD~3
# После остановки:
git reset HEAD~
git add file1.txt
git commit -m "Часть 1"
git add file2.txt
git commit -m "Часть 2"
git rebase --continue
```

### 15. Rebase с force-rebase

```bash
# Принудительно перебазировать даже если нет новых коммитов
git rebase --force-rebase main
```

### 16. Rebase с no-ff

```bash
# Создавать новые коммиты даже при возможности fast-forward
git rebase --no-ff main
```

### 17. Rebase ветки на удалённую ветку

```bash
# Перебазировать на актуальное состояние удалённой ветки
git fetch origin
git rebase origin/main
```

### 18. Rebase с keep-base

```bash
# Сохранить исходный базовый коммит
git rebase --keep-base main
```

### 19. Интерактивный rebase конкретного диапазона

```bash
# Перебазировать коммиты от abc1234 до текущего HEAD
git rebase -i abc1234
```

### 20. Rebase с fork-point

```bash
# Использовать fork-point для точного определения базы
git rebase --fork-point main
```

## Практические сценарии

### Сценарий 1: Подготовка PR с чистой историей

```bash
# Перед созданием PR привести историю в порядок
git checkout feature/my-feature
git rebase -i main
# В интерактивном режиме:
# - squash промежуточные коммиты
# - переименовать коммиты
# - удалить отладочные коммиты
git push --force-with-lease origin feature/my-feature
```

### Сценарий 2: Обновление feature-ветки из main

```bash
# Синхронизировать ветку с актуальным main
git checkout feature/new-module
git fetch origin
git rebase origin/main
# Разрешить возможные конфликты
# ...
git add .
git rebase --continue
```

### Сценарий 3: Исправление последнего коммита

```bash
# Изменить сообщение или содержимое последнего коммита
git rebase -i HEAD~1
# В редакторе заменить pick на edit
# Внести изменения
git add .
git commit --amend
git rebase --continue
```

### Сценарий 4: Автоматический squash с fixup! коммитами

```bash
# Создать fixup! коммит
git commit -m "fixup! Исправление бага в модуле авторизации"
# Автоматически squash при rebase
git rebase -i --autosquash main
```

## Связки с другими командами

### Rebase и push с force-with-lease

```bash
git rebase main
git push --force-with-lease origin feature
```

### Rebase с предварительным stash

```bash
git stash
git rebase main
git stash pop
```

### Rebase с проверкой через diff

```bash
git diff main..feature
git rebase main
git diff main..feature
```

### Rebase с запуском тестов

```bash
git rebase --exec "npm test" main
```

### Rebase и merge для линейной истории

```bash
git checkout feature
git rebase main
git checkout main
git merge feature
```

## Советы

:::warning
При rebase публичных веток (pushed commits) используйте `git push --force-with-lease` вместо `--force` для безопасности.
:::

:::tip
Используйте `--autostash` чтобы не потерять незакоммиченные изменения при rebase.
:::

:::warning
Избегайте rebase веток, над которыми работают несколько людей — это может привести к дублированию коммитов.
:::

:::tip
Интерактивный rebase (`-i`) — мощный инструмент для очистки истории перед PR. Используйте squash для объединения промежуточных коммитов.
:::

## См. также

- [git-merge](./merge.md) — альтернативный способ интеграции изменений
- [git-cherry-pick](./cherry-pick.md) — выборочное применение коммитов
- [git-reflog](./reflog.md) — восстановление после неудачного rebase
- [git-stash](./stash.md) — временное сохранение изменений
- [git-commit](./commit.md) — создание коммитов (amend, --fixup)
