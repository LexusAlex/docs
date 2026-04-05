# Response Classes

Классы для формирования HTTP-ответов в контроллерах.

## Доступные классы

### JsonResponse

返回 JSON-ответ.

```php
use Shared\Http\Response\JsonResponse;

return new JsonResponse(['error' => 'Not found'], 404);
```

- `Content-Type: application/json`
- Автоматически сериализует данные в JSON
- При ошибке сериализации выбрасывает `JsonException`

### HtmlResponse

Возвращает HTML-страницу.

```php
use Shared\Http\Response\HtmlResponse;

return new HtmlResponse('<h1>Hello</h1>', 200);
```

- `Content-Type: text/html`

### RedirectResponse

Редирект на другую страницу.

```php
use Shared\Http\Response\RedirectResponse;

return new RedirectResponse('/dashboard', 302);
```

- `Location` header
- Дефолтный статус: 302 (Found)

### EmptyResponse

Пустой ответ (без body).

```php
use Shared\Http\Response\EmptyResponse;

return new EmptyResponse(204);
```

- Дефолтный статус: 204 (No Content)
- Не содержит `Content-Type` header