# Окружение
ENVIRONMENT ?= development
# Основной файл
COMPOSE_FILE ?= compose-$(ENVIRONMENT).yaml
# Переменные окружений
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

# Передача команд в контейнер
ARGS ?=
SERVICE ?= # Для универсальной цели run

.PHONY: help build build-cache rebuild rebuild-cache up down logs check-updates
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
	@echo "  make exec SERVICE=... ARGS='...' # Выполнить команду в ЛЮБОМ сервисе"

check-updates:
	@echo "=== Проверка обновлений Docker образов ==="
	@echo ""
	@# Nginx - ищем теги типа 1.28-alpine3.21
	@echo ">>> Nginx (текущая: $(NGINX_IMAGE))"
	@curl -s "https://hub.docker.com/v2/repositories/library/nginx/tags/?page_size=100" | \
        grep -oP '"name":"\K[^"]+' | \
        grep -E '^[0-9]+\.[0-9]+-alpine[0-9]+\.[0-9]+$$' | \
        sort -Vr | head -5 | while read tag; do \
            echo "    Доступно: $$tag"; \
        done
	@echo ""
	@# PHP FPM - стабильные версии без rc
	@echo ">>> PHP-FPM (текущая: $(PHP_FPM_IMAGE))"
	@curl -s "https://hub.docker.com/v2/repositories/library/php/tags/?page_size=100" | \
        grep -oP '"name":"\K[^"]+' | \
        grep -E '^[0-9]+\.[0-9]+-fpm-alpine[0-9]+\.[0-9]+$$' | \
        sort -Vr | head -5 | while read tag; do \
            echo "    Доступно: $$tag"; \
        done
	@echo ""
	@# PHP CLI - стабильные версии без rc
	@echo ">>> PHP-CLI (текущая: $(PHP_CLI_IMAGE))"
	@curl -s "https://hub.docker.com/v2/repositories/library/php/tags/?page_size=100" | \
        grep -oP '"name":"\K[^"]+' | \
        grep -E '^[0-9]+\.[0-9]+-cli-alpine[0-9]+\.[0-9]+$$' | \
        sort -Vr | head -5 | while read tag; do \
            echo "    Доступно: $$tag"; \
        done
	@echo ""
	@echo "=== GitHub Releases ==="
	@echo -n "Composer (текущая: $(COMPOSER_VERSION)): "
	@curl -s "https://api.github.com/repos/composer/composer/releases/latest" | \
        grep -oP '"tag_name": "\K(.*)(?=")' | xargs -I {} echo "Последняя: {}"
	@echo -n "Xdebug (текущая: $(XDEBUG_VERSION)): "
	@curl -s "https://api.github.com/repos/xdebug/xdebug/releases/latest" | \
        grep -oP '"tag_name": "\K(.*)(?=")' | xargs -I {} echo "Последняя: {}"
	@echo ""
	@echo "==========================="

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

# api
include api/api.mk
# shared
include shared/shared.mk
# ui
include ui/ui.mk

#php-all: ARGS := "-v"
# make php-all-composer ARGS="i"
php-all: api-php shared-php
php-all-composer: api-composer shared-composer
