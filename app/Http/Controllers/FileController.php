<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\File;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\FileService;
use App\Services\FolderService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    //display a specific order files
    public function show($orderId)
    {
        // Get files for the specific order
        $files = FileService::getFilesByOrderId($orderId);

        return response()->json($files);
    }

    //files status changed by employee if they are assigned to the files
    public function update(Request $request, $fileId)
    {
        // Validate the request
        $request->validate([
            'status' => 'required|string|in:in_progress,completed',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Check if the user is an employee
        if ($user->role !== 'employee') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        //call service function to update file status
        $file = FileService::update($request->all(), $fileId, $user->id);
        if ($file) {
            return response()->json(['message' => 'File status updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to update file status'], 500);
        }
    }

    //create a function to claim files and only employees can claim files to unclaimed files
    public function claimFiles(Request $request)
    {
        // Validate the request
        $request->validate([
            'file_ids' => 'required|array',
            'file_ids.*' => 'exists:files,id',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Check if the user is an employee
        if ($user->role !== 'employee') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        //call service function to claim files
        $claimedFiles = FileService::claimFiles($request->file_ids, $user->id);
        if ($claimedFiles) {
            return response()->json(['message' => 'Files claimed successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to claim files'], 500);
        }
    }

    //update status for multiple files at once
    public function batchUpdateStatus(Request $request)
    {
        // Validate the request
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|string|in:in_progress,completed',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Check if the user is an employee
        if ($user->role !== 'employee') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Get files array where keys are file IDs and values are statuses
        $files = $request->input('files');

        // Call service function to update multiple file statuses
        $result = FileService::batchUpdateStatus($files, $user->id);

        return response()->json([
            'message' => 'Files status updated successfully',
            'updated_count' => $result['updated_count'],
            'failed_count' => $result['failed_count'],
            'errors' => $result['errors'],
        ]);
    }
    public function index()
    {
        try {
            $orders = Order::with('folders.children.files', 'folders.files')->get();


            $structuredOrders = $orders->map(function ($order) {
                $rootFolders = $order->folders->whereNull('parent_id');
                return [
                    'orderId' => $order->id,
                    'folders' => FolderService::formatFolders($rootFolders, $order->id),
                ];
            });
            // dd($structuredOrders);

            return Inertia::render('Dashboard/Files/Index', [
                'structuredOrders' => $structuredOrders,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete(File $file)
    {
        DB::beginTransaction();
        try {
            $fileExist = Storage::disk('local')->exists("orders/{$file->order_id}/{$file->name}");
            if ($fileExist) {
                Storage::disk('local')->delete("orders/{$file->order_id}/{$file->name}");
            }

            $file->delete();
            DB::commit();
            return redirect()->route('file.index')->with('success', 'File deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
