# Ubuntu 24.04 LTS

Настраиваем чистую систему сразу после установки

Заходим под зарегистрированным обычным пользователем и вводим ранее заданный пароль.

Далее смотрим ip адрес сервера, запоминаем и выходим `exit`

````shell
ip a
````

## Основная команда

Со своей машины выполняем команду

````shell
ssh -t alex@192.168.89.112 "
sudo passwd root &&
sudo sed -i 's/#\?PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config &&
sudo sed -i 's/#\?Port.*/Port 60022/' /etc/ssh/sshd_config &&
sudo systemctl daemon-reload
sudo systemctl restart ssh.socket
"
````

Что будет происходить:

- Принять `fingerprint`
- Ввести пароль зарегистрированного пользователя
- Ввести пароль зарегистрированного пользователя
- Ввести пароль `root`
- Ввести еще раз пароль `root`
- Будет внесена корректировка в конфигурацию `ssh`
- Перезагрузка демона и службы

После этого с сервером можно как-то взаимодействовать.

## Добавляем ключ

````shell
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 60022 alex@192.168.89.112
# Number of key(s) added: 1
````

После этого можно уже заходить

````shell
ssh -p 60022 alex@192.168.90.112
````

## Дополнительно

Теперь как дополнительно можно обновить пакеты:

````shell
# Обновить пакеты
sudo apt update
# Установить обновления
sudo apt upgrade
# Чистка
sudo apt autoclean
sudo apt autoremove
````

И поставить защиту фаерволл `ufw`

````shell
# Установка
sudo apt install ufw
#Запрещаем все входящие соединения
sudo ufw default deny incoming
# Разрешаем все исходящие соединения
sudo ufw default allow outgoing
# Открываем наш кастомный порт
sudo ufw allow 60022/tcp
# Сервис ssh, просто нужно
sudo ufw allow ssh
# Включаем
sudo ufw enable
# Показать правила с номерами
sudo ufw status numbered
# Проверка состояния
sudo systemctl status ufw
````

Далее ставим `fail2ban`

````shell
# Установка
sudo apt install fail2ban
# Создание конфигурационного файла
sudo sh -c 'printf "[DEFAULT]\nbanaction = ufw\n[sshd]\nenabled = true\nmaxretry = 2\nfindtime = 3600\nbantime = 72h\nport = 60022\nlogpath  = /var/log/auth.log\nignoreip = 127.0.0.1, 192.168.88.252, 194.8.47.127, 212.152.60.98\n" > /etc/fail2ban/jail.local'
# На всякий случай права
sudo chown root:root /etc/fail2ban/jail.local
sudo chmod 644 /etc/fail2ban/jail.local
# Перезапуск службы
sudo systemctl restart fail2ban
# Проверка состояния
sudo systemctl status fail2ban
````

## Еще плюшки

Для еще более быстрого доступа к хосту можно прямо в конфиге локального пользователя прописать доступ

````text
Host db
        StrictHostKeyChecking no
        HostName 192.168.90.112
        User alex
    Port 60022
        ForwardAgent yes
        IdentityFile /home/alex/.ssh/id_ed25519
        IdentitiesOnly yes
        UserKnownHostsFile=/dev/null
        AddKeysToAgent yes
        ServerAliveInterval 60
        ServerAliveCountMax 1200
````

Теперь можно подключаться просто `ssh db`, красота.

После этого всего система готова к любому взаимодействию и установки нужного ПО

