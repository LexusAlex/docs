API_SERVICE := api-php-cli
SERVICE_NAME := api
include makefiles/php-tools.mk
api-shell:
	$(call RUN_IN_SERVICE,$(API_SERVICE),$(USER_ARGS))
api-php:
	$(call RUN_IN_SERVICE,$(API_SERVICE),php $(USER_ARGS))
api-composer:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer $(USER_ARGS))
api-composer-dump:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer dump-autoload)
api-composer-update:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer update)
api-composer-install:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer install)

SERVICE_NAME :=