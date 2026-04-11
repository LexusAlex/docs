<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Container;

use DI\ContainerBuilder;
use Override;
use Psr\Container\ContainerInterface;

final class ContainerFactory implements ContainerFactoryInterface
{
    #[Override]
    /**
     * @param array<mixed> $dependencies
     */
    public function create(array $dependencies): ContainerInterface
    {
        $containerBuilder = new ContainerBuilder();
        $containerBuilder->addDefinitions($dependencies);

        return $containerBuilder->build();
    }
}
