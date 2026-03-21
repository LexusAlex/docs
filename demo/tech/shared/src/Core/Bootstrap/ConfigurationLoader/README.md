# ConfigurationLoader

Загрузчик конфигурации для объединения массивов из PHP-файлов.

## Принцип работы

```
ConfigurationLoader::load()
         │
         ▼
┌─────────────────────────────────────────┐
│  1. Читает переменные окружения         │
│     - APPLICATION_ENVIRONMENT          │
│     - CONFIG_SHARED_PATH               │
│     - CONFIG_PROJECT_ROOT (или статика) │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  2. Строит список путей для загрузки    │
│     Порядок загрузки (приоритет):       │
│     1. shared/common/*.php   (низкий)   │
│     2. shared/{env}/*.php               │
│     3. project/common/*.php (высокий)   │
│     4. project/{env}/*.php              │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  3. Создаёт PhpFileProvider для каждого│
│     пути и передаёт в ConfigAggregator │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  4. ConfigAggregator объединяет массивы   │
│     Позднее = приоритетнее              │
└─────────────────────────────────────────┘
         │
         ▼
         Возвращает объединённый массив
```

## Переменные окружения

| Переменная | По умолчанию | Описание |
|------------|--------------|----------|
| `APPLICATION_ENVIRONMENT` | `production` | Окружение: `common`, `development`, `production`, `test` |
| `CONFIG_SHARED_PATH` | `__DIR__ . '/../../../'` | Путь к папке shared |
| `CONFIG_PROJECT_ROOT` | — | Путь к проекту (api/ui/tools) |

## Использование

### Вариант 1: Через `projectRoot()` (рекомендуется)

```php
// api/public/index.php
putenv('APPLICATION_ENVIRONMENT=production');

ConfigurationLoader::projectRoot(__DIR__ . '/../../');

$config = ConfigurationLoader::load();
```

### Вариант 2: Через переменные окружения

```bash
export APPLICATION_ENVIRONMENT=production
export CONFIG_SHARED_PATH=/home/alex/projects/docs/demo/tech/shared
export CONFIG_PROJECT_ROOT=/home/alex/projects/docs/demo/tech/api
```

```php
// api/public/index.php
$config = ConfigurationLoader::load();
```

## Структура папок с конфигами

```
/home/alex/projects/docs/demo/tech/
├── shared/
│   └── src/
│       └── {Module}/
│           └── Configuration/
│               ├── common/          ← загружается всегда
│               ├── development/     ← загружается при ENVIRONMENT=development
│               ├── production/       ← загружается при ENVIRONMENT=production
│               └── test/             ← загружается при ENVIRONMENT=test
│
├── api/
│   └── src/
│       └── {Module}/
│           └── Configuration/
│               ├── common/
│               └── {environment}/   ← переопределяет shared
```

## Примеры конфигурационных файлов

### shared/src/Logger/Configuration/common/logger.php

```php
<?php

return [
    'logger' => [
        'path' => '/var/log/app.log',
        'level' => 'info',
    ],
];
```

### api/src/Logger/Configuration/production/logger.php

```php
<?php

return [
    'logger' => [
        'path' => '/var/log/production.log',
        'level' => 'warning',
    ],
];
```

## Объединение конфигураций

`ConfigAggregator` последовательно объединяет массивы:

- Массивы мержатся рекурсивно
- Скалярные значения перезаписываются
- Позднее добавленные провайдеры имеют приоритет

### Пример объединения

```php
// shared/src/Core/Configuration/common/database.php
return [
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
    ],
];

// api/src/Bootstrap/Configuration/common/database.php
return [
    'database' => [
        'host' => 'production-db',
    ],
];

// Результат:
[
    'database' => [
        'host' => 'production-db',  // перезаписано из api
        'port' => 3306,             // осталось из shared
    ],
]
```

## Порядок загрузки

При `APPLICATION_ENVIRONMENT = production`:

| # | Источник | Папка | Приоритет |
|---|---------|-------|----------|
| 1 | shared | common | низкий |
| 2 | shared | production | |
| 3 | project | common | высокий |
| 4 | project | production | высокий |

Конфиги проекта (api/ui/tools) переопределяют конфиги shared.

## Класс

```php
namespace Shared\Core\Bootstrap;

final class ConfigurationLoader implements ConfigurationLoaderInterface
{
    /**
     * Загружает и объединяет все конфигурации
     * @return array<mixed, mixed>
     * @throws RuntimeException если project root не установлен или не существует
     */
    public static function load(): array;

    /**
     * Устанавливает путь к корню проекта.
     * Пустая строка сбрасывает к значению из CONFIG_PROJECT_ROOT
     */
    public static function projectRoot(string $path): void;
}
```

## Особенности реализации

- **Lazy Environment**: экземпляр `Environment` создаётся один раз и переиспользуется
- **Валидация путей**: `load()` проверяет существование project root перед загрузкой
- **Приоритет projectRoot()**: если установлен через метод, переменная `CONFIG_PROJECT_ROOT` игнорируется
- **Сброс через пустую строку**: `projectRoot('')` сбрасывает статику и читает из env
