# git stash

**Уровень:** Начальный
**Минимальная версия Git:** 1.5

`git stash` временно сохраняет изменения рабочего дерева и индекса, после чего возвращает отслеживаемые файлы к состоянию `HEAD`. По умолчанию неотслеживаемые и игнорируемые файлы в stash не входят.

## Основные команды

```bash
git stash push [<options>] [--] [<pathspec>...]
git stash list
git stash show [-p] [<stash>]
git stash apply [<stash>]
git stash pop [<stash>]
git stash branch <branch> [<stash>]
git stash drop [<stash>]
git stash clear
```

Используйте современную форму `git stash push`; `git stash save` оставлена только для совместимости.

## Полезные опции `push`

| Опция | Описание |
|---|---|
| `-m <message>`, `--message=<message>` | Задать понятное описание |
| `-u`, `--include-untracked` | Включить неотслеживаемые файлы |
| `-a`, `--all` | Включить также игнорируемые файлы |
| `-p`, `--patch` | Интерактивно выбрать фрагменты |
| `--staged` | Сохранить только изменения из индекса |
| `--keep-index` | Оставить уже staged-изменения в индексе и рабочем дереве |
| `--include-untracked` | Полная форма `-u` |

## Базовый workflow

```bash
git status --short
git stash push -m "WIP: login validation"
git switch hotfix
git switch -
git stash pop
```

`pop` применяет stash и удаляет запись только при успешном применении. При конфликте запись обычно остаётся — проверьте `git stash list`.

## Посмотреть содержимое

```bash
git stash list
git stash show --stat 'stash@{0}'
git stash show -p 'stash@{0}'
```

Перед `apply`, `pop` или `drop` всегда проверяйте номер записи: новые stash сдвигают позиции.

## Apply или pop

```bash
git stash apply 'stash@{1}'
```

`apply` сохраняет запись в списке и удобен, когда изменения нужно применить более одного раза.

```bash
git stash pop 'stash@{0}'
```

`pop` — это применение с последующим удалением при успехе.

## Включить новые или игнорируемые файлы

```bash
git stash push -u -m "WIP with new files"
```

Игнорируемые файлы добавляются только через `-a`:

```bash
git stash push -a -m "WIP including ignored files"
```

::: warning Проверяйте секреты и объём
`-a` способен положить в stash `.env`, ключи и большие артефакты. Stash хранится внутри репозитория и не заменяет безопасное хранилище секретов.
:::

## Сохранить только часть изменений

```bash
git stash push --patch -m "WIP: selected hunks"
```

Опция пишется `--patch` или `-p`, не `-patch`.

Только staged-изменения:

```bash
git stash push --staged -m "Ready part"
```

Сохранить всё, кроме уже staged-изменений:

```bash
git stash push --keep-index -m "Unstaged WIP"
```

## Применить stash в отдельной ветке

```bash
git stash branch recover-wip 'stash@{0}'
```

Git создаст ветку от коммита, на котором stash был сделан, применит изменения и при успехе удалит запись. Это часто лучше `pop`, если текущая ветка сильно изменилась.

## Конфликт при применении

```bash
git stash apply 'stash@{0}'
git status
# исправьте конфликт
git add path/to/resolved-file
git diff --cached
```

После `apply` отдельной команды `stash --continue` нет. Завершите обычный commit или продолжите работу, а ненужную запись удалите явно:

```bash
git stash drop 'stash@{0}'
```

## Эксперимент поверх текущей работы

Stash не умеет автоматически «откатить эксперимент» при `pop`. Отделите эксперимент веткой:

```bash
git stash push -u -m "WIP before experiment"
git switch -c experiment/idea
# выполните эксперимент и либо закоммитьте его, либо явно отбросьте
git switch -
git stash apply 'stash@{0}'
```

Если эксперимент не нужен, перед переключением проверьте `git status`, отмените tracked-изменения через `git restore` и только после preview удаляйте неотслеживаемые файлы через `git clean`.
## Удаление stash

```bash
git stash drop 'stash@{2}'
git stash clear
```

::: danger `clear` необратим через обычный интерфейс
`git stash clear` удаляет все stash refs. Не используйте его, пока не просмотрели список и не закрепили важные состояния веткой или коммитом.
:::

## Полезные ссылки

- [Официальная документация git stash](https://git-scm.com/docs/git-stash)
- [git switch](./switch.md)
- [git clean](./clean.md)
