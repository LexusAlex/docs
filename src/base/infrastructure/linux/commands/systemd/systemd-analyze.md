# systemd-analyze

Анализ производительности и конфигурации systemd.

## Синтаксис

```bash
systemd-analyze [OPTIONS] [COMMAND]
```

## Команды

| Команда | Описание |
|---------|----------|
| `time` | Время загрузки системы |
| `blame` | Юниты, отсортированные по времени загрузки |
| `critical-chain [UNIT]` | Критическая цепочка зависимостей |
| `plot [> file.svg]` | SVG диаграмма загрузки |
| `dot [PATTERN]` | Граф зависимостей в формате dot |
| `verify FILES...` | Проверка файлов юнитов |
| `security [UNIT]` | Оценка безопасности сервиса |
| `calendar SPEC` | Разбор календарных выражений |
| `timespan SPAN` | Разбор временных интервалов |
| `condition COND` | Проверка условий |
| `cat-config NAME` | Показать конфигурацию |

## Опции

| Опция | Описание |
|-------|----------|
| `--system` | Анализ системных юнитов |
| `--user` | Анализ пользовательских юнитов |
| `--global` | Анализ глобальных юнитов |
| `--order` | Упорядочить по времени запуска |
| `--require` | Показать зависимости |

## Примеры

### Время загрузки

```bash
# Общее время загрузки
systemd-analyze time

# Пример вывода:
# Startup finished in 2.123s (kernel) + 5.456s (initrd) + 12.789s (userspace) = 20.368s
```

### Самые медленные юниты

```bash
# Юниты, отсортированные по времени загрузки
systemd-analyze blame

# Первые 10 самых медленных
systemd-analyze blame | head -10

# Без постраничного вывода
systemd-analyze blame --no-pager
```

### Критическая цепочка

```bash
# Критическая цепочка до multi-user.target
systemd-analyze critical-chain

# Критическая цепочка для конкретного сервиса
systemd-analyze critical-chain nginx.service

# С указанием времени
systemd-analyze critical-chain --fuzz=0.5s
```

### Визуализация загрузки

```bash
# SVG диаграмма
systemd-analyze plot > boot-analysis.svg

# Открыть в браузере
xdg-open boot-analysis.svg
```

### Граф зависимостей

```bash
# Граф всех зависимостей
systemd-analyze dot > dependencies.dot

# Только для nginx
systemd-analyze dot nginx.service > nginx-deps.dot

# Фильтр по паттерну
systemd-analyze dot --to-pattern='*.target' > targets.dot

# Преобразовать в PNG (requires graphviz)
dot -Tpng dependencies.dot -o dependencies.png
```

### Проверка конфигурации

```bash
# Проверить файл юнита
systemd-analyze verify /etc/systemd/system/myapp.service

# Проверить несколько файлов
systemd-analyze verify /etc/systemd/system/*.service
```

### Оценка безопасности

```bash
# Оценка безопасности сервиса
systemd-analyze security nginx.service

# Оценка всех сервисов
systemd-analyze security --no-pager

# Пример вывода с оценкой от 0 до 10
# nginx.service: 9.6 EXPOSED
```

### Календарные выражения

```bash
# Разбор календарного выражения
systemd-analyze calendar "Mon..Fri *-*-* 09:00:00"

# Проверка таймера
systemd-analyze calendar "daily"
systemd-analyze calendar "weekly"
systemd-analyze calendar "*-*-1 00:00:00"

# Список ближайших срабатываний
systemd-analyze calendar --iterations=5 "Mon *-*-* 09:00:00"
```

### Временные интервалы

```bash
# Разбор временного интервала
systemd-analyze timespan "2h 30min"
systemd-analyze timespan "1year 2months 3days"
```

## Практические сценарии

### Оптимизация времени загрузки

```bash
# Найти самые медленные сервисы
systemd-analyze blame | head -20

# Проверить критический путь
systemd-analyze critical-chain

# Отключить ненужные сервисы
sudo systemctl disable bluetooth.service
```

### Анализ безопасности сервиса

```bash
# Проверить оценку безопасности
systemd-analyze security myapp.service

# Улучшить безопасность (пример override)
sudo systemctl edit myapp.service
# Добавить:
# [Service]
# ProtectSystem=strict
# ProtectHome=yes
# NoNewPrivileges=yes
```

### Валидация конфигурации

```bash
# Проверить все кастомные сервисы
systemd-analyze verify /etc/systemd/system/*.service

# Проверить перед деплоем
systemd-analyze verify ./myapp.service
```

:::tip Анализ загрузки
Используйте `systemd-analyze plot > boot.svg` для визуального анализа загрузки — диаграмма покажет параллельные и последовательные зависимости.
:::

:::warning Оценка безопасности
`systemd-analyze security` показывает потенциальные уязвимости, но не заменяет аудит безопасности. Высокий балл (близкий к 10) означает низкую изоляцию.
:::

:::tip Критическая цепочка
`critical-chain` показывает именно те юниты, которые задерживают загрузку. Оптимизация этих юнитов даст наибольший эффект.
:::

:::warning Проверка конфигурации
`systemd-analyze verify` не проверяет семантику — только синтаксис. Сервис может пройти проверку, но не работать из-за неправильных путей или зависимостей.
:::
