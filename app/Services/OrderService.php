<?php

namespace App\Services;
use App\Services\FolderService;
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

    public static function OrdersWithFileCompletionPercentage($orders)
    {
        foreach ($orders as $order) {
            $totalFiles = $order->files->count();
            $completedFiles = $order->files->where('status', 'completed')->count();

            // Avoid division by zero
            $completionPercentage = $totalFiles > 0
                ? round(($completedFiles / $totalFiles) * 100)
                : 0;

            // Add it as a custom attribute
            $order->completion = $completionPercentage;
        }
        return $orders;
    }
}