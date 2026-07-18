# PATH

**Уровень:** Средний

Переменная окружения PATH определяет директории, в которых система ищет исполняемые файлы.

## Что такое PATH

PATH — это список директорий, разделённых двоеточием (`:`), в которых оболочка ищет команды при их вызове.

```bash
echo $PATH
# /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

## Синтаксис

```bash
# Текущее значение
echo $PATH

# Временное изменение
export PATH="/new/path:$PATH"

# Постоянное изменение
# Добавить в ~/.bashrc, ~/.profile или /etc/profile
```

## Примеры

### Просмотр PATH

```bash
# Показать PATH
echo $PATH

# Читаемый формат (каждая директория на новой строке)
echo $PATH | tr ':' '\n'

# С сортировкой
echo $PATH | tr ':' '\n' | sort
```

### Временное добавление директории

```bash
# Добавить в начало (приоритет)
export PATH="$HOME/.local/bin:$PATH"

# Добавить в конец
export PATH="$PATH:$HOME/.local/bin"

# Добавить несколько директорий
export PATH="$HOME/.local/bin:$HOME/bin:$PATH"
```

### Постоянное добавление

```bash
# В ~/.bashrc (для интерактивных сессий)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# В ~/.profile (для login shell)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.profile

# В /etc/profile (для всех пользователей)
sudo tee -a /etc/profile.d/custom-path.sh << 'EOF'
export PATH="/opt/myapp/bin:$PATH"
EOF
```

### Проверка наличия программы

```bash
# Найти программу в PATH
which nginx
which python3

# Проверить, есть ли программа в PATH
command -v nginx && echo "found" || echo "not found"

# Все пути к программе
which -a python3
```

## Порядок поиска

```bash
# Порядок определяется порядком в PATH
# Первый найденный файл будет использован

echo $PATH
# /usr/local/bin:/usr/bin:/bin

# Если nginx есть в /usr/local/bin и /usr/bin,
# будет использован /usr/local/bin/nginx
```

### Изменение приоритета

```bash
# Переместить директорию в начало
export PATH="$HOME/.local/bin:${PATH/\/usr\/local\/bin:/}"

# Или пересобрать PATH
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"
```

## Безопасность

### Риски

```bash
# НЕ ДЕЛАЙТЕ ТАК:
export PATH=".:$PATH"  # Текущая директория в PATH — опасно!

# НЕ ДЕЛАЙТЕ ТАК:
export PATH="$PATH:."  # Текущая директория в конце — тоже опасно

# Почему: злоумышленник может создать файл с именем системной команды
```

### Безопасные практики

```bash
# Используйте абсолютные пути
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"

# Не добавляйте world-writable директории
ls -la /some/dir  # Проверьте права

# Проверяйте целостность PATH
echo $PATH | grep -q '^\.' && echo "WARNING: relative path in PATH"
```

## Паттерны использования

### Go разработка

```bash
export GOPATH="$HOME/go"
export PATH="$PATH:$GOPATH/bin"
```

### Node.js (nvm)

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm автоматически добавляет node в PATH
```

### Python (pyenv)

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

### Rust (cargo)

```bash
export PATH="$HOME/.cargo/bin:$PATH"
```

### Локальные бинарники

```bash
# ~/.local/bin — стандартное место для пользовательских программ
export PATH="$HOME/.local/bin:$PATH"
```

## Переменные PATH vs ${PATH}

```bash
# Эти записи эквивалентны
echo $PATH
echo ${PATH}

# ${PATH} удобнее при конкатенации
export PATH="${PATH}:/new/path"

# Подстроки
echo ${PATH##*:}  # Последняя директория
echo ${PATH%%:*}  # Первая директория
```

## Практические сценарии

### Проверка, откуда берётся команда

```bash
type nginx        # Показать тип и путь
which nginx       # Путь к исполняемому файлу
command -v nginx  # Путь (работает в скриптах)
```

### Поиск всех версий программы

```bash
which -a python3
# /usr/bin/python3
# /usr/local/bin/python3
# /home/user/.pyenv/shims/python3
```

### Очистка PATH от дубликатов

```bash
# Удалить дубликаты
PATH=$(echo "$PATH" | tr ':' '\n' | sort -u | tr '\n' ':' | sed 's/:$//')
```

### Временное изменение PATH для скрипта

```bash
#!/bin/bash
# Сохранить оригинальный PATH
OLD_PATH="$PATH"

# Изменить PATH
export PATH="/opt/myapp/bin:$PATH"

# Команды скрипта
myapp --version

# Восстановить PATH
export PATH="$OLD_PATH"
```

:::tip Порядок важен
Директории в PATH проверяются слева направо. Если одна и та же программа есть в нескольких директориях, будет использована первая найденная.
:::

:::warning Текущая директория
Никогда не добавляйте `.` (текущую директорию) в PATH — это позволяет запускать произвольные программы при переходе в директорию.
:::

:::tip ~/.local/bin
`$HOME/.local/bin` — стандартное место для пользовательских программ. Многие инструменты (pip, cargo, npm) устанавливают бинарники именно сюда.
:::

:::warning Права доступа
Проверяйте права директорий в PATH. Директории с правами `o+w` (world-writable) представляют угрозу безопасности.
:::

## См. также

- [export](export.md) — установка переменных
- [bashrc](bashrc.md) — файлы конфигурации
- [which](../search-files-and-commands/which.md) — поиск команд
