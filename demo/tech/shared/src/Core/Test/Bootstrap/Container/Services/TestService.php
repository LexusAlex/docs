<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Container\Services;

final class TestService
{
    public function __construct(
        private readonly string $value,
    ) {}

    public function getValue(): string
    {
        return $this->value;
    }
}
