# Окружение
ENV ?= development
# Основной файл
COMPOSE_FILE ?= compose-$(ENV).yaml
# Конфигурация
include makefiles/$(ENV).mk

.PHONY: help build build-cache up down logs
# Цель по умолчанию
help:
	@echo "Доступные команды:"
	@echo "  make build               # Сборка контейнера без кеша ENV=$(ENV)"
	@echo "  make build-cache               # Сборка контейнера c кешем ENV=$(ENV)"
	@echo "  make up               #  Поднять контейнеры ENV=$(ENV)"
	@echo "  make down              #  Остановить контейнеры ENV=$(ENV)"
	@echo "  make logs              #  Просмотр логов ENV=$(ENV)"

# docker
build:
	docker compose -f $(COMPOSE_FILE) build --no-cache --pull
	docker image prune -f
build-cache:
	docker compose -f $(COMPOSE_FILE) build --pull
	docker image prune -f
up:
	docker compose -f $(COMPOSE_FILE) up -d
down:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans
logs:
	docker compose -f $(COMPOSE_FILE) logs -f