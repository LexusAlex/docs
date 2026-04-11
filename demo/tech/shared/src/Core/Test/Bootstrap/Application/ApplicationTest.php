<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Application;

use DateTime;
use Exception;
use Override;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Container\ContainerInterface;
use ReflectionClass;
use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Slim\App;
use stdClass;

use function count;

/**
 * @psalm-suppress PropertyNotSetInConstructor
 * @psalm-suppress MissingConstructor
 * @internal
 */
final class ApplicationTest extends TestCase
{
    private ContainerInterface $container;
    private Application $application;

    #[Override]
    protected function setUp(): void
    {
        parent::setUp();
        putenv('APPLICATION_ENVIRONMENT=test');
        putenv('CONFIG_SHARED_PATH=' . __DIR__ . '/fixtures/configs');
        ConfigurationLoader::projectRoot(__DIR__ . '/fixtures/configs');

        $this->container = new ContainerFactory()->create(ConfigurationLoader::load());
        $this->application = Application::create($this->container);
    }

    #[Override]
    protected function tearDown(): void
    {
        putenv('APPLICATION_ENVIRONMENT=test');
        putenv('CONFIG_SHARED_PATH');
        ConfigurationLoader::projectRoot(null);
        parent::tearDown();
    }

    #[Test]
    public function createReturnsApplication(): void
    {
        self::assertInstanceOf(Application::class, $this->application);
    }

    #[Test]
    public function createUsesFactoryWhenAppNotInContainer(): void
    {
        $container = $this->createMock(ContainerInterface::class);
        $container->expects(self::atLeastOnce())
            ->method('has')
            ->willReturn(false);

        $app = Application::create($container);

        self::assertInstanceOf(App::class, $app->getApp());
    }

    #[Test]
    public function middlewareReturnsNewInstance(): void
    {
        $application1 = $this->application;
        $application2 = $application1->middleware(stdClass::class);

        self::assertNotSame($application1, $application2);
    }

    #[Test]
    public function middlewareAccumulates(): void
    {
        $application = $this->application
            ->middleware(stdClass::class)
            ->middleware(DateTime::class);

        $routeCollector = $application->getApp()->getRouteCollector();

        self::assertCount(0, $routeCollector->getRoutes());
    }

    #[Test]
    #[DataProvider('provideMiddlewareClasses')]
    public function middlewareCreatesNewInstance(string ...$middlewares): void
    {
        /** @var list<class-string> $middlewares */
        $application = $this->application;

        foreach ($middlewares as $middleware) {
            $application = $application->middleware($middleware);
        }

        self::assertInstanceOf(App::class, $application->getApp());
    }

    #[Test]
    public function runMethodCallsRunOnApp(): void
    {
        $app = $this->createMock(App::class);
        $app->expects(self::once())
            ->method('run');

        $application = Application::createWithApp($app, []);

        $application->run();
    }

    #[Test]
    #[DataProvider('provideMiddlewareClasses')]
    public function runMethodAddsMiddlewares(string ...$middlewares): void
    {
        /** @var list<class-string> $middlewares */
        $app = $this->createMock(App::class);
        $app->expects(self::exactly(count($middlewares)))
            ->method('add');
        $app->expects(self::once())
            ->method('run');

        $application = Application::createWithApp($app, $middlewares);

        $application->run();
    }

    #[Test]
    public function createBuildsContainerWhenNotProvided(): void
    {
        self::assertInstanceOf(Application::class, $this->application);
    }

    #[Test]
    #[DataProvider('provideMiddlewareClasses')]
    public function middlewareStoresCorrectClasses(string ...$middlewares): void
    {
        /** @var list<class-string> $middlewares */
        $application = $this->application;

        foreach ($middlewares as $middleware) {
            $application = $application->middleware($middleware);
        }

        $reflection = new ReflectionClass($application);
        $property = $reflection->getProperty('middlewares');

        /** @var list<class-string> $stored */
        $stored = $property->getValue($application);

        self::assertCount(count($middlewares), $stored);

        foreach ($middlewares as $index => $middleware) {
            self::assertSame($middleware, $stored[$index]);
        }
    }

    /**
     * @return list<list<class-string>>
     */
    public static function provideMiddlewareClasses(): iterable
    {
        return [
            [stdClass::class],
            [stdClass::class, DateTime::class],
            [stdClass::class, DateTime::class, Exception::class],
        ];
    }

    #[Test]
    public function middlewareArrayHasSequentialNumericKeys(): void
    {
        $application = $this->application
            ->middleware(stdClass::class)
            ->middleware(DateTime::class);

        $reflection = new ReflectionClass($application);
        $property = $reflection->getProperty('middlewares');

        /** @var array<int, class-string> $middlewares */
        $middlewares = $property->getValue($application);

        self::assertSame([0, 1], array_keys($middlewares));
    }
}
