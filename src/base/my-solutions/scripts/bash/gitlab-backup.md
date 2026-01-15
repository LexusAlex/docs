# Автоматизация бэкапа gitlab

Скрипт с локальной системы подключается к серверу `gitlab`, делает бэкап, копирует его на локальную машину и удаляет с `gitlab` сервера.

````shell
ssh gitlab 'gitlab-rake gitlab:backup:create' && L=$(ssh gitlab -o LogLevel=error 'P=/var/opt/gitlab/backups/ && LAST=$(ls ${P}  | tail -1) && LAST_FILE=(${P}${LAST}) && echo ${LAST_FILE}') && scp -P 60022 gitlab:${L} ~/ && ssh gitlab -o LogLevel=error "rm ${L}"
````