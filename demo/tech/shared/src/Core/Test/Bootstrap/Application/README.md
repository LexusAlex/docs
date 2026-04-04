# ApplicationTest

Тесты для `Shared\Core\Bootstrap\Application\Application`.

## Обзор

Тесты покрывают 100% кода класса `Application` и проверяют все публичные методы. Используется PHPUnit с моками для тестирования метода `run()`.

## Запуск тестов

```bash
make shared-phpunit
```

С покрытием:
```bash
make shared-phpunit-coverage
```

## Что тестируется

### Создание приложения

#### `createReturnsApplication`
Проверяет, что фабрика `create()` возвращает инстанс `Application`.

```php
$application = Application::create(self::emptyRoutes(...));
self::assertInstanceOf(Application::class, $application);
```

#### `createBuildsContainerWhenNotProvided`
Проверяет, что если контейнер не передан, он создается автоматически.

```php
$container = null;
$application = Application::create(self::emptyRoutes(...), $container);
self::assertInstanceOf(Application::class, $application);
```

#### `createUsesProvidedContainer`
Проверяет, что переданный контейнер используется в приложении.

```php
$container = new ContainerFactory()->create();
$application = Application::create(self::emptyRoutes(...), $container);
self::assertSame($container, $application->getApp()->getContainer());
```

### Получение компонентов

#### `getAppReturnsSlimApp`
Проверяет, что метод `getApp()` возвращает инстанс Slim App.

```php
$application = Application::create(self::emptyRoutes(...));
self::assertInstanceOf(App::class, $application->getApp());
```

#### `routesCallbackIsCalled`
Проверяет, что callback `$routes` вызывается при создании приложения.

```php
$routesCalled = false;
$application = Application::create(function (App $app) use (&$routesCalled): void {
    $routesCalled = true;
});
self::assertTrue($routesCalled);
```

### Middleware

#### `middlewareReturnsNewInstance`
Проверяет, что добавление middleware возвращает **новый** инстанс (immutability).

```php
$application1 = Application::create(self::emptyRoutes(...));
$application2 = $application1->middleware(stdClass::class);
self::assertNotSame($application1, $application2);
```

#### `middlewareAccumulates`
Проверяет, что несколько вызовов `middleware()` накапливают middleware.

```php
$application = Application::create(self::emptyRoutes(...))
    ->middleware(stdClass::class)
    ->middleware(DateTime::class);

$routeCollector = $application->getApp()->getRouteCollector();
self::assertCount(0, $routeCollector->getRoutes());
```

#### `middlewareCreatesNewInstance` (с DataProvider)
Проверяет создание нового инстанса с разным количеством middleware.

Использует DataProvider с наборами:
- `[stdClass::class]` — 1 middleware
- `[stdClass::class, DateTime::class]` — 2 middleware
- `[stdClass::class, DateTime::class, Exception::class]` — 3 middleware

```php
#[DataProvider('provideMiddlewareClasses')]
public function middlewareCreatesNewInstance(string ...$middlewares): void
{
    $application = Application::create(self::emptyRoutes(...));
    foreach ($middlewares as $middleware) {
        $application = $application->middleware($middleware);
    }
    self::assertInstanceOf(App::class, $application->getApp());
}
```

#### `middlewareStoresCorrectClasses` (с DataProvider)
Проверяет, что все middleware сохраняются в правильном порядке.

```php
#[DataProvider('provideMiddlewareClasses')]
public function middlewareStoresCorrectClasses(string ...$middlewares): void
{
    $application = Application::create(self::emptyRoutes(...));
    foreach ($middlewares as $middleware) {
        $application = $application->middleware($middleware);
    }

    $reflection = new ReflectionClass($application);
    $property = $reflection->getProperty('middlewares');
    $stored = $property->getValue($application);

    self::assertCount(count($middlewares), $stored);
    foreach ($middlewares as $index => $middleware) {
        self::assertSame($middleware, $stored[$index]);
    }
}
```

#### `middlewareArrayHasSequentialNumericKeys`
Проверяет, что массив middleware имеет последовательные числовые ключи `[0, 1]`.

```php
$application = Application::create(self::emptyRoutes(...))
    ->middleware(stdClass::class)
    ->middleware(DateTime::class);

$reflection = new ReflectionClass($application);
$property = $reflection->getProperty('middlewares');
$middlewares = $property->getValue($application);

self::assertSame([0, 1], array_keys($middlewares));
```

### Метод run

#### `runMethodCallsRunOnApp`
Проверяет, что метод `run()` вызывает `$app->run()`.

```php
$app = $this->createMock(App::class);
$app->expects(self::once())->method('run');

$application = Application::createWithApp($app, []);
$application->run();
```

#### `runMethodAddsMiddlewares` (с DataProvider)
Проверяет, что метод `run()` добавляет все middleware перед запуском.

```php
#[DataProvider('provideMiddlewareClasses')]
public function runMethodAddsMiddlewares(string ...$middlewares): void
{
    $app = $this->createMock(App::class);
    $app->expects(self::exactly(count($middlewares)))->method('add');
    $app->expects(self::once())->method('run');

    $application = Application::createWithApp($app, $middlewares);
    $application->run();
}
```

## Data Providers

### `provideMiddlewareClasses`

Возвращает список массивов с именами классов для тестирования middleware:

```php
public static function provideMiddlewareClasses(): array
{
    return [
        [stdClass::class],
        [stdClass::class, DateTime::class],
        [stdClass::class, DateTime::class, Exception::class],
    ];
}
```

## Покрытие

- **Покрытие кода:** 100%
- **Mutation Score Indicator (MSI):** 100%

## Зависимости

Тесты используют:
- PHPUnit 13
- Reflection для доступа к private свойствам
- MockBuilder для мокирования Slim App

## Edge Cases

Тесты проверяют:
- Пустой callback routes
- Один middleware
- Несколько middleware
- Immutability (возврат нового инстанса)
- Корректность порядка middleware
- Вызов методов add и run
