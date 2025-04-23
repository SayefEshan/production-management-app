<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        $logs = Log::all();
        return Inertia::render('Dashboard/ActivityLogs/Index', [
            'activityLogs' => $logs,
        ]);
    }
}
