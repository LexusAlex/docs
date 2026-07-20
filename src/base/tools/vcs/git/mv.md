# git-mv

**Уровень:** Начинающий
**Версия Git:** 0.99

Перемещает или переименовывает файлы, обновляя индекс Git. Эквивалентно выполнению `mv`, `git add` и `git rm` для переименованных файлов.

## Синтаксис

```bash
git mv [опции] <источник> <назначение>
git mv [опции] <источник>... <каталог>
```

## Основные опции

| Опция | Описание |
|---|---|
| `-f` | Принудительное перемещение (перезаписать существующие файлы) |
| `-k` | Пропустить ошибки при перемещении |
| `-n` | Показать, что было бы сделано (сухой запуск) |
| `-v` | Подробный вывод |

## Примеры

1. Переименование файла:
```bash
git mv old_name.txt new_name.txt
```

2. Перемещение файла в каталог:
```bash
git mv file.txt src/
```

3. Перемещение файла в каталог с новым именем:
```bash
git mv file.txt src/new_name.txt
```

4. Переименование с подробным выводом:
```bash
git mv -v old.txt new.txt
```

5. Сухой запуск (показать без выполнения):
```bash
git mv -n old.txt new.txt
```

6. Принудительное перемещение (перезаписать существующий):
```bash
git mv -f source.txt existing.txt
```

7. Перемещение нескольких файлов в каталог:
```bash
git mv file1.txt file2.txt file3.txt backup/
```

8. Переименование с использованием подстановки:
```bash
git mv *.md docs/
```

9. Перемещение каталога:
```bash
git mv old_dir/ new_dir/
```

10. Перемещение с игнорированием ошибок:
```bash
git mv -k *.txt archive/
```

11. Переименование файла в подкаталоге:
```bash
git mv src/app.js src/application.js
```

12. Перемещение файла из подкаталога в корень:
```bash
git mv src/config.json .
```

13. Переименование с отменой изменений:
```bash
git mv new_name.txt old_name.txt
```

14. Перемещение файлов с пробелами в именах:
```bash
git mv "my file.txt" "new file.txt"
```

15. Перемещение с сохранением истории:
```bash
git mv --follow old_path.txt new_path.txt
```

## Практические сценарии

**Реорганизация структуры проекта:**
Перемещение файлов в новые каталоги при реструктуризации кодовой базы.

```bash
git mv src/components/Header.vue src/components/layout/
git mv src/components/Footer.vue src/components/layout/
git mv src/components/Sidebar.vue src/components/layout/
```

**Переименование модуля:**
Изменение имени модуля или компонента с сохранением истории изменений.

```bash
git mv src/utils/helper.js src/utils/validator.js
git mv src/utils/helper.test.js src/utils/validator.test.js
```

**Архивация старых файлов:**
Перемещение устаревших файлов в архивный каталог.

```bash
mkdir -p archive
git mv old_module.py archive/
git mv deprecated_script.sh archive/
```

## Связки с другими командами

```bash
# Перемещение и коммит в одной операции
git mv file.txt new_location/ && git commit -m "refactor: перемещение file.txt"

# Проверка перед перемещением
git status && git mv -n old.txt new.txt

# Перемещение с обновлением ссылок
git mv config.example.js config.js && git add -u && git commit -m "rename config"

# Массовое перемещение с коммитом
git mv src/*.js dist/ && git commit -m "build: перемещение скриптов в dist"
```

## Советы

:::tip
Используйте `git mv` вместо обычной команды `mv` — это автоматически обновит индекс Git и сохранит историю переименований.
:::

:::warning
При перемещении файлов с помощью `git mv` убедитесь, что целевой каталог существует, иначе операция завершится ошибкой.
:::

## См. также

- [git-rm](/base/tools/vcs/git/rm) — удаление файлов
- [git-add](/base/tools/vcs/git/add) — добавление файлов в индекс
- [git-status](/base/tools/vcs/git/status) — состояние репозитория
- [git-commit](/base/tools/vcs/git/commit) — создание коммитов
- [git-clean](/base/tools/vcs/git/clean) — удаление неотслеживаемых файлов
