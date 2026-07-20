# git-push

**Уровень:** Начинающий

**Версия Git:** 1.5.0

Отправляет локальные коммиты в удалённый репозорий. Обновляет удалённые ссылки и передаёт все необходимые объекты.

## Синтаксис

```bash
git push [<удалённый_репозорий>] [<ветка>] [опции]
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--force` | Принудительно перезаписывает удалённые изменения |
| `--force-with-lease` | Принудительный push с проверкой актуальности |
| `--tags` | Отправляет все локальные теги |
| `--delete` | Удаляет удалённую ветку |
| `--set-upstream` | Устанавливает связь с удалённой веткой |
| `--dry-run` | Показывает, что будет отправлено |
| `--all` | Отправляет все ветки |
| `--mirror` | Отправляет все ссылки (ветки и теги) |
| `--no-verify` | Пропускает pre-push хуки |

## Примеры

1. Отправить изменения в origin/main:
```bash
git push origin main
```

2. Отправить текущую ветку:
```bash
git push
```

3. Отправить новую ветку и установить связь:
```bash
git push --set-upstream origin feature/new-api
```

4. Отправить с принудительной перезаписью:
```bash
git push --force origin main
```

5. Отправить с безопасной принудительной перезаписью:
```bash
git push --force-with-lease origin main
```

6. Отправить все теги:
```bash
git push --tags
```

7. Удалить удалённую ветку:
```bash
git push --delete origin feature/old-branch
```

8. Отправить все ветки:
```bash
git push --all origin
```

9. Проверить, что будет отправлено:
```bash
git push --dry-run origin main
```

10. Отправить в конкретный удалённый репозорий:
```bash
git push upstream main
```

11. Отправить с пропуском хуков:
```bash
git push --no-verify origin main
```

12. Отправить зеркало репозория:
```bash
git push --mirror origin
```

13. Отправить ветку с другим именем:
```bash
git push origin local-branch:remote-branch
```

14. Отправить и установить upstream для будущих push:
```bash
git push -u origin develop
```

15. Отправить конкретный тег:
```bash
git push origin tag v1.0.0
```

16. Удалить удалённый тег:
```bash
git push --delete origin v1.0.0
```

17. Отправить с перезаписью истории:
```bash
git push --force-with-lease --force-if-includes origin main
```

18. Отправить в несколько удалённых репозориев:
```bash
git push origin main && git push backup main
```

## Практические сценарии

### Публикация новой ветки

```bash
# Создаём и переключаемся на новую ветку
git checkout -b feature/user-auth

# Делаем коммиты
git add .
git commit -m "Add user authentication"

# Отправляем ветку и устанавливаем связь
git push --set-upstream origin feature/user-auth
```

### История переписана — безопасный force push

```bash
# Переписываем историю (rebase, amend, etc.)
git rebase -i HEAD~3

# Проверяем изменения
git log --oneline

# Безопасный force push
git push --force-with-lease origin feature-branch
```

### Удаление ветки после merge

```bash
# После merge PR в GitHub/GitLab

# Удаляем локальную ветку
git branch -d feature/user-auth

# Удаляем удалённую ветку
git push --delete origin feature/user-auth
```

## Связки с другими командами

```bash
# Pull перед push
git pull --rebase origin main && git push origin main

# Fetch, проверка и push
git fetch origin && git log --oneline origin/main..main && git push

# Push всех веток и тегов
git push --all origin && git push --tags
```

## Советы

:::tip
Используйте `--force-with-lease` вместо `--force` для безопасного принудительного push. Эта опция проверяет, что удалённые изменения не были обновлены другими пользователями.
:::

:::warning
Никогда не используйте `git push --force` на общих ветках (main, develop). Это может привести к потере чужих коммитов. Используйте `--force-with-lease` для безопасности.
:::

## См. также

- [git-fetch](./fetch.md) — получение изменений из удалённого репозория
- [git-pull](./pull.md) — получение и слияние изменений
- [git-remote](./remote.md) — управление удалёнными репозориями
