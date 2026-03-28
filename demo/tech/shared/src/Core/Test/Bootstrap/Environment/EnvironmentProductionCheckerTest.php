<?php

declare(strict_types=1);

/**
 * @psalm-suppress UnusedClass
 * @psalm-suppress PropertyNotSetInConstructor
 */

namespace Shared\Core\Test\Bootstrap\Environment;

use Override;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Shared\Core\Bootstrap\Environment\EnvironmentProductionChecker;

/**
 * @testdox EnvironmentProductionChecker
 * @psalm-suppress PropertyNotSetInConstructor
 * @psalm-suppress MissingConstructor
 * @internal
 */
final class EnvironmentProductionCheckerTest extends TestCase
{
    private const TEST_VAR = 'APPLICATION_ENVIRONMENT';

    private EnvironmentProductionChecker $checker;

    #[Override]
    protected function setUp(): void
    {
        parent::setUp();
        $this->checker = new EnvironmentProductionChecker();
    }

    #[Override]
    protected function tearDown(): void
    {
        putenv(self::TEST_VAR);
        parent::tearDown();
    }

    #[Test]
    public function isProductionWhenEnvNotSet(): void
    {
        putenv(self::TEST_VAR);

        $result = $this->checker->isProduction();

        self::assertTrue($result);
    }

    #[Test]
    public function isProductionWhenSetToProduction(): void
    {
        putenv(self::TEST_VAR);
        putenv(self::TEST_VAR . '=production');

        $result = $this->checker->isProduction();

        self::assertTrue($result);
    }

    #[Test]
    public function isProductionWhenSetToDevelopment(): void
    {
        putenv(self::TEST_VAR);
        putenv(self::TEST_VAR . '=development');

        $result = $this->checker->isProduction();

        self::assertFalse($result);
    }

    #[Test]
    public function isProductionWhenSetToStaging(): void
    {
        putenv(self::TEST_VAR);
        putenv(self::TEST_VAR . '=staging');

        $result = $this->checker->isProduction();

        self::assertFalse($result);
    }

    #[Test]
    public function isProductionWhenSetToLocal(): void
    {
        putenv(self::TEST_VAR);
        putenv(self::TEST_VAR . '=local');

        $result = $this->checker->isProduction();

        self::assertFalse($result);
    }

    #[Test]
    public function isProductionIsCaseSensitive(): void
    {
        putenv(self::TEST_VAR);
        putenv(self::TEST_VAR . '=Production');

        $result = $this->checker->isProduction();

        self::assertFalse($result);
    }

    #[Test]
    public function isProductionWhenSetToEmptyString(): void
    {
        putenv(self::TEST_VAR);
        putenv(self::TEST_VAR . '=');

        $result = $this->checker->isProduction();

        self::assertFalse($result);
    }
}
