# git-blame

**Уровень:** Средний
**Версия Git:** 1.5.0

Показывает авторство каждой строки файла. Позволяет узнать, кто и когда изменил каждую строку.

## Синтаксис

```bash
git blame [<options>] [<rev-options>] [--] <file>
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-L <start>,<end>` | Ограничивает вывод строками от start до end |
| `-L :<funcname>` | Показывает только функцию |
| `-e` | Показывает email вместо имени автора |
| `-w` | Игнорирует изменения пробелов |
| `-M` | Обнаруживает перемещённые строки в пределах файла |
| `-C` | Обнаруживает строки, перемещённые из других файлов |
| `--since=<date>` | Показывает только строки, изменённые после даты |
| `--show-email` | Показывает email автора |
| `--score-debug` | Показывает отладочную информацию оценки |
| `--line-porcelain` | Вывод в машиночитаемом формате |
| `-s` | Подавляет имя автора и дату |

## Примеры

1. Базовый blame файла:
```bash
git blame src/app.js
```

2. Blame конкретного диапазона строк:
```bash
git blame -L 10,20 src/app.js
```

3. Blame конкретной функции:
```bash
git blame -L :myFunction src/app.js
```

4. Показать email авторов:
```bash
git blame -e src/app.js
```

5. Игнорировать изменения пробелов:
```bash
git blame -w src/app.js
```

6. Обнаружить перемещённые строки в файле:
```bash
git blame -M src/app.js
```

7. Обнаружить строки из других файлов:
```bash
git blame -C src/app.js
```

8. Blame строк, изменённых после даты:
```bash
git blame --since="2024-01-01" src/app.js
```

9. Показать email в выводе:
```bash
git blame --show-email src/app.js
```

10. Вывод в машиночитаемом формате:
```bash
git blame --line-porcelain src/app.js
```

11. Blame без имени автора:
```bash
git blame -s src/app.js
```

12. Blame файла на определённом коммите:
```bash
git blame abc1234 -- src/app.js
```

13. Blame с диапазоном строк и игнорированием пробелов:
```bash
git blame -L 50,100 -w src/app.js
```

14. Blame с обнаружением всех перемещений:
```bash
git blame -M -C src/app.js
```

15. Blame конкретной ветки:
```bash
git blame main -- src/app.js
```

16. Blame с пользовательским форматом:
```bash
git blame --format="%h %an %s" src/app.js
```

17. Blame с отладочной информацией:
```bash
git blame --score-debug src/app.js
```

18. Blame строки из функции с email:
```bash
git blame -L :processData -e src/app.js
```

19. Blame с подавлением заголовков:
```bash
git blame --porcelain src/app.js
```

20. Blame файла на теге:
```bash
git blame v1.0.0 -- src/app.js
```

## Практические сценарии

**Поиск автора бага:**
```bash
# Найти, кто изменил строку с багом
git blame -L 42,42 src/auth.js
# Посмотреть контекст изменения
git show abc1234
```

**Код-ревью:**
```bash
# Проверить историю изменений функции
git blame -L :loginUser src/auth.js
```

**Восстановление старого кода:**
```bash
# Найти, когда функция была изменена
git blame -M src/utils.js
# Получить старую версию
git show abc1234:src/utils.js
```

## Связки с другими командами

```bash
# Просмотр blame с пагинацией
git blame src/app.js | less

# Найти автора строки и посмотреть его коммиты
git blame -L 42,42 src/app.js | head -1 | awk '{print $1}' | xargs git show

# Экспорт blame в файл
git blame src/app.js > blame_output.txt

# Поиск последнего изменения файла
git log -1 --format="%H" -- src/app.js | xargs git show --stat
```

## Советы

:::tip
Используйте `-w` для игнорирования форматирования при поиске автора логических изменений.
:::

:::warning
`git blame` показывает автора последнего изменения каждой строки. Если строка была перемещена, используйте `-M` и `-C` для поиска оригинального автора.
:::

## См. также

- [git-log](./log.md) — история коммитов
- [git-show](./show.md) — подробный просмотр коммита
- [git-diff](./diff.md) — сравнение изменений
- [git-annotate](./annotate.md) — аналог blame для SVN
