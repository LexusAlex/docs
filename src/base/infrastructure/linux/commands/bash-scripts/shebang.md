# shebang

**Уровень:** Продвинутый

Строка shebang определяет интерпретатор для выполнения скрипта.

## Синтаксис

```bash
#!/path/to/interpreter [optional-arg]
```

## Основные варианты

| Shebang | Описание |
|---------|----------|
| `#!/bin/bash` | Прямой путь к bash |
| `#!/usr/bin/env bash` | Поиск bash через PATH |
| `#!/bin/sh` | POSIX-совместимый shell |
| `#!/usr/bin/env sh` | Поиск sh через PATH |
| `#!/bin/zsh` | Zsh shell |
| `#!/usr/bin/env python3` | Python 3 |
| `#!/usr/bin/env node` | Node.js |

## Разница между bash и sh

| Особенность | bash | sh |
|-------------|------|----|
| Массивы | Да | Нет |
| `[[ ]]` | Да | Нет |
| Арифметика `(( ))` | Да | Нет |
| `${var,,}` / `${var^^}` | Да | Нет |
| Process substitution | Да | Нет |
| Associative arrays | Да | Нет |
| `select` | Да | Нет |
| POSIX-совместимость | Частичная | Полная |

## Примеры

### 1. Стандартный shebang для bash

```bash
#!/bin/bash
echo "Hello from bash"
```

### 2. Переносимый shebang через env

```bash
#!/usr/bin/env bash
echo "Found bash at: $(which bash)"
```

### 3. POSIX-совместимый скрипт

```bash
#!/bin/sh
echo "Runs on any POSIX shell"
```

### 4. Скрипт Python

```python
#!/usr/bin/env python3
print("Hello from Python")
```

### 5. Скрипт Node.js

```javascript
#!/usr/bin/env node
console.log("Hello from Node.js");
```

### 6. Сделать скрипт исполняемым

```bash
chmod +x script.sh
```

### 7. Запуск через прямой вызов

```bash
./script.sh
```

### 8. Запуск через интерпретатор

```bash
bash script.sh
sh script.sh
```

### 9. Запуск в текущей оболочке (source)

```bash
source script.sh
. script.sh
```

### 10. Проверка кода возврата

```bash
./script.sh
echo "Exit code: $?"
```

### 11. Строгий режим с set -e

```bash
#!/bin/bash
set -e
# Скрипт завершится при первой ошибке
```

### 12. Полный строгий режим

```bash
#!/bin/bash
set -euo pipefail
# -e: выход при ошибке
# -u: ошибка при использовании неопределённых переменных
# -o pipefail: ошибка в любой команде конвейера
```

### 13. Скрипт с аргументом оболочки

```bash
#!/bin/bash -x
# Включает трассировку выполнения
echo "This will be traced"
```

### 14. Проверка интерпретатора

```bash
#!/bin/bash
echo "Shell: $BASH_VERSION"
echo "Path: $BASH"
```

## Методы выполнения скриптов

| Метод | Команда | Новая оболочка | Загружает shebang |
|-------|---------|---------------|-------------------|
| Прямой вызов | `./script.sh` | Да | Да |
| Через bash | `bash script.sh` | Да | Нет |
| Source | `source script.sh` | Нет | Нет |
| Точка | `. script.sh` | Нет | Нет |

## Флаги set

| Флаг | Описание |
|------|----------|
| `-e` | Выход при ошибке команды |
| `-u` | Ошибка при неопределённой переменной |
| `-o pipefail` | Ошибка в конвейере |
| `-x` | Трассировка команд |
| `-n` | Только проверка синтаксиса |
| `-v` | Вывод строк при чтении |

:::tip Переносимость
Используйте `#!/usr/bin/env bash` для переносимости между системами. Путь `/bin/bash` не гарантирован на всех дистрибутивах (например, NixOS, FreeBSD).
:::

:::warning Различия source и прямого вызова
При `./script.sh` скрипт выполняется в новой оболочке. При `source script.sh` — в текущей. Переменные и функции, объявленные через source, доступны в текущей сессии.
:::

## Советы

:::tip Проверка синтаксиса
Используйте `bash -n script.sh` для проверки синтаксиса без выполнения. Для shellcheck: `shellcheck script.sh`.
:::

:::warning Пустая строка после shebang
Всегда оставляйте пустую строку после shebang. Некоторые системы требуют newline после строки интерпретатора.
:::

## См. также

- [variables](variables.md) — переменные
- [arguments](arguments.md) — аргументы скрипта
