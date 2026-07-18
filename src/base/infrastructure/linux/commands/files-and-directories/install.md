# install

**Уровень:** Средний

Копирует файлы и задаёт атрибуты (права, владельца, группу). Часто используется в скриптах установки и Makefile.

## Синтаксис

```bash
install [опции] источник назначение
install [опции] источник... каталог
install -d каталог...
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-d` | Создать все компоненты каталога (как `mkdir -p`) |
| `-m режим` | Задать права доступа (chmod-формат) |
| `-o владелец` | Задать владельца (только root) |
| `-g группа` | Задать группу (только root) |
| `-s` | Удалить отладочную информацию (strip) |
| `-v` | Подробный вывод |
| `-b`, `--backup` | Создать резервную копию перед перезаписью |
| `-D` | Создать все родительские каталоги назначения |
| `-t каталог` | Задать целевой каталог |
| `--compare` | Не копировать, если назначение идентично |
| `-p` | Сохранить timestamps источника |
| `-c` | Устаревшая опция, игнорируется |
| `--preserve-context` | Сохранить контекст безопасности SELinux |
| `--target-directory=каталог` | То же, что `-t` |

## Примеры

### 1. Копирование файла с правами

```bash
install -m 755 script.sh /usr/local/bin/script
# Копирует и устанавливает права rwxr-xr-x
```

### 2. Создание каталога

```bash
install -d /opt/myapp/logs
# Аналог mkdir -p
```

### 3. Создание каталога с правами

```bash
install -d -m 755 /var/log/myapp
install -d -m 700 /etc/myapp/secrets
```

### 4. Установка с владельцем и группой

```bash
sudo install -o www-data -g www-data -m 644 index.html /var/www/html/
```

### 5. Stripование бинарника

```bash
install -s -m 755 myprogram /usr/local/bin/
# Удаляет отладочную информацию, уменьшая размер
```

### 6. Сохранение timestamps

```bash
install -p -m 644 config.conf /etc/myapp/config.conf
# Сохраняет время модификации источника
```

### 7. Подробный вывод

```bash
install -v -m 755 script.sh /usr/local/bin/
# 'script.sh' -> '/usr/local/bin/script.sh'
```

### 8. Копирование с резервной копией

```bash
install -b -m 644 new.conf /etc/myapp.conf
# Создаёт /etc/myapp.conf~ перед перезаписью
```

### 9. Создание всех родительских каталогов

```bash
install -D -m 755 script.sh /opt/myapp/bin/script.sh
# Создаёт /opt/myapp/bin/ если не существует
```

### 10. Установка нескольких файлов

```bash
install -m 644 *.conf /etc/myapp/
install -m 755 bin/* /usr/local/bin/
```

### 11. Установка в целевой каталог

```bash
install -t /usr/local/bin -m 755 script.sh
```

### 12. Сравнение перед копированием

```bash
install --compare -m 644 file.conf /etc/file.conf
# Копирует только если содержимое отличается
```

### 13. Установка с полными атрибутами

```bash
sudo install -o root -g root -m 700 -s program /usr/local/bin/
# Владелец root, группа root, права 700, stripован
```

### 14. Создание структуры и установка

```bash
install -d -m 755 /opt/myapp/{bin,lib,etc,log}
install -m 755 app.sh /opt/myapp/bin/
install -m 644 config.conf /opt/myapp/etc/
```

### 15. Установка в Makefile

```makefile
install:
    install -d $(DESTDIR)/usr/local/bin
    install -m 755 myapp $(DESTDIR)/usr/local/bin/
    install -d $(DESTDIR)/etc/myapp
    install -m 644 config.ini $(DESTDIR)/etc/myapp/
```

## `install` vs `cp` + `chmod`

```bash
# Без install (3 команды):
cp script.sh /usr/local/bin/
chmod 755 /usr/local/bin/script.sh
chown root:root /usr/local/bin/script.sh

# С install (1 команда):
sudo install -o root -g root -m 755 script.sh /usr/local/bin/
```

## Практические сценарии

### Установка скрипта в PATH

```bash
install -m 755 myscript.sh ~/.local/bin/myscript
```

### Развертывание конфига

```bash
sudo install -o root -g myapp -m 640 config.conf /etc/myapp/
```

### Установка systemd-сервиса

```bash
sudo install -m 644 myapp.service /etc/systemd/system/
sudo systemctl daemon-reload
```

### Создание структуры приложения

```bash
sudo install -d -m 755 /opt/myapp
sudo install -d -m 755 /opt/myapp/{bin,etc,lib,log}
sudo install -m 755 myapp /opt/myapp/bin/
sudo install -m 644 config.ini /opt/myapp/etc/
```

## Советы

:::tip
Используйте `install` в Makefile и скриптах установки вместо комбинации `cp + chmod + chown` — это одна команда вместо трёх.
:::

:::warning
`install` перезаписывает файлы без предупреждения. Добавьте `-b` для создания резервных копий или `--compare` для пропуска неизменённых файлов.
:::

:::tip
Опция `-s` (strip) значительно уменьшает размер бинарных файлов, удаляя отладочную информацию. Используйте при установке релизных сборок.
:::

:::warning
`install -o` и `-g` требуют root-привилегий. Для установки в пользовательские каталоги используйте только `-m`.
:::

## См. также

- [cp](cp.md) — копирование файлов
- [chmod](../permissions/chmod.md) — изменение прав
- [chown](../permissions/chown.md) — изменение владельца
