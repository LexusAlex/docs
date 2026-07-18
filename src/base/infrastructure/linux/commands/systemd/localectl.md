# localectl

**Уровень:** Средний

Управление системными локалями и раскладками клавиатуры.

## Синтаксис

```bash
localectl [OPTIONS] [COMMAND]
```

## Команды

| Команда | Описание |
|---------|----------|
| `status` | Показать текущие настройки локали |
| `set-locale LOCALE` | Установить локаль |
| `list-locales` | Список доступных локалей |
| `set-keymap MAP` | Установить раскладку консоли |
| `list-keymaps` | Список доступных раскладок |
| `set-x11-keymap LAYOUT` | Установить раскладку X11 |

## Опции

| Опция | Описание |
|-------|----------|
| `--no-ask-password` | Не запрашивать пароль |
| `-H HOST` | Управление на удалённом хосте |

## Переменные локали

| Переменная | Описание |
|------------|----------|
| `LANG` | Основная локаль (по умолчанию) |
| `LC_CTYPE` | Классы символов |
| `LC_NUMERIC` | Формат чисел |
| `LC_TIME` | Формат даты и времени |
| `LC_COLLATE` | Правила сортировки |
| `LC_MONETARY` | Формат валюты |
| `LC_MESSAGES` | Язык сообщений |
| `LC_PAPER` | Формат бумаги |
| `LC_NAME` | Формат имён |
| `LC_ADDRESS` | Формат адресов |
| `LC_TELEPHONE` | Формат телефонов |
| `LC_MEASUREMENT` | Система мер |
| `LC_IDENTIFICATION` | Метаданные локали |

## Примеры

### Просмотр текущих настроек

```bash
# Полная информация
localectl

# Пример вывода:
#    System Locale: LANG=en_US.UTF-8
#        VC Keymap: us
#     X11 Layout: us

# Только системная локаль
localectl status
```

### Список доступных локалей

```bash
# Все локали
localectl list-locales

# Фильтр по языку
localectl list-locales | grep ru_RU

# Фильтр по кодировке
localectl list-locales | grep UTF-8
```

### Установка локали

```bash
# Установить основную локаль
sudo localectl set-locale LANG=en_US.UTF-8

# Установить несколько переменных
sudo localectl set-locale LANG=en_US.UTF-8 LC_MESSAGES=en_US.UTF-8

# Русская локаль
sudo localectl set-locale LANG=ru_RU.UTF-8
```

### Установка раскладки клавиатуры

```bash
# Список раскладок
localectl list-keymaps

# Установить раскладку консоли
sudo localectl set-keymap us

# Русская раскладка
sudo localectl set-keymap ru

# Раскладка для X11
sudo localectl set-x11-keymap us,ru
```

### Комбинированные настройки

```bash
# Английская локаль с русской раскладкой
sudo localectl set-locale LANG=en_US.UTF-8
sudo localectl set-keymap us,ru
sudo localectl set-x11-keymap us,ru
```

## Практические сценарии

### Настройка сервера для России

```bash
# Установить русскую локаль
sudo localectl set-locale LANG=ru_RU.UTF-8

# Сгенерировать локали (если не сгенерированы)
sudo locale-gen ru_RU.UTF-8

# Применить
sudo localectl set-locale LANG=ru_RU.UTF-8
```

### Настройка для разработки

```bash
# Английская локаль для совместимости
sudo localectl set-locale LANG=en_US.UTF-8

# Русские форматы для чисел и валюты
sudo localectl set-locale LC_MONETARY=ru_RU.UTF-8 LC_NUMERIC=ru_RU.UTF-8
```

### Проверка в скриптах

```bash
# Получить текущую локаль
CURRENT_LANG=$(localectl status | grep "System Locale" | cut -d= -f2)

# Проверить, русская ли локаль
if [[ "$CURRENT_LANG" == ru_* ]]; then
    echo "Russian locale detected"
fi
```

## Конфигурационные файлы

### /etc/locale.conf

```ini
LANG=en_US.UTF-8
LC_MESSAGES=en_US.UTF-8
```

### Генерация локалей

```bash
# Debian/Ubuntu
sudo locale-gen ru_RU.UTF-8
sudo update-locale LANG=ru_RU.UTF-8

# CentOS/RHEL
sudo localectl set-locale LANG=ru_RU.UTF-8
```

:::tip LANG vs LC_*
`LANG` — локаль по умолчанию для всех категорий. `LC_*` переопределяют конкретные категории. `LC_ALL` переопределяет всё (не рекомендуется для постоянного использования).
:::

:::warning Генерация локалей
Перед установкой локали убедитесь, что она сгенерирована. В Debian/Ubuntu: `sudo locale-gen ru_RU.UTF-8`. В CentOS/RHEL локали генерируются автоматически.
:::

:::tip Раскладка консоли
`set-keymap` влияет только на консоль (tty). Для X11 используйте `set-x11-keymap` или настройки вашего окружения.
:::

:::warning Переменная LC_ALL
`LC_ALL` имеет наивысший приоритет, но её не следует устанавливать в конфигурационных файлах — она предназначена для временного переопределения в скриптах.
## См. также

- [hostnamectl](hostnamectl.md) — имя хоста
- [timedatectl](timedatectl.md) — настройка времени

:::
