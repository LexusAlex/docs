# rpm

Низкоуровневый менеджер пакетов RPM (Red Hat Package Manager).

## Синтаксис

```bash
rpm [options] [package]
```

## Основные операции

| Опция | Описание |
|-------|----------|
| `-i` | Установка пакета |
| `-U` | Обновление (установка или обновление) |
| `-F` | Обновление (только если установлен) |
| `-e` | Удаление пакета |
| `-q` | Запрос информации |
| `-V` | Проверка пакета |

## Опции запроса (-q)

| Опция | Описание |
|-------|----------|
| `-qa` | Все установленные пакеты |
| `-qi` | Информация о пакете |
| `-ql` | Список файлов пакета |
| `-qf file` | Какой пакет содержит файл |
| `-qc` | Конфигурационные файлы |
| `-qd` | Документация |
| `-qR` | Зависимости |
| `-qp` | Информация о RPM-файле |
| `--changelog` | Журнал изменений |
| `--scripts` | Скрипты установки |

## Опции установки

| Опция | Описание |
|-------|----------|
| `-h` | Показ прогресса (hash) |
| `-v` | Подробный вывод |
| `--nodeps` | Игнорировать зависимости |
| `--force` | Принудительная установка |
| `--replacepkgs` | Замена установленного пакета |
| `--test` | Тестовая установка |

## Примеры

### 1. Установка из файла

```bash
sudo rpm -i package.rpm
```

### 2. Установка с прогрессом

```bash
sudo rpm -ivh package.rpm
```

### 3. Обновление пакета

```bash
sudo rpm -Uvh package.rpm
```

### 4. Обновление только если установлен

```bash
sudo rpm -Fvh package.rpm
```

### 5. Удаление пакета

```bash
sudo rpm -e package-name
```

### 6. Все установленные пакеты

```bash
rpm -qa
rpm -qa | grep nginx
```

### 7. Информация о пакете

```bash
rpm -qi nginx
```

### 8. Список файлов пакета

```bash
rpm -ql nginx
```

### 9. Какой пакет содержит файл

```bash
rpm -qf /usr/bin/nginx
rpm -qf /etc/nginx/nginx.conf
```

### 10. Конфигурационные файлы

```bash
rpm -qc nginx
```

### 11. Документация

```bash
rpm -qd nginx
```

### 12. Зависимости

```bash
rpm -qR nginx
```

### 13. Проверка пакета

```bash
rpm -V nginx
```

### 14. Проверка RPM-файла

```bash
rpm -qpi package.rpm
rpm -qpl package.rpm
```

### 15. Импорт GPG-ключа

```bash
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release
sudo rpm --import https://example.com/RPM-GPG-KEY
```

### 16. Журнал изменений

```bash
rpm --changelog -q nginx
```

### 17. Скрипты пакета

```bash
rpm -q --scripts nginx
```

### 18. Тестовая установка

```bash
rpm -ivh --test package.rpm
```

### 19. Принудительная установка

```bash
sudo rpm -ivh --force package.rpm
```

### 20. Установка без проверки зависимостей

```bash
sudo rpm -ivh --nodeps package.rpm
```

## Практические сценарии

### Проверка целостности пакета

```bash
rpm -V nginx
# S.5....T.  c /etc/nginx/nginx.conf
# S - размер, 5 - MD5, T - время
```

### Поиск пакета по файлу

```bash
which nginx
rpm -qf $(which nginx)
```

### Список всех конфигов

```bash
rpm -qc $(rpm -qa) | sort
```

### Проверка подписи

```bash
rpm --checksig package.rpm
```

### Экспорт списка пакетов

```bash
rpm -qa --qf '%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n' | sort > packages.txt
```

### Установка из URL

```bash
sudo rpm -ivh https://example.com/package.rpm
```

## RPM база данных

| Путь | Описание |
|------|----------|
| `/var/lib/rpm/` | База данных RPM |
| `/var/lib/rpm/Packages` | Основная БД |
| `/var/lib/rpm/__db.*` | Кэш БД |

### Перестроение БД

```bash
sudo rpm --rebuilddb
```

### Проверка БД

```bash
sudo rpm -Va
```

## Коды проверки (-V)

| Код | Описание |
|-----|----------|
| `S` | Размер изменился |
| `5` | MD5 изменился |
| `T` | Время изменилось |
| `D` | Major/Minor изменился |
| `L` | Ссылка изменилась |
| `U` | Владелец изменился |
| `G` | Группа изменилась |
| `M` | Режим изменился |

:::tip rpm vs dnf
rpm — низкоуровневый инструмент. Для повседневной работы используйте dnf, который автоматически разрешает зависимости.
:::

:::warning --nodeps и --force
Используйте `--nodeps` и `--force` только в крайних случаях. Они могут сломать систему.
:::

## Советы

:::tip Проверка перед установкой
Всегда используйте `rpm -qpi` и `rpm -qpl` для проверки пакета перед установкой.
:::

:::warning База данных RPM
Не удаляйте файлы в `/var/lib/rpm/` вручную. Для обслуживания используйте `rpm --rebuilddb`.
:::
