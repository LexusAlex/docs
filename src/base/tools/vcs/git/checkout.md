# git checkout

**Уровень:** Начинающий
**Версия Git:** 0.99

Переключает ветки, восстанавливает файлы и создаёт новые ветки. Универсальная команда, которую в Git 2.23+ рекомендуется заменить на `git switch` и `git restore`.

## Синтаксис

```bash
git checkout <ветка>
git checkout -b <новая-ветка> [начальная-точка]
git checkout [опции] [--] <путь...>
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-b <имя>` | Создать и переключиться на новую ветку |
| `-B <имя>` | Создать/сбросить и переключиться |
| `--detach` | Отключить HEAD от ветки |
| `-t` / `--track` | Настроить tracking (при создании ветки) |
| `--orphan <имя>` | Создать ветку без истории |
| `-f` / `--force` | Принудительное переключение |
| `--ours` / `--theirs` | Выбор при конфликтах |
| `-m` / `--merge` | Трёхстороннее слияние при переключении |
| `--conflict=<стиль>` | Стиль отображения конфликтов |
| `-p` / `--patch` | Интерактивный выбор блоков |
| `--ignore-skip-worktree-bits` | Игнорировать sparse-checkout |
| `--recurse-submodules` | Обновить подмодули |
| `--no-overlay` | Удалять отсутствующие файлы |

## Примеры

### 1. Переключение на существующую ветку

```bash
git checkout main
# Переключает на ветку main
```

### 2. Создание и переключение на новую ветку

```bash
git checkout -b feature/login
# Создаёт ветку и переключает на неё
```

### 3. Возврат к предыдущей ветке

```bash
git checkout -
# Возвращает на предыдущую ветку
```

### 4. Восстановление файла из HEAD

```bash
git checkout -- file.js
# Отменяет изменения в file.js
```

### 5. Восстановление файла из коммита

```bash
git checkout abc1234 -- file.js
# Берёт file.js из коммита abc1234
```

### 6. Создание ветки от удалённой

```bash
git checkout -b feature/new origin/develop
# Новая ветка от origin/develop
```

### 7. Автоматический tracking

```bash
git checkout --track origin/feature/login
# Создаёт локальную ветку с tracking
```

### 8. Короткий синтаксис tracking

```bash
git checkout feature/login
# Если ветки нет локально, но есть в одном remote
# Автоматически создаёт с tracking
```

### 9. Отключённый HEAD (detached)

```bash
git checkout --detach abc1234
# HEAD указывает на коммит, а не на ветку
```

### 10. Отключённый HEAD по тегу

```bash
git checkout v1.0.0
# Detached HEAD на теге
```

### 11. Восстановление всех .js файлов

```bash
git checkout -- "*.js"
# Все .js файлы из HEAD
```

### 12. Восстановление директории

```bash
git checkout -- src/
# Все файлы в src/ из HEAD
```

### 13. Создание orphan-ветки (без истории)

```bash
git checkout --orphan gh-pages
# Новая ветка без родительских коммитов
```

### 14. Принудительное переключение

```bash
git checkout -f main
# Отбрасывает локальные изменения
```

### 15. Переключение с merge (сохранение изменений)

```bash
git checkout -m feature/login
# Пытается слить локальные изменения
```

### 16. Выбор "наших" при конфликтах

```bash
git checkout --ours conflicted-file.js
```

### 17. Выбор "ихних" при конфликтах

```bash
git checkout --theirs conflicted-file.js
```

### 18. Интерактивный выбор блоков

```bash
git checkout -p -- file.js
# Выбирает блоки для восстановления
```

### 19. Восстановление файла из конкретной ветки

```bash
git checkout develop -- config.js
# Берёт config.js из ветки develop
```

### 20. Создание ветки с определённого коммита

```bash
git checkout -b hotfix/v1.0.1 v1.0.0
# Ветка для хотфикса от тега v1.0.0
```

## Практические сценарии

### Экспериментальная ветка

```bash
git checkout -b experiment
# Поработать...
# Если неудачно:
git checkout main
git branch -D experiment
```

### Восстановление удалённого файла

```bash
git checkout HEAD -- deleted-file.txt
# Восстанавливает файл из последнего коммита
```

### Быстрое переключение между ветками

```bash
git checkout develop
# ... работа ...
git checkout -
# Возврат на предыдущую ветку
```

## Связки с другими командами

```bash
# Создать ветку и закоммитить
git checkout -b feature/new && git add . && git commit -m "Start feature"

# Восстановить и посмотреть diff
git checkout -- file.js && git diff

# Переключиться и pull
git checkout main && git pull
```

## Советы

:::tip
Для переключения веток используйте `git switch` (Git 2.23+) — более понятный синтаксис.
:::

:::warning
`git checkout -- file.js` без указания коммита берёт из HEAD. Убедитесь, что хотите отменить изменения.
:::

:::tip
Используйте `git checkout -` для быстрого возврата на предыдущую ветку.
:::

## См. также

- [switch](switch.md) — переключение веток (рекомендуется)
- [restore](restore.md) — восстановление файлов (рекомендуется)
- [branch](branch.md) — управление ветками
- [merge](merge.md) — слияние веток
