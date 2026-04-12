<?php

declare(strict_types=1);

namespace Test\Functional;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Shared\Core\Bootstrap\Application\Application;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Shared\Core\Bootstrap\Container\ContainerFactory;
use Slim\Psr7\Factory\ServerRequestFactory;

/**
 * @internal
 */
final class MainPageTest extends TestCase
{
    private const FIXTURE_PATH = __DIR__ . '/../../../../shared/src/Core/Test/Bootstrap/ConfigurationLoader/fixtures/complex/project';

    protected function tearDown(): void
    {
        putenv('APPLICATION_ENVIRONMENT');
        putenv('CONFIG_SHARED_PATH');
        parent::tearDown();
    }

    #[Test]
    public function mainPageReturnsOkWithEmptyJson(): void
    {
        putenv('APPLICATION_ENVIRONMENT=test');
        putenv('CONFIG_SHARED_PATH=' . realpath(self::FIXTURE_PATH));

        $container = new ContainerFactory()->create(ConfigurationLoader::load());
        $application = Application::create($container)
            ->registerMiddlewareFromConfig($container)
            ->registerRoutesFromConfig($container);

        $app = $application->getApp();

        $request = new ServerRequestFactory()->createServerRequest('GET', '/');

        $response = $app->handle($request);

        self::assertSame(200, $response->getStatusCode());
        self::assertSame('application/json', $response->getHeaderLine('Content-Type'));
        self::assertSame('{}', (string)$response->getBody());
        self::assertNotEmpty($app->getRouteCollector()->getRoutes(), 'Expected at least one route registered');
    }
}
