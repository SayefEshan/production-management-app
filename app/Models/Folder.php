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

    /**
     * Defines BelongsTo relation between Folder and Folder
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Folder, Folder>
     */
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * Defines HasMany relation between Folder and Folder
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Folder, Folder>
     */
    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * This will give model's Parent, Parent's parent, and so on until root.  
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Folder, Folder>
     */
    public function parentRecursive()
    {
        return $this->parent()->with('parentRecursive');
    }

    /**
     * This will give model's Children, Children's Children and so on until last node.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Folder, Folder>
     */
    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
}
