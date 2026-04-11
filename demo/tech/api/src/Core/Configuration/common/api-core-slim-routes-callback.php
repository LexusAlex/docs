<?php

declare(strict_types=1);

use DI\FactoryInterface;
use Shared\Http\Response\JsonResponse;
use Slim\App;

return [
    'slim-routes-callback' => static function (FactoryInterface $factory) {
        return static function (App $app) use ($factory): void {
            $app->get('/', function (): JsonResponse {
                return new JsonResponse(new \stdClass());
            });
        };
    },
];
