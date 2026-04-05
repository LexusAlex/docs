<?php

declare(strict_types=1);

namespace Shared\Http\Test\Response;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Shared\Http\Response\RedirectResponse;

/**
 * @internal
 */
final class RedirectResponseTest extends TestCase
{
    public function testDefault(): void
    {
        $response = new RedirectResponse($location = '/location');

        self::assertSame(302, $response->getStatusCode());
        self::assertSame($location, $response->getHeaderLine('Location'));
    }

    public function testWithCode(): void
    {
        $response = new RedirectResponse('/location', 301);

        self::assertSame(301, $response->getStatusCode());
    }

    public function testEmptyUrl(): void
    {
        $response = new RedirectResponse('');

        self::assertSame('', $response->getHeaderLine('Location'));
    }

    public function testInvalidStatusCode(): void
    {
        $this->expectException(InvalidArgumentException::class);
        new RedirectResponse('/location', 0);
    }
}
