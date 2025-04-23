<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\LogController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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

//create a middleware group that can be accessible for authenticated admin users only
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::post('/order', [OrderController::class, 'create'])->name('order.create');
});

//create a middleware group that can be accessible for authenticated users only
Route::prefix('dashboard')->middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Index'); // React file: resources/js/Pages/Dashboard.jsx
    })->name('dashboard');

    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('order.index');
        Route::post('/', [OrderController::class, 'create'])->name('order.create');
        Route::get('/{order}', [OrderController::class, 'show'])->name('order.show');
        Route::patch('/{order}', [OrderController::class, 'update'])->name('order.update');
        Route::post('/{order}/delete', [OrderController::class, 'delete'])->name('order.delete');
        Route::post('/{order}/complete', [OrderController::class, 'markAsCompleted'])->name('order.markAsCompleted');
    });

    Route::prefix('folders')->group(function () {
        Route::get('/', [FolderController::class, 'index'])->name('folder.index');
        Route::post('/{folder}', [FolderController::class, 'delete'])->name('folder.delete');
    });

    Route::prefix('files')->group(function () {
        Route::get('/', [FileController::class, 'index'])->name('file.index');
        //now create route to claim files by employees 
        Route::post('/claim-files', [FileController::class, 'claimFiles'])->name('claim-files');
        Route::get('/{orderId}', [FileController::class, 'show'])->name('files.show');
        Route::patch('/{fileId}', [FileController::class, 'update'])->name('files.update');
        // Route to get files batchUpdateStatus
        Route::patch('/batch-update-status', [FileController::class, 'batchUpdateStatus'])->name('files.batch-update-status');
        Route::post('/{file}', [FileController::class, 'delete'])->name('files.delete');
    });

    Route::prefix('logs')->group(function () {
        Route::get('/', [LogController::class, 'index'])->name('logs.index');
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
    });
});

require __DIR__ . '/auth.php';
