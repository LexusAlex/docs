<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\Environment;

final class EnvironmentProductionChecker
{
    public function isProduction(): bool
    {
        $environment = new Environment();

        return 'production' === $environment->get('APPLICATION_ENVIRONMENT', 'production');
    }
}
