<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', function () {
    return Inertia::render('Home'); // React file: resources/js/Pages/Home.jsx
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

require __DIR__ . '/auth.php';
