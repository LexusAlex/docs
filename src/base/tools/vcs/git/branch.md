# git branch

**Уровень:** Начинающий
**Версия Git:** 0.99

Создаёт, переименовывает, удаляет и отображает ветки. Ветка — это указатель на коммит.

## Синтаксис

```bash
git branch
git branch [опции] <имя>
git branch [опции] <имя> <начальная-точка>
```

## Основные опции

| Опция | Описание |
|-------|----------|
| (без аргументов) | Список всех веток |
| `-a` | Все ветки (локальные + удалённые) |
| `-r` | Только удалённые ветки |
| `-v` / `-vv` | Подробная информация (последний коммит + tracking) |
| `-d` | Удалить ветку (merged) |
| `-D` | Принудительное удаление |
| `-m [<старое>] <новое>` | Переименовать ветку |
| `-M [<старое>] <новое>` | Принудительное переименование |
| `-c` / `-C` | Копировать ветку |
| `--list` | Список веток с фильтром |
| `--contains <коммит>` | Ветки, содержащие коммит |
| `--merged [<коммит>]` | Слитые ветки |
| `--no-merged [<коммит>]` | Неслитые ветки |
| `--sort=<ключ>` | Сортировка |
| `--set-upstream-to=<upstream>` | Настроить tracking |
| `--unset-upstream` | Удалить tracking |
| `-f` / `--force` | Принудительное действие |
| `--edit-description` | Описание ветки |

## Примеры

### 1. Список всех локальных веток

```bash
git branch
# * main
#   develop
#   feature/login
```

### 2. Все ветки (включая удалённые)

```bash
git branch -a
# * main
#   remotes/origin/main
#   remotes/origin/develop
```

### 3. Только удалённые ветки

```bash
git branch -r
# origin/main
# origin/develop
```

### 4. Подробная информация

```bash
git branch -vv
# * main     abc1234 [origin/main] Latest commit
#   develop  def5678 [origin/develop: ahead 2] Dev commit
```

### 5. Создание новой ветки

```bash
git branch feature/new-feature
# Создаёт ветку, но НЕ переключает на неё
```

### 6. Создание от конкретного коммита

```bash
git branch hotfix abc1234
# Ветка от коммита abc1234
```

### 7. Удаление merged-ветки

```bash
git branch -d feature/old
# Ошибка, если ветка не слита
```

### 8. Принудительное удаление

```bash
git branch -D feature/abandoned
# Удаляет даже неслитую ветку
```

### 9. Переименование текущей ветки

```bash
git branch -m new-name
# Переименовывает текущую ветку
```

### 10. Переименование любой ветки

```bash
git branch -m old-name new-name
```

### 11. Ветки, содержащие коммит

```bash
git branch --contains abc1234
# Какие ветки содержат этот коммит
```

### 12. Список слитых веток

```bash
git branch --merged
# Ветки, которые уже слиты в текущую
```

### 13. Список неслитых веток

```bash
git branch --no-merged
# Ветки, которые ещё не слиты
```

### 14. Удаление всех слитых веток

```bash
git branch --merged | grep -v "main" | xargs git branch -d
# Удаляет все слитые ветки кроме main
```

### 15. Настройка tracking

```bash
git branch --set-upstream-to=origin/develop develop
# Отслеживание удалённой ветки
```

### 16. Удаление tracking

```bash
git branch --unset-upstream develop
```

### 17. Копирование ветки

```bash
git branch -C feature/old feature/new
# Копирует ветку с историей
```

### 18. Описание ветки

```bash
git branch --edit-description feature/login
# Открывает редактор для описания
```

### 19. Сортировка по дате

```bash
git branch --sort=-committerdate -v
# Ветки от новых к старым
```

### 20. Фильтрация по маске

```bash
git branch --list "feature/*"
# Только feature-ветки
```

## Практические сценарии

### Очистка слитых веток

```bash
git checkout main
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d
```

### Просмотр веток с последними коммитами

```bash
git branch -v --sort=-committerdate
```

### Проверка перед удалением

```bash
git branch --no-merged main
# Какие ветки ещё не слиты
```

## Связки с другими командами

```bash
# Создать и переключиться
git branch feature/new && git switch feature/new

# Удалить удалённую ветку
git branch -d local-branch && git push origin --delete remote-branch

# Список веток + последний коммит
git branch -v --sort=-committerdate | head -10
```

## Советы

:::tip
Используйте `git switch -c` вместо `git branch` + `git checkout` — быстрее и нагляднее.
:::

:::warning
`git branch -D` удаляет ветку без предупреждения. Проверяйте `git branch --no-merged` перед удалением.
:::

:::tip
Настройте алиас для очистки: `git config --global alias.cleanup '!git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d'`
:::

## См. также

- [checkout](checkout.md) — переключение веток
- [switch](switch.md) — переключение веток (рекомендуется)
- [merge](merge.md) — слияние веток
- [log](log.md) — история коммитов
