<?php

declare(strict_types=1);

namespace Shared\Core\Bootstrap\ConfigurationLoader;

use Laminas\ConfigAggregator\ConfigAggregator;
use Laminas\ConfigAggregator\PhpFileProvider;
use Override;
use RuntimeException;
use Shared\Core\Bootstrap\Environment;

use function sprintf;

final class ConfigurationLoader implements ConfigurationLoaderInterface
{
    private const string CONFIG_PATH_TEMPLATE = '%s/src/*/Configuration/%s/*.php';

    private static ?string $projectRoot = null;
    private static ?Environment $environment = null;

    #[Override]
    public static function load(): array
    {
        $environment = self::getEnvironment();
        $environmentName = $environment->get('APPLICATION_ENVIRONMENT', 'production');

        $sharedPath = $environment->get('CONFIG_SHARED_PATH', __DIR__ . '/../../../../');
        $projectRoot = self::resolveProjectRoot();

        self::validatePath($projectRoot);

        $providers = self::buildProviders($sharedPath, $projectRoot, $environmentName);

        return new ConfigAggregator($providers)->getMergedConfig();
    }

    #[Override]
    public static function projectRoot(string $path): void
    {
        self::$projectRoot = '' === $path ? null : $path;
        self::$environment = null;
    }

    private static function getEnvironment(): Environment
    {
        if (null === self::$environment) {
            self::$environment = new Environment();
        }

        return self::$environment;
    }

    private static function resolveProjectRoot(): string
    {
        if (null !== self::$projectRoot) {
            return self::$projectRoot;
        }

        $envValue = getenv('CONFIG_PROJECT_ROOT');
        if (false !== $envValue) {
            return $envValue;
        }

        throw new RuntimeException('Project root path is not set or does not exist: CONFIG_PROJECT_ROOT');
    }

    private static function validatePath(string $path): void
    {
        if ('' === $path || !is_dir($path)) {
            throw new RuntimeException('Project root path is not set or does not exist: ' . $path);
        }
    }

    /**
     * @return list<PhpFileProvider>
     */
    private static function buildProviders(string $sharedPath, string $projectRoot, string $environment): array
    {
        $providers = [];

        foreach ([$sharedPath, $projectRoot] as $base) {
            foreach (['common', $environment] as $env) {
                $providers[] = new PhpFileProvider(sprintf(self::CONFIG_PATH_TEMPLATE, $base, $env));
            }
        }

        return $providers;
    }
}
