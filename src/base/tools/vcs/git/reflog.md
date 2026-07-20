# git-reflog

**Уровень:** Продвинутый
**Версия Git:** 1.5.0

Показывает журнал ссылок (reference logs) — историю всех изменений HEAD и веток. Позволяет отслеживать все операции, включая те, которые не видны в `git log`, и восстанавливать "потерянные" коммиты.

## Синтаксис

```bash
git reflog [опции] [<ссылка>]
```

## Основные опции

| Опция | Описание |
|---|---|
| `--all` | Показать reflog всех ссылок |
| `--expire=<дата>` | Удалить записи старше указанной даты |
| `--expire-unreachable=<дата>` | Удалить недостижимые записи старше даты |
| `--updateref` | Обновить ссылку при expire |
| `--rewrite` | Перезаписать записи при expire |
| `-n <количество>` | Ограничить количество записей |
| `--date=<формат>` | Показать даты в указанном формате |
| `--stale-fix` | Исправить устаревшие записи |

## Примеры

1. Показать reflog HEAD:
```bash
git reflog
```

2. Показать reflog для конкретной ветки:
```bash
git reflog main
```

3. Показать reflog с датами:
```bash
git reflog --date=iso
```

4. Показать последние 10 записей:
```bash
git reflog -n 10
```

5. Показать reflog всех ссылок:
```bash
git reflog --all
```

6. Показать reflog с относительными датами:
```bash
git reflog --date=relative
```

7. Восстановить удалённую ветку:
```bash
git reflog
git branch recovered-branch HEAD@{5}
```

8. Восстановить удалённый коммит:
```bash
git reflog
git cherry-pick HEAD@{3}
```

9. Показать reflog с хешами:
```bash
git reflog show HEAD
```

10. Показать reflog для конкретного коммита:
```bash
git reflog HEAD@{2}
```

11. Показать reflog с форматом даты:
```bash
git reflog --date=format:"%Y-%m-%d %H:%M"
```

12. Показать reflog с количеством записей:
```bash
git reflog -n 20 main
```

13. Показать reflog для всех веток:
```bash
git reflog --all --date=iso
```

14. Восстановить состояние после неудачного ребейза:
```bash
git reflog
git reset --hard HEAD@{2}
```

15. Показать reflog с ограничением:
```bash
git reflog --expire=1.month.ago
```

## Практические сценарии

**Восстановление удалённой ветки:**
После случайного удаления ветки можно восстановить её через reflog.

```bash
git reflog main
# Найти коммит перед удалением
git branch main HEAD@{3}
```

**Отмена неудачного слияния:**
Возврат к состоянию до неудачного merge или rebase.

```bash
git reflog
git reset --hard HEAD@{4}
```

**Поиск потерянного коммита:**
Найти коммит, который не отображается в git log (например, после reset).

```bash
git reflog --all
git show HEAD@{7}
git cherry-pick HEAD@{7}
```

## Связки с другими командами

```bash
# Восстановление ветки
git reflog main && git branch main HEAD@{5}

# Проверка перед восстановлением
git reflog && git show HEAD@{3}

# Восстановление с созданием новой ветки
git reflog && git checkout -b recovery HEAD@{2}

# Очистка старых записей
git reflog expire --expire=now --all && git gc --prune=now
```

## Советы

:::tip
Reflog хранится локально и не синхронизируется с удалённым репозиторием. Используйте его как последнее средство восстановления.
:::

:::warning
Записи reflog имеют срок действия (по умолчанию 90 дней). Регулярно выполняйте бэкап важных коммитов.
:::

## См. также

- [git-log](/base/tools/vcs/git/log) — просмотр истории
- [git-reset](/base/tools/vcs/git/reset) — сброс состояния
- [git-checkout](/base/tools/vcs/git/checkout) — переключение
- [git-cherry-pick](/base/tools/vcs/git/cherry-pick) — применение коммитов
- [git-gc](/base/tools/vcs/git/gc) — сборка мусора
