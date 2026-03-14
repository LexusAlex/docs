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
	@echo "  make check-updates       # Проверить обновления образов и пакетов"
	@echo "  make build               # Сборка контейнера без кеша ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make build-cache               # Сборка контейнера c кешем ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make rebuild SERVICE=... # Пересобрать ОДИН контейнер без кеша"
	@echo "  make rebuild-cache SERVICE=... # Пересобрать ОДИН контейнер с кешем"
	@echo "  make up               #  Поднять контейнеры ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make down              #  Остановить контейнеры ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make logs              #  Просмотр логов ENVIRONMENT=$(ENVIRONMENT)"
	@echo "  make exec SERVICE=... ARGS='...' # Выполнить команду в ЛЮБОМ сервисе"

check-updates:
	@echo "=== Docker Images ==="
	@echo ""
	@@if command -v jq >/dev/null 2>&1; then \
		echo ">>> Nginx (current: $(NGINX_IMAGE))"; \
		curl -s "https://hub.docker.com/v2/repositories/library/nginx/tags/?page_size=100" | \
			jq -r '.results[].name' | \
			grep -E '^[0-9]+\.[0-9]+-alpine[0-9]+\.[0-9]+$$' | \
			sort -Vr | head -3 | while read tag; do \
				if [ "$$tag" = "$(NGINX_IMAGE)" ]; then \
					echo -e "    \033[32m$$tag (current)\033[0m"; \
				else \
					echo "    $$tag"; \
				fi; \
			done; \
		echo ""; \
		echo ">>> PHP-FPM (current: $(PHP_FPM_IMAGE))"; \
		curl -s "https://hub.docker.com/v2/repositories/library/php/tags/?page_size=100" | \
			jq -r '.results[].name' | \
			grep -E '^[0-9]+\.[0-9]+-fpm-alpine[0-9]+\.[0-9]+$$' | \
			sort -Vr | head -3 | while read tag; do \
				if [ "$$tag" = "$(PHP_FPM_IMAGE)" ]; then \
					echo -e "    \033[32m$$tag (current)\033[0m"; \
				else \
					echo "    $$tag"; \
				fi; \
			done; \
		echo ""; \
		echo ">>> PHP-CLI (current: $(PHP_CLI_IMAGE))"; \
		curl -s "https://hub.docker.com/v2/repositories/library/php/tags/?page_size=100" | \
			jq -r '.results[].name' | \
			grep -E '^[0-9]+\.[0-9]+-cli-alpine[0-9]+\.[0-9]+$$' | \
			sort -Vr | head -3 | while read tag; do \
				if [ "$$tag" = "$(PHP_CLI_IMAGE)" ]; then \
					echo -e "    \033[32m$$tag (current)\033[0m"; \
				else \
					echo "    $$tag"; \
				fi; \
			done; \
	else \
		echo "jq not installed. Install: apt install jq"; \
		echo ""; \
		echo ">>> Nginx (current: $(NGINX_IMAGE))"; \
		curl -s "https://hub.docker.com/v2/repositories/library/nginx/tags/?page_size=100" | \
			grep -oP '"name":"\K[^"]+' | \
			grep -E '^[0-9]+\.[0-9]+-alpine[0-9]+\.[0-9]+$$' | \
			sort -Vr | head -3 | while read tag; do \
				echo "    $$tag"; \
			done; \
		echo ""; \
		echo ">>> PHP-FPM (current: $(PHP_FPM_IMAGE))"; \
		curl -s "https://hub.docker.com/v2/repositories/library/php/tags/?page_size=100" | \
			grep -oP '"name":"\K[^"]+' | \
			grep -E '^[0-9]+\.[0-9]+-fpm-alpine[0-9]+\.[0-9]+$$' | \
			sort -Vr | head -3 | while read tag; do \
				echo "    $$tag"; \
			done; \
		echo ""; \
		echo ">>> PHP-CLI (current: $(PHP_CLI_IMAGE))"; \
		curl -s "https://hub.docker.com/v2/repositories/library/php/tags/?page_size=100" | \
			grep -oP '"name":"\K[^"]+' | \
			grep -E '^[0-9]+\.[0-9]+-cli-alpine[0-9]+\.[0-9]+$$' | \
			sort -Vr | head -3 | while read tag; do \
				echo "    $$tag"; \
			done; \
	fi
	@echo ""
	@echo "=== GitHub Releases ==="
	@( \
		latest=$$(curl -s "https://api.github.com/repos/composer/composer/releases/latest" | grep -oP '"tag_name": "\K[^"]+'); \
		printf "Composer (current: $(COMPOSER_VERSION)): "; \
		if [ "$(COMPOSER_VERSION)" = "$$latest" ]; then \
			echo "$$latest (current)"; \
		else \
			echo "$$latest (update available)"; \
		fi \
	)
	@( \
		latest=$$(curl -s "https://api.github.com/repos/xdebug/xdebug/releases/latest" | grep -oP '"tag_name": "\K[^"]+'); \
		printf "Xdebug (current: $(XDEBUG_VERSION)): "; \
		if [ "$(XDEBUG_VERSION)" = "$$latest" ]; then \
			echo "$$latest (current)"; \
		else \
			echo "$$latest (update available)"; \
		fi \
	)
	@echo ""
	@echo "=== NPM Packages ==="
	@docker compose run --rm node-cli npx npm-check-updates --filterVersion '>=1.0.0' --format group 2>/dev/null || echo "No updates or npm-check-updates not configured"
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
	$(eval SERVICE_WORKDIR := /$(word 1,$(subst -, ,$(SERVICE_TO_RUN))))

	@if [ -z "$(SERVICE_TO_RUN)" ] || [ -z "$(ARGS_TO_RUN)" ]; then \
		echo "Ошибка: не указаны SERVICE или ARGS."; \
		echo "Пример использования в Makefile: $$(call RUN_IN_SERVICE,api-php-cli,ls -la)"; \
		exit 1; \
	fi
	@echo "==> Выполняю в '$(SERVICE_TO_RUN)' (в $(SERVICE_WORKDIR)): $(ARGS_TO_RUN)"
    @docker compose -f $(COMPOSE_FILE) run --workdir $(SERVICE_WORKDIR) --rm $(SERVICE_TO_RUN) $(ARGS_TO_RUN)
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
# ui
include tools/tools.mk

# main
PHP_CLI_SERVICES := shared api ui tools
# Эта цель выполняет произвольную команду composer для всех сервисов.
# Использование: make composer-all COMMAND="install"
.PHONY: composer-all
composer-all:
	@if [ -z "$(COMMAND)" ]; then \
		echo "Ошибка: укажите команду."; \
		echo "Пример: make composer-all COMMAND='install'"; \
		exit 1; \
	fi
	@echo "==> Выполняю 'composer $(COMMAND)' для всех сервисов..."
    # Цикл по всем сервисам. Если одна команда упадет, вся остановится.
	@$(foreach service,$(PHP_CLI_SERVICES),$(call RUN_IN_SERVICE,$(service)-php-cli,composer $(COMMAND));)
# Установка пакетов composer
.PHONY: composer-dump composer-install composer-update
composer-install:
	@$(MAKE) composer-all COMMAND="i"
composer-dump:
	@$(MAKE) composer-all COMMAND="dump-autoload"
composer-update:
	@$(MAKE) composer-all COMMAND="update"
# tools
composer-be-update:
	@$(MAKE) composer-all COMMAND="show -l -o -A"
	@$(MAKE) tools-composer ARGS="bin all show -l -o -A"
#php-all: ARGS := "-v"
# make php-all-composer ARGS="i"
php-all: api-php shared-php
