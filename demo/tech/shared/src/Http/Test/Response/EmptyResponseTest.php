<?php

declare(strict_types=1);

namespace Shared\Http\Test\Response;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Shared\Http\Response\EmptyResponse;

/**
 * @internal
 */
final class EmptyResponseTest extends TestCase
{
    public function testDefault(): void
    {
        $response = new EmptyResponse();

        self::assertSame(204, $response->getStatusCode());
        self::assertFalse($response->hasHeader('Content-Type'));

        self::assertSame('', (string)$response->getBody());
    }

    public function testWithCode(): void
    {
        $response = new EmptyResponse(201);

        self::assertSame(201, $response->getStatusCode());
    }

    public function testInvalidStatusCode(): void
    {
        $this->expectException(InvalidArgumentException::class);
        new EmptyResponse(0);
    }
}
