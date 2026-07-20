# git mv

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git mv` перемещает или переименовывает путь и сразу обновляет индекс.

## Синтаксис

```bash
git mv [<options>] <source> <destination>
git mv [<options>] <source>... <destination-directory>
```

| Опция | Описание |
|---|---|
| `-n`, `--dry-run` | Показать план |
| `-v`, `--verbose` | Подробный вывод |
| `-f`, `--force` | Разрешить перезапись назначения |
| `-k` | Пропускать пути, которые нельзя переместить |
| `--sparse` | Разрешить пути вне sparse-checkout cone |

Опции `--follow` у `git mv` нет. История перемещения определяется позже командами `git log --follow`, `git diff --find-renames` и `git blame`.

## Примеры

```bash
git mv old-name.txt new-name.txt
git status --short
git diff --cached --summary
```

Переместить файл или несколько файлов:

```bash
git mv src/legacy.js src/utils/legacy.js
git mv src/a.js src/b.js src/archive/
```

Каталог назначения для нескольких источников должен существовать.

### Preview и force

```bash
git mv --dry-run source.txt existing.txt
git diff -- existing.txt
git mv --force source.txt existing.txt
```

`--force` способен перезаписать незакоммиченный destination. Сначала сохраните нужное содержимое.

### Переименование только регистра

На файловых системах без учёта регистра:

```bash
git mv readme.md readme.tmp
git mv readme.tmp README.md
git status --short
```

### Обычное перемещение

```bash
mv old-name.txt new-name.txt
git add -- old-name.txt new-name.txt
```

На Windows используйте команду своей оболочки. Git хранит снимки и обнаруживает rename эвристически; `git mv` лишь выполняет файловый и индексный шаги согласованно.

### Проверить историю после коммита

```bash
git log --follow -- new-name.txt
git diff HEAD^ HEAD --find-renames
git show --summary HEAD
```

`git log --follow` работает только с одним путём.

## Полезные ссылки

- [Официальная документация git mv](https://git-scm.com/docs/git-mv)
- [git add](./add.md)
- [git rm](./rm.md)
- [git log](./log.md)
