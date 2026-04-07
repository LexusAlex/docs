<?php

declare(strict_types=1);

use Shared\Http\Response\JsonResponse;
use Slim\App;

return [
    'slim-routes' => static function (App $app): void {
        $app->get('/', function () {
            return new JsonResponse(new \stdClass());
        });
    },

    'test' => static function () {
        return 123;
    }
];
