<?php

declare(strict_types=1);

use App\Environment;
use Yiisoft\Yii\Runner\Http\HttpApplicationRunner;

// Корневая директория
$root = dirname(__DIR__);

// Подготовительные действия
require_once $root . '/src/autoload.php';

// Приложение
$runner = new HttpApplicationRunner(
    rootPath: $root,
    debug: Environment::appDebug(),
    checkEvents: Environment::appDebug(),
    environment: Environment::appEnv(),
    configDirectory: 'configurations'
);

// Запуск
$runner->run();