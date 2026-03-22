# Environment

Класс для работы с переменными окружения.

## Назначение

Предоставляет унифицированный интерфейс для чтения переменных окружения с поддержкой значений по умолчанию.

## Интерфейс

`EnvironmentInterface` определяет метод:

```php
public function get(string $name, ?string $default = null): string;
```

## Использование

### Базовое получение значения

```php
$environment = new Environment();
$value = $environment->get('DATABASE_HOST');
```

### Значение по умолчанию

```php
$value = $environment->get('DATABASE_HOST', 'localhost');
```

### Обработка отсутствия переменной

```php
// С default = null выбрасывается RuntimeException
$environment->get('NON_EXISTENT_VAR'); // → RuntimeException

// С default = '' возвращается пустая строка
$value = $environment->get('NON_EXISTENT_VAR', ''); // → ''
```

## Диаграмма поведения метода get()

```
getenv($name)
     │
     ▼
┌─────────────────┐
│  getenv() вернул │
│  значение?        │
└────────┬────────┘
         │
    ┌────┴────┐
    │   Да    │          Возвращает значение
    └────┬────┘
         │ Нет
         ▼
┌─────────────────┐
│ default != null │
└────────┬────────┘
         │
    ┌────┴────┐
    │   Да    │          Возвращает default
    └────┬────┘
         │ Нет
         ▼
┌─────────────────┐
│ RuntimeException│
└─────────────────┘
```

## Примеры в коде

См. тесты: `src/Core/Test/Bootstrap/Environment/EnvironmentTest.php`
