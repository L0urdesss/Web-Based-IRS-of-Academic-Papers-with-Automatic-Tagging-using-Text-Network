<?php

use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestPaperController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return redirect('/');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
 
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');


Route::get('/dashboard', function () {
     return Inertia::render('Dashboard');
 })->middleware(['auth', 'verified'])->name('dashboard');

 Route::get('/admindashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth','verified', 'admin'])->name('admindashboard');

Route::middleware('auth','verified')->group(function () {
    Route::get('/papers',[PaperController::class, 'view'])->name('userpapers.view');
    Route::get('/papers/{paper}',[PaperController::class, 'preview'])->name('userpapers.preview');
    Route::get('/request-papers',[RequestPaperController::class, 'view'])->name('userrequest.view');
    Route::post('/request-papers-add',[RequestPaperController::class, 'store'])->name('userrequest.store');
    
    // Route::get('/papers/{paper}',[RequestPaperController::class, 'getStatus'])->name('userrequest.getStatus');

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

    //student crud
    Route::get('/student',[StudentController::class, 'view'])->name('student.view');
    Route::post('/student/store',[StudentController::class, 'store'])->name('student.store');
    Route::patch('/student/{student}',[StudentController::class, 'update'])->name('student.update');
    Route::get('/student/add', [StudentController::class, 'add'])->name('student.add');
    Route::get('/student/{student}',[StudentController::class, 'edit'])->name('student.edit');
    Route::delete('/student/{student}',[StudentController::class, 'destroy'])->name('student.destroy');

    Route::put('/request-papers-all', [RequestPaperController::class, 'updateAll'])->name('userrequest.updateAll');
    Route::delete('/papers-admin/{paper}',[PaperController::class, 'destroy'])->name('papers.destroy');

});

require __DIR__.'/auth.php';
