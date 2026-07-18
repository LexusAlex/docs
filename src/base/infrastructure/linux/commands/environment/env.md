# env

**Уровень:** Средний

Просмотр и модификация переменных окружения, запуск команд в изменённом окружении.

## Синтаксис

```bash
env [OPTIONS] [COMMAND [ARGS...]]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-i` | Игнорировать текущее окружение |
| `-u NAME` | Удалить переменную |
| `-0` | Разделитель строк — нулевой байт |
| `--ignore-environment` | То же, что `-i` |
| `--unset=NAME` | То же, что `-u` |

## Примеры

### Просмотр переменных

```bash
# Все переменные окружения
env

# Без постраничного вывода
env | sort

# Поиск конкретной переменной
env | grep PATH

# В формате NAME=VALUE
env | grep -E '^[A-Z_]+='
```

### Запуск команд в изменённом окружении

```bash
# С дополнительной переменной
env DB_HOST=localhost myapp

# С удалённой переменной
env -u DB_PASSWORD myapp

# С несколькими изменениями
env DB_HOST=localhost DB_PORT=5432 -u DB_PASSWORD myapp
```

### Чистое окружение

```bash
# Запуск с пустым окружением
env -i command

# Пустое окружение с конкретными переменными
env -i HOME="$HOME" PATH="/usr/bin:/bin" TERM="$TERM" bash

# Минимальное окружение для скрипта
env -i LANG=en_US.UTF-8 LC_ALL=C ./script.sh
```

### Использование в shebang

```bash
#!/usr/bin/env python3
print("Hello, World!")

#!/usr/bin/env bash
echo "Running with env bash"

#!/usr/bin/env node
console.log("Hello from Node.js");
```

## Практические сценарии

### Портативные скрипты

```bash
#!/usr/bin/env python3
# Автоматически найдёт python3 в PATH
```

### Тестирование с чистым окружением

```bash
# Проверить, работает ли программа без переменных
env -i ./myapp

# Добавить только необходимые переменные
env -i HOME="$HOME" USER="$USER" ./myapp
```

### Запуск с изменёнными переменными

```bash
# Запуск с другим LANG
env LANG=ru_RU.UTF-8 myapp

# Запуск с отладочным выводом
env DEBUG=1 VERBOSE=1 myapp

# Запуск с другим PATH
env PATH="/usr/local/bin:/usr/bin:/bin" myapp
```

### Удаление переменных

```bash
# Удалить одну переменную
env -u SECRET_KEY myapp

# Удалить несколько переменных
env -u SECRET_KEY -u DB_PASSWORD myapp
```

## Разница между env и export

| Команда | Назначение |
|---------|------------|
| `env` | Просмотр и запуск команд с изменённым окружением |
| `export` | Экспорт переменных в дочерние процессы |
| `printenv` | Только просмотр переменных |

## Shebang и /usr/bin/env

Shebang `#!/usr/bin/env interpreter` — стандартный способ сделать скрипты портативными:

```bash
#!/usr/bin/env bash
#!/usr/bin/env python3
#!/usr/bin/env node
#!/usr/bin/env ruby
#!/usr/bin/env perl
```

:::tip Почему /usr/bin/env?
Путь к интерпретатору может отличаться в разных системах. `/usr/bin/env` ищет интерпретатор в `PATH`, что делает скрипт портативным.
:::

:::warning Безопасность shebang
`#!/usr/bin/env` может быть обходом для атак через `PATH`. В скриптах с повышенными требованиями к безопасности используйте прямой путь: `#!/bin/bash`.
:::

:::tip Пустое окружение
`env -i` полезно для тестирования — программа запустится без переменных, что поможет найти незадекларированные зависимости.
:::

:::warning Права доступа
При использовании `env -i` переменная `PATH` не установлена, поэтому команды без абсолютного пути не будут найдены.
## См. также

- [export](export.md) — установка переменных
- [printenv](printenv.md) — вывод переменной

:::
