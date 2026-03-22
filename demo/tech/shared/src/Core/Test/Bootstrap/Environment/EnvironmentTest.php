<?php

declare(strict_types=1);

/**
 * @psalm-suppress UnusedClass
 * @psalm-suppress PropertyNotSetInConstructor
 */

namespace Shared\Core\Test\Environment;

use Override;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use Shared\Core\Bootstrap\Environment\Environment;

/**
 * @testdox Environment
 * @psalm-suppress PropertyNotSetInConstructor
 * @psalm-suppress MissingConstructor
 * @internal
 */
final class EnvironmentTest extends TestCase
{
    private const TEST_VARS = [
        'TEST_VAR',
        'NULL_VAR',
        'SPECIAL_VAR',
        'UNICODE_VAR',
        'NUMERIC_VAR',
        'SPACED_VAR',
        'EQUALS_VAR',
        'NEWLINE_VAR',
        'CASE_VAR',
        'case_var',
        'MULTI_VAR',
        'EMPTY_VAR',
    ];
    private Environment $environment;

    #[Override]
    protected function setUp(): void
    {
        parent::setUp();
        $this->environment = new Environment();
    }

    #[Override]
    protected function tearDown(): void
    {
        foreach (self::TEST_VARS as $var) {
            putenv($var);
        }
        parent::tearDown();
    }

    #[Test]
    public function getExistingEnvVariable(): void
    {
        putenv('TEST_VAR');
        putenv('TEST_VAR=hello');

        $result = $this->environment->get('TEST_VAR');

        self::assertSame('hello', $result);
    }

    #[Test]
    public function getEnvVariableWithDefault(): void
    {
        $result = $this->environment->get('NON_EXISTENT_VAR', 'default_value');

        self::assertSame('default_value', $result);
    }

    #[Test]
    public function getNonExistentEnvVariableThrowsException(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Undefined environment variable NON_EXISTENT_VAR');

        $this->environment->get('NON_EXISTENT_VAR');
    }

    #[Test]
    public function getEnvVariableWithEmptyStringDefault(): void
    {
        $result = $this->environment->get('NON_EXISTENT_VAR', '');

        self::assertSame('', $result);
    }

    #[Test]
    public function getEnvVariableWithNullDefaultThrowsException(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Undefined environment variable NON_EXISTENT_VAR');

        $this->environment->get('NON_EXISTENT_VAR', null);
    }

    #[Test]
    public function getEnvVariableSetWithoutValue(): void
    {
        putenv('NULL_VAR');
        putenv('NULL_VAR=');

        $result = $this->environment->get('NULL_VAR', 'default');

        self::assertSame('', $result);
    }

    #[Test]
    public function getEnvVariableWithSpecialCharacters(): void
    {
        putenv('SPECIAL_VAR');
        putenv('SPECIAL_VAR=hello"world$`!@#%');

        $result = $this->environment->get('SPECIAL_VAR');

        self::assertSame('hello"world$`!@#%', $result);
    }

    #[Test]
    public function getEnvVariableWithUnicode(): void
    {
        putenv('UNICODE_VAR');
        putenv('UNICODE_VAR=Привет мир 🌍');

        $result = $this->environment->get('UNICODE_VAR');

        self::assertSame('Привет мир 🌍', $result);
    }

    #[Test]
    public function getEnvVariableWithNumericValue(): void
    {
        putenv('NUMERIC_VAR');
        putenv('NUMERIC_VAR=12345');

        $result = $this->environment->get('NUMERIC_VAR');

        self::assertSame('12345', $result);
    }

    #[Test]
    public function getEnvVariableWithLeadingTrailingSpaces(): void
    {
        putenv('SPACED_VAR');
        putenv('SPACED_VAR=  trimmed  ');

        $result = $this->environment->get('SPACED_VAR');

        self::assertSame('  trimmed  ', $result);
    }

    #[Test]
    public function getEnvVariableWithEqualsSign(): void
    {
        putenv('EQUALS_VAR');
        putenv('EQUALS_VAR=key=value');

        $result = $this->environment->get('EQUALS_VAR');

        self::assertSame('key=value', $result);
    }

    #[Test]
    public function getEnvVariableWithNewline(): void
    {
        putenv('NEWLINE_VAR');
        putenv("NEWLINE_VAR=line1\nline2");

        $result = $this->environment->get('NEWLINE_VAR');

        self::assertSame("line1\nline2", $result);
    }

    #[Test]
    public function getCaseSensitiveEnvVariable(): void
    {
        putenv('CASE_VAR');
        putenv('case_var');
        putenv('CASE_VAR=upper');
        putenv('case_var=lower');

        $upperResult = $this->environment->get('CASE_VAR');
        $lowerResult = $this->environment->get('case_var');

        self::assertSame('upper', $upperResult);
        self::assertSame('lower', $lowerResult);
    }

    #[Test]
    public function getEnvVariableAfterMultiplePuts(): void
    {
        putenv('MULTI_VAR');
        putenv('MULTI_VAR=first');
        $firstResult = $this->environment->get('MULTI_VAR');

        putenv('MULTI_VAR=second');
        $secondResult = $this->environment->get('MULTI_VAR');

        self::assertSame('first', $firstResult);
        self::assertSame('second', $secondResult);
    }

    #[Test]
    public function getEmptyEnvVariable(): void
    {
        putenv('EMPTY_VAR');
        putenv('EMPTY_VAR=');

        $result = $this->environment->get('EMPTY_VAR');

        self::assertSame('', $result);
    }
}
