# compose.yaml

Конфигурационный файл `docker compose`, ранее он назывался `docker-compose.yaml`, должен размещаться в рабочем каталоге приложения.

Если существуют оба файла, `Compose` предпочитает `compose.yaml`.

Определяет компоненты приложения как сервисы. Сервисы взаимодействуют друг с другом через сеть.

## Структура файла

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - frontend

  api:
    build: ./api
    environment:
      - DB_HOST=db
    depends_on:
      - db
    networks:
      - frontend
      - backend

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend

volumes:
  db-data:

networks:
  frontend:
  backend:
```

## Основные секции

### services

Контейнеры приложения. Каждый сервис — это отдельный контейнер.

```yaml
services:
  app:
    image: node:24-alpine    # образ из реестра
    # или
    build: ./app             # сборка из Dockerfile
    ports:
      - "3000:3000"          # host:container
    environment:
      - NODE_ENV=production
    env_file:
      - .env                 # переменные из файла
    volumes:
      - ./src:/app/src       # монтирование директорий
      - node_modules:/app/node_modules
    depends_on:
      - db                   # запуск после db
    restart: unless-stopped  # политика перезапуска
```

### volumes

Именованные тома для持久ного хранения данных.

```yaml
volumes:
  db-data:        # том для базы данных
  node_modules:   # том для зависимостей
```

### networks

Изолированные сети для связи между сервисами.

```yaml
networks:
  frontend:   # сеть для фронтенда
  backend:    # сеть для внутренних сервисов
```

## Полезные команды

```bash
# Запуск всех сервисов
docker compose up -d

# Просмотр логов
docker compose logs -f

# Остановка и удаление контейнеров
docker compose down

# Остановка с удалением томов
docker compose down -v

# Пересборка образов
docker compose build --no-cache

# Выполнение команды в контейнере
docker compose exec app sh
```

## Переменные окружения

Можно использовать переменные из `.env` файла:

```yaml
services:
  app:
    image: nginx:${NGINX_VERSION:-alpine}
    ports:
      - "${PORT:-80}:80"
```

::: info
Синтаксис `${VAR:-default}` задаёт значение по умолчанию, если переменная не определена.
:::

## Зависимости между сервисами

`depends_on` гарантирует порядок запуска, но **не готовность** сервиса. Для ожидания готовности используйте healthcheck:

```yaml
services:
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  app:
    depends_on:
      db:
        condition: service_healthy
```

::: tip
Для production используйте `restart: unless-stopped`, чтобы контейнеры автоматически перезапускались после падения или перезагрузки сервера.
:::
