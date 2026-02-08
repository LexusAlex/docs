# config

Пакет для управления конфигурациями. Пакет становится плагином, содержащим как код, так и конфигурацию по умолчанию.

Пакет состоит из частей:

- Плагин `composer`
- Загрузчик конфигурации

После выполнения команд:

- `dump-autoload`
- `require`
- `update`
- `remove`

Плагин `composer` делает следующее

- Проверяет все зависимые пакеты на предмет наличия `config-plugin` в `composer.json`
- Записывает план из всех пакетов в файл `.merge-plan.php`

Например, блок [error-handler](https://github.com/yiisoft/error-handler/blob/master/composer.json) содержит блок `config-plugin`

````json
{
  "extra": {
    "bamarni-bin": {
      "bin-links": true,
      "target-directory": "tools",
      "forward-command": true
    },
    "config-plugin-options": {
      "source-directory": "config"
    },
    "config-plugin": {
      "di-web": "di-web.php"
    }
  }
}
````

В последствии в `.merge-plan` он запишется так

````php
return [
    '/' => [
        'di-web' => [
            'yiisoft/error-handler' => [
                'config/di-web.php',
            ],
        ],
    ]    
]
````

Конфигурация состоит из трех групп:

- Конфигурация `vendor/package-name`, там содержаться значения по умолчанию
- Настройки корневого пакета `config`
- Конфигурация зависящая от среды выполнения

При этом одинаковых ключей не может быть.

Конфигурацию можно задать разными способами, посмотрим на один из путей, пропишем главный файл конфигурации в `composer.json`, `"config-plugin-file": "configurations/configuration.php"`

Фаил содержит секции

- `config-plugin` - содержит группы конфигураций. Это основная конфигурация приложения
- `config-plugin-environments` - конфигурация для разных сред выполнения
- `config-plugin-options` - настройки