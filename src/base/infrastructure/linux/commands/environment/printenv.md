# printenv

Просмотр переменных окружения.

## Синтаксис

```bash
printenv [OPTIONS] [VARIABLE...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-0` | Разделитель — нулевой байт вместо новой строки |
| `--null` | То же, что `-0` |

## Примеры

### Просмотр всех переменных

```bash
# Все переменные
printenv

# С сортировкой
printenv | sort

# Без постраничного вывода
printenv | less
```

### Просмотр конкретной переменной

```bash
# Одна переменная
printenv PATH

# Несколько переменных
printenv HOME USER SHELL LANG

# Проверка существования (возвращает код возврата)
printenv NONEXISTENT_VAR
echo $?  # 1 = не существует
```

### Использование в скриптах

```bash
# Получение значения переменной
CURRENT_LANG=$(printenv LANG)

# Проверка переменной в скрипте
if printenv DB_HOST > /dev/null 2>&1; then
    echo "DB_HOST is set to: $(printenv DB_HOST)"
else
    echo "DB_HOST is not set"
fi
```

### Нулевой разделитель

```bash
# Для обработки имён с пробелами
printenv -0

# С xargs
printenv -0 | xargs -0 -I {} echo "Var: {}"
```

## Разница между printenv, env и echo

| Команда | Назначение |
|---------|------------|
| `printenv` | Просмотр переменных (внешняя команда) |
| `env` | Просмотр и запуск команд (встроенная команда) |
| `echo $VAR` | Просмотр переменной (встроенная команда оболочки) |

```bash
# Все три покажут значение PATH
printenv PATH
env | grep PATH
echo $PATH

# Разница: printenv и env — внешние команды,
# echo $VAR — встроенная оболочка
```

## Практические сценарии

### Проверка окружения в скриптах

```bash
#!/bin/bash
# Проверка обязательных переменных
REQUIRED_VARS="DB_HOST DB_PORT DB_NAME"

for var in $REQUIRED_VARS; do
    if ! printenv "$var" > /dev/null 2>&1; then
        echo "Error: $var is not set"
        exit 1
    fi
done
```

### Отладка окружения

```bash
# Показать все переменные, связанные с проектом
printenv | grep -i myapp

# Показать все пути
printenv | grep -i path

# Показать все переменные XDG
printenv | grep XDG
```

### Получение значения в скриптах

```bash
# Безопасное получение значения
DB_HOST=$(printenv DB_HOST || echo "localhost")

# С значением по умолчанию
DB_HOST=$(printenv DB_HOST)
DB_HOST=${DB_HOST:-"localhost"}
```

### Проверка в Docker

```bash
# Проверить переменные в контейнере
docker exec mycontainer printenv

# Конкретная переменная
docker exec mycontainer printenv DB_HOST

# Проверка в docker-compose
docker-compose exec myapp printenv | grep DB_
```

:::tip printenv vs echo
`printenv` — внешняя команда, работает в скриптах и подпроцессах. `echo $VAR` — встроенная оболочка, быстрее, но может вести себя иначе с неинициализированными переменными.
:::

:::warning Код возврата
`printenv` возвращает 0, если переменная существует, и 1, если не существует. Это удобно для проверки в скриптах.
:::

:::tip Безопасность
В скриптах используйте `printenv` вместо `env` для проверки переменных — `printenv` не запускает команды и безопаснее.
:::

:::warning Пробелы в значениях
При обработке вывода `printenv` помните, что значения могут содержать пробелы. Используйте `-0` и `xargs -0` для безопасной обработки.
:::
