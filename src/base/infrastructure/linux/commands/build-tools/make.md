# make

**Уровень:** Средний

Утилита для автоматизации сборки проектов. Читает инструкции из файла `Makefile` (или `makefile`) и выполняет указанные задачи в правильном порядке с учётом зависимостей.

## Синтаксис

```bash
make [опции] [цель]
make                        # выполнить цель по умолчанию (первая в Makefile)
make build                  # выполнить цель build
make -j4 build              # параллельная сборка в 4 потока
make -n build               # показать команды без выполнения
make -C /path/to/project    # выполнить в указанной директории
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-f файл`, `--file` | Указать файл с инструкциями (по умолчанию `Makefile`) |
| `-C каталог`, `--directory` | Перейти в каталог перед выполнением |
| `-j [N]`, `--jobs` | Параллельная сборка (N потоков, без N — без ограничений) |
| `-n`, `--just-print` | Показать команды без выполнения (dry run) |
| `-B`, `--always-make` | Пересобрать все цели принудительно |
| `-k`, `--keep-going` | Продолжать при ошибках |
| `-s`, `--silent` | Тихий режим (не показывать выполняемые команды |
| `-q`, `--question` | Проверить, нужно ли пересобирать (код возврата) |
| `-t`, `--touch` | Обновить timestamps целей без сборки |
| `-d`, `--debug` | Отладочный вывод |
| `--warn-undefined-variables` | Предупреждать о неопределённых переменных |
| `-e`, `--environment-overrides` | Переменные окружения перекрывают переменные Makefile |
| `-I каталог`, `--include-dir` | Дополнительный каталог для поиска включаемых файлов |
| `-o цель`, `--old-file` | Считать цель «старой» (не пересобирать) |
| `-W цель`, `--what-if` | Считать цель «новой» (принудительно пересобрать) |
| `-v`, `--version` | Показать версию |

## Структура Makefile

### Базовый синтаксис

```makefile
# цель: зависимости
# 	команда (с табуляцией!)

цель: зависимость1 зависимость2
	команда1
	команда2
```

### Простой пример

```makefile
# Makefile
all: build

build:
	gcc -o myapp main.c utils.c

clean:
	rm -f myapp *.o

install: build
	cp myapp /usr/local/bin/

.PHONY: all clean install
```

### Переменные

```makefile
# Определение переменных
CC = gcc
CFLAGS = -Wall -Wextra -O2
LDFLAGS = -lm
TARGET = myapp
SOURCES = main.c utils.c
OBJECTS = $(SOURCES:.c=.o)

# Использование
build: $(OBJECTS)
	$(CC) $(LDFLAGS) -o $(TARGET) $(OBJECTS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
```

### Автоматические переменные

| Переменная | Описание |
|-----------|----------|
| `$@` | Имя цели |
| `$<` | Имя первого условия (prerequisite) |
| `$^` | Все условия (уникальные) |
| `$?` | Условия, которые новее цели |
| `$*` | Строковый шаблон (stem) без `%` |
| `$(@D)` | Каталог цели |
| `$(@F)` | Имя файла цели |
| `$(<D)` | Каталог первого условия |
| `$(<F)` | Имя файла первого условия |

### Шаблонные правила

```makefile
# Правило для компиляции всех .c в .o
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Правило для всех файлов в подкаталоге
src/%.o: src/%.c
	$(CC) $(CFLAGS) -I include -c $< -o $@
```

### Условные конструкции

```makefile
# Условия
ifeq ($(OS),Windows_NT)
    EXT = .exe
else
    EXT =
endif

# Проверка переменной
ifdef DEBUG
    CFLAGS += -g -DDEBUG
else
    CFLAGS += -O2
endif

# ?= — присвоить, если не определено
CC ?= gcc
PREFIX ?= /usr/local
```

### Функции

```makefile
# Подстановка
SOURCES = main.c utils.c net.c
OBJECTS = $(SOURCES:.c=.o)
# Результат: main.o utils.o net.o

# Фильтр
C_SOURCES = $(filter %.c, $(SOURCES))
HEADERS = $(filter %.h, $(SOURCES))

# Поиск файлов
SRCS = $(wildcard src/*.c)
OBJS = $(SRCS:.c=.o)

# Отсев
TESTS = $(filter-out main.c, $(SRCS))

# Суффикс
BASENAMES = $(basename $(SRCS))

# Сортировка
DIRS = $(sort src lib test)
```

### Включение других файлов

```makefile
include common.mk
-include optional.mk          # не ошибка, если файл не найден
include config/*.mk
```

### Phony targets (фиктивные цели)

```makefile
.PHONY: all clean install test help

all: build

build:
	$(CC) -o $(TARGET) $(SOURCES)

clean:
	rm -f $(TARGET) *.o

install: build
	install -m 755 $(TARGET) $(PREFIX)/bin/

test:
	./run_tests.sh

help:
	@echo "Доступные цели:"
	@echo "  build   - Собрать проект"
	@echo "  clean   - Очистить артефакты"
	@echo "  install - Установить"
	@echo "  test    - Запустить тесты"
```

## Примеры

### 1. Простой C-проект

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -O2
TARGET = myapp

SRCS = main.c utils.c
OBJS = $(SRCS:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(TARGET) $(OBJS)

.PHONY: all clean
```

### 2. Проект с подкаталогами

```makefile
CC = gcc
CFLAGS = -Wall -O2 -I include

SRCS = $(wildcard src/*.c)
OBJS = $(SRCS:.c=.o)
TARGET = build/app

all: $(TARGET)

$(TARGET): $(OBJS)
	@mkdir -p build
	$(CC) $(CFLAGS) -o $@ $^

src/%.o: src/%c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -rf build src/*.o

.PHONY: all clean
```

### 3. Сборка с debug/release

```makefile
CC = gcc
TARGET = myapp

ifdef DEBUG
    CFLAGS = -Wall -g -DDEBUG
    BUILD_DIR = build/debug
else
    CFLAGS = -Wall -O2
    BUILD_DIR = build/release
endif

SRCS = $(wildcard src/*.c)
OBJS = $(patsubst src/%.c,$(BUILD_DIR)/%.o,$(SRCS))

all: $(BUILD_DIR)/$(TARGET)

$(BUILD_DIR)/$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

$(BUILD_DIR)/%.o: src/%.c | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

$(BUILD_DIR):
	mkdir -p $@

clean:
	rm -rf build

.PHONY: all clean
```

```bash
make                # release сборка
make DEBUG=1        # debug сборка
```

### 4. Автоматическая зависимость от заголовков

```makefile
CC = gcc
CFLAGS = -Wall -O2 -MMD -MP

SRCS = $(wildcard src/*.c)
OBJS = $(SRCS:.c=.o)
DEPS = $(OBJS:.o=.d)

TARGET = myapp

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

-include $(DEPS)

clean:
	rm -f $(TARGET) $(OBJS) $(DEPS)

.PHONY: all clean
```

### 5. Тестирование

```makefile
.PHONY: test test-unit test-integration coverage

test: test-unit test-integration

test-unit:
	@echo "Unit тесты..."
	python -m pytest tests/unit -v

test-integration:
	@echo "Интеграционные тесты..."
	python -m pytest tests/integration -v

coverage:
	python -m pytest --cov=src --cov-report=html tests/
	@echo "Отчёт: htmlcov/index.html"
```

### 6. Деплой

```makefile
.PHONY: deploy deploy-staging deploy-production

DEPLOY_HOST = server.example.com
DEPLOY_PATH = /opt/myapp

deploy-staging:
	rsync -avz --delete build/ staging:$(DEPLOY_PATH)/
	ssh staging 'systemctl restart myapp'

deploy-production:
	@read -p "Вы уверены? [y/N] " confirm; \
	[ "$$confirm" = "y" ] || exit 1
	rsync -avz --delete build/ $(DEPLOY_HOST):$(DEPLOY_PATH)/
	ssh $(DEPLOY_HOST) 'systemctl restart myapp'
```

### 7. Docker

```makefile
.PHONY: docker-build docker-run docker-push

IMAGE_NAME = myapp
IMAGE_TAG = latest

docker-build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

docker-run: docker-build
	docker run --rm -p 8080:8080 $(IMAGE_NAME):$(IMAGE_TAG)

docker-push: docker-build
	docker push $(IMAGE_NAME):$(IMAGE_TAG)
```

### 8. Dry run (предварительный просмотр)

```bash
make -n build
# Показывает команды, которые будут выполнены, без выполнения

make -n install
# Показать, что будет сделано при install
```

### 9. Параллельная сборка

```bash
make -j$(nproc)       # использовать все ядра CPU
make -j4              # 4 потока
make -j               # без ограничений (может быть проблемно)
```

## Практические сценарии

### Сборка C/C++ проекта

```makefile
CXX = g++
CXXFLAGS = -std=c++17 -Wall -O2
TARGET = myapp

SRCS = $(wildcard src/*.cpp)
OBJS = $(SRCS:.cpp=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $@ $^

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(TARGET) $(OBJS)

.PHONY: all clean
```

### Go-проект

```makefile
BINARY = myapp
VERSION = $(shell git describe --tags --always)

build:
	go build -ldflags "-X main.version=$(VERSION)" -o $(BINARY)

test:
	go test ./...

lint:
	golangci-lint run

clean:
	rm -f $(BINARY)

.PHONY: build test lint clean
```

### Frontend проект

```makefile
.PHONY: install dev build lint test clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

test:
	npm test

clean:
	rm -rf node_modules dist
```

## Советы

:::tip
Используйте `.PHONY` для всех целей, которые не создают файлы (clean, install, test). Это предотвращает конфликты с файлами того же имени.
:::

:::warning
Команды в Makefile должны начинаться с табуляции, не пробелов. Ошибка "missing separator" обычно означает пробелы вместо табуляции.
:::

:::tip
`make -n` (dry run) показывает, что будет выполнено без реального выполнения — полезно для отладки.
:::

:::tip
Автоматические переменные (`$@`, `$<`, `$^`) делают правила более通用ными и переиспользуемыми.
:::

## Связки с другими командами

- **gcc/g++/clang** — компиляция исходного кода
- **git** — получение версий, хешей коммитов
- **bash scripts** — сложная логика в рецептах
- **docker** — сборка и публикация образов
- **rsync/scp** — деплой артефактов

## См. также

- [bash-scripts](../bash-scripts/) — скрипты для автоматизации
- [git](../../tools/vcs/git/) — система контроля версий
