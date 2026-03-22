<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\ConfigurationLoader;

use Laminas\ConfigAggregator\ConfigAggregator;
use Laminas\ConfigAggregator\PhpFileProvider;
use Override;
use RuntimeException;
use Shared\Core\Bootstrap\Environment\Environment;

use function sprintf;

final class ConfigurationLoader implements ConfigurationLoaderInterface
{
    private const string CONFIG_PATH_TEMPLATE = '%s/src/*/Configuration/%s/*.php';

    private static ?string $projectRoot = null;

    #[Override]
    public static function load(): array
    {
        $environment = new Environment();
        $environmentName = $environment->get('APPLICATION_ENVIRONMENT', 'production');

        /** @infection-ignore-all */
        $sharedPath = $environment->get('CONFIG_SHARED_PATH', __DIR__ . '/../../../../');

        return new ConfigAggregator(self::buildProviders($sharedPath, self::resolveProjectRoot(), $environmentName))->getMergedConfig();
    }

    #[Override]
    public static function projectRoot(?string $path): void
    {
        self::$projectRoot = '' === $path ? null : $path;
    }

    private static function resolveProjectRoot(): string
    {
        $path = self::$projectRoot ?? new Environment()->get('CONFIG_PROJECT_ROOT');

        if (!is_dir($path)) {
            throw new RuntimeException('Project root path is not set or does not exist: ' . $path);
        }

        return $path;
    }

    /**
     * @return list<PhpFileProvider>
     */
    private static function buildProviders(string $sharedPath, string $projectRoot, string $environment): array
    {
        $paths = [$sharedPath, $projectRoot];
        $environments = ['common', $environment];

        return array_merge(
            ...array_map(
                static fn (string $base) => array_map(
                    static fn (string $env) => new PhpFileProvider(sprintf(self::CONFIG_PATH_TEMPLATE, $base, $env)),
                    $environments
                ),
                $paths
            )
        );
    }
}
