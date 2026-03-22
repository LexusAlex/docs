<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Environment;

use Override;
use RuntimeException;

final class Environment implements EnvironmentInterface
{
    #[Override]
    public function get(string $name, ?string $default = null): string
    {
        $currentValue = getenv($name);

        if (false !== $currentValue) {
            return $currentValue;
        }

        if (null !== $default) {
            return $default;
        }

        throw new RuntimeException('Undefined environment variable ' . $name);
    }
}
