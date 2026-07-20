# git init

**Уровень:** Начинающий
**Версия Git:** 0.99

Создаёт новый пустой Git-репозиторий. Команда инициализирует директорию `.git` со всеми необходимыми структурами данных.

## Синтаксис

```bash
git init [каталог]
git init [опции] [каталог]
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--bare` | Создать «голый» репозиторий (без рабочей директории) — для серверов |
| `--initial-branch=<имя>` | Задать имя начальной ветки (вместо `main`/`master`) |
| `--shared[=<значение>]` | Настроить совместный доступ к репозиторию (`false`, `true`, `umask`, `group`, `all`, `world`, `everybody`) |
| `--template=<каталог>` | Использовать указанный каталог как шаблон |
| `--separate-git-dir=<каталог>` | Создать `.git` как ссылку на указанный каталог |
| `--object-format=<формат>` | Формат хеша объектов (`sha1` или `sha256`) |

## Примеры

### 1. Создание репозитория в текущей директории

```bash
git init
# Инициализирует .git в текущей папке
```

### 2. Создание репозитория в новой директории

```bash
git init my-project
# Создаёт my-project/ и my-project/.git/
```

### 3. Указание имени начальной ветки

```bash
git init --initial-branch=main my-project
# Начальная ветка будет main вместо master
```

### 4. Создание «голого» репозитория (для сервера)

```bash
git init --bare my-repo.git
# Создаёт репозиторий без рабочей директории
# Используется на серверах для push/pull
```

### 5. Создание с указанием шаблона

```bash
git init --template=~/.git-templates/default my-project
# Использует файлы из ~/.git-templates/default
# (хуки, .gitignore, README и т.д.)
```

### 6. Создание с форматом SHA-256

```bash
git init --object-format=sha256 my-project
# Использует SHA-256 вместо SHA-1
```

### 7. Совместный репозиторий для группы

```bash
git init --shared=group my-repo.git
# Все члены группы могут push'ить
```

### 8. Отдельная директория .git

```bash
git init --separate-git-dir=/tmp/gitdir my-project
# .git будет ссылкой на /tmp/gitdir
```

### 9. Переинициализация существующего репозитория

```bash
git init
# Безопасно — не перезаписывает существующий .git
```

### 10. Создание репозитория в текущем проекте

```bash
cd /home/user/projects/existing-code
git init
git add .
git commit -m "Initial commit"
```

## Структура .git

После `git init` создаётся:

```
.git/
├── HEAD          # Ссылка на текущую ветку
├── config        # Конфигурация репозитория
├── description   # Описание (для GitWeb)
├── hooks/        # Скрипты-хуки
├── objects/      # Хранилище объектов (коммиты, деревья, блобы)
├── refs/         # Ссылки (ветки, теги)
└── info/         # Дополнительная информация
```

## Практические сценарии

### Начало нового проекта

```bash
mkdir my-project && cd my-project
git init
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"
```

### Подготовка серверного репозитория

```bash
# На сервере
git init --bare /srv/git/project.git

# На локальной машине
git remote add origin user@server:/srv/git/project.git
git push -u origin main
```

### Миграция существующего проекта в Git

```bash
cd /path/to/existing/project
git init
git add .
git commit -m "Import existing project"
```

## Связки с другими командами

```bash
# Инициализация + первый коммит за одну строку
git init && git add . && git commit -m "Initial commit"

# Инициализация с настройкой пользователя
git init my-project && cd my-project && git config user.name "Name" && git config user.email "email@example.com"
```

## Советы

:::tip
Глобально задайте имя начальной ветки: `git config --global init.defaultBranch main`
:::

:::warning
`git init` в уже существующем репозитории безопасен — команда не перезаписывает `.git`
:::

:::tip
Используйте `--bare` только для серверных репозиторивов. В голом репозитории нельзя работать напрямую.
:::

## См. также

- [clone](clone.md) — клонирование существующего репозитория
- [add](add.md) — добавление файлов в индекс
- [commit](commit.md) — фиксация изменений
