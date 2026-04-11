# Application

Фабрика для создания Slim приложения с контейнером. Обеспечивает удобный fluent interface для конфигурации приложения.

## Установка

Подключается через composer как часть пакета `shared`.

## Быстрый старт

```php
use Psr\Container\ContainerInterface;
use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Slim\App;

$container = (new ContainerFactory())->create(ConfigurationLoader::load());

$application = Application::create($container, function (App $app) {
    $app->get('/', HomeAction::class);
    $app->post('/api/users', UserCreateAction::class);
    $app->get('/api/users/{id}', UserGetAction::class);
});

$application
    ->middleware(ErrorMiddleware::class)
    ->middleware(AnotherMiddleware::class)
    ->run();
```

## Особенности

- **Immutable** — метод `middleware()` возвращает новый инстанс, исходный объект не меняется
- **Fluent interface** — методы возвращают `$this` для цепочки вызовов
- Метод `registerRoutesFromConfig()` загружает маршруты из контейнера по ключу `slim-routes-callback`
- Маршруты из `create()` и `registerRoutesFromConfig()` применяются вместе в едином потоке
- Middleware автоматически дедуплицируются — дубликаты игнорируются

## API

### `Application::create(ContainerInterface $container, ?callable $routes = null): self`

Создает приложение с Slim.

**Параметры:**
- `$container` — PSR-контейнер с зависимостями
- `$routes` — опциональный callable, который принимает `App` и регистрирует маршруты

**Пример:**
 
```php
$container = (new ContainerFactory())->create(ConfigurationLoader::load());

// Без routes callback
$application = Application::create($container);

// С routes callback
$application = Application::create($container, function (App $app): void {
    $app->get('/', HomeAction::class);
    $app->post('/api/users', UserCreateAction::class);
});
```

### `Application::middleware(string ...$middlewares): self`

Добавляет middleware к приложению. Возвращает новый инстанс `Application` (immutable).

**Параметры:**
- `$middlewares` — имена классов middleware

**Пример:**

```php
// Одиночный middleware
$application = $application->middleware(ErrorMiddleware::class);

// Несколько middleware за раз
$application = $application->middleware(
    ErrorMiddleware::class,
    CorsMiddleware::class,
    AuthMiddleware::class
);

// Цепочка вызовов
$application = $application
    ->middleware(ErrorMiddleware::class)
    ->middleware(CorsMiddleware::class);
```

### `Application::getApp(): App`

Возвращает инстанс Slim App для расширенного использования.

**Пример:**

```php
$application = Application::create($routes);
$app = $application->getApp();

// Доступ к RouteCollector
$routes = $app->getRouteCollector()->getRoutes();
```

### `Application::run(): void`

Запускает приложение. Добавляет все зарегистрированные middleware и вызывает `run()` у Slim App.

**Пример:**

```php
$application = Application::create($routes)
    ->middleware(ErrorMiddleware::class)
    ->run();
```

## Внутреннее устройство

### Конструктор

Приватный, используется фабричными методами. Инициализирует Slim App с переданным контейнером.

### Хранение middleware

Middleware хранятся в виде массива `list<class-string>`. При добавлении нового middleware создается новый инстанс с обновленным массивом. Дубликаты автоматически удаляются через `array_unique()`.

### Запуск

Метод `run()`:
1. Проходит по всем middleware
2. Вызывает `$app->add($middleware)` для каждого
3. Запускает Slim приложение через `$app->run()`

## Примеры использования

### Базовое приложение

```php
$container = (new ContainerFactory())->create(ConfigurationLoader::load());

$application = Application::create($container, function (App $app) {
    $app->get('/', HomeAction::class);
});

$application->run();
```

### С middleware

```php
$container = (new ContainerFactory())->create(ConfigurationLoader::load());

$application = Application::create($container, function (App $app) {
    $app->get('/', HomeAction::class);
    $app->get('/api/users', UserListAction::class);
    $app->get('/api/users/{id}', UserGetAction::class);
})
->middleware(ErrorMiddleware::class)
->middleware(CorsMiddleware::class)
->run();
```

### С кастомным контейнером

```php
$container = new MyCustomContainer();
$application = Application::create($container, $routes);
$application->run();
```

### Доступ к App для расширенной конфигурации

```php
$container = (new ContainerFactory())->create(ConfigurationLoader::load());
$application = Application::create($container, $routes);

// Добавляем middleware до запуска
$app = $application->getApp();
$app->add(new CustomMiddleware());

// Запускаем
$application->run();
```
