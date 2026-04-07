<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Application;

use Psr\Container\ContainerInterface;
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
    public static function create(ContainerInterface $container, callable $routes): self
    {
        $app = AppFactory::createFromContainer($container);
        $routes($app);

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

    public function run(): void
    {
        foreach ($this->middlewares as $middleware) {
            $this->app->add($middleware);
        }
        $this->app->run();
    }
}
