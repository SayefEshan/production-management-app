<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render("Dashboard/Employees/Index");
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
