<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable = ['id', 'category_id', 'name', 'slug', 'price', 'image', 'detail', 'description'];

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

    public function Cart()
    {
        return $this->hasMany(Cart::class);
    }

    public function OrderDetail()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function Liked()
    {
        return $this->hasMany(Liked::class);
    }
}
