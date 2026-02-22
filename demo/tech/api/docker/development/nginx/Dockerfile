ARG NGINX_IMAGE=nginx:1.28-alpine3.23
FROM ${NGINX_IMAGE}

# Опции конфигурации
COPY ./development/nginx/conf.d /etc/nginx/conf.d

WORKDIR /api