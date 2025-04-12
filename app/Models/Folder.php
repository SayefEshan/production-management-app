<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    protected $fillable = [
        'name',
        'order_id',
        'parent_id',
    ];

    /**
     * Defines BelongsTo relation between Folder and Order
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Order, Folder>
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
