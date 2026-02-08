# docker
docker-build:
	docker compose build --no-cache --pull
	docker image prune -f
docker-up:
	docker compose up -d
docker-down:
	docker compose down --remove-orphans
	docker image prune -f
# composer
composer-install:
	docker compose run --rm php-cli composer install
composer-dump-autoload:
	docker compose run --rm php-cli composer dump-autoload
composer-be-updated-all:
	docker compose run --rm php-cli composer bin all show -l -o -A
# yii
config-rebild:
	docker compose run --rm php-cli composer yii-config-rebuild
phpunit:
	docker compose run --rm php-cli composer phpunit