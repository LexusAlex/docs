<?php
declare(strict_types=1);

require __DIR__ . '/../../shared/vendor/autoload.php';
require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\Application\Application;

$application = Application::create(function ($app) {
    //$app->get('/', \Api\Action\HomeAction::class);
});

print_r('ui');
//$application->run();
