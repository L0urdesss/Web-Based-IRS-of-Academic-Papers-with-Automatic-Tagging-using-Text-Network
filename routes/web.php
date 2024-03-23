<?php

use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'admin')->group(function () {
    Route::get('/papers',[PaperController::class, 'index'])->name('papers.index');
    Route::get('/papers/{paper}',[PaperController::class, 'edit'])->name('papers.edit');
    Route::get('/add', [PaperController::class, 'add'])->name('papers.add');
    Route::patch('/papers/{paper}',[PaperController::class, 'update'])->name('papers.update');
    Route::post('/add',[PaperController::class, 'store'])->name('papers.store');
    Route::delete('/papers/{paper}',[PaperController::class, 'destroy'])->name('papers.destroy');
   // Route::get('/papers/search', [PaperController::class, 'search'])->name('papers.search');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
