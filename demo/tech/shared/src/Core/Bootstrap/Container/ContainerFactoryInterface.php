<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Container;

use Psr\Container\ContainerInterface;

interface ContainerFactoryInterface
{
    public function create(): ContainerInterface;
}
