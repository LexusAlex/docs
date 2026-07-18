# Bash-скрипты

Написание скриптов на языке оболочки bash. Переменные, условия, циклы, функции.

## Темы

| Файл | Описание |
|------|----------|
| [shebang](shebang.md) | Строки запуска скрипта |
| [variables](variables.md) | Переменные и подстановки |
| [conditions](conditions.md) | Условия if/elif/else и test |
| [loops](loops.md) | Циклы for, while, until |
| [functions](functions.md) | Функции и возврат значений |
| [arguments](arguments.md) | Аргументы скрипта ($1, $@, $#) |

## Быстрый старт

```bash
#!/bin/bash
set -euo pipefail

echo "Привет, $USER!"
echo "Аргументов: $#"
echo "Все аргументы: $@"
```

## Запуск скрипта

```bash
# Сделать исполняемым
chmod +x script.sh

# Запуск
./script.sh
bash script.sh
source script.sh    # в текущей оболочке
```

## Режимы отладки

```bash
bash -x script.sh   # трассировка команд
set -x              # включить трассировку
set +x              # выключить трассировку
set -e              # выход при ошибке
set -u              # ошибка при неинициализированных переменных
set -o pipefail     # ошибка в конвейере
```
