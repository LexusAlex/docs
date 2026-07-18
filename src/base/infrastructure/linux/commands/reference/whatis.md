# whatis

**Уровень:** Средний

Показывает краткое однострочное описание команды из man-страниц.

## Синтаксис

```bash
whatis [опции] команда [команда...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-w` | Использовать подстановочные знаки (`*`, `?`) |
| `-s список` | Искать только вопределённных секциях |
| `-r` | Использовать регулярное выражение |
| `-l` | Длинный вывод (без обрезки) |
| `--regex` | Регулярное выражение |
| `--wildcard` | Подстановочные знаки |

## Примеры

### Описание команды

```bash
whatis ls
```

### Несколько команд

```bash
whatis grep find awk sed
```

### С подстановочными знаками

```bash
whatis -w "grep*"
```

### Поиск по regex

```bash
whatis -r "^copy"
```

### Ограничение секциями

```bash
whatis -s "1,8" passwd
```

### Длинный вывод

```bash
whatis -l gcc
```

### Все команды сопределённным суффиксом

```bash
whatis -w "*config"
```

### Проверка наличия описания

```bash
whatis mycommand 2>/dev/null || echo "Описание не найдено"
```

### Описание всех установленных python

```bash
whatis -w "python*"
```

### Быстрый справочник

```bash
for cmd in git docker kubectl; do whatis "$cmd"; done
```

## Практические сценарии

### Быстрое напоминание

```bash
whatis tar
```

### Проверка назначения команды

```bash
whatis systemctl
```

### Создание мини-справочника

```bash
echo "=== Основные утилиты ===" && whatis ls cp mv rm mkdir
```

### Проверка нескольких команд

```bash
for cmd in nginx mysql redis; do whatis "$cmd" 2>/dev/null; done
```

### Поиск по шаблону

```bash
whatis -w "zip*"
```

## Обновление базы

```bash
sudo mandb
```

## Дополнительные примеры

### Поиск с подстановочными знаками

```bash
whatis -w "grep*"
```

### Фильтрация по секциям man

```bash
whatis -s "1,8" passwd
# Только секции 1 (команды) и 8 (системные администратор)
```

### Поиск по регулярному выражению

```bash
whatis -r "^copy"
# Все команды, начинающиеся на "copy"
```

### Длинный вывод без обрезки

```bash
whatis -l gcc
```

### Все команды с特定суффиксом

```bash
whatis -w "*config"
```

### Проверка наличия описания

```bash
whatis mycommand 2>/dev/null || echo "Описание не найдено"
```

### Описание всех python-версий

```bash
whatis -w "python*"
```

### Быстрый справочник по командам

```bash
for cmd in git docker kubectl; do whatis "$cmd"; done
```

### Поиск команд с特定префиксом

```bash
whatis -w "net*"
```

### Проверка нескольких команд

```bash
whatis ls cp mv rm mkdir rmdir
```

## Практические сценарии

### Быстрое напоминание назначения команды

```bash
whatis tar
```

### Проверка назначения неизвестной команды

```bash
whatis systemctl
```

### Создание мини-справочника

```bash
echo "=== Файловые утилиты ===" && whatis ls cp mv rm
echo "=== Сетевые утилиты ===" && whatis ping curl wget
echo "=== Архивы ===" && whatis tar gzip bzip2
```

### Проверка установки пакета

```bash
whatis nginx mysql redis 2>/dev/null
```

### Быстрая шпаргалка

```bash
whatis find grep awk sed sort uniq
```

### Проверка команд перед скриптом

```bash
for cmd in git docker curl jq; do
  whatis "$cmd" 2>/dev/null || echo "Не установлено: $cmd"
done
```

## Связки с другими командами

### whatis + apropos — поиск по описанию

```bash
whatis ls           # Точное совпадение
apropos "list files" # Поиск по описанию
```

### whatis + man — от общего к частному

```bash
whatis tar          # Краткое описание
man tar             # Полная документация
```

### whatis + which — описание + путь

```bash
whatis python3      # Что делает
which python3       # Где находится
```

### whatis + type — описание + тип

```bash
whatis ls           # Описание из man
type ls             # Тип (алиас, функция, бинарник)
```

### whatis + info — описание + подробная документация

```bash
whatis coreutils    # Краткое описание
info coreutils      # Подробная документация
```

## См. также

- [man](man.md) — полная документация команды
- [apropos](apropos.md) — поиск команд по описанию
- [info](info.md) — документация GNU в формате Texinfo
- [tldr](tldr.md) — упрощённые man-страницы с примерами

:::tip
`whatis` идеально подходит для быстрого напоминания назначения команды. Для подробной информации используйте `man`.
:::

:::warning
Если `whatis` возвращает "nothing appropriate", обновите базу через `sudo mandb`.
:::
