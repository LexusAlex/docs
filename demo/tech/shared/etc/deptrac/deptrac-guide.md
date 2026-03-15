# Конфигурация Deptrac

Документация по конфигу `etc/deptrac.yaml` для проекта tech/shared.

## Структура конфига

```yaml
deptrac:
  paths:
    - ../src
    - ../tests
  exclude_files:
    - '.*/vendor/.*'
    - '.*/var/.*'
  layers:
    - name: Application
      collectors:
        - type: classLike
          value: ^Shared\\Core\\(?!Test)
    - name: Test
      collectors:
        - type: classLike
          value: ^Shared\\Core\\Test
  ruleset:
    Application: []
    Test: [Application]
```

---

## paths — где искать PHP-файлы

```yaml
paths:
  - ../src
  - ../tests
```

Указывает deptrac в каких директориях сканировать PHP-файлы.

Пути относительны от расположения конфига (`etc/deptrac.yaml`):
- `../src` → `/shared/src/`
- `../tests` → `/shared/tests/`

---

## exclude_files — что исключить из анализа

```yaml
exclude_files:
  - '.*/vendor/.*'
  - '.*/var/.*'
```

Исключает файлы по regex-паттерну:

| Паттерн       | Что исключает                    |
|---------------|----------------------------------|
| `.*/vendor/.*` | Все файлы внутри папки vendor   |
| `.*/var/.*`   | Все файлы внутри папки var      |

Зачем: не нужно анализировать сторонние библиотеки.

---

## layers — слои приложения

Это главная часть конфига. Слои = группы классов, между которыми контролируются зависимости.

### Слой Application

```yaml
- name: Application
  collectors:
    - type: classLike
      value: ^Shared\\Core\\(?!Test)
```

| Параметр | Значение              | Пояснение                  |
|----------|----------------------|----------------------------|
| `name`   | `Application`        | Название слоя (любое)      |
| `type`   | `classLike`         | Искать по имени класса     |
| `value`  | `^Shared\\Core\\(?!Test)` | Regex-паттерн         |

**Regex разбор:**

```
^Shared\\Core\\(?!Test)
│   │   │  │    │    │
│   │   │  │    │    └─ Negative lookahead: НЕ содержит "Test"
│   │   │  │    └───── Обратная косая (экранирование)
│   │   │  └───────── Буквально: \
│   │   └───────────── Namespace: Core
│   └───────────────── Namespace: Shared
└───────────────────── Начало строки
```

**Результат:** Все классы в namespace `Shared\Core\`, кроме тех, что содержат `Test`.

**Какие классы попадают:**
- ✅ `Shared\Core\Bootstrap\Environment`
- ✅ `Shared\Core\Bootstrap\EnvironmentInterface`
- ❌ `Shared\Core\Test\Bootstrap\Environment\EnvironmentTest` (содержит Test)

---

### Слой Test

```yaml
- name: Test
  collectors:
    - type: classLike
      value: ^Shared\\Core\\Test
```

**Regex разбор:**

```
^Shared\\Core\\Test
│   │   │  │  └────── Буквально: Test
│   │   │  └───────── Буквально: \
│   │   └───────────── Namespace: Core
│   └───────────────── Namespace: Shared
└───────────────────── Начало строки
```

**Результат:** Все классы в namespace `Shared\Core\Test` и его подпапках.

**Какие классы попадают:**
- ✅ `Shared\Core\Test\Bootstrap\Environment\EnvironmentTest`

---

## ruleset — правила зависимостей

```yaml
ruleset:
  Application: []
  Test: [Application]
```

Формат: `layer_name: [разрешённые_зависимости]`

| Слой         | Разрешённые зависимости | Пояснение                    |
|--------------|------------------------|------------------------------|
| `Application`| `[]` (пусто)           | Не может зависеть ни от чего|
| `Test`       | `[Application]`       | Может зависеть от Application|

**Важно:** Если слой A зависит от слоя B, это должно быть явно разрешено. Всё остальное — **violation**.

---

## Как deptrac проверяет

### Пример 1: Всё OK

```
EnvironmentTest (Test) → Environment (Application)
```

1. deptrac видит: Test зависит от Application
2. Проверяет ruleset: `Test: [Application]` — разрешено ✅

### Пример 2: Violation

```
EnvironmentTest (Test) → SomeExternalClass (External)
```

1. deptrac видит: Test зависит от External
2. Проверяет ruleset: `Test: [Application]` — External не разрешён ❌
3. **Violation!**

---

## Визуальная схема

```
┌─────────────────────────────────────────────────────────────┐
│                         PROJECT                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────┐        ┌─────────────────────┐   │
│  │    Application      │        │        Test          │   │
│  │  (Core без Test)    │        │  (Core\Test)        │   │
│  │                     │        │                     │   │
│  │  Environment        │        │  EnvironmentTest    │   │
│  │  EnvironmentInterface│◄───────┤ (зависит от)      │   │
│  └─────────────────────┘        └─────────────────────┘   │
│           ▲                              │                   │
│           │      ПРАВИЛО:               │                   │
│           └──────────────────────────────┘                   │
│                  Test → [Application]                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Типы collectors

| Тип       | Описание                              |
|-----------|---------------------------------------|
| `classLike` | Ищет классы по regex-паттерну       |
| `directory`| Ищет классы в директории             |
| `interface`| Ищет только интерфейсы               |
| `trait`    | Ищет только трейты                   |

---

## Полезные флаги

### Запуск без фейла на uncovered

```bash
deptrac analyse --config-file=etc/deptrac.yaml --report-uncovered
```

### С фейлом на uncovered (строгий режим)

```bash
deptrac analyse --config-file=etc/deptrac.yaml --report-uncovered --fail-on-uncovered
```

**Примечание:** `--fail-on-uncovered` будет фейлиться на PHPUnit-зависимостях в тестах. Для тестов это нормально, поэтому рекомендуется использовать без этого флага.

---

## Добавление новых слоёв

Пример добавления слоя Domain:

```yaml
layers:
  - name: Domain
    collectors:
      - type: classLike
        value: ^Shared\\Domain\\
  
  - name: Application
    collectors:
      - type: classLike
        value: ^Shared\\Core\\(?!Test)
  
  - name: Test
    collectors:
      - type: classLike
        value: ^Shared\\Core\\Test

ruleset:
  Domain: []
  Application: [Domain]
  Test: [Domain, Application]
```

Это означает:
- Domain не зависит ни от чего
- Application может зависеть от Domain
- Test может зависеть от Domain и Application
