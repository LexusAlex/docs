# git stash

**Уровень:** Средний
**Версия Git:** 1.5.3
**Версия документации:** 1.0

Временно сохраняет незакоммиченные изменения (из индекса и рабочей директории) в специальный стек и очищает рабочую директорию до состояния последнего коммита. Позволяет быстро переключиться на другую задачу, не теряя текущий прогресс.

## Синтаксис

```bash
git stash [push [-m <message>] [-p] [-k] [-u] [-S] [<pathspec>...]]
git stash (pop | apply) [-q] [--index] [<stash>]
git stash list [<options>]
git stash show [-u] [<stash>]
git stash drop [-q] [<stash>]
git stash clear
git stash branch <branchname> [<stash>]
git stash store [-m <message>] [-q] <commit>
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `push` | Сохранить изменения в стек stash (по умолчанию) |
| `pop` | Применить последний stash и удалить его из стека |
| `apply` | Применить последний stash, не удаляя из стека |
| `list` | Показать все сохранённые stash-записи |
| `show` | Показать изменения в stash |
| `drop` | Удалить конкретный stash из стека |
| `clear` | Удалить все stash-записи |
| `branch` | Создать ветку из stash-записи |
| `save <message>` | Сохранить stash с сообщением (устаревший синтаксис) |
| `--include-untracked`, `-u` | Включить неотслеживаемые файлы |
| `--staged`, `-S` | Сохранить только staged-изменения |
| `--patch`, `-p` | Интерактивно выбрать hunks для stash |
| `--keep-index`, `-k` | Сохранить staged-изменения в индексе |
| `--message <message>`, `-m` | Добавить описание к stash |
| `--quiet`, `-q` | Подавить вывод |
| `--index` | При pop/apply восстановить состояние индекса |
| `--pathspec-from-file=<file>` | Прочитать pathspec из файла |

## Примеры

### 1. Простое сохранение изменений

```bash
# Сохранить все незакоммиченные изменения
git stash
```

### 2. Сохранить с описанием

```bash
# Добавить понятное сообщение
git stash push -m "WIP: эксперимент с авторизацией"
```

### 3. Посмотреть список stash-записей

```bash
# Показать все сохранённые stash
git stash list
```

### 4. Применить последний stash с удалением (pop)

```bash
# Восстановить изменения и удалить stash из стека
git stash pop
```

### 5. Применить stash без удаления (apply)

```bash
# Восстановить изменения, оставив stash в стеке
git stash apply
```

### 6. Удалить конкретный stash

```bash
# Удалить stash по индексу
git stash drop stash@{2}
```

### 7. Очистить все stash

```bash
# Удалить все сохранённые stash-записи
git stash clear
```

### 8. Создать ветку из stash

```bash
# Создать новую ветку и применить stash
git stash branch new-feature stash@{0}
```

### 9. Сохранить неотслеживаемые файлы

```bash
# Включить в stash новые (untracked) файлы
git stash push -u -m "с новыми файлами"
```

### 10. Сохранить только staged-изменения

```bash
# Застенжил изменения, теперь сохраняем только их
git stash push --staged -m "только staged"
```

### 11. Интерактивный stash (--patch)

```bash
# Выбрать конкретные hunks для сохранения
git stash push -patch
```

### 12. Сохранить с сохранением staged-состояния

```bash
# Stash оставит staged-файлы в индексе
git stash push --keep-index -m "сохранить индекс"
```

### 13. Показать содержимое stash

```bash
# Посмотреть, что сохранено в stash
git stash show stash@{0}
```

### 14. Показать полный diff stash

```bash
# Подробный diff stash-записи
git stash show -p stash@{0}
```

### 15. Применить конкретный stash по индексу

```bash
# Применить не последний, а второй stash
git stash apply stash@{1}
```

### 16. Применить stash с восстановлением индекса

```bash
# Восстановить staged/untaged состояние как было
git stash pop --index
```

### 17. Сохранить конкретные файлы

```bash
# Stash только указанные файлы
git stash push -m "только конфиг" -- config.yml .env
```

### 18. Применить stash к другой ветке

```bash
# Переключиться на ветку и применить stash
git checkout other-branch
git stash pop
```

### 19. Сохранить с подавлением вывода

```bash
# Тихий режим
git stash push -q -m "тихий stash"
```

### 20. Сохранить с включением staged-файлов (старый синтаксис)

```bash
# Устаревший, но рабочий синтаксис
git stash save "мои изменения"
```

## Практические сценарии

### Быстрое переключение на горячий фикс

```bash
# Есть незакоммиченные изменения, нужно сделать hotfix
git stash push -m "текущая работа над фичей"
git checkout main
git pull
# Делаем hotfix...
git checkout feature
git stash pop
```

### Эксперимент с изменениями

```bash
# Сохранить текущее состояние перед экспериментом
git stash push -u -m "до эксперимента"
# Пробуем что-то новое...
# Не получилось — возвращаемся
git stash pop
```

### Перенос изменений между ветками

```bash
# Есть изменения в ветке A, нужны в ветке B
git stash push -m "изменения для переноса"
git checkout branch-b
git stash pop
```

### Частичное stash (только часть файлов)

```bash
# Сохранить только некоторые изменения
git stash push -p -m "частичный stash"
# Или конкретные файлы
git stash push -- src/utils.js src/app.js
```

## Связки с другими командами

```bash
# Stash + checkout (переключиться и сохранить)
git stash && git checkout main && git stash pop

# Stash + pull (обновить и восстановить)
git stash && git pull && git stash pop

# Stash + branch (создать ветку из stash)
git stash && git checkout -b new-branch && git stash pop

# Stash + status (проверить и сохранить)
git status && git stash push -m "сохранение"

# List + show (просмотреть конкретный stash)
git stash list && git stash show -p stash@{1}

# Stash + clean (полная очистка)
git stash -u && git clean -fd
```

## Советы

:::tip Всегда добавляйте описание
Используйте `git stash push -m "описание"`, чтобы не забыть, что сохранено в каждом stash. Без описания легко запутаться.
:::

:::warning `git stash pop` может вызвать конфликты
При pop возможны merge-конфликты. В этом случае stash не удаляется — разрешите конфликты и сделайте `git stash drop` вручную.
:::

:::tip Используйте `--keep-index` для partial-commits
Флаг `--keep-index` полезен, когда вы хотите закоммитить staged-изменения, но сохранить остальное в stash.
:::

:::warning Не храните stash слишком долго
Stash-записи легко забыть. Регулярно просматривайте `git stash list` и удаляйте ненужные.
:::

:::tip `git stash branch` для сложных stash
Если pop вызывает конфликты, используйте `git stash branch <name>` для создания чистой ветки на основе stash.
:::

## См. также

- [git reset](./reset.md) — сброс индекса и HEAD
- [git restore](./restore.md) — восстановление файлов
- [git checkout](./checkout.md) — переключение веток
- [git clean](./clean.md) — удаление неотслеживаемых файлов
- [git worktree](./worktree.md) — работа с несколькими рабочими деревьями
