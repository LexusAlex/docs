# Ubuntu 24.04 LTS

## Подготовка

````shell
# Сначала посмотрим на пакеты которые у нас установлены
dpkg -l | grep mariadb
# Файлы принадлежащие пакету
dpkg -L mariadb-server
````

## Остановка службы

````shell
sudo systemctl stop mariadb
sudo systemctl status mariadb
````

## Удаление

````shell
# Удаляем основной пакет
sudo apt purge "mariadb-*"
# Удаляем зависимые пакеты
sudo apt autoremove
# Очищаем кеш
sudo apt autoclean
# Так же подчистим каталоги если нужно
sudo rm -rf /var/lib/mysql
sudo rm -rf /var/log/mysql
# Проверим наличие пакетов
dpkg -l | grep mariadb
````

Удаление на этом завершено