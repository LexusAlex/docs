<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Application;

use DateTime;
use Exception;
use Override;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use ReflectionClass;
use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Slim\App;
use stdClass;

use function count;

/**
 * @internal
 */
final class ApplicationTest extends TestCase
{
    #[Override]
    protected function setUp(): void
    {
        parent::setUp();
        putenv('APPLICATION_ENVIRONMENT=test');
    }

    #[Override]
    protected function tearDown(): void
    {
        putenv('APPLICATION_ENVIRONMENT=test');
        parent::tearDown();
    }

    #[Test]
    public function createReturnsApplication(): void
    {
        $application = Application::create(self::emptyRoutes(...));

        self::assertInstanceOf(Application::class, $application);
    }

    #[Test]
    public function getAppReturnsSlimApp(): void
    {
        $application = Application::create(self::emptyRoutes(...));

        self::assertInstanceOf(App::class, $application->getApp());
    }

    #[Test]
    public function routesCallbackIsCalled(): void
    {
        $routesCalled = false;

        $application = Application::create(
            static function (App $app) use (&$routesCalled): void {
                $routesCalled = true;
            }
        );

        self::assertInstanceOf(App::class, $application->getApp());
        self::assertTrue($routesCalled);
    }

    #[Test]
    public function middlewareReturnsNewInstance(): void
    {
        $application1 = Application::create(self::emptyRoutes(...));
        $application2 = $application1->middleware(stdClass::class);

        self::assertNotSame($application1, $application2);
    }

    #[Test]
    public function middlewareAccumulates(): void
    {
        $application = Application::create(self::emptyRoutes(...))
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
        $application = Application::create(self::emptyRoutes(...));

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
        $container = null;
        $application = Application::create(self::emptyRoutes(...), $container);

        self::assertInstanceOf(Application::class, $application);
    }

    #[Test]
    public function createUsesProvidedContainer(): void
    {
        $container = new ContainerFactory()->create();
        $application = Application::create(self::emptyRoutes(...), $container);

        self::assertSame($container, $application->getApp()->getContainer());
    }

    #[Test]
    #[DataProvider('provideMiddlewareClasses')]
    public function middlewareStoresCorrectClasses(string ...$middlewares): void
    {
        /** @var list<class-string> $middlewares */
        $application = Application::create(self::emptyRoutes(...));

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
        $application = Application::create(self::emptyRoutes(...))
            ->middleware(stdClass::class)
            ->middleware(DateTime::class);

        $reflection = new ReflectionClass($application);
        $property = $reflection->getProperty('middlewares');

        /** @var array<int, class-string> $middlewares */
        $middlewares = $property->getValue($application);

        self::assertSame([0, 1], array_keys($middlewares));
    }

    private static function emptyRoutes(App $app): void {}
}
