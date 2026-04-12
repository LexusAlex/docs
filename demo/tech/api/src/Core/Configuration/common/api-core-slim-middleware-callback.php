<?php

declare(strict_types=1);

use Slim\App;

return [
    'slim-middleware-callback' => static function () {
        return static function (App $app): void {
            $app->addBodyParsingMiddleware();
            $app->addRoutingMiddleware();
        };
    },
];
