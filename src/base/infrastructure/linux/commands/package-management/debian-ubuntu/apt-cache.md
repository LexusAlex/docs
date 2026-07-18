# apt-cache

**Уровень:** Средний

Утилита для запроса информации о пакетах из кеша APT. Не требует прав root.

## Синтаксис

```bash
apt-cache [опции] команда [пакеты]
```

## Команды

| Команда | Описание |
|---------|----------|
| `search запрос` | Поиск пакетов по описанию |
| `show пакет` | Подробная информация |
| `depends пакет` | Зависимости пакета |
| `rdepends пакет` | Обратные зависимости |
| `policy пакет` | Политика и доступные версии |
| `stats` | Статистика кеша |
| `madison пакет` | Таблица доступных версий |
| `pkgnames [префикс]` | Список всех пакетов |

## Опции

| Опция | Описание |
|-------|----------|
| `-n` | Искать только по имени |
| `--full` | Полный вывод |
| `--recurse` | Рекурсивно |

## Примеры

### Поиск пакета

```bash
apt-cache search nginx
```

### Поиск только по имени

```bash
apt-cache search --names-only "python3"
```

### Информация о пакете

```bash
apt-cache show nginx
```

### Зависимости пакета

```bash
apt-cache depends nginx
```

### Обратные зависимости

```bash
apt-cache rdepends libssl3
```

### Политика пакета

```bash
apt-cache policy nginx
```

### Доступные версии

```bash
apt-cache madison nginx
```

### Статистика кеша

```bash
apt-cache stats
```

### Список всех пакетов

```bash
apt-cache pkgnames | wc -l
```

### Проверка установки

```bash
apt-cache policy nginx | grep "Installed"
```

## Практические сценарии

### Проверка перед установкой

```bash
apt-cache show nginx | grep -E "Version|Size|Depends"
```

### Поиск альтернатив

```bash
apt-cache search "database server"
```

### Анализ зависимостей

```bash
apt-cache depends --recurse --no-suggests nginx
```

### Создание списка для установки

```bash
apt-cache search --names-only "nginx" | awk '{print $1}' > packages.txt
```

### Проверка рекомендаций

```bash
apt-cache depends nginx | grep -E "Recommends|Suggests"
```

:::tip
`apt-cache` не требует прав root. Обновите кеш через `sudo apt update` перед использованием.
:::

:::warning
Результаты `apt-cache` отражают состояние кеша. Если вы не обновляли кеш, результаты могут быть устаревшими.
:::

## См. также

- [apt](apt.md) — высокоуровневый apt
- [apt-get](apt-get.md) — низкоуровневый apt

