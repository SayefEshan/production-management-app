<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
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
            OrderService::create($request->all());
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
