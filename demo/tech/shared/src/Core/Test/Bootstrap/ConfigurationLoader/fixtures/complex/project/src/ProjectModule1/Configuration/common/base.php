<?php

declare(strict_types=1);

return [
    'database' => [
        'port' => 5432,
        'driver' => 'pgsql',
        'options' => [
            'timeout' => 60,
            'persistent' => true,
        ],
    ],
    'cache' => [
        'driver' => 'redis',
        'host' => 'redis.example.com',
    ],
    'routes' => [
        'home' => '/',
        'api' => '/api/v1',
    ],
];
