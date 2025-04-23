<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [
        'title',
        'description',
        'order_number',
        'created_by',
        'status',
    ];

    /**
     * Defines BelongsTo relation between Order and User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Order>
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Defines HasMany relation between Order and Folder
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Folder, Order>
     */
    public function folders()
    {
        return $this->hasMany(Folder::class);
    }

    /**
     * Defines HasMany relation between Order and File
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<File, Order>
     */
    public function files()
    {
        return $this->hasMany(File::class);
    }
}
