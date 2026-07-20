# git-bisect

**Уровень:** Продвинутый
**Версия Git:** 1.5.0

Инструмент бинарного поиска для нахождения коммита,引入вшего баг. Позволяет быстро найти проблемный коммит в большой истории.

## Синтаксис

```bash
git bisect <subcommand> <options>
```

## Основные опции

| Подкоманда | Описание |
|------------|----------|
| `start` | Начинает сеанс bisect |
| `bad [<commit>]` | Помечает коммит как содержащий баг |
| `good [<commit>]` | Помечает коммит как рабочий |
| `skip [<commit>]]` | Пропускает коммит (нельзя протестировать) |
| `reset` | Завершает сеанс bisect и возвращает к исходному состоянию |
| `log` | Показывает журнал текущего сеанса bisect |
| `replay <logfile>` | Воспроизводит журнал bisect |
| `run <cmd>` | Автоматический bisect с использованием скрипта |
| `visualize` | Открывает визуализацию bisect |
| `view` | Показывает текущее состояние bisect |

## Примеры

1. Начало сеанса bisect:
```bash
git bisect start
```

2. Пометить текущий коммит как bad:
```bash
git bisect bad
```

3. Пометить конкретный коммит как good:
```bash
git bisect good v1.0.0
```

4. Пометить конкретный коммит как bad:
```bash
git bisect bad abc1234
```

5. Пропустить коммит, который нельзя протестировать:
```bash
git bisect skip
```

6. Завершить сеанс bisect:
```bash
git bisect reset
```

7. Показать журнал bisect:
```bash
git bisect log
```

8. Восстановить предыдущий сеанс bisect:
```bash
git bisect replay bisect.log
```

9. Автоматический bisect с простым скриптом:
```bash
git bisect run ./test.sh
```

10. Автоматический bisect с командой:
```bash
git bisect run npm test
```

11. Автоматический bisect с Python скриптом:
```bash
git bisect run python -m pytest tests/
```

12. Визуализация текущего состояния:
```bash
git bisect visualize --oneline
```

13. Просмотр текущего состояния:
```bash
git bisect view
```

14. Начало bisect с конкретного диапазона:
```bash
git bisect start HEAD v1.0.0
```

15. Начало bisect с ограничением по файлам:
```bash
git bisect start -- src/auth.js
```

16. Автоматический bisect с возвратом кода:
```bash
# Скрипт должен возвращать 0 для good, 1-124 для bad, 125 для skip
git bisect run ./bisect_test.sh
```

17. Сохранение лога bisect в файл:
```bash
git bisect log > bisect.log
```

18. Просмотр diff текущего коммита во время bisect:
```bash
git bisect visualize
```

19. Bisect с пропуском нескольких коммитов:
```bash
git bisect skip abc1234 def5678
```

20. Завершение bisect и возврат к оригинальной ветке:
```bash
git bisect reset HEAD
```

## Практические сценарии

**Поиск коммита, сломавшего тесты:**
```bash
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
git bisect run npm test
# Git автоматически найдёт проблемный коммит
git bisect reset
```

**Поиск бага в UI:**
```bash
git bisect start
git bisect bad
git bisect good v2.0.0
# Вручную проверять каждый коммит
# Если баг есть: git bisect bad
# Если бага нет: git bisect good
# Когда найден: git bisect reset
```

**Автоматический поиск с Playwright:**
```bash
git bisect start
git bisect bad HEAD
git bisect good v1.5.0
git bisect run npx playwright test tests/login.spec.js
git bisect reset
```

## Связки с другими командами

```bash
# Сохранение текущих изменений перед bisect
git stash
git bisect start
# ... работа с bisect ...
git bisect reset
git stash pop

# Просмотр diff во время bisect
git bisect visualize --patch

# Проверка теста во время bisect
git bisect run bash -c "make && make test"

# Логирование всех шагов
git bisect log > bisect_$(date +%Y%m%d).log
```

## Советы

:::tip
Создайте специальный скрипт для автоматического bisect. Он должен возвращать 0 для good, 1-124 для bad и 125 для skip.
:::

:::warning
Не забывайте завершать сеанс bisect командой `git bisect reset`, иначе вы останетесь в detached HEAD состоянии.
:::

## См. также

- [git-log](./log.md) — история коммитов
- [git-show](./show.md) — подробный просмотр коммита
- [git-reflog](./reflog.md) — журнал изменений ссылок
- [git-stash](./stash.md) — временное сохранение изменений
