# Application

Фабрика для создания Slim приложения с контейнером.

## Использование

```php
use Shared\Core\Bootstrap\Application\Application;

$application = Application::create(function (App $app) {
    $app->get('/', HomeAction::class);
    $app->post('/api/users', UserCreateAction::class);
    $app->get('/api/users/{id}', UserGetAction::class);
});

$application
    ->middleware(ErrorMiddleware::class)
    ->middleware(AnotherMiddleware::class)
    ->run();
```

## API

### `Application::create(callable $routes, ?ContainerInterface $container = null): self`

Создает приложение. Контейнер создается автоматически, если не передан.

```php
function (App $app): void {
    $app->get('/', HomeAction::class);
}
```

### `Application::middleware(string ...$middlewares): self`

Добавляет middleware. Возвращает новый инстанс (immutable).

```php
$app->middleware(ErrorMiddleware::class);
$app->middleware(MiddlewareA::class, MiddlewareB::class);
```

### `Application::getApp(): App`

Возвращает Slim App для расширенного использования.

### `Application::run(): void`

Запускает приложение.
