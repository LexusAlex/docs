<?php

declare(strict_types=1);

use Shared\Http\Response\JsonResponse;
use Slim\App;

return [
    'slim-routes-callback' => static function () {
        return static function (App $app): void {
            $app->get('/', static fn (): JsonResponse => new JsonResponse(new stdClass()));
        };
    },
];
