<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Container;

use DI\ContainerBuilder;
use Override;
use Psr\Container\ContainerInterface;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;

final class ContainerFactory implements ContainerFactoryInterface
{
    #[Override]
    public function create(): ContainerInterface
    {
        $dependencies = ConfigurationLoader::load();

        $containerBuilder = new ContainerBuilder();
        $containerBuilder->addDefinitions($dependencies);

        return $containerBuilder->build();
    }
}
