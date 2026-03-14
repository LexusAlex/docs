UI_SERVICE := ui-php-cli
SERVICE_NAME := ui
include makefiles/php-tools.mk
ui-shell:
	$(call RUN_IN_SERVICE,$(UI_SERVICE),$(USER_ARGS))
ui-php:
	$(call RUN_IN_SERVICE,$(UI_SERVICE),php $(USER_ARGS))
ui-composer:
	$(call RUN_IN_SERVICE,$(UI_SERVICE),composer $(USER_ARGS))

SERVICE_NAME :=