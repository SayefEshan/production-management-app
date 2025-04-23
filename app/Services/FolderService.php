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
}