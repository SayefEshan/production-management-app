<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get user IDs to associate with orders
        $userIds = User::pluck('id')->toArray();

        // Possible statuses for orders
        $statuses = ['pending', 'processing', 'completed', 'cancelled'];

        // Create 50 orders with random data
        for ($i = 0; $i < 50; $i++) {
            $createdAt = Carbon::now()->subDays(rand(1, 60));
            $order = [
                'created_by' => $userIds[array_rand($userIds)],
                'order_number' => 'ORD-' . date('Ymd') . '-' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                'status' => $statuses[array_rand($statuses)],
                'created_at' => $createdAt,
                'updated_at' => rand(0, 1) ? $createdAt : $createdAt->addDays(rand(1, 5)),
            ];
        }
        $order = Order::create($order);
    }
}
