# git diff

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git diff` сравнивает рабочее дерево, индекс, коммиты и любые два дерева. Команда сама ничего не изменяет.

## Четыре базовых сравнения

| Команда | Что сравнивает |
|---|---|
| `git diff` | рабочее дерево с индексом |
| `git diff --cached` | индекс с `HEAD` |
| `git diff HEAD` | рабочее дерево и индекс в сумме с `HEAD` |
| `git diff A B` | снимок `A` со снимком `B` |

## Перед коммитом

```bash
git diff
git diff --cached
git diff --check
```

`--check` сообщает о whitespace-ошибках и оставшихся conflict markers.

Для конкретного пути:

```bash
git diff -- path/to/file
git diff --cached -- path/to/file
```

## Две точки и три точки

Для `git diff` формы `A..B` и `A B` сравнивают два конечных снимка:

```bash
git diff main..feature
# то же сравнение деревьев
git diff main feature
```

Чтобы увидеть изменения feature относительно общей базы, используйте три точки:

```bash
git diff main...feature
```

Это сравнение `merge-base(main, feature)` с `feature`, обычно подходящее для просмотра pull request.

После fetch:

```bash
git fetch origin
git diff main...origin/main
```

Если нужно посмотреть входящий патч remote относительно локального main, направление `main...origin/main` важно.

## Форматы вывода

```bash
git diff --stat
git diff --name-only
git diff --name-status
git diff --numstat
git diff --word-diff
git diff --color-words
```

Только определённые типы изменений:

```bash
git diff --name-status --diff-filter=AMR
```

## Контекст

```bash
git diff -U10
git diff --function-context
```

`-U10` показывает по 10 строк контекста, а `--function-context` старается включить функцию целиком.

## Переименования и копии

```bash
git diff --find-renames
git diff --find-copies
```

Git определяет переименование эвристически по сходству содержимого; в коммите не хранится отдельный факт «rename».

## Сравнить отдельный файл между версиями

```bash
git diff v2.3.0 v2.4.0 -- src/config.js
```

Показать staged-версию файла как blob:

```bash
git show :path/to/file
```

## Сравнить два обычных файла/каталога

```bash
git diff --no-index old-file new-file
```

`--no-index` работает вне репозитория. Код выхода `1` означает найденные различия, а не обязательно ошибку.

## Создать и проверить patch

```bash
git diff --cached --binary > change.patch
git apply --check change.patch
```

`--binary` сохраняет изменения бинарных файлов в формате Git patch. Перед применением в другом дереве используйте `git apply --check`.

## Передать список файлов другой команде

Имена файлов могут содержать пробелы и переводы строк. В POSIX shell используйте NUL-разделители:

```bash
git diff --cached --name-only --diff-filter=ACMR -z | xargs -0 -- eslint
```

На Windows/PowerShell обрабатывайте массив строк средствами PowerShell либо запускайте инструмент с поддержкой stdin/NUL; не копируйте POSIX-конвейер как универсальный.

## Внешний difftool

```bash
git difftool --cached
git difftool main...feature
```

Инструмент задаётся через `diff.tool` и соответствующую конфигурацию.

## Полезные ссылки

- [Официальная документация git diff](https://git-scm.com/docs/git-diff)
- [git status](./status.md)
- [git show](./show.md)
- [git add](./add.md)
