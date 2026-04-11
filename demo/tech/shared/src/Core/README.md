# Core

Базовые компоненты для инициализации приложения. Предоставляет инфраструктуру для загрузки конфигураций, создания контейнера зависимостей и запуска Slim-приложения.

## Компоненты

### Environment

Работа с переменными окружения. Предоставляет унифицированный интерфейс для чтения переменных с поддержкой значений по умолчанию.

```php
use Shared\Core\Bootstrap\Environment\Environment;

$environment = new Environment();
$value = $environment->get('DATABASE_HOST', 'localhost');
```

Также включает `EnvironmentProductionChecker` для проверки production-окружения.

### ConfigurationLoader

Загрузчик конфигураций. Собирает и объединяет `.php` файлы из папок `Configuration/common/` и `Configuration/{environment}/`.

```php
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;

ConfigurationLoader::projectRoot(__DIR__ . '/../../');
$config = ConfigurationLoader::load();
```

Порядок приоритета (от низкого к высокому):
1. shared/common
2. shared/{environment}
3. project/common
4. project/{environment}

### Container

Фабрика для создания PHP-DI контейнера с загрузкой конфигураций.

```php
$container = (new ContainerFactory())->create(ConfigurationLoader::load());
$service = $container->get(SomeService::class);
```

### Application

Фабрика для создания Slim-приложения с контейнером. Обеспечивает fluent interface для конфигурации приложения.

```php
$container = (new ContainerFactory())->create(ConfigurationLoader::load());

$application = Application::create($container, function (App $app) {
    $app->get('/', HomeAction::class);
})
->middleware(ErrorMiddleware::class)
->run();
```

## Архитектура

```
Application
    │
    ├── создаёт Container (через ContainerFactory)
    │       │
    │       └── загружает конфиги (через ConfigurationLoader)
    │               │
    │               └── читает окружение (через Environment)
    │
    └── запускает Slim App
```
