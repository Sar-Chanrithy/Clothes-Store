<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    protected $fillable = ['id', 'name', 'sku', 'category', 'price', 'stock', 'description', 'image', 'details'];
    protected function casts(): array { return ['price' => 'decimal:2', 'details' => 'array']; }
}
