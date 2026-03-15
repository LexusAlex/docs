ARG PHP_FPM_IMAGE=php:8.5-fpm-alpine3.23

FROM ${PHP_FPM_IMAGE}

ARG XDEBUG_VERSION=3.5.1
ARG COMPOSER_VERSION=2.9.5
ARG UID=1000
ARG GID=1000

RUN apk add --no-cache --virtual .build-deps \
        # Зависимости для сборки
        autoconf \
        g++ \
        make \
        libpq-dev \
    # Устанавливаем зависимости, которые нужны в рантайме
    && apk add --no-cache \
        libpq \
        bash \
        coreutils \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    # Устанавливаем расширение для PostgreSQL
    && docker-php-ext-install pdo_pgsql \
    # Удаляем все зависимости сборки, чтобы уменьшить размер образа
    && apk del .build-deps
# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin --filename=composer --version=$COMPOSER_VERSION --quiet

# dev режим php
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

# Пользователь
RUN addgroup -g $GID tech && adduser -u $UID -G tech -s /bin/sh -D tech

# Директория
WORKDIR /${SERVICE_NAME}

# Текущий пользователь
USER tech

