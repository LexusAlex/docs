# Container

Тесты для `ContainerFactory` и связанных компонентов.

## Структура

```
Container/
├── Services/                    # Тестовые сервисы
│   ├── TestService.php
│   ├── DependentService.php
│   ├── DeepDependentService.php
│   ├── AutowireableService.php
│   ├── AutowireableWithDependency.php
│   └── README.md
├── Tests/                        # Тесты (23 кейса)
│   ├── ContainerFactoryTest.php
│   └── README.md
└── fixtures/                     # Конфигурации
    └── configs/src/SomeModule/Configuration/
        ├── common/
        │   └── services.php
        └── production/
            └── services.php
```

## Покрытие тестов

### Базовое
- Создание контейнера
- Получение значений и сервисов

### Зависимости
- Вложенные (A → B)
- Глубокие (A → B → C)
- Autowiring

### Конфиги
- string, int, float, bool
- true/false, 0, negative, null
- array (включая пустой)
- empty string

### Поведение
- Singleton (тот же экземпляр)
- has() для существующих/несуществующих
- Исключения при отсутствии сервиса

### Окружения
- test vs production конфиги

## Запуск тестов

```bash
make shared-phpunit     # PHPUnit
make shared-phpstan     # PHPStan
make shared-psalm       # Psalm
```
