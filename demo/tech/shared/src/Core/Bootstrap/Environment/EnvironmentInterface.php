<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Environment;

interface EnvironmentInterface
{
    public function get(string $name, ?string $default = null): string;
}
