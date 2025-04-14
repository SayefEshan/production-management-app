<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'folder_id',
        'order_id',
        'file_name',
        'file_path',
        'status',
    ];

    /**
     * Defines BelongsTo relation between File and User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, File>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Defines BelongsTo relation between File and Order
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Order, File>
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
