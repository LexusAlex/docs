# chroot

**Уровень:** Продвинутый

Изменяет корневой каталог для запускаемого процесса. Процесс «видит» только содержимое указанного каталога и его подкаталогов. Используется для изоляции, восстановления системы и тестирования.

## Синтаксис

```bash
chroot [опции] новый_корень [команда [аргумент...]]
chroot /path/to/jail                    # запустить shell в chroot
chroot /path/to/jail /bin/bash -c "cmd"  # выполнить команду
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `--userspec=пользователь:группа` | Запустить от указанного пользователя и группы |
| `--groups=группа1,группа2` | Указать дополнительные группы |
| `--skip-chdir` | Не менять рабочий каталог (если уже внутри chroot) |
| `--help` | Показать справку |
| `--version` | Показать версию |

## Подготовка chroot-окружения

### Базовая структура каталогов

```bash
JAIL=/path/to/jail

# Создать структуру
mkdir -p $JAIL/{bin,lib,lib64,usr,etc,proc,dev,tmp}

# Скопировать необходимые бинарные файлы
cp /bin/{bash,ls,cat,echo,ps} $JAIL/bin/

# Скопировать библиотеки (ldd покажет зависимости)
for bin in $JAIL/bin/*; do
    ldd $bin | grep -o '/lib[^ ]*' | while read lib; do
        dir=$(dirname "$JAIL$lib")
        mkdir -p "$dir"
        cp "$lib" "$JAIL$lib"
    done
done

# Скопировать /etc файлы
cp /etc/{passwd,group,hosts,nsswitch.conf,resolv.conf} $JAIL/etc/
```

### Монтирование системных каталогов

```bash
# /proc — информация о процессах
mount -t proc proc $JAIL/proc

# /dev — устройства
mount --bind /dev $JAIL/dev

# /dev/pts — псевдотерминалы
mount --bind /dev/pts $JAIL/dev/pts

# /sys — информация о системе (опционально)
mount --bind /sys $JAIL/sys
```

### Полный скрипт настройки

```bash
#!/bin/bash
JAIL=/var/chroot
UBUNTU_VERSION=22.04

# Создание базовой файловой системы
mkdir -p $JAIL

# Установка через debootstrap (Debian/Ubuntu)
debootstrap --variant=minbase jammy $JAIL http://archive.ubuntu.com/ubuntu/

# Монтирование
mount -t proc proc $JAIL/proc
mount --bind /dev $JAIL/dev
mount --bind /dev/pts $JAIL/dev/pts

# Вход в chroot
chroot $JAIL /bin/bash
```

## Примеры

### 1. Базовый chroot

```bash
# Создать минимальное окружение
mkdir -p /tmp/test_chroot/{bin,lib,lib64}

# Скопировать bash и его зависимости
cp /bin/bash /tmp/test_chroot/bin/
ldd /bin/bash | grep -o '/lib[^ ]*' | while read lib; do
    cp "$lib" "/tmp/test_chroot$lib" 2>/dev/null
done

# Запустить chroot
sudo chroot /tmp/test_chroot /bin/bash
```

### 2. Chroot для 32-битных программ

```bash
# Установка 32-битного окружения
sudo debootstrap --arch=i386 bullseye /srv/chroot32 http://deb.debian.org/debian/

# Монтирование
sudo mount -t proc proc /srv/chroot32/proc
sudo mount --bind /dev /srv/chroot32/dev

# Вход
sudo chroot /srv/chroot32 /bin/bash
```

### 3. Восстановление системы

```bash
# С Live-USB смонтировать корень
mount /dev/sda1 /mnt
mount /dev/sda2 /mnt/boot  # если есть

# Монтирование системных каталогов
mount --bind /dev /mnt/dev
mount --bind /dev/pts /mnt/dev/pts
mount -t proc proc /mnt/proc
mount -t sysfs sys /mnt/sys

# Вход в смонтированную систему
chroot /mnt /bin/bash

# Теперь можно:
# - пересобрать GRUB: grub-install /dev/sda
# - обновить initramfs: update-initramfs -u
# - сменить пароль: passwd
# - исправить fstab
```

### 4. Сборка пакетов в изоляции

```bash
# Создать chroot для сборки
sudo debootstrap --variant=buildd jammy /buildchroot

# Установить зависимости
chroot /buildchroot apt-get install -y build-essential devscripts

# Собрать пакет
chroot /buildchroot bash -c "cd /tmp/package && dpkg-buildpackage -us -uc"
```

### 5. Тестирование в чистой среде

```bash
# Минимальное окружение для тестов
sudo debootstrap minbase /tmp/testenv

# Установить зависимости
chroot /testenv apt-get install -y python3

# Запустить тесты
chroot /testenv python3 /tmp/test_script.py
```

### 6. Chroot с разными пользователями

```bash
# Запустить от пользователя nobody
sudo chroot --userspec=nobody:nogroup /var/chroot /bin/bash

# С дополнительными группами
sudo chroot --groups=www-data,adm /var/chroot /bin/bash
```

### 7. Изменение shell в chroot

```bash
# Добавить shell в /etc/shells внутри chroot
echo "/bin/bash" >> /var/chroot/etc/shells

# Теперь можно chroot с нужным shell
chroot /var/chroot /bin/bash
```

### 8. Chroot для веб-приложения

```bash
#!/bin/bash
JAIL=/var/www/chroot

# Создание структуры
mkdir -p $JAIL/{bin,lib,lib64,usr,etc,tmp,dev}

# Копирование необходимых утилит
for cmd in bash ls cat grep awk sed php; do
    cp $(which $cmd) $JAIL/bin/
done

# Копирование библиотек
for bin in $JAIL/bin/*; do
    ldd $bin 2>/dev/null | grep -o '/lib[^ ]*' | while read lib; do
        mkdir -p "$JAIL$(dirname $lib)"
        cp -n "$lib" "$JAIL$lib" 2>/dev/null
    done
done

# /dev/null и /dev/zero
mknod -m 666 $JAIL/dev/null c 1 3
mknod -m 666 $JAIL/dev/zero c 1 5
mknod -m 666 $JAIL/dev/random c 1 8
mknod -m 666 $JAIL/dev/urandom c 1 9
```

## Безопасность

### Ограничения chroot

:::warning
chroot **не является** полноценным механизмом безопасности:

- root может выйти из chroot
- Не изолирует сеть, процессы, пользователей
- Не защищает от ядерных уязвимостей
:::

### Усиление безопасности

```bash
# 1. Не запускать от root
chroot --userspec=appuser:appgroup /var/chroot /bin/bash

# 2. Только необходимые каталоги
mount --bind /dev /var/chroot/dev
# Не монтировать /proc и /sys без необходимости

# 3. Read-only монтирование
mount -o remount,ro /var/chroot/usr

# 4. Ограничение capabilities
# Используйте unshare для лучшей изоляции
```

### Альтернативы для безопасности

| Инструмент | Изоляция | Сложность |
|-----------|----------|-----------|
| chroot | Минимальная (только файловая) | Простая |
| unshare (namespaces) | Процессы, сеть, файловая система | Средняя |
| Docker | Полная (cgroups + namespaces) | Средняя |
| LXC/LXD | Полная (как VM) | Сложная |
| systemd-nspawn | Как chroot, но с namespaces | Средняя |
| Firejail | Песочница для приложений | Простая |

## Практические сценарии

### Восстановление загрузчика (GRUB)

```bash
# С Live-USB
mount /dev/sda2 /mnt
mount /dev/sda1 /mnt/boot/efi
mount --bind /dev /mnt/dev
mount --bind /dev/pts /mnt/dev/pts
mount -t proc proc /mnt/proc
mount -t sysfs sys /mnt/sys

chroot /mnt /bin/bash

grub-install /dev/sda
update-grub
exit

umount -R /mnt
reboot
```

### Смена забытого пароля root

```bash
# С Live-USB
mount /dev/sda1 /mnt
mount --bind /dev /mnt/dev
mount -t proc proc /mnt/proc

chroot /mnt /bin/bash
passwd root
exit

umount -R /mnt
reboot
```

### Тестирование скрипта в минимальной среде

```bash
sudo debootstrap minbase /tmp/test
sudo cp my_script.sh /tmp/test/tmp/
sudo chroot /tmp/test /bin/bash -c "chmod +x /tmp/my_script.sh && /tmp/my_script.sh"
```

### Сборка ядра в изоляции

```bash
sudo debootstrap --variant=buildd jammy /build
sudo mount -t proc proc /build/proc

chroot /build /bin/bash -c "
    apt-get install -y linux-source bc kmod flex bison libssl-dev
    cd /usr/src/linux-source-*
    tar xf linux-source-*.tar.xz
    cd linux-source-*
    make defconfig
    make -j\$(nproc)
"
```

## Советы

:::warning
Всегда отмонтируйте системные каталоги после использования chroot: `umount -R /path/to/jail`.
:::

:::tip
Для быстрого chroot-скрипта используйте функцию:

```bash
enter_chroot() {
    local jail=$1
    mount --bind /dev "$jail/dev"
    mount -t proc proc "$jail/proc"
    chroot "$jail" /bin/bash
    umount "$jail/proc"
    umount "$jail/dev"
}
```
:::

:::tip
`debootstrap --variant=minbase` создаёт минимальное окружение (~100MB) — достаточно для большинства задач.
:::

:::warning
Не забудьте скопировать `/etc/resolv.conf` в chroot, если нужен доступ к сети.
:::

## Связки с другими командами

- **mount** — монтирование /proc, /dev, /sys
- **debootstrap** — создание Debian/Ubuntu окружения
- **ln** — создание ссылок на библиотеки
- **ldd** — поиск зависимостей бинарных файлов
- **unshare** — расширенная изоляция через namespaces
- **systemd-nspawn** — «улучшенный» chroot от systemd

## См. также

- [mount](../disks-and-mount/mount.md) — монтирование файловых систем
- [ln](../files-and-directories/ln.md) — создание ссылок
- [useradd](../user-and-access/useradd.md) — создание пользователей
