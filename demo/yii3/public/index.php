<?php

declare(strict_types=1);

use App\Core\Main\Environment;
use Psr\Log\LogLevel;
use Yiisoft\ErrorHandler\Renderer\HtmlRenderer;
use Yiisoft\Log\Logger;
use Yiisoft\Log\Target\File\FileTarget;
use Yiisoft\Yii\Runner\Http\HttpApplicationRunner;
use Yiisoft\ErrorHandler\ErrorHandler;

// Корневая директория
$root = dirname(__DIR__);

// Подготовительные действия
require_once $root . '/src/Core/Main/autoload.php';


// Приложение
$runner = new HttpApplicationRunner(
    rootPath: $root,
    debug: Environment::appDebug(),
    checkEvents: Environment::appDebug(),
    environment: Environment::appEnv(),
    configDirectory: 'configurations',
    temporaryErrorHandler: new ErrorHandler(
        new Logger([
            new FileTarget($root . '/var/logs/app-container-building.log')->setLevels([
                LogLevel::EMERGENCY,
                LogLevel::ERROR,
                LogLevel::WARNING,
            ]),
        ]),
        // Дефолтный рендер
        new HtmlRenderer()
    )

);

//d($runner);
// Запуск
$runner->run();