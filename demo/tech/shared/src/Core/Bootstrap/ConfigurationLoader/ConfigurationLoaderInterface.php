<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\ConfigurationLoader;

interface ConfigurationLoaderInterface
{
    /**
     * @return array<mixed, mixed>
     */
    public static function load(): array;

    public static function projectRoot(string $path): void;
}
