ARG PHP_FPM_IMAGE=php:8.5-fpm-alpine3.23

FROM ${PHP_FPM_IMAGE}

ARG XDEBUG_VERSION=3.5.0
ARG COMPOSER_VERSION=2.9.5

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
RUN apk add --no-cache composer=${COMPOSER_VERSION}-r0

# dev режим php
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

# Пользователь
RUN addgroup -g 1000 tech && adduser -u 1000 -G tech -s /bin/sh -D tech

# Директория
WORKDIR /api

# Текущий пользователь
USER tech

