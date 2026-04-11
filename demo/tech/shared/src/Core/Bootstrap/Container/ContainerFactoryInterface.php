<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Container;

use Psr\Container\ContainerInterface;

interface ContainerFactoryInterface
{
    /**
     * @param array<mixed> $dependencies
     */
    public function create(array $dependencies): ContainerInterface;
}
