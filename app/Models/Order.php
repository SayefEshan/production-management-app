<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'user_id',
        'status',
    ];

    /**
     * Defines BelongsTo relation between Order and User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Order>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Defines HasMany relation between Order and Folder
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Folder, Order>
     */
    public function folders()
    {
        return $this->hasMany(Folder::class);
    }
}
