<?php

use App\Models\File;

class FileService
{
    public static function createFile(
        int $orderId,
        ?int $parentId,
        string $fileName,
        string $storedPath,
        string $status = 'pending'
    ) {
        return File::create([
            'order_id' => $orderId,
            'folder_id' => $parentId,
            'file_name' => $fileName,
            'fille_path' => $storedPath,
            'status' => $status,
        ]);
    }

    public static function update($data, File $file)
    {
        //code
    }

    public static function delete(File $file)
    {
        //code
    }
}