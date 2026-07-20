# git remote

**Уровень:** Начальный
**Минимальная версия Git:** 1.5

`git remote` управляет именами удалённых репозиториев и их fetch/push URL. Сам remote не является копией сервера: это локальная конфигурация плюс набор remote-tracking refs.

## Основные команды

```bash
git remote [-v]
git remote add <name> <url>
git remote rename <old> <new>
git remote remove <name>
git remote get-url [--push] [--all] <name>
git remote set-url [--add|--delete] [--push] <name> <url>
git remote show <name>
git remote prune [-n|--dry-run] <name>
git remote update [<group>...]
```

## Просмотр

```bash
git remote -v
git remote show origin
```

`-v` обычно выводит отдельные URL для fetch и push. `remote show` может обращаться к сети; добавьте `-n`, если нужен только локальный обзор.

## Добавить remote

```bash
git remote add origin git@example.com:team/project.git
git fetch origin
```

У `git remote add` нет опции `--push`. Отдельный push URL настраивается после добавления:

```bash
git remote set-url --add --push origin git@example.com:team/project.git
```

Если push URL должен заменить существующий, опустите `--add`:

```bash
git remote set-url --push origin git@example.com:team/project.git
```

## Получить URL

```bash
git remote get-url origin
git remote get-url --all origin
git remote get-url --push --all origin
```

`--push` показывает URL отправки, а без него — URL получения.

## Несколько URL: fetch из одного места, push в другое

```bash
git remote set-url origin https://example.com/team/project.git
git remote set-url --push origin git@example.com:team/project.git
```

Проверьте результат:

```bash
git remote -v
```

## Несколько push-зеркал

```bash
git remote set-url --add --push publish git@example.com:mirror-a/project.git
git remote set-url --add --push publish git@example.org:mirror-b/project.git
```

Один push попытается отправить одинаковые refs во все настроенные push URL. Они должны принимать одинаковый набор данных; для независимых целей используйте разные remote.

## Переименовать или удалить remote

```bash
git remote rename origin upstream
git remote remove obsolete
```

Удаление remote убирает его конфигурацию и remote-tracking refs, но не удаляет локальные ветки и не меняет сервер.

## Очистить устаревшие remote-tracking refs

```bash
git remote prune --dry-run origin
git remote prune origin
```

Это удаляет локальные `origin/*`, для которых веток больше нет на сервере. Удалённые ветки на сервере команда не затрагивает.

Эквивалент при fetch:

```bash
git fetch --prune origin
```

## Обновить remote-трекинг

```bash
git remote update
git remote update --prune
```

Команда получает данные из настроенных remote или групп remote, но сама не сливает их в локальные ветки.

## Remote HEAD

```bash
git remote set-head origin --auto
git symbolic-ref refs/remotes/origin/HEAD
```

`set-head` меняет только локальную символическую ссылку `refs/remotes/origin/HEAD`. Он не меняет default branch на сервере.

## Mirror-режим

```bash
git remote add --mirror=push mirror <url>
```

::: danger Только для выделенного зеркала
Mirror push синхронизирует все refs и может удалять refs на сервере. `--mirror=fetch` напрямую отображает remote refs в локальные refs и подходит только bare-репозиторию: в обычном репозитории можно перезаписать локальные ветки.
:::

## Полезные ссылки

- [Официальная документация git remote](https://git-scm.com/docs/git-remote)
- [git fetch](./fetch.md)
- [git push](./push.md)
