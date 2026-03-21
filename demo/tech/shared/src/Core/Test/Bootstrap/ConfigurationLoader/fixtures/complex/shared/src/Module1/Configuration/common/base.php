<?php

declare(strict_types=1);

return [
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
        'max_connections' => 100,
        'debug' => false,
    ],
    'cache' => [
        'driver' => 'file',
        'path' => '/tmp/cache',
    ],
    'logger' => [
        'level' => 'info',
    ],
];
