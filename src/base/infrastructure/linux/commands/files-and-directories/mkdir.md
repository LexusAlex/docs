# mkdir

Создаёт новые каталоги. Базовая утилита для создания структуры директорий в файловой системе.

## Синтаксис

```bash
mkdir [опции] каталог...
mkdir -p путь/к/каталогу
mkdir -m 755 каталог
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-p` | Создать родительские каталоги, если они не существуют |
| `-m режим` | Задать права доступа (chmod-формат) |
| `-v` | Подробный вывод — показывать каждый созданный каталог |
| `--context=CTX` | Задать контекст безопасности SELinux |
| `--parents` | То же, что `-p` |
| `--mode=MODE` | То же, что `-m` |
| `--verbose` | То же, что `-v` |

## Примеры

### 1. Создание простого каталога

```bash
mkdir mydir
ls -ld mydir
# drwxr-xr-x 2 alex alex 4096 Jan 15 10:30 mydir
```

### 2. Создание нескольких каталогов

```bash
mkdir dir1 dir2 dir3
```

### 3. Создание вложенных каталогов

```bash
mkdir -p parent/child/grandchild
# Создаёт всю иерархию: parent, child, grandchild
```

### 4. Создание с правами доступа

```bash
mkdir -m 700 private_dir
ls -ld private_dir
# drwx------ 2 alex alex 4096 Jan 15 10:30 private_dir
```

### 5. Подробный вывод

```bash
mkdir -v new_dir
# mkdir: created directory 'new_dir'
```

### 6. Подробный вывод с -p

```bash
mkdir -vp a/b/c/d
# mkdir: created directory 'a'
# mkdir: created directory 'a/b'
# mkdir: created directory 'a/b/c'
# mkdir: created directory 'a/b/c/d'
```

### 7. Создание с помощью brace expansion

```bash
mkdir project/{src,tests,docs,build}
mkdir -p project/src/{main,test}/{java,resources}
```

### 8. Создание с правами 755

```bash
mkdir -m 755 public_dir
# rwxr-xr-x
```

### 9. Создание с правами 750

```bash
mkdir -m 750 shared_dir
# rwxr-x---
```

### 10. Создание с именем, начинающимся с `-`

```bash
mkdir -- -dirname
mkdir ./-dirname
```

### 11. Проверка существования каталога

```bash
mkdir -p /tmp/mydir
# Не выдаст ошибку, если каталог уже существует
```

### 12. Создание каталога для временных файлов

```bash
tmpdir=$(mktemp -d)
echo "Временный каталог: $tmpdir"
```

### 13. Создание с произвольными правами

```bash
mkdir -m a+rwx world_writable
# drwxrwxrwx (не рекомендуется!)
```

### 14. Создание структуры для веб-проекта

```bash
mkdir -p /var/www/mysite/{public/{css,js,images},logs,config}
```

### 15. Создание с рекурсией и отчётом

```bash
mkdir -vp ~/projects/newapp/{src,bin,lib,doc}
# mkdir: created directory '/home/alex/projects/newapp'
# mkdir: created directory '/home/alex/projects/newapp/src'
# mkdir: created directory '/home/alex/projects/newapp/bin'
# mkdir: created directory '/home/alex/projects/newapp/lib'
# mkdir: created directory '/home/alex/projects/newapp/doc'
```

## Практические сценарии

### Создание структуры проекта

```bash
mkdir -p myproject/{src,include,lib,bin,doc,tests}
mkdir -p myproject/src/{module1,module2}
mkdir -p myproject/tests/{unit,integration}
tree myproject/
```

### Создание каталога для логов

```bash
sudo mkdir -p /var/log/myapp
sudo chown myappuser:myappgroup /var/log/myapp
sudo chmod 750 /var/log/myapp
```

### Резервное копирование с датой

```bash
backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"
echo "Создан каталог: $backup_dir"
```

### Временная рабочая область

```bash
workdir=$(mktemp -d -t workdir_XXXXXX)
echo "Рабочий каталог: $workdir"
# ... выполнение задач ...
rm -rf "$workdir"
```

## Советы

:::tip
Всегда используйте `-p` при создании каталогов в скриптах — это предотвращает ошибки при попытке создать уже существующий каталог.
:::

:::warning
`mkdir parent/child` завершится ошибкой, если `parent` не существует. Используйте `mkdir -p parent/child` для создания всей иерархии.
:::

:::tip
Для создания каталога и перехода в него добавьте в `.bashrc`:
```bash
mkcd() { mkdir -p "$1" && cd "$1"; }
```
:::

:::warning
Избегайте `mkdir -m 777` — это делает каталог доступным для записи всем пользователям. Используйте `755` для обычных каталогов и `700` для приватных.
:::
