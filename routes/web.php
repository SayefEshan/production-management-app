<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LogController;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FolderController;
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

//create a middleware group that can be accessible for authenticated users only
Route::prefix('dashboard')->middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Index'); // React file: resources/js/Pages/Dashboard.jsx
    })->name('dashboard');

    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('order.index');
        Route::get('/{order}', [OrderController::class, 'show'])->name('order.show');

        Route::middleware(['role:employee'])->group(function () {
            Route::get('/{order}/claimFiles', [OrderController::class, 'unclaimedFiles'])->name('order.showUnclaimedFiles');
            // Route::post('/{order}/claimFiles', [OrderController::class, 'claimFiles'])->name('order.claimFiles');
        });

        Route::middleware([AdminMiddleware::class])->group(function () {
            Route::post('/', [OrderController::class, 'create'])->name('order.create');
            Route::patch('/{order}', [OrderController::class, 'update'])->name('order.update');
            Route::post('/{order}/delete', [OrderController::class, 'delete'])->name('order.delete');
            Route::post('/{order}/complete', [OrderController::class, 'markAsCompleted'])->name('order.markAsCompleted');
        });

    });

    Route::prefix('folders')->group(function () {
        Route::get('/', [FolderController::class, 'index'])->name('folder.index');

        Route::middleware([AdminMiddleware::class])->group(function () {
            Route::post('/{folder}', [FolderController::class, 'delete'])->name('folder.delete');
        });
    });

    Route::prefix('files')->group(function () {
        Route::get('/', [FileController::class, 'index'])->name('file.index');
        //now create route to claim files by employees 
        Route::post('/claim-files', [FileController::class, 'claimFiles'])->name('claim-files');
        Route::get('/{orderId}', [FileController::class, 'show'])->name('files.show');
        Route::post('/{file}/update', [FileController::class, 'update'])->name('files.update');
        // Route to get files batchUpdateStatus
        Route::patch('/batch-update-status', [FileController::class, 'batchUpdateStatus'])->name('files.batch-update-status');

        Route::middleware([AdminMiddleware::class])->group(function () {
            Route::post('/{file}/delete', [FileController::class, 'delete'])->name('files.delete');
        });
    });

    Route::prefix('logs')->middleware([AdminMiddleware::class])->group(function () {
        Route::get('/', [LogController::class, 'index'])->name('logs.index');
    });

    Route::prefix('users')->middleware(['role:employee'])->group(function () {
        Route::get('/{user}/files', [UserController::class, 'claimedFiles'])->name('user.claimedFiles');
    });

    Route::prefix('users')->middleware([AdminMiddleware::class])->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
    });
});

Route::get('/files/{filePath?}', function ($filePath = '') {
    $decodedPath = urldecode($filePath);
    $path = "private/{$decodedPath}";

    if (!Storage::exists($path)) {
        abort(404);
    }

    return response()->file(storage_path("app/{$path}"));
})
    ->where('filePath', '.*')
    ->middleware('auth')
    ->name('files.show');

require __DIR__ . '/auth.php';
