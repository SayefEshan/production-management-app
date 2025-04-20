<?php

namespace App\Http\Controllers;

use FileService;
use Exception;
use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
