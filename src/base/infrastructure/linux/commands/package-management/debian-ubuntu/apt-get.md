# apt-get

Классическая утилита управления пакетами в Debian/Ubuntu. Рекомендуется для использования в скриптах.

## Синтаксис

```bash
apt-get [опции] команда [пакеты]
```

## Команды

| Команда | Описание |
|---------|----------|
| `update` | Обновить список пакетов |
| `upgrade` | Обновить пакеты (без удаления) |
| `dist-upgrade` | Обновить с решением конфликтов |
| `install пакет` | Установить пакет |
| `remove пакет` | Удалить пакет (сохранить конфиги) |
| `purge пакет` | Удалить с конфигами |
| `autoremove` | Удалить ненужные зависимости |
| `clean` | Удалить весь кеш |
| `autoclean` | Удалить устаревший кеш |
| `download пакет` | Скачать .deb без установки |
| `source пакет` | Скачать исходники |
| `build-dep пакет` | Установить зависимости для сборки |
| `check` | Проверить состояние пакетов |

## Опции

| Опция | Описание |
|-------|----------|
| `-y` | Автоматическое подтверждение |
| `-q` | Тихий режим |
| `-t дистрибутив` | Целевой дистрибутив |
| `--no-install-recommends` | Не ставить рекомендуемые |
| `--dry-run` / `-s` | Симуляция |
| `--allow-downgrades` | Разрешить даунгрейд |

## Примеры

### Обновление списка пакетов

```bash
sudo apt-get update
```

### Обновление всех пакетов

```bash
sudo apt-get upgrade
```

### Обновление дистрибутива

```bash
sudo apt-get dist-upgrade
```

### Установка пакета

```bash
sudo apt-get install nginx
```

### Установка без рекомендуемых

```bash
sudo apt-get install --no-install-recommends nginx
```

### Удаление пакета

```bash
sudo apt-get remove nginx
```

### Полное удаление

```bash
sudo apt-get purge nginx
```

### Очистка зависимостей

```bash
sudo apt-get autoremove
```

### Очистка кеша

```bash
sudo apt-get clean
```

### Симуляция установки

```bash
apt-get install -s nginx
```

## Неинтерактивное использование (скрипты)

### Установка без подтверждения

```bash
DEBIAN_FRONTEND=noninteractive apt-get install -y nginx
```

## Практические сценарии

### Обновление системы в скрипте

```bash
#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq
apt-get autoremove -y -qq
```

### Установка пакетов из списка

```bash
xargs apt-get install -y < packages.txt
```

### Проверка перед обновлением

```bash
apt-get -s upgrade
```

:::tip
В скриптах используйте `DEBIAN_FRONTEND=noninteractive` и `-y` для полной автоматизации без вопросов.
:::

:::warning
`dist-upgrade` может удалить пакеты для разрешения конфликтов. Всегда проверяйте список удаляемых пакетов перед подтверждением.
:::
