# git branch

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git branch` создаёт, перечисляет, переименовывает, копирует и удаляет ветки. Для переключения используйте `git switch`.

## Основные формы

```bash
git branch [<options>] [--list] [<pattern>...]
git branch [<options>] <branch> [<start-point>]
git branch (-m|-M) [<old>] <new>
git branch (-c|-C) [<old>] <new>
git branch (-d|-D) <branch>...
git branch --set-upstream-to=<upstream> [<branch>]
```

## Просмотр веток

```bash
git branch
git branch --all
git branch --verbose --verbose
git branch --show-current
```

Удобный стабильный формат для скриптов:

```bash
git for-each-ref --format='%(refname:short)%09%(upstream:short)%09%(upstream:track)' refs/heads/
```

## Создать ветку

Без переключения:

```bash
git branch feature/login origin/main
```

Создать и сразу переключиться:

```bash
git switch -c feature/login origin/main
```

## Tracking/upstream

```bash
git branch --set-upstream-to=origin/feature/login feature/login
git branch -vv
```

Чаще upstream устанавливается при первом push:

```bash
git push -u origin feature/login
```

## Переименовать

Текущую ветку:

```bash
git branch -m feature/auth
```

Явно указанную ветку:

```bash
git branch -m feature/login feature/auth
```

`-M` выполняет принудительное переименование, если целевое имя уже существует. Перед force проверьте обе ветки.

## Скопировать ветку

```bash
git branch -c feature/login experiment/login
```

`-c` копирует ветку и её конфигурацию/reflog. `-C` делает то же принудительно и может перезаписать существующую целевую ветку.

## Удалить ветку

```bash
git branch -d feature/login
```

`-d` откажется удалять ветку, если она не слита в её upstream или в `HEAD` при отсутствии подходящего upstream.

Принудительное удаление:

```bash
git log --oneline main..experiment/login
git branch backup/experiment-login experiment/login
git branch -D experiment/login
```

Сначала просмотрите уникальные коммиты и при необходимости создайте backup-ветку.

Удаление remote-ветки — это `push`, не `branch`:

```bash
git push origin --delete feature/login
```

## Найти слитые и неслитые ветки

Относительно явного коммита:

```bash
git branch --merged main
git branch --no-merged main
```

Удаляйте выбранные ветки по одной после просмотра:

```bash
git branch -d feature/one feature/two
```

Не используйте конвейер `git branch | grep | xargs`: обычный вывод помечает текущую ветку, формат зависит от настроек, а автоматическая фильтрация имён хрупка.

## Ветки, содержащие коммит

```bash
git branch --contains <commit>
git branch --all --contains <commit>
```

Ветки, указывающие прямо на объект:

```bash
git branch --points-at <commit>
```

## Восстановление удалённой ветки

```bash
git reflog --all --date=local
git branch restored-branch <commit>
```

Собственный reflog ветки обычно удаляется вместе с ref, поэтому ищите хеш в `HEAD` и других reflog.

## Полезные ссылки

- [Официальная документация git branch](https://git-scm.com/docs/git-branch)
- [git switch](./switch.md)
- [git reflog](./reflog.md)
- [git push](./push.md)
