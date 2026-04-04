# Application

Фабрика для создания Slim приложения с контейнером. Обеспечивает удобный fluent interface для конфигурации приложения.

## Установка

Подключается через composer как часть пакета `shared`.

## Быстрый старт

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

## Особенности

- **Автоматическое создание контейнера** — если контейнер не передан, создается автоматически через `ContainerFactory`
- **Immutable** — метод `middleware()` возвращает новый инстанс, исходный объект не меняется
- **Fluent interface** — методы возвращают `$this` для цепочки вызовов

## API

### `Application::create(callable $routes, ?ContainerInterface $container = null): self`

Создает приложение с Slim.

**Параметры:**
- `$routes` — callable, который принимает `App` и регистрирует маршруты
- `$container` — опциональный PSR-контейнер. Если не передан, создается автоматически

**Пример:**

```php
$application = Application::create(function (App $app): void {
    $app->get('/', HomeAction::class);
    $app->post('/api/users', UserCreateAction::class);
});

// С переданным контейнером
$container = (new ContainerFactory())->create();
$application = Application::create($routes, $container);
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

Middleware хранятся в виде массива `list<class-string>`. При добавлении нового middleware создается новый инстанс с обновленным массивом.

### Запуск

Метод `run()`:
1. Проходит по всем middleware
2. Вызывает `$app->add($middleware)` для каждого
3. Запускает Slim приложение через `$app->run()`

## Примеры использования

### Базовое приложение

```php
$application = Application::create(function (App $app) {
    $app->get('/', HomeAction::class);
});

$application->run();
```

### С middleware

```php
$application = Application::create(function (App $app) {
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
$application = Application::create($routes, $container);
$application->run();
```

### Доступ к App для расширенной конфигурации

```php
$application = Application::create($routes);

// Добавляем middleware до запуска
$app = $application->getApp();
$app->add(new CustomMiddleware());

// Запускаем
$application->run();
```
