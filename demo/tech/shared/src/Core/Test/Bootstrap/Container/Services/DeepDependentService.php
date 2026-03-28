<?php

declare(strict_types=1);

namespace Shared\Core\Test\Bootstrap\Container\Services;

final class DeepDependentService
{
    public function __construct(
        private readonly DependentService $dependentService,
        private readonly string $configValue,
    ) {}

    public function getDependentService(): DependentService
    {
        return $this->dependentService;
    }

    public function getConfigValue(): string
    {
        return $this->configValue;
    }

    public function getValueFromChain(): string
    {
        return $this->dependentService->getValueFromTestService();
    }
}
