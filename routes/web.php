<?php

use App\Http\Controllers\NotifController;
use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestPaperController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AssistantAdminController; // Import RoleController
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\AdminDashboardController;

Route::get('/', function () {
    return redirect('/guest');
});

Route::get('/guest', function () {
    if (Auth::check()) {
        // Redirect logged-in users to the appropriate dashboard
        return Auth::user()->is_admin
            ? redirect()->route('admindashboard')
            : redirect()->route('dashboard');
    }
    return Inertia::render('GuestPage'); // Replace 'GuestPage' with your actual component
})->name('guest');

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
})->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/admindashboard', [AdminDashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'admin'])
    ->name('admindashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/papers', [PaperController::class, 'view'])->name('userpapers.view');
    Route::get('/papers/{paper}', [PaperController::class, 'preview'])->name('userpapers.preview');
    Route::get('/request-papers', [RequestPaperController::class, 'view'])->name('userrequest.view');
    Route::post('/request-papers-add', [RequestPaperController::class, 'store'])->name('userrequest.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/request-papers-all', [RequestPaperController::class, 'index'])->name('userrequest.index');
    Route::get('/papers-admin', [PaperController::class, 'index'])->name('papers.index');
    Route::get('/papers-admin/{paper}', [PaperController::class, 'edit'])->name('papers.edit');
    Route::get('/add-admin', [PaperController::class, 'add'])->name('papers.add');
    Route::post('/add-admin', [PaperController::class, 'store'])->name('papers.store');
    Route::post('/papers-upload', [PaperController::class, 'upload'])->name('papers.upload');
    Route::patch('/papers-admin/{paper}', [PaperController::class, 'update'])->name('papers.update');

    Route::delete('/papers-admin/{paper}', [PaperController::class, 'destroy'])->name('papers.destroy');

    Route::get('/students-list', [StudentController::class, 'view'])->name('student.view');
    Route::post('/students-list/store', [StudentController::class, 'store'])->name('student.store');
    Route::patch('/students-list/{student}', [StudentController::class, 'update'])->name('student.update');
    Route::get('/students-list/add', [StudentController::class, 'add'])->name('student.add');
    Route::get('/students-list/{student}', [StudentController::class, 'edit'])->name('student.edit');
    Route::delete('/students-list/{student}', [StudentController::class, 'destroy'])->name('student.destroy');

    Route::put('/request-papers-all', [RequestPaperController::class, 'updateAll'])->name('userrequest.updateAll');
    Route::get('/notifications/count', [NotifController::class, 'count'])->name('notif.count');

    // Role management routes for Assistant Admin
    Route::get('/assistant-admins', [AssistantAdminController::class, 'view'])->name('assistant-admins.view');
    Route::get('/assistant-admins/add', [AssistantAdminController::class, 'add'])->name('assistant-admins.add');
    Route::post('/assistant-admins/store', [AssistantAdminController::class, 'store'])->name('assistant-admins.store');
    Route::get('/assistant-admins/{user}/edit', [AssistantAdminController::class, 'edit'])->name('assistant-admins.edit');
    Route::patch('/assistant-admins/{user}', [AssistantAdminController::class, 'update'])->name('assistant-admins.update');
    Route::delete('/assistant-admins/{user}', [AssistantAdminController::class, 'destroy'])->name('assistant-admins.destroy');



});

require __DIR__ . '/auth.php';
