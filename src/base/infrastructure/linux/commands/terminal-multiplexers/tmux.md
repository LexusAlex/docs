# tmux

**Уровень:** Средний

Terminal multiplexer для управления несколькими сессиями терминала внутри одного окна. Позволяет отключаться от сессий и подключаться к ним позже, разделять терминал на панели и вкладки.

## Синтаксис

```bash
tmux [опции] [команда]
tmux new -s имя              # создать новую сессию
tmux ls                      # список сессий
tmux attach -t имя           # подключиться к сессии
tmux kill-session -t имя     # завершить сессию
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-s имя` | Задать имя сессии |
| `-d` | Запустить сессию в фоне (отключённой) |
| `-L имя` | Использовать именованный сокет |
| `-f файл` | Указать альтернативный конфигурационный файл |
| `-V` | Показать версию |
| `-CC` | Режим управления (для встроенных терминалов) |
| `new` | Создать новую сессию |
| `ls` | Список сессий |
| `attach` | Подключиться к сессии |
| `detach` | Отключиться от сессии |
| `kill-session` | Завершить сессию |
| `kill-server` | Завершить сервер tmux |
| `list-keys` | Показать все привязки клавиш |
| `list-commands` | Список доступных команд |

## Управление сессиями

### Создание сессии

```bash
tmux                          # новая сессия с автоматическим именем
tmux new -s work              # именованная сессия
tmux new -s work -d           # создать и сразу отключиться
tmux new-session -s dev -x 200 -y 50  # задать размер
```

### Список сессий

```bash
tmux ls
# work: 1 windows (created Mon Jan 15 10:00:00 2024) (attached)
# dev: 2 windows (created Mon Jan 15 11:00:00 2024)
```

### Подключение к сессии

```bash
tmux attach -t work           # подключиться к сессии work
tmux a -t work                # короткий вариант
tmux a                        # подключиться к последней сессии
```

### Отключение от сессии

```
Ctrl+b d                      # отключиться от текущей сессии
```

```bash
tmux detach                   # из командной строки
```

### Завершение сессии

```bash
tmux kill-session -t work     # завершить конкретную сессию
tmux kill-server              # завершить все сессии и сервер
```

## Управление окнами (windows)

Окна в tmux аналогичны вкладкам в терминале.

| Сочетание клавиш | Действие |
|-----------------|----------|
| `Ctrl+b c` | Создать новое окно |
| `Ctrl+b ,` | Переименовать текущее окно |
| `Ctrl+b w` | Список всех окон (интерактивный) |
| `Ctrl+b 0-9` | Переключиться на окно по номеру |
| `Ctrl+b n` | Следующее окно |
| `Ctrl+b p` | Предыдущее окно |
| `Ctrl+b &` | Закрыть текущее окно (с подтверждением) |
| `Ctrl+b l` | Переключиться на последнее активное окно |
| `Ctrl+b f` | Найти окно по имени |

## Управление панелями (panes)

Панели позволяют разделить окно на несколько частей.

| Сочетание клавиш | Действие |
|-----------------|----------|
| `Ctrl+b %` | Разделить вертикально (лево/право) |
| `Ctrl+b "` | Разделить горизонтально (верх/низ) |
| `Ctrl+b ←↑→↓` | Переключиться на панель в направлении |
| `Ctrl+b o` | Следующая панель |
| `Ctrl+b ;` | Предыдущая панель |
| `Ctrl+b x` | Закрыть текущую панель (с подтверждением) |
| `Ctrl+b z` | Развернуть/свернуть текущую панель (zoom) |
| `Ctrl+b {` | Переместить панель влево |
| `Ctrl+b }` | Переместить панель вправо |
| `Ctrl+b Space` | Переключить раскладку панелей |
| `Ctrl+b q` | Показать номера панелей |
| `Ctrl+b q 0-9` | Перейти к панели по номеру |
| `Ctrl+b !` | Вынести панель в отдельное окно |

### Изменение размера панелей

| Сочетание клавиш | Действие |
|-----------------|----------|
| `Ctrl+b Ctrl+←` | Уменьшить ширину панели |
| `Ctrl+b Ctrl+→` | Увеличить ширину панели |
| `Ctrl+b Ctrl+↑` | Уменьшить высоту панели |
| `Ctrl+b Ctrl+↓` | Увеличить высоту панели |
| `Ctrl+b Alt+←` | Уменьшить ширину на 5 символов |
| `Ctrl+b Alt+→` | Увеличить ширину на 5 символов |

## Режим копирования

| Сочетание клавиш | Действие |
|-----------------|----------|
| `Ctrl+b [` | Войти в режим копирования |
| `q` или `Esc` | Выйти из режима копирования |
| `Space` | Начать выделение |
| `Enter` | Скопировать выделенное |
| `Ctrl+b ]` | Вставить из буфера |
| `n` | Следующее совпадение поиска |
| `N` | Предыдущее совпадение поиска |
| `/` | Поиск вниз |
| `?` | Поиск вверх |

### Навигация в режиме копирования (vi)

```
h, j, k, l          # перемещение
w, b                 # по словам
0, $                 # начало/конец строки
g, G                 # начало/конец буфера
```

## Командный режим

```
Ctrl+b :              # открыть командную строку
```

Полезные команды:

```bash
:list-sessions        # список сессий
:list-windows         # список окон
:list-panes           # список панелей
:swap-window -s 2 -t 1  # поменять окна местами
:join-pane -s 2 -t 1    # присоединить панель из другого окна
:break-pane            # вынести панель в отдельное окно
:resize-pane -D 10     # увеличить панель вниз на 10 строк
:setw synchronize-panes on  # синхронный ввод во все панели
```

## Конфигурация

Файл конфигурации: `~/.tmux.conf`

### Базовые настройки

```bash
# Изменение префикса на Ctrl+a (как в screen)
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# Включение мыши
set -g mouse on

# Начало нумерации окон с 1
set -g base-index 1
setw -g pane-base-index 1

# Автоматическое переименование окон
setw -g automatic-rename on
set -g set-titles on

# Время отображения сообщений (мс)
set -g display-time 2000
set -g display-panes-time 2000

# История
set -g history-limit 50000

# Перезагрузка конфига
bind r source-file ~/.tmux.conf \; display "Конфиг перезагружен!"
```

### Цвета и статусбар

```bash
# 256 цветов
set -g default-terminal "screen-256color"

# Статусбар
set -g status-style bg=colour235,fg=colour136
set -g status-left "#[fg=green]#S "
set -g status-right "#[fg=yellow]%d.%m.%Y #[fg=green]%H:%M"
set -g status-interval 10

# Активное окно
setw -g window-status-current-style fg=white,bold,bg=colour237

# Цвет панелей
set -g pane-border-style fg=colour235
set -g pane-active-border-style fg=colour240
```

### Горячие клавиши для панелей

```bash
# Быстрое разделение
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
unbind '"'
unbind %

# Навигация как в vim
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Изменение размера
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5
```

## Примеры

### 1. Рабочее окружение для разработки

```bash
# Создать сессию с несколькими окнами
tmux new-session -s dev -d -n editor
tmux new-window -t dev -n server
tmux new-window -t dev -n logs
tmux new-window -t dev -n shell

# Разделить окно editor на панели
tmux send-keys -t dev:editor 'vim .' Enter
tmux split-window -t dev:editor -h -p 30
tmux send-keys -t dev:editor 'git status' Enter

# Подключиться
tmux attach -t dev
```

### 2. Запуск долгих задач

```bash
tmux new -s backup -d
tmux send-keys -t backup 'rsync -avz /data/ /backup/' Enter
tmux attach -t backup
# Или просто проверить статус:
tmux capture-pane -t backup -p | tail -5
```

### 3. Мониторинг на нескольких серверах

```bash
tmux new-session -s monitor -d
tmux send-keys -t monitor 'ssh server1' Enter
tmux split-window -h
tmux send-keys 'ssh server2' Enter
tmux split-window -v
tmux send-keys 'ssh server3' Enter
tmux select-layout tiled
tmux attach -t monitor
```

### 4. Синхронный ввод во все панели

```bash
tmux setw synchronize-panes on
# Теперь ввод идёт во все панели одновременно
# Полезно для одновременного обновления серверов
tmux setw synchronize-panes off
```

### 5. Сохранение и восстановление сессий

```bash
# С помощью tmux-resurrect (плагин)
# Сохранить: Ctrl+b Ctrl+s
# Восстановить: Ctrl+b Ctrl+r

# Или вручную
tmux list-windows -t session_name > session_backup.txt
```

### 6. Запуск команды во всех окнах

```bash
for w in $(tmux list-windows -t mysession -F '#{window_index}'); do
    tmux send-keys -t mysession:$w 'echo hello' Enter
done
```

### 7. Смена панели на целое окно и обратно

```bash
Ctrl+b z   # zoom — развернуть панель на всё окно
Ctrl+b z   # повторно — вернуть обратно
```

## Практические сценарии

### Удалённая разработка

```bash
# На сервере создать сессию
tmux new -s project -d

# Подключиться, работать, отключиться
# При разрыве SSH сессия сохраняется
# Переподключиться:
tmux attach -t project
```

### Запуск процессов после отключения

```bash
tmux new -s deploy -d
tmux send-keys -t deploy './deploy.sh' Enter
# Отключиться: Ctrl+b d
# Проверить: tmux attach -t deploy
```

### Многомониторная конфигурация

```bash
# Окно 1: редактор + терминал
tmux new -s work -n dev
tmux split-window -h -p 40

# Окно 2: логи
tmux new-window -n logs
tmux send-keys 'tail -f /var/log/syslog' Enter

# Окно 3: мониторинг
tmux new-window -n monitor
tmux send-keys 'htop' Enter

tmux select-window -t 1
tmux attach -t work
```

## Советы

:::tip
Используйте `tmux source-file ~/.tmux.conf` для перезагрузки конфигурации без перезапуска.
:::

:::tip
`Ctrl+b ?` покажет все привязки клавиш — полезно для изучения.
:::

:::warning
При использовании `tmux kill-server` завершаются ВСЕ сессии. Используйте `kill-session` для конкретной сессии.
:::

:::tip
Плагин [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) позволяет сохранять и восстанавливать сессии после перезагрузки.
:::

## Связки с другими командами

- **ssh** — tmux сохраняет сессию при обрыве SSH-соединения
- **nohup** — альтернатива для запуска фоновых процессов (tmux удобнее)
- **screen** — аналогичная утилита, tmux считается более современной
- **htop/top** — удобно запускать в отдельной панели tmux
- **git** — можно вести git-операции в отдельных окнах

## См. также

- [ssh](../ssh/ssh.md) — SSH-подключения
- [nohup](../processes/nohup.md) — запуск процессов, не привязанных к терминалу
- [screen](screen.md) — альтернативный мультиплексор
