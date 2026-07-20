# git fetch

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git fetch` загружает объекты и обновляет remote-tracking refs, но не меняет текущую локальную ветку и рабочие файлы.

## Синтаксис

```bash
git fetch [<options>] [<repository> [<refspec>...]]
git fetch [<options>] --all
```

## Основные опции

| Опция | Описание |
|---|---|
| `--all` | Получить данные из всех remote |
| `--prune` | Удалить remote-tracking refs, исчезнувшие на сервере |
| `--prune-tags` | Вместе с `--prune` удалить локальные теги, исчезнувшие на сервере |
| `--tags` | Получить все теги в дополнение к обычному fetch |
| `--no-tags` | Не выполнять автоматическое следование за тегами |
| `--depth <n>` | Ограничить историю shallow-границей |
| `--deepen <n>` | Углубить shallow clone на `n` коммитов |
| `--unshallow` | Преобразовать shallow clone в полный, если источник полный |
| `--filter=<spec>` | Ограничить загрузку объектов для partial clone |
| `--dry-run` | Показать план без обновления refs |
| `--force` | Разрешить принудительное обновление локальных refs по refspec |
| `--atomic` | Обновить все локальные refs целиком или ни одного |

## Получить изменения из origin

```bash
git fetch origin
git status --short --branch
```

Посмотреть входящие коммиты:

```bash
git log --oneline main..origin/main
```

Посмотреть только локальные коммиты:

```bash
git log --oneline origin/main..main
```

Одновременно обе стороны:

```bash
git log --left-right --oneline main...origin/main
```

## Получить и удалить устаревшие refs

```bash
git fetch --prune origin
```

Удаляются только локальные remote-tracking refs. Ветки на сервере команда не удаляет.

Для всех remote:

```bash
git fetch --all --prune
```

## Получить конкретную ветку

```bash
git fetch origin feature/login
git switch --track origin/feature/login
```

Без настроенного refspec результат может попасть в `FETCH_HEAD`, поэтому для постоянной tracking-ветки обычный `git fetch origin` часто понятнее.

## Явный refspec

```bash
git fetch origin 'refs/heads/release/*:refs/remotes/origin/release/*'
```

Заключайте wildcard refspec в кавычки, чтобы `*` не раскрыла оболочка.

## Теги

Обычный fetch автоматически получает теги, указывающие на загруженные объекты. Чтобы запросить все теги дополнительно:

```bash
git fetch origin --tags
```

Это не означает «получить только теги». Для явного tag refspec:

```bash
git fetch origin 'refs/tags/*:refs/tags/*'
```

## Углубить shallow clone

```bash
git rev-parse --is-shallow-repository
git fetch --deepen=100 origin
# или
git fetch --unshallow origin
```

## Проверить до интеграции

```bash
git fetch origin
git diff --stat main...origin/main
git log --graph --oneline --decorate main...origin/main
```

После проверки выберите действие явно:

```bash
git switch main
git merge --ff-only origin/main
```

В отличие от `pull`, `fetch` сам не выполняет merge или rebase.

## Host-specific refs

Некоторые хостинги публикуют дополнительные refs pull/merge requests. Например, конкретный refspec зависит от платформы и может измениться; проверяйте документацию своего сервера, а не добавляйте такой refspec как универсальный Git-интерфейс.

## Полезные ссылки

- [Официальная документация git fetch](https://git-scm.com/docs/git-fetch)
- [git remote](./remote.md)
- [git pull](./pull.md)
- [git merge](./merge.md)
