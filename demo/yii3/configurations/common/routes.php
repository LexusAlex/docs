<?php

declare(strict_types=1);

use App\Http\Actions\Home\Index\Action;
use Yiisoft\Router\Route;

return [
    Route::get('/')->action(Action::class)->name('home'),
];