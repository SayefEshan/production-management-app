<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with([
            'claimedFiles' => function ($query) {
                $query->select('id', 'file_name', 'status', 'order_id', 'claimed_by');
            }
        ])->whereHas('claimedFiles')->get();

        $result = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'files' => $user->claimedFiles->map(function ($file) {
                    return [
                        'name' => $file->file_name,
                        'status' => ucfirst($file->status),
                        'orderId' => $file->order_id,
                    ];
                }),
            ];
        });

        return Inertia::render('Dashboard/Employees/Index', [
            'employees' => $result
        ]);
    }
    public function show()
    {
        return Inertia::render('Users/Index', [
            'user' => [
                'name' => 'John Doe',
            ]
        ]);
    }
}
