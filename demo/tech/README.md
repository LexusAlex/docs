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

# Конфигурация

```
Каждый подпроект может содержать неограниченное кол-во модулей

├── shared/
│   └── src/
│       └── {Module}/
│           └── Configuration/
│               ├── common/          ← загружается всегда
│               ├── development/     ← загружается при ENVIRONMENT=development
│               ├── production/       ← загружается при ENVIRONMENT=production
│               └── test/             ← загружается при ENVIRONMENT=test
│
├── api/
│   └── src/
│       └── {Module}/
│           └── Configuration/
│               ├── common/
│               └── {environment}/   ← переопределяет shared
```

# Выполнение команд

Пример выполнения команды в контейнере.

- `make shared-composer ARGS='require --dev phpunit/phpunit'`
- `make shared-composer ARGS='require laminas/laminas-config-aggregator'`
- `make shared-composer ARGS='require php-di/php-di'`
- `make tools-composer ARGS='bin psalm remove --dev psalm/plugin-phpunit'`
- `make api-php ARGS=public/index.php`
- `make exec SERVICE=api-php-cli ARGS="ls -la /shared"`
- `make api-php ARGS=public/index.php`

# Команды

## shared

- shared-all-checks        
- shared-deptrac           
- shared-php               
         
- shared-phpunit-coverage  
- shared-require-checker   
- shared-unused
- shared-composer          
- shared-infection         
- shared-php-cs-fixer 
  shared-phpstan
- shared-phpunit           
- shared-psalm             
- shared-shell 