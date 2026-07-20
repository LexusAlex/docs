# git clone

**Уровень:** Начальный
**Минимальная версия Git:** 0.99

`git clone` создаёт новый репозиторий из существующего, настраивает remote `origin` и обычно checkout-ит default branch.

## Синтаксис

```bash
git clone [<options>] <repository> [<directory>]
```

## Основные опции

| Опция | Описание |
|---|---|
| `-b <name>`, `--branch <name>` | Checkout указанной ветки или тега |
| `--single-branch` | Получить историю только одной ветки |
| `--depth <n>` | Создать shallow clone глубиной `n` коммитов |
| `--filter=<spec>` | Создать partial clone с отложенной загрузкой части объектов |
| `--sparse` | Сначала checkout только файлов верхнего уровня и включить sparse-checkout |
| `-n`, `--no-checkout` | Не выполнять checkout после клонирования |
| `--bare` | Создать репозиторий без рабочего дерева |
| `--mirror` | Создать bare-зеркало всех refs и настроить mirror fetch |
| `--recurse-submodules[=<pathspec>]` | Инициализировать submodule после clone |
| `--shallow-submodules` | Клонировать submodule с глубиной 1 |
| `-j <n>`, `--jobs <n>` | Параллельно клонировать submodule |
| `-o <name>`, `--origin <name>` | Использовать другое имя вместо `origin` |

## Обычное клонирование

```bash
git clone https://example.com/team/project.git
git -C project status --short --branch
git -C project remote -v
```

Обычный clone создаёт remote-tracking refs для веток согласно fetch refspec, но локально checkout-ит только одну начальную ветку. Остальные локальные ветки создаются по мере необходимости:

```bash
git -C project switch --track origin/feature/login
```

## Клонировать в выбранный каталог

```bash
git clone https://example.com/team/project.git docs-local
```

Каталог должен быть пустым или отсутствовать.

## Выбрать ветку или тег

```bash
git clone --branch release/2.x --single-branch https://example.com/team/project.git
git clone --branch v2.4.0 --single-branch https://example.com/team/project.git project-v2.4
```

При выборе тега `HEAD` будет detached. Создайте ветку, если планируете коммиты.

## Shallow clone

```bash
git clone --depth 1 https://example.com/team/project.git
```

Подходит для CI или быстрого просмотра актуального состояния. Позже историю можно углубить:

```bash
git fetch --deepen=50
# или получить полную историю
git fetch --unshallow
```

Shallow clone технически может выполнять push, если сервер принимает обновление и нужная история доступна. Ограничение не в запрете push, а в неполной истории: некоторые merge, blame, bisect и серверные проверки могут работать не так, как в полном клоне.

## Partial clone

```bash
git clone --filter=blob:none https://example.com/team/large-project.git
```

Git получает историю и деревья, а содержимое blob загружает по запросу. Сервер должен поддерживать partial clone.

Вместе со sparse-checkout:

```bash
git clone --filter=blob:none --sparse https://example.com/team/monorepo.git
git -C monorepo sparse-checkout set docs tools
```

## Не выполнять checkout

```bash
git clone --no-checkout https://example.com/team/project.git
```

Создаётся обычный репозиторий с рабочим каталогом, но файлы выбранного коммита в него пока не checkout-ятся. Это не то же самое, что «только `.git`»; для репозитория без рабочего дерева используйте `--bare`.

## Submodule

```bash
git clone --recurse-submodules https://example.com/team/project.git
```

Для уже созданного клона:

```bash
git submodule update --init --recursive
```

## Bare и mirror

```bash
git clone --bare https://example.com/team/project.git project.git
git clone --mirror https://example.com/team/project.git project-mirror.git
```

`--mirror` включает все refs и настройку принудительной синхронизации. Используйте зеркало только для backup/mirroring, а не как обычную рабочую копию.

## Протоколы

- HTTPS — удобен с токенами и credential manager.
- SSH — удобен с ключами и настройкой доступа.
- Локальный путь/`file://` — для локальных копий.
- `git://` не шифрует трафик и не аутентифицирует сервер; для доверенной разработки предпочитайте HTTPS или SSH.

## Полезные ссылки

- [Официальная документация git clone](https://git-scm.com/docs/git-clone)
- [git remote](./remote.md)
- [git fetch](./fetch.md)
- [git submodule](./submodule.md)
