# ApplicationTest

Тесты для `Shared\Core\Bootstrap\Application\Application`.

## Что тестируется

### Создание приложения

- `createReturnsApplication` — фабрика возвращает инстанс Application
- `createBuildsContainerWhenNotProvided` — если контейнер не передан, создается автоматически
- `createUsesProvidedContainer` — переданный контейнер используется

### Получение компонентов

- `getAppReturnsSlimApp` — метод `getApp()` возвращает Slim App
- `routesCallbackIsCalled` — колбэк routes вызывается при создании

### Middleware

- `middlewareReturnsNewInstance` — добавление middleware возвращает новый инстанс
- `middlewareAccumulates` — несколько вызовов `middleware()` накапливают middleware
- `middlewareCreatesNewInstance` (с DataProvider) — создание с разным количеством middleware
- `middlewareStoresCorrectClasses` (с DataProvider) — middleware сохраняются корректно
- `middlewareArrayHasSequentialNumericKeys` — массив имеет последовательные числовые ключи [0, 1]

### Метод run

- `runMethodCallsRunOnApp` — метод `run()` вызывает `$app->run()`
- `runMethodAddsMiddlewares` (с DataProvider) — метод `run()` добавляет все middleware перед запуском
