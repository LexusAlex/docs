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
SHARED_SERVICE := shared-php-cli
UI_SERVICE := ui-php-cli
# Передача команд в контейнер
ARGS ?=
SERVICE ?= # Для универсальной цели run

.PHONY: help build build-cache rebuild rebuild-cache up down logs
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
	@echo "  make exec SERVICE=... ARGS='...' # Выполнить команду в ЛЮБОМ сервисе"

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
# Универсальная команда
# Эта переменная будет пустой, если пользователь не указал ARGS=...
USER_ARGS := $(ARGS)
# Что запускать в сервисе
define RUN_IN_SERVICE
	$(eval SERVICE_TO_RUN := $(1))
	$(eval ARGS_TO_RUN := $(2))

	@if [ -z "$(SERVICE_TO_RUN)" ] || [ -z "$(USER_ARGS)" ]; then \
		echo "Ошибка: не указаны SERVICE или ARGS."; \
		echo "Пример: make exec SERVICE=api-php-cli ARGS='ls -la'"; \
		exit 1; \
	fi
	@echo "==> Выполняю команду в сервисе '$(SERVICE_TO_RUN)': $(ARGS_TO_RUN)"
	docker compose -f $(COMPOSE_FILE) run --rm $(SERVICE_TO_RUN) $(ARGS_TO_RUN)
endef
# Универсальная цель для любого сервиса
exec:
	$(call RUN_IN_SERVICE,$(SERVICE),$(USER_ARGS))
api-shell:
	$(call RUN_IN_SERVICE,$(API_SERVICE),$(USER_ARGS))
api-php:
	$(call RUN_IN_SERVICE,$(API_SERVICE),php $(USER_ARGS))
api-composer:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer $(USER_ARGS))
