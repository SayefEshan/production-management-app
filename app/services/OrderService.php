<?php

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OrderService
{
    public static function create($request)
    {
        $order = Order::create([
            'order_number' => (string) (1000 + Order::count() ?? 1),
            'status' => $request->status,
            'user_id' => Auth::id(),
        ]);

        foreach ($request->file('files') as $uploadedFile) {
            $relativePath = $uploadedFile->getClientOriginalName(); // contains folder path if uploaded with directory
            $fullPath = "orders/{$order->id}/" . $relativePath;

            // Store file
            Storage::put($fullPath, file_get_contents($uploadedFile));

            // Create folders & files records in DB
            self::storeFileAndFolders($order, $relativePath, $fullPath);
        }

        return response()->json(['message' => 'Order created successfully.']);
    }

    public static function update($data, Order $order)
    {
        //code
    }

    public static function delete(Order $order)
    {
        //code
    }

    protected static function storeFileAndFolders(Order $order, string $relativePath, string $storedPath)
    {
        $parts = explode('/', $relativePath);
        $fileName = array_pop($parts);

        $parentId = null;
        foreach ($parts as $folderName) {
            $folder = FolderService::createFolder($folderName, $order->id, $parentId);
            $parentId = $folder->id;
        }

        FileService::createFile($order->id, $parentId, $fileName, $storedPath);
    }
}