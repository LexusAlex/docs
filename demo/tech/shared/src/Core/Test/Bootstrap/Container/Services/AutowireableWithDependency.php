<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Container\Services;

final class AutowireableWithDependency
{
    public function __construct(
        private readonly TestService $testService,
    ) {}

    public function getTestService(): TestService
    {
        return $this->testService;
    }
}
