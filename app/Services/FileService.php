<?php

namespace App\Services;

use App\Models\File;
use App\Services\LoggingService;
use Illuminate\Support\Facades\Auth;

class FileService
{
    protected $loggingService;

    public function __construct(LoggingService $loggingService)
    {
        $this->loggingService = $loggingService;
    }
    
    public static function createFile(
        int $orderId,
        int $parentId,
        string $fileName,
        string $storedPath,
        string $status = 'pending'
    ) {
        return File::create([
            'order_id' => $orderId,
            'folder_id' => $parentId,
            'file_name' => $fileName,
            'file_path' => $storedPath,
            'status' => $status,
        ]);
    }

    public static function update($data, File $file, int $userId)
    {
        // Check if the file is assigned to this user
        if ($file->claimed_by !== $userId) {
            throw new \Exception('File not assigned to this user');
        }

        // Update the file status
        $file->status = $data['status'];
        $file->save();

        return $file;
    }

    public static function delete(File $file)
    {
        //code
    }

    public static function getFilesByOrderId(int $orderId)
    {
        // Fetch files for the given order ID
        return File::where('order_id', $orderId)->get();
    }

    public static function claimFiles(array $fileIds, int $userId)
    {
        foreach ($fileIds as $fileId) {
            $file = File::find($fileId);
            if ($file && $file->status === 'unclaimed') {
                $file->status = 'in_progress'; // Change status to in_progress
                $file->claimed_by = $userId; // Assuming you have a claimed_by column
                $file->save();
            }
        }

        // Return the claimed files
        return File::whereIn('id', $fileIds)->where('status', 'claimed')->get();
    }

    public static function batchUpdateStatus(array $files, int $userId)
    {
        $updatedCount = 0;
        $failedCount = 0;
        $errors = [];

        foreach ($files as $fileId => $status) {
            try {
                $file = File::findOrFail($fileId);

                // Check if file is assigned to this user
                if ($file->claimed_by !== $userId) {
                    $errors[$fileId] = 'File not assigned to this user';
                    $failedCount++;
                    continue;
                }

                $previousStatus = $file->status;
                $file->status = $status;

                if ($status == 'completed') {
                    $file->completed_at = now();
                }

                $file->save();
                $updatedCount++;

                // Log the file action
                $this->loggingService->logFileAction(
                    $file,
                    Auth::user(),
                    'file_status_updated',
                    [
                        'previous_status' => $previousStatus,
                        'new_status' => $file->status
                    ]
                );
            } catch (\Exception $e) {
                $errors[$fileId] = $e->getMessage();
                $failedCount++;
            }
        }

        return [
            'success' => $failedCount === 0 && $updatedCount > 0,
            'updated_count' => $updatedCount,
            'failed_count' => $failedCount,
            'errors' => $errors
        ];
    }
}
