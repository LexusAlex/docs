<?php
declare(strict_types=1);

require __DIR__ . '/../../shared/vendor/autoload.php';
require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\Application\Application;
use Shared\Http\Response\JsonResponse;

$application = Application::create(function ($app) {
    $app->get('/', function (){return new JsonResponse(new stdClass());});
});

$application->run();
