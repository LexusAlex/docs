<?php

declare(strict_types=1);

use DI\FactoryInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Slim\App;
use Slim\Psr7\Factory\ResponseFactory;

return [
    ResponseFactoryInterface::class => static fn (): ResponseFactoryInterface => new ResponseFactory(),
    'slim-routes-callback' => static function (FactoryInterface $factory) {
        return static function (App $app): void {
            $app->get('/test-route', function () {
                echo 'test';
            });
        };
    },
    'slim-middleware' => static function (FactoryInterface $factory) {
        return static function (App $app): void {
            $app->addRoutingMiddleware();
        };
    },
];