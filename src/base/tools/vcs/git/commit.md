# git commit

**Уровень:** Начинающий
**Версия Git:** 0.99

Фиксирует изменения из индекса в репозиторий. Создаёт новый коммит с уникальным хешем SHA-1.

## Синтаксис

```bash
git commit
git commit [опции] [файл...]
git commit -m "сообщение"
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-m "сообщение"` | Задать сообщение коммита |
| `-a` / `--all` | Автоматически добавить все отслеживаемые файлы |
| `-am "сообщение"` | Добавить отслеживаемые + сообщение |
| `--amend` | Исправить последний коммит |
| `--no-edit` | Не открывать редактор при --amend |
| `--allow-empty` | Разрешить коммит без изменений |
| `--allow-empty-message` | Разрешить пустое сообщение |
| `-v` / `--verbose` | Показать diff в редакторе сообщения |
| `-s` / `--signoff` | Добавить подпись (Signed-off-by) |
| `-S` / `--gpg-sign` | Подписать GPG-ключом |
| `--no-verify` | Пропустить pre-commit хуки |
| `--dry-run` | Показать, что было бы закоммичено |
| `--fixup=<коммит>` | Создать fixup-коммит |
| `--squash=<коммит>` | Создать squash-коммит |
| `-i` / `--include` | Добавить файлы в индекс перед коммитом |
| `--author="Name <email>"` | Переопределить автора |
| `--date="дата"` | Переопределить дату |
| `-p` / `--patch` | Интерактивный выбор блоков |

## Примеры

### 1. Базовый коммит с сообщением

```bash
git commit -m "Add user authentication"
# Самый частый способ
```

### 2. Коммит всех отслеживаемых файлов

```bash
git commit -a -m "Fix typo in README"
# Не нужно git add для изменённых файлов
```

### 3. Коммит с подробным описанием

```bash
git commit -m "feat: add login page

- Add login form component
- Add validation
- Connect to API"

# Многострочное сообщение
```

### 4. Исправление последнего коммита

```bash
git commit --amend -m "New message"
# Изменяет сообщение последнего коммита
```

### 5. Добавление файлов в последний коммит

```bash
git add forgotten-file.js
git commit --amend --no-edit
# Добавляет файл без изменения сообщения
```

### 6. Коммит с подписью GPG

```bash
git commit -S -m "Signed commit"
# Требует настроенного GPG-ключа
```

### 7. Коммит с подписью (Signed-off-by)

```bash
git commit -s -m "Add feature"
# Добавляет: Signed-off-by: Name <email>
```

### 8. Коммит с verbose (diff в редакторе)

```bash
git commit -v
# Показывает diff в редакторе для написания сообщения
```

### 9. Пустой коммит (для запуска CI)

```bash
git commit --allow-empty -m "Trigger CI"
```

### 10. Fixup-коммит (для rebase --autosquash)

```bash
git commit --fixup=abc1234
# Создаёт коммит "fixup! Original message"
```

### 11. Squash-коммит (для rebase --autosquash)

```bash
git commit --squash=abc1234
# Создаёт коммит "squash! Original message"
```

### 12. Коммит с переопределением автора

```bash
git commit --author="John Doe <john@example.com>" -m "Fix"
```

### 13. Коммит с интерактивным выбором блоков

```bash
git commit -p
# Выбирает блоки для коммита
```

### 14. Коммит конкретных файлов

```bash
git commit file1.js file2.js -m "Update specific files"
```

### 15. Коммит с датой

```bash
git commit --date="2024-01-15" -m "Backdated commit"
```

## Структура сообщения

```
<тип>(<область>): <краткое описание>

<подробное описание>

<ссылки на задачи>
```

### Conventional Commits

| Тип | Описание |
|-----|----------|
| `feat` | Новый функционал |
| `fix` | Исправление бага |
| `docs` | Документация |
| `style` | Форматирование (без изменения логики) |
| `refactor` | Рефакторинг |
| `test` | Тесты |
| `chore` | Инструменты, зависимости |

```bash
git commit -m "feat(auth): add OAuth2 login"
git commit -m "fix(api): handle null response"
git commit -m "docs: update README with examples"
```

## Практические сценарии

### Пошаговый коммит части файла

```bash
git add -p file.js    # Выбрать блоки
git commit -m "Part 1"
git add -p file.js    # Выбрать следующие блоки
git commit -m "Part 2"
```

### Исправление забытого файла

```bash
git add forgotten.js
git commit --amend --no-edit
```

### Исправление автора последнего коммита

```bash
git commit --amend --author="Name <email@example.com>"
```

### Коммит с проверкой (pre-commit hooks)

```bash
# Pre-commit hook запускается автоматически
# Пропустить проверку:
git commit --no-verify -m "Emergency fix"
```

## Связки с другими командами

```bash
# Добавить всё и закоммитить
git add . && git commit -m "Update"

# Добавить, проверить и закоммитить
git add -u && git diff --cached && git commit -m "Update"

# Исправить последний коммит
git add . && git commit --amend --no-edit

# Коммит с автоматическим push
git commit -m "Update" && git push
```

## Советы

:::tip
Используйте `git commit -p` для точного контроля — можно закоммитить только часть изменений.
:::

:::warning
`--amend` перезаписывает хеш коммита. Не используйте для коммитов, которые уже запушены.
:::

:::tip
Пишите осмысленные сообщения — они помогают понять историю проекта через годы.
:::

## См. также

- [add](add.md) — добавление в индекс
- [status](status.md) — просмотр состояния
- [log](log.md) — история коммитов
- [reset](reset.md) — отмена коммитов
- [revert](revert.md) — отмена коммита новым коммитом
