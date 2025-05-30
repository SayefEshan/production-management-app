<?php

namespace App\Services;
use Exception;
use Carbon\Carbon;
use App\Models\Order;
use App\Services\FolderService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OrderService
{
    public static function create(array $data)
    {
        //initiate DB transaction
        DB::beginTransaction();

        try {
            $orderCount = Order::count();
            $order = Order::create([
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'order_number' => 'ORD-' . date('Ymd') . '-' . str_pad($orderCount + 1, 4, '0', STR_PAD_LEFT),
                'created_by' => Auth::id(),
            ]);
            foreach ($data['folders'] as $folder) {
                self::storeFolder($folder, $order->id, null);
            }
            // Commit the transaction
            DB::commit();
        } catch (Exception $e) {
            // Rollback the transaction
            DB::rollBack();

            return $e;
        }


        return $order;
    }

    public static function update($data, Order $order)
    {
        //code
    }

    public static function delete(Order $order)
    {
        // Delete all files/folders in private/orders/{order->id}
        $deleted = Storage::disk('local')->deleteDirectory("orders/{$order->id}");
        if ($deleted) {

            return $order->delete();
        }
        throw new Exception('Unable to delete order');
    }

    protected static function storeFolder($folderData, $orderId, $parentId)
    {
        $folder = FolderService::createFolder($folderData['name'], $orderId, $parentId);

        // Save files if any
        if (!empty($folderData['files'])) {
            foreach ($folderData['files'] as $file) {
                $relativePath = $file->getClientOriginalName(); // contains folder path if uploaded with directory
                $fullPath = "orders/{$orderId}/" . $relativePath;

                // Store file
                Storage::put($fullPath, file_get_contents($file));

                FileService::createFile(
                    $orderId,
                    $folder->id,
                    $file->getClientOriginalName(),
                    $fullPath,
                );
            }
        }

        // Recurse for children
        if (!empty($folderData['children'])) {
            foreach ($folderData['children'] as $child) {
                self::storeFolder($child, $orderId, $folder->id);
            }
        }

        return;

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
        if ($orders instanceof \Illuminate\Support\Collection) {

            foreach ($orders as $order) {
                $totalFiles = $order?->files?->count();
                $completedFiles = $order->files->where('status', 'completed')->count();

                // Avoid division by zero
                $completionPercentage = $totalFiles > 0
                    ? round(($completedFiles / $totalFiles) * 100)
                    : 0;

                // Add it as a custom attribute
                $order->completion = $completionPercentage;
            }
        } else {
            $totalFiles = $orders?->files?->count();
            $completedFiles = $orders->files->where('status', 'completed')->count();

            // Avoid division by zero
            $completionPercentage = $totalFiles > 0
                ? round(($completedFiles / $totalFiles) * 100)
                : 0;

            // Add it as a custom attribute
            $orders->completion = $completionPercentage;
        }
        return $orders;
    }

    public static function markAsCompleted(Order $order)
    {
        $order->completed_at = Carbon::now();
        $order->status = 'completed';
        $order->save();
        return;
    }

    public static function unclaimedFiles(Order $order)
    {
        return $order->files()->where('status', 'unclaimed')->get();
    }
}