# bashrc

**Уровень:** Средний

Конфигурационные файлы оболочки Bash.

## Файлы конфигурации

### Системные файлы

| Файл | Описание |
|------|----------|
| `/etc/profile` | Глобальный профиль для login shell |
| `/etc/bash.bashrc` | Глобальная конфигурация для интерактивных оболочек |
| `/etc/profile.d/*.sh` | Дополнительные скрипты профиля |

### Пользовательские файлы

| Файл | Описание |
|------|----------|
| `~/.bash_profile` | Профиль пользователя (login shell) |
| `~/.bash_login` | Альтернатива .bash_profile |
| `~/.profile` | Универсальный профиль (POSIX) |
| `~/.bashrc` | Конфигурация интерактивных оболочек |
| `~/.bash_logout` | Команды при выходе |
| `~/.inputrc` | Настройки readline |

## Порядок загрузки

### Login shell

```
/etc/profile
├── /etc/profile.d/*.sh
├── ~/.bash_profile (если существует)
│   └── ~/.bashrc (обычно вызывается отсюда)
├── ~/.bash_login (если .bash_profile не существует)
└── ~/.profile (если ни .bash_profile, ни .bash_login)
    └── ~/.bashrc (обычно вызывается отсюда)
```

### Interactive non-login shell

```
/etc/bash.bashrc (в некоторых системах)
└── ~/.bashrc
```

### Выход из login shell

```
~/.bash_logout
```

## Структура ~/.bashrc

```bash
# ~/.bashrc - конфигурация интерактивных оболочек bash

# Если не интерактивная оболочка — выйти
case $- in
    *i*) ;;
      *) return;;
esac

# Настройки истории
HISTCONTROL=ignoreboth
HISTSIZE=10000
HISTFILESIZE=20000
shopt -s histappend

# Настройки оболочки
shopt -s checkwinsize
shopt -s globstar

# Переменные окружения
export EDITOR=vim
export VISUAL=vim
export LANG=en_US.UTF-8
export TERM=xterm-256color

# PATH
export PATH="$HOME/.local/bin:$PATH"

# Алиасы
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'

# Промпт
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

# Автодополнение
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
```

## Алиасы

```bash
# Навигация
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias ~='cd ~'

# ls
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias ls='ls --color=auto'

# grep
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# Безопасность
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Git
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'

# Система
alias df='df -h'
alias du='du -h'
alias free='free -m'
alias top='htop'
```

## Настройка промпта (PS1)

### Базовые элементы

| Код | Описание |
|-----|----------|
| `\u` | Имя пользователя |
| `\h` | Имя хоста (до первой точки) |
| `\H` | Полное имя хоста |
| `\w` | Текущая директория (полный путь) |
| `\W` | Имя текущей директории |
| `\t` | Время (24-часовой формат) |
| `\d` | Дата |
| `\$` | `$` для обычного пользователя, `#` для root |
| `\n` | Новая строка |

### Цвета

| Код | Цвет |
|-----|------|
| `\[\033[00m\]` | Сброс |
| `\[\033[01;32m\]` | Зелёный жирный |
| `\[\033[01;34m\]` | Синий жирный |
| `\[\033[01;31m\]` | Красный жирный |
| `\[\033[01;33m\]` | Жёлтый жирный |

### Примеры промптов

```bash
# Стандартный Ubuntu
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

# С git веткой
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;31m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '

# Минимальный
PS1='\w\$ '

# Многострочный
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ '
```

## Полезные настройки

```bash
# Автокоманды при смене директории
cd() {
    builtin cd "$@" && ls
}

# Быстрый поиск в истории
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'

# Создание директорий с родительскими
alias mkdir='mkdir -pv'

# Быстрый просмотр файлов
alias cat='batcat'  # если установлен bat

# Навигация с авто-cd
shopt -s autocd
```

## Практические сценарии

### Применение изменений

```bash
# Перечитать ~/.bashrc
source ~/.bashrc

# Или
. ~/.bashrc
```

### Разделение конфигурации

```bash
# ~/.bashrc
# Загрузка дополнительных файлов
for file in ~/.bashrc.d/*.bashrc; do
    [ -r "$file" ] && source "$file"
done
```

### Условные настройки

```bash
# Только для интерактивных оболочек
[[ $- == *i* ]] || return

# Проверка команды перед использованием
command -v vim > /dev/null && export EDITOR=vim

# Разные настройки для разных хостов
if [[ $(hostname) == "server01" ]]; then
    export PS1="[\u@server01 \W]\$ "
fi
```

:::tip Порядок загрузки
`~/.bashrc` загружается для каждой интерактивной оболочки. Тяжёлые операции (компиляция, сеть) лучше размещать в `~/.bash_profile`, который загружается только при входе.
:::

:::warning return в начале
Всегда начинайте `~/.bashrc` с проверки интерактивности:
```bash
case $- in
    *i*) ;;
      *) return;;
esac
```
Это предотвращает проблемы при запуске неинтерактивных скриптов.
:::

:::tip source vs . (точка)
`source file` и `. file` эквивалентны. `source` — bash-специфичная команда, `.` — POSIX стандарт.
:::

:::warning .bash_profile и .bashrc
Если вы используете `~/.bash_profile`, не забудьте добавить в него `source ~/.bashrc`, иначе настройки из `.bashrc` не будут применены в login shell.
:::

## См. также

- [export](export.md) — установка переменных
- [alias](path.md) — псевдонимы команд
