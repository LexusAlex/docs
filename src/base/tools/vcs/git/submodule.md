# git submodule

**Уровень:** Продвинутый
**Минимальная версия Git:** 1.5

Submodule позволяет одному репозиторию записать ссылку на конкретный коммит другого репозитория. Superproject хранит URL в `.gitmodules` и gitlink — точный commit ID submodule.

## Добавить submodule

```bash
git submodule add https://example.com/libs/ui.git libs/ui
git diff --cached --submodule
git commit -m "Add UI submodule"
```

Коммит включает `.gitmodules` и gitlink. Содержимое истории submodule остаётся в отдельном репозитории.

## Клонировать проект с submodule

```bash
git clone --recurse-submodules https://example.com/team/project.git
```

Если проект уже клонирован:

```bash
git submodule update --init --recursive
```

Эта команда checkout-ит коммиты, **записанные superproject**, а не последние коммиты удалённых веток.

## Основные команды

```bash
git submodule status [--recursive]
git submodule update --init --recursive
git submodule sync --recursive
git submodule foreach --recursive '<command>'
git submodule deinit [-f] -- <path>
```

`git submodule status` показывает записанный коммит и маркер состояния. Для полного обзора:

```bash
git status --short
git diff --submodule=log
git submodule status --recursive
```

## После pull в superproject

```bash
git pull --ff-only
git submodule sync --recursive
git submodule update --init --recursive
```

`sync` переносит изменённые URL из `.gitmodules` в локальную конфигурацию.

## Обновить submodule до remote-ветки

По умолчанию `--remote` использует remote HEAD, а при `submodule.<name>.branch` — настроенную ветку:

```bash
git config -f .gitmodules submodule.libs/ui.branch main
git submodule sync -- libs/ui
git submodule update --remote -- libs/ui
git diff --submodule=log
git add .gitmodules libs/ui
git commit -m "Update UI submodule"
```

После обновления superproject должен закоммитить новый gitlink. Не заменяйте это на `git submodule foreach git pull origin main`: submodule часто находится в detached HEAD, а имя ветки может отличаться.

## Разработать изменение внутри submodule

```bash
git -C libs/ui switch main
git -C libs/ui pull --ff-only
git -C libs/ui switch -c fix/button-focus
# измените файлы
git -C libs/ui add path/to/file
git -C libs/ui commit -m "Fix button focus"
git -C libs/ui push -u origin fix/button-focus
```

После публикации коммита submodule обновите superproject:

```bash
git add libs/ui
git commit -m "Use UI focus fix"
```

Публикуйте коммит submodule раньше gitlink, иначе коллеги не смогут получить указанное состояние.

## Выполнить безопасную команду во всех submodule

```bash
git submodule foreach --recursive 'git status --short --branch'
```

Не используйте безусловные `pull`, `reset --hard` и `clean` через `foreach`: одна команда затронет все вложенные репозитории с разным состоянием.

## Удалить submodule

```bash
git submodule deinit -f -- libs/ui
git rm libs/ui
git commit -m "Remove UI submodule"
```

`git rm` обновит индекс и `.gitmodules`, если это последний/соответствующий раздел. После коммита проверьте:

```bash
git diff HEAD^ -- .gitmodules
git status --short
```

Git может сохранить служебный репозиторий в `.git/modules/` для восстановления. Ручное удаление оттуда не требуется для обычного удаления submodule; очищайте его отдельно только после резервной проверки точного пути.

## Важные особенности

- После `update` submodule обычно находится в detached HEAD — это нормально для воспроизводимой сборки.
- `git pull` в superproject сам по себе не обязан обновить рабочие деревья submodule.
- Изменение URL требует `git submodule sync` у существующих клонов.
- Рекурсивные submodule требуют флага `--recursive`.

## Полезные ссылки

- [Официальная документация git submodule](https://git-scm.com/docs/git-submodule)
- [gitmodules](https://git-scm.com/docs/gitmodules)
- [git clone](./clone.md)
