<?php

use DI\FactoryInterface;
use Slim\App;

return [
    'slim-middleware-callback' => static function (FactoryInterface $factory) {
        return static function (App $app): void {
            $app->addBodyParsingMiddleware();
            $app->addRoutingMiddleware();
        };
    },
];