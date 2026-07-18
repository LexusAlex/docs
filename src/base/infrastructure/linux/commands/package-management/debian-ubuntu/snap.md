# snap

**Уровень:** Средний

Менеджер пакетов для изолированных приложений с автоматическими обновлениями. Разработан Canonical для Ubuntu.

## Синтаксис

```bash
snap [опции] команда [пакет]
```

## Команды

| Команда | Описание |
|---------|----------|
| `install пакет` | Установить snap |
| `remove пакет` | Удалить snap |
| `list` | Список установленных |
| `find запрос` | Поиск в Snap Store |
| `info пакет` | Информация о пакете |
| `refresh` | Обновить все snap |
| `revert пакет` | Откатить к предыдущей версии |
| `enable пакет` | Включить snap |
| `disable пакет` | Отключить snap |
| `services` | Список сервисов |
| `start/stop/restart` | Управление сервисами |
| `logs сервис` | Логи сервиса |

## Опции

| Опция | Описание |
|-------|----------|
| `--classic` | Полный доступ к системе |
| `--channel=канал` | Канал (stable, beta, edge) |
| `--devmode` | Режим разработки |
| `--revision=N` | Конкретная ревизия |

## Каналы обновлений

| Канал | Описание |
|-------|----------|
| `stable` | Стабильная версия (по умолчанию) |
| `candidate` | Кандидат в stable |
| `beta` | Бета-версия |
| `edge` | Последние изменения |

## Примеры

### Установка пакета

```bash
sudo snap install vlc
```

### Установка с classic confinement

```bash
sudo snap install --classic code
```

### Установка изопределённного канала

```bash
sudo snap install --channel=edge firefox
```

### Удаление пакета

```bash
sudo snap remove vlc
```

### Список установленных

```bash
snap list
```

### Поиск пакетов

```bash
snap find "text editor"
```

### Информация о пакете

```bash
snap info vlc
```

### Обновление всех

```bash
sudo snap refresh
```

### Обновлениеопределённного пакета

```bash
sudo snap refresh firefox
```

### Откат версии

```bash
sudo snap revert firefox
```

### Отключение/включение

```bash
sudo snap disable vlc
sudo snap enable vlc
```

### Управление сервисами

```bash
snap services
sudo snap start lxd
sudo snap restart lxd
snap logs lxd
```

## Практические сценарии

### Установка типичного набора

```bash
sudo snap install --classic code
sudo snap install firefox vlc
```

## Snap vs apt

| Параметр | snap | apt |
|----------|------|-----|
| Изоляция | Песочница | Нет |
| Обновления | Автоматические | Ручные |
| Размер | Больше | Меньше |
| Зависимости | Встроены | Системные |

:::tip
Используйте `--classic` для приложений, которым нужен полный доступ к файловой системе (IDE, редакторы).
:::

:::warning
Snap-пакеты занимают больше места и запускаются медленнее из-за изоляции. Для серверных приложений лучше использовать apt.
:::

## См. также

- [apt](apt.md) — менеджер пакетов apt

