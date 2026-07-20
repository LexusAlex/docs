# git-merge

**Уровень:** Средний

**Версия Git:** 0.99

Объединяет изменения из одной или более веток в текущую ветку. Создаёт новый коммит слияния (merge commit), если не используется fast-forward.

## Синтаксис

```bash
git merge [<options>] <commit>...
git merge [<options>] <remote>/<branch>
git merge --abort
git merge --continue
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--no-ff` | Создаёт коммит слияния даже при возможности fast-forward |
| `--squash` | Объединяет все изменения в один коммит без автоматического коммита |
| `--abort` | Отменяет текущее слияние и восстанавливает состояние до него |
| `--continue` | Продолжает слияние после разрешения конфликтов |
| `--strategy` | Указывает стратегию слияния (recursive, octopus, ours, subtree) |
| `-m` | Задаёт сообщение для коммита слияния |
| `--no-commit` | Выполняет слияние, но не создаёт коммит |
| `--edit` | Открывает редактор для изменения сообщения слияния |
| `--log` | Добавляет краткие сообщения коммитов в сообщение слияния |
| `--signoff` | Добавляет Signed-off-by в сообщение коммита |
| `--no-verify` | Пропускает pre-commit и commit-msg хуки |
| `--ff-only` | Выполняет слияние только если возможен fast-forward |
| `--autostash` | Автоматически выполняет stash до и pop после rebase |
| `--squash` | Применяет изменения без создания коммита слияния |
| `--abort` | Отменяет текущее слияние |
| `--continue` | Продолжает после разрешения конфликтов |

## Примеры

### 1. Простое слияние ветки (fast-forward)

```bash
# Находясь в ветке main, слить ветку feature
git checkout main
git merge feature
```

### 2. Слияние с запретом fast-forward

```bash
# Создаёт коммит слияния даже если возможен fast-forward
git merge --no-ff feature
```

### 3. Слияние с сообщением

```bash
# Указать собственное сообщение для коммита слияния
git merge -m "Merge feature: добавлена авторизация" feature
```

### 4. Squash-слияние

```bash
# Объединить все изменения ветки в один коммит
git merge --squash feature
git commit -m "Добавлена функциональность авторизации"
```

### 5. Слияние без автоматического коммита

```bash
# Слить изменения, но не создавать коммит
git merge --no-commit feature
# Проверить изменения
git diff --staged
# Затем вручную сделать коммит
git commit -m "Merge с дополнительными правками"
```

### 6. Слияние с логом коммитов

```bash
# Добавить список коммитов в сообщение слияния
git merge --log feature
```

### 7. Слияние с подписью

```bash
# Добавить Signed-off-by в сообщение
git merge --signoff feature
```

### 8. Слияние конкретного коммита

```bash
# Слить конкретный коммит из другой ветки
git merge abc1234
```

### 9. Слияние удалённой ветки

```bash
# Слить ветку из удалённого репозитория
git merge origin/feature
```

### 10. Слияние с указанной стратегией

```bash
# Использовать стратегию "ours" при конфликтах
git merge -s ours feature
```

### 11. Слияние с стратегией recursive

```bash
# Стратегия recursive (по умолчанию) с опцией patience
git merge -X patience feature
```

### 12. Отмена слияния при конфликтах

```bash
# Если возникли конфликты и нужно отменить
git merge --abort
```

### 13. Продолжение слияния после разрешения конфликтов

```bash
# Разрешить конфликты в файлах
# ...
git add .
git merge --continue
```

### 14. Слияние с пропуском хуков

```bash
# Пропустить pre-commit хуки
git merge --no-verify feature
```

### 15. Слияние только при возможности fast-forward

```bash
# Если fast-forward невозможен, завершится ошибкой
git merge --ff-only feature
```

### 16. Слияние нескольких веток

```bash
# Слить несколько веток одновременно
git merge feature1 feature2 feature3
```

### 17. Слияние с редактированием сообщения

```bash
# Открыть редактор для изменения сообщения
git merge --edit feature
```

### 18. Слияние ветки с тегом

```bash
# Слить конкретный тег
git merge v1.0.0
```

### 19. Слияние с автосташем

```bash
# Автоматически спрятать незакоммиченные изменения
git merge --autostash feature
```

### 20. Слияние с конфликтами и их разрешение

```bash
# Начать слияние
git merge feature
# Если есть конфликты - разрешить их в файлах
# Добавить разрешённые файлы
git add resolved-file.txt
# Продолжить слияние
git merge --continue
```

## Практические сценарии

### Сценарий 1: Интеграция функциональности в main

```bash
# Разработчик завершил работу над веткой feature/user-auth
# Нужно интегрировать изменения в main
git checkout main
git pull origin main
git merge --no-ff feature/user-auth -m "Merge feature/user-auth: система авторизации"
git push origin main
```

### Сценарий 2: Горячий фикс (hotfix)

```bash
# Срочный багфикс нужно слить в production и develop
git checkout main
git merge --no-ff hotfix/critical-bug -m "Hotfix: исправлен критический баг"
git push origin main

git checkout develop
git merge --no-ff hotfix/critical-bug -m "Hotfix: исправлен критический баг"
git push origin develop
```

### Сценарий 3: Обновление ветки feature из main

```bash
# Синхронизировать ветку feature с актуальным main
git checkout feature/new-module
git merge main
# Разрешить возможные конфликты
# ...
git add .
git commit -m "Sync with main"
```

### Сценарий 4: Squash-слияние для чистой истории

```bash
# Объединить все коммиты PR в один
git checkout main
git merge --squash feature/big-feature
git commit -m "feat: добавлена новая крупная фича"
```

## Связки с другими командами

### Слияние после rebase

```bash
git checkout feature
git rebase main
git checkout main
git merge feature
```

### Слияние с предварительным тестированием

```bash
git merge --no-commit feature
npm test
git commit -m "Merge feature с прошедшими тестами"
```

### Слияние с автоматическим stash

```bash
git stash
git merge feature
git stash pop
```

### Слияние ветки из fetch

```bash
git fetch origin
git merge origin/feature
```

### Слияние с проверкой через diff

```bash
git diff main..feature
git merge feature
```

## Советы

:::tip
Используйте `--no-ff` для сохранения информации о ветке в истории коммитов. Это делает историю более читаемой и позволяет легко откатить целую ветку.
:::

:::tip
Перед слиянием всегда делайте `git pull` в целевой ветке, чтобы избежать лишних конфликтов.
:::

:::warning
При использовании `--squash` вы теряете историю отдельных коммитов ветки. Используйте только когда объединение истории нежелательно.
:::

:::warning
Никогда не сливайте непроверенный код в ветки production/main без прохождения тестов.
:::

## См. также

- [git-rebase](./rebase.md) — альтернативный способ интеграции изменений
- [git-cherry-pick](./cherry-pick.md) — выборочное применение коммитов
- [git-stash](./stash.md) — временное сохранение изменений
- [git-branch](./branch.md) — управление ветками
- [git-conflict](./conflict.md) — разрешение конфликтов слияния
