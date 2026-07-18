# whereis

**Уровень:** Средний

Показывает расположение бинарных файлов, страниц man и исходников команды.

## Синтаксис

```bash
whereis [опции] команда [команда...]
```

## Опции

| Опция | Описание |
|-------|----------|
| `-b` | Искать только бинарные файлы |
| `-m` | Искать только страницы man |
| `-s` | Искать только исходники |
| `-u` | Искать необычные записи (отсутствующие в некоторых категориях) |
| `-B директория` | Ограничить поиск бинарников |
| `-M директория` | Ограничить поиск man-страниц |
| `-S директория` | Ограничить поиск исходников |
| `-f` | Определяет завершение списка директорий (используется с `-B`, `-M`, `-S`) |

## Примеры

### Все расположения команды

```bash
whereis nginx
```

### Только бинарник

```bash
whereis -b python3
```

### Только man-страницы

```bash
whereis -m ls
```

### Только исходники

```bash
whereis -s gcc
```

### Несколько команд

```bash
whereis git curl wget
```

### Поиск необычных записей

```bash
whereis -u nginx
```

### Ограниченный поиск бинарников

```bash
whereis -B /usr/bin -f python3
```

### Ограниченный поиск man

```bash
whereis -M /usr/share/man/man1 -f ls
```

### Поиск всех компонентов

```bash
whereis -b -m -s gcc
```

### Проверка наличия man-страницы

```bash
whereis -m mycommand | grep -q man && echo "Есть man"
```

## Практические сценарии

### Полная информация о команде

```bash
echo "=== whereis ===" && whereis git
echo "=== which ===" && which git
echo "=== type ===" && type git
```

### Поиск исходников для отладки

```bash
whereis -s glibc
```

### Проверка установки с исходниками

```bash
whereis -u nginx
```

### Поиск всех связанных файлов

```bash
whereis -b -m -s python3
```

### Очистка от ненужных man-страниц

```bash
whereis -m -u "*"
```

## Дополнительные примеры

### Поиск бинарника в特定директории

```bash
whereis -B /usr/local/bin -f python3
```

### Поиск man-страниц в特定секции

```bash
whereis -M /usr/share/man/man1 -f ls
```

### Поиск исходников в特定каталоге

```bash
whereis -S /usr/src -f glibc
```

### Все компоненты нескольких команд

```bash
whereis -b -m -s gcc g++ make
```

### Проверка наличия man-страницы

```bash
whereis -m mycommand | grep -q man && echo "Есть man" || echo "Нет man"
```

### Поиск команд без исходников

```bash
whereis -s -u "*"
```

## Сравнение: whereis vs which vs locate vs find

| Инструмент | Ищет | База данных | Скорость | Полнота |
|------------|------|-------------|----------|---------|
| `whereis` | Бинарники, man, исходники | Нет | Быстро | Только стандартные пути |
| `which` | Бинарники в PATH | Нет | Быстро | Только PATH |
| `locate` | Любые файлы | Да (`updatedb`) | Очень быстро | Вся файловая система |
| `find` | Любые файлы | Нет | Медленно | Полный контроль |

## Практические сценарии

### Поиск исходников для отладки

```bash
whereis -s glibc
# Найти исходники glibc
```

### Проверка полной установки пакета

```bash
whereis -b -m -s nginx
# Проверить наличие бинарника, man и исходников
```

### Поиск всех компонентов python

```bash
whereis -b -m -s python python3 python3.11
```

### Отладка установки из исходников

```bash
whereis -s myapp
# Проверить, установлены ли исходники
```

### Проверка доступности man-страниц

```bash
for cmd in git docker kubectl; do
  whereis -m "$cmd"
done
```

### Поиск пропавших man-страниц

```bash
whereis -m -u "*"
# Найти команды без man-страниц
```

## Связки с другими командами

### whereis + which — полная картина

```bash
echo "Бинарник: $(which git)"
echo "Все файлы: $(whereis git)"
```

### whereis + type — проверка типа команды

```bash
type -a python3
whereis -b python3
```

### whereis + find — расширенный поиск

```bash
# Сначала быстрый поиск
whereis -b myapp

# Если не найдено — глубокий поиск
find / -name "myapp" -type f 2>/dev/null
```

### whereis + locate — поиск по базе

```bash
# whereis для стандартных путей
whereis -b nginx

# locate для полного поиска
locate nginx | grep bin
```

### whereis + dpkg — проверка пакета

```bash
dpkg -S $(whereis -b nginx | awk '{print $2}')
```

## См. также

- [which](which.md) — поиск бинарника в PATH
- [type](type.md) — определение типа команды
- [find](find.md) — поиск файлов по критериям

:::tip
`whereis` использует фиксированные пути поиска, а не `PATH`. Он может найти файлы, которые `which` не видит, и наоборот.
:::

:::warning
`whereis` может не найти программы, установленные в нестандартные директории (например, через `pip install --user` или в `/opt`).
:::
