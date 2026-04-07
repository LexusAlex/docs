<?php
declare(strict_types=1);

require __DIR__ . '/../../shared/vendor/autoload.php';
require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Shared\Http\Response\JsonResponse;

$container = new ContainerFactory()->create();

print_r($container->get('test'));

$application = Application::create($container, function ($app) {
    $app->get('/', function (){return new JsonResponse(new stdClass());});
});

$application->run();
