# Окружение
ENVIRONMENT ?= development
# Основной файл
COMPOSE_FILE ?= compose-$(ENVIRONMENT).yaml
# Версии Образов
NGINX_IMAGE ?=nginx:1.28-alpine3.23
PHP_FPM_IMAGE ?=php:8.5-fpm-alpine3.23
PHP_CLI_IMAGE ?=php:8.5-cli-alpine3.23
XDEBUG_VERSION ?=3.5.1
COMPOSER_VERSION ?=2.9.5
# Конфигурация
include makefiles/$(ENVIRONMENT).mk

.PHONY: help build build-cache up down logs
# Цель по умолчанию
help:
	@echo "Доступные команды:"
	@echo "  make build               # Сборка контейнера без кеша ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make build-cache               # Сборка контейнера c кешем ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make up               #  Поднять контейнеры ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make down              #  Остановить контейнеры ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make logs              #  Просмотр логов ENVIRONMENT=$(ENVIRONMENT)"

# docker
build:
	docker compose -f $(COMPOSE_FILE) build \
        --build-arg NGINX_IMAGE=$(NGINX_IMAGE) \
        --build-arg PHP_FPM_IMAGE=$(PHP_FPM_IMAGE) \
        --build-arg PHP_CLI_IMAGE=$(PHP_CLI_IMAGE) \
        --build-arg XDEBUG_VERSION=$(XDEBUG_VERSION) \
        --build-arg COMPOSER_VERSION=$(COMPOSER_VERSION) \
        --no-cache --pull
	docker image prune -f
build-cache:
	docker compose -f $(COMPOSE_FILE) build \
		--build-arg NGINX_IMAGE=$(NGINX_IMAGE) \
		--build-arg PHP_FPM_IMAGE=$(PHP_FPM_IMAGE) \
		--build-arg PHP_CLI_IMAGE=$(PHP_CLI_IMAGE) \
		--build-arg XDEBUG_VERSION=$(XDEBUG_VERSION) \
		--build-arg COMPOSER_VERSION=$(COMPOSER_VERSION) \
		--pull
	docker image prune -f
up:
	docker compose -f $(COMPOSE_FILE) up -d
down:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans
logs:
	docker compose -f $(COMPOSE_FILE) logs -f