FROM php:8.5-fpm-alpine3.23

ENV XDEBUG_VERSION 3.5.1
ENV COMPOSER_VERSION 2.9.5

# ПО
RUN apk add --no-cache libpq-dev bash coreutils git linux-headers \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && git clone --branch $XDEBUG_VERSION --depth 1 https://github.com/xdebug/xdebug.git /usr/src/php/ext/xdebug \
    && docker-php-ext-configure xdebug --enable-xdebug-dev \
    && docker-php-ext-install pdo_pgsql xdebug \
    && apk del git linux-headers

# dev режим php
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin --filename=composer --version=$COMPOSER_VERSION --quiet

# Пользователь
RUN addgroup -g 1000 tech && adduser -u 1000 -G tech -s /bin/sh -D tech

# Директория
WORKDIR /docs/demo/yii3

# Текущий пользователь
USER tech

