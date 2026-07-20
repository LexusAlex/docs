# git push

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git push` обновляет refs в удалённом репозитории и передаёт необходимые объекты. По умолчанию поведение зависит от upstream-настройки и `push.default`.

## Синтаксис

```bash
git push [<options>] [<repository> [<refspec>...]]
```

## Основные опции

| Опция | Описание |
|---|---|
| `-u`, `--set-upstream` | Запомнить upstream для успешно отправленной ветки |
| `--dry-run` | Показать план без отправки |
| `--all` | Отправить все локальные ветки |
| `--tags` | Отправить все теги из `refs/tags/` |
| `--follow-tags` | Вместе с веткой отправить достижимые аннотированные теги, отсутствующие на сервере |
| `--delete` | Удалить указанный remote ref |
| `--prune` | Удалить remote refs без локального соответствия по refspec |
| `--atomic` | Обновить все refs целиком или не обновить ни одного, если сервер поддерживает режим |
| `--force-with-lease` | Разрешить non-fast-forward только при совпадении ожидаемого remote ref |
| `--force-if-includes` | Проверить, что обновления remote-tracking ref включены в локальную историю |
| `--signed` | Подписать запрос push, если сервер поддерживает |

## Обычный workflow

### Первая отправка ветки

```bash
git switch -c feature/login
git push -u origin feature/login
```

После установки upstream обычно достаточно:

```bash
git push
```

### Проверить push заранее

```bash
git push --dry-run origin main
git push origin main
```

`--dry-run` не заменяет серверные проверки, но показывает выбранные refs.

### Отправить ветку и релизный тег

```bash
git tag -a v2.4.0 -m "Release 2.4.0"
git push --atomic origin main refs/tags/v2.4.0
```

Если сервер не поддерживает atomic push, отправьте ветку и тег отдельно. `--follow-tags` удобен, когда нужно публиковать все достижимые аннотированные теги:

```bash
git push --follow-tags origin main
```

### Удалить remote-ветку или тег

```bash
git push origin --delete old-branch
git push origin --delete refs/tags/v1.0.0
```

Полное имя тега исключает неоднозначность с веткой того же имени.

## После rebase: безопасная принудительная отправка

Сначала получите актуальное состояние и проверьте расхождение:

```bash
git fetch origin
git log --oneline --left-right origin/feature...feature
```

Затем:

```bash
git push --force-with-lease --force-if-includes origin feature
```

`--force-with-lease` безопаснее `--force`, но форма без явного ожидаемого значения опирается на remote-tracking ref. Фоновый `fetch` способен обновить его и ослабить защиту.

Для критичной ветки зафиксируйте проверенный ожидаемый OID и используйте явную lease:

```bash
git rev-parse refs/remotes/origin/feature
# после проверки подставьте полученный OID
git push --force-with-lease=refs/heads/feature:<expected-oid> origin feature
```

Если remote ref изменился, push завершится отказом. Не повторяйте его с `--force`, пока не разберёте новые коммиты.

::: danger `--force`
Безусловный force-push может удалить чужие коммиты с сервера. Не используйте `git push --force origin main` как типовой пример; защищайте основные ветки настройками сервера.
:::

## Зеркальная отправка

```bash
git push --mirror <mirror-remote>
```

`--mirror` синхронизирует **все** refs под `refs/` и принудительно удаляет на сервере refs, которых нет локально. Это режим для специально выделенного зеркала, а не для обычного remote.

## Полезные проверки

```bash
git remote -v
git branch -vv
git ls-remote --heads --tags origin
git config --get push.default
```

## Полезные ссылки

- [Официальная документация git push](https://git-scm.com/docs/git-push)
- [git remote](./remote.md)
- [git fetch](./fetch.md)
- [git tag](./tag.md)
