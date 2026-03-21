<?php

declare(strict_types=1);

return [
    'shared' => [
        'key' => 'shared_value',
        'module' => 'SomeModule',
        'common_key' => 'common_value',
        'nested' => [
            'key' => 'shared_nested',
            'preserved' => 'shared_value',
        ],
        'project_only' => 'new_key',
    ],
];
