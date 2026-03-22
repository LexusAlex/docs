API_SERVICE := api-php-cli
SERVICE_NAME := api
include makefiles/php-tools.mk
api-shell:
	$(call RUN_IN_SERVICE,$(API_SERVICE),$(USER_ARGS))
api-php:
	$(call RUN_IN_SERVICE,$(API_SERVICE),php $(USER_ARGS))
api-composer:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer $(USER_ARGS))
api-composer-update:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer update)

SERVICE_NAME :=