<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class OrderItem extends Model
{
    protected $fillable = ['product_id', 'name', 'price', 'quantity', 'size', 'color'];
    protected function casts(): array { return ['price' => 'decimal:2']; }
}
