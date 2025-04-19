<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get limit from request or default to 10
            $limit = $request->input('limit', 10);

            // Fetch orders with pagination using the $limit variable
            $files = File::with('order')->paginate($limit);
            return Inertia::render('Dashboard/Files/Index', [
                'files' => $files,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }
}
