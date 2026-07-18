# export

**Уровень:** Средний

Экспорт переменных окружения в дочерние процессы.

## Синтаксис

```bash
export [OPTIONS] [NAME[=VALUE]...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-n` | Убрать экспорт (переменная остаётся, но не передаётся) |
| `-p` | Показать все экспортированные переменные |
| `-f` | Экспортировать функцию |

## Примеры

### Экспорт переменных

```bash
# Экспорт с присваиванием
export DB_HOST="localhost"
export DB_PORT=5432
export DB_NAME="myapp"

# Экспорт существующей переменной
MY_VAR="value"
export MY_VAR

# Множественный экспорт
export LANG=en_US.UTF-8 EDITOR=vim TERM=xterm-256color
```

### Просмотр экспортированных переменных

```bash
# Все экспортированные переменные
export -p

# Проверить конкретную переменную
export -p | grep DB_HOST
```

### Удаление экспорта

```bash
# Убрать экспорт (переменная остаётся в текущей оболочке)
export -n MY_VAR

# Полностью удалить переменную
unset MY_VAR
```

### Экспорт функций

```bash
# Экспорт функции для дочерних процессов
export -f my_function

my_function() {
    echo "Hello from function"
}
export -f my_function
```

## Область видимости

```bash
# Переменная доступна только в текущей оболочке
LOCAL_VAR="local"

# Переменная доступна в дочерних процессах
export EXPORTED_VAR="exported"

# Проверка в дочернем процессе
bash -c 'echo LOCAL_VAR=$LOCAL_VAR'      # пусто
bash -c 'echo EXPORTED_VAR=$EXPORTED_VAR' # "exported"
```

## Постоянная настройка

### ~/.bashrc

```bash
# Добавить в ~/.bashrc для постоянного экспорта
export EDITOR=vim
export VISUAL=vim
export LANG=en_US.UTF-8
export TERM=xterm-256color
export HISTSIZE=10000
export HISTFILESIZE=20000
```

### ~/.profile

```bash
# ~/.profile загружается для login shell
export PATH="$HOME/.local/bin:$PATH"
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_CONFIG_HOME="$HOME/.config"
```

## Стандартные переменные окружения

| Переменная | Описание | Пример |
|------------|----------|--------|
| `PATH` | Пути поиска программ | `/usr/bin:/usr/local/bin` |
| `HOME` | Домашняя директория | `/home/user` |
| `USER` | Имя пользователя | `alex` |
| `SHELL` | Текущая оболочка | `/bin/bash` |
| `EDITOR` | Текстовый редактор | `vim` |
| `LANG` | Системная локаль | `en_US.UTF-8` |
| `TERM` | Тип терминала | `xterm-256color` |
| `PWD` | Текущая директория | `/home/user` |
| `HOSTNAME` | Имя хоста | `server01` |
| `DISPLAY` | X11 дисплей | `:0` |
| `XDG_*` | Переменные XDG | Various |

## Практические сценарии

### Настройка окружения для разработки

```bash
# ~/.bashrc
export GOPATH="$HOME/go"
export PATH="$PATH:$GOPATH/bin"
export NODE_ENV=development
export DATABASE_URL="postgresql://localhost:5432/mydb"
```

### Временное изменение PATH

```bash
# Добавить директорию в PATH для текущей сессии
export PATH="$HOME/.local/bin:$PATH"

# Проверить
echo $PATH
which myprogram
```

### Настройка для скрипта

```bash
#!/bin/bash
export LANG=en_US.UTF-8
export LC_ALL=C
export DEBIAN_FRONTEND=noninteractive

# Ваши команды...
```

### Передача переменных в sudo

```bash
# Сохранить переменные при использовании sudo
sudo -E command  # -E сохраняет окружение

# Или передать конкретные переменные
sudo DB_HOST="$DB_HOST" DB_PORT="$DB_PORT" command
```

:::tip Безопасность
Никогда не экспортируйте секреты (пароли, токены) напрямую. Используйте файлы `.env` с правильными правами доступа или менеджеры секретов.
:::

:::warning PATH порядок
Порядок директорий в `PATH` важен — первая найденная программа будет использована. Пользовательские директории должны быть перед системными: `$HOME/.local/bin:$PATH`.
:::

:::tip export vs declare
`export` делает переменную доступной для дочерних процессов. `declare -x` делает то же самое, но с дополнительными опциями (тип, массив и т.д.).
:::

:::warning ~/.bashrc vs ~/.profile
Переменные, которые нужны только в интерактивной оболочке, помещайте в `~/.bashrc`. Переменные для всех сессий (включая GUI) — в `~/.profile`.
## См. также

- [env](env.md) — просмотр переменных
- [printenv](printenv.md) — вывод переменной
- [bashrc](bashrc.md) — файлы конфигурации

:::
