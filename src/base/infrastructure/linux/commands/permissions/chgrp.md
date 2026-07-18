# chgrp

**Уровень:** Средний

Изменение группы файлов и каталогов.

## Синтаксис

```bash
chgrp [опции] группа файл...
```

## Опции

| Опция | Описание |
|-------|----------|
| `-R` | Рекурсивно |
| `-v` | Подробный вывод |
| `-c` | Показать только изменения |
| `--reference=файл` | Использовать группу другого файла |
| `--preserve-root` | Не рекурсивно для / |
| `--from=текущая_группа` | Изменить только если совпадает |
| `--help` | Помощь |
| `--version` | Версия |

## Примеры

### Изменить группу файла

```bash
chgrp developers file.txt
```

### Рекурсивно

```bash
chgrp -R developers /var/www/html
```

### Подробный вывод

```bash
chgrp -v developers file.txt
```

### Только изменения

```bash
chgrp -c developers file.txt
```

### По образцу

```bash
chgrp --reference=file1.txt file2.txt
```

### Изменить если совпадает

```bash
chgrp --from=www-data developers file.txt
```

### Изменить несколько файлов

```bash
chgrp developers file1.txt file2.txt file3.txt
```

### Изменить группу каталога

```bash
chgrp developers /project
```

### Рекурсивно с подробным выводом

```bash
chgrp -Rv developers /project
```

### Проверка после изменения

```bash
ls -l file.txt
```

### Изменить все файлы в каталоге

```bash
chgrp developers /project/*
```

### Скрытые файлы

```bash
chgrp developers /project/.*
```

### Изменить группу для всех файлов типа

```bash
find /project -name "*.py" -exec chgrp developers {} \;
```

## Практические сценарии

### Настройка общего каталога

```bash
# Создать каталог
mkdir /shared

# Создать группу
groupadd developers

# Изменить группу
chgrp developers /shared

# Установить SGID
chmod g+s /shared
```

### Пакетное изменение

```bash
find /project -type f -exec chgrp developers {} \;
find /project -type d -exec chgrp developers {} \;
```

### Безопасное изменение

```bash
# Проверить текущую группу
ls -l file.txt

# Изменить
chgrp developers file.txt

# Проверить
ls -l file.txt
```

:::tip
Используйте `chgrp` вместо `chown :group`, когда нужно изменить только группу, не трогая владельца.
:::

:::warning
Для изменения группы файлов пользователь должен быть владельцем файла или иметь права root.
:::

### Разница между chgrp и chown :group

```bash
# Эти команды эквивалентны
chgrp developers file.txt
chown :developers file.txt

# Но chown может изменить и владельца
chown alex:developers file.txt
```

### Проверка членства в группе

```bash
# Перед изменением группы проверьте, что пользователи в ней
getent group developers
```

## См. также

- [chown](chown.md) — изменение владельца и группы
- [chmod](chmod.md) — изменение прав
- [groupadd](groupadd.md) — создание группы
- [ls -l](ls -l.md) — просмотр группы
