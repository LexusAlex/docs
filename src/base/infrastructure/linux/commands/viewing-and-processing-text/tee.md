# tee

Команда `tee` читает из стандартного ввода и записывает в стандартный вывод и в файлы одновременно.

## Синтаксис

```bash
tee [опции] файл...
команда | tee [опции] файл...
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-a` | Дописывать в файл, а не перезаписывать |
| `--append` | То же, что `-a` |
| `-i` | Игнорировать сигналы прерывания |
| `--ignore-interrupts` | То же, что `-i` |
| `--output-delimiter=СТРОКА` | Разделитель между входными файлами |

## Примеры

```bash
# Записать вывод в файл и на экран
echo "hello" | tee output.txt

# Дописать в файл
echo "world" | tee -a output.txt

# Записать в несколько файлов
echo "data" | tee file1.txt file2.txt file3.txt

# Использование с sudo для записи в защищённые файлы
echo "new config" | sudo tee /etc/config.conf

# Дописать с sudo
echo "additional line" | sudo tee -a /etc/config.conf

# Логирование вывода скрипта
./script.sh 2>&1 | tee script.log

# Записать и вывести на экран
cat file.txt | tee /dev/tty | grep "pattern"

# Использование с pipe для промежуточного сохранения
cat data.txt | tee backup.txt | sort | tee sorted.txt

# Записать stderr и stdout
command 2>&1 | tee output.log

# Пропустить через tee в середине пайпа
ps aux | tee process_list.txt | grep "nginx"

# Мониторинг с сохранением
top -bn1 | tee -a top_snapshot.txt

# Записать в несколько мест
echo "log entry" | tee -a /var/log/app.log -a /var/log/syslog

# Создание резервной копии при обработке
cat config.txt | tee config.txt.bak | sed 's/old/new/g' > config.txt
```

## Практические сценарии

### Логирование и вывод
```bash
# Вывести на экран и сохранить в файл
make 2>&1 | tee build.log

# Скрипт с логированием
#!/bin/bash
exec > >(tee -a script.log) 2>&1
echo "Начало выполнения..."
# ... команды скрипта ...
echo "Завершено."
```

### Запись в защищённые файлы
```bash
# Записать в файл от root
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf

# Добавить строку в конфиг
echo "new_option=value" | sudo tee -a /etc/app/config.conf

# Перезаписать конфиг из pipe
cat new_config.conf | sudo tee /etc/app/config.conf
```

### Промежуточное сохранение
```bash
# Сохранить промежуточный результат
cat data.txt | tee raw_data.txt | clean_function | tee clean_data.txt | final_processing

# Pipeline с debug
cat input.txt | tee step1.txt | process1 | tee step2.txt | process2 > output.txt
```

### Мониторинг в реальном времени
```bash
# Мониторинг с сохранением истории
watch -n 5 'df -h' | tee -a disk_usage.log

# Логирование сетевого трафика
tcpdump -i eth0 | tee -a traffic.log
```

### Резервное копирование перед изменением
```bash
# Backup before modification
cat important.conf | tee important.conf.bak | sed 's/old/new/g' > important.conf
```

## Советы

:::tip
Используйте `-a` для дописывания в файл. Без этого флага файл будет перезаписан каждый раз.
:::

:::warning
При использовании `tee` с `sudo` помните: `sudo command | tee file` запишет файл от текущего пользователя. Используйте `command | sudo tee file` для записи от root.
:::

:::tip
Для перехвата и stdout, и stderr: `command 2>&1 | tee output.log`.
:::

:::warning
Если `tee` записывает в несколько файлов и один из них недоступен, запись в остальные продолжится, но команда вернёт ошибку.
:::

:::tip
Используйте `/dev/tty` для вывода на терминал в середине пайпа: `command | tee /dev/tty | processing`.
:::
