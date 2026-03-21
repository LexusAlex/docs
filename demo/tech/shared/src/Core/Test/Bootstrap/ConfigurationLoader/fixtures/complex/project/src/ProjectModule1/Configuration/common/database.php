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
];
