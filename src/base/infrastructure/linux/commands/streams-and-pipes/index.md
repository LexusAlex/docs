# Перенаправление потоков и конвейеры

Управление потоками ввода, вывода и ошибок. Объединение команд в конвейеры для обработки данных.

## Темы

| Файл | Описание |
|------|----------|
| [redirection.md](redirection.md) | Перенаправление вывода (`>`, `>>`, `2>`, `<`) |
| [pipes.md](pipes.md) | Конвейеры (`|`) и объединение команд |

::: tip
- Команда `tee` описана в разделе [Просмотр и обработка текста](/base/infrastructure/linux/commands/viewing-and-processing-text/tee).
- Команда `xargs` описана в разделе [Поиск файлов и команд](/base/infrastructure/linux/commands/search-files-and-commands/xargs).
:::

## Стандартные потоки

| Поток | Дескриптор | Описание |
|-------|------------|----------|
| `stdin` | 0 | Стандартный ввод |
| `stdout` | 1 | Стандартный вывод |
| `stderr` | 2 | Стандартный вывод ошибок |

## Быстрая шпаргалка

```bash
command > file        # stdout в файл (перезапись)
command >> file       # stdout в файл (добавление)
command 2> file       # stderr в файл
command &> file       # stdout + stderr в файл
command < file        # stdin из файла
command1 | command2   # stdout command1 → stdin command2
command | tee file    # stdout в файл и на экран
```
