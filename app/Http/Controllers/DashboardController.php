<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\File;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $totalFiles = File::count();
            $inProgressFiles = File::where("status", "in_progress")->count();
            $activeOrders = Order::where("status", "pending")->count();
            $completedOrders = Order::where("status", "completed")->count();

            $data = [
                'statistics' => [
                    'totalFiles' => $totalFiles,
                    'inProgressFiles' => $inProgressFiles,
                    'activeOrders' => $activeOrders,
                    'completedOrders' => $completedOrders,
                ],
            ];
            return Inertia::render('Dashboard/Index', [
                'data' => $data
            ]);
        } catch (Exception $e) {
            throw $e;
        }

    }
}
