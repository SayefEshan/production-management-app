<?php
namespace App\Services;
use App\Models\Folder;

class FolderService
{
    public static function createFolder(string $folderName, int $orderId, ?int $parentId)
    {
        return Folder::firstOrCreate([
            'name' => $folderName,
            'order_id' => $orderId,
            'parent_id' => $parentId,
        ]);
    }

    public static function update($data, Folder $folder)
    {
        //code
    }

    public static function delete(Folder $folder)
    {
        //code
    }

    public static function formatFolders($folders, $orderId)
    {
        return $folders->map(function ($folder) use ($orderId) {
            return [
                'id' => $folder->id,
                'orderId' => $orderId,
                'name' => $folder->name,
                'files' => $folder->files->map(fn($file) => [
                    'id' => $file->id,
                    'name' => $file->file_name,
                    'uploaded_at' => $file->created_at->format('Y-m-d'),
                    'file_path' => $file->file_path,
                ]),
                'children' => self::formatFolders($folder->children, $orderId),
            ];
        })->values();
    }
}