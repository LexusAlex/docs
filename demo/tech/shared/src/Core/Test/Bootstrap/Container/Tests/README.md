# Tests

Тесты для `ContainerFactory`.

## Запуск

```bash
make shared-phpunit
```

## Тестовые кейсы (23)

### createReturnsContainer
Проверяет, что `create()` возвращает объект, реализующий `Psr\Container\ContainerInterface` и `DI\Container`.

### canGetSimpleValueFromContainer
Проверяет получение простого значения (строки) из контейнера.

### canGetServiceWithDependencies
Проверяет получение сервиса через фабрику с внедрением зависимостей.

### containerReturnsSameInstance
Проверяет, что контейнер возвращает тот же экземпляр (singleton).

### hasReturnsTrueForRegisteredService
Проверяет `has()` для зарегистрированного сервиса.

### hasReturnsTrueForRegisteredValue
Проверяет `has()` для простого значения.

### hasReturnsFalseForUnregisteredService
Проверяет `has()` для несуществующего сервиса.

### throwsExceptionWhenServiceNotFound
Проверяет исключение при запросе несуществующего сервиса.

### productionEnvironmentLoadsDifferentConfig
Проверяет, что production-конфиг отличается от test-конфига.

### canGetNestedDependentService
Проверяет вложенные зависимости (A → B).

### canGetDeepNestedDependentService
Проверяет глубокую вложенность (A → B → C + конфиг).

### Типы конфигов
- `canGetStringConfig` - строка
- `canGetIntConfig` - положительное число
- `canGetFloatConfig` - положительное число с плавающей точкой
- `canGetBoolConfig` - true
- `canGetFalseBoolConfig` - false

### Boundary значения
- `canGetZeroIntConfig` - ноль
- `canGetNegativeIntConfig` - отрицательное число
- `canGetNegativeFloatConfig` - отрицательное число с плавающей точкой
- `canGetEmptyArrayConfig` - пустой массив
- `canGetEmptyStringConfig` - пустая строка
- `canGetNullConfig` - null

### Autowiring
- `autowiringCreatesServiceWithoutFactory` - создание без фабрики
- `autowiringInjectsConstructorDependencies` - внедрение зависимостей
- `autowiringThrowsForNonExistentClass` - исключение для несуществующего класса

## Helper методы

```php
private function createContainer(): ContainerInterface
private function createProductionContainer(): ContainerInterface
```

Используются для создания контейнера в test окружении и production окружении соответственно.

## Структура

```
Tests/
└── ContainerFactoryTest.php
```
