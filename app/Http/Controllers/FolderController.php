<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function delete(Folder $folder)
    {
        DB::beginTransaction();
        try {
            $folderExist = Storage::disk('local')->exists("orders/{$folder->order_id}/{$folder->name}");
            if ($folderExist) {
                Storage::disk('local')->deleteDirectory("orders/{$folder->order_id}/{$folder->name}");
            }
            $folder->delete();
            DB::commit();
            return redirect()->route('file.index')->with('success', 'folder deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
