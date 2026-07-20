# git-cherry-pick

**Уровень:** Средний

**Версия Git:** 1.5.0

Применяет изменения из существующих коммитов в текущую ветку. Позволяет выборочно переносить конкретные коммиты без слияния целых веток.

## Синтаксис

```bash
git cherry-pick <commit>...
git cherry-pick --continue
git cherry-pick --skip
git cherry-pick --abort
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--no-commit` | Применить изменения, но не создавать автоматический коммит |
| `--edit` | Открыть редактор для изменения сообщения коммита |
| `-x` | Добавить в сообщение "(cherry picked from commit ...)" |
| `--signoff` | Добавить Signed-off-by в сообщение коммита |
| `--abort` | Отменить cherry-pick и вернуть исходное состояние |
| `--continue` | Продолжить после разрешения конфликтов |
| `--skip` | Пропустить текущий коммит при конфликте |
| `--strategy` | Указать стратегию слияния |
| `-m` | Указать родительский коммит для merge-коммитов |
| `--no-verify` | Пропустить pre-commit и commit-msg хуки |
| `--allow-empty` | Позволить создание пустых коммитов |
| `--keep-redundant-commits` | Сохранить коммиты, которые не вносят изменений |
| `--ff` | Если возможно, использовать fast-forward вместо создания нового коммита |

## Примеры

### 1. Cherry-pick одного коммита

```bash
# Применить конкретный коммит в текущую ветку
git cherry-pick abc1234
```

### 2. Cherry-pick нескольких коммитов

```bash
# Применить несколько коммитов последовательно
git cherry-pick abc1234 def5678 ghi9012
```

### 3. Cherry-pick без автоматического коммита

```bash
# Применить изменения, но не коммитить
git cherry-pick --no-commit abc1234
# Проверить изменения
git diff --staged
# Вручную сделать коммит
git commit -m "Применены изменения из abc1234"
```

### 4. Cherry-pick с сообщением из оригинала и ссылкой

```bash
# Добавить "(cherry picked from commit ...)" в сообщение
git cherry-pick -x abc1234
```

### 5. Cherry-pick с редактированием сообщения

```bash
# Открыть редактор для изменения сообщения
git cherry-pick --edit abc1234
```

### 6. Cherry-pick с подписью

```bash
# Добавить Signed-off-by
git cherry-pick --signoff abc1234
```

### 7. Cherry-pick диапазона коммитов

```bash
# Применить диапазон коммитов (не включая abc1234, включая def5678)
git cherry-pick abc1234..def5678
```

### 8. Cherry-pick диапазона включительно

```bash
# Пр�именить диапазон коммитов включительно
git cherry-pick abc1234^..def5678
```

### 9. Отмена cherry-pick при конфликтах

```bash
# Если возникли конфликты и нужно отменить
git cherry-pick --abort
```

### 10. Продолжение cherry-pick после разрешения конфликтов

```bash
# Разрешить конфликты в файлах
# ...
git add .
git cherry-pick --continue
```

### 11. Пропуск проблемного коммита

```bash
# Пропустить коммит, который вызывает неразрешимые конфликты
git cherry-pick --skip
```

### 12. Cherry-pick merge-коммита

```bash
# Указать родительский коммит для merge-коммита (номер родителя)
git cherry-pick -m 1 merge-commit-hash
```

### 13. Cherry-pick с указанной стратегией

```bash
# Использовать стратегию "ours" при конфликтах
git cherry-pick --strategy ours abc1234
```

### 14. Cherry-pick с пропуском хуков

```bash
# Пропустить pre-commit хуки
git cherry-pick --no-verify abc1234
```

### 15. Cherry-pick пустого коммита

```bash
# Позволить создание пустого коммита
git cherry-pick --allow-empty abc1234
```

### 16. Cherry-pick с сохранением избыточных коммитов

```bash
# Сохранить коммиты, которые не вносят изменений
git cherry-pick --keep-redundant-commits abc1234
```

### 17. Cherry-pick с fast-forward

```bash
# Если возможно, использовать fast-forward
git cherry-pick --ff abc1234
```

### 18. Cherry-pick коммита из другой ветки

```bash
# Найти коммит в другой ветке и применить
git log feature --oneline
git cherry-pick feature-branch-commit-hash
```

### 19. Cherry-pick с автоматическим squash

```bash
# Применить несколько коммитов как один
git cherry-pick --no-commit abc1234 def5678
git commit -m "Объединённые изменения из abc1234 и def5678"
```

### 20. Cherry-pick с проверкой через diff

```bash
# Проверить что будет применено
git diff abc1234^..abc1234
git cherry-pick abc1234
```

## Практические сценарии

### Сценарий 1: Перенос горячего фикса в несколько веток

```bash
# Применить критический фикс в release и develop ветки
git checkout release/v1.0
git cherry-pick -x hotfix-commit-hash
git push origin release/v1.0

git checkout develop
git cherry-pick -x hotfix-commit-hash
git push origin develop
```

### Сценарий 2: Выборочное применение фич из feature-ветки

```bash
# Применить только определённые коммиты из feature-ветки
git checkout main
git cherry-pick feature-commit-1 feature-commit-3
```

### Сценарий 3: Исправление коммита в wrong branch

```bash
# Коммит попал не в ту ветку — перенести его
git checkout correct-branch
git cherry-pick wrong-branch-commit-hash

git checkout wrong-branch
git reset --hard HEAD~1
```

### Сценарий 4: Применение патча из PR

```bash
# Применить изменения из PR без merge
git fetch origin pull/123/head:pr-123
git cherry-pick pr-123-commit-hash
```

## Связки с другими командами

### Cherry-pick с проверкой через show

```bash
git show abc1234
git cherry-pick abc1234
```

### Cherry-pick с логированием

```bash
git log --oneline other-branch
git cherry-pick chosen-commit-hash
```

### Cherry-pick с revert

```bash
# Применить коммит, затем отменить его если нужно
git cherry-pick abc1234
git revert HEAD
```

### Cherry-pick с stash

```bash
git stash
git cherry-pick abc1234
git stash pop
```

### Cherry-pick нескольких коммитов из ветки

```bash
git log feature --oneline
git cherry-pick hash1 hash2 hash3
```

## Советы

:::tip
Используйте `-x` при cherry-pick, чтобы в сообщении коммита была ссылка на оригинал. Это помогает отслеживать происхождение изменений.
:::

:::warning
При частом использовании cherry-pick возникает дублирование коммитов, что усложняет историю. Рассмотрите merge или rebase для больших объёмов изменений.
:::

:::tip
Для применения нескольких коммитов используйте `--no-commit`, а затем один `git commit` — это создаст чистую историю.
:::

:::warning
При cherry-pick merge-коммитов обязательно указывайте `-m` с номером родителя, иначе могут возникнуть неожиданные конфликты.
:::

## См. также

- [git-merge](./merge.md) — слияние целых веток
- [git-rebase](./rebase.md) — перебазирование коммитов
- [git-revert](./revert.md) — отмена изменений коммита
- [git-diff](./diff.md) — просмотр различий между коммитами
- [git-log](./log.md) — просмотр истории коммитов
