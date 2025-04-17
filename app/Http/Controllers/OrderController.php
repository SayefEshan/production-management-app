<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OrderService;

class OrderController extends Controller
{
    public function index()
    {
        return view('order.index');
    }

    public function create(Request $request)
    {
        try {
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
