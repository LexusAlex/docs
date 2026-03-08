ARG NGINX_IMAGE=nginx:1.28-alpine3.23
FROM ${NGINX_IMAGE}

# Удаление лишнего из базового образа
RUN rm /etc/nginx/conf.d/default.conf \
    && rm -rf /usr/share/nginx/html \
# Копирование конфига
COPY --chown=nginx:nginx ./production/nginx/conf.d /etc/nginx/conf.d

USER nginx