# git-pull

**Уровень:** Начинающий

**Версия Git:** 1.5.0

Загружает изменения из удалённого репозория и интегрирует их в текущую ветку. Является комбинацией `git fetch` и `git merge` (или `git rebase`).

## Синтаксис

```bash
git pull [<удалённый_репозорий>] [<ветка>] [опции]
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--rebase` | Использует rebase вместо merge для интеграции |
| `--no-rebase` | Использует merge (по умолчанию) |
| `--ff` | Разрешает fast-forward merge |
| `--no-ff` | Создаёт коммит слияния даже при fast-forward |
| `--squash` | Объединяет все изменения в один коммит |
| `--autostash` | Автоматически стэшит и восстанавливает изменения |
| `--no-commit` | Не создаёт автоматический коммит слияния |
| `--depth <n>` | Ограничивает глубину загрузки |
| `--tags` | Загружает все теги |
| `--prune` | Удаляет устаревшие ссылки |

## Примеры

1. Загрузить и слить изменения из origin/main:
```bash
git pull origin main
```

2. Загрузить из origin (текущая ветка):
```bash
git pull
```

3. Загрузить с использованием rebase:
```bash
git pull --rebase origin main
```

4. Загрузить с squash (все изменения в одном коммите):
```bash
git pull --squash origin main
```

5. Автоматически стэшить незакоммиченные изменения:
```bash
git pull --autostash
```

6. Загрузить без автоматического коммита:
```bash
git pull --no-commit origin main
```

7. Загрузить с принудительным fast-forward:
```bash
git pull --ff-only origin main
```

8. Загрузить с созданием коммита слияния:
```bash
git pull --no-ff origin main
```

9. Загрузить из upstream:
```bash
git pull upstream main
```

10. Загрузить конкретную ветку:
```bash
git pull origin develop
```

11. Загрузить с удалением устаревших ссылок:
```bash
git pull --prune origin
```

12. Загрузить все теги:
```bash
git pull --tags
```

13. Неполная загрузка (последние 50 коммитов):
```bash
git pull --depth 50 origin main
```

14. Загрузить и перебазировать на origin/main:
```bash
git pull --rebase origin main
```

15. Загрузить с настройкой rebase по умолчанию:
```bash
git config --global pull.rebase true
git pull
```

16. Загрузить с автостэшем и rebase:
```bash
git pull --rebase --autostash origin main
```

17. Загрузить из нескольких источников:
```bash
git pull origin main && git pull upstream main
```

18. Загрузить с проверкой перед слиянием:
```bash
git fetch origin && git log --oneline HEAD..origin/main && git pull origin main
```

## Практические сценарии

### Синхронизация с основной веткой

```bash
# Переключаемся на main
git checkout main

# Загружаем и сливаем изменения
git pull origin main

# Проверяем историю
git log --oneline -5
```

### Обновление feature-ветки

```bash
# Переключаемся на feature-ветку
git checkout feature/new-api

# Загружаем изменения из main с rebase
git pull --rebase origin main

# Разрешаем конфликты, если есть
# ...

# Продолжаем rebase после разрешения конфликтов
git rebase --continue
```

### Работа с незакоммиченными изменениями

```bash
# Проверяем статус
git status

# Автоматически стэшим и загружаем
git pull --autostash

# Проверяем, что изменения восстановлены
git status
```

## Связки с другими командами

```bash
# Fetch и ручное слияние
git fetch origin && git merge origin/main

# Fetch, diff и pull
git fetch origin && git diff main origin/main && git pull

# Pull и push
git pull origin main && git push origin main
```

## Советы

:::tip
Используйте `git pull --rebase` для линейной истории без лишних коммитов слияния. Настройте это поведение глобально: `git config --global pull.rebase true`.
:::

:::warning
При использовании `git pull --rebase` убедитесь, что у вас нет незакоммиченных изменений. Используйте `--autostash` для автоматического сохранения.
:::

## См. также

- [git-fetch](./fetch.md) — получение изменений из удалённого репозория
- [git-remote](./remote.md) — управление удалёнными репозориями
- [git-push](./push.md) — отправка изменений в удалённый репозорий
