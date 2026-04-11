# Container

Фабрика для создания PHP-DI контейнера с автоматической загрузкой конфигураций.

## Использование

```php
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Shared\Core\Bootstrap\Container\ContainerFactory;

$dependencies = ConfigurationLoader::load();
$container = (new ContainerFactory())->create($dependencies);

// Получить сервис
$service = $container->get(SomeService::class);

// Получить конфиг
$config = $container->get('database');

// Проверить наличие
if ($container->has(SomeService::class)) {
    // ...
}
```

## Как это работает

### 1. ConfigurationLoader

`ConfigurationLoader::load()` собирает все `.php` файлы из:
- `src/*/Configuration/common/` - общие конфиги для всех окружений
- `src/*/Configuration/{environment}/` - конфиги для конкретного окружения (production, development, test)

Файлы мержатся: сначала common, затем environment. Project-конфиги переопределяют shared-конфиги.

### 2. ContainerBuilder

`ContainerBuilder::addDefinitions($dependencies)` регистрирует массив в PHP-DI контейнере.

### 3. Autowiring

PHP-DI автоматически резолвит зависимости в фабриках:

```php
SomeService::class => static function (ContainerInterface $container): SomeService {
    $config = $container->get('database');
    return new SomeService($config);
},
```

## Формат конфигов

### Простые значения (конфиги)
```php
// Configuration/common/database.php
return [
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
    ],
];
```

### Фабрики (сервисы)
```php
// Configuration/common/services.php
use Psr\Container\ContainerInterface;

return [
    ErrorMiddleware::class => static function (ContainerInterface $container): ErrorMiddleware {
        $responseFactory = $container->get(ResponseFactoryInterface::class);
        return new ErrorMiddleware($responseFactory);
    },
];
```

## Интерфейс

```php
namespace Shared\Core\Bootstrap\Container;

use Psr\Container\ContainerInterface;

interface ContainerFactoryInterface
{
    public function create(): ContainerInterface;
}
```
