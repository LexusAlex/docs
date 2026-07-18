# jq

**Уровень:** Средний

Команда `jq` — мощный процессор JSON для командной строки с поддержкой фильтрации, трансформации и форматирования.

## Синтаксис

```bash
jq [опции] 'фильтр' файл...
jq 'фильтр' < файл.json
команда | jq 'фильтр'
```

## Основные опции

| Опция | Описание |
|-------|----------|
| `-r` | Вывод без кавычек (raw output) |
| `-c` | Компактный вывод (без форматирования) |
| `-e` | Вернуть exit code 1, если результат — null или false |
| `-s` | Собрать весь входной поток в массив |
| `-S` | Сортировать ключи объектов |
| `--arg ИМЯ ЗНАЧЕНИЕ` | Передать строковую переменную |
| `--argjson ИМЯ ЗНАЧЕНИЕ` | Передать JSON-переменную |
| `--slurpfile ИМЯ ФАЙЛ` | Прочитать JSON из файла в переменную |
| `--rawfile ИМЯ ФАЙЛ` | Прочитать текст из файла в переменную |
| `--tab` | Использовать табуляцию для отступов |
| `--indent N` | Количество пробелов для отступов |

## Основные фильтры

| Фильтр | Описание |
|--------|----------|
| `.` | Весь объект |
| `.key` | Значение ключа |
| `.key1.key2` | Вложенный ключ |
| `.[0]` | Элемент массива по индексу |
| `.[2:5]` | Срез массива |
| `.[]` | Итерация по всем элементам |
| `.[]?` | Безопасная итерация (без ошибок) |
| `length` | Длина массива или строки |
| `keys` | Ключи объекта |
| `values` | Значения объекта |
| `type` | Тип значения |
| `has("key")` | Проверка наличия ключа |
| `map(фильтр)` | Применить фильтр к каждому элементу |
| `select(условие)` | Фильтрация по условию |
| `sort_by(ключ)` | Сортировка по ключу |
| `group_by(ключ)` | Группировка по ключу |
| `unique_by(ключ)` | Уникальные по ключу |
| `flatten` | Развернуть вложенные массивы |
| `add` | Объединить массивы |
| `to_entries` | Преобразовать объект в массив пар |
| `from_entries` | Преобразовать массив пар в объект |
| `join("разделитель")` | Объединить массив в строку |
| `split("разделитель")` | Разделить строку в массив |
| `test("regex")` | Проверка регулярным выражением |
| `match("regex")` | Поиск совпадений |
| `gsub("regex"; "замена")` | Глобальная замена |
| `tonumber` | Преобразовать в число |
| `tostring` | Преобразовать в строку |
| `empty` | Пустой результат |
| `input` | Следующая JSON-запись из входного потока |
| `inputs` | Все JSON-записи из входного потока |

## Примеры

```bash
# Красивый вывод JSON
echo '{"name":"Alice","age":30}' | jq '.'

# Извлечь значение ключа
echo '{"name":"Alice","age":30}' | jq '.name'

# Извлечь вложенный ключ
echo '{"user":{"name":"Alice"}}' | jq '.user.name'

# Элемент массива
echo '[1,2,3,4,5]' | jq '.[2]'

# Срез массива
echo '[1,2,3,4,5]' | jq '.[1:3]'

# Итерация по массиву
echo '[{"name":"Alice"},{"name":"Bob"}]' | jq '.[].name'

# Компактный вывод
echo '{"name":"Alice","age":30}' | jq -c '.'

# Raw output (без кавычек)
echo '{"name":"Alice"}' | jq -r '.name'

# Фильтрация массива
echo '[1,2,3,4,5]' | jq '.[] | select(. > 3)'

# Фильтрация объектов
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' | jq '.[] | select(.age > 28)'

# Map — применить фильтр к каждому элементу
echo '[1,2,3]' | jq 'map(. * 2)'

# Длина массива
echo '[1,2,3,4,5]' | jq 'length'

# Ключи объекта
echo '{"name":"Alice","age":30}' | jq 'keys'

# Тип значения
echo '"hello"' | jq 'type'

# Сортировка
echo '[3,1,4,1,5]' | jq 'sort'

# Сортировка по ключу
echo '[{"name":"Bob"},{"name":"Alice"}]' | jq 'sort_by(.name)'

# Группировка
echo '[{"type":"a","val":1},{"type":"b","val":2},{"type":"a","val":3}]' | jq 'group_by(.type)'

# Уникальные элементы
echo '[1,2,2,3,3,3]' | jq 'unique'

# Объединение массивов
echo '[[1,2],[3,4]]' | jq 'add'

# Join массива в строку
echo '["hello","world"]' | jq 'join(" ")'

# Split строки в массив
echo '"hello world"' | jq 'split(" ")'

# Проверка наличия ключа
echo '{"name":"Alice"}' | jq 'has("name")'

# Создание нового объекта
echo '{"first":"Alice","last":"Doe"}' | jq '{fullname: (.first + " " + .last)}'

# Условная логика
echo '{"age":30}' | jq 'if .age >= 18 then "adult" else "minor" end'

# Переменные через --arg
echo '{}' | jq --arg name "Alice" '{name: $name}'
```

## Практические сценарии

### Обработка API-ответов
```bash
# Получить данные из API
curl -s https://api.example.com/users | jq '.users[].name'

# Извлечь конкретные поля
curl -s https://api.github.com/users/octocat | jq '{name, bio, repos: .public_repos}'

# Фильтрация по условию
curl -s https://api.example.com/products | jq '.[] | select(.price < 100)'
```

### Работа с конфигурационными файлами
```bash
# Прочитать значение из package.json
jq '.version' package.json

# Изменить значение в файле
jq '.version = "2.0.0"' package.json > tmp.json && mv tmp.json package.json

# Добавить ключ
jq '. + {"newKey": "value"}' config.json > tmp.json && mv tmp.json config.json
```

### Анализ логов в JSON
```bash
# Фильтрация логов по уровню
cat app.log | jq 'select(.level == "error")'

# Подсчёт по уровням
cat app.log | jq -s 'group_by(.level) | map({level: .[0].level, count: length})'

# Топ-10 самых частых сообщений
cat app.log | jq -s 'group_by(.message) | sort_by(-length) | .[0:10] | map({message: .[0].message, count: length})'
```

### Преобразование форматов
```bash
# JSON в CSV
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' | jq -r '.[] | [.name, .age] | @csv'

# JSON в TSV
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' | jq -r '.[] | [.name, .age] | @tsv'

# JSON в массив значений
echo '{"a":1,"b":2,"c":3}' | jq '[.[]]'
```

### Работа с Docker/Kubernetes
```bash
# Имена запущенных контейнеров
docker ps --format json | jq -s '.[].Names'

# Статус подов
kubectl get pods -o json | jq '.items[] | {name: .metadata.name, status: .status.phase}'
```

## Советы

:::tip
Используйте `-r` (raw output) для получения строк без кавычек. Это удобно для передачи результатов в другие команды.
:::

:::warning
`jq` чувствителен к синтаксису. Используйте одинарные кавычки для фильтров, чтобы bash не интерпретировал спецсимволы.
:::

:::tip
Для передачи bash-переменных в jq используйте `--arg`: `jq --arg var "$bash_var" '.key = $var'`.
:::

:::warning
При обработке больших JSON-файлов используйте потоковый режим `jq --stream` для экономии памяти.
:::

:::tip
Используйте `jq -e` в скриптах для проверки на null/false: `if jq -e '.key' file.json > /dev/null 2>&1; then ... fi`.
:::

:::tip
Для сложных фильтров лучше использовать файл: `jq -f filter.jq data.json`.
## См. также

- [curl](network/curl.md) — HTTP-запросы
- [grep](search-files-and-commands/grep.md) — поиск в тексте

:::
