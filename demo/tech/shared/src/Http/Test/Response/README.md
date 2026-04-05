# Response Tests

Тесты для Response классов.

## Структура тестов

- `JsonResponseTest` — тесты JSON-ответа
- `HtmlResponseTest` — тесты HTML-ответа
- `RedirectResponseTest` — тесты редиректа
- `EmptyResponseTest` — тесты пустого ответа

## Запуск

```bash
make shared-phpunit
```

## Что тестируется

- Корректные заголовки (Content-Type, Location)
- Дефолтные статус-коды
- Кастомные статус-коды
- Валидация входных данных
- Edge cases (пустые строки, невалидный encoding)