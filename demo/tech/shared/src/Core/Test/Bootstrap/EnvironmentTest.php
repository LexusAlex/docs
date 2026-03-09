<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use Shared\Core\Bootstrap\Environment;
use Shared\Core\Bootstrap\EnvironmentInterface;

/**
 * Атрибут #[CoversClass] указывает, что этот тест-класс покрывает класс Environment.
 */
#[CoversClass(\Shared\Core\Bootstrap\Environment::class)]
final class EnvironmentTest extends TestCase
{
    private EnvironmentInterface $environment;

    protected function setUp(): void
    {
        $this->environment = new Environment();
    }

    protected function tearDown(): void
    {
        // Важно! Удаляем переменные окружения, которые мы установили в тестах,
        // чтобы избежать их влияния на другие тесты.
        putenv('TEST_VAR_STRING');
        putenv('TEST_VAR_NUMBERS');
        putenv('TEST_VAR_EMPTY');
        putenv('TEST_VAR_SPACES');
        putenv('TEST_VAR_EXISTS_WITH_DEFAULT');
        putenv('TEST_VAR_DOES_NOT_EXIST');
        putenv('TEST_VAR_DOES_NOT_EXIST_EXCEPTION');
    }

    /**
     * Тест: Получение значения существующей переменной окружения.
     * Атрибут #[DataProvider] указывает на метод, предоставляющий данные.
     */
    #[DataProvider('existingVariableProvider')]
    public function testGetReturnsEnvironmentVariableValueWhenItIsSet(string $name, string $value): void
    {
        // Arrange (Подготовка)
        putenv("{$name}={$value}");

        // Act (Действие)
        $result = $this->environment->get($name);

        // Assert (Проверка)
        self::assertSame($value, $result, 'Метод должен вернуть значение установленной переменной окружения.');
    }

    /**
     * Data Provider для testGetReturnsEnvironmentVariableValueWhenItIsSet.
     */
    public function existingVariableProvider(): array
    {
        return [
            'простая строка' => ['TEST_VAR_STRING', 'some_value'],
            'строка с цифрами' => ['TEST_VAR_NUMBERS', '12345'],
            'пустая строка' => ['TEST_VAR_EMPTY', ''],
            'строка с пробелами' => ['TEST_VAR_SPACES', '  value with spaces  '],
        ];
    }

    /**
     * Тест: Значение по умолчанию игнорируется, если переменная существует.
     */
    public function testGetIgnoresDefaultWhenEnvironmentVariableIsSet(): void
    {
        // Arrange
        $varName = 'TEST_VAR_EXISTS_WITH_DEFAULT';
        $varValue = 'actual_value';
        $defaultValue = 'ignored_default';
        putenv("{$varName}={$varValue}");

        // Act
        $result = $this->environment->get($varName, $defaultValue);

        // Assert
        self::assertSame($varValue, $result, 'Метод должен вернуть значение переменной, а не значение по умолчанию.');
    }

    /**
     * Тест: Возврат значения по умолчанию, если переменная не установлена.
     */
    #[DataProvider('defaultProvider')]
    public function testGetReturnsDefaultValueWhenEnvironmentVariableIsNotSet(?string $default): void
    {
        // Arrange
        $varName = 'TEST_VAR_DOES_NOT_EXIST';
        // Убеждаемся, что переменная точно не установлена
        putenv($varName);

        // Act
        $result = $this->environment->get($varName, $default);

        // Assert
        self::assertSame($default, $result, 'Метод должен вернуть значение по умолчанию, если переменная не найдена.');
    }

    /**
     * Data Provider для testGetReturnsDefaultValueWhenEnvironmentVariableIsNotSet.
     */
    public function defaultProvider(): array
    {
        return [
            'не пустая строка по умолчанию' => ['default_value'],
            'пустая строка по умолчанию' => [''],
            'null как значение по умолчанию' => [null],
        ];
    }

    /**
     * Тест: Выброс исключения, если переменная не установлена и нет значения по умолчанию.
     */
    public function testGetThrowsRuntimeExceptionWhenVariableIsNotSetAndNoDefaultIsProvided(): void
    {
        // Arrange
        $varName = 'TEST_VAR_DOES_NOT_EXIST_EXCEPTION';
        putenv($varName);

        // Assert: Мы ожидаем, что будет выброшено исключение RuntimeException
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Undefined environment variable ' . $varName);

        // Act: Выполняем действие, которое должно привести к исключению
        $this->environment->get($varName);
    }
}