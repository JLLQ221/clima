<?php

use App\Http\Controllers\DatoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::post('/temperatura/{temperatura}', [DatoController::class, 'store'])->name("Posttemperatura");

Route::get('/GetLasttemperatura', [DatoController::class, 'getLast'])->name("getTemperaturaLast");

