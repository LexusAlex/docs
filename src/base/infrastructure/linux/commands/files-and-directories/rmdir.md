# rmdir

**Уровень:** Начинающий

Удаляет только пустые каталоги. Безопасная альтернатива `rm -r` для удаления директорий без содержимого.

## Синтаксис

```bash
rmdir [опции] каталог...
rmdir каталог1 каталог2 каталог3
rmdir -p путь/к/каталогу
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-p` | Удалить каталог и все пустые родительские каталоги в пути |
| `--ignore-fail-on-non-empty` | Игнорировать ошибки при удалении непустых каталогов |
| `-v` | Подробный вывод |

## Примеры

### 1. Удаление пустого каталога

```bash
mkdir empty_dir
rmdir empty_dir
```

### 2. Удаление нескольких каталогов

```bash
rmdir dir1 dir2 dir3
```

### 3. Удаление с родительскими каталогами

```bash
mkdir -p parent/child/grandchild
rmdir -p parent/child/grandchild
# Удалит grandchild, затем child, затем parent
```

### 4. Подробный вывод

```bash
rmdir -v empty_dir
# rmdir: removing directory, 'empty_dir'
```

### 5. Попытка удалить непустой каталог

```bash
mkdir not_empty
touch not_empty/file.txt
rmdir not_empty
# rmdir: failed to remove 'not_empty': Directory not empty
```

### 6. Игнорирование ошибок непустых каталогов

```bash
rmdir --ignore-fail-on-non-empty dir1 dir2 dir3
# Не покажет ошибку для непустых каталогов
```

### 7. Удаление вложенной пустой структуры

```bash
mkdir -p a/b/c/d
rmdir -p a/b/c/d
# Удалит всю цепочку: d, c, b, a
```

### 8. Проверка перед удалением

```bash
if rmdir mydir 2>/dev/null; then
    echo "Каталог удалён"
else
    echo "Каталог не пуст или не существует"
fi
```

### 9. Удаление с подтверждением

```bash
for dir in old_dir_*; do
    if [[ -d "$dir" ]]; then
        read -p "Удалить $dir? (y/n) " confirm
        [[ "$confirm" == "y" ]] && rmdir "$dir"
    fi
done
```

### 10. Удаление пустых подкаталогов

```bash
# Найти и удалить все пустые каталоги
find /path -type d -empty -delete
# Или с помощью rmdir:
find /path -type d -empty -exec rmdir {} +
```

### 11. Удаление с verbose

```bash
rmdir -vp parent/child/grandchild
# rmdir: removing directory, 'grandchild'
# rmdir: removing directory, 'child'
# rmdir: removing directory, 'parent'
```

### 12. Безопасное удаление иерархии

```bash
# Проверить, что каталоги пусты перед удалением
for d in project/{build,dist,tmp}; do
    if [[ -d "$d" ]] && [[ -z "$(ls -A "$d")" ]]; then
        rmdir "$d"
    fi
done
```

## Сравнение с `rm -r`

| Аспект | `rmdir` | `rm -r` |
|--------|---------|---------|
| Безопасность | Только пустые каталоги | Удаляет всё |
| Случайное удаление | Маловероятно | Возможно |
| Рекурсивность | Только с `-p` (пустые) | Полная |
| Использование | Очистка структуры | Удаление содержимого |

## Практические сценарии

### Очистка пустых каталогов после сборки

```bash
rmdir -p build/temp/obj 2>/dev/null
# Удалит пустые каталоги сборки
```

### Удаление структуры после миграции

```bash
rmdir -p old_project/src/main/java/com/example
# Удалит всю пустую иерархию
```

### Проверка и удаление

```bash
# Удалить каталог только если он пуст
[[ -z "$(ls -A mydir)" ]] && rmdir mydir || echo "Каталог не пуст"
```

### Очистка после тестов

```bash
rmdir test_output/{unit,integration,e2e} 2>/dev/null
# Удалить пустые каталоги, не показывая ошибки
```

## Советы

:::tip
Используйте `rmdir` вместо `rm -r` когда нужно удалить только структуру каталогов — это безопаснее, так как не удалит файлы.
:::

:::warning
`rmdir` не удалит каталог, если в нём есть файлы, даже скрытые. Проверьте `ls -la` перед удалением.
:::

:::tip
`rmdir -p` удобен для удаления временных структур каталогов, созданных с `mkdir -p`.
:::

:::warning
`rmdir` не удаляет файлы — если каталог содержит файлы, используйте `rm -r` с осторожностью.
:::

## См. также

- [rm](rm.md) — удаление файлов
- [mkdir](mkdir.md) — создание директорий

