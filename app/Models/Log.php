<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
        'user_id',
        'file_id',
        'action',
    ];

    /**
     * Defines BelongsTo relation between Log and User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Log>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Defines BelongsTo relation between Log and File
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<File, Log>
     */
    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
