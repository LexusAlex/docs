docker-build:
	docker compose build --no-cache --pull
	docker image prune -f
docker-up:
	docker compose up -d
docker-down:
	docker compose down --remove-orphans
	docker image prune -f
npm-install:
	docker compose run --rm node-cli npm install
npm-build:
	docker compose run --rm node-cli npm run docs:build
npm-be-updated-all:
	docker compose run --rm node-cli npm outdated --depth=9999