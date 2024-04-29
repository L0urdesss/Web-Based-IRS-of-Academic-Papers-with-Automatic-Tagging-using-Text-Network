<?php

use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestPaperController;
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

 Route::get('/admindashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth','verified', 'admin'])->name('admindashboard');

Route::middleware('auth',)->group(function () {
    Route::get('/papers',[PaperController::class, 'view'])->name('userpapers.view');
    Route::get('/papers/{paper}',[PaperController::class, 'preview'])->name('userpapers.preview');
    Route::get('/request-papers',[RequestPaperController::class, 'view'])->name('userrequest.view');
    Route::post('/request-papers-add',[RequestPaperController::class, 'store'])->name('userrequest.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth', 'admin')->group(function () {
    Route::get('/request-papers-all',[RequestPaperController::class, 'index'])->name('userrequest.index');
    Route::get('/papers-admin',[PaperController::class, 'index'])->name('papers.index');
    Route::get('/papers-admin/{paper}',[PaperController::class, 'edit'])->name('papers.edit');
    Route::get('/add-admin', [PaperController::class, 'add'])->name('papers.add');
    Route::patch('/papers-admin/{paper}',[PaperController::class, 'update'])->name('papers.update');
    Route::post('/add-admin',[PaperController::class, 'store'])->name('papers.store');
    Route::delete('/papers-admin/{paper}',[PaperController::class, 'destroy'])->name('papers.destroy');
   // Route::get('/papers/search', [PaperController::class, 'search'])->name('papers.search');

});

require __DIR__.'/auth.php';
