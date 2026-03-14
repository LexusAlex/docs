# PHP Tools - общие команды для статического анализа и тестирования
# Использование: определи SERVICE_NAME перед включением

define DEFINE_PHP_TOOL
$(SERVICE_NAME)-$(1):
	@$(MAKE) $(SERVICE_NAME)-composer ARGS="$(1)"
endef

define DEFINE_INFECTION
$(SERVICE_NAME)-infection:
	@$(MAKE) $(SERVICE_NAME)-composer ARGS="phpunit-coverage"
	@$(MAKE) $(SERVICE_NAME)-composer ARGS="infection"
endef

$(eval $(call DEFINE_PHP_TOOL,phpunit))
$(eval $(call DEFINE_PHP_TOOL,phpunit-coverage))
$(eval $(call DEFINE_PHP_TOOL,psalm))
$(eval $(call DEFINE_PHP_TOOL,phpstan))
$(eval $(call DEFINE_INFECTION))
