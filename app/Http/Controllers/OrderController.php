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
        return Inertia::render('Dashboard/Orders/OrderDetails', [
            'order' => $order,
        ]);
    }

    public function create(Request $request)
    {
        try {
            dd($request->all());
            //check if the user is authenticated admin user
            if (Auth::user()->role !== 'admin') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
            // Validate the request
            // $request->validate([
            // ]);

            // Create the order
            $order = OrderService::create($request->all());
            return response()->json($order);
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
        } catch (Exception $e) {
            throw $e;
        }
    }
}
