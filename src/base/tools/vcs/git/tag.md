# git tag

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git tag` создаёт и управляет постоянными именами объектов, чаще всего релизных коммитов. Для публикации тег нужно отправить отдельно.

## Типы тегов

- Легковесный тег — ref прямо на объект.
- Аннотированный тег — отдельный объект с автором, датой и сообщением.
- Подписанный тег — аннотированный тег с криптографической подписью.

Для релизов обычно используйте аннотированный или подписанный тег.

## Основные формы

```bash
git tag [--list] [<pattern>...]
git tag -a <tag> [-m <message>] [<commit>]
git tag -s <tag> [-m <message>] [<commit>]
git tag -d <tag>...
git tag -v <tag>...
```

## Создать теги

Аннотированный:

```bash
git tag -a v2.4.0 -m "Release 2.4.0"
```

На конкретном коммите:

```bash
git tag -a v2.3.1 -m "Release 2.3.1" <commit>
```

Подписанный:

```bash
git tag -s v2.4.0 -m "Release 2.4.0"
git tag -v v2.4.0
```

Легковесный:

```bash
git tag build-tested
```

## Просмотр и сортировка

```bash
git tag --list 'v2.*'
git show v2.4.0
git tag --sort=-version:refname
git for-each-ref --sort=-creatordate --format='%(creatordate:iso8601) %(refname:short)' refs/tags/
```

`creatordate` — поле сортировки/форматирования, а не самостоятельная опция `git tag --creatordate`.

Найти теги объекта:

```bash
git tag --points-at HEAD
```

Теги, слитые в main:

```bash
git tag --merged main
```

## Опубликовать тег

Один тег:

```bash
git push origin refs/tags/v2.4.0
```

Ветку и тег атомарно, если сервер поддерживает:

```bash
git push --atomic origin main refs/tags/v2.4.0
```

Все теги:

```bash
git push origin --tags
```

Не используйте `--tags`, когда требуется опубликовать только текущий релиз: команда отправит все локальные теги.

## Удалить тег

Локально:

```bash
git tag -d v2.4.0
```

На сервере:

```bash
git push origin --delete refs/tags/v2.4.0
```

Полное имя ref исключает неоднозначность с одноимённой веткой.

## Переместить ошибочный тег

```bash
git tag -f v2.4.0 <correct-commit>
```

::: warning Опубликованные теги считают неизменяемыми
Перемещение или повторная публикация существующего тега не обновит автоматически копии коллег и может нарушить сборки/подписи. Обычно создайте новый номер версии. Если исправление обязательно, согласуйте удаление remote-тега и повторный fetch со всеми потребителями.
:::

## Проверить релиз

```bash
git status --short
git show --no-patch --format=fuller v2.4.0
git diff v2.4.0^! --stat
```

Checkout тега создаёт detached HEAD:

```bash
git switch --detach v2.4.0
```

Для исправления создайте новую ветку, а не коммитьте «в тег»:

```bash
git switch -c hotfix/v2.4 v2.4.0
```

## Полезные ссылки

- [Официальная документация git tag](https://git-scm.com/docs/git-tag)
- [git show](./show.md)
- [git push](./push.md)
