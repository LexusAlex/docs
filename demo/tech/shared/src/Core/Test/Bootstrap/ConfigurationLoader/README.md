# ConfigurationLoader Tests

## Overview

Тесты покрывают функциональность `ConfigurationLoader` с различными сценариями использования.

## Test Structure

```
ConfigurationLoaderTest.php
├── Helper Methods
│   ├── loadConfig()
│   ├── getSection(array, key)
│   ├── setComplexEnvironment(env)
│   └── resetToDefaultEnvironment()
├── Тесты базовой загрузки
├── Тесты переопределения
├── Тесты переменных окружения (с DataProvider)
└── Тесты с complex fixtures
```

## Test Cases

### 1. loadMergesSharedCommonConfig
Проверяет загрузку общих конфигов из shared.

**Setup:** `APPLICATION_ENVIRONMENT=test`, `CONFIG_SHARED_PATH=fixtures/shared`

**Asserts:**
- `$config['shared']['key'] === 'shared_value'`
- `$config['shared']['module'] === 'SomeModule'`

---

### 2. loadMergesSharedEnvironmentConfig
Проверяет загрузку конфигов специфичных для окружения из shared.

**Setup:** `APPLICATION_ENVIRONMENT=test`

**Asserts:**
- `$config['shared']['environment'] === 'test'`

---

### 3. loadMergesProjectCommonConfig
Проверяет загрузку общих конфигов из project.

**Asserts:**
- `$config['project']['key'] === 'project_value'`
- `$config['project']['module'] === 'OtherModule'`

---

### 4. loadMergesProjectEnvironmentConfig
Проверяет загрузку конфигов специфичных для окружения из project.

**Asserts:**
- `$config['project']['environment'] === 'test'`

---

### 5. projectOverridesShared
Проверяет что project конфиги переопределяют shared конфиги.

**Setup:** В project есть ключ `override` который переопределяет shared.

**Asserts:**
- `$config['project']['override'] === 'project_overrides_shared'`

---

### 6. loadWithoutProjectRootThrowsException
Проверяет что при отсутствии project root выбрасывается исключение.

**Setup:** `ConfigurationLoader::projectRoot('')`, `putenv('CONFIG_PROJECT_ROOT')` (удалено)

**Asserts:**
- Выбрасывается `RuntimeException`
- Сообщение: `'Project root path is not set or does not exist'`

---

### 6a. loadWithNonexistentProjectRootThrowsException
Проверяет что при несуществующем project root выбрасывается исключение.

**Setup:** `ConfigurationLoader::projectRoot('/nonexistent/path')`

**Asserts:**
- Выбрасывается `RuntimeException`
- Сообщение: `'Project root path is not set or does not exist'`

---

### 7. loadWithDefaultSharedPath
Проверяет работу с дефолтным путём к shared (когда `CONFIG_SHARED_PATH` не установлен).

**Setup:** `putenv('CONFIG_SHARED_PATH')` (удалено), используется `__DIR__`

**Asserts:**
- `$config['project']` существует
- `$config['core']['loaded'] === true`
- `$config['core']['default_path'] === true`

---

### 8. projectOverridesSharedNestedArrays
Проверяет глубокое слияние вложенных массивов.

**Setup:** shared содержит `nested.key`, project переопределяет только `nested.key`

**Asserts:**
- `$config['shared']['nested']['key'] === 'project_override'`
- `$config['shared']['nested']['preserved'] === 'shared_value'`

---

### 9. projectCanAddNewKeys
Проверяет что project может добавлять новые ключи.

**Setup:** В project определён `project_only` ключ.

**Asserts:**
- `$config['shared']['project_only'] === 'new_key'`

---

### 10. multipleModulesFromSharedAreLoaded
Проверяет загрузку конфигов из нескольких модулей.

**Asserts:**
- `$config['shared']` существует
- `$config['project']` существует

---

### 11. environmentCommonConfigIsAlwaysLoaded
Проверяет что `common/` конфиги загружаются всегда.

**Setup:** `APPLICATION_ENVIRONMENT=common`

**Asserts:**
- `$config['shared']['common_key'] === 'common_value'`

---

### 12. environmentOverridesCommon (DataProvider)
Проверяет что environment-специфичные конфиги переопределяют common.

**DataProvider cases:**
| Environment | host | debug | ssl |
|-------------|------|-------|-----|
| production | 'project-db.example.com' | false | true |
| development | 'dev-db.local' | true | - |

**Setup:** 
- `CONFIG_SHARED_PATH=fixtures/complex/shared`
- `projectRoot=fixtures/complex/project`

**Asserts (production):**
- `$config['database']['host'] === 'project-db.example.com'`
- `$config['database']['debug'] === false`
- `$config['database']['ssl'] === true`

**Asserts (development):**
- `$config['database']['host'] === 'dev-db.local'`
- `$config['database']['debug'] === true`

---

### 13. deepArrayMergeWorks
Проверяет глубокое слияние с сохранением значений из разных уровней.

**Setup:** `APPLICATION_ENVIRONMENT=production`

**Fixtures:**
- shared/production: `database.host`, `ssl`
- project/common: `database.port`, `database.driver`, `database.options`

**Asserts:**
- `$config['database']['host'] === 'project-db.example.com'`
- `$config['database']['port'] === 5432`
- `$config['database']['driver'] === 'pgsql'`
- `$config['database']['name'] === 'project_db'`
- `$config['database']['options']['timeout'] === 60`
- `$config['database']['options']['persistent'] === true`

---

### 14. differentEnvironmentsProduceDifferentResults
Проверяет что разные окружения дают разные результаты.

**Setup:** Сначала `test`, потом `production`

**Asserts:**
- `$testConfig !== $productionConfig`

---

### 15. projectRootCanBeSetViaEnvironmentVariable
Проверяет установку project root через `CONFIG_PROJECT_ROOT`.

**Setup:** `CONFIG_PROJECT_ROOT=fixtures/project`

**Asserts:**
- `$config['project']` существует

---

### 16. projectRootMethodTakesPrecedence
Проверяет что метод `projectRoot()` приоритетнее переменной окружения.

**Setup:** `CONFIG_PROJECT_ROOT=/custom/path`, но `projectRoot()` указывает на реальный путь

**Asserts:**
- `$config['project']` существует
- `$config['shared']` существует

---

### 17. emptyStringProjectRootResetsToEnv
Проверяет что пустая строка сбрасывает project root к значению из env.

**Setup:** 
1. `projectRoot('/path1')`
2. `projectRoot('')` (сброс)
3. `CONFIG_PROJECT_ROOT=fixtures/project`

**Asserts:**
- `$config['project']` существует

---

### 18. configsAreMergedInCorrectOrder
Проверяет правильный порядок объединения конфигов.

**Setup:** `APPLICATION_ENVIRONMENT=production`

**Order (приоритет):**
1. shared/common
2. shared/production
3. project/common
4. project/production

**Asserts:**
- `$config['database']['host'] === 'project-db.example.com'`
- `$config['database']['port'] === 5432`
- `$config['database']['ssl'] === true`

---

### 19. loadHandlesMultipleConfigFilesInSameDirectory
Проверяет загрузку нескольких файлов из одной директории.

**Setup:** `APPLICATION_ENVIRONMENT=common`

**Fixtures:**
- database.php
- cache.php
- routes.php

**Asserts:**
- `$config['database']` существует
- `$config['cache']` существует
- `$config['routes']` существует

---

### 20. scalarValuesCanBeOverridden
Проверяет переопределение скалярных значений.

**Setup:** `APPLICATION_ENVIRONMENT=production`

**Fixtures:**
- shared/common: `database.debug = false`, `max_connections = 100`
- shared/production: `database.debug = false`
- project/production: `database.host = '...'`

**Asserts:**
- `$config['database']['debug'] === false`
- `$config['max_connections'] === 100`

---

## Fixtures Structure

```
fixtures/
├── shared/
│   └── src/
│       └── SomeModule/
│           └── Configuration/
│               ├── common/
│               │   ├── shared.php
│               │   └── shared_config.php
│               ├── production/
│               │   └── database.php
│               └── test/
│                   └── shared_env_config.php
├── project/
│   └── src/
│       └── OtherModule/
│           └── Configuration/
│               ├── common/
│               │   ├── project_config.php
│               │   └── override.php
│               └── test/
│                   └── project_env_config.php
└── complex/
    ├── shared/
    │   └── src/
    │       ├── Module1/
    │       │   └── Configuration/
    │       │       ├── common/
    │       │       │   ├── base.php
    │       │       │   ├── cache.php
    │       │       │   ├── database.php
    │       │       │   └── shared.php
    │       │       ├── production/
    │       │       │   └── database.php
    │       │       └── development/
    │       │           └── database.php
    │       └── Module2/
    │           └── Configuration/
    │               └── common/
    │                   └── logger.php
    └── project/
        └── src/
            ├── ProjectModule1/
            │   └── Configuration/
            │       ├── common/
            │       │   └── base.php
            │       ├── production/
            │       │   └── database.php
            │       └── development/
            │           └── database.php
            └── ProjectModule2/
                └── Configuration/
                    └── common/
                        └── routes.php
```

## Metrics

- **Tests:** 21 (один с DataProvider: 2 cases = 22 тестовых прогона)
- **Assertions:** 81
- **Mutation Coverage:** 100%
- **Mutation Score Index (MSI):** 100%
