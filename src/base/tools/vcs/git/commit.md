# git commit

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git commit` создаёт новый снимок из содержимого индекса. Идентификатор коммита вычисляется выбранным форматом объектов репозитория — обычно SHA-1, а в репозитории с `extensions.objectFormat=sha256` это SHA-256.

## Синтаксис

```bash
git commit [<options>] [--] [<pathspec>...]
```

## Основные опции

| Опция | Описание |
|---|---|
| `-m <message>` | Задать сообщение в командной строке |
| `-a`, `--all` | Автоматически добавить изменения и удаления **уже отслеживаемых** файлов |
| `--amend` | Заменить последний коммит |
| `--no-edit` | При amend сохранить сообщение |
| `--fixup=<commit>` | Создать fixup-коммит для autosquash; также доступны формы `amend:` и `reword:` |
| `--squash=<commit>` | Создать squash-коммит для autosquash |
| `-p`, `--patch` | Интерактивно выбрать части файлов для коммита |
| `--only` | Коммитить только перечисленные пути, игнорируя другие staged-изменения |
| `--include` | Сначала добавить перечисленные пути к уже staged-изменениям |
| `--author=<author>` | Переопределить автора |
| `--date=<date>` | Переопределить дату автора, не дату committer |
| `-s`, `--signoff` | Добавить `Signed-off-by` |
| `-S[<keyid>]` | Подписать коммит GPG/SSH-ключом |
| `--no-verify` | Пропустить `pre-commit` и `commit-msg` hooks |
| `--allow-empty` | Разрешить коммит без изменения дерева |

## Подготовить и проверить коммит

```bash
git status --short
git diff
git add -p
git diff --cached
git commit -m "Validate login form"
```

Коммит включает только индекс. `git diff --cached` — последняя проверка содержимого перед фиксацией.

## Изменить последний локальный коммит

Добавить забытый файл и сохранить сообщение:

```bash
git add path/to/file
git commit --amend --no-edit
```

Изменить только сообщение:

```bash
git commit --amend -m "Better commit message"
```

::: warning Amend переписывает коммит
У заменённого коммита будет новый ID. Не amend-ьте опубликованный общий коммит без согласования.
:::

## Автоматически включить tracked-файлы

```bash
git commit -am "Update validation"
```

`-a` не добавляет неотслеживаемые файлы. Проверьте их через `git status` и добавьте явно.

## Fixup для интерактивного rebase

```bash
git commit --fixup=<target-commit>
git rebase -i --autosquash <target-commit>^
```

## Коммитить выбранные пути

```bash
git commit --only -- path/to/a path/to/b
```

При pathspec Git может закоммитить версии этих путей из рабочего дерева, не включая прочие staged-изменения. Это отличается от обычной модели «коммит равен индексу»; перед применением проверьте:

```bash
git diff --cached
git diff -- path/to/a path/to/b
```

Для более прозрачного workflow обычно сначала подготовьте точный индекс через `git add -p`, затем вызовите `git commit` без путей.

## Автор и даты

Коммит хранит автора и committer отдельно. `--author` и `--date` меняют поля автора:

```bash
git commit --author="Example User <user@example.com>" --date="2026-07-20T10:00:00+03:00" -m "Import historical change"
```

Используйте переопределение дат только для миграций и воспроизводимых импортов, а не для маскировки реального времени работы.

## Hooks и подпись

```bash
git commit -S -s -m "Release metadata"
```

`--no-verify` отключает важные локальные проверки. Применяйте его только когда понимаете причину сбоя hook и всё равно выполняете необходимые проверки другим способом.

## Проверить результат

```bash
git show --stat --oneline HEAD
git status --short
git log -1 --format=fuller
```

## Полезные ссылки

- [Официальная документация git commit](https://git-scm.com/docs/git-commit)
- [git add](./add.md)
- [git status](./status.md)
- [git rebase](./rebase.md)
