# git cherry-pick

**Уровень:** Средний
**Минимальная версия Git:** 0.99

`git cherry-pick` применяет изменения существующих коммитов поверх текущей ветки и создаёт новые коммиты. У новых коммитов будут другие идентификаторы, потому что меняются их родители.

## Синтаксис

```bash
git cherry-pick [<options>] <commit>...
git cherry-pick (--continue | --skip | --abort | --quit)
```

Перед началом проверьте ветку и чистоту рабочего дерева:

```bash
git branch --show-current
git status --short
```

## Основные опции

| Опция | Описание |
|---|---|
| `-e`, `--edit` | Отредактировать сообщение нового коммита |
| `-n`, `--no-commit` | Применить изменения в индекс и рабочее дерево без автоматического коммита |
| `-x` | Добавить в сообщение строку с идентификатором исходного коммита, если cherry-pick прошёл без конфликтов |
| `-s`, `--signoff` | Добавить `Signed-off-by` |
| `-m <n>`, `--mainline <n>` | Выбрать основного родителя при переносе merge-коммита |
| `--ff` | Выполнить fast-forward, если текущий `HEAD` совпадает с родителем выбранного коммита |
| `--empty=<mode>` | Для ставшего пустым коммита выбрать `drop`, `keep` или `stop` |
| `--allow-empty` | Разрешить коммит, который был пустым изначально |
| `-S[<keyid>]` | Подписать новый коммит |
| `--strategy <strategy>`, `-X<option>` | Выбрать стратегию и передать ей параметр |

Опции `--no-verify` у `git cherry-pick` нет. Для сохранения ставшего пустым коммита используйте современную форму `--empty=keep`; `--keep-redundant-commits` оставлен как устаревший синоним.

## Примеры

### Перенести один коммит

```bash
git switch release
git show --stat a1b2c3d
git cherry-pick -x a1b2c3d
```

`-x` полезен при переносе исправлений между публичными ветками: в сообщении будет виден источник.

### Перенести несколько заданных коммитов

```bash
git cherry-pick a1b2c3d e4f5a6b 0123abc
```

Коммиты применяются в порядке аргументов.

### Перенести непрерывный диапазон

```bash
# Включить oldest и все коммиты до newest
git cherry-pick oldest^..newest
```

`oldest..newest` исключил бы `oldest`. Перед выполнением диапазон можно проверить:

```bash
git log --oneline --reverse oldest^..newest
```

### Объединить несколько коммитов в один

```bash
git cherry-pick --no-commit oldest^..newest
git diff --cached
git commit -m "Apply selected fixes"
```

### Разрешить конфликт

```bash
git cherry-pick a1b2c3d
# исправьте конфликтующие файлы
git add path/to/resolved-file
git cherry-pick --continue
```

Управление незавершённой последовательностью:

```bash
git cherry-pick --skip
git cherry-pick --abort
git cherry-pick --quit
```

`--abort` возвращает состояние до начала операции. `--quit` только забывает состояние sequencer и оставляет текущие изменения.

### Перенести merge-коммит

```bash
git show --no-patch --pretty='%H parents: %P' <merge-commit>
git cherry-pick -m 1 <merge-commit>
```

Выберите родителя осознанно: неверный номер меняет смысл переносимого патча.

### Исправить коммит, сделанный не в той ветке

Если коммит уже опубликован, не переписывайте ветку:

```bash
git switch correct-branch
git cherry-pick <commit>
git switch wrong-branch
git revert <commit>
```

Если это последний **неопубликованный** коммит и рабочее дерево чистое:

```bash
git branch correct-branch <commit>
git switch wrong-branch
git reset --hard <commit>^
```

Перед `reset --hard` проверьте `git status` и убедитесь, что коммит не отправлен коллегам.

::: danger Стратегия ours
`git cherry-pick --strategy=ours` не «разрешает только конфликты в пользу текущей ветки», а игнорирует дерево переносимого коммита целиком. Для отдельных конфликтов исправляйте файлы вручную либо используйте подходящую `-X`-опцию после проверки результата.
:::

## Полезные ссылки

- [Официальная документация git cherry-pick](https://git-scm.com/docs/git-cherry-pick)
- [git revert](./revert.md)
- [git rebase](./rebase.md)
