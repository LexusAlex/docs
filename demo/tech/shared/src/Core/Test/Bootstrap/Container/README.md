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
├── Tests/                        # Тесты
│   ├── ContainerFactoryTest.php
│   └── README.md
└── fixtures/                     # Конфигурации
    └── configs/src/SomeModule/Configuration/
        ├── common/
        │   └── services.php
        └── production/
            └── services.php
```

## Services

Тестовые сервисы для проверки:
- Базовое получение сервиса
- Вложенные зависимости (A → B)
- Глубокая вложенность (A → B → C)
- Autowiring без фабрики
- Autowiring с зависимостями

## Tests

Unit-тесты для `ContainerFactory`:
- Создание контейнера
- Получение значений и сервисов
- Проверка наличия (has)
- Обработка исключений
- Разные типы конфигов
- Autowiring

## Fixtures

Конфигурационные файлы, имитирующие структуру проекта:
- `common/` - общие конфиги
- `production/` - конфиги для production окружения
