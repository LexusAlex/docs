# Slim Framework 4

Документация по использованию Slim Framework 4 в проекте.

## Обзор

Slim Framework 4 — это легковесный PHP-микрофреймворк для создания веб-приложений и REST API. Фреймворк построен на стандартах PSR-7 (HTTP messages) и PSR-15 (HTTP middleware), что обеспечивает совместимость с другими библиотеками, следующими этим стандартам.

## Основные компоненты

### Приложение (Slim\App)

Приложение является ядром фреймворка и управляет:

- Маршрутизацией (Router)
- Разрешением callable-функций (CallableResolver)
- DI-контейнером (Container)
- Стеком middleware

Создание приложения:

```php
use Slim\Factory\AppFactory;
use Slim\Psr7\Factory\ResponseFactory;
use Slim\Psr7\Factory\ServerRequestFactory;

$responseFactory = new ResponseFactory();
$app = AppFactory::create($responseFactory);
```

Или с использованием контейнера:

```php
use Slim\App;
use Slim\Factory\AppFactory;
use DI\Container;

$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();
```

### Маршрутизация

Slim поддерживает следующие HTTP-методы:

- `GET` — получение данных
- `POST` — создание данных
- `PUT` — полное обновление данных
- `PATCH` — частичное обновление данных
- `DELETE` — удаление данных
- `OPTIONS` — запрос поддерживаемых методов

#### Базовые маршруты

```php
$app->get('/path', function ($request, $response, $args) {
    return $response->withJson(['status' => 'ok']);
});

$app->post('/users', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    // Обработка данных
    return $response->withJson(['created' => true], 201);
});
```

#### Параметры пути

Обязательные параметры:

```php
$app->get('/users/{id}', function ($request, $response, $args) {
    $userId = $args['id'];
    return $response->withJson(['id' => $userId]);
});
```

Опциональные параметры:

```php
$app->get('/users[/{id}]', function ($request, $response, $args) {
    $userId = $args['id'] ?? null;
    return $response->withJson(['id' => $userId]);
});
```

#### Группы маршрутов

```php
$app->group('/api/v1', function (Group $group) {
    $group->get('/users', ...);
    $group->post('/users', ...);
})->add(AuthMiddleware::class);
```

### Обработчики маршрутов (Route Handlers)

Обработчик получает три аргумента:

- `$request` — объект Request (PSR-7)
- `$response` — объект Response (PSR-7)
- `$args` — массив параметров пути

```php
function (Request $request, Response $response, array $args): Response {
    $id = $args['id'];
    
    // Получение данных из запроса
    $queryParams = $request->getQueryParams();
    $body = $request->getParsedBody();
    $headers = $request->getHeaders();
    
    // Формирование ответа
    return $response
        ->withJson(['id' => $id])
        ->withHeader('Content-Type', 'application/json');
}
```

### Middleware

Middleware позволяет добавлять функциональность, которая выполняется до или после обработчика маршрута.

#### Типы middleware

1. **App-level** — применяется ко всем маршрутам:

```php
$app->add(CorsMiddleware::class);
$app->add(ErrorMiddleware::class);
$app->add(AuthenticationMiddleware::class);
```

2. **Route-level** — применяется к конкретному маршруту:

```php
$app->get('/admin/dashboard', Handler::class)
    ->add(AdminMiddleware::class)
    ->add(AuthMiddleware::class);
```

#### Структура middleware

```php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CorsMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        // Pre-processing
        // Можно модифицировать запрос
        
        $response = $handler->handle($request);
        
        // Post-processing
        // Можно модифицировать ответ
        $response = $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        return $response;
    }
}
```

#### Callable middleware

```php
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response->withHeader('X-Middleware', 'applied');
});
```

#### Порядок выполнения

Middleware используют принцип LIFO (Last In, First Out):

```
Request
    ↓
Middleware 1 (первый добавленный)
    ↓
Middleware 2 (второй добавленный)
    ↓
... (стек middleware)
    ↓
Route Handler
    ↓
Response (в обратном порядке)
    ↓
Middleware 2 (post-processing)
    ↓
Middleware 1 (post-processing)
    ↓
Response
```

Пример:

```php
$app->add(Middleware1::class);  // Выполнится second в очереди
$app->add(Middleware2::class); // Выполнится first в очереди
$app->get('/test', Handler::class);

// Порядок выполнения:
// Request → Middleware2 → Middleware1 → Handler → Middleware1 → Middleware2 → Response
```

### Работа с запросом (Request)

#### Получение данных

```php
// JSON-данные
$data = $request->getParsedBody();

// Параметры query string
$queryParams = $request->getQueryParams();
$page = $queryParams['page'] ?? 1;

// Заголовки
$headers = $request->getHeaders();
$authorization = $request->getHeaderLine('Authorization');

// Cookies
$cookies = $request->getCookieParams();

// Файлы
$files = $request->getUploadedFiles();
```

#### Модификация запроса

```php
$request = $request
    ->withAttribute('user', $user)
    ->withParsedBody($data);
```

### Работа с ответом (Response)

#### Создание ответов

```php
use Slim\Psr7\Response;
use Slim\Psr7\Factory\ResponseFactory;

// Пустой ответ
$response = new Response(204);

// Ответ с телом
$response = new Response(200);
$response->getBody()->write(json_encode($data));

// JSON-ответ (с использованием хелпера)
return $response
    ->withJson($data)
    ->withStatus(200);
```

#### Типы ответов

В проекте используются следующие классы ответов:

- `EmptyResponse` — пустой ответ (204)
- `JsonResponse` — JSON-ответ с автоматическим кодированием
- `HtmlResponse` — HTML-ответ
- `RedirectResponse` — редирект

```php
use App\Http\Response\EmptyResponse;
use App\Http\Response\JsonResponse;
use App\Http\Response\HtmlResponse;
use App\Http\Response\RedirectResponse;

// Пустой ответ
return new EmptyResponse(204);

// JSON-ответ
return new JsonResponse(['data' => $value]);

// HTML-ответ
return new HtmlResponse('<html>...</html>');

// Редирект
return new RedirectResponse('/new/path', 302);
```

## Использование в проекте

### Конфигурация

В проекте используется паттерн с отдельными callback-функциями для регистрации маршрутов и middleware.

#### Регистрация маршрутов

```php
// В конфигурации модуля
'slim-routes-callback' => static function (FactoryInterface $factory) {
    $app = $factory->createApp();
    
    $app->get('/users', [UserController::class, 'list']);
    $app->get('/users/{id}', [UserController::class, 'show']);
    $app->post('/users', [UserController::class, 'create']);
    
    return $app;
},
```

#### Регистрация middleware

```php
// В конфигурации модуля
'slim-middleware' => static function (FactoryInterface $factory) {
    $app = $factory->createApp();
    
    $app->add(CorsMiddleware::class);
    $app->add(ValidationMiddleware::class);
    $app->add(AuthenticationMiddleware::class);
    
    return $app;
},
```

### Запуск приложения

```php
use App\Core\Bootstrap\Application;

$application = new Application($config);
$response = $application->run();

// Отправка ответа
$application->sendResponse($response);
```

## Best Practices

### Структура контроллера

```php
class UserController
{
    public function list(Request $request, Response $response): Response
    {
        $users = $this->userRepository->findAll();
        return new JsonResponse(['users' => $users]);
    }
    
    public function show(Request $request, Response $response, array $args): Response
    {
        $user = $this->userRepository->findById($args['id']);
        
        if ($user === null) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }
        
        return new JsonResponse(['user' => $user]);
    }
    
    public function create(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        
        $validator = new UserValidator();
        if (!$validator->validate($data)) {
            return new JsonResponse(['errors' => $validator->getErrors()], 422);
        }
        
        $user = $this->userRepository->create($data);
        
        return new JsonResponse(['user' => $user], 201);
    }
}
```

### Обработка ошибок

```php
// Middleware для обработки исключений
class ErrorHandlingMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        try {
            return $handler->handle($request);
        } catch (NotFoundException $e) {
            return new JsonResponse(['error' => 'Not found'], 404);
        } catch (ValidationException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 422);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => 'Internal server error'], 500);
        }
    }
}
```

### Валидация

Рекомендуется использовать отдельный слой валидации:

```php
class UserValidator
{
    private array $errors = [];
    
    public function validate(array $data): bool
    {
        $this->errors = [];
        
        if (empty($data['email'])) {
            $this->errors['email'] = 'Email is required';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Invalid email format';
        }
        
        if (empty($data['name'])) {
            $this->errors['name'] = 'Name is required';
        }
        
        return empty($this->errors);
    }
    
    public function getErrors(): array
    {
        return $this->errors;
    }
}
```

## Ссылки

- [Официальная документация Slim Framework](https://www.slimframework.com/docs/)
- [PSR-7: HTTP messages](https://www.php-fig.org/psr/psr-7/)
- [PSR-15: HTTP middleware](https://www.php-fig.org/psr/psr-15/)