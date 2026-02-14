<?php

declare(strict_types=1);

return [
    'applications' => [
        'charset' => 'UTF-8',
        'locale' => 'ru',
        'name' => 'My Project',
    ],
    'yiisoft/aliases' => [
        'aliases' => [
            '@root' => dirname(__DIR__, 2),
            '@src' => '@root/src',
            '@assets' => '@root/public/assets',
            '@assetsUrl' => '@baseUrl/assets',
            '@assetsSource' => '@root/assets',
            '@baseUrl' => '/',
            '@public' => '@root/public',
            '@runtime' => '@root/var',
            '@vendor' => '@root/vendor',
        ]
    ],
];
