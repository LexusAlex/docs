SHARED_SERVICE := shared-php-cli
SERVICE_NAME := shared
include makefiles/php-tools.mk
shared-shell:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),$(USER_ARGS))
shared-php:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),php $(USER_ARGS))
shared-composer:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer $(USER_ARGS))
shared-composer-dump:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer dump-autoload)
shared-composer-update:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer update)
shared-composer-install:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer install)
shared-composer-phpunit-core:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer run phpunit-core)
shared-composer-phpunit-http:
	$(call RUN_IN_SERVICE,$(SHARED_SERVICE),composer run phpunit-http)
SERVICE_NAME :=