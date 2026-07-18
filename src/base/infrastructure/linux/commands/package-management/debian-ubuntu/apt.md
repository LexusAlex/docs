# apt

Современная командная обёртка для управления пакетами в Debian/Ubuntu. Объединяет функции `apt-get` и `apt-cache` с удобным интерфейсом.

## Синтаксис

```bash
apt [опции] команда [пакеты]
```

## Команды

| Команда | Описание |
|---------|----------|
| `update` | Обновить список пакетов |
| `upgrade` | Обновить установленные пакеты |
| `full-upgrade` | Обновить с удалением устаревших |
| `install пакет` | Установить пакет |
| `remove пакет` | Удалить пакет (сохранить конфиги) |
| `purge пакет` | Удалить пакет с конфигами |
| `autoremove` | Удалить ненужные зависимости |
| `search запрос` | Поиск пакетов |
| `show пакет` | Информация о пакете |
| `list --installed` | Список установленных |
| `clean` | Удалить кеш пакетов |
| `autoclean` | Удалить устаревший кеш |

## Опции

| Опция | Описание |
|-------|----------|
| `-y` | Автоматически подтвердить |
| `-q` | Тихий режим |
| `-V` | Подробный вывод |
| `--no-install-recommends` | Не устанавливать рекомендуемые |

## Примеры

### Обновление списка пакетов

```bash
sudo apt update
```

### Обновление всех пакетов

```bash
sudo apt upgrade
```

### Полное обновление

```bash
sudo apt full-upgrade
```

### Установка пакета

```bash
sudo apt install nginx
```

### Удаление пакета

```bash
sudo apt remove nginx
```

### Поиск пакета

```bash
apt search "web server"
```

### Очистка кеша

```bash
sudo apt clean
```

### Удаление ненужных зависимостей

```bash
sudo apt autoremove
```

## Конфигурация репозиториев

### Основной файл

```bash
cat /etc/apt/sources.list
```

### Добавление PPA

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

### Добавление репозитория

```bash
echo "deb https://example.com/repo stable main" | sudo tee /etc/apt/sources.list.d/example.list
```

### Добавление GPG-ключа

```bash
curl -fsSL https://example.com/key.gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/example.gpg
```

## apt vs apt-get

| Параметр | apt | apt-get |
|----------|-----|---------|
| Прогресс-бар | Да | Нет |
| Цветной вывод | Да | Нет |
| Скрипты | Не рекомендуется | Рекомендуется |

## Практические сценарии

### Обновление системы

```bash
sudo apt update && sudo apt upgrade -y
```

### Установка с подтверждением

```bash
sudo apt install -y nginx php-fpm mysql-server
```

### Симуляция установки

```bash
apt install -s nginx
```

:::tip
Используйте `apt` для интерактивной работы и `apt-get` в скриптах. `apt` даёт более дружелюбный вывод с прогресс-баром.
:::

:::warning
Всегда выполняйте `apt update` перед `apt upgrade`. Иначе apt будет использовать устаревший список пакетов.
:::
