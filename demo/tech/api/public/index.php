<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;

$config = ConfigurationLoader::load();

print_r($config);