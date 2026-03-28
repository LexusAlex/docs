<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Container\Services;

final class AutowireableService
{
    public function __construct(
        private readonly string $name = 'autowireable',
    ) {}

    public function getName(): string
    {
        return $this->name;
    }
}
