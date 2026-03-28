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
        $container = $this->createContainer();

        self::assertInstanceOf(ContainerInterface::class, $container);
        self::assertInstanceOf(Container::class, $container);
    }

    #[Test]
    public function canGetSimpleValueFromContainer(): void
    {
        $container = $this->createContainer();

        /** @var string $value */
        $value = $container->get('test.value');

        self::assertSame('from_config', $value);
    }

    #[Test]
    public function canGetServiceWithDependencies(): void
    {
        $container = $this->createContainer();

        /** @var TestService $service */
        $service = $container->get(TestService::class);

        self::assertInstanceOf(TestService::class, $service);
        self::assertSame('from_config', $service->getValue());
    }

    #[Test]
    public function containerReturnsSameInstance(): void
    {
        $container = $this->createContainer();

        /** @var TestService $service1 */
        $service1 = $container->get(TestService::class);
        /** @var TestService $service2 */
        $service2 = $container->get(TestService::class);

        self::assertSame($service1, $service2);
    }

    #[Test]
    public function hasReturnsTrueForRegisteredService(): void
    {
        $container = $this->createContainer();

        self::assertTrue($container->has(TestService::class));
    }

    #[Test]
    public function hasReturnsTrueForRegisteredValue(): void
    {
        $container = $this->createContainer();

        self::assertTrue($container->has('test.value'));
    }

    #[Test]
    public function hasReturnsFalseForUnregisteredService(): void
    {
        $container = $this->createContainer();

        self::assertFalse($container->has('NonExistentService'));
    }

    #[Test]
    public function throwsExceptionWhenServiceNotFound(): void
    {
        $container = $this->createContainer();

        $this->expectException(NotFoundException::class);

        $container->get('NonExistentService');
    }

    #[Test]
    public function productionEnvironmentLoadsDifferentConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var string $productionValue */
        $productionValue = $container->get('test.value');

        self::assertSame('production_value', $productionValue);
    }

    #[Test]
    public function canGetNestedDependentService(): void
    {
        $container = $this->createContainer();

        /** @var DependentService $service */
        $service = $container->get(DependentService::class);

        self::assertInstanceOf(DependentService::class, $service);
        self::assertInstanceOf(TestService::class, $service->getTestService());
        self::assertSame('from_config', $service->getValueFromTestService());
    }

    #[Test]
    public function canGetDeepNestedDependentService(): void
    {
        $container = $this->createContainer();

        /** @var DeepDependentService $service */
        $service = $container->get(DeepDependentService::class);

        self::assertInstanceOf(DeepDependentService::class, $service);
        self::assertSame('string_value', $service->getConfigValue());
        self::assertSame('from_config', $service->getValueFromChain());
    }

    #[Test]
    public function canGetStringConfig(): void
    {
        $container = $this->createContainer();

        /** @var string $value */
        $value = $container->get('test.config_string');

        self::assertSame('string_value', $value);
    }

    #[Test]
    public function canGetIntConfig(): void
    {
        $container = $this->createContainer();

        /** @var int $value */
        $value = $container->get('test.config_int');

        self::assertSame(42, $value);
    }

    #[Test]
    public function canGetFloatConfig(): void
    {
        $container = $this->createContainer();

        /** @var float $value */
        $value = $container->get('test.config_float');

        self::assertSame(3.14, $value);
    }

    #[Test]
    public function canGetBoolConfig(): void
    {
        $container = $this->createContainer();

        /** @var bool $value */
        $value = $container->get('test.config_bool');

        self::assertTrue($value);
    }

    #[Test]
    public function canGetFalseBoolConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var bool $value */
        $value = $container->get('test.config_bool');

        self::assertFalse($value);
    }

    #[Test]
    public function canGetArrayConfig(): void
    {
        $container = $this->createContainer();

        /** @var array<string, mixed> $value */
        $value = $container->get('test.config_array');

        self::assertArrayHasKey('key', $value);
        self::assertSame('value', $value['key']);
        self::assertArrayHasKey('nested', $value);
    }

    #[Test]
    public function canGetEmptyArrayConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var array<mixed, mixed> $value */
        $value = $container->get('test.config_empty_array');

        self::assertSame([], $value);
    }

    #[Test]
    public function canGetNullConfig(): void
    {
        $container = $this->createContainer();

        /** @var mixed $value */
        $value = $container->get('test.config_null');

        self::assertNull($value);
    }

    #[Test]
    public function canGetZeroIntConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var int $value */
        $value = $container->get('test.config_zero');

        self::assertSame(0, $value);
    }

    #[Test]
    public function canGetNegativeIntConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var int $value */
        $value = $container->get('test.config_negative_int');

        self::assertSame(-42, $value);
    }

    #[Test]
    public function canGetNegativeFloatConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var float $value */
        $value = $container->get('test.config_negative_float');

        self::assertSame(-3.14, $value);
    }

    #[Test]
    public function canGetEmptyStringConfig(): void
    {
        $container = $this->createProductionContainer();

        /** @var string $value */
        $value = $container->get('test.config_empty_string');

        self::assertSame('', $value);
    }

    #[Test]
    public function autowiringCreatesServiceWithoutFactory(): void
    {
        $container = $this->createContainer();

        /** @var AutowireableService $service */
        $service = $container->get(AutowireableService::class);

        self::assertInstanceOf(AutowireableService::class, $service);
        self::assertSame('autowireable', $service->getName());
    }

    #[Test]
    public function autowiringInjectsConstructorDependencies(): void
    {
        $container = $this->createContainer();

        /** @var AutowireableWithDependency $service */
        $service = $container->get(AutowireableWithDependency::class);

        self::assertInstanceOf(AutowireableWithDependency::class, $service);
        self::assertInstanceOf(TestService::class, $service->getTestService());
        self::assertSame('from_config', $service->getTestService()->getValue());
    }

    #[Test]
    public function autowiringThrowsForNonExistentClass(): void
    {
        $container = $this->createContainer();

        $this->expectException(NotFoundException::class);

        $container->get('NonExistentClass');
    }

    private function createContainer(): ContainerInterface
    {
        return new ContainerFactory()->create();
    }

    private function createProductionContainer(): ContainerInterface
    {
        putenv('APPLICATION_ENVIRONMENT=production');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/configs');
        return new ContainerFactory()->create();
    }

    private function resetEnvironment(): void
    {
        putenv('APPLICATION_ENVIRONMENT=test');
        putenv('CONFIG_SHARED_PATH=' . $this->fixturesPath . '/configs');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/configs');
    }
}
