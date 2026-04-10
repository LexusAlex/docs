<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Application;

use Psr\Container\ContainerInterface;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;
use Slim\App;
use Slim\Factory\AppFactory;

final readonly class Application
{
    private function __construct(
        private App $app,
        /** @var list<class-string> */
        private array $middlewares,
    ) {}

    /**
     * @internal
     * @param list<class-string> $middlewares
     */
    public static function createWithApp(App $app, array $middlewares): self
    {
        return new self($app, $middlewares);
    }

    /**
     * @param callable(App): void $routes
     */
    public static function create(ContainerInterface $container): self
    {
        if ($container->has(App::class)) {
            $app = $container->get(App::class);
        } else {
            $app = AppFactory::createFromContainer($container);
        }

        return new self($app, []);
    }

    /**
     * @param class-string ...$middlewares
     */
    public function middleware(string ...$middlewares): self
    {
        $newMiddlewares = $this->middlewares;
        foreach ($middlewares as $middleware) {
            $newMiddlewares[] = $middleware;
        }

        return new self($this->app, /** @var list<class-string> */ $newMiddlewares);
    }

    public function getApp(): App
    {
        return $this->app;
    }

    public function registerRoutesFromConfig(ContainerInterface $container): self
    {
        if ($container->has('slim-routes-callback')) {
            $routes = $container->get('slim-routes-callback');
            $routes($this->app);
        }

        return $this;
    }

    public function run(): void
    {
        foreach ($this->middlewares as $middleware) {
            $this->app->add($middleware);
        }
        $this->app->run();
    }
}
