# git show

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git show` отображает Git-объекты. Для коммита команда показывает метаданные и patch, для аннотированного тега — тег и объект назначения, для дерева — его содержимое.

## Синтаксис

```bash
git show [<options>] [<object>...]
```

Без объекта показывается `HEAD`.

## Коммиты

```bash
git show <commit>
git show --stat <commit>
git show --name-status <commit>
git show --no-patch --format=fuller <commit>
```

Только patch:

```bash
git show --format= --patch <commit>
```

Пользовательский формат:

```bash
git show --no-patch --format='%H%n%an <%ae>%n%aI%n%s' <commit>
```

Частые placeholders: `%H`/`%h` — ID, `%an`/`%ae` — автор, `%cn`/`%ce` — committer, `%aI`/`%cI` — ISO-даты, `%P` — родители, `%s` — заголовок, `%B` — полное сообщение.

## Файл из выбранной версии

```bash
git show HEAD~5:config.json
git show v2.4.0:src/app.js
git show <commit>:path/to/file > recovered-file
```

Путь задаётся относительно корня дерева. Для восстановления tracked-файла в рабочее дерево удобнее:

```bash
git restore --source=<commit> -- path/to/file
```

Не выводите бинарный blob прямо в терминал; перенаправьте его в файл.

## Теги и деревья

```bash
git show v2.4.0
git tag -v v2.4.0
git show HEAD^{tree}
git show HEAD:src/
```

Для низкоуровневой проверки объекта:

```bash
git cat-file -t <object>
git cat-file -s <object>
git cat-file -p <object>
```

## Merge-коммит

```bash
git show --no-patch --format='%H%nparents: %P%n%s' <merge-commit>
git diff <merge-commit>^1 <merge-commit>
git diff <merge-commit>^2 <merge-commit>
```

Отдельные сравнения показывают результат merge относительно каждого родителя.

## Перед revert или cherry-pick

```bash
git show --stat <commit>
git show --check <commit>
```

После проверки примените выбранную операцию отдельно. Для диапазонов истории и поиска удобнее `git log`.

## Полезные ссылки

- [Официальная документация git show](https://git-scm.com/docs/git-show)
- [git cat-file](https://git-scm.com/docs/git-cat-file)
- [git log](./log.md)
- [git diff](./diff.md)
- [git blame](./blame.md)
