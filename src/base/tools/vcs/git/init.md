# git init

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git init` создаёт пустой Git-репозиторий или повторно инициализирует существующий. В обычном репозитории служебные данные находятся в `.git`, а файлы проекта — в рабочем дереве.

## Синтаксис

```bash
git init [<options>] [<directory>]
```

## Основные опции

| Опция | Описание |
|---|---|
| `-b <name>`, `--initial-branch=<name>` | Задать имя первой ветки |
| `--bare` | Создать репозиторий без рабочего дерева |
| `--shared[=<permissions>]` | Настроить права совместного локального доступа |
| `--template=<directory>` | Скопировать шаблоны в Git directory |
| `--separate-git-dir=<directory>` | Хранить Git directory отдельно от рабочего дерева |
| `--object-format=<format>` | Выбрать `sha1` или `sha256` |
| `--ref-format=<format>` | Выбрать `files` или `reftable`, если сборка Git поддерживает его |
| `-q`, `--quiet` | Выводить только ошибки и предупреждения |

## Новый проект

```bash
mkdir my-project
cd my-project
git init --initial-branch=main
git status --short --branch
```

Добавляйте содержимое после `.gitignore` и проверки:

```bash
git status --short
git add -p
# для полностью новых файлов укажите пути явно
git add README.md src/
git diff --cached
git commit -m "Initial commit"
```

## Настроить имя начальной ветки

Для всех будущих репозиториев пользователя:

```bash
git config --global init.defaultBranch main
```

Без настройки актуальная документация Git всё ещё описывает built-in fallback `master` до планируемого изменения в Git 3.0, поэтому для воспроизводимых инструкций используйте `--initial-branch`.

## Инициализировать существующий каталог

```bash
cd existing-project
git init --initial-branch=main
git status --short
```

Повторный `git init` в существующем репозитории обычно безопасен и не перезаписывает имеющиеся данные. Он может применить новые template-файлы или переместить Git directory при `--separate-git-dir`.

## Bare-репозиторий для сервера

```bash
git init --bare --shared=group /srv/git/project.git
```

Bare-репозиторий не имеет рабочего дерева и подходит как центральный endpoint. `--shared` настраивает файловые права Git directory, но не заменяет ОС-права, SSH/HTTPS-аутентификацию, резервное копирование и серверные hooks.

## Template directory

```bash
git init --template=/path/to/git-templates my-project
```

Файлы и каталоги шаблона, чьи имена не начинаются с точки, копируются в **Git directory** (`.git`), а не в рабочее дерево. Типичные примеры: `hooks/`, `info/exclude`, служебная конфигурация. README или `.gitignore` проекта автоматически в корень проекта не попадают.

## Отдельный Git directory

```bash
git init --separate-git-dir=/path/to/metadata/project.git /path/to/worktree
```

В рабочем каталоге создаётся текстовый `.git`, указывающий на фактический Git directory. Не перемещайте его вручную без последующей проверки `git rev-parse --git-dir`.

## SHA-256

```bash
git init --object-format=sha256 --initial-branch=main my-project
```

SHA-256-репозитории сейчас не interoperable с SHA-1-репозиториями. Перед выбором формата проверьте поддержку у hosting, CI, libgit2/JGit и других клиентов. Для максимальной совместимости default SHA-1 пока остаётся обычным выбором.

## Проверка результата

```bash
git rev-parse --git-dir
git rev-parse --show-toplevel
git config --show-origin --get init.defaultBranch
git status --short --branch
```

## Полезные ссылки

- [Официальная документация git init](https://git-scm.com/docs/git-init)
- [git add](./add.md)
- [git commit](./commit.md)
- [git clone](./clone.md)
