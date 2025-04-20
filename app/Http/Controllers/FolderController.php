<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Folder;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function index()
    {
        try {
            // Fetch orders with pagination using the $limit variable
            $folders = Folder::with(['order', 'parent', 'children'])->get();
            return Inertia::render('Dashboard/Folders/Index', [
                'folders' => $folders,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }
}
