ARG PHP_CLI_IMAGE=php:8.5-cli-alpine3.23

FROM ${PHP_CLI_IMAGE}

ARG XDEBUG_VERSION=3.5.1
ARG COMPOSER_VERSION=2.9.5

# ПО
RUN apk add --no-cache libpq-dev bash coreutils git linux-headers \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && git clone --branch $XDEBUG_VERSION --depth 1 https://github.com/xdebug/xdebug.git /usr/src/php/ext/xdebug \
    && docker-php-ext-configure xdebug --enable-xdebug-dev \
    && docker-php-ext-install pdo_pgsql xdebug \
    && apk del git linux-headers

# dev режим php
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

# Опции конфигурации
COPY ./development/php-cli/conf.d /usr/local/etc/php/conf.d

# Composer
RUN apk add --no-cache composer=${COMPOSER_VERSION}-r0

# Пользователь
RUN addgroup -g 1000 tech && adduser -u 1000 -G tech -s /bin/sh -D tech

# Директория
WORKDIR /api

# Текущий пользователь
USER tech

