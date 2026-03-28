<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\ConfigurationLoader;

use Override;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use Shared\Core\Bootstrap\ConfigurationLoader\ConfigurationLoader;

/**
 * @internal
 */
final class ConfigurationLoaderTest extends TestCase
{
    private string $fixturesPath = '';

    #[Override]
    protected function setUp(): void
    {
        parent::setUp();
        $this->fixturesPath = __DIR__ . '/fixtures';
        $this->resetToDefaultEnvironment();
    }

    #[Override]
    protected function tearDown(): void
    {
        $this->resetToDefaultEnvironment();
        parent::tearDown();
    }

    #[Test]
    public function loadMergesSharedCommonConfig(): void
    {
        $config = $this->loadConfig();

        $shared = $this->getSection($config, 'shared');
        self::assertSame('shared_value', $shared['key']);
        self::assertSame('SomeModule', $shared['module']);
    }

    #[Test]
    public function loadMergesSharedEnvironmentConfig(): void
    {
        $config = $this->loadConfig();

        $shared = $this->getSection($config, 'shared');
        self::assertSame('test', $shared['environment']);
    }

    #[Test]
    public function loadMergesProjectCommonConfig(): void
    {
        $config = $this->loadConfig();

        $project = $this->getSection($config, 'project');
        self::assertSame('project_value', $project['key']);
        self::assertSame('OtherModule', $project['module']);
    }

    #[Test]
    public function loadMergesProjectEnvironmentConfig(): void
    {
        $config = $this->loadConfig();

        $project = $this->getSection($config, 'project');
        self::assertSame('test', $project['environment']);
    }

    #[Test]
    public function projectOverridesShared(): void
    {
        $config = $this->loadConfig();

        $project = $this->getSection($config, 'project');
        self::assertSame('project_overrides_shared', $project['override']);
    }

    #[Test]
    public function loadWithoutProjectRootThrowsException(): void
    {
        ConfigurationLoader::projectRoot('');
        putenv('CONFIG_PROJECT_ROOT');

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Undefined environment variable CONFIG_PROJECT_ROOT');

        $this->loadConfig();
    }

    #[Test]
    public function loadWithNonexistentProjectRootThrowsException(): void
    {
        $nonexistentPath = sys_get_temp_dir() . '/nonexistent_' . uniqid();
        ConfigurationLoader::projectRoot($nonexistentPath);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Project root path is not set or does not exist: ' . $nonexistentPath);

        $this->loadConfig();
    }

    #[Test]
    public function loadWithDefaultSharedPath(): void
    {
        putenv('CONFIG_SHARED_PATH=' . $this->fixturesPath . '/shared');

        $config = $this->loadConfig();

        $project = $this->getSection($config, 'project');
        self::assertSame('project_value', $project['key']);

        $core = $this->getSection($config, 'core');
        self::assertTrue($core['loaded']);
        self::assertTrue($core['default_path']);
    }

    #[Test]
    public function projectOverridesSharedNestedArrays(): void
    {
        $config = $this->loadConfig();

        $shared = $this->getSection($config, 'shared');
        $nested = $this->getSection($shared, 'nested');

        self::assertSame('project_override', $nested['key']);
        self::assertSame('shared_value', $nested['preserved']);
    }

    #[Test]
    public function projectCanAddNewKeys(): void
    {
        $config = $this->loadConfig();

        $shared = $this->getSection($config, 'shared');
        self::assertArrayHasKey('project_only', $shared);
        self::assertSame('new_key', $shared['project_only']);
    }

    #[Test]
    public function environmentCommonConfigIsAlwaysLoaded(): void
    {
        $config = $this->loadConfig();

        $shared = $this->getSection($config, 'shared');
        self::assertSame('common_value', $shared['common_key']);
    }

    #[Test]
    #[DataProvider('provideEnvironmentOverridesCommonCases')]
    public function environmentOverridesCommon(string $environment, string $expectedHost, bool $debug, bool $ssl): void
    {
        $this->setComplexEnvironment($environment);

        $config = $this->loadConfig();
        $database = $this->getSection($config, 'database');

        self::assertSame($expectedHost, $database['host']);
        self::assertSame($debug, $database['debug']);
        self::assertSame($ssl, $database['ssl'] ?? false);
    }

    /**
     * @return array<string, array{string, string, bool, bool}>
     */
    public static function provideEnvironmentOverridesCommonCases(): iterable
    {
        return [
            'production' => ['production', 'project-db.example.com', false, true],
            'development' => ['development', 'dev-db.local', true, false],
        ];
    }

    #[Test]
    public function deepArrayMergeWorks(): void
    {
        $this->setComplexEnvironment('production');

        $config = $this->loadConfig();
        $database = $this->getSection($config, 'database');

        self::assertSame('project-db.example.com', $database['host']);
        self::assertSame(5432, $database['port']);
        self::assertSame('pgsql', $database['driver']);
        self::assertSame('project_db', $database['name']);

        $options = $this->getSection($database, 'options');
        self::assertSame(60, $options['timeout']);
        self::assertTrue($options['persistent']);
    }

    #[Test]
    public function differentEnvironmentsProduceDifferentResults(): void
    {
        $this->setComplexEnvironment('test');
        $testConfig = $this->loadConfig();

        $this->setComplexEnvironment('production');
        $productionConfig = $this->loadConfig();

        self::assertNotEquals($testConfig, $productionConfig);
    }

    #[Test]
    public function projectRootCanBeSetViaEnvironmentVariable(): void
    {
        putenv('CONFIG_PROJECT_ROOT=' . $this->fixturesPath . '/project');
        ConfigurationLoader::projectRoot('');

        $config = $this->loadConfig();

        self::assertArrayHasKey('project', $config);
    }

    #[Test]
    public function projectRootMethodTakesPrecedence(): void
    {
        putenv('CONFIG_PROJECT_ROOT=/custom/path');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/project');

        $config = $this->loadConfig();

        $project = $this->getSection($config, 'project');
        self::assertSame('project_value', $project['key']);
    }

    #[Test]
    public function emptyStringProjectRootFallsBackToEnvironmentVariable(): void
    {
        putenv('CONFIG_PROJECT_ROOT=' . $this->fixturesPath . '/project');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/project');
        ConfigurationLoader::projectRoot('');

        $config = $this->loadConfig();

        self::assertArrayHasKey('project', $config);
    }

    #[Test]
    public function configsAreMergedInCorrectOrder(): void
    {
        $this->setComplexEnvironment('production');

        $config = $this->loadConfig();
        $database = $this->getSection($config, 'database');

        self::assertSame('project-db.example.com', $database['host']);
        self::assertSame(5432, $database['port']);
        self::assertTrue($database['ssl']);
    }

    #[Test]
    public function loadHandlesMultipleConfigFilesInSameDirectory(): void
    {
        $this->setComplexEnvironment('common');

        $config = $this->loadConfig();

        self::assertArrayHasKey('database', $config);
        self::assertArrayHasKey('cache', $config);
        self::assertArrayHasKey('routes', $config);
    }

    #[Test]
    public function scalarValuesCanBeOverridden(): void
    {
        $this->setComplexEnvironment('production');

        $config = $this->loadConfig();
        $database = $this->getSection($config, 'database');

        self::assertFalse($database['debug']);
        self::assertSame(100, $database['max_connections']);
    }

    private function resetToDefaultEnvironment(): void
    {
        putenv('APPLICATION_ENVIRONMENT=test');
        putenv('CONFIG_SHARED_PATH=' . $this->fixturesPath . '/shared');
        putenv('CONFIG_PROJECT_ROOT');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/project');
    }

    /**
     * @phpstan-return array<mixed, mixed>
     * @psalm-return array<mixed, mixed>
     */
    private function loadConfig(): array
    {
        return ConfigurationLoader::load();
    }

    /**
     * @param array<mixed, mixed> $config
     * @phpstan-return array<mixed, mixed>
     * @psalm-return array<mixed, mixed>
     */
    private function getSection(array $config, string $key): array
    {
        self::assertArrayHasKey($key, $config);
        return (array)$config[$key];
    }

    private function setComplexEnvironment(string $environment): void
    {
        putenv('APPLICATION_ENVIRONMENT=' . $environment);
        putenv('CONFIG_SHARED_PATH=' . $this->fixturesPath . '/complex/shared');
        ConfigurationLoader::projectRoot($this->fixturesPath . '/complex/project');
    }
}
