API_SERVICE := api-php-cli
api-shell:
	$(call RUN_IN_SERVICE,$(API_SERVICE),$(USER_ARGS))
api-php:
	$(call RUN_IN_SERVICE,$(API_SERVICE),php $(USER_ARGS))
api-composer:
	$(call RUN_IN_SERVICE,$(API_SERVICE),composer $(USER_ARGS))