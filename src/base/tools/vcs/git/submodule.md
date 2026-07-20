# git-submodule

**Уровень:** Продвинутый
**Версия Git:** 1.5.0

Управляет подмодулями — внешними репозиториями, вложенными в основной репозиторий. Позволяет подключать внешние библиотеки и компоненты с фиксацией определённых версий.

## Синтаксис

```bash
git submodule [--quiet] add [опции] [--] <url> [<путь>]
git submodule [--quiet] status [--cached] [--recursive] [--] [<путь>...]
git submodule [--quiet] init [--] [<путь>...]
git submodule [--quiet] update [опции] [--] [<путь>...]
git submodule [--quiet] deinit [опции] [--] <путь>...
git submodule [--quiet] summary [опции] [--] [<путь>...]
git submodule [--quiet] foreach [--recursive] <команда>
git submodule [--quiet] sync [--recursive] [--] [<путь>...]
git submodule [--quiet] absorbgitdirs [--] [<путь>...]
```

## Основные опции

| Опция | Описание |
|---|---|
| `add` | Добавить новый подмодуль |
| `init` | Инициализировать подмодули |
| `update` | Обновить подмодули |
| `status` | Показать статус подмодулей |
| `deinit` | Деинициализировать подмодуль |
| `summary` | Показать сводку изменений |
| `foreach` | Выполнить команду в каждом подмодуле |
| `sync` | Синхронизировать URL подмодулей |
| `absorbgitdirs` | Поглотить git-директории подмодулей |
| `--recursive` | Рекурсивная обработка |
| `--force` | Принудительное выполнение |
| `--depth=<n>` | Ограничить глубину клонирования |

## Примеры

1. Добавить подмодуль:
```bash
git submodule add https://github.com/user/lib.git libs/lib
```

2. Инициализировать подмодули после клонирования:
```bash
git submodule init
```

3. Обновить подмодули:
```bash
git submodule update
```

4. Инициализация и обновление одной командой:
```bash
git submodule update --init
```

5. Рекурсивное обновление вложенных подмодулей:
```bash
git submodule update --init --recursive
```

6. Статус подмодулей:
```bash
git submodule status
```

7. Статус с кэшированными данными:
```bash
git submodule status --cached
```

8. Удаление подмодуля:
```bash
git submodule deinit libs/lib
git rm libs/lib
rm -rf .git/modules/libs/lib
```

9. Выполнить команду во всех подмодулях:
```bash
git submodule foreach git pull origin main
```

10. Синхронизация URL подмодулей:
```bash
git submodule sync
```

11. Клонирование с подмодулями:
```bash
git clone --recurse-submodules https://github.com/user/repo.git
```

12. Сводка изменений в подмодулях:
```bash
git submodule summary
```

13. Обновление конкретного подмодуля:
```bash
git submodule update --remote libs/lib
```

14. Рекурсивное обновление всех подмодулей:
```bash
git submodule foreach --recursive git fetch
```

15. Поглощение git-директорий:
```bash
git submodule absorbgitdirs
```

## Практические сценарии

**Подключение внешней библиотеки:**
Добавление сторонней библиотеки как подмодуля с фиксацией версии.

```bash
git submodule add https://github.com/vendor/library.git vendor/library
git add .gitmodules vendor/library
git commit -m "feat: добавление библиотеки как подмодуля"
```

**Обновление всех зависимостей:**
Рекурсивное обновление всех подмодулей до последних версий.

```bash
git submodule update --init --recursive
git submodule foreach git pull origin main
git commit -am "chore: обновление подмодулей"
```

**Клонирование проекта с зависимостями:**
Получение полной копии проекта вместе со всеми подмодулями.

```bash
git clone --recurse-submodules https://github.com/team/project.git
cd project
npm ci
```

## Связки с другими командами

```bash
# Клонирование с подмодулями
git clone --recurse-submodules <url>

# Обновление и коммит
git submodule update --remote && git add . && git commit -m "update submodules"

# Проверка статуса
git submodule status --recursive

# Синхронизация и обновление
git submodule sync --recursive && git submodule update --init --recursive
```

## Советы

:::tip
Используйте `git clone --recurse-submodules` при клонировании, чтобы автоматически инициализировать и обновить все подмодули.
:::

:::warning
При удалении подмодуля обязательно удаляйте его из `.gitmodules`, индекса и директории `.git/modules/`.
:::

## См. также

- [git-clone](/base/tools/vcs/git/clone) — клонирование репозитория
- [git-pull](/base/tools/vcs/git/pull) — получение изменений
- [git-fetch](/base/tools/vcs/git/fetch) — получение без слияния
- [git-add](/base/tools/vcs/git/add) — добавление файлов
- [git-commit](/base/tools/vcs/git/commit) — создание коммитов
