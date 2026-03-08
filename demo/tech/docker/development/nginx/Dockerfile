ARG NGINX_IMAGE=nginx:1.28-alpine3.23

FROM ${NGINX_IMAGE}

# Опции конфигурации
COPY docker/development/nginx/conf.d /etc/nginx/conf.d
COPY docker/development/nginx/certs /etc/nginx/certs

WORKDIR /${SERVICE_NAME}