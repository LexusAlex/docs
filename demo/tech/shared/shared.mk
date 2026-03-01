SHARED_SERVICE := shared-php-cli
shared-shell:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),$(USER_ARGS))
shared-php:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),php $(USER_ARGS))
shared-composer:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer $(USER_ARGS))