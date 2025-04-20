<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;

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
    
    // Orders Group
    Route::prefix('orders')->name('order.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::post('/', [OrderController::class, 'create'])->name('create');
        Route::get('/{order}', [OrderController::class, 'show'])->name('show');
        Route::patch('/{order}', [OrderController::class, 'update'])->name('update');
        Route::delete('/{order}', [OrderController::class, 'delete'])->name('delete');
    });

    //now create route to claim files by employees 
    Route::post('/claim-files', [FileController::class, 'claimFiles'])->name('claim-files');
    Route::get('/files/{orderId}', [FileController::class, 'show'])->name('files.show');
    Route::patch('/files/{fileId}', [FileController::class, 'update'])->name('files.update');
    // Route to get files batchUpdateStatus
    Route::patch('/files/batch-update-status', [FileController::class, 'batchUpdateStatus'])->name('files.batch-update-status');
});

Route::get('/get-csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});

require __DIR__ . '/auth.php';
