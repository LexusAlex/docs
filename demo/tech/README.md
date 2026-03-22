# Окружения

## development

- Написание кода и его отладка
- Сам разработчик у себя на машине
- Используются тестовые мусорные данные

## test

- Имитация продакшена
- Код видят другие люди, а не только разработчик
- Предсказуемый набор тестовых данных, для воспроизведения тестов

## production

- С системой работают реальные пользователи
- Реальные данные
- Бесшовный деплой
- Главное производительность и стабильность

# Общая структура

- `tools` - различные инструменты для тестирования кода
- `shared`  - общий код для разных частей приложения
- `api` - непосредственно api часть приложения
- `ui` - ui часть приложения

# Выполнение команд

Пример выполнения команды в контейнере.

- `make shared-composer ARGS='require --dev phpunit/phpunit'`
- `make shared-composer ARGS='require laminas/laminas-config-aggregator'`
- `make tools-composer ARGS='bin psalm remove --dev psalm/plugin-phpunit'`
- `make api-php ARGS=public/index.php`
- `make exec SERVICE=api-php-cli ARGS="ls -la /shared"`
- `make api-php ARGS=public/index.php`