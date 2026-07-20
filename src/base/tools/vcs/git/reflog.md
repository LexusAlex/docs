# git reflog

**Уровень:** Средний
**Минимальная версия Git:** 1.4

Reflog — локальный журнал перемещений ссылок. Он помогает найти прежние значения `HEAD`, веток и других refs после `reset`, `rebase`, переключения веток или удаления коммитов из видимой истории.

## Синтаксис

```bash
git reflog [show] [<log-options>] [<ref>]
git reflog list
git reflog exists <ref>
git reflog expire [<options>] [<refs>...]
git reflog delete [<options>] <ref>@{<specifier>}...
```

Короткая форма `git reflog` равна `git reflog show HEAD`.

## Просмотр

```bash
git reflog --date=local
git reflog show main --date=iso
git reflog --all --oneline
```

Ссылки вида `HEAD@{2}` означают прежнее значение, выбранное по позиции в журнале. Позиции меняются по мере появления новых записей, поэтому для долгого хранения используйте хеш или создайте ветку.

## Восстановить коммит после reset

```bash
git reflog --date=local
git show <old-head>
git branch recovered-work <old-head>
```

Сначала создайте ветку восстановления. Это безопаснее, чем немедленно выполнять ещё один `reset --hard`.

## Восстановить состояние до rebase

```bash
git reflog show HEAD --date=local
git branch before-rebase <old-head>
git range-diff <old-head>...HEAD
```

После проверки можно решить, нужна ли старая ветка целиком или только отдельные коммиты через `cherry-pick`.

## Найти состояние удалённой ветки

Удаление ветки обычно удаляет и её собственный reflog. Ищите коммит в журналах `HEAD` и остальных refs:

```bash
git reflog --all --date=local
git log --all --decorate --oneline --graph
```

Если хеш найден:

```bash
git branch restored-branch <commit>
```

## Найти состояние по времени

```bash
git show 'main@{yesterday}'
git show 'HEAD@{2026-07-01 12:00}'
```

Результат зависит от того, сохранились ли записи за этот период.

## Срок хранения

Типичные значения по умолчанию:

- достижимые записи — 90 дней;
- недостижимые записи — 30 дней.

Проверьте локальные настройки:

```bash
git config --get gc.reflogExpire
git config --get gc.reflogExpireUnreachable
```

Изменять срок можно через конфигурацию, например только для конкретного репозитория:

```bash
git config gc.reflogExpire 120.days
git config gc.reflogExpireUnreachable 45.days
```

## Ручное удаление записей

Синтаксис истечения относится к подкоманде `expire`:

```bash
git reflog expire --expire=90.days --expire-unreachable=30.days --all --dry-run
git reflog expire --expire=90.days --expire-unreachable=30.days --all
```

::: danger Сначала `--dry-run`
Ручное истечение reflog и последующий `git gc` сокращают или уничтожают возможности восстановления. Не используйте `--expire=now` и `git gc --prune=now` как стандартную «очистку».
:::

## Ограничения

- Reflog хранится локально и не отправляется через `push`.
- В другом клоне могут быть другие записи или не быть нужного коммита.
- Истёкшие записи и удалённые объекты могут быть невосстановимы.
- Для резервного копирования важной работы создавайте ветки, теги или внешний backup.

## Полезные ссылки

- [Официальная документация git reflog](https://git-scm.com/docs/git-reflog)
- [git reset](./reset.md)
- [git gc](./gc.md)
