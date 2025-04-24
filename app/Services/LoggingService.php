<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\User;
use App\Events\FileAction;
use App\Events\BatchAction;
use Illuminate\Support\Facades\Request;

class LoggingService
{
    public function logFileAction(
        $file,
        $user,
        $action,
        $metadata = []
    ) {
        // Create log entry
        $log = ActivityLog::create([
            'user_id' => $user->id,
            'order_id' => $file->order_id,
            'file_id' => $file->id,
            'action' => $action,
            'metadata' => $metadata,
            'ip_address' => Request::ip()
        ]);

        // Broadcast event
        event(new FileAction($file, $user, $action, $metadata));

        return $log;
    }
}
