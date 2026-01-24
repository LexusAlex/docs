# Ubuntu 24.04 LTS

Установка `mariaDb` на `Ubuntu 24.04 LTS`. Так же произведем базовую настройку

## Пакеты нужные для установки

````shell
sudo apt install dirmngr ca-certificates software-properties-common apt-transport-https curl
````

## Выбор версии

Если прямо сейчас (январь 2026) выполнить поиск по пакетам, то получим версию `10.11.13`, которая от `2025-05-23`, можно ставить и ее, но мы хотим последнюю `LTS` версию на данный момент, а не ту которая есть в репозиториях.

````shell
sudo apt search mariadb-server
# mariadb-server/noble-updates,noble-security 1:10.11.13-0ubuntu0.24.04.1 amd64
# MariaDB database server binaries
````

На текущий момент (январь 2026) `LTS` версии которое нам интересны.

- `10.11.* LTS`
- `11.4.* LTS`
- `11.8.* LTS`

## Добавляем репозиторий

Разработчики добавили специальный скрипт, который добавит нужный репозиторий

Для начала можно проверить, что будет происходить при выполнении команды, указав ключ `--write-to-stdout`.

````shell
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version="mariadb-11.8" --write-to-stdout
# [info] Checking for script prerequisites.
# [info] MariaDB Server version 11.8 is valid
# [info] If run without --write-to-stdout, this script will create /etc/apt/preferences.d/mariadb-enterprise.pref to give packages from MariaDB repositories highest priority, in order to avoid conflicts with packages from OS and other repositories.

# MariaDB Server
# To use a different major version of the server, or to pin to a specific minor version, change URI below.
#deb [arch=amd64,arm64] https://dlm.mariadb.com/repo/mariadb-server/11.8/repo/ubuntu noble main

#deb [arch=amd64,arm64] https://dlm.mariadb.com/repo/mariadb-server/11.8/repo/ubuntu noble main/debug

# MariaDB MaxScale
# To use the latest stable release of MaxScale, use "latest" as the version
# To use the latest beta (or stable if no current beta) release of MaxScale, use "beta" as the version
#deb [arch=amd64,arm64] https://dlm.mariadb.com/repo/maxscale/latest/apt noble main

# [info] If run without --skip-key-import/--write-to-stdout, this script will import package signing keys used by MariaDB
````

А потом уже добавить репозиторий.

````shell
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version="mariadb-11.8"
# [info] Checking for script prerequisites.
# [info] MariaDB Server version 11.8 is valid
# [info] Repository file successfully written to /etc/apt/sources.list.d/mariadb.list
# [info] Adding trusted package signing keys...
# [info] Running apt-get update...
# [info] Done adding trusted package signing keys
````

Что сделал скрипт:

- Определил ОС и версию системы
- Проверил доступность указанной версии `mariadb`.
- Добавляет `GPG`-ключ безопасности и импортирует его в систему
- Создал файл репозитория. `/etc/apt/sources.list.d/mariadb.list`

[Документация](https://mariadb.com/docs/server/server-management/install-and-upgrade-mariadb/installing-mariadb/binary-packages/mariadb-package-repository-setup-and-usage#using-mariadb-foundations-repository-configuration-tool)

Теперь проверяем доступные нам пакеты, и среди них будет нужная нам версия.

````shell
sudo apt search mariadb-server
#mariadb-server/unknown 1:11.8.5+maria~ubu2404 amd64
#  MariaDB database server binaries
````

## Установка

````shell
# Обновим пакеты еще раз
sudo apt update
# Установка самого сервера
sudo apt install mariadb-server
# Запуск службы
sudo systemctl enable --now mariadb
# Проверка статуса
sudo systemctl status mariadb
# Запуск сервера
sudo systemctl start mariadb
# Перезапустить сервер
sudo systemctl restart mariadb
# Проверяем версию
mariadb --version
# mariadb from 11.8.5-MariaDB, client 15.2 for debian-linux-gnu (x86_64) using  EditLine wrapper
````

Установка на этом завершена

## Настройки безопасности

Теперь нужно выполнить специальный скрипт, он сделает `mariadb` безопаснее

````shell
sudo mysql_secure_installation
````

Что будет спрашивать:

- `Enter current password for root (enter for none):` - Текущий пароль для суперпользователя `root`, так как он не задан просто `enter`.
- `Switch to unix_socket authentication? [Y/n]` - Хотите ли вы использовать аутентификацию `unix_socket`, что позволяет входить без пароля пользователю `mariadb` `root`, но только с `localhost` самому пользователю `root`. Поставим `Y`.
- `Change the root password? [Y/n]` - Установить пароль для суперпользователя `root`. Конечно `Y`.
- `Remove anonymous users? [Y/n]` - Удалить анонимных пользователей? `Y`.
- `Disallow root login remotely? [Y/n]` - Запретить удаленный вход для пользователя `root`? `Y`. Если это нужно мы создадим специального пользователя для этого.
- `Remove test database and access to it? [Y/n]` - Удалить тестовую базу данных `test`? `Y`
- `Reload privilege tables now? [Y/n]` - Перезагрузить таблицы привилегий. `Y`.

## Заходим

Пробуем заходить

````shell
mariadb -u root -p или # просто mariadb
#Welcome to the MariaDB monitor.  Commands end with ; or \g.
#Your MariaDB connection id is 44
#Server version: 11.8.5-MariaDB-ubu2404 mariadb.org binary distribution
````