<?php

use App\Core\Main\Environment;

return [
    'config-plugin' => [
        'di' => 'common/di/*.php',
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