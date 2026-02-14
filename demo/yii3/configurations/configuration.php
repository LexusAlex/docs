<?php

use App\Core\Main\Environment;

return [
    'config-plugin' => [
        // Основные параметры приложения
        'params' => 'common/params.php',
        'params-web' => [
            '$params',
            'web/params.php',
        ],
        // Di контейнер
        'di' => 'common/di/*.php',
        'di-web' => [
            '$di',
            'web/di/*.php',
        ],
        // bootstap конфигурация
        'bootstrap' => [],
        'bootstrap-web' => '$bootstrap',
        // События
        'events' => [],
        'events-web' => ['$events'],
        // Маршруты
        'routes' => 'common/routes.php',
    ],
    'config-plugin-environments' => [
        Environment::DEV => [
            'params' => [
                'environments/dev/params.php',
            ],
        ],
        Environment::TEST => [
            'params' => [
                'environments/test/params.php',
            ],
        ],
        Environment::PROD => [
            'params' => [
                'environments/prod/params.php',
            ],
        ],
    ],
    'config-plugin-options' => [
        'source-directory' => 'configurations',
    ],
];