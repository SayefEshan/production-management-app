<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', function () {
    return Inertia::render('Home'); // React file: resources/js/Pages/Home.jsx
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard'); // React file: resources/js/Pages/Dashboard.jsx
});

//user index route
Route::get('/users/index', function () {
    return Inertia::render('Users/Index'); // React file: resources/js/Pages/Users/Index.jsx
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
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard/orders', [OrderController::class, 'index'])->name('order.index');
    Route::patch('/order/{order}', [OrderController::class, 'update'])->name('order.update');
    Route::delete('/order/{order}', [OrderController::class, 'delete'])->name('order.delete');
});

require __DIR__ . '/auth.php';
