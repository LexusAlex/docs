# Tests

Тесты для `ContainerFactory`.

## Запуск

```bash
make shared-phpunit
```

## Тестовые кейсы

### createReturnsContainer
Проверяет, что `create()` возвращает объект, реализующий `Psr\Container\ContainerInterface` и `DI\Container`.

### canGetSimpleValueFromContainer
Проверяет получение простого значения (строки) из контейнера по строковому ключу.

### canGetServiceWithDependencies
Проверяет получение сервиса, зарегистрированного через фабрику. Также проверяет, что фабрика корректно инжектирует зависимости из контейнера.

### containerReturnsSameInstance
Проверяет, что контейнер возвращает тот же экземпляр при повторном запросе сервиса (singleton behavior по умолчанию в PHP-DI).

### hasReturnsTrueForRegisteredService
Проверяет, что `has()` возвращает `true` для зарегистрированного сервиса.

### hasReturnsTrueForRegisteredValue
Проверяет, что `has()` возвращает `true` для простого значения (конфига).

### hasReturnsFalseForUnregisteredService
Проверяет, что `has()` возвращает `false` для несуществующего сервиса.

### throwsExceptionWhenServiceNotFound
Проверяет, что при вызове `get()` для несуществующего сервиса выбрасывается `DI\NotFoundException`.

### productionEnvironmentLoadsProductionConfig
Проверяет, что при смене окружения (production) загружаются соответствующие конфиги.

### canGetNestedDependentService
Проверяет получение сервиса с зависимостью от другого сервиса (A → B).

### canGetDeepNestedDependentService
Проверяет получение сервиса с глубокой вложенностью (A → B → C), а также использование конфига в конструкторе.

### canGetStringConfig
Проверяет получение строкового конфига.

### canGetIntConfig
Проверяет получение числового конфига (int).

### canGetFloatConfig
Проверяет получение конфига с плавающей точкой (float).

### canGetBoolConfig
Проверяет получение булева конфига.

### canGetArrayConfig
Проверяет получение массива из конфига.

### canGetNullConfig
Проверяет получение null из конфига.

### autowiringCreatesServiceWithoutFactory
Проверяет, что PHP-DI может создать сервис без явной фабрики (по имени класса).

### autowiringInjectsConstructorDependencies
Проверяет, что autowiring корректно инжектирует зависимости в конструктор сервиса.

## Структура

```
Tests/
└── ContainerFactoryTest.php
```
