<?php

namespace App\Http\Controllers;

use Exception;
use App\Services\OrderService;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        try {
            // Fetch orders with pagination using the $limit variable
            $orders = Order::with('files')->get();
            $orders = OrderService::OrdersWithFileCompletionPercentage($orders);

            return Inertia::render('Dashboard/Orders/Index', [
                'orders' => $orders,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function show(Order $order)
    {
        $order->load(['files', 'createdBy']); // eager load the files
        $order = OrderService::OrdersWithFileCompletionPercentage($order);
        $order->createdBy = $order->createdBy->name;
        $order->createdAt = $order->created_at->format('d-m-Y');
        $order->totalFiles = $order->files->count();
        $order->claimedFiles = $order->files->where('status', 'claimed')->count();
        $order->completedFiles = $order->files->where('status', 'completed')->count();
        $order->inProgressFiles = $order->files->where('status', 'in_propgress')->count();
        $order->unclaimedFiles = $order->files->where('status', 'unclaimed')->count();
        return Inertia::render('Dashboard/Orders/OrderDetails', [
            'order' => $order,
        ]);
    }

    public function create(Request $request)
    {
        try {
            //check if the user is authenticated admin user
            if (!Auth::user()->hasRole('admin')) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
            // Validate the request
            $validatedRequest = $request->validate([
                'title' => 'required|string',
                'description' => 'nullable|string',
                'folders' => 'nullable|array',
                'folders.*.id' => 'required|string',
                'folders.*.name' => 'required|string',
                'folders.*.parentId' => 'nullable|string',
                'folders.*.children' => 'nullable|array',
                'folders.*.files' => 'nullable|array',
                'folders.*.files.*' => 'file|max:10240',
            ]);

            // Create the order
            OrderService::create($validatedRequest);
            return redirect()->route('order.index')->with('success', 'Order created successfully.');

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update(Request $request, Order $order)
    {
        try {
            OrderService::update($request->all(), $order);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete(Order $order)
    {
        try {
            OrderService::delete($order);
            return redirect()->route('order.index')->with('success', 'Order deleted successfully.');
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function markAsCompleted(Order $order)
    {
        try {
            OrderService::markAsCompleted($order);
            return redirect()->route('order.index')->with('success', 'Order marked as completed successfully.');
        } catch (Exception $e) {
            throw $e;
        }
    }
}
