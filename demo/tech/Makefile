# Окружение
ENVIRONMENT ?= development
# Основной файл
COMPOSE_FILE ?= compose-$(ENVIRONMENT).yaml

# Конфигурация
include makefiles/$(ENVIRONMENT).mk

# Версии Образов
NGINX_IMAGE ?=nginx:1.28-alpine3.23
PHP_FPM_IMAGE ?=php:8.5-fpm-alpine3.23
PHP_CLI_IMAGE ?=php:8.5-cli-alpine3.23
XDEBUG_VERSION ?=3.5.1
COMPOSER_VERSION ?=2.9.5
# Переменные для сборки
BUILD_ARGS := --build-arg NGINX_IMAGE=$(NGINX_IMAGE) \
              --build-arg PHP_FPM_IMAGE=$(PHP_FPM_IMAGE) \
              --build-arg PHP_CLI_IMAGE=$(PHP_CLI_IMAGE) \
              --build-arg XDEBUG_VERSION=$(XDEBUG_VERSION) \
              --build-arg COMPOSER_VERSION=$(COMPOSER_VERSION)

API_SERVICE := api-php-cli
UI_SERVICE := ui-node-cli
# Передача команд в контейнер
ARGS ?=
SERVICE ?= # Для универсальной цели run

.PHONY: help build build-cache up down logs
# Цель по умолчанию
help:
	@echo "Доступные команды:"
	@echo "  make build               # Сборка контейнера без кеша ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make build-cache               # Сборка контейнера c кешем ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make rebuild SERVICE=... # Пересобрать ОДИН контейнер без кеша"
	@echo "  make rebuild-cache SERVICE=... # Пересобрать ОДИН контейнер с кешем"
	@echo "  make up               #  Поднять контейнеры ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make down              #  Остановить контейнеры ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make logs              #  Просмотр логов ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make shell-api ARGS='...' # Выполнить любую команду в бэкенде"
	@echo "  make php ARGS='...'      # Выполнить php команду make php ARGS='composer'"
	@echo "  make composer ARGS='...' # Выполнить composer команду"
	@echo "  make run SERVICE=... ARGS='...' # Выполнить команду в ЛЮБОМ сервисе"

# docker
build:
	docker compose -f $(COMPOSE_FILE) build $(BUILD_ARGS) --no-cache --pull
	docker image prune -f
build-cache:
	docker compose -f $(COMPOSE_FILE) build $(BUILD_ARGS) --pull
	docker image prune -f
rebuild:
	@if [ -z "$(SERVICE)" ]; then \
        echo "Ошибка: укажите сервис для пересборки. Пример: make rebuild SERVICE=$(API_SERVICE)"; \
        exit 1; \
    fi
	@echo "--- Пересборка сервиса $(SERVICE) без кеша ---"
	docker compose -f $(COMPOSE_FILE) build $(BUILD_ARGS) --no-cache --pull $(SERVICE)
	docker image prune -f

rebuild-cache:
	@if [ -z "$(SERVICE)" ]; then \
        echo "Ошибка: укажите сервис для пересборки. Пример: make rebuild-cache SERVICE=$(API_SERVICE)"; \
        exit 1; \
    fi
	@echo "--- Пересборка сервиса $(SERVICE) с использованием кеша ---"
	docker compose -f $(COMPOSE_FILE) build $(BUILD_ARGS) --pull $(SERVICE)
up:
	docker compose -f $(COMPOSE_FILE) up -d
down:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans
logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# Выполнение команды
shell-api:
	@if [ -z "$(ARGS)" ]; then \
		echo "Ошибка: укажите команду для выполнения через ARGS='...'"; \
		exit 1; \
	fi
	docker compose -f $(COMPOSE_FILE) run --rm $(API_SERVICE) $(ARGS)
php: shell-api
	@# Цель `php` просто вызывает `shell-api` с нужной командой
	$(eval ARGS := php $(ARGS))
composer: shell-api
    $(eval ARGS := composer $(ARGS))
run:
	@if [ -z "$(SERVICE)" ] || [ -z "$(ARGS)" ]; then \
        echo "Ошибка: укажите SERVICE и ARGS. Пример: make run SERVICE=backend ARGS='ls -la'"; \
        exit 1; \
    fi
	docker compose -f $(COMPOSE_FILE) run --rm $(SERVICE) $(ARGS)