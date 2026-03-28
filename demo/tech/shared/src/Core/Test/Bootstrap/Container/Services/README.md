# Services

Тестовые сервисы для проверки работы ContainerFactory.

## Классы

### TestService
Базовый сервис с одним строковым параметром.

```php
final class TestService
{
    public function __construct(
        private readonly string $value,
    ) {}

    public function getValue(): string
    {
        return $this->value;
    }
}
```

### DependentService
Сервис с зависимостью от TestService. Используется для тестирования вложенных зависимостей.

```php
final class DependentService
{
    public function __construct(
        private readonly TestService $testService,
    ) {}

    public function getTestService(): TestService
    public function getValueFromTestService(): string
}
```

### DeepDependentService
Сервис с глубокой вложенностью: DependentService + конфиг. Используется для тестирования цепочек зависимостей.

```php
final class DeepDependentService
{
    public function __construct(
        private readonly DependentService $dependentService,
        private readonly string $configValue,
    ) {}

    public function getDependentService(): DependentService
    public function getConfigValue(): string
    public function getValueFromChain(): string
}
```

### AutowireableService
Сервис для тестирования autowiring без фабрики. PHP-DI создаёт его автоматически.

```php
final class AutowireableService
{
    public function __construct(
        private readonly string $name = 'autowireable',
    ) {}

    public function getName(): string
}
```

### AutowireableWithDependency
Сервис для тестирования autowiring с автоматическим внедрением зависимостей.

```php
final class AutowireableWithDependency
{
    public function __construct(
        private readonly TestService $testService,
    ) {}

    public function getTestService(): TestService
}
```
