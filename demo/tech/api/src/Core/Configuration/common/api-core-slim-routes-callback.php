<?php

declare(strict_types=1);

use DI\FactoryInterface;
use Shared\Http\Response\JsonResponse;

return [
    'slim-routes-callback' => static function (FactoryInterface $factory) {
        return static function ($app) use ($factory): void {
            $app->get('/', function () {
                return new JsonResponse(new \stdClass());
            });
        };
    },
];
