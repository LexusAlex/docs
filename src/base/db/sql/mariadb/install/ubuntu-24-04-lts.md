# Ubuntu 24.04 LTS

Установка `mariadb` на `Ubuntu 24.04 LTS`.

## Пакеты нужные для установки

````shell
sudo apt install dirmngr ca-certificates software-properties-common apt-transport-https curl
````

## Выбор версии

Если прямо сейчас (январь 2026) выполнить поиск по пакетам, то получим версию `10.11.13`, которая от `2025-05-23`, можно ставить и ее, но мы хотим последнюю `LTS` версию на данный момент.

````shell
sudo apt search mariadb-server
# mariadb-server/noble-updates,noble-security 1:10.11.13-0ubuntu0.24.04.1 amd64
# MariaDB database server binaries
````

На текущий момент (январь 2026) `LTS` версии которое можно ставить.

- `10.11.* LTS`
- `11.4.* LTS`
- `11.8.* LTS`