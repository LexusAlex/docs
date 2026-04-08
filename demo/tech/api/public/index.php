<?php
declare(strict_types=1);

require __DIR__ . '/../../shared/vendor/autoload.php';
require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\Container\ContainerFactory;

$container = (new ContainerFactory())->create();
$application = Application::create($container);

$application->run();
