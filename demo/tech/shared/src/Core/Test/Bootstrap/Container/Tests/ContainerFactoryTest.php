<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Container\Tests;

use DI\Container;
use DI\NotFoundException;
use Override;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Container\ContainerInterface;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Shared\Core\Test\Bootstrap\Container\Services\AutowireableService;
use Shared\Core\Test\Bootstrap\Container\Services\AutowireableWithDependency;
use Shared\Core\Test\Bootstrap\Container\Services\DeepDependentService;
use Shared\Core\Test\Bootstrap\Container\Services\DependentService;
use Shared\Core\Test\Bootstrap\Container\Services\TestService;

/**
 * @internal
 */
final class ContainerFactoryTest extends TestCase
{
    private string $fixturesPath = '';

    #[Override]
    protected function setUp(): void
    {
        parent::setUp();
        $this->fixturesPath = __DIR__ . '/../fixtures';
        $this->resetEnvironment();
    }

    #[Override]
    protected function tearDown(): void
    {
        $this->resetEnvironment();
        parent::tearDown();
    }

    #[Test]
    public function createReturnsContainer(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        self::assertInstanceOf(ContainerInterface::class, $container);
        self::assertInstanceOf(Container::class, $container);
    }

    #[Test]
    public function canGetSimpleValueFromContainer(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var string $value */
        $value = $container->get('test.value');

        self::assertSame('from_config', $value);
    }

    #[Test]
    public function canGetServiceWithDependencies(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var TestService $service */
        $service = $container->get(TestService::class);

        self::assertInstanceOf(TestService::class, $service);
        self::assertSame('from_config', $service->getValue());
    }

    #[Test]
    public function containerReturnsSameInstance(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var TestService $service1 */
        $service1 = $container->get(TestService::class);
        /** @var TestService $service2 */
        $service2 = $container->get(TestService::class);

        self::assertSame($service1, $service2);
    }

    #[Test]
    public function hasReturnsTrueForRegisteredService(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        self::assertTrue($container->has(TestService::class));
    }

    #[Test]
    public function hasReturnsTrueForRegisteredValue(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        self::assertTrue($container->has('test.value'));
    }

    #[Test]
    public function hasReturnsFalseForUnregisteredService(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        self::assertFalse($container->has('NonExistentService'));
    }

    #[Test]
    public function throwsExceptionWhenServiceNotFound(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        $this->expectException(NotFoundException::class);

        $container->get('NonExistentService');
    }

    #[Test]
    public function productionEnvironmentLoadsProductionConfig(): void
    {
        putenv('APPLICATION_ENVIRONMENT=production');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/configs');

        $factory = new ContainerFactory();
        $container = $factory->create();

        self::assertTrue($container->has('test.value'));
    }

    #[Test]
    public function canGetNestedDependentService(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var DependentService $service */
        $service = $container->get(DependentService::class);

        self::assertInstanceOf(DependentService::class, $service);
        self::assertInstanceOf(TestService::class, $service->getTestService());
        self::assertSame('from_config', $service->getValueFromTestService());
    }

    #[Test]
    public function canGetDeepNestedDependentService(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var DeepDependentService $service */
        $service = $container->get(DeepDependentService::class);

        self::assertInstanceOf(DeepDependentService::class, $service);
        self::assertSame('string_value', $service->getConfigValue());
        self::assertSame('from_config', $service->getValueFromChain());
    }

    #[Test]
    public function canGetStringConfig(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var string $value */
        $value = $container->get('test.config_string');

        self::assertSame('string_value', $value);
    }

    #[Test]
    public function canGetIntConfig(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var int $value */
        $value = $container->get('test.config_int');

        self::assertSame(42, $value);
    }

    #[Test]
    public function canGetFloatConfig(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var float $value */
        $value = $container->get('test.config_float');

        self::assertSame(3.14, $value);
    }

    #[Test]
    public function canGetBoolConfig(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var bool $value */
        $value = $container->get('test.config_bool');

        self::assertTrue($value);
    }

    #[Test]
    public function canGetArrayConfig(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var array<string, mixed> $value */
        $value = $container->get('test.config_array');

        self::assertArrayHasKey('key', $value);
        self::assertSame('value', $value['key']);
        self::assertArrayHasKey('nested', $value);
    }

    #[Test]
    public function canGetNullConfig(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var mixed $value */
        $value = $container->get('test.config_null');

        self::assertNull($value);
    }

    #[Test]
    public function autowiringCreatesServiceWithoutFactory(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var AutowireableService $service */
        $service = $container->get(AutowireableService::class);

        self::assertInstanceOf(AutowireableService::class, $service);
    }

    #[Test]
    public function autowiringInjectsConstructorDependencies(): void
    {
        $factory = new ContainerFactory();
        $container = $factory->create();

        /** @var AutowireableWithDependency $service */
        $service = $container->get(AutowireableWithDependency::class);

        self::assertInstanceOf(AutowireableWithDependency::class, $service);
        self::assertInstanceOf(TestService::class, $service->getTestService());
        self::assertSame('from_config', $service->getTestService()->getValue());
    }

    private function resetEnvironment(): void
    {
        putenv('APPLICATION_ENVIRONMENT=test');
        putenv('CONFIG_SHARED_PATH=' . $this->fixturesPath . '/configs');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/configs');
    }
}
