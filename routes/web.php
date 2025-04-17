<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', function () {
    return redirect()->route('dashboard'); // React file: resources/js/Pages/Home.jsx
});

//user create route
Route::get('/users', [UserController::class, 'show']);

// Add this route
Route::get('/user', function () {
    return Inertia::render('User/Index', [
        'user' => Auth::user()
    ]);
})->middleware(['auth'])->name('user.index');

Route::get('/user-test', function () {
    return Inertia::render('User/Index', [
        'user' => [
            'name' => 'Test User',
            // other user properties you need
        ]
    ]);
});

//create a middleware group that can be accessible for authenticated admin users only
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::post('/order', [OrderController::class, 'create'])->name('order.create');
});

//create a middleware group that can be accessible for authenticated users only
Route::prefix('dashboard')->middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Index'); // React file: resources/js/Pages/Dashboard.jsx
    })->name('dashboard');
    Route::get('/orders', [OrderController::class, 'index'])->name('order.index');
    Route::patch('/orders/{order}', [OrderController::class, 'update'])->name('order.update');
    Route::delete('/orders/{order}', [OrderController::class, 'delete'])->name('order.delete');
});

require __DIR__ . '/auth.php';
