# git-rm

**Уровень:** Начинающий
**Версия Git:** 0.99

Удаляет файлы из рабочего дерева и индекса Git. Может также использоваться для удаления файлов только из индекса (с сохранением в рабочем дереве).

## Синтаксис

```bash
git rm [опции] [--] <файл>...
```

## Основные опции

| Опция | Описание |
|---|---|
| `--cached` | Удалить только из индекса (оставить в рабочем дереве) |
| `-f` | Принудительное удаление |
| `-r` | Рекурсивное удаление каталогов |
| `-n` | Сухой запуск (показать без выполнения) |
| `--dry-run` | Сухой запуск (синоним -n) |
| `--ignore-unmatch` | Не возвращать ошибку, если файл не найден |
| `-q` | Тихий режим (без вывода) |

## Примеры

1. Удаление файла из индекса и рабочего дерева:
```bash
git rm file.txt
```

2. Удаление файла только из индекса (сохранить локально):
```bash
git rm --cached file.txt
```

3. Удаление каталога рекурсивно:
```bash
git rm -r src/old_module/
```

4. Удаление нескольких файлов:
```bash
git rm file1.txt file2.txt file3.txt
```

5. Сухой запуск удаления:
```bash
git rm -n file.txt
```

6. Принудительное удаление (для отслеживаемых, но изменённых файлов):
```bash
git rm -f modified_file.txt
```

7. Удаление файла с подстановкой:
```bash
git rm *.log
```

8. Удаление файла из индекса (для .gitignore):
```bash
git rm --cached .env
```

9. Удаление с игнорированием отсутствия файла:
```bash
git rm --ignore-unmatch optional_file.txt
```

10. Тихое удаление:
```bash
git rm -q temp_file.txt
```

11. Удаление файла с пробелами в имени:
```bash
git rm "my file.txt"
```

12. Удаление из подкаталога:
```bash
git rm src/components/OldComponent.vue
```

13. Удаление всех файлов из каталога (сохранить каталог):
```bash
git rm -r --cached logs/*
```

14. Удаление с подробным выводом:
```bash
git rm -v temp.txt
```

15. Удаление файла, добавленного в индекс, но не закоммиченного:
```bash
git rm --cached new_file.txt
```

## Практические сценарии

**Удаление секретов из репозитория:**
Удаление файлов с конфиденциальными данными из отслеживания, но сохранение локально.

```bash
git rm --cached .env
git rm --cached config/secrets.json
echo ".env" >> .gitignore
echo "config/secrets.json" >> .gitignore
git commit -m "chore: удаление секретов из отслеживания"
```

**Очистка артефактов сборки:**
Удаление сгенерированных файлов из репозитория.

```bash
git rm -r dist/
git rm -r build/
git rm *.pyc
git commit -m "chore: удаление артефактов сборки"
```

**Рефакторинг структуры проекта:**
Удаление устаревших модулей при реструктуризации.

```bash
git rm -r src/deprecated/
git rm src/old_helper.py
git commit -m "refactor: удаление устаревших модулей"
```

## Связки с другими командами

```bash
# Удаление и обновление .gitignore
git rm --cached file.txt && echo "file.txt" >> .gitignore && git add .gitignore

# Удаление с проверкой статуса
git rm file.txt && git status

# Удаление и коммит
git rm old_file.txt && git commit -m "remove: удаление old_file.txt"

# Массовое удаление с подтверждением
git rm -n *.tmp && read -p "Продолжить? (y/n) " && git rm *.tmp
```

## Советы

:::tip
Используйте `git rm --cached` для удаления файлов из отслеживания Git без их физического удаления с диска — полезно для добавления файлов в `.gitignore`.
:::

:::warning
Команда `git rm` удаляет файлы физически. Если вы хотите сохранить файлы локально, используйте `--cached`.
:::

## См. также

- [git-mv](/base/tools/vcs/git/mv) — перемещение файлов
- [git-add](/base/tools/vcs/git/add) — добавление файлов
- [git-clean](/base/tools/vcs/git/clean) — удаление неотслеживаемых файлов
- [gitignore](/base/tools/vcs/git/gitignore) — игнорирование файлов
- [git-status](/base/tools/vcs/git/status) — состояние репозитория
