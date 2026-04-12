<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Shared\Core\Bootstrap\Container\ContainerFactory;

$config = ConfigurationLoader::load();

$container = new ContainerFactory()->create($config);

$application = Application::create($container);

$application
    ->registerMiddlewareFromConfig($container)
    ->registerRoutesFromConfig($container)
    ->run();
