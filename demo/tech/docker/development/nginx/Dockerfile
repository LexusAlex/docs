ARG NGINX_IMAGE=nginx:1.28-alpine3.23
FROM ${NGINX_IMAGE}

ARG NGINX_ROOT
ARG PHP_FPM_HOST

COPY docker/development/nginx/conf.d /etc/nginx/conf.d
COPY docker/development/nginx/certs /etc/nginx/certs

RUN sed -i "s|\${NGINX_ROOT}|${NGINX_ROOT}|g" /etc/nginx/conf.d/default.conf && \
    sed -i "s|\${PHP_FPM_HOST}|${PHP_FPM_HOST}|g" /etc/nginx/conf.d/default.conf

WORKDIR /${SERVICE_NAME}