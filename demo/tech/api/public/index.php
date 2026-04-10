<?php
declare(strict_types=1);

require __DIR__ . '/../../shared/vendor/autoload.php';
require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;

$config = ConfigurationLoader::load();

$container = new ContainerFactory()->create($config);

$application = Application::create($container);

$application
    ->registerRoutesFromConfig($container)
    ->run();
