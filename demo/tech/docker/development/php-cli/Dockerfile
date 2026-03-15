ARG PHP_CLI_IMAGE=php:8.5-cli-alpine3.23

FROM ${PHP_CLI_IMAGE}

ARG XDEBUG_VERSION=3.5.1
ARG COMPOSER_VERSION=2.9.5

# ПО
RUN apk add --no-cache libpq-dev bash coreutils git linux-headers icu icu-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && git clone --branch $XDEBUG_VERSION --depth 1 https://github.com/xdebug/xdebug.git /usr/src/php/ext/xdebug \
    && docker-php-ext-configure xdebug --enable-xdebug-dev \
    && docker-php-ext-install pdo_pgsql xdebug bcmath intl \
    && apk del git linux-headers

# dev режим php
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

# Опции конфигурации
COPY docker/development/php-cli/conf.d /usr/local/etc/php/conf.d

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin --filename=composer --version=$COMPOSER_VERSION --quiet

# Пользователь
RUN addgroup -g 1000 tech && adduser -u 1000 -G tech -s /bin/sh -D tech

# Директория
WORKDIR /$SERVICE_NAME

# Текущий пользователь
USER tech

