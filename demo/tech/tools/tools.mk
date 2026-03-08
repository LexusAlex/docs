TOOLS_SERVICE := tools-php-cli
tools-shell:
	$(call RUN_IN_SERVICE,$(TOOLS_SERVICE),$(USER_ARGS))
tools-php:
	$(call RUN_IN_SERVICE,$(TOOLS_SERVICE),php $(USER_ARGS))
tools-composer:
	$(call RUN_IN_SERVICE,$(TOOLS_SERVICE),composer $(USER_ARGS))