<?php

declare(strict_types=1);

use Psr\Container\ContainerInterface;
use Shared\Core\Test\Bootstrap\Container\Services\DeepDependentService;
use Shared\Core\Test\Bootstrap\Container\Services\DependentService;
use Shared\Core\Test\Bootstrap\Container\Services\TestService;

return [
    TestService::class => static function (ContainerInterface $container): TestService {
        /** @var string $value */
        $value = $container->get('test.value') ?? 'default';
        return new TestService($value);
    },

    DependentService::class => static function (ContainerInterface $container): DependentService {
        /** @var TestService $testService */
        $testService = $container->get(TestService::class);
        return new DependentService($testService);
    },

    DeepDependentService::class => static function (ContainerInterface $container): DeepDependentService {
        /** @var DependentService $dependentService */
        $dependentService = $container->get(DependentService::class);
        /** @var string $configValue */
        $configValue = $container->get('test.config_string');
        return new DeepDependentService($dependentService, $configValue);
    },

    'test.value' => 'from_config',
    'test.config_string' => 'string_value',
    'test.config_int' => 42,
    'test.config_float' => 3.14,
    'test.config_bool' => true,
    'test.config_array' => ['key' => 'value', 'nested' => ['a', 'b', 'c']],
    'test.config_null' => null,
];
