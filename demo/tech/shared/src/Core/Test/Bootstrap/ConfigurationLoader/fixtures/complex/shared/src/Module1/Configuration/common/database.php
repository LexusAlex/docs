<?php

declare(strict_types=1);

return [
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
        'options' => [
            'timeout' => 30,
            'persistent' => false,
        ],
    ],
    'debug' => false,
    'max_connections' => 100,
];
