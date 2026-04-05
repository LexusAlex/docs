<?php

declare(strict_types=1);

namespace Shared\Http\Test\Response;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Shared\Http\Response\HtmlResponse;

/**
 * @internal
 */
final class HtmlResponseTest extends TestCase
{
    public function testDefault(): void
    {
        $response = new HtmlResponse($html = '<html lang="en"></html>');

        self::assertSame('text/html', $response->getHeaderLine('Content-Type'));
        self::assertSame($html, $response->getBody()->getContents());
        self::assertSame(200, $response->getStatusCode());
    }

    public function testWithCode(): void
    {
        $response = new HtmlResponse($html = '<html lang="en"></html>', 201);

        self::assertSame('text/html', $response->getHeaderLine('Content-Type'));
        self::assertSame($html, $response->getBody()->getContents());
        self::assertSame(201, $response->getStatusCode());
    }

    public function testEmptyHtml(): void
    {
        $response = new HtmlResponse('');

        self::assertSame('', $response->getBody()->getContents());
    }

    public function testInvalidStatusCode(): void
    {
        $this->expectException(InvalidArgumentException::class);
        new HtmlResponse('<html></html>', 0);
    }
}
